import api from '../constant/api'
import { md5 } from 'js-md5'
import mockJS from 'better-mock'

mockJS.setup({ timeout: '20-200' })

// mock 登录接口
mockJS.mock('https://ezcloud.uniview.com' + api.login, () => {
  return {
    code: 200,
    data: {
      id: 1,
      name: 'xujie',
      userType: 1,
    },
    message: 'success',
  }
})

const mockP2P = {
  username: 'admin',
  ip: '127.0.0.1',
  port: 15865,
}

const devPwd = 'Admin123'

// 开始检索
mockJS.mock(
  `http://${mockP2P.username}:${md5(devPwd)}@${mockP2P.ip}:${mockP2P.port}${api.startObjectSearch}`,
  () => {
    return {
      Response: {
        ResponseURL: api.startObjectSearch,
        ResponseCode: 0,
        ResponseString: 'OK',
        Data: {
          SearchID: 1,
        },
      },
    }
  }
)

let Percent = 0
// 查询进度
mockJS.mock(
  `http://${mockP2P.username}:${md5(devPwd)}@${mockP2P.ip}:${mockP2P.port}${api.getSearchProgress}`,
  () => {
    return {
      Response: {
        ResponseURL: api.getSearchProgress,
        ResponseCode: 0,
        ResponseString: 'OK',
        Data: {
          Percent: Percent === 100 ? (Percent = 50) : (Percent += 50),
        },
      },
    }
  }
)

// 获取检索结果
mockJS.mock(
  `http://${mockP2P.username}:${md5(devPwd)}@${mockP2P.ip}:${mockP2P.port}${api.getMessageList}`,
  () => {
    return {
      Response: {
        ResponseURL: api.getMessageList,
        ResponseCode: 0,
        ResponseString: 'OK',
        Data: {
          Total: 20,
          Num: 10,
          SmartObjectInfoList: [
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: '',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: '',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: '鲁A123456',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
            {
              RecordID: 0,
              Type: 30,
              Time: 1731497410,
              ChannelID: 1,
              ChannelName: 'IP Camera 04',
              FullPicture: {
                Name: 'ubs_5_0_0_0_0_0_141_62_28390_1731497410',
                URL: '/LAPI/V1.0/System/Picture?Type=1&Index=ubs_5_0_0_0_0_0_141_62_28390_1731497410&Size=337444',
                Size: 337444,
                Data: '',
              },
              ObjectList: [
                {
                  ObjectID: 1,
                  ObjectPicture: {
                    Name: '',
                    Size: 0,
                    Data: '',
                  },
                  ObjectInfo: {
                    ObjectType: 4,
                    VehicleInfo: {
                      Position: '0,0;0,0',
                      RuleInfo: {
                        RuleType: 1,
                        TrigerType: 0,
                        PointNum: 0,
                        PointList: [],
                      },
                      PlateMatchType: 255,
                      VehicleAttributeInfo: {
                        Type: 9,
                        Color: 3,
                        ImageDirection: 1,
                        VehicleBrand: '99',
                      },
                      PlateAttributeInfo: {
                        PlateNo: 'A1388',
                        Color: 4,
                        Type: 1,
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    }
  }
)

// 关闭检索
mockJS.mock(
  `http://${mockP2P.username}:${md5(devPwd)}@${mockP2P.ip}:${mockP2P.port}${api.stopSearch}`,
  () => {
    return {
      Response: {
        ResponseURL: api.stopSearch,
        ResponseCode: 0,
        ResponseString: 'OK',
        Data: {},
      },
    }
  }
)
