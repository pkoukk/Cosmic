var status = -1;
var map = 912030000;
var num = 5;
var maxp = 5;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status <= 1) {
            cm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        if (cm.getLevel() >= 20) {
            cm.sendOk("修炼场只对20级以下玩家开放.");
            cm.dispose();
            return;
        }

        var selStr = "要进入修炼场吗?";
        for (var i = 0; i < num; i++) {
            selStr += "\r\n#b#L" + i + "#修炼场" + i + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        if (selection < 0 || selection >= num) {
            cm.dispose();
        } else if (cm.getPlayerCount(map + selection) >= maxp) {
            cm.sendNext("里面人太多了.");
            status = -1;
        } else {
            cm.warp(map + selection, 0);
            cm.dispose();
        }
    }
}