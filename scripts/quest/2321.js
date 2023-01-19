/* ===========================================================
        @author Resonance
	NPC Name: 		Minister of Magic
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Over the Castle Wall (1)
=============================================================
Version 1.0 - Script Done.(18/7/2010)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            status -= 2;
        } else {
            qm.sendOk("真是个不听话的孩子。如果你改变了主意，可以再来找我。");
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendAcceptDecline("现在你可以穿过蘑菇林的多刺藤蔓屏障，但在此之前， #b内务大臣k想和你谈谈。请马上去见他。");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.sendOk("祝你好运。");
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
        qm.sendOk("我一直在跟进你的惊人工作。我知道你已经成功地研究出了#b奇拉蘑菇孢子#k, 使用它可以穿过森林中无法穿透的屏障。");
    } else if (status == 1) {
        qm.forceCompleteQuest();
        qm.gainExp(2500);
        qm.sendOk("接下去的问题，就是怎么进入蘑菇城了。");
    } else if (status == 2) {
        qm.dispose();
    }
}
	