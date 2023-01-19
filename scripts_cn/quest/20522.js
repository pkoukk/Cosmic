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
	Author : Ronan Lana
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
        return;
    } else if (status >= 2 && mode == 0) {
        qm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        qm.sendNext("骑士的骑行与普通人的骑行有点不同。因为岛上有一种特殊的生物，它们被称为#b提提阿纳#k。骑士们不骑怪兽，而是骑提提阿纳，这件事你应该永远记住。");
    } else if (status == 1) {
        qm.sendNextPrev("别把它看成是一种坐骑或交通工具。这些坐骑会是你的朋友，你的同志，你的同事。。。。甚至是一个足够亲密的，可以托付你生命的朋友！这就是为什么圣地骑士会自己培养坐骑.");
    } else if (status == 2) {
        qm.sendAcceptDecline("看，这是一个提提阿纳的蛋。你准备好养一只小提提阿纳了吗？让它作为你余生的旅行伴侣?");
    } else if (status == 3) {
        if (!qm.haveItem(4220137) && !qm.canHold(4220137)) {
            qm.sendOk("在你的背包里空出一个位置，这样我就可以给你提提阿纳的蛋了.");
            qm.dispose();
            return;
        }

        qm.forceStartQuest();
        if (!qm.haveItem(4220137)) {
            qm.gainItem(4220137);
        }
        qm.sendOk("提提阿纳蛋可以通过 #b分享你的日常经验#k成长. 提提阿纳长大后，请来找我.");
    } else if (status == 4) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode != 1) {
        qm.dispose();
        return;
    }

    status++;
    if (status == 0) {
        qm.sendNext("嘿，看这儿！提提阿纳的蛋怎么样了");
    } else if (status == 1) {   //pretty sure there would need to have an egg EXP condition... Whatever.
        if (!qm.haveItem(4220137)) {
            qm.sendOk("我明白了，你丢了你的蛋。。。当你抚养一个提提阿纳的时候你需要更加小心!");
            return;
        }

        qm.forceCompleteQuest();
        qm.gainItem(4220137, -1);
        qm.gainExp(37600);
        qm.sendOk("哦，你能唤醒米米安娜蛋吗？太神奇了。。。大多数骑士都无法在这么短的时间内唤醒它.");
    } else if (status == 2) {
        qm.dispose();
    }
}

