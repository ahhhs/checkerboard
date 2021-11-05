/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description:基础模块
 */

import { IModule } from './IModule';

const { ccclass, property } = cc._decorator;

@ccclass
export class BaseModule implements IModule {
    private name: string = null;
    init(name: string) {
        this.name = name;
    }
    updete(dt: number) {}
    getName(): string {
        return this.name;
    }
}
