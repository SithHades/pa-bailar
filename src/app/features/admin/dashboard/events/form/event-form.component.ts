import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PabailarEvent } from '../../../../../core/models/event.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { AppwriteService } from '../../../../../core/services/appwrite.service';
import { Storage } from 'appwrite';
import { environment } from '../../../../../../environments/environment'

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
  
  eventForm!: FormGroup
  created_by_admin: boolean = false;
  imageFile: File | null = null;
  storage: Storage;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private appwriteService: AppwriteService
  ) {
    this.initForm();
    this.authService.isAdminLoggedIn().subscribe(loggedIn => this.created_by_admin = loggedIn);
    this.storage = new Storage(this.appwriteService.getClient());
  }

  ngOnInit() {
    if (this.event) {
      this.eventForm.patchValue(this.event);
    }
  }

  private initForm() {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      location: ['', [Validators.required, Validators.maxLength(200)]],
      isWorkshop: [false],
      organizer: ['', [Validators.required, Validators.maxLength(100)]],
      image: ['']
    });
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
        image: imageUrl,
        createdBy: this.created_by_admin ? "admin" : "user",
        accepted: this.created_by_admin
      };
      this.formSubmit.emit(eventData);
      this.clearForm();
    }
  }

  clearForm() {
    this.initForm();
    this.imageFile = null;
    if (this.event) {
      this.event = null;
    }
  }
}