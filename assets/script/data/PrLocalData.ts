/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 本地缓存类
 */

import { BaseModule } from '../common/base/BaseModule';
import { EnumLocalData, EnumMusicType } from './PrEnumData';

export class PrLocalData extends BaseModule {
    public getMusicData(): EnumMusicType {
        let data = cc.sys.localStorage.getItem(EnumLocalData.MusicData) || EnumMusicType.On;
        return data;
    }
    public setMusicData(music: EnumMusicType) {
        cc.sys.localStorage.setItem(EnumLocalData.MusicData, music);
    }
}
