export default {
  lapiInvoke: '/openapi/device/lapi/invoke', // 透明通道接口
  login: '/api/login',
  searchList: '/api/search',
  startObjectSearch: '/LAPI/V1.0/Channels/Smart/ObjectSearch/Start',
  getSearchProgress: '/LAPI/V1.0/Channels/Smart/ObjectSearch/Progress?SearchID=<SearchID>',
  getMessageList:
    '/LAPI/V1.0/Channels/Smart/ObjectSearch?SearchID=<SearchID>&Limit=<Limit>&Offset=<Offset>',
  stopSearch: '/LAPI/V1.0/Channels/Smart/ObjectSearch/Stop',
  SystemCapabilities: '/LAPI/V1.0/System/Capabilities',
}
