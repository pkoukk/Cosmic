var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1) {
        //if (mode == 0)
        qm.sendNext("#b(请慎重考虑清楚。)#k");
        qm.dispose();
        return;
    }

    if (status == 0) {
        qm.sendNext("训练进行得怎么样？嗯......70级......这还不算多，但自从我第一次见到你时，你真的取得了一些进步。继续训练，我相信有一天你会恢复战斗前的状态。");
    } else if (status == 1) {
        qm.sendAcceptDecline("但在做这件事之前，我需要你回到雷恩待一段时间#b你的杆臂再次反应奇怪。看起来它有什么想告诉你的#k它可能会唤醒你隐藏的力量，所以请立即来。");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.sendOk("不管怎么说，我以为武器有自己的身份，但说真的。。。这武器不停地说话。它先是不停地哭，因为我没有真正注意到它的需要，然后。。。啊，请保守这个秘密。我不认为再打乱武器是个好主意。");
    } else if (status == 3) {
        qm.dispose();
    }
}