/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 -- Odin JavaScript --------------------------------------------------------------------------------
 Eurek the Alchemist - Multiple Place
 -- By ---------------------------------------------------------------------------------------------
 Information
 -- Version Info -----------------------------------------------------------------------------------
 1.0 - First Version by Information
 ---------------------------------------------------------------------------------------------------
 **/

var status = 0;
var menu = "";
var set;
var makeitem;
var access = true;
var reqitem = [];
var cost = 4000;
var makeditem = [4006000, 4006001];
var reqset = [[[[4000046, 20], [4000027, 20], [4021001, 1]],
        [[4000025, 20], [4000049, 20], [4021006, 1]],
        [[4000129, 15], [4000130, 15], [4021002, 1]],
        [[4000074, 15], [4000057, 15], [4021005, 1]],
        [[4000054, 7], [4000053, 7], [4021003, 1]]],

    [[[4000046, 20], [4000027, 20], [4011001, 1]],
        [[4000014, 20], [4000049, 20], [4011003, 1]],
        [[4000132, 15], [4000128, 15], [4011005, 1]],
        [[4000074, 15], [4000069, 15], [4011002, 1]],
        [[4000080, 7], [4000079, 7], [4011004, 1]]]];

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && (status == 1 || status == 2))) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        cm.sendNext("还没得到需要的材料吧? 但以后随时有材料就给我吧。打猎,购买等等，得到道具的办法有多种。");
        cm.dispose();
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        cm.sendNext("好吧，把青蛙的舌头和松鼠的牙齿混合起来。。。哦，是的！忘了放些亮晶晶的白色粉末！！伙计，那可能真的很糟糕。。。哇哦！！你在那儿站了多久了？我可能对我的工作有点忘乎所以。。。呵呵。");
    } else if (status == 1) {
        cm.sendSimple("如你所见，我只是一个旅行的炼金术士。我可能在训练，但我仍然可以做一些你可能需要的东西。你想看看吗？\r\n\r\n#L0##b制作魔法石#k#l\r\n#L1##b制作召回石#k#l\r\n#L2##b炼金术#k#l");
    } else if (status == 2) {
        set = selection;
        makeitem = makeditem[set];
        for (i = 0; i < reqset[set].length; i++) {
            menu += "\r\n#L" + i + "##b使用#t" + reqset[set][i][0][0] + "#和#t" + reqset[set][i][1][0] + "##k制作#l";
        }
        cm.sendSimple("哈哈... #b#t" + makeitem + "##k是只有我能制作的神秘的石头. 很多冒险家在使用非常强的技能时好像需要用到。有五种方法制作#t" + makeitem + "#.你想怎么制作?" + menu);
    } else if (status == 3) {
        set = reqset[set][selection];
        reqitem[0] = [set[0][0], set[0][1]];
        reqitem[1] = [set[1][0], set[1][1]];
        reqitem[2] = [set[2][0], set[2][1]];
        menu = "";
        for (i = 0; i < reqitem.length; i++) {
            menu += "\r\n#v" + reqitem[i][0] + "# #b" + reqitem[i][1] + " #t" + reqitem[i][0] + "#s#k";
        }
        menu += "\r\n#i4031138# #b" + cost + "金币#k";
        cm.sendYesNo("制作#b5个#t" + makeitem + "##k, 我需要一下材料.大部分都可以在怪物身上获取,收集这些东西并不会太困难. 想要吗?\r\n" + menu);
    } else if (status == 4) {
        for (i = 0; i < reqitem.length; i++) {
            if (!cm.haveItem(reqitem[i][0], reqitem[i][1])) {
                access = false;
            }
        }
        if (access == false || !cm.canHold(makeitem) || cm.getMeso() < cost) {
            cm.sendNext("请检查一下你的材料是否充足，或者你的其他栏是不是满了");
        } else {
            cm.sendOk("给,这是五个#b#t" + makeitem + "##k!我不得不承认，这东西真是个杰作。如果你需要帮助，随时回来找我");
            cm.gainItem(reqitem[0][0], -reqitem[0][1]);
            cm.gainItem(reqitem[1][0], -reqitem[1][1]);
            cm.gainItem(reqitem[2][0], -reqitem[2][1]);
            cm.gainMeso(-cost);
            cm.gainItem(makeitem, 5);
        }
        cm.dispose();
    }
}
