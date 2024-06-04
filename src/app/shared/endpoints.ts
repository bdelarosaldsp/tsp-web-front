
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
    GET_REMESAS_OTM_PLA:`images/actions/GetRemesasOtmPla`,
    VALIDA_IMAGENES: `images/actions/ValidarImagenes`,
    GET_SENDMAIL:`images/actions/sendimgmail/`,
    IMG_MAIL:`images/actions/imgmail/`
  },
  TRAZABILITY:{
    BASE: `trazability`,
    GET_FACAB:`/actions/GetFacab`,
    GET_MASIVO:`/actions/GetMasivo`,
    GET_PEDFAC:`/actions/GetPedfac`,
    GET_OD:`/actions/GetOd`,
    GET_NOVEDADES:`/actions/GetNovedades`,
    GET_CUMPLIDOS:`/actions/GetCumplidos`,

  },
  GENERALES:{
    BASE: `general`,
    GET_MANTENIMIENTO: `/actions/GetMantenimiento`,
    GET_ALMACENES: `/actions/GetAlmacenes`,
    GET_OPOTMCAB:`/actions/GetOperacionOtmCab`,
    GET_OPOTMDET:`/actions/GetOperacionOtmDet`,
  },
  MESSAGES:{
    BASE: `messages`,
    ADD_MESSAGE: `/actions/Add`,
    EDIT_MESSAGE:`/actions/Edit`,
    GET_LIST: `/actions/GetList`,
    CHANGE_STATE: `/actions/ChangeState`,
    READ_MESSAGE: `/actions/ReadMessage`,
    DELETE_MESSAGE: `/actions/DeleteMessage`,
  },
  RNDC:{
    BASE:`rndc`,
    FIND_DOCUMENT:`/actions/FindDocument`,
    GET_ERRORES:'/actions/GetErrores',
    GET_DETALLE:'/actions/GetDetalleReg',
    GET_DETALLE_ERR:'/actions/GetDetalleError',
    GET_CABEZA:'/actions/GetCabeza',
    SAVE_REGISTER:'/actions/SaveRegister',
    RESEND:'/actions/RetransmiteReg',
    GET_DESTINATARIOS:'/actions/GetDestinatarios',
    SET_DESTINATARIO:'/actions/setDestinatario',
    GET_PROPIETARIOS:'/actions/GetPropietarios',
  },
  USERS:{
    BASE: `users`
  },
  PEDIDOS:{
    BASE: `pedidos`,
    VAL_ARTICLES:`/actions/valArticles`,
    IMPORT_ENTRADA: `/actions/createFileEnt`,
    IMPORT_SALIDA: `/actions/createFileSal`,
  },
  REPORTS:{
    BASE: `report`,
    GET_TRANSMISIONES:`/actions/GetTransmisiones`,
    GET_PROCESOS:`/actions/GetTransmisionesProcesos`,
    GET_HISTORIAL:`/actions/GetHistorialTransmisiones`,
    GET_RANGOSREUMEN:`/actions/GetRangosResumen`,
    GET_RESUMENOTM:`/actions/GetResumenPlanillas`,
    GET_PLANILLASINTRA:`/actions/GetPlanillasIntra`,
  }

}