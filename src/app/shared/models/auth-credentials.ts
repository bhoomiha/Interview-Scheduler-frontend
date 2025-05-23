export interface AuthCredentials {

    email: string;
  password: string;
}


export interface LoginResponse {
  accessToken: string;
  userId: number;
  role: string;
  requiresMfa?: boolean;
  isFirstLogin?: boolean;
  refreshToken?: string;
}


export interface VerifyOtpResponse {
  accessToken: string;
  userId: number;
  role: string;
  requiresPasswordChange: boolean;
  isFirstLogin?: boolean;
  refreshToken?: string;
}

export interface ChangePasswordResponse {
  accessToken: string;
  userId: number;
  role: string;
  isFirstLogin?: boolean;
  refreshToken?: string;
}



export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}


// src/app/shared/models/revoke-token-response.ts
export interface RevokeTokenResponse {
  success: boolean;
  message: string;
}
