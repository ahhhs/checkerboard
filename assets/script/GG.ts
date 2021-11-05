/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description:
 */

import { IModule } from './common/base/IModule';
import { EnumModuleName } from './data/PrEnumData';
import { PrLocalData } from './data/PrLocalData';
import { PrPathData } from './data/PrPathData';
import { PrEventManager } from './manager/PrEventManager';
import { PrLoadResouceManager } from './manager/PrLoadResourceManager';
import { PrLogUtil } from './manager/PrLogUtil';
import { PrMusicManager } from './manager/PrMusicManager';
import { PrPopupManager } from './manager/PrPopupManager';
import Util from './util/Util';
export class GG {
    // private static MgrLog = new PrLogUtil(); //日志
    // private static MgrPath = new PrPathData(); //路径
    // private static MgrEvent = new PrEventManager(); //事件管理器
    // private static MgrLoad = new PrLoadResouceManager(); //加载管理器
    // private static MgrMusic = new PrMusicManager(); //音频管理器
    // private static MgrPopup = new PrPopupManager(); //弹窗管理器

    static Util = Util; //工具
    static LocaiData = PrLocalData; //本地缓存

    private static _instance: GG;

    public static get instance() {
        if (!this._instance) {
            this._instance = new GG();
        }
        return this._instance;
    }
    private moduleArr: IModule[] = [];

    init() {
        this.addModuel(EnumModuleName.Log, PrLogUtil);
    }
    public addModuel<A extends IModule>(moduleName: string, M: new () => A) {
        let modules = new M();
        modules.init(moduleName);
        this.moduleArr.push(modules);
    }
    public getModule(module: EnumModuleName) {
        let modules: IModule = null;
        for (let i = 0; i < this.moduleArr.length; i++) {
            if (this.moduleArr[i].getName() === module) {
                modules = this.moduleArr[i];
            }
        }
        return modules;
    }
    static getModuleType<A extends IModule>(name: EnumModuleName): A {
        return GG._instance.getModule(name) as A;
    }
    static getPath() {
        return this.getModuleType<PrPathData>(EnumModuleName.Path);
    }
    static getEvent() {
        return this.getModuleType<PrEventManager>(EnumModuleName.Event);
    }
    static getLoad() {
        return this.getModuleType<PrLoadResouceManager>(EnumModuleName.Load);
    }
    static getMusic() {
        return this.getModuleType<PrMusicManager>(EnumModuleName.Music);
    }
    static getPopup() {
        return this.getModuleType<PrPopupManager>(EnumModuleName.Popup);
    }
    static Info() {
        return this.getModuleType<PrLogUtil>(EnumModuleName.Log);
    }
    static Error(...data) {
        let log = GG._instance.getModule(EnumModuleName.Log) as PrLogUtil;
        if (log) {
            return log.error(...data);
        } else {
            throw new Error(JSON.stringify(data));
        }
    }
}
