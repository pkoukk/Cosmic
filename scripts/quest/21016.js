var status = -1;

function start(mode, type, selection) {
    if (mode == 0 && type == 0) {
        status--;
    } else if (mode == -1) {
        qm.dispose();
        return;
    } else {
        status++;
    }
    if (status == 0) {
        qm.sendAcceptDecline("我们要继续你的基础训练吗？在开始之前，请确保您已经正确装备了您的剑，还有您的技能和药水。");
    } else if (status == 1) {
        if (mode == 0) {
            qm.sendNext("还没做好打猎#o0100132#的准备吗？最好在出发前做好万全的准备。别因为准备不充分而中途挂掉。");
            qm.dispose();
        } else {
            qm.forceStartQuest();
            qm.sendNext("很好。先从比#o0100131#稍微厉害一点的怪兽#r#o0100132##k，开始狩猎吧。去#b#m140020100##k抓获#r15只#k左右就行，这将对你的体能提高大有帮助。体力就是冒险的根本！赶紧出发吧！", 1);
        }
    } else if (status == 2) {
        qm.showInfo("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
        qm.dispose();
    }
}