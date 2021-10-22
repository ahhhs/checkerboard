/*
 * Author: ahhh (new_q8@163.com)
 *
 * Description: 等比例适配
 */

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export class AdaptivesComm extends cc.Component {
    init() {
        this.fixedViewSize();
    }
    private fixedViewSize() {
        const disignSize = cc.view.getDesignResolutionSize();
        const designScale = disignSize.width / disignSize.height;
        const nodeSize = cc.size(disignSize.width, disignSize.height);
        let size = cc.view.getFrameSize();
        let scale = size.width / size.height;
        if (scale < designScale) nodeSize.height = nodeSize.width / scale;
        else nodeSize.width = nodeSize.height * scale;
        this.node.setContentSize(nodeSize);
    }
}
