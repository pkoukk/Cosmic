/*
	NPC Name: 		Kisan
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
            qm.sendNext("#h0#. 我是 #p1102006#，我一直在等你,  我就是你要见的第三个兄弟。 你已经学会了如何使用普通攻击了？\r\n 好的，接下来我会教你 #b如何使用技能#k, 这对探索冒险岛世界很有帮助！");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("有许多方法打猎，但最基本的方法是用你的 #b普通攻击#k. 你只需要手里有一把武器就足够了，因为它就只是对怪物挥动武器而已。");
    } else if (status == 1) {
        qm.sendNextPrev("请按 #bCtrl#k 使用你的普通攻击. 通常下 Ctrl 位于 #b键盘的左下角#k, 但你并不需要我告诉你对不对？ 发现Ctrl 并尝试攻击！");
    } else if (status == 2) {
        qm.sendAcceptDecline("现在，我们来实战测试一下吧。在这里，你可以找到圣地里最弱的 #r#o100120##k , 它很适合你。尝试狩猎 #r1只#k. 我会给你奖励的。");
    } else if (status == 3) {
        qm.forceStartQuest();
        qm.guideHint(4);
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
        qm.sendNext("啊，看来你成功地猎到了 #o100120#. P很简单，对吧？普通攻击用起来很简单，但它们非常弱。不过，别担心。#p1102006# 会教会你如何使用更强大的技能。等等，你走之前让我给你个应得的奖励。");
    } else if (status == 1) {
        qm.sendPrev("这个装备是给贵族用的。比你现在穿的酷多了，对吧？跟着你左边的箭去见我弟弟 #b#p1102006##k. 换一套新的贵族服装再走怎么样？ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i1002869# #t1002869# - 1 \r\n#i1052177# #t1052177# - 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 30 exp");
    } else if (status == 2) {
        qm.gainItem(1002869, 1);
        qm.gainItem(1052177, 1);
        qm.forceCompleteQuest();
        qm.gainExp(30);
        qm.guideHint(6);
        qm.dispose();
    }
}