export interface PabailarEvent {
    $id?: string
    $createdAt?: string
    $updatedAt?: string
    title: string
    start: string
    end: string
    description: string
    location: string
    accepted: boolean
    createdBy: string
    organizer?: string
    image?: string | null
    isFullDay: boolean
    admissionFee: number | null
}
