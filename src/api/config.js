export const RET = {
  OK: '2000',
  NODATA: '2001',
  DATAEXIST: '2002',
  DATAERR: '2003',
  PARAMERR: '4000',
  SESSIONERR: '4001',
  LOGINERR: '4002',
  USERERR: '4003',
  ROLEERR: '4004',
  PWDERR: '4005',
  REQERR: '4006',
  IPERR: '4007',
  URLNOTFOUND: '4040',
  INTERNALERR: '5000',
  DBERR: '5001',
  THIRDERR: '5002',
  IOERR: '5003',
  UNKOWNERR: '5004'
};

export const errorMap = {
  [RET.OK]: 'successfully!',
  [RET.NODATA]: 'no data!',
  [RET.DATAEXIST]: 'data exist!',
  [RET.DATAERR]: 'data error!',
  [RET.PARAMERR]: 'parameter error!',
  [RET.SESSIONERR]: 'user not logged in!',
  [RET.LOGINERR]: 'user login failed!',
  [RET.USERERR]: 'user does not exist or not activated!',
  [RET.ROLEERR]: 'user role error!',
  [RET.PWDERR]: 'password error!',
  [RET.REQERR]: 'illegal request or limited number of requests',
  [RET.IPERR]: 'IP restricted!',
  [RET.URLNOTFOUND]: 'request address error!',
  [RET.INTERNALERR]: 'internal server error!',
  [RET.DBERR]: 'database query error!',
  [RET.THIRDERR]: 'third party system error!',
  [RET.IOERR]: 'file read or write error!',
  [RET.UNKOWNERR]: 'unknown error!'
};

export const serverConfig = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://codex-web.vercel.app/api_1_0' // 生产环境使用 https
      : 'http://120.25.76.18/api_1_0', // 非生产环境使用 http
  useTokenAuthorization: true // 是否开启 token 认证
};
