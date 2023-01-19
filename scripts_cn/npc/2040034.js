/**
 * @author: Eric
 * @author: Ronan
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
 */

var status = 0;
var em = null;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            em = cm.getEventManager("LudiPQ");
            if (em == null) {
                cm.sendOk("玩具城组队任务有问题.");
                cm.dispose();
                return;
            } else if (cm.isUsingOldPqNpcStyle()) {
                action(1, 0, 0);
                return;
            }

            cm.sendSimple("#e#b<组队任务:时空裂隙>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你无法独自面对前面危险的生物.你愿意和其他人一起进行这个任务吗? 你可以让队长与我交谈#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "启用") + "队伍搜索.\r\n#L2#我想知道细节.");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("只有组队才可以参加.");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("必须队长才可以开始任务.");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if (eli.size() > 0) {
                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("另一队玩家已经进入了该频道的组队任务。请尝试其他频道，或等待当前队伍结束。");
                        }
                    } else {
                        cm.sendOk("你还不能开始组队任务,因为你队伍里面的人数不足或者有人没有资格参加.");
                    }

                    cm.dispose();
                }
            } else if (selection == 1) {
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendOk("你当前组队搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.想修改可以找我.");
                cm.dispose();
            } else {
                cm.sendOk("#e#b<组队任务:时间裂隙>#k#n\r\n时间裂缝已经出现在#b#m220000000#!#k,我们需要勇敢的冒险家来打败入侵的怪物。拜托,请找几个可靠的队友帮我们拯救#e#m220000000#!你们需要进去挑战怪物,解开谜团,最终挑战#r#o9300012##k.#b挑战每日限制进入三次,完成挑战可获得积分奖励,积分仅可获得一次");
                cm.dispose();
            }
        }
    }
}