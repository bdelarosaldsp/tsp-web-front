import { environment } from "../../environments/environment";

export const Endpoint = {
  // Login
  AUTH: {
    
    PRE_LOGIN: `${environment.apiUrl}auth/preLogin`,
    LOGIN: `${environment.apiUrl}auth/login`,
    VERIFY_TOKEN: `${environment.apiUrl}auth/verifyToken`,
    LOGOUT: `${environment.apiUrl}auth/logout`,
    RESET_PASSWORD: `${environment.apiUrl}auth/password/resetChange`,
    RESET_PASSWORD_FIND: `${environment.apiUrl}auth/password/find`,
    SING_UP: `${environment.apiUrl}auth/signup`,
    SING_UP_ACTIVATE: `${environment.apiUrl}auth/signup/EmailVerified`,
    CHANGE_PASSWORD: `${environment.apiUrl}auth/password/change`,
    RESET_PASSWORD_REQUEST: `${environment.apiUrl}auth/password/resetRequest`,
    GET_QR: `${environment.apiUrl}auth/getQr`,
    ENABLE_2_FA: `${environment.apiUrl}auth/enable2fa`,
    
    

  },
  GET_MENUS:{
    BASE: `${environment.apiUrl}menus`,
    GET_ACTIVES: `${environment.apiUrl}menus/actions/GetActives`
  },
  IDENTIFICATION_TYPES : {
    BASE : `${environment.apiUrl}identificationTypes`,
    GET_ACTIVES : `${environment.apiUrl}identificationTypes/GetActives`,
  }
}