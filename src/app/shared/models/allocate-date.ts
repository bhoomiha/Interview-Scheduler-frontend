export interface AllocateDate {
    id: number;
    //panelMemberId: string; // GUID
    name: string;
    startDate: Date;
    endDate: Date;
    level: InterviewLevel;
  }
  
  export enum InterviewLevel {
    L0 = 'L0',
    L1 = 'L1',
    L2 = 'L2',
    L3 = 'L3'
  }