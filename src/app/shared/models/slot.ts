export interface Slot {
    isLocked?: boolean;
    slotId: string; // GUID
    date: string;
    startTime: string; // TimeSpan equivalent in string format (HH:mm:ss)
    endTime: string;
    status: string;
    lockedBy?: string | null; // Nullable GUID
    userId: string; // GUID
  }

  export type CreateSlotDTO = Omit<Slot, 'slotId'> & { slotId: string }; // ✅ Include slotId
