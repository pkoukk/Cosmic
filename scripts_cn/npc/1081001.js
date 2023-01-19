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
/**
 -- Odin JavaScript --------------------------------------------------------------------------------
 Pison - Florina Beach(110000000)
 -- By ---------------------------------------------------------------------------------------------
 Information & Xterminator
 -- Version Info -----------------------------------------------------------------------------------
 1.3 - Fixed saved location [Ronan]
 1.2 - Fixed and cleanup [Shootsource]
 1.1 - Add null map check [Xterminator]
 1.0 - First Version
 ---------------------------------------------------------------------------------------------------
 **/
var status = 0;
var returnmap;

function start() {
    returnmap = cm.getPlayer().peekSavedLocation("FLORINA");
    if (returnmap == -1) {
        returnmap = 104000000;
    }
    cm.sendNext("要离开#b#m110000000##k吗?我可以送你回#b#m" + returnmap + "##k.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();

    } else if (mode == 0) {
        cm.sendNext("你来这肯定是有什么事儿的，但是回#m" + returnmap + "#休息一下也不是什么坏事。我很喜欢这里，我可以在这一直呆下去，哈哈哈。你想回去的时候跟我说.");
        cm.dispose();

    } else if (mode == 1) {
        status++;
        if (status == 1) {
            cm.sendYesNo("确定要回到#b#m" + returnmap + "##k?好的，我们很快回去，你是想要现在就回" + returnmap + "# 吗？")
        } else {
            cm.getPlayer().getSavedLocation("FLORINA");
            cm.warp(returnmap);
            cm.dispose();
        }
    }
}
