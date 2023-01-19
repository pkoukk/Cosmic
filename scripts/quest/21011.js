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
        if (type == 1 && mode == 0) {
            qm.sendOk("哦，我理解，英雄果然很忙啊....哭哭。要是改变主意了，随时可以来找我。");
            qm.dispose();
            return;
        } else {
            qm.dispose();
            return;
        }
    }

    if (status == 0) {
        qm.sendNext("等等，你...不可能...你就是 #p1201000# 一直在说的那个英雄？! #p1201000#! 别只是点头...告诉我！他就是你一直在等待的英雄吗？! ")
    } else if (status == 1) {
        qm.sendNextPrev("   #i4001171#");
    } else if (status == 2) {
        qm.sendNextPrev(" 我很抱歉。我只是太激动了... *555..555* 天啊，我都快哭了。你一定很开心, #p1201000#.");
    } else if (status == 3) {
        qm.sendAcceptDecline("等一下...你没带武器据我所知，每个英雄都有特殊的武器。哦，你一定是在和黑魔法师的战斗中把它弄丢了。");
    } else if (status == 4) {
        qm.forceStartQuest();
        qm.sendOk("我弟弟普伊尔就在街上，他很想见你！我知道你很忙，但能请你去跟普伊尔打个招呼吗？");
    } else if (status == 5) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (type == 1 && mode == 0) {
            qm.sendNext("*555..555* 这把剑对你来说还不够好吗？我很荣幸...");
            qm.dispose();
        } else {
            qm.dispose();
            return;
        }
    }
    if (status == 0) {
        qm.sendNext("等等，你......不可能......你就是利琳一直在说的那个英雄吗？！利琳！别只是点头...告诉我！他就是你一直在等待的英雄吗？!");
    } else if (status == 1) {
        qm.sendNextPrev("#i4001171#");
    } else if (status == 2) {
        qm.sendNextPrev("我很抱歉。我只是太激动了... *555..555* 天啊，我都快哭了。你一定很高兴，利琳。");
    } else if (status == 3) {
        qm.sendNextPrev("等一下...你没带武器据我所知，每个英雄都有特殊的武器。哦，你一定是在和黑魔法师的战斗中把它弄丢了。");
    } else if (status == 4) {
        qm.sendYesNo("这还不足以替代你的武器，但是 #b你先拿着这把剑#k. 这是我给你的礼物，英雄不可能手无寸铁.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v1302000# 1 #t1302000#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 35 exp");
    } else if (status == 5) {
        if (qm.isQuestCompleted(21011)) {
            qm.dropMessage(1, "未知错误");
        } else if (qm.canHold(1302000)) {
            qm.gainItem(1302000, 1);
            qm.gainExp(35);
            qm.forceCompleteQuest();
            qm.sendNext("#b（你的技能远不如英雄......那剑呢？你一生中有没有拿过剑？你记不起来了......连怎么装备都不记得？）", 3);
        } else {
            qm.dropMessage(1, "你的背包满了");
        }
    } else if (status == 6) {
        qm.guideHint(16);
        qm.dispose();
    }
}