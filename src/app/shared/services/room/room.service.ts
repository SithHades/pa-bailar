import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Room } from '../../models/room'

@Injectable({
    providedIn: 'root',
})
export class RoomService {
    constructor() {}

    getRoom(id: string): Observable<Room> {
        return of({
            id: id,
            images: [
                'https://via.placeholder.com/480x320',
                'https://via.placeholder.com/150',
                'https://via.placeholder.com/480x320',
            ],
            name: 'Cozy Studio Apartment',
            description:
                'A comfortable studio apartment ideal for solo travelers or couples.',
            address: {
                street: '123 Main Street',
                city: 'New York',
                zip: '10001',
                state: 'NY',
                country: 'USA',
            },
            bookingOption: {
                id: '1',
                name: 'Standard Booking',
                price: 50,
                unit: 'hour',
                minDuration: 1,
                maxDuration: 24,
                payment: 'online',
                requiredTelephoneNumber: true,
                requiredAddress: true,
                allowUserComment: true,
                cancellation: {
                    refundable: true,
                    refundableUntil: new Date(),
                    refundPercentage: 50,
                },
            },
            availability: [
                {
                    dayOfWeek: 1,
                    startTime: '08:00',
                    endTime: '18:00',
                    available: true,
                },
                {
                    dayOfWeek: 2,
                    startTime: '10:00',
                    endTime: '18:00',
                    available: true,
                },
                {
                    dayOfWeek: 2,
                    startTime: '20:00',
                    endTime: '22:00',
                    available: true,
                },
            ],
            acceptAutomated: true,
            type: 'Tanzstudio',
        })
    }

    getRooms(): Observable<Room[]> {
        return of([
            {
                id: '1',
                images: [
                    'https://via.placeholder.com/480x320',
                    'https://via.placeholder.com/150',
                    'https://via.placeholder.com/480x320',
                ],
                name: 'Cozy Studio Apartment',
                description:
                    'A comfortable studio apartment ideal for solo travelers or couples.',
                address: {
                    street: '123 Main Street',
                    city: 'New York',
                    zip: '10001',
                    state: 'NY',
                    country: 'USA',
                },
                bookingOption: {
                    id: '1',
                    name: 'Standard Booking',
                    price: 50,
                    unit: 'hour',
                    minDuration: 1,
                    maxDuration: 24,
                    payment: 'online',
                    requiredTelephoneNumber: true,
                    requiredAddress: true,
                    allowUserComment: true,
                    cancellation: {
                        refundable: true,
                        refundableUntil: new Date(),
                        refundPercentage: 50,
                    },
                },
                availability: [
                    {
                        dayOfWeek: 1,
                        startTime: '08:00',
                        endTime: '18:00',
                        available: true,
                    },
                    {
                        dayOfWeek: 2,
                        startTime: '08:00',
                        endTime: '18:00',
                        available: true,
                    },
                ],
                acceptAutomated: true,
                type: 'Tanzstudio',
            },
            {
                id: '2',
                images: [
                    'https://via.placeholder.com/480x320',
                    'https://via.placeholder.com/150',
                ],
                name: 'Spacious Loft with City View',
                description:
                    'A stylish loft apartment with stunning views of the city skyline.',
                address: {
                    street: '456 Elm Street',
                    city: 'San Francisco',
                    zip: '94107',
                    state: 'CA',
                    country: 'USA',
                },
                bookingOption: {
                    id: '2',
                    name: 'Premium Booking',
                    price: 100,
                    unit: 'hour',
                    minDuration: 2,
                    maxDuration: 12,
                    payment: 'online',
                    requiredTelephoneNumber: true,
                    requiredAddress: true,
                    allowUserComment: true,
                    cancellation: {
                        refundable: true,
                        refundableUntil: new Date(),
                        refundPercentage: 75,
                    },
                },
                availability: [
                    {
                        dayOfWeek: 2,
                        startTime: '12:00',
                        endTime: '22:00',
                        available: true,
                    },
                ],
                acceptAutomated: true,
                type: 'Tanzstudio',
            },
        ])
    }
}
