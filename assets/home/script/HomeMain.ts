/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description:
 */

import { GG } from '../../script/GG';

const { ccclass, property } = cc._decorator;

@ccclass
export class HomeMain extends cc.Component {
    onLoad() {
        GG.instance.init();
        GG.Info().log('哈哈')();
    }
    start() {}
    // update (dt) {}
}
