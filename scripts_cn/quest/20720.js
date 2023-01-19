/*
	QUEST: Before the Mission in Perion Begins
	NPC: Neinheart
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        qm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }

    if (status == 0) {
        qm.sendAcceptDecline("这段时间升级还顺利吗？现在你也许正在#m103000000#执行组队任务。升级虽然是好事，但有个骑士团的任务需要交给你，因为我受到了新的情报。");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.dispose();
    }
}

function end(mode, type, selection) {}