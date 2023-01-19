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
/*	
	Author : Traitor
	NPC Name: 		Neinheart
	Map(s): 		Ereve
	Description: 		Quest - Time to Choose
	Quest ID : 		20100
*/

var status = -1;

function start(mode, type, selection) {
    if (mode > 0) {
        status++;
    } else {
        qm.dispose();
        return;
    }
    if (status == 0) {
        qm.sendAcceptDecline("啊，你回来了。我可以看到你现在是10级。看起来你有一线希望成为骑士。基本训练现在已经结束，是你做出决定的时候了。");
    } else if (status == 1) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();

        qm.sendOk("现在向左看。骑士团的领袖在等级选择，这有五条路径供您选择。你只需要从中选择一个。这五条路都会带你走上骑士之路，所以......我建议你注意每一条路都提供了什么，并选择你最想走的路。");
    } else if (status == 2) {
        qm.dispose();
    }
}