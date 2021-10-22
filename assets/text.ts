/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description:
 */

import { GG } from './script/GG';

const { ccclass, property } = cc._decorator;

@ccclass
export default class text extends cc.Component {
    onLoad() {
        // GG.MgrLoad.loadMusic('res', 'music/l3_1_bgm').then((music) => {
        //     GG.Log.log('准备加载了', music)();
        // });
        GG.MgrMusic.setBundleUrl();
        GG.MgrMusic.playSound('res/music/', 'l3_1_bgm');
    }
}
