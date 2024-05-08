export interface Address {
    street: string
    city: string
    zip: string
    state?: string
    country?: string
}

export interface BookingOption {
    id: string
    name: string
    price: number
    unit: 'hour' | 'minutes'
    minDuration: number
    maxDuration: number
    initialFee?: number
    baseDuration?: number
    bookingInterval?: number // in minutes
    advanceNotice?: number // in hours
    payment: 'offline' | 'online'
    requiredTelephoneNumber: boolean
    requiredAddress: boolean
    allowUserComment: boolean
    cancellation: CancellationOption
}

export interface CancellationOption {
    refundable: boolean
    refundableUntil?: Date
    refundPercentage?: number
    refundableFee?: number
}

export interface AvailabilityRule {
    dayOfWeek: number
    startTime: string
    endTime: string
    available: boolean
}

export interface Room {
    id: string
    images: string[]
    name: string
    description: string
    address: Address
    bookingOption: BookingOption
    availability: AvailabilityRule[]
    acceptAutomated: boolean
    type: string
}
