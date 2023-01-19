var status = -1;

function end(mode, type, selection) {
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
        qm.sendNext("你成功杀死了#o9001013#吗？哈哈哈。。。你确实是我的主人。好的，现在把你在那里找到的红珠玉给我。我得把它放回身上，然后。。。等等，你为什么不说一句话？别告诉我...你没带回来！");
    } else if (status == 1) {
        qm.sendNextPrev("什么你真的没有带回红珠玉吗？为什么？你刚刚完全忘记了吗？啊。。。即使有黑法师的诅咒，再加上时间的流逝，我从来没有想过我的主人会变得愚蠢。。。");
    } else if (status == 2) {
        qm.sendNextPrev("不，不，我不能让这让我绝望。这是我应该保持冷静和控制的时候，不像我的主人。。。\\r\nnoosah。。。");
    } else if (status == 3) {
        qm.sendNextPrev("即使你现在回到那里，小偷也很可能从那里逃走了。这意味着你必须重新制作红珠玉。你以前做过一个，所以你确实记得制作一个所需的材料，对吧？现在开始。。。");
    } else if (status == 4) {
        qm.sendNextPrev("\r\n\r\n\r\n这家伙肯定失去了所有的记忆!");
    } else if (status == 5) {
        qm.sendNextPrev("...没有希望，没有梦想。。。不，不!!");
    } else if (status == 6) {
        qm.completeQuest();
        qm.sendNextPrev("#b（摩诃开始歇斯底里了。我最好马上离开。也许利琳可以做点什么。）", 2);
    } else if (status == 7) {
        qm.dispose();
    }
}