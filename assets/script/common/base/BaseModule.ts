/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description:基础模块
 */

import { GG } from '../../GG';
import { IModule } from './IModule';

const { ccclass, property } = cc._decorator;

@ccclass
export class BaseModule implements IModule {
    private name: string = null;
    init(name: string) {
        GG.Log.AssertNotEmpty('昵称不能为空!', name);
        this.name = name;
    }
    updete(dt: number) {}
    getName(): string {
        return this.name;
    }
}
