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
 * @npc: Abdula
 * @map: Multiple towns on Maplestory
 * @func: Job Skill / Mastery Book Drop Announcer
 */

var status;
var selected = 0;
var skillbook = [], masterybook = [], table = [];

function start() {
    status = -1;
    selected = 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            var greeting = "你好,我是中介商人#p9209000#，!#b\r\n ";

            if (cm.getPlayer().isCygnus()) {
                cm.sendOk(greeting + "冒险骑士团没有技能书或者能手册.");
                cm.dispose();
                return;
            }

            var jobrank = cm.getJob().getId() % 10;
            if (jobrank < 2) {
                cm.sendOk(greeting + "努力训练到达四转时，新的提升机会就会出现!");
                cm.dispose();
                return;
            }

            skillbook = cm.getAvailableSkillBooks();
            masterybook = cm.getAvailableMasteryBooks();

            if (skillbook.length == 0 && masterybook.length == 0) {
                cm.sendOk(greeting + "你现在的技能没有技能书可以用.有可能你的技能都满级了，或者你甚至不满足技能的最低要求.");
                cm.dispose();
            } else if (skillbook.length > 0 && masterybook.length > 0) {
                var sendStr = greeting + "提升你的技能的新机遇出现了！选择一类看看.\r\n\r\n#b";

                sendStr += "#L1#技能书#l\r\n";
                sendStr += "#L2# 能手册#l\r\n";

                cm.sendSimple(sendStr);
            } else if (skillbook.length > 0) {
                selected = 1;
                cm.sendNext(greeting + "提升你的技能的新机遇出现了！有技能可以学习！");
            } else {
                selected = 2;
                cm.sendNext(greeting + "提升你的技能的新机遇出现了！有技能可以升级！");
            }

        } else if (status == 1) {
            var sendStr = "以下几本书现在可以用了:\r\n\r\n";
            if (selected == 0) {
                selected = selection;
            }

            if (selected == 1) {
                table = skillbook;
                for (var i = 0; i < table.length; i++) {
                    if (table[i] > 0) {
                        var itemid = table[i];
                        sendStr += "  #L" + i + "# #i" + itemid + "#  #t" + itemid + "##l\r\n";
                    } else {
                        var skillid = -table[i];
                        sendStr += "  #L" + i + "# #s" + skillid + "#  #q" + skillid + "##l\r\n";
                    }
                }
            } else {
                table = masterybook;
                for (var i = 0; i < table.length; i++) {
                    var itemid = table[i];
                    sendStr += "  #L" + i + "# #i" + itemid + "#  #t" + itemid + "##l\r\n";
                }
            }

            cm.sendSimple(sendStr);

        } else if (status == 2) {
            selected = selection;

            var sendStr;
            if (table[selected] > 0) {
                var mobList = cm.getNamesWhoDropsItem(table[selected]);

                if (mobList.length == 0) {
                    sendStr = "没有怪物掉落 '#b#t" + table[selected] + "##k'.\r\n\r\n";
                } else {
                    sendStr = "以下怪物掉落 '#b#t" + table[selected] + "##k':\r\n\r\n";

                    for (var i = 0; i < mobList.length; i++) {
                        sendStr += "  #L" + i + "# " + mobList[i] + "#l\r\n";
                    }

                    sendStr += "\r\n\r\n";
                }
            } else {
                sendStr = "\r\n\r\n";
            }

            sendStr += cm.getSkillBookInfo(table[selected]);

            cm.sendNext(sendStr);
            cm.dispose();
        }
    }
}
