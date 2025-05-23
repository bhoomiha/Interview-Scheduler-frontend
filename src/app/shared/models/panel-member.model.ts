export interface PanelMember {
    userId: string; //GUID
    name?: string;
    email?: string;
    password?: string;
    designation: string;
    skill: string;
    reportingManager: string;
    experience: number;
    roleId: number;
  }