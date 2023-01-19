var item;
var stance;
var status = -1;
var vecItem;

function end(mode, type, selection) {
    if (mode == 0) {
        qm.dispose();
        return;
    }
    status++;

    if (status == 0) {
        qm.sendNext("哇......这就是它！！！有了这个样本，地球防御本部正在进行的研究将因结果而重新焕发活力！我也很难找到比我更具狩猎天赋的人。我必须回到正轨！无论如何，为了你的工作做得好，我必须依次奖励你");
    } else if (status == 1) {
        var talkStr = "请选择你想要的卷轴。所有的成功率都是10%。\r\n\r\n#r选择卷轴\r\n#b"
        stance = qm.getPlayer().getJobStyle();

        const Job = Java.type('client.Job');
        if (stance == Job.WARRIOR || stance == Job.BEGINNER) {
            vecItem = [2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044402, 2044302];
        } else if (stance == Job.MAGICIAN) {
            vecItem = [2043702, 2043802];
        } else if (stance == Job.BOWMAN || stance == Job.CROSSBOWMAN) {
            vecItem = [2044502, 2044602];
        } else if (stance == Job.THIEF) {
            vecItem = [2043302, 2044702];
        } else {
            vecItem = [2044802, 2044902];
        }

        for (var i = 0; i < vecItem.length; i++) {
            talkStr += "\r\n#L" + i + "# #i" + vecItem[i] + "# #t" + vecItem[i] + "#";
        }
        qm.sendSimple(talkStr);
    } else if (status == 2) {
        item = vecItem[selection];
        item = qm.gainItem(item, 1);

        if (item != null) {
            qm.gainExp(12000);
            qm.completeQuest();
        }

        qm.dispose();
    }
}