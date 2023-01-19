/*
	NPC Name: 		Cygnus
	Description: 		Quest - Encounter with the Young Queen
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
            qm.sendNext("嗯，没什么好担心的。对你这样的人来说，这将是轻而易举的事。鼓起勇气，准备好了就告诉我.");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("喔? #p1101002# 派你来的, 呵呵？你一定是最近加入冒险骑士团的新手。欢迎，很高兴见到你！我是 #p1102000#. 我是培训老师，培训所有像你这样的贵族。当然，你能看出来我并不是人类.");
    } else if (status == 1) {
        qm.sendNextPrev("我们叫菲约。你见过 #p1101001#， 她一直在女皇身边。我们和 #p1101001#都是菲约, 但我们属于不同的类型. 当然，之前你没见过我们，因为我们只住在圣地。不过你很快就会习惯的.");
    } else if (status == 2) {
        qm.sendNextPrev("哦，你知不知道圣地里面没有怪物？没有任何邪恶敢进入圣地。但别担心，有一种叫绢毛鸟的幻想生物可以用来训练.");
    } else if (status == 3) {
        qm.sendAcceptDecline("你似乎准备好了！看看你所取得的成就，我认为你应该立即开始猎杀更高级的咪咪。去#m130010100##k#k中狩猎#b15个#r#o100122#s怎么样？使用左侧的入口可以到#b训练森林II#k。");
    } else if (status == 4) {
        qm.guideHint(12);
        qm.forceStartQuest(20020);
        qm.forceCompleteQuest(20100);
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {
}