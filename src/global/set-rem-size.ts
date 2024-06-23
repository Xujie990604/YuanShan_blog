/**
 * 动态为根元素设置字体大小
 */
function init() {
  /** 设计图尺寸 */
  const designSize = 1080
  // 获取屏幕宽度
  const width = document.documentElement.clientWidth
  // TODO: 使用 rem 作为响应式单位不合理，因为会有其他内容(例如：Vuetify)依赖 rem 的大小
  // 思路一：新增一个单位用来做响应式，比如 rpx
  // 思路二：使用 POSTCSS 将 rpx 转换为 px
  // 设置根元素字体大小(rem)
  document.documentElement.style.fontSize = width / designSize + 'px'
  // console.info(`当前宽度为: ${width}px, 当前每rem代表: ${width / designSize}px`)
}

// 首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)
