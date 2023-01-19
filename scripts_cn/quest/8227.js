/* ===========================================================
			Ronan Lana
	NPC Name: 		Jack, John
	Description: 	Quest - Lost in Translation
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
            qm.sendOk("拜托，这个城市这次真的需要你配合!");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("嘿，伙计！时机不错。我可以从堡垒的官员那里刷到这份公报，但它的信息是加密的。我没有用，因为它是这样的。那么，你能把这个传送给约翰，看看他是否能破译这个吗？");
    } else if (status == 1) {
        if (qm.canHold(4032032, 1)) {
            qm.gainItem(4032032, 1);
            qm.sendOk("很好，这件事就靠你了.");
            qm.forceStartQuest();
        } else {
            qm.sendOk("嘿。你的其它栏没有空位.");
        }
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
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (qm.haveItem(4032032, 1)) {
            qm.gainItem(4032032, -1);
            qm.sendOk("哦，你带了封信来吗？！漂亮！让我看看我现在能不能解码.");
            qm.forceCompleteQuest();
        } else {
            qm.sendOk("你没带杰克说的密码信？来吧，孩子，我们需要它来破译敌人的下一步!");
        }
    } else if (status == 1) {
        qm.dispose();
    }
}
