/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description: 加载管理器
 */

import { GG } from '../GG';

const { ccclass, property } = cc._decorator;

@ccclass
export class PrLoadResouceManager {
    private static _instance: PrLoadResouceManager;
    private static loadList: Map<string, any> = new Map();

    public static get instance() {
        if (!this._instance) {
            this._instance = new PrLoadResouceManager();
        }
        return this._instance;
    }
    /**
     * 加载预制体
     * @param url 路径
     * @param asserts 资源name
     * @returns
     */
    public static loadPrefab(url: string, asserts: string) {
        return new Promise<void>((res, rej) => {
            if (CC_EDITOR) {
                this.editorLoad(GG.Path.ABFilePath + url + '/' + asserts + '.prefab');
            } else {
                cc.assetManager.loadBundle(url, (ell, bundle: cc.AssetManager.Bundle) => {
                    if (ell) {
                        GG.Log.AssertEmpty(asserts, 'ab包加载失败')();
                        rej();
                    } else {
                        bundle.load(asserts, (ell, asserts) => {
                            if (ell) {
                                GG.Log.AssertEmpty(asserts, '加载失败')();
                                rej();
                            } else {
                                if (asserts instanceof cc.Prefab) {
                                    GG.Log.log1('加载预制体 ' + asserts.name + ' 成功...')();
                                    this.loadList.set(asserts.name, asserts);
                                    res();
                                }
                            }
                        });
                    }
                });
            }
        });
    }
    /**
     * 加载图片资源
     * @param url
     * @param resName
     */
    public static loadPicRes(url: string, resName: string) {
        return new Promise((res, rej) => {
            cc.assetManager.loadBundle(url, (err, bundle) => {
                if (!err) {
                    bundle.load(resName, cc.SpriteFrame, (ell, ress) => {
                        GG.Log.log1('加载图片资源' + ress + '成功')();
                        res(ress);
                    });
                }
            });
        });
    }
    /**
     * 加载预制体文件夹
     * @param url 路径
     * @param fileName 文件夹name
     */
    public static loadPrefabs(url: string, fileName: string) {
        return new Promise<void>((res) => {
            cc.assetManager.loadBundle(url, (ell, bundle: cc.AssetManager.Bundle) => {
                bundle.loadDir(fileName, (ell, asserts) => {
                    for (let i = 0; i < asserts.length; i++) {
                        this.loadList.set(asserts[i].name, asserts[i]);
                    }
                    res();
                });
            });
        });
    }
    /**
     * 加载music
     * @param url
     * @param musicName
     * @returns
     */
    public static loadMusic(url: string, musicName: string) {
        return new Promise((res, rej) => {
            cc.assetManager.loadBundle(url, (err, bundle) => {
                if (!err) {
                    bundle.load(musicName, cc.AudioClip, (ell, asserts) => {
                        GG.Log.log1('加载音频资源' + asserts + '成功')();
                        this.loadList.set(asserts.name, asserts);
                        res(asserts);
                    });
                }
            });
        });
    }
    /**
     * 获得加载列表
     * @returns
     */
    public static getLoadList() {
        return this.loadList;
    }
    public static getLoadListItem(itemName: string) {
        let data = this.loadList.get(itemName);
        GG.Log.AssertEmpty(data, '缓存列表无数据')();
        return this.loadList.get(itemName);
    }
    /**
     * 编辑器模式加载
     * @param path
     * @param cb
     */
    public static editorLoad(path: string, cb?: Function) {
        const fileUuid = Editor.assetdb.remote.urlToUuid(path);
        this.getAssetByUuid(fileUuid, cb);
    }
    public static getAssetByUuid(uuid: string, cb?: Function) {
        cc.assetManager.loadAny(uuid, (err, asset) => {
            if (cb) {
                cb(err, asset);
            }
        });
    }
}
