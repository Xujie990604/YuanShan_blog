import { CloudMockInstance } from '../mock-service/mock-service-instance'
import api from '../../constant/api'

// mock 登录接口
CloudMockInstance.mock(api.login, () => {
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
