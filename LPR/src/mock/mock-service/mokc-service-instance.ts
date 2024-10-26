import mockJS from './mock-service-class';
import {APItypeEnum} from '../../constant/globalEnum';

// TODO：TS 文件中如何使用 hook
// import {useAppInfoStore} from '../../stores/app-info/app-info';
// const AppInfoStore = useAppInfoStore()


// * 20-200 ms 是最接近真实的延迟

/**
 * 对 CLOUD  接口的拦截
 */
export const CloudMockInstance = new mockJS('20-200', "https://ezcloud.uniview.com", APItypeEnum.CLOUD);




