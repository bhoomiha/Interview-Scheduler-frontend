export interface PanelWindow {
    panelWindowId: string; // Guid as string
    panelWindowName: string;
    startDate: Date;
    endDate: Date;
    skillSet: string;
    panelMembers?: PanelMemberWithSkillSetDTO[];
  }
  
  export interface PanelMemberWithSkillSetDTO {
    name: string; 
    level: string;
    skillSet: string;
  } 
  