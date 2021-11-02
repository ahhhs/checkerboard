/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description:
 */

const { ccclass, property } = cc._decorator;

@ccclass
export class LoadPrefab extends cc.Component {
    onLoad() {
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 2);
    }
    start() {}
    // update (dt) {}
}
