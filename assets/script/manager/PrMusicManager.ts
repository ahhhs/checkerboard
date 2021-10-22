// import { LocalSave } from "../Facility/LocalSave";
// import {UI} from "../UI/UI";

import { EnumMusicType } from '../data/PrEnumData';
import { GG } from '../GG';

export class PrMusicManager {
    static audioID = -1; //声音的id
    static bundleUrl: string = 'resources';
    /**
     * 播放背景音乐
     */
    static playBgMusic(url: string, musicName: string) {
        let status: EnumMusicType = GG.LocaiData.getMusicData();
        if (status == EnumMusicType.On) {
            let music = GG.MgrLoad.getLoadListItem(musicName);
            if (music) {
                cc.audioEngine.stopAll();
                PrMusicManager.audioID = cc.audioEngine.play(music, true, 1);
            } else {
                GG.MgrLoad.getLoadListItem(musicName) ||
                    GG.MgrLoad.loadMusic(this.bundleUrl, url + '/' + musicName).then(
                        (music: cc.AudioClip) => {
                            cc.audioEngine.stopAll();
                            PrMusicManager.audioID = cc.audioEngine.play(music, true, 1);
                        }
                    );
            }
        }
    }
    /**
     * 停止背景音乐
     */
    static stopBgMusic() {
        if (PrMusicManager.audioID != -1) {
            cc.audioEngine.stop(PrMusicManager.audioID);
        }
    }
    /**
     * 播放音效
     * @param url
     * @param audioName
     */
    static playSound(url, audioName) {
        this.playSoundFunc(url, audioName, null);
    }
    /**
     * 播放音效有回调
     * @param url 资源路径
     * @param audioName
     * @param func
     */
    static playSoundFunc(url: string, audioName, cb: Function) {
        let status: EnumMusicType = GG.LocaiData.getMusicData();
        if (status == EnumMusicType.On) {
            let music = GG.MgrLoad.getLoadListItem(audioName);
            if (music) {
                let soundID = cc.audioEngine.playEffect(music, false);
                cc.audioEngine.setFinishCallback(soundID, function () {
                    cb && cb();
                });
            } else {
                GG.MgrLoad.loadMusic(this.bundleUrl, url + audioName).then(
                    (music: cc.AudioClip) => {
                        let soundID = cc.audioEngine.playEffect(music, false);
                        cc.audioEngine.setFinishCallback(soundID, function () {
                            cb && cb();
                        });
                    }
                );
            }
        }
    }
    /**
     * 点击的音效
     */
    static playClickSound() {
        // let status = LocalSave.getSoundStatus();
        // if (status == 1) {
        //     cc.audioEngine.playEffect(UI.clickEffect, false);
        // }
    }

    static setBundleUrl() {
        switch (cc.director.getRunningScene().name) {
            case 'test':
                this.bundleUrl = 'game';
                break;
        }
    }
}
