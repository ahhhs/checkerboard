/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description:
 */

import { EnumLocalData, EnumMusicType } from './PrEnumData';

export class PrLocalData {
    public static getMusicData(): EnumMusicType {
        let data = cc.sys.localStorage.getItem(EnumLocalData.Music) || EnumMusicType.On;
        return data;
    }

    public static setMusicData(music: EnumMusicType) {
        cc.sys.localStorage.setItem(EnumLocalData.Music, music);
    }
}
