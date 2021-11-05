/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 基础弹窗模块
 */

export interface IPopupData {
    clear(); //清除函数
    showPopup(); //显示函数
}

export class BasePopupModule extends cc.Component implements IPopupData {
    popupNode: cc.Node = null;
    onLoad() {
        this.node.active = false;
    }
    clear() {
        cc.tween(this.node)
            .to(0.2, { scale: 1.1 })
            .to(0.1, { scale: 0 })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
    showPopup() {
        this.node.active = true;
        this.node.scale = 0.8;
        cc.tween(this.node).to(0.2, { scale: 1.1 }).to(0.1, { scale: 1 }).start();
    }
}
