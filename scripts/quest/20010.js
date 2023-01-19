var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.sendNext("哇，哇！你真的拒绝我的提议了吗？在我们的帮助下你可以更快的升级哦，所以如果你改变主意了就告诉我。即使你拒绝了任务，如果来和我谈谈的话，你也可以再次接受任务。");
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.sendNext("哇，哇！你真的拒绝我的提议了吗？好吧，在我们的帮助下你可以更快的提升所以如果你改变主意了就告诉我。即使你拒绝了任务，如果你来和我谈谈，你也可以再次接受任务。");
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("欢迎来到圣地！你是？哦，你是 #b#h ##k! \r\n很高兴见到你，我等你很久了，欢迎加入骑士团？我的名字是奇姆，我应女皇的要求指导像你这样的贵族.");
        } else if (status == 1) {
            qm.sendNextPrev("如果你想正式成为骑士团的一部分，你必须先见见女皇。她在这个岛的中心，和神兽在一起。在你离开之前，我和我的兄弟们想和你分享一些在冒险岛世界里的#基本知识#K，好不好？");
        } else if (status == 2) {
            qm.sendNextPrev("让我提醒你这是一次任务，你可能已经注意到，在冒险岛世界的游戏NPC偶尔会向你寻求各种帮助。这样的帮助被称为#任务#K.当你完成任务时，你将会得到奖励，所以我强烈建议你努力完成NPC交给你的工作。");
        } else if (status == 3) {
            qm.sendAcceptDecline("你想见见 #b奇赞#k 吗？ 他可以告诉你打猎相关的知识。你可以沿着左边的箭头找到奇赞。");
        } else if (status == 4) {
            qm.forceStartQuest();
            qm.guideHint(2);
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        qm.dispose();
    } else {
        if (status == 0) {
            qm.sendOk("你是我哥哥奇姆派来的贵族吗？很高兴见到你！我是奇赞，我会给你奇姆要我给你的奖励。记住，你可以通过按#bI#k键来检查你的库存#K红色药水帮助你恢复HP，蓝色的帮助你恢复MP。你应该事先学习如何使用它们，这样当你处于危险中时，你已经有所准备了。\r\n\r\n#fUI/UIWindow.img/Quest/reward# \r\n\r\n#v2000020# #z2000020# \r\n#v2000021# #z2000021# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0#15 exp");
        } else if (status == 1) {
            if (qm.canHold(2000022) && qm.canHold(2000023)) {
                if (!qm.isQuestCompleted(21010)) {
                    qm.gainItem(2000020, 5);
                    qm.gainItem(2000021, 5);
                    qm.gainExp(15);
                }
                qm.guideHint(3);
                qm.forceCompleteQuest();
            } else {
                qm.dropMessage(1, "你的背包满了");
            }

            qm.dispose();
        }
    }
}