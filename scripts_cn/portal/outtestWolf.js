function enter(pi) {
    if (pi.getMap().countMonsters() == 0) {
        if (pi.canHold(4001193, 1)) {
            pi.gainItem(4001193, 1);
            pi.playPortalSound();
            pi.warp(140010210, 0);
            return true;
        } else {
            pi.playerMessage(5, "在接收课程通过凭证前，给其他栏留一个空格.");
            return false;
        }
    } else {
        pi.playerMessage(5, "在离开前击败所有的狼。");
        return false;
    }
}