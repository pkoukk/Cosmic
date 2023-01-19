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
        qm.sendNext("与黑法师战斗的英雄们的记录已经不多了。甚至在《预言书》中，唯一可用的信息就是他们有五个人。关于他们是谁或他们长什么样，这一点都没有记载。你还记得什么吗？", 8);
    } else if (status == 1) {
        qm.sendNextPrev("我什么都不记得了。。。", 2);
    } else if (status == 2) {
        qm.sendNextPrev("正如我所料。黑法师的诅咒足以抹去你所有的记忆。但即使是这样，我们相信有一天你会都想起来，特别是现在我们确信你是英雄之一。我知道你在战斗中失去了盔甲和武器，但。。。哦，我差点忘了！您的#b武器#k！", 8);
    } else if (status == 3) {
        qm.sendNextPrev("我的武器？", 2);
    } else if (status == 4) {
        qm.sendNextPrev("之前在冰雪中挖掘英雄时曾经找到一些厉害的武器。当时推测应该是英雄使用过的东西，因此保存在村庄中央。您经过时没看到吗？ #b#p1201001##k... \r\r#i4032372#\r\r长成这样...", 8);
    } else if (status == 5) {
        qm.sendNextPrev("仔细想想，我确实在镇上看到了一个#p1201001#。", 2);
    } else if (status == 6) {
        qm.sendAcceptDecline("是的，就是这样。根据记录，英雄的武器会认出它的合法主人，如果你是使用#p1201001#的英雄，当你抓住#p1201001#时，#p1201001#会做出反应。请找到#b#p1201001#并单击它。#k");
    } else if (status == 7) {
        if (mode == 0 && type == 15) {
            qm.sendNext("是什么阻止了你？我保证，即使#p1201001#对你没有任何反应，我也不会失望。请冲过去，拿上#p1201001#。只需单击它。", 8);
        } else {
            qm.forceCompleteQuest();
            qm.sendOk("假如 #p1201001#有反应的话，您就使用#p1201001#的英雄 #b狂狼勇士#k。", 8);
            qm.showIntro("Effect/Direction1.img/aranTutorial/ClickPoleArm");
        }
    } else if (status == 8) {
        qm.dispose();
    }
}