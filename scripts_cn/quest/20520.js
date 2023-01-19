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
	Author : Biscuit
*/
var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            qm.dispose();
            return;
        } else {
            qm.dispose();
            return;
        }
    }

    if (status == 0) {
        qm.sendNext("哇，你已经达到50级了，但你为什么还这样走来走去呢？我的意思是，你已经达到了50级，但你仍然在用自己的脚走路。对你这样的骑士来说，这很罕见。");
    } else if (status == 1) {
        qm.sendAcceptDecline("好吧，我想这取决于你，但这样做，你也有可能损害女皇的尊严和荣誉。这就是为什么我在这里给你一个有用的指示。它叫#b乘骑怪物#k，你肯定对这个感兴趣吧?");
    } else if (status == 2) {
        qm.forceStartQuest();
        qm.forceCompleteQuest();
        qm.sendOk("这里有一种只有冒险骑士团才能享受的特殊坐骑. 如果您感兴趣, 请访问 #b圣地#k. 我会给你提供更多的信息.");
    } else if (status == 3) {
        qm.dispose();
    }
}