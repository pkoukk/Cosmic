var status = 0;
var em;
var eim;

function sendBaseText() {
    cm.sendOk("不对外开放");
    cm.dispose();
}

function start() {
    em = cm.getEventManager("q3239");
    if (em != null)
        eim = cm.getEventInstance();

    if (em == null) { // No event handler
        sendBaseText();
        return;
    }
    else if (eim == null && !cm.isQuestStarted(3239)) { // Not in instance, quest is not in progress
        sendBaseText();
        return;
    }

    if (eim == null) { // Not in instance
        cm.sendYesNo("你要进入#m922000009##k吗?");
    }
    else { // Inside the instance
        cm.sendYesNo("你确定要离开这里么？");
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }

    if (eim == null) { // Not in instance, ready to enter
        cm.removeAll(4031092); // This handling is done in the portal script and in the event end, just for legacy purposes here
        if (!em.startInstance(cm.getPlayer())) {
            cm.sendOk("里面有人了.");
        }
    }
    else { // Inside the instance, ready to exit
        eim.removePlayer(cm.getPlayer()); // This will end the event and warp the player out
    }
    cm.dispose();
}