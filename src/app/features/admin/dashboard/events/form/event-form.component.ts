import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PabailarEvent } from '../../../../../core/models/event.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { AppwriteService } from '../../../../../core/services/appwrite.service';
import { Storage } from 'appwrite';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EventFormComponent implements OnInit {
  @Input() event: PabailarEvent | null = null;
  @Output() formSubmit = new EventEmitter<PabailarEvent>();
  
  eventForm: FormGroup;
  created_by_admin: boolean = false;
  imageFile: File | null = null;
  storage: Storage;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private appwriteService: AppwriteService
  ) {
    this.eventForm = this.initForm();
    this.authService.isAdminLoggedIn().subscribe(loggedIn => this.created_by_admin = loggedIn);
    this.storage = new Storage(this.appwriteService.getClient());
  }

  ngOnInit() {
    if (this.event) {
      this.eventForm.patchValue(this.event);
    }
  }

  private initForm(): FormGroup {
    const form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      start: ['', [Validators.required, this.futureDateValidator()]],
      end: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      location: ['', [Validators.required, Validators.maxLength(200)]],
      isWorkshop: [false],
      organizer: ['', [Validators.required, Validators.maxLength(100)]],
      image: [null],
      isFullDay: [false],
      admissionFee: [null, [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });

    // Add end date validator after form is created
    form.get('end')?.addValidators(this.endDateValidator(form));

    // Update end date validation when start date changes
    form.get('start')?.valueChanges.subscribe(() => {
      form.get('end')?.updateValueAndValidity();
    });

    // Update time inputs when isFullDay changes
    form.get('isFullDay')?.valueChanges.subscribe((isFullDay) => {
      if (isFullDay) {
        form.get('start')?.setValue(this.formatDateToGermanMidnight(form.get('start')?.value));
        form.get('end')?.setValue(this.formatDateToGermanMidnight(form.get('end')?.value));
      }
    });

    return form;
  }

  futureDateValidator() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const currentDate = new Date();
      const inputDate = new Date(control.value);
      return inputDate > currentDate ? null : { 'pastDate': true };
    };
  }

  endDateValidator(form: FormGroup) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const startDate = new Date(form.get('start')?.value);
      const endDate = new Date(control.value);
      return endDate > startDate ? null : { 'endDateBeforeStart': true };
    };
  }

  formatDateToGermanMidnight(date: string | null | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;
      this.eventForm.patchValue({image: file.name});
    }
  }

  async uploadImage(): Promise<string> {
    if (!this.imageFile) return '';

    try {
      const response = await this.storage.createFile(
        environment.appwrite.storageBucketId,
        'unique()',
        this.imageFile
      );
      return `https://appwrite.kncklab.com/v1/storage/buckets/${environment.appwrite.storageBucketId}/files/${response.$id}/view?project=${environment.appwrite.projectId}`;
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  }

  async onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      let imageUrl = '';
      
      if (this.imageFile) {
        imageUrl = await this.uploadImage();
      }
  
      const eventData: PabailarEvent = {
        ...this.event,
        ...formValue,
        createdBy: this.created_by_admin ? "admin" : "user",
        accepted: this.created_by_admin,
        start: this.formatDateToGermanTimezone(formValue.start),
        end: this.formatDateToGermanTimezone(formValue.end),
        admissionFee: formValue.admissionFee ? parseFloat(formValue.admissionFee) : null
      };
  
      // Only include the image field if an image was uploaded
      if (imageUrl) {
        eventData.image = imageUrl;
      }
  
      this.formSubmit.emit(eventData);
      this.clearForm();
    }
  }

  formatDateToGermanTimezone(date: string | null | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
  }

  clearForm() {
    this.eventForm = this.initForm();
    this.imageFile = null;
    if (this.event) {
      this.event = null;
    }
  }
}