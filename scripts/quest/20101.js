/* 
 * Cygnus 1st Job advancement - Dawn Warrior
 */

var status = -1;
var jobType = 1;
var canTryFirstJob = true;

function end(mode, type, selection) {
    if (mode == 0) {
        if (status == 0) {
            qm.sendNext("这是个非常重要的决定.");
            qm.dispose();
            return;
        }
        status--;
    } else {
        status++;
    }
    if (status == 0) {
        qm.sendYesNo("你决定好了嘛? 这会是你最后的决定唷, 所以想清楚你要做什么. 你想要成为 魂骑士吗?");
    } else if (status == 1) {
        if (canTryFirstJob) {
            canTryFirstJob = false;
            if (qm.getPlayer().getJob().getId() != 1100) {
                if (!qm.canGetFirstJob(jobType)) {
                    qm.sendOk("请先将等级提升到 #b10级, " + qm.getFirstJobStatRequirement(jobType) + "#k 我会告诉你 #r魂骑士#k在哪.");
                    qm.dispose();
                    return;
                }

                if (!(qm.canHoldAll([1302077, 1142066]))) {
                    qm.sendOk("请先给背包空出些空间，然后再来找我对话.");
                    qm.dispose();
                    return;
                }

                qm.gainItem(1302077, 1);
                qm.gainItem(1142066, 1);
                const Job = Java.type('client.Job');
                qm.changeJob(Job.DAWNWARRIOR1);
                qm.getPlayer().resetStats();
            }
            qm.forceCompleteQuest();
        }
        qm.sendNext("我刚刚塑造了你的身体，让它成为魂战士的完美之选。如果你想变得更强大，请使用属性窗口（S）来提高相应的属性。如果您不确定要升级什么，只需单击#b自动#k。");
    } else if (status == 2) {
        qm.sendNextPrev("我还增加了你的装备和其他栏位的空格数量，好好使用这些空格，让他们填满骑士所需要的物品吧.");
    } else if (status == 3) {
        qm.sendNextPrev("打开技能栏，看看获得的新技能.有的技能需要学习基础技能之后才能学习");
    } else if (status == 4) {
        qm.sendNextPrev("从现在开始，你死亡的时候会损失一部分经验值?");
    } else if (status == 5) {
        qm.sendNextPrev("现在。。。我要你出去向全世界展示冒险骑士团是如何成长的.");
    } else if (status == 6) {
        qm.dispose();
    }
}