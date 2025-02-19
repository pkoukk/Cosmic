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
/* Ms. Tan
	Henesys Skin Change.
*/
var status;
var skin = Array(0, 1, 2, 3, 4);
var price = 1000000;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }


        if (status == 0) {
            cm.sendSimple("欢迎来到射手村皮肤护理店!想拥有向我一样健康、紧致的皮肤吗？只要给我#t5153000#，然后休息一样，你就能拥有你想要的完美皮肤了~\r\n#L1#护肤: #i5153000##t5153000##l");
        } else if (status == 1) {
            if (cm.haveItem(5153000)) {
                cm.sendStyle("选择你想要的皮肤效果.", skin);
            } else {
                cm.sendOk("你没有我们的会员卡...");
                cm.dispose();

            }
        } else {
            cm.gainItem(5153000, -1);
            cm.setSkin(selection);
            cm.sendOk("看看效果!");
            cm.dispose();
        }
    }
}
