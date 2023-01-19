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

/* Steal queen's silk
 */

function isTigunMorphed(ch) {
    const BuffStat = Java.type('client.BuffStat');
    return ch.getBuffSource(BuffStat.MORPH) == 2210005;
}

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (!isTigunMorphed(qm.getPlayer())) {
                qm.sendNext("什么？我不能随便把王妃预定的丝绸给人，它们应该立刻交给王妃。滚粗。");
                status = 1;
                return;
            }

            qm.sendNext("提干，你在这里干什么？");
        } else if (status == 1) {
            if (!isTigunMorphed(qm.getPlayer())) {
                qm.sendNext("什么？我不能随便把王妃预定的丝绸给人，它们应该立刻交给王妃。滚粗。");
                return;
            }

            qm.sendNext("王妃现在想要她的丝绸？好吧，我把它们放在这里了。等一下。");
            qm.forceStartQuest();
        } else if (status == 2) {
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            qm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            if (!isTigunMorphed(qm.getPlayer())) {
                qm.sendNext("什么？我不能随便把王妃预定的丝绸给人，它们应该立刻交给王妃。滚粗。");
                qm.dispose();
                return;
            }

            if (qm.canHold(4031571, 1)) {
                qm.gainItem(4031571);

                qm.sendNext("给你。提干，请你尽快给王妃送去，如果事情耽搁了，她会很生气的。");
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("嘿，你没地方放这个，伙计。当你整理背包的时候我会留下来。。。");
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}