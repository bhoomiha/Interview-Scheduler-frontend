export interface Interview {
    interviewId: string;
    slotId: string;
    candidateName: string;
    status: string;
    panelMemberName: string;
    reportingManager: string;
    date: string; // Date as ISO string
    startTime: string; // Time as string (e.g., "HH:mm:ss")
    endTime: string;
  }
  