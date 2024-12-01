import { ref } from 'vue'
import type { ListInstance } from 'vant'

export function useListRefreshDisabled(listRefName: string) {
  /** 是否禁用 VanPullRefresh 的滚动事件 */
  const refreshDisabled = ref(false)
  /** 列表的滚动距离*/
  const scrollTop = ref<number>(0)

  /** VanList 的引用 */
  const listRef = useTemplateRef<ListInstance>(listRefName)

  onMounted(() => {
    scrollTop.value = listRef.value?.$el.scrollTop || 0
    if (listRef.value) {
      listRef.value?.$el.addEventListener('scroll', () => {
        scrollTop.value = listRef.value?.$el.scrollTop || 0
      })
    }
  })

  // 根据 VanList 的滚动距离，判断是否禁用 VanPullRefresh 的滚动事件
  watch(scrollTop, () => {
    if (scrollTop.value <= 0) {
      refreshDisabled.value = false
    } else {
      refreshDisabled.value = true
    }
  })

  return {
    refreshDisabled,
  }
}
