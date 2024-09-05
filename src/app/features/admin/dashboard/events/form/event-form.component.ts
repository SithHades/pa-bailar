import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms'
import { PabailarEvent } from '../../../../../core/models/event.model'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../../../../core/services/auth.service'
import { AppwriteService } from '../../../../../core/services/appwrite.service'
import { Storage } from 'appwrite'
import { environment } from '../../../../../../environments/environment'

@Component({
    selector: 'app-event-form',
    standalone: true,
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    imports: [CommonModule, ReactiveFormsModule],
})
export class EventFormComponent implements OnInit {
    @Input() event: PabailarEvent | null = null
    @Output() formSubmit = new EventEmitter<PabailarEvent>()

    eventForm: FormGroup
    created_by_admin: boolean = false
    imageFile: File | null = null
    storage: Storage

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private appwriteService: AppwriteService
    ) {
        this.eventForm = this.initForm()
        this.authService
            .isAdminLoggedIn()
            .subscribe(loggedIn => (this.created_by_admin = loggedIn))
        this.storage = new Storage(this.appwriteService.getClient())
    }

    ngOnInit() {
        if (this.event) {
            this.patchFormWithEvent(this.event)
        }
    }

    private initForm(): FormGroup {
        const form = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(100)]],
            startDate: ['', [Validators.required]],
            startTime: ['', Validators.required],
            endDate: ['', [Validators.required]],
            endTime: ['', Validators.required],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            location: ['', [Validators.required, Validators.maxLength(200)]],
            organizer: ['', [Validators.required, Validators.maxLength(100)]],
            image: [null],
            isFullDay: [false],
            admissionFee: [
                null,
                [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)],
            ],
        })

        form.get('startDate')?.valueChanges.subscribe(() =>
            this.updateEndDate()
        )
        form.get('startTime')?.valueChanges.subscribe(() =>
            this.updateEndTime()
        )
        form.get('isFullDay')?.valueChanges.subscribe(isFullDay => {
            if (isFullDay) {
                form.patchValue({
                    startTime: '00:00',
                    endTime: '23:59',
                })
            }
        })

        return form
    }

    private patchFormWithEvent(event: PabailarEvent) {
        const startDate = new Date(event.start)
        const endDate = new Date(event.end)

        this.eventForm.patchValue({
            ...event,
            startDate: this.formatDateForInput(startDate),
            startTime: this.formatTimeForInput(startDate),
            endDate: this.formatDateForInput(endDate),
            endTime: this.formatTimeForInput(endDate),
        })
    }

    private formatDateForInput(date: Date): string {
        return date.toISOString().split('T')[0]
    }

    private formatTimeForInput(date: Date): string {
        return date.toTimeString().slice(0, 5)
    }

    updateEndDate() {
        const startDate = this.eventForm.get('startDate')?.value
        if (startDate) {
            this.eventForm.patchValue({ endDate: startDate })
        }
    }

    updateEndTime() {
        const startTime = this.eventForm.get('startTime')?.value
        if (startTime) {
            const [hours, minutes] = startTime.split(':')
            const endTime = new Date(2000, 0, 1, +hours + 1, +minutes)
            this.eventForm.patchValue({
                endTime: endTime.toTimeString().slice(0, 5),
            })
        }
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0]
        if (file) {
            this.imageFile = file
            this.eventForm.patchValue({ image: file.name })
        }
    }

    async uploadImage(): Promise<string> {
        if (!this.imageFile) return ''

        try {
            const response = await this.storage.createFile(
                environment.appwrite.storageBucketId,
                'unique()',
                this.imageFile
            )
            return `${environment.appwrite.endpoint}/storage/buckets/${environment.appwrite.storageBucketId}/files/${response.$id}/view?project=${environment.appwrite.projectId}`
        } catch (error) {
            console.error('Error uploading image:', error)
            return ''
        }
    }

    async onSubmit() {
        if (this.eventForm.valid) {
            const formValue = this.eventForm.value
            let imageUrl = ''

            if (this.imageFile) {
                imageUrl = await this.uploadImage()
            }

            const startDateTime = this.combineDateAndTime(
                formValue.startDate,
                formValue.startTime
            )
            const endDateTime = this.combineDateAndTime(
                formValue.endDate,
                formValue.endTime
            )

            if (!this.isValidDateRange(startDateTime, endDateTime)) {
                console.error('Invalid date range')
                console.log('Start:', startDateTime, 'End:', endDateTime)
                return
            }
            delete formValue.startDate
            delete formValue.startTime
            delete formValue.endDate
            delete formValue.endTime
            let eventData: PabailarEvent = {
                ...this.event,
                ...formValue,
                createdBy: this.created_by_admin ? 'admin' : 'user',
                accepted: this.created_by_admin,
                start: this.formatDateToGermanTimezone(startDateTime),
                end: this.formatDateToGermanTimezone(endDateTime),
                admissionFee: formValue.admissionFee
                    ? parseFloat(formValue.admissionFee)
                    : null,
            }

            if (imageUrl) {
                eventData.image = imageUrl
            }
            this.formSubmit.emit(eventData)
            this.clearForm()
        } else {
            console.error('Form is invalid', this.eventForm.errors)
            Object.keys(this.eventForm.controls).forEach(key => {
                const control = this.eventForm.get(key)
                if (control?.invalid) {
                    console.error(key, control.errors)
                }
            })
        }
    }

    combineDateAndTime(date: string, time: string): Date {
        const [day, month, year] = date.split('.').map(Number)
        const [hours, minutes] = time.split(':').map(Number)
        return new Date(year, month - 1, day, hours, minutes)
    }

    isValidDateRange(start: Date, end: Date): boolean {
        const now = new Date()
        return start < end && start >= now
    }

    formatDateToGermanTimezone(date: Date): string {
        return date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })
    }

    clearForm() {
        this.eventForm.reset()
        this.imageFile = null
        if (this.event) {
            this.event = null
        }
    }
}
