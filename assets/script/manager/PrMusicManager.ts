// import { LocalSave } from "../Facility/LocalSave";
// import {UI} from "../UI/UI";

import { BaseModule } from '../common/base/BaseModule';
import { EnumMusicType } from '../data/PrEnumData';
import { GG } from '../GG';

export class PrMusicManager extends BaseModule {
    audioID = -1; //声音的id
    bundleUrl: string = 'resources';
    /**
     * 播放背景音乐
     */
    playBgMusic(url: string, musicName: string) {
        let status: EnumMusicType = GG.LocaiData.getMusicData();
        if (status == EnumMusicType.On) {
            let music = GG.getLoad().getLoadListItem(musicName);
            if (music) {
                cc.audioEngine.stopAll();
                this.audioID = cc.audioEngine.play(music, true, 1);
            } else {
                GG.getLoad().getLoadListItem(musicName) ||
                    GG.getLoad()
                        .loadMusic(this.bundleUrl, url + '/' + musicName)
                        .then((music: cc.AudioClip) => {
                            cc.audioEngine.stopAll();
                            this.audioID = cc.audioEngine.play(music, true, 1);
                        });
            }
        }
    }
    /**
     * 停止背景音乐
     */
    stopBgMusic() {
        if (this.audioID != -1) {
            cc.audioEngine.stop(this.audioID);
        }
    }
    /**
     * 播放音效
     * @param url 路径
     * @param audioName 音效昵称
     */
    playSound(url, audioName) {
        this.playSoundFunc(url, audioName, null);
    }
    /**
     * 播放音效有回调
     * @param url 资源路径
     * @param audioName
     * @param func
     */
    playSoundFunc(url: string, audioName, cb: Function) {
        let status: EnumMusicType = GG.LocaiData.getMusicData();
        if (status == EnumMusicType.On) {
            let music = GG.getLoad().getLoadListItem(audioName);
            if (music) {
                let soundID = cc.audioEngine.playEffect(music, false);
                cc.audioEngine.setFinishCallback(soundID, function () {
                    cb && cb();
                });
            } else {
                GG.getLoad()
                    .loadMusic(this.bundleUrl, url + audioName)
                    .then((music: cc.AudioClip) => {
                        let soundID = cc.audioEngine.playEffect(music, false);
                        cc.audioEngine.setFinishCallback(soundID, function () {
                            cb && cb();
                        });
                    });
            }
        }
    }
    /**
     * 点击的音效
     */
    playClickSound() {
        // let status = LocalSave.getSoundStatus();
        // if (status == 1) {
        //     cc.audioEngine.playEffect(UI.clickEffect, false);
        // }
    }
    /**
     * 判断当前是在哪个场景下
     * 更改资源包的路径
     */
    setBundleUrl() {
        switch (cc.director.getRunningScene().name) {
            case 'test':
                this.bundleUrl = 'game';
                break;
        }
    }
}
