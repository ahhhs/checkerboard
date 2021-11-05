/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 事件管理器
 */

import { BaseModule } from '../common/base/BaseModule';

const { ccclass, property } = cc._decorator;

export class Observers {
    private callFunction: Function = null;
    private context: any = null;

    constructor(call: Function, context: any) {
        this.callFunction = call;
        this.context = context;
    }
    /**
     * 发送通知
     * @param args
     */
    public notify(...args: any[]) {
        let self = this;
        this.callFunction.call(self.context, args);
    }
    /**
     * 比较上下文
     * @param context
     * @returns
     */
    public conmpar(context): boolean {
        return this.context == context;
    }
}

@ccclass
export class PrEventManager extends BaseModule {
    private eventLIst = {};
    private static _instance: PrEventManager;
    public static get instance() {
        if (!this._instance) {
            this._instance = new PrEventManager();
        }
        return this._instance;
    }
    /**
     * 注册
     */
    public register(name: string, callFunction: Function, context: any) {
        let observers: Observers = this.eventLIst[name];

        if (!observers) {
            this.eventLIst[name] = [];
        }
        this.eventLIst[name].push(new Observers(callFunction, context));
    }
    /**
     * 发送
     */
    public fire(name, ...agrs: any[]) {
        let observers: Observers[] = this.eventLIst[name];
        if (!observers) return;
        let length = observers.length;
        for (let i = 0; i < length; i++) {
            observers[i].notify(name, ...agrs);
        }
    }
    /**
     * 移除事件
     */
    public removeListEvent(name: string, context: any) {
        let observers: Observers[] = this.eventLIst[name];
        if (!observers) return;

        let length = observers.length;
        for (let i = 0; i < length; i++) {
            if (observers[i].conmpar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete this.eventLIst[name];
        }
    }
    /**
     * 移除所有事件
     */
    public removeAllListEvent() {
        this.eventLIst = {};
    }
}
