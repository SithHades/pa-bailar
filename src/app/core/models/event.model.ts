export interface PabailarEvent {
    $id?: string;
    $createdAt?: string;
    $updatedAt?: string;
    title: string;
    start: string;
    end: string;
    description: string;
    location: string;
    accepted: boolean;
    createdBy: string;
    isWorkshop: boolean;
    organizer: string;
    image: string | null;
  }