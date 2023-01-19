/*
	Author: DietStory v1.02 dev team
	NPC: Matthias
	Quest: Hidden Inside the Trash Can
*/


var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    } else if (mode == 0 && status == 0) {
        qm.sendOk("什么？你拒绝了？好吧，拒绝就拒绝吧。我会如实向#p1101002#报告的。");
        qm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }


    if (status == 0) {
        qm.sendAcceptDecline("......没想到你竟然是骑士团成员。没办法，总得有人帮着调查......我跟你说明一下这次的事情。");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.dispose();
    }
}