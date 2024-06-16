/**
 * 动态为根元素设置字体大小
 */
function init() {
  /** 设计图尺寸 */
  const designSize = 1080
  // 获取屏幕宽度
  const width = document.documentElement.clientWidth
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
