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
/* Rydole
	Ludibrium : Toy Factory <Aparatus Room> (220020600)
	
	Refining NPC: 
	* Level 30-50 weapons - Stimulator allowed
*/
var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var stimulator = false;
var stimID;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
    }
    if (status == 0 && mode == 1) {
        var selStr = "你发现我了!我大部分时间都在这里工作，为像你这样的旅行者制造武器。你有什么要求吗?#b"
        var options = ["什么是促进剂?", "制造战士武器", "制造弓箭手武器", "制造法师武器", "制造飞侠武器",
            "使用促进剂制造战士武器", "使用促进剂制造弓箭手武器", "使用促进剂制造法师武器", "使用促进剂制造飞侠武器"];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }

        cm.sendSimple(selStr);
    } else if (status == 1 && mode == 1) {
        selectedType = selection;
        var selStr;
        var weapon;
        if (selectedType > 4) {
            stimulator = true;
            selectedType -= 4;
        } else {
            stimulator = false;
        }
        if (selectedType == 0) { //What's a stim?
            cm.sendNext("促进剂是一种特殊的药剂，我可以在制作某些物品的过程中加入它。他让制造的物品就像是从怪物身上掉落一样。因此使用促进剂可能使道具属性更好或者更坏。当然,有可能会失败.")
            cm.dispose();
        } else if (selectedType == 1) { //warrior weapon
            selStr = "好的,想做什么战士武器?";
            weapon = ["#z1302008#", "#z1302004#", "#z1302009#", "#z1302010#", "#z1312005#", "#z1312006#", "#z1312007#", "#z1312008#",
                "#z1322014#", "#z1322015#", "#z1322016#", "#z1322017#", "#z1402002#", "#z1402006#", "#z1402007#", "#z1402003#",
                "#z1412006#", "#z1412004#", "#z1412005#", "#z1412003#", "#z1422001#", "#z1422008#", "#z1422007#", "#z1422005#",
                "#z1432002#", "#z1432003#", "#z1432005#", "#z1432004#", "#z1442001#", "#z1442003#", "#z1442009#", "#z1442005#"];
        } else if (selectedType == 2) { //bowman weapon
            selStr = "你要做什么弓箭手的武器";
            weapon = ["#z1452005#", "#z1452006#", "#z1452007#", "#z1452008#", "#z1462004#", "#z1462005#", "#z1462006#", "#z1462007#"];
        } else if (selectedType == 3) { //magician weapon
            selStr = "你要做什么魔法师的武器？";
            weapon = ["#z1372003#", "#z1372001#", "#z1372000#", "#z1372007#", "#z1382002#", "#z1382001#", "#z1382006#"];
        } else if (selectedType == 4) { //thief weapon; claws vary depending if stimulator is being used
            selStr = "你要做什么盗贼的武器";
            if (!stimulator) {
                weapon = ["#z1332012#", "#z1332009#", "#z1332014#", "#z1332011#", "#z1332016#", "#z1332003#",
                    "#z1472009#", "#z1472010#", "#z1472012#", "#z1472013#"];
            } else {
                weapon = ["#z1472015#", "#z1472016#", "#z1472017#", "#z1472019#", "#z1472020#", "#z1472021#",
                    "#z1332012#", "#z1332009#", "#z1332014#", "#z1332011#", "#z1332016#", "#z1332003#",
                    "#z1472008#", "#z1472011#", "#z1472014#", "#z1472018#"];
            }
        }

        if (selectedType != 0) {
            for (var i = 0; i < weapon.length; i++) {
                selStr += "\r\n#L" + i + "# " + weapon[i] + "#l";
            }
            cm.sendSimple(selStr);
        }
    } else if (status == 2 && mode == 1) {
        selectedItem = selection;
        if (selectedType == 1) { //warrior weapon
            var itemSet = [1302008, 1302004, 1302009, 1302010, 1312005, 1312006, 1312007, 1312008, 1322014, 1322015, 1322016, 1322017, 1402002, 1402006, 1402007, 1402003, 1412006, 1412004, 1412005, 1412003, 1422001, 1422008, 1422007, 1422005, 1432002, 1432003, 1432005, 1432004, 1442001, 1442003, 1442009, 1442005];
            var matSet = [[4131000, 4011001, 4011004, 4003000], [4131000, 4011006, 4011001, 4021006, 4003000], [4131000, 4011006, 4011001, 4021000, 4003000], [4131000, 4005000, 4021008, 4011006, 4021003, 4003000],
                [4131001, 4011001, 4021000, 4003000], [4131001, 4011001, 4021000, 4011004, 4003000], [4131001, 4021005, 4011001, 4021001, 4003000], [4131001, 4005000, 4021008, 4011004, 4011001, 4003000],
                [4131002, 4011001, 4011000, 4003000], [4131002, 4011001, 4011000, 4011003, 4003000], [4131002, 4011003, 4011001, 4011004, 4003000], [4131002, 4005000, 4021008, 4011006, 4011001, 4003000],
                [4131003, 4011001, 4021000, 4021004, 4003000], [4131003, 4011006, 4011001, 4021004, 4003000], [4131003, 4021003, 4011000, 4011001, 4003000], [4131003, 4005000, 4021007, 4011006, 4011001, 4003000],
                [4131004, 4021005, 4011001, 4003001, 4003000], [4131004, 4011004, 4011000, 4021003, 4003000], [4131004, 4011006, 4011004, 4011001, 4003000], [4131004, 4005000, 4021007, 4011006, 4021006, 4003000],
                [4131005, 4011001, 4011004, 4003000], [4131005, 4011001, 4011000, 4003001, 4003000], [4131005, 4011001, 4011004, 4011006, 4003000], [4131005, 4005000, 4021008, 4021006, 4011006, 4003000],
                [4131006, 4011000, 4011004, 4003000], [4131006, 4011001, 4011002, 4021000, 4003000], [4131006, 4011004, 4011001, 4011000, 4003000], [4131006, 4005000, 4021008, 4011000, 4021000, 4003000],
                [4131007, 4011000, 4011002, 4003000], [4131007, 4011001, 4011002, 4003000], [4131007, 4011006, 4011002, 4011001, 4003000], [4131007, 4005000, 4021007, 4011001, 4011002, 4003000]];
            var matQtySet = [[1, 2, 2, 30], [1, 1, 5, 3, 35], [1, 3, 5, 5, 40], [1, 1, 2, 4, 10, 50],
                [1, 2, 2, 30], [1, 5, 5, 3, 35], [1, 7, 5, 5, 40], [1, 1, 2, 8, 10, 50],
                [1, 2, 2, 30], [1, 5, 5, 3, 35], [1, 7, 5, 5, 40], [1, 1, 2, 4, 10, 50],
                [1, 2, 1, 2, 35], [1, 1, 5, 5, 40], [1, 7, 5, 5, 45], [1, 1, 2, 4, 10, 55],
                [1, 2, 2, 5, 35], [1, 5, 5, 3, 40], [1, 3, 5, 5, 45], [1, 1, 2, 5, 7, 55],
                [1, 2, 3, 35], [1, 5, 5, 10, 40], [1, 5, 5, 3, 45], [1, 1, 2, 7, 5, 55],
                [1, 2, 3, 40], [1, 5, 5, 3, 45], [1, 3, 5, 5, 50], [1, 1, 2, 7, 5, 60],
                [1, 2, 3, 40], [1, 5, 5, 40], [1, 3, 5, 5, 50], [1, 1, 2, 7, 5, 60]];
            var costSet = [18000, 35000, 70000, 200000, 18000, 35000, 70000, 200000, 18000, 35000, 70000, 200000, 20000, 37000, 72000, 220000, 20000, 37000, 72000, 220000, 20000, 37000, 72000, 220000, 22000, 39000, 74000, 240000, 22000, 39000, 74000, 240000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2) { //bowman weapon
            var itemSet = [1452005, 1452006, 1452007, 1452008, 1462004, 1462005, 1462006, 1462007];
            var matSet = [[4131010, 4011001, 4011006, 4021003, 4021006, 4003000], [4131010, 4011004, 4021000, 4021004, 4003000], [4131010, 4021008, 4011001, 4011006, 4003000, 4000112], [4131010, 4005002, 4021008, 4011001, 4021005, 4003000],
                [4131011, 4011001, 4011005, 4021006, 4003001, 4003000], [4131011, 4021008, 4011001, 4011006, 4021006, 4003000], [4131011, 4021008, 4011004, 4003001, 4003000], [4131011, 4021008, 4011006, 4021006, 4003001, 4003000]];
            var matQtySet = [[1, 5, 5, 3, 3, 30], [1, 7, 6, 3, 35], [1, 1, 10, 3, 40, 100], [1, 1, 2, 10, 6, 50], [1, 5, 5, 3, 50, 15], [1, 1, 8, 4, 2, 30], [1, 2, 6, 30, 30], [1, 2, 5, 3, 40, 40]];
            var costSet = [15000, 20000, 40000, 100000, 15000, 25000, 41000, 100000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 3) { //magician weapon
            var itemSet = [1372003, 1372001, 1372000, 1372007, 1382002, 1382001, 1382006];
            var matSet = [[4131008, 4011002, 4021002, 4003000], [4131008, 4021006, 4011002, 4011001, 4003000], [4131008, 4021006, 4021005, 4021007, 4003003, 4003000], [4131008, 4011006, 4021003, 4021007, 4021002, 4003000],
                [4131009, 4021006, 4021001, 4011001, 4003000], [4131009, 4011001, 4021006, 4021001, 4021005, 4003000], [4131009, 4005001, 4021008, 4011006, 4011004, 4003000]];
            var matQtySet = [[1, 3, 1, 10], [1, 5, 3, 1, 15], [1, 5, 5, 1, 1, 20], [1, 4, 3, 2, 1, 30], [1, 2, 1, 1, 15], [1, 8, 5, 5, 5, 30], [1, 2, 2, 5, 10, 40]];
            var costSet = [15000, 30000, 60000, 100000, 10000, 80000, 200000];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 4) { //thief weapon; claws vary depending if stimulator is being used
            if (!stimulator) {
                var itemSet = [1332012, 1332009, 1332014, 1332011, 1332016, 1332003, 1472008, 1472011, 1472014, 1472018];
                var matSet = [[4131012, 4011002, 4011001, 4003000], [4131012, 4021005, 4011001, 4003000], [4131012, 4021005, 4011001, 4011002, 4003000], [4131012, 4011001, 4011006, 4021006, 4003000], [4131012, 4005003, 4021008, 4011004, 4011001, 4003000], [4131012, 4005003, 4021007, 4011006, 4011001, 4003000],
                    [4131013, 4011000, 4011001, 4000021, 4003000], [4131013, 4011000, 4011001, 4000021, 4003000], [4131013, 4011000, 4011001, 4000021, 4003000], [4131013, 4011000, 4011001, 4000030, 4003000]];
                var matQtySet = [[1, 2, 3, 30], [1, 2, 3, 30], [1, 1, 5, 3, 35], [1, 7, 3, 6, 40], [1, 1, 2, 7, 10, 50], [1, 1, 2, 5, 10, 50], [1, 3, 2, 50, 20], [1, 4, 2, 80, 25], [1, 3, 2, 100, 30], [1, 4, 2, 40, 35]];
                var costSet = [20000, 20000, 33000, 73000, 230000, 230000, 15000, 30000, 40000, 50000];
            } else {
                var itemSet = [1332012, 1332009, 1332014, 1332011, 1332016, 1332003, 1472009, 1472010, 1472012, 1472013, 1472015, 1472016, 1472017, 1472019, 1472020, 1472021];
                var matSet = [[4131012, 4011002, 4011001, 4003000], [4131012, 4021005, 4011001, 4003000], [4131012, 4021005, 4011001, 4011002, 4003000], [4131012, 4011001, 4011006, 4021006, 4003000], [4131012, 4005003, 4021008, 4011004, 4011001, 4003000], [4131012, 4005003, 4021007, 4011006, 4011001, 4003000],
                    [4131013, 1472008, 4011002], [4131013, 1472008, 4011003], [4131013, 1472011, 4011004], [4131013, 1472011, 4021008], [4131013, 1472014, 4021000], [4131013, 1472014, 4011003], [4131013, 1472014, 4021008], [4131013, 1472018, 4021000], [4131013, 1472018, 4021005],
                    [4131013, 1472018, 4005003, 4021008]];
                var matQtySet = [[1, 2, 3, 30], [1, 2, 3, 30], [1, 1, 5, 3, 35], [1, 7, 3, 6, 40], [1, 1, 2, 7, 10, 50], [1, 1, 2, 5, 10, 50], [1, 1, 3], [1, 1, 3], [1, 1, 4], [1, 1, 1], [1, 1, 5], [1, 1, 5], [1, 1, 2], [1, 1, 6], [1, 1, 6], [1, 1, 1, 3]];
                var costSet = [20000, 20000, 33000, 73000, 230000, 230000, 10000, 15000, 20000, 25000, 30000, 30000, 35000, 40000, 40000, 50000];
            }
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "你确定要做一个 #t" + item + "#? 在这种情况下，我需要你的特定物品才能制作。不过，请确保您的库存中有空间!#b";

        if (stimulator) {
            stimID = mats[0] - 998; //stim ID for a weapon = manual ID for weapon - 998
            prompt += "\r\n#i" + stimID + "# 1 #t" + stimID + "#";
        }

        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i" + mats + "# " + matQty + " #t" + mats + "#";
        }

        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost + "金币";
        }

        cm.sendYesNo(prompt);
    } else if (status == 3 && mode == 1) {
        var complete = true;

        if (!cm.canHold(item, 1)) {
            cm.sendOk("背包空间不足.");
            cm.dispose();
            return;
        } else if (cm.getMeso() < cost) {
            cm.sendOk("你没钱.");
            cm.dispose();
            return;
        } else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] * selection == 1) {
                        if (!cm.haveItem(mats[i])) {
                            complete = false;
                        }
                    } else {
                        if (!cm.haveItem(mats[i], matQty[i] * selection)) {
                            complete = false;
                        }
                    }
                }
            } else {
                if (!cm.haveItem(mats, matQty * selection)) {
                    complete = false;
                }
            }
        }

        if (stimulator) { //check for stimulator
            if (!cm.haveItem(stimID)) {
                complete = false;
            }
        }

        if (!complete) {
            cm.sendOk("你缺材料");
        } else {
            if (mats instanceof Array) {
                for (var i = 0; i < mats.length; i++) {
                    cm.gainItem(mats[i], -matQty[i]);
                }
            } else {
                cm.gainItem(mats, -matQty);
            }

            cm.gainMeso(-cost);
            if (stimulator) { //check for stimulator
                cm.gainItem(stimID, -1);
                var deleted = Math.floor(Math.random() * 10);
                if (deleted != 0) {
                    cm.gainItem(item, 1, true, true);
                    cm.sendOk("给你");
                } else {
                    cm.sendOk("不好意思,制作失败.");
                }
            } else //just give basic item
            {
                cm.gainItem(item, 1);
                cm.sendOk("做好了");
            }
        }
        cm.dispose();
    }
}