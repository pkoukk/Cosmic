/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*Konpei
 *
 *@author Ronan
 */

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
const ExpeditionType = Java.type('server.expeditions.ExpeditionType');
var exped = ExpeditionType.SHOWA;
var expedName = "Showa Gang";
var expedBoss = "首领";
var expedMap = "Nightmarish Last Days";
var expedItem = 4000138;

var list = "你想做什么?#b\r\n\r\n#L1#查看远征队成员#l\r\n#L2#开始战斗!#l\r\n#L3#结束远征队.#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(exped);
    em = cm.getEventManager("ShowaBattle");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("你没有资格挑战" + expedBoss + "!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<远征队: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想要挑战#r" + expedBoss + "#k?\r\n#b#L1#让我们开始吧!#l\r\n\#L2#不,等一下...#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("战斗已经开始了.");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("已经加入了远征队.请等#r" + expedition.getLeader().getName() + "#k开始战斗.");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    var eim = em.getInstance(expedName + player.getClient().getChannel());
                    if (eim.getIntProperty("canJoin") == 1) {
                        eim.registerPlayer(player);
                    } else {
                        cm.sendOk("战斗已经开始了" + expedBoss + ".让我们为这些勇敢的人祈祷");
                    }

                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("其他队伍正在挑战." + expedBoss + ".让我们为这些勇敢的人祈祷");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                if (!cm.haveItem(expedItem)) {
                    cm.sendOk("作为远征队长,你必须要有#b#t" + expedItem + "##k才可以挑战" + expedBoss + "!");
                    cm.dispose();
                    return;
                }

                expedition = cm.getExpedition(exped);
                if (expedition != null) {
                    cm.sendOk("有人已经组建了远征队,加入他们!");
                    cm.dispose();
                    return;
                }

                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + "远征队#k成立了.\r\n\r\n再次和我对话开始战斗!");
                } else if (res > 0) {
                    cm.sendOk("今天的次数用完了...");
                } else {
                    cm.sendOk("开启远征的时候发生了一些未知错误，等会儿再试吧.");
                }

                cm.dispose();

            } else if (selection == 2) {
                cm.sendOk("不是所有人都可以挑战" + expedBoss + ".");
                cm.dispose();

            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("远征队不存在.");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("你是唯一的成员.");
                    cm.dispose();
                    return;
                }
                var text = "队伍里有这些人(点击移除):\r\n";
                text += "\r\n\t\t1." + expedition.getLeader().getName();
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = exped.getMinSize();

                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("你需要至少" + min + "加入远征队.");
                    cm.dispose();
                    return;
                }

                cm.sendOk("现在送你们进入#b" + expedMap + "#k挑战首领.");
                status = 4;
            } else if (selection == 3) {
                const PacketCreator = Java.type('tools.PacketCreator');
                player.getMap().broadcastMessage(PacketCreator.serverNotice(6, expedition.getLeader().getName() + " 结束了远征."));
                cm.endExpedition(expedition);
                cm.sendOk("远征队结束了.走为上策有时候是最佳策略");
                cm.dispose();

            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("事件无法初始化.联系管理员");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if (!em.startInstance(expedition)) {
                cm.sendOk("其他队伍正在进行挑战." + expedBoss + ".让我们为这些勇敢的人祈祷");
                cm.dispose();
                return;
            }

            cm.dispose();

        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("你把" + banned.getValue() + "移出了远征队.");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}
