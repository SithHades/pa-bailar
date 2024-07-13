export interface PabailarEvent {
    documentId?: string;
    title: string;
    start: Date;
    end: Date;
    description: string;
    location: string;
    accepted: boolean;
    createdBy: string;
    isWorkshop: boolean;
    organizer: string;
    createdAt?: Date;
    updatedAt?: Date;
    image: string;
}