import { BaseModule } from '../common/base/BaseModule';

/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description: 路径管理
 */
const { ccclass, property } = cc._decorator;
@ccclass
export class PrPathData extends BaseModule {
    // static HomeUIPaht = `db://assets/config/hallUIPath.json`; //大厅ui层json保存的路径
    ABFilePath = `db://assets/`; //ab包
}
