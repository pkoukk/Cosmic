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
        qm.sendNext("这...就是我儿子丢失的那张地契呀！而且你给我收集了盖房子需要的材料！ 真是太感谢你呀。这样我可以和我的家人一起住在#m102000000#了...!对了，这是我的一点心意...");
    } else if (status == 1) {
        const InventoryType = Java.type('client.inventory.InventoryType');
        if (qm.getPlayer().getInventory(InventoryType.USE).getNumFreeSlot() < 1) {
            qm.getPlayer().dropMessage(1, "消耗栏已满");
            qm.dispose();
            return;
        }

        var talkStr = "好吧，现在选择你喜欢的卷轴。。。成功几率都是10%。 \r\n\r\n#r选择一个道具\r\n#b";
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
        qm.gainItem(item, 1);
        qm.gainItem(4000022, -100);
        qm.gainItem(4003000, -30);
        qm.gainItem(4003001, -30);
        qm.gainItem(4001004, -1);
        qm.gainExp(20000);
        qm.gainMeso(15000);
        qm.gainFame(2);
        qm.completeQuest();

        qm.dispose();
    }
}