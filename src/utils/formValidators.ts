interface params {
  required?: boolean,
  trigger?: string,
  lengthRange?: boolean
}

interface formValidatorsFunction{
  (x: params): any[]
}


const formValidators: formValidatorsFunction = function(params) {
  // 被返回的验证规则数组
  const validatorList: any[] = []
  // 默认的验证时机
  const trigger = params.trigger ?? 'blur'

  // 字段是否为必填
  if(params.required) {
    validatorList.push({
      required: true,
      message: '这是必填项',
      trigger
    })
  }

  // 验证长度是否为 3-8
  // TODO: 使用正则表达式进行验证
  if(params.lengthRange) {
    const validator = (rule:any, value:any, callback:any) => {
      if (value.length > 8 || value.length < 3) {
        callback(new Error('密码长度需要在3-8'))
      }
      callback()
    }
    validatorList.push({
      validator,
      trigger
    })
  }

  return validatorList
}

export default formValidators