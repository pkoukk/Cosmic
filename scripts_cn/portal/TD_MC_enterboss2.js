function enter(pi) {
    if (pi.isQuestCompleted(2331)) {
        pi.openNpc(1300013);
        return false;
    }

    if (pi.isQuestCompleted(2333) && pi.isQuestStarted(2331) && !pi.hasItem(4001318)) {
        pi.getPlayer().message("把玉玺弄丢了？没关系，我有咒语可以帮你找回来");
        if (pi.canHold(4001318)) {
            pi.gainItem(4001318, 1);
        } else {
            pi.getPlayer().message("你的背包满了，我没办法吧玉玺给你");
        }
    }

    if (pi.isQuestCompleted(2333)) {
        pi.playPortalSound();
        pi.warp(106021600, 1);
        return true;
    } else if (pi.isQuestStarted(2332) && pi.hasItem(4032388)) {
        pi.forceCompleteQuest(2332, 1300002);
        pi.getPlayer().message("你找到公主了！");
        pi.giveCharacterExp(4400, pi.getPlayer());

        var em = pi.getEventManager("MK_PrimeMinister");
        var party = pi.getPlayer().getParty();
        if (party != null) {
            var eli = em.getEligibleParty(pi.getParty());   // thanks Conrad for pointing out missing eligible party declaration here
            if (eli.size() > 0) {
                if (em.startInstance(party, pi.getMap(), 1)) {
                    pi.playPortalSound();
                    return true;
                } else {
                    pi.message("别的队伍已经在这个频道挑战了。");
                    return false;
                }
            }
        } else {
            if (em.startInstance(pi.getPlayer())) { // thanks RedHat for noticing an issue here
                pi.playPortalSound();
                return true;
            } else {
                pi.message("别的队伍已经在这个频道挑战了。");
                return false;
            }
        }
    } else if (pi.isQuestStarted(2333) || (pi.isQuestCompleted(2332) && !pi.isQuestStarted(2333))) {
        var em = pi.getEventManager("MK_PrimeMinister");

        var party = pi.getPlayer().getParty();
        if (party != null) {
            var eli = em.getEligibleParty(pi.getParty());
            if (eli.size() > 0) {
                if (em.startInstance(party, pi.getMap(), 1)) {
                    pi.playPortalSound();
                    return true;
                } else {
                    pi.message("别的队伍已经在这个频道挑战了。");
                    return false;
                }
            }
        } else {
            if (em.startInstance(pi.getPlayer())) {
                pi.playPortalSound();
                return true;
            } else {
                pi.message("别的队伍已经在这个频道挑战了。");
                return false;
            }
        }
    } else {
        pi.getPlayer().message("这个门好像锁了，我应该可以找到一把能打开它的钥匙。");
        return false;
    }
}