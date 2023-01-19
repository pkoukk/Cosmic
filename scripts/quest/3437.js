var item;
var stance;
var status = -1;
var item;

function end(mode, type, selection) {
    if (mode == 0) {
        qm.dispose();
        return;
    }
    status++;

    if (status == 0) {
        qm.sendNext("哎呀？你这么快就打退了#b200个#o4230120##k吗？而且这是。。。确实是#b150个#t4000122##k。其实我正在担心怎么才能解决这个任务呢。谢谢你。这是我珍藏的东西。我就送给你吧。");
    } else if (status == 1) {
        const InventoryType = Java.type('client.inventory.InventoryType');
        if (qm.getPlayer().getInventory(InventoryType.EQUIP).getNumFreeSlot() < 1) {
            qm.sendOk("装备栏空间不足.");
            qm.dispose();
            return;
        }

        var talkStr = "你收好了手套吗？这手套本来是我留着自己用的好东西啊，不过我看这个东西对你更有用。而且我有本部发给我的好东西。希望你好好利用它。";
        stance = qm.getPlayer().getJobStyle();

        const Job = Java.type('client.Job');
        if (stance == Job.WARRIOR) {
            item = 1082024;
        } else if (stance == Job.MAGICIAN) {
            item = 1082063;
        } else if (stance == Job.BOWMAN || stance == Job.CROSSBOWMAN) {
            item = 1082072;
        } else if (stance == Job.THIEF) {
            item = 1082076;
        } else if (stance == Job.BRAWLER || stance == Job.GUNSLINGER) {
            item = 1082195;
        } else {
            item = 1082149;
        }

        qm.sendNext(talkStr);
    } else if (status == 2) {
        qm.completeQuest();
        qm.gainItem(item, 1);
        qm.gainItem(4000122, -120);
        qm.gainExp(6100);
        qm.sendOk("我非常感谢你一直跟着我们冒险勇者一起解决任务。我已经向上面报告了你的功劳。本部对你的评价也很高。希望你以后继续帮助我们地球本部。那再见");
    } else if (status == 3) {
        qm.dispose();
    }
}