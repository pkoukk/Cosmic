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
	Author : kevintjuh93
*/

var status = -1;

function start(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 15 && mode == 0) {
            qm.sendNext("哦，不需要拒绝我的提议。这没什么大不了的。只是一种药水。好吧,如果你改变主意了就告诉我.");
            qm.dispose();
            return;
        }
        //status -= 2;
    }

    if (status == 0) {
        qm.sendNext("咦？ 它一个人在岛上做什么？ 等一下，那是 #p1201000#。 #p1201000#，你来这里有什么事情？你旁边那人是谁？你认识他么？什么？你说他是那个英雄？");
    } else if (status == 1) {
        qm.sendNextPrev("     #i4001170#");//gms like
    } else if (status == 2) {
        qm.sendNextPrev("啊，这一定是你和你的家族一直在等待的英雄。我说得对吗， #p1201000#？啊，我就知道你不只是一个普通的路人。。。");
    } else if (status == 3) {
        qm.sendAcceptDecline("哦，但因为黑法师的诅咒，我们的英雄似乎变得非常虚弱。考虑到这位英雄已经沉睡了数百年，这说得通。#b过来，我给你一个HP恢复药剂#k");//nexon probably forgot to remove the '.' before '#k', lol
    } else if (status == 4) {
        if (qm.getPlayer().getHp() >= 50) {
            qm.getPlayer().updateHp(25);
        }
        if (!qm.isQuestStarted(21010) && !qm.isQuestCompleted(21010)) {
            qm.gainItem(2000022, 1);
            qm.forceStartQuest();
        }
        qm.sendNext("先喝了它。然后我们再谈.", 9);
    } else if (status == 5) {
        qm.sendNextPrev("#b(我怎么喝药水？我不记得了..)", 3);
    } else if (status == 6) {
        qm.guideHint(14);
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            qm.dispose();
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (qm.c.getPlayer().getHp() < 50) {
            qm.sendNext("你还没喝那药水呢.");
            qm.dispose();
        } else {
            qm.sendNext("我们一直在冰洞里挖啊挖，希望能找到英雄，但我从没想过那一天真的会发生，预言真的实现了! 你说得对, #p1201000#! 现在，一个传奇英雄回来了，我们没有理由害怕黑法师！");
        }
    } else if (status == 1) {
        qm.sendOk("哦，我留你太久了。对不起，我有点忘乎所以。我相信其他企鹅也有同感。我知道你很忙，但你能在进城的路上停下来和其他企鹅谈谈吗？他们会很荣幸的。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#i2000022# 5 #t2000022#\r\n#i2000023# 5 #t2000023#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 16 exp");
    } else if (status == 2) {
        if (qm.isQuestStarted(21010) && !qm.isQuestCompleted(21010)) {
            qm.gainExp(16);
            qm.gainItem(2000022, 3);
            qm.gainItem(2000023, 3);
            qm.forceCompleteQuest();
        }

        qm.sendNext("哦，你升级了！你可能已经得到了一些技能点数。在冒险岛世界里，你每次升级都能获得3个技能点。按下 #bK 键 #k去查看技能窗口", 9);
    } else if (status == 3) {
        qm.sendNextPrev("#b(所有人都对我很好，但我什么都不记得了。我真的是英雄吗？我应该检查一下我的技能。但是我怎么检查呢?)", 3);
    } else if (status == 4) {
        qm.guideHint(15);
        qm.dispose();
    }
}

