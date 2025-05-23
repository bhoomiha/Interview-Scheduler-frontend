export interface SlotTA {
    
    slotId: string; // GUID
    date: string;
    startTime: string; // TimeSpan equivalent in string format (HH:mm:ss)
    endTime: string;
    status: string;
    lockedBy?: string | null; // Nullable GUID
    userId?: string; // GUID
    isLocked?: boolean;
    panelMemberName: string;
    level?: string | null; // Level as enum or string (depending on backend)
    panelWindow?: string | null;
    reportingManager?:string |null;
  }