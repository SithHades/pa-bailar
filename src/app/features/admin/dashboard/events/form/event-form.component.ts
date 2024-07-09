import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event } from '../../../../../core/models/event.model';
import { CommonModule } from '@angular/common'
import { AuthService } from '../../../../../core/services/auth.service'

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
    ]
})
export class EventFormComponent implements OnInit {
  @Input() event: Event | null = null;
  @Output() formSubmit = new EventEmitter<Event>();
  
  eventForm: FormGroup;

  created_by_admin: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.authService.isAdminLoggedIn().subscribe(loggedIn => this.created_by_admin = loggedIn)
  }

  ngOnInit() {
    if (this.event) {
      this.eventForm.patchValue(this.event);
    }
  }

  async onSubmit() {
    console.log("Submitting Event")
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventData: Event = {
        ...this.event,
        ...formValue,
        created_by: this.created_by_admin ? "admin" : "user",
        accepted: this.created_by_admin
      };
      this.formSubmit.emit(eventData);
    }
  }
}