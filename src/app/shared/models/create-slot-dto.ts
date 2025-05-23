export interface CreateSlotDTO {
    slotId: string;
    date: Date;
    startTime: string; // Example format: "HH:mm:ss"
    endTime: string;
    userId: string;
    status : string; // Optional: Defaults to 'Pending'
    lockedBy?: string | null;
  }
