export const getNowTime = () => {
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  // 获取当前日期
  const year = String(now.getFullYear())
  const month = ('0' + (now.getMonth() + 1)).slice(-2)
  const day = ('0' + now.getDate()).slice(-2)
  const preDay = ('0' + yesterday.getDate()).slice(-2)

  // 获取当前时间
  const hours = ('0' + now.getHours()).slice(-2)
  const minutes = ('0' + now.getMinutes()).slice(-2)

  // 设置时间初始值
  const startTime = [hours, minutes]
  const endTime = [hours, minutes]

  // 设置日期初始值
  const startDate = [year, month, preDay]
  const endDate = [year, month, day]

  return { startTime, startDate, endTime, endDate } // 只获取不修改
}

export const getPastNow = (i: number) => {
  const now = new Date()

  // 获取当前日期
  const nowYear = String(now.getFullYear())
  const nowMonth = ('0' + (now.getMonth() + 1)).slice(-2)
  const nowDay = ('0' + now.getDate()).slice(-2)

  // 获取当前时间
  const nowHours = ('0' + now.getHours()).slice(-2)
  const nowMinutes = ('0' + now.getMinutes()).slice(-2)

  // 设置时间初始值
  const startTime = [nowHours, nowMinutes]
  const endTime = [nowHours, nowMinutes]

  const past = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
  const pastYear = String(past.getFullYear())
  const pastMonth = String(
    past.getMonth() + 1 > 9 ? past.getMonth() + 1 : '0' + (past.getMonth() + 1)
  )
  const pastDay = String(past.getDate() > 9 ? past.getDate() : '0' + past.getDate())

  const pastDate = [pastYear, pastMonth, pastDay]
  const nowDate = [nowYear, nowMonth, nowDay]
  return { pastDate, nowDate, startTime, endTime }
}
