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

var status = -1;

function start(mode, type, selection) { // missing script for questid found thanks to Jade™
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
            qm.sendNext("#h0#... 首先，谢谢你的出色工作。如果不是你，我。。。我不可能从黑魔女的诅咒下幸免。非常感谢你.");
        } else if (status == 1) {
            qm.sendNextPrev("如果没有其他事情的话，这一连串的事件让一件事变得非常清楚，那就是你付出了无数小时的努力来提升自己，为冒险骑士团团做出贡献。");
        } else if (status == 2) {
            qm.sendAcceptDecline("为了庆祝你的努力和成就。。。我想授予你一个新的头衔，并再次祝福你。你愿意..接受嘛?");
        } else if (status == 3) {
            if (!qm.canHold(1142069, 1)) {
                qm.sendOk("请给你的装备栏留出点空间好存放勋章.");
                qm.dispose();
                return;
            }

            qm.gainItem(1142069, 1);
            if (qm.getJobId() % 10 == 1) {
                qm.changeJobById(qm.getJobId() + 1);
            }

            qm.forceStartQuest();
            qm.forceCompleteQuest();

            qm.sendOk("#h0#. 由于你勇敢地与黑魔法师战斗，从现在起，我将任命你为冒险骑士团团的新骑士团长。请明智地运用你的力量和权力来帮助保护冒险岛世界的公民.");
        } else if (status == 4) {
            qm.dispose();
        }
    }
}
