const requiredMessage = '这是必填项'
// 账号密码登录验证规则
export const accountRules = {
  name: [
    {
      required: true,
      message: requiredMessage,
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5~10个字母或者数字',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: requiredMessage,
      trigger: 'blur',
    },
    {
      pattern: /^[a-z0-9]{5,}$/,
      message: '密码必须是5位以上的字母或数字',
      trigger: 'blur',
    },
  ],
}
