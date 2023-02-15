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
	VIP Cab - Victoria Road : Lith Harbor (104000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/


var itemSet = Array(
//Array(2049100,4001126,1),                     //（卷轴代码，材料物品代码，单个物品所需材料个数）
//Array(2040920,4001006,1),
//Array(2040816,4001006,1),
//Array(2340000,4001126,10),
//Array(2050007,4001126,1),
//Array(2050008,4001126,1),
//Array(1462243,1432012,2),
Array(2049115,2049100,3)
);
var status = 0;
var selectedItem;
var item;
var req;
var cost;
var qty;
var co;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if (mode == -1){
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("走开走开!.");
    	cm.dispose();
    	return;
    }
    if (status == 1) {
            var add ="请选择你想兑换的物品\r\n";
            //add += "#d点卷余额：#b" + cm.getPlayer().getCashShop().getCash(1) + "#k          ";
            //add += "#d抵用余额：#b" + cm.getPlayer().getCashShop().getCash(4) + "#k#n\r\n";
                for (var i = 0; i < itemSet.length; i++) {	
                    add += "\r\n#L" + i + "##v " + itemSet[i][0] + "##z";
                    add += itemSet[i][0]+"#"+"    需要材料:#v " + itemSet[i][1]+"#";
                    //add += "   需要个数: " + itemSet[i][2]+"个#l#k";
                };

            cm.sendSimple(add);
    } else if (status == 2) {

            selectedItem = selection;
            item = itemSet[selectedItem][0];
            req = itemSet[selectedItem][1];
            co = itemSet[selectedItem][2];
            var bdd ="你确定要兑换\r\n";
            bdd += "\r\n#i" +item+"# "+ " #t" + item + "#";
            bdd += "    需要材料:#v " + req + "\r\n\r\n";
            bdd += "单个物品需要材料个数:#r " + co + "个\r\n\r\n\r\n";
            bdd += "请输入购买个数\r\n";
            cm.sendGetNumber(bdd,1,1,100)
            //cm.sendYesNo(bdd);
    } else if (status == 3) {
	qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
	cost=co*qty;   //花费为物品单价*输入的数量
            if (!cm.haveItem(req, cost)) {
                        cm.sendOk("#b您的材料不足,傻屌");
	        cm.dispose();
            } else {
            	        cm.gainItem(req,-cost);
            	        cm.gainItem(item,qty);
                        cm.sendOk("#b购买成功");
	        cm.dispose();
            }
            cm.dispose();
    }
}
