/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description:
 */

export enum EnumEvent {}

export enum EnumLocalData {
    Music = 'MusicData',
}
export enum EnumMusicType {
    Off = '0',
    On = '1',
}

export let EnumModuleName = makeStrEnum(['Log', 'Path', 'Event', 'Load', 'Music', 'Popup']);
export type EnumModuleName = keyof typeof EnumModuleName;

export function makeStrEnum<T extends string>(o: Array<T>): { [K in T]: K } {
    return o.reduce((res, key) => {
        res[key] = key;
        return res;
    }, Object.create(null));
}
