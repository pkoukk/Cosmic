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
	NPC Name: 		Neinheart
	Map(s): 		Empress' Road : Ereve (130000000)
	Description: 		Quest - The End of Knight-in-Training
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            qm.sendNext("你没发现你还有训练任务没有完成么？我赞扬你的耐心，但这还差的远。冒险骑士团迫切需要的是更强大的骑士。");
            qm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            qm.sendAcceptDecline("#h0#？哇，自从我上次见到你以来，你的水平直线上升。你看起来也完成了很多任务。。。你现在似乎比我上次见到你时准备好了很多。你怎么认为？你有兴趣参加#b骑士考试#k吗？是时候让你从训练中的骑士成长为一名善良的骑士了，对吧？");
        } else if (status == 1) {
            qm.startQuest();
            qm.completeQuest();

            qm.sendOk("如果你想参加骑士等级考试，可以随时来圣地。各个骑士团长会对你的能力进行测试，如果合格，就会任命你为正式的骑士。再见......");
        } else if (status == 2) {
            qm.dispose();
        }
    }
}