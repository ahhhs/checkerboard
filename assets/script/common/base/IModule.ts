/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 模块接口
 */

export interface IModule {
    init(name: string);
    updete(dt: number);
    getName(): string;
}
