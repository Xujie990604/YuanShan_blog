enum LogColor {
  LOG = '#909399',
  INFO = '#909399',
  ERROR = '#F56C6C',
  WARN = '#E6A23C',
}

type consoleType = 'log' | 'info' | 'error' | 'warn'

const isProduction = process.env.NODE_ENV === 'production'

// 模拟原生APP的日志打印方法
// TODO: 入参形式尚不明确
function mockAPPLog(title: string, content: any) {
  console.log('在原生APP中输出日志', title, content)
}

// 美化打印
export default function () {
  function formatPrint(type: consoleType, color: string, title: string, content: any[]) {
    // 生产环境屏蔽 WEB 日志
    if (isProduction) {
      return
    }
    console[type](
      `%c${title}`,
      `background: ${color}; border: 1px solid ${color}; padding: 1px 8px; border-radius: 2px; color: #fff;`,
      ...content
    )
  }
  // 基础信息打印
  const log = (title: string = 'Log', ...content: any[]) => {
    formatPrint('log', LogColor.LOG, title, content)
    mockAPPLog(title, content)
  }
  const info = (title: string = 'Info', ...content: any[]) => {
    formatPrint('info', LogColor.INFO, title, content)
    mockAPPLog(title, content)
  }

  const warn = (title: string = 'Warn', ...content: any[]) => {
    formatPrint('warn', LogColor.WARN, title, content)
    mockAPPLog(title, content)
  }
  const error = (title: string = 'Error', ...content: any[]) => {
    formatPrint('error', LogColor.ERROR, title, content)
    mockAPPLog(title, content)
  }

  return {
    log,
    info,
    error,
    warn,
  }
}
