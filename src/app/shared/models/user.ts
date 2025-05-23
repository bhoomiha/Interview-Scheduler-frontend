export interface User {
    userId?: string;
    name: string;
    email: string;
    password?: string;
    designation: string;
    skill?: string; // Optional for GET but required for CREATE
    reportingManager: string;
    experience: number;
    roleId?: number; // Used for CREATE
    roleName?: string;
  
}
