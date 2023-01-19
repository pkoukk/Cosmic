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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
 */

var status = 0;
var state;
var em = null;

function start() {
    status = -1;
    state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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
            if (state == 1) {
                cm.sendYesNo("要放弃这个区域吗?");
            } else {
                em = cm.getEventManager("KerningPQ");
                if (em == null) {
                    cm.sendOk("组队挑战出错了.");
                    cm.dispose();
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<组队挑战:废都下水道>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你和你的队友一起参加组队挑战怎么样? 在这里，你会发现一些障碍和问题，如果没有良好的团队合作，你将无法战胜它. 如果你想要挑战的话请让队长和我对话.#b\r\n#L0#我想参加组队挑战.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#我想知道一些细节.");
            }
        } else if (status == 1) {
            if (state == 1) {
                cm.warp(103000000);
                cm.dispose();
            } else {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("你只有组队才可以参加组队挑战");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("队长才可以开始挑战.");
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
                    cm.sendOk("你当前队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                    cm.dispose();
                } else {
                    cm.sendOk("#e#b<组队挑战:废都下水道>#k#n\r\n在这个挑战,你们需要面对很多谜题,解决谜题才可以进入下一关.最终你们需要挑战绿水灵王");
                    cm.dispose();
                }
            }
        }
    }
}