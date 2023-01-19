/* ===========================================================
            Ronan Lana
    NPC Name: 		Lukan
    Description: 	Quest - Storming the Castle
=============================================================
Version 1.0 - Script Done.(10/7/2017)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("好的，回头见");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("现在是时候了，孩子。我们已经做好一切准备，以便进一步研究为什么最近发生了这些奇怪的事情。我还得把你介绍给我哥哥杰克。");
    } else if (status == 1) {
        qm.sendOk("他目前正在焰红深林山附近徘徊，走过险恶的幻影森林，沿着焰红深林堡垒前进。你的下一个目的地就在那里，祝你旅途平安.");
        qm.forceStartQuest();
    } else if (status == 2) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("好吧，那么。回头见.");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("你是谁？哦，你是代替我弟弟约翰来的？太好了");
    } else if (status == 1) {
        qm.sendOk("你好像帮城里的人办事，是吗？我会好好评价你的。看看这个：这是一张幻影森林的地图，我经过充分的探索后自己绘制的。有了它，你就可以在其他无法发现的时间里通过这条路。记住如果你把它弄丢了，就再也找不回来了！\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i3992040# #t3992040#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 175000 EXP");
    } else if (status == 2) {
        if (qm.canHold(3992040, 1)) {
            qm.forceCompleteQuest();
            qm.gainItem(3992040, 1);
            qm.gainExp(175000);
            qm.dispose();
        } else {
            qm.sendOk("嘿，你的设置栏上没有足够的空间。解决你的小问题然后和我谈谈.");
        }
    } else if (status == 3) {
        qm.dispose();
    }
}
