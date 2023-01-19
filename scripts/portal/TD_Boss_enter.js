/* @author RonanLana */

function enter(pi) {
    var stage = ((Math.floor(pi.getMapId() / 100)) % 10) - 1;
    var em = pi.getEventManager("TD_Battle" + stage);
    if (em == null) {
        pi.playerMessage(5, "TD Battle " + stage + "遇到意外错误，当前不可用。");
        return false;
    }

    if (pi.getParty() == null) {
        pi.playerMessage(5, "你当前不队伍中，创建一个来尝试。");
        return false;
    } else if (!pi.isLeader()) {
        pi.playerMessage(5, "你的队长必须进入传送门才能开始战斗。");
        return false;
    } else {
        var eli = em.getEligibleParty(pi.getParty());
        if (eli.size() > 0) {
            if (!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                pi.playerMessage(5, "和BOSS的战斗已经开始，你还不能进入这个地方。");
                return false;
            }
        } else {
            pi.playerMessage(5, "你的队伍必须至少有2名队员组成才能挑战。");
            return false;
        }

        pi.playPortalSound();
        return true;
    }
}
