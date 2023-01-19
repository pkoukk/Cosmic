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
/* Author: 		ThreeStep
	NPC Name: 		Eckhart (1101006)
	Description: 	Night Walker 3rd job advancement
	Quest: 			Shinsoo's Teardrop
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            qm.sendNext("准备好了再回来。");
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendNext("你从变身术士那带回来的宝石是神兽的眼泪，它拥有非常强大的力量。如果被黑魔法师给得手了，那我们全部都可能要倒大楣了...");
        } else if (status == 1) {
            qm.sendYesNo("女皇高度评价你的成就，并授予你高级骑士的头屑。你愿意接受吗？");
        } else if (status == 2) {
            nPSP = (qm.getPlayer().getLevel() - 70) * 3;
            if (qm.getPlayer().getRemainingSp() > nPSP) {
                qm.sendNext("你身上剩余的技能点数太多了.这样的话你不能获取新的头衔，我建议你再加几点一二转技能");
            } else {
                if (!qm.canHold(1142068)) {
                    qm.sendNext("如果你想获得与头衔相符的奖牌，你可能需要在你的装备栏中腾出一些空间。");
                } else {
                    qm.gainItem(1142068, 1);
                    const Job = Java.type('client.Job');
                    qm.getPlayer().changeJob(Job.NIGHTWALKER3);
                    qm.completeQuest();
                    qm.sendOk("请先把道具栏空出一些空间哦.");
                }
            }
        } else if (status == 3) {
            qm.dispose();
        }
    }
}