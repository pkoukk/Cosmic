/*
	NPC Name: 		Kinu
	Description: 		Quest - Cygnus tutorial helper
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0 && type > 0) {
        qm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("普通攻击是易于使用的基本技能。重要的是你要记住，真正的狩猎是用你的技能完成的。我建议你重新考虑。");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("#h0#. 我是 #p1102006#，我一直在等你,  我就是你要见的第三个兄弟。 你已经学会了如何使用普通攻击了？\r\n 好的，接下来我会教你 #b如何使用技能#k, 这对探索冒险岛世界很有帮助！");
    } else if (status == 1) {
        qm.sendNextPrev("你每次升级都会获得技能点数，你可能已经攒了一些了。按#bK键#k查看您的技能。将你的技能点数投入到你想要强化的技能中，不要忘记#b将技能放在快捷键上，以方便使用#k。");
    } else if (status == 2) {
        qm.sendAcceptDecline("是时候实战练习一下了。你会在这个地区发现很多#o100121#。你可以使用你的#b三只蜗牛#b技能狩猎#r3只#o100121#s#k，并给我带来1个#b#t4000483##k作为证据？我会在这里等你。");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.guideHint(8);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == -1 || mode == 0 && type > 0) {
        qm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        qm.sendNext("你已经成功地打败了 #o100121# 并给我带来了 一个 #t4000483#. 太棒了! #b当你正式成为骑士之后，每一级会获得3个技能点数，接下来请照着箭头走去找我的兄弟 #b#p1102007##k, 他将告诉你下一步怎么做。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 40 经验值");
    } else if (status == 1) {
        qm.gainItem(4000483, -1);
        qm.forceCompleteQuest();
        qm.gainExp(40);
        qm.dispose();
    }
}