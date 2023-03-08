var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.sendNext("再见");
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.sendNext("再见");
            cm.dispose();
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (cm.getLevel() >= 50) {
                cm.sendYesNo("你看上去很强，你想要去挑战蝙蝠怪么？");
            }
        } else if (status == 1) {
            cm.warp(105100100);
            cm.dispose();
        }
    }
}