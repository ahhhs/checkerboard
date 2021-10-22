/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description:
 */

import { PrLocalData } from './data/PrLocalData';
import { PrPathData } from './data/PrPathData';
import { PrEventManager } from './manager/PrEventManager';
import { PrLoadResouceManager } from './manager/PrLoadResourceManager';
import { PrLogUtil } from './manager/PrLogUtil';
import { PrMusicManager } from './manager/PrMusicManager';
import Util from './util/Util';
export class GG {
    static Log = PrLogUtil; //日志
    static Path = PrPathData; //路径

    static MgrEvent = PrEventManager; //事件管理器
    static MgrLoad = PrLoadResouceManager; //加载管理器
    static MgrMusic = PrMusicManager; //音频管理器

    static Util = Util; //工具
    static LocaiData = PrLocalData; //本地缓存
}
