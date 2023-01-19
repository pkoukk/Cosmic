/*
    Author: BubblesDev
    Quest: Abel Glasses Quest
*/

var status = -1;    // thanks IxianMace for noticing missing status declaration

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (!qm.isQuestCompleted(2186)) {
                if (qm.haveItem(4031853)) {
                    if (qm.canHold(2030019)) {
                        qm.gainItem(4031853, -1);
                        qm.gainExp(1700);
                        qm.gainItem(2030019, 10);

                        qm.sendOk("天啊，你找到我的眼镜了！谢谢，非常感谢。现在我又可以看到一切了！");
                        qm.forceCompleteQuest();
                    } else {
                        qm.sendOk("在消耗栏留个位置，我好奖励你！");
                    }
                } else if (qm.haveItem(4031854) || qm.haveItem(4031855)) { //When I figure out how to make a completance with just a pickup xD
                    if (qm.canHold(2030019)) {
                        if (qm.haveItem(4031854)) {
                            qm.gainItem(4031854, -1);
                        } else {
                            qm.gainItem(4031855, -1);
                        }

                        qm.gainExp(1000);
                        qm.gainItem(2030019, 5);

                        qm.sendOk("嗯，那不是我的眼镜。。。不过还是谢谢你。");
                        qm.forceCompleteQuest();
                    } else {
                        qm.sendOk("我需要你有一个可用的消耗栏来奖励你！");
                    }
                }
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}