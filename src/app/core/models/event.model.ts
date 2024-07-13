export interface Event {
    documentId?: string;
    created_at?: Date;
    title: string;
    start: Date;
    end: Date;
    description: string;
    location: string;
    accepted: boolean;
    createdBy: string;
    isWorkshop: boolean | null;
    organizer: string;
    createdAt?: Date;
    updatedAt?: Date;
    image: string;
}