export interface MapPanelMembers {
    name: string;
    level: InterviewLevel;
    experience?: number;
    skill?: string;
  }

export enum InterviewLevel {
    L0 = 'L0',
    L1 = 'L1',
    L2 = 'L2',
    L3 = 'L3'
  }