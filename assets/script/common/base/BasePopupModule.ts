/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 基础弹窗模块
 */

import { BaseModule } from './BaseModule';

export interface IPopupData {
    clear(); //清除函数
    showPopup(); //显示函数
}

export class BasePopupModule extends BaseModule implements IPopupData {
    init(name: string) {
        super.init(name);
    }
    clear() {}
    showPopup() {}
}
