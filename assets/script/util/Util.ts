/*
 * Copyright (C) 2021, Flickering Inc. All rights reserved.
 * Author: wenqianqin (wenqianqin@flickering.ai)
 *
 * Description: 工具类
 */

export default class Util {
    /**
     * 断言对象是否为空
     * @param obj
     */
    public static isObjeEmpty(obj: any): boolean {
        if (obj === null || obj === undefined) {
            return true;
        } else {
            return false;
        }
    }
}
