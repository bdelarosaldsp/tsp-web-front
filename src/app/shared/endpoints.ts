
export const Endpoint = {
  // Login
  BASE:``||'',
  AUTH: {
    
    PRE_LOGIN: `auth/preLogin`,
    LOGIN: `auth/login`,
    VERIFY_TOKEN: `auth/verifyToken`,
    LOGOUT: `auth/logout`,
    RESET_PASSWORD: `auth/password/resetChange`,
    RESET_PASSWORD_FIND: `auth/password/find`,
    SING_UP: `auth/signup`,
    SING_UP_ACTIVATE: `auth/signup/EmailVerified`,
    SING_UP_EXTERNAL: `auth/signup/validateExternal`,
    CHANGE_PASSWORD: `auth/password/change`,
    RESET_PASSWORD_REQUEST: `auth/password/resetRequest`,
    GET_QR: `auth/getQr`,
    ENABLE_2_FA: `auth/enable2fa`,
  },
  GET_MENUS:{
    BASE: `menus`,
    GET_ACTIVES: `menus/actions/GetActives`
  },
  CLIENTS:{
    BASE: `clients`,
    GET_ACTIVES: `clients/actions/GetActives`
  },
  IDENTIFICATION_TYPES : {
    BASE : `identificationTypes`,
    GET_ACTIVES : `identificationTypes/GetActives`,
  },
  CUM_IMAGES:{
    BASE: `images`,
    GET_ACTIVES: `images/actions/GetActives`,
    UPLOAD: `images/actions/upload`,
    GET_FACTURA: `images/actions/validate`,
    GET_REMESAS_OTM:`images/actions/GetRemesasOtm`,
    VALIDA_IMAGENES: `images/actions/ValidarImagenes`,
    GET_SENDMAIL:`images/actions/sendimgmail/`,
    IMG_MAIL:`images/actions/imgmail/`
  },
  TRAZABILITY:{
    BASE: `trazability`,
    GET_FACAB:`trazability/actions/GetFacab`,
    GET_MASIVO:`trazability/actions/GetMasivo`,
    GET_PEDFAC:`trazability/actions/GetPedfac`,
    GET_OD:`trazability/actions/GetOd`,
    GET_NOVEDADES:`trazability/actions/GetNovedades`,
    GET_CUMPLIDOS:`trazability/actions/GetCumplidos`,

  },
  GENERALES:{
    BASE: `general`,
    GET_MANTENIMIENTO: `general/actions/GetMantenimiento`,
  },
  MESSAGES:{
    BASE: `messages`,
    ADD_MESSAGE: `/actions/Add`,
    GET_LIST: `/actions/GetList`,
    CHANGE_STATE: `/actions/ChangeState`,
    READ_MESSAGE: `/actions/ReadMessage`,
    DELETE_MESSAGE: `/actions/DeleteMessage`,
  },
  USERS:{
    BASE: `users`
  },

}