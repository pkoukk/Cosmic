/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
/* Author: Xterminator 
	NPC Name: 		Mihile
	Map(s): 		Empress' Road : Ereve (130000000)
	Description: 		Quest - Knighthood Exam: Dawn Warrior
*/
var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            qm.sendNext("我想你还没准备好成为正式骑士.");
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendYesNo("你带来了足够的#t4032096#。。。好吧，我相信你现在有资格成为正式骑士了。你愿意么？");
        } else if (status == 1) {
            if (qm.getPlayer().getJob().getId() == 1100 && qm.getPlayer().getRemainingSp() > ((qm.getPlayer().getLevel() - 30) * 3)) {
                qm.sendNext("你的一转技能点还没有用完.");
                qm.dispose();
            } else {
                if (qm.getPlayer().getJob().getId() != 1110) {
                    if (!qm.canHold(1142067)) {
                        qm.sendNext("如果你想获得与头衔相符的奖牌，你可能需要在你的装备栏中腾出一些空间。");
                        qm.dispose();
                        return;
                    }
                    qm.gainItem(4032096, -30);
                    qm.gainItem(1142067, 1);
                    const Job = Java.type('client.Job');
                    qm.getPlayer().changeJob(Job.DAWNWARRIOR2);
                    qm.completeQuest();
                }
                qm.sendNext("你已经不再是见习骑士了。你现在是正式的冒险骑士团成员.");
            }
        } else if (status == 2) {
            qm.sendNextPrev("我给了你一些#b技能点#k，还有一些只有魂骑士才能使用的技能，所以我希望你努力学习，并希望能像你的灵魂一样培养它。");
        } else if (status == 3) {
            qm.sendPrev("既然你已经成为了正式的冒险骑士，那么请不要辱没女王的名声。");
        } else if (status == 4) {
            qm.dispose();
        }
    }
}