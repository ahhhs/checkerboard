import { BaseModule } from '../common/base/BaseModule';
import { IModule } from '../common/base/IModule';

export enum Authority {
    LEVEL5 = 5,
    LEVEL4 = 4,
    LEVEL3 = 3,
    LEVEL2 = 2,
    LEVEL1 = 1,
}
/**
 * 日志管理器
 * @description 能打印相应权限的log,以及自定义log. 自定义屏蔽权限,
 * 以及精确定位log路径.
 * 封装了时间等常规格式,以及动态添加脚本函数name
 * 暂时无法正常输出匿名函数的脚本name
 *
 * 示例: CrLogManagers.log1("输出log")();
 *      CrLogManagers.assignLog("Type","输出log")();
 */
export class PrLogUtil extends BaseModule {
    // public  script = "";//脚本名字
    public authority: number = 2; //当前权限等级 数值越高 权限越高
    public isSpecified: boolean = false; //指定输出开关 true是指定 false不是
    public logFun = {
        LEVEL1: false,
        LEVEL2: false,
        LEVEL3: false,
        wenqian: false,
    };
    isAssert = true; //用于断言
    logObj;
    public setAuthority(value: number) {
        this.authority = value;
    }
    public log(...value: any[]) {
        if (CC_EDITOR) {
            cc.log(value);
        } else if (this.output(Authority.LEVEL1)) {
            if (CC_DEBUG) {
                let e = new Error();
                return (this.logObj = console.log.bind(
                    this,
                    this.joint(this.getSpriteName(e)),
                    ...value
                ));
            }
        }
        return () => {};
    }
    public log1(...value: any[]) {
        if (CC_EDITOR) {
            cc.log(value);
        } else if (this.output(Authority.LEVEL2)) {
            if (CC_DEBUG) {
                let e = new Error();
                return (this.logObj = console.log.bind(
                    this,
                    this.joint(this.getSpriteName(e)),
                    value
                ));
            }
        }
        return () => {};
    }
    public log2(...value: any[]) {
        if (CC_EDITOR) {
            cc.log(value);
        } else if (this.output(Authority.LEVEL3)) {
            if (CC_DEBUG) {
                let e = new Error();
                return (this.logObj = console.log.bind(
                    this,
                    this.joint(this.getSpriteName(e)),
                    ...value
                ));
            }
        }
        return () => {};
    }
    /**
     * 断言某个对象一定为空
     * @param value 断言对象
     * @param error 断言失败后的错误信息
     */
    public AssertEmpty(value: any, error: string) {
        if (this.isAssert === false) {
            return;
        }

        if (value !== null && value !== undefined) {
            return this.error(error);
        }
    }
    /**
     * 断言某个对象一定不为空
     * @param value 断言对象
     * @param error 断言失败后的错误信息
     */
    public AssertNotEmpty(value: any, error: string) {
        if (this.isAssert === false) {
            return;
        }

        if (value === null || value === undefined) {
            return this.error(error);
        }
    }
    public error(...value: any[]) {
        if (CC_EDITOR) {
            cc.error(value);
        } else {
            let e = new Error();
            return (this.logObj = console.error.bind(
                this,
                this.joint(this.getSpriteName(e)),
                ...value
            ));
        }
        return () => {};
    }
    public warn(...value: any[]) {
        if (CC_EDITOR) {
            cc.warn(value);
        } else {
            let e = new Error();
            return (this.logObj = console.warn.bind(
                this,
                this.joint(this.getSpriteName(e)),
                ...value
            ));
        }
        return () => {};
    }
    public trace(...value: any[]) {
        if (CC_EDITOR) {
            cc.log(value);
        } else {
            let e = new Error();
            return (this.logObj = console.trace.bind(
                this,
                this.joint(this.getSpriteName(e)),
                ...value
            ));
        }
        return () => {};
    }
    /**
     * 指定的log输出
     */
    public assignLog(logName: string, ...value: any[]) {
        if (this.isExist(logName) && this.isSpecifiedInstructs(logName)) {
            if (CC_EDITOR) {
                cc.log(value);
            } else {
                if (CC_DEBUG) {
                    let e = new Error();
                    return (this.logObj = console.log.bind(
                        this,
                        this.joint(this.getSpriteName(e)),
                        ...value
                    ));
                }
            }
        }
        return () => {};
    }
    /**
     * 判断日志
     * @param i
     * @returns
     */
    public output(i) {
        if (this.isSpecifiedInstruct(i)) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 判断权限类型
     */
    public isSpecifiedInstruct(instruct: number) {
        if (!this.logFun['LEVEL' + instruct]) {
            return true;
        }
        return false;
    }
    /**
     * 判断是否需要指定输出
     */
    public isSpecifiedInstructs(instruct: string) {
        if (!this.logFun[instruct]) {
            return true;
        }
        return false;
    }
    /**
     * 是否有该类型的log
     * @param logName
     * @returns
     */
    public isExist(logName: string) {
        if (this.logFun[logName] != null && this.logFun[logName] != undefined) {
            return true;
        }
        return false;
    }
    public joint(spriteName: string) {
        let t = new Date();
        let hours = t.getHours();
        let minutes = t.getMinutes();
        let seconds = t.getSeconds();
        let milliseconds = t.getMilliseconds();
        return (
            //'-----------' +
            //'\n' +
            '时间:' +
            hours +
            ':' +
            minutes +
            ':' +
            seconds +
            ':' +
            milliseconds +
            ' | ' +
            '脚本名字: ' +
            spriteName +
            ' | '
        );
    }
    public getSpriteName(e) {
        let data1 = this.indexFunc(e.stack);
        let data2 = this.indexFunc2(e.stack);

        return this.sub(e.stack, data1, data2);
    }
    public indexFunc(string: string) {
        let data = string.indexOf('at ') + 2;
        let data1 = string.indexOf('at ', data) + 2;
        let data2 = string.indexOf('at ', data + data1) + 2;
        return data2;
    }
    public indexFunc2(string: string) {
        let data = string.indexOf(' (') + 1;
        let data1 = string.indexOf(' (', data) + 1;
        let data2 = string.indexOf(' (', data1 + data) + 1;
        return data2;
    }
    public sub(str: string, value, value2) {
        return str.substring(value, value2);
    }
}
