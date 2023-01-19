/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @author: Ronan
 * @npc: Guon
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
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
            em = cm.getEventManager("PiratePQ");
            if (em == null) {
                cm.sendOk("海盗船组队任务出现了错误.");
                cm.dispose();
                return;
            } else if (cm.isUsingOldPqNpcStyle()) {
                action(1, 0, 0);
                return;
            }

            cm.sendSimple("#e#b<组队任务:海盗船>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n救命!我的孩子被可怕的#r海盗#k绑架了. 我需要你的援助... 你能找一队人马帮我救救他吗?让你的队长和我谈谈.#b\r\n#L0#我要开始组队任务.\r\n#L1#我要" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想知道更多细节.");
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("你必须组队参加.");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("让队长和我对话.");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if (eli.size() > 0) {
                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("其他队伍正在进行,等他们出来又或者去其他频道看看.");
                        }
                    } else {
                        cm.sendOk("你还不能开始组队任务,因为你队伍里面的人数不足或者有人没有资格参加.");
                    }

                    cm.dispose();
                }
            } else if (selection == 1) {
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendOk("你当前的队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k. 想改的话回来找我.");
                cm.dispose();
            } else {
                cm.sendOk("#e#b<组队任务:海盗船>#k#n\r\n你的任务是找到进入海盗船的路,击败途中你遇到的全部海盗.找到#r老海盗#k,并 打败他.据说里面的宝箱打开以后会获得丰富的奖励");
                cm.dispose();
            }
        }
    }
}