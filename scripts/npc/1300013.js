/*
	NPC: Blocked Entrance (portal?)
	MAP: Mushroom Castle - East Castle Tower (106021400)
*/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        status--;
    } else {
        status++;
    }


    if (cm.getMapId() == 106021402) {
        if (!(cm.isQuestCompleted(2331))) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            cm.sendSimple("#L0#挑战 #b拯救碧欧蕾塔公主#k.#l\r\n#L1#挑战 #b企鹅王#k 与 #b雪人三兄弟#k.#l");
        } else if (status == 1) {
            if (selection == 0) {
                var pepe = cm.getEventManager("KingPepeAndYetis");
                pepe.setProperty("player", cm.getPlayer().getName());
                pepe.startInstance(cm.getPlayer());
                cm.dispose();

            } else if (selection == 1) {
                var em = cm.getEventManager("MK_PrimeMinister2");

                var party = cm.getPlayer().getParty();
                if (party != null) {
                    if (!em.startInstance(party, cm.getMap(), 1)) {
                        cm.sendOk("别的队伍已经在这个频道挑战了。");
                    }
                } else {
                    if (!em.startInstance(cm.getPlayer())) {
                        cm.sendOk("别的队伍已经在这个频道挑战了。");
                    }
                }

                cm.dispose();

            }
        }
    } else {
        var questProgress = cm.getQuestProgressInt(2330, 3300005) + cm.getQuestProgressInt(2330, 3300006) + cm.getQuestProgressInt(2330, 3300007); //3 Yetis
        if (!(cm.isQuestStarted(2330) && questProgress < 3)) {  // thanks Vcoc for finding an exploit with boss entry through NPC
            cm.dispose();
            return;
        }

        if (status == 0) {
            cm.sendSimple("你必须完成<阻止婚礼>任务才可以进入");
        } else if (status == 1) {
            if (selection == 1) {
                var pepe = cm.getEventManager("KingPepeAndYetis");
                pepe.setProperty("player", cm.getPlayer().getName());
                pepe.startInstance(cm.getPlayer());
                cm.dispose();

            }
        }
    }
}