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
        qm.sendNext("你弄丢了了你的提提阿纳？！天啊，你必须要对他们好一点，因为他们是女皇送给我们的礼物！我必须得再教育你一遍：骑士的骑行与普通人的骑行有点不同。因为岛上有一种特殊的生物，它们被称为#b提提阿纳#k。骑士们不骑怪兽，而是骑提提阿纳，这件事你应该永远记住。");
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
        qm.sendOk("提提阿纳蛋可以通过#b分享你的日常经验来长大#k。 等提提阿纳完全长大后, 请务必来找我. 还有一事, 我和#p2060005#谈过，并事先为您取回了 #b#t4032117##k. 当然了价格不变: #r10,000,000 金币#k.");
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
            qm.dispose();
            return;
        }
        if (!qm.canHold(1902005)) {
            qm.sendOk("请在你的装备栏上为你的提提阿纳空出一个空间!");
            qm.dispose();
            return;
        }

        qm.forceCompleteQuest();
        qm.gainItem(1902005, 1);
        qm.gainItem(4220137, -1);
        qm.gainMeso(-10000000);
        qm.sendOk("好了，你现在可以再次骑上米米安娜了。这次一定要好好照顾它.");
    } else if (status == 2) {
        qm.dispose();
    }
}

