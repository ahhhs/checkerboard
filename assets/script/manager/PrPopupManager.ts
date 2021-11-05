/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 弹窗管理器
 */

import { BaseModule } from '../common/base/BaseModule';
import { BasePopupModule, IPopupData } from '../common/base/BasePopupModule';
import { GG } from '../GG';

const { ccclass, property } = cc._decorator;

@ccclass
export class PrPopupManager extends BaseModule {
    //弹窗数组
    private windowArr: IPopupData[] = [];
    //正在显示的弹窗
    private showWindow: BasePopupModule = null;

    /**
     * 添加一个弹窗
     * @param module
     */
    addPopupModue(module: BasePopupModule) {
        this.windowArr.push(module);
    }
    /**
     * 弹出一个弹窗,并且删除旧数据
     */
    popupModule() {
        let prepareWindow: BasePopupModule = this.windowArr[
            this.windowArr.length - 1
        ] as BasePopupModule;
        GG.Info().AssertNotEmpty(prepareWindow, '弹窗模块数据错误!');
        if (prepareWindow === this.showWindow) {
            return;
        }
        this.showWindow.clear();
        this.showWindow = (this.windowArr.splice(1, this.windowArr.length) as BasePopupModule[])[0];
        this.showWindow.showPopup();
    }
    clear() {
        this.windowArr.forEach((node: BasePopupModule) => {
            node.destroy();
        });
        this.windowArr = [];
    }
}
