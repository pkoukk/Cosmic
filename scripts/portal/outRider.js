function enter(pi) {
    if (pi.canHold(4001193, 1)) {
        pi.gainItem(4001193, 1);
        pi.playPortalSound();
        pi.warp(211050000, 4);
        return true;
    } else {
        pi.playerMessage(5, "在接收课程通过凭证前，给其他栏留一个空格.");
        return false;
    }
}