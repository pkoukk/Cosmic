/*
	NPC Name: 		Nineheart
	Description: 		Quest - Do you know the black Magician?
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
        if (status == 8) {
            qm.sendNext("哦，你还有什么问题吗？我可以从头给你解释一遍");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("嗨, #h0#. 来迎来到 #p1101000# 骑士团. 我的名字是 #p1101002# 目前担任年轻的女皇的战略家。我们最好认识一下，因为我们会经常见面。。哈哈！");
    } else if (status == 1) {
        qm.sendNextPrev("我敢肯定，你有很多的问题，因为一切都发生得太快。我会一个一个解释这一切，从这是哪到你要做什么。");
    } else if (status == 2) {
        qm.sendNextPrev("这个岛叫做圣地。多亏了女皇的魔法，这座岛通常像空中的小船一样漂浮在空中，在冒险岛世界周围巡逻。不过，现在我们停在这里是有原因的。");
    } else if (status == 3) {
        qm.sendNextPrev("这位年轻的女皇是冒险岛世界的统治者。什么？什么这是你第一次听说她？啊，是的。嗯，她是冒险岛世界的统治者，但她不喜欢控制它。她只从远处观察，以确保一切正常。嗯，至少通常情况是这样的。");
    } else if (status == 4) {
        qm.sendNextPrev("但现在不是这样。我们已经在整个冒险岛世界找到了预示着黑法师复活的迹象。我们不能让黑法师就像以前一样威胁冒险岛世界了！");
    } else if (status == 5) {
        qm.sendNextPrev("但那是很久以前的事了，今天的人们还没意识到黑法师有多可怕。我们都被我们今天所享受的和平的冒险岛世界宠坏了，也忘记了冒险岛世界曾经是多么的混乱和可怕。如果我们不做点什么，黑暗魔法师将再次统治冒险岛世界！");
    } else if (status == 6) {
        qm.sendNextPrev("这就是为什么年轻的女皇决定自己动手。她正在组建勇敢的骑士团，以彻底击败黑法师。你知道该做什么了对吧？是的，去报名成为一名骑士吧。");
    } else if (status == 7) {
        qm.sendNextPrev("我们必须变得更强，这样我们就算黑魔法师复活，我们也能打败他。我们的首要目标是防止他破坏冒险岛世界，而你将发挥重要的作用。");
    } else if (status == 8) {
        qm.sendAcceptDecline("我的解释到此结束。你还有别的问题吗？ \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 380 经验");
    } else if (status == 9) {
        if (!qm.isQuestStarted(20016)) {
            qm.forceStartQuest();
            qm.gainExp(380);
        }
        qm.sendNext("我很高兴你清楚我们目前的状况，但以你现在的等级你还不够强大，无法面对黑法师的手下，更不用说黑法师自己了。你怎么能在这个等级保护冒险岛世界呢？");
    } else if (status == 10) {
        qm.sendNextPrev("虽然你已经有了骑士身份，但你还不能被认可为骑士。你不是官方骑士，因为连见习骑士都不是。如果你保持目前的水平，你只会是#1101000#骑士的杂工。");
    } else if (status == 11) {
        qm.sendNextPrev("但没有人生来就是一名强大的骑士。女皇要的不是强壮的人，而是有勇气可以通过她严格的训练成为一名坚强的其实的人。所以，你应该首先成为一名见习骑士。当你说到这一点时，我们将谈论你的任务。");
    } else if (status == 12) {
        qm.forceCompleteQuest();
        qm.sendPrev("走左边的入口到达训练森林。在那里，你会找到培训老师#p1102000#，他会教你如何变得更强。我可不想看到你漫无目的的四处游荡直到你到达LV10，你听到了吗？");
    } else if (status == 13) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
}