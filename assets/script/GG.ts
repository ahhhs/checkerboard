/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description:
 */

import { PrPathData } from './data/PrPathData';
import { PrEventManager } from './manager/PrEventManager';
import { PrLoadResouceManager } from './manager/PrLoadResourceManager';
import { PrLogUtil } from './manager/PrLogUtil';
export class GG {
    static Log = PrLogUtil; //日志
    static Path = PrPathData; //路径
    static MgrEvent = PrEventManager; //事件管理器
    static MgrLoad = PrLoadResouceManager; //加载管理器
}
