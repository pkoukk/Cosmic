/*  
      
    Copyright (C) This file is part of the OdinMS Maple Story Server  
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
var itemToUse = 4001126;

var chairs = new Array(3010000, 3010001, 3010002, 3010003, 3010004, 3010005, 3010006, 3010007, 3010008, 3010009, 3010010, 3010011, 3010012, 3010013, 3010015, 3010016, 3010017, 3010018, 3010019, 3010022, 3010023, 3010024, 3010025, 3010026, 3010028, 3010040, 3010041, 3010043, 3010045, 3010046, 3010047, 3010057, 3010058, 3010060, 3010061, 3010062, 3010063, 3010064, 3010065, 3010066, 3010067, 3010069, 3010072, 3010073, 3010080, 3010081, 3010082, 3010083, 3010084, 3010085, 3010097, 3010098, 3010099, 3010101, 3010106, 3010116, 3011000, 3012005, 3012010, 3012011);
var scrolls = new Array(2040603, 2044503, 2041024, 2041025, 2044703, 2044603, 2043303, 2040807, 2040806, 2040006, 2040007, 2043103, 2043203, 2043003, 2040506, 2044403, 2040903, 2040709, 2040710, 2040711, 2044303, 2043803, 2040403, 2044103, 2044203, 2044003, 2043703);
var weapons = new Array(1302020, 1302030, 1302033, 1302058, 1302064, 1302080, 1312032, 1322054, 1332025, 1332055, 1332056, 1372034, 1382009, 1382012, 1382039, 1402039, 1412011, 1412027, 1422014, 1422029, 1432012, 1432040, 1432046, 1442024, 1442030, 1442051, 1452016, 1452022, 1452045, 1462014, 1462019, 1462040, 1472030, 1472032, 1472055, 1482020, 1482021, 1482022, 1492020, 1492021, 1492022, 1092030, 1092045, 1092046, 1092047);

var nxAmount = 20;
var chairAmount = 1;
var weaponAmount = 1;
var buffAmount = 1;
var hiredMerchantLength = 7;

//var cm.getPlayer().getCashShop().getCash(1);
var buff1ID = 2022154;
var buff2ID = 2022100;
var status;
var vp;
var choice;


function start() {
    //vp = cm.getClient().getVotePoints();
    //if(vp == null)
    vp = 0;

    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.getPlayer().getLevel() < 8) {

                cm.sendOk("你好,我是#p1022101#!\r\n\r\n我只能为#b8级以上玩家#k服务.");
                cm.dispose();
                return;
            }
            //var dj = 0;
            //var dj = cm.getPlayer().getCashShop().getCash(1);
            //cm.getPlayer().getCashShop().getCash(1);


            var outStr = "你好,我是#p1022101#!\r\n";
            //outStr += "你现在有#r#c" + dj +"##b\r\n\r\n" ;
            outStr += "你现在有#r#c" + itemToUse + "##k#t" + itemToUse + "##b\r\n\r\n";
            //outStr += "#L0#我想要兑换枫叶#l\r\n";
            //outStr += "#L1#用#t" + itemToUse + "#兑换" + "点券(1000:1000)#l\r\n";
            //outStr += "#L7#用点卷" + "兑换" + "枫叶(1000:1000)#l\r\n";
            //outStr += "#L8#用#t" + itemToUse + "#兑换" + "点券(9999:9999)#l\r\n";
            //outStr += "#L9#用点卷" + "兑换" + "枫叶(9999:9999)#l\r\n";
            outStr += "#L2#用#t" + itemToUse + "#抽取" + "随机椅子" + (chairAmount > 1 ? "" : "") + "(50枫叶一次)#l\r\n";
            outStr += "#L3#用#t" + itemToUse + "#抽取" + "枫叶武器(20枫叶一次)#l\r\n";
            // outStr += "#L4#用#t" + itemToUse + "#兑换" + buffAmount + "#t" + buff1ID + "#和" + buffAmount + "个#t" + buff2ID + "#(1200枫叶)#l\r\n";
            outStr += "#L5#用#t" + itemToUse + "#兑换" + hiredMerchantLength + "天雇佣商人(100枫叶)#l\r\n";
            //outStr += "#L6#我要去#m209000000##l\r\n";

            cm.sendSimple(outStr);
        }
        else if (status == 1) {
            choice = selection;

            if (selection > 0) {
                if (!cm.haveItem(itemToUse) && vp == 0) {
                    cm.sendOk("很抱歉,你没有点卷" + "或者枫叶.");
                    cm.dispose();
                    return;
                }
            }

            if (selection == 0) {
                // Exchange VP for leaves
                if (vp <= 0) {
                    cm.sendOk("抱歉,你的邀请点不够!");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("想用" + vp + "邀请点" + (vp > 0 ? "" : "") + "兑换" + vp + "#t" + itemToUse + "#" + (vp > 0 ? "" : "") + "?");
            }
            else if (selection == 1) {
                // Exchange 1 Leaf for Cash
                cm.sendYesNo("想用1000个#t" + itemToUse + "#兑换" + "1000点券?");
            } else if (selection == 8) {
                // Exchange 1 Leaf for Cash
                cm.sendYesNo("想用9999个#t" + itemToUse + "#兑换" + "9999点券?");
            } else if (selection == 9) {
                // Exchange 1 Leaf for Cash
                cm.sendYesNo("想用9999点卷" + "兑换" + "9999枫叶?");
            }
            else if (selection == 2) {
                // Exchange 1 Leaf for Chair
                cm.sendYesNo("想用50个#t" + itemToUse + "#抽取" + "随机椅子?");
            } else if (selection == 3) {
                // Exchange 1 Leaf for Maple Weapons
                cm.sendYesNo("想用20个#t" + itemToUse + "#抽取" + "随机的枫叶武器?");
            } else if (selection == 4) {
                // Exchange 1 Leaf for Apples/Cheese
                cm.sendYesNo("想用1200个#t" + itemToUse + "#兑换" + buffAmount + "个#t" + buff1ID + "#和" + buffAmount + "个#t" + buff2ID + "#?");
            } else if (selection == 5) {
                // Echange 1 Leaf for Merchant
                cm.sendYesNo("想用100个#t" + itemToUse + "#兑换" + hiredMerchantLength + "天雇佣商人?");
            }
            else if (selection == 7) {
                // Exchange 1 Leaf for Cash
                cm.sendYesNo("想用1000点卷" + "兑换" + "1000枫叶?");
            }
            else {
                cm.getPlayer().saveLocation("HAPPYVILLE");
                cm.warp(209000000, 0);
                cm.dispose();
            }
        } else if (status == 2) {
            var useVP = false;
            if (!cm.hasItem(itemToUse) && vp > 0)
                useVP = true;

            if (choice == 0) {
                // VP Exchange
                if (!cm.canHold(itemToUse)) {
                    cm.sendOk("看样子你的#r其他#k栏装不下#t" + itemToUse + "#" + (vp > 0 ? "" : "") + "了.");
                    cm.dispose();
                    return;
                }
                cm.getClient().useVotePoints(vp);
                cm.gainItem(itemToUse, vp);
                cm.dispose();
            }
            else if (choice == 1) {
                // Leaf for Cash
                if (useVP)
                    cm.getClient().useVotePoints(1);
                else
                    if (cm.hasItem(itemToUse, 1000)) {
                        cm.gainItem(itemToUse, -1000);
                    } else {
                        cm.sendOk("#t" + itemToUse + "#不够");
                        cm.dispose();
                        return;
                    }
                cm.getPlayer().getCashShop().gainCash(1, 1000);
                cm.getPlayer().announce(Packages.tools.MaplePacketCreator.earnTitleMessage("获得" + 1000 + "点券"));
                cm.logLeaf(nxAmount + "点券");
                cm.dispose();
            } else if (choice == 8) {
                // Leaf for Cash
                if (useVP)
                    cm.getClient().useVotePoints(1);
                else
                    if (cm.hasItem(itemToUse, 9999)) {
                        cm.gainItem(itemToUse, -9999);
                    } else {
                        cm.sendOk("#t" + itemToUse + "#不够");
                        cm.dispose();
                        return;
                    }
                cm.getPlayer().getCashShop().gainCash(1, 9999);
                cm.getPlayer().announce(Packages.tools.MaplePacketCreator.earnTitleMessage("获得" + 9999 + "点券"));
                cm.logLeaf(nxAmount + "点券");
                cm.dispose();
            } else if (choice == 2) {
                if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).isFull(chairAmount)) {
                    if (cm.hasItem(itemToUse, 50)) {
                        cm.gainItem(itemToUse, -50);
                        var chairStr = "";
                        if (Math.random() < 0.2) {
                            for (var i = 0; i < chairAmount; i++) {
                                var chair = chairs[Math.floor(Math.random() * chairs.length)];
                                cm.gainItem(chair, 1, true);
                                chairStr += chair + " ";
                            }
                            cm.sendOk("获得了#b#z" + chairStr + "#");
                            cm.logLeaf("椅子ID: " + chairStr);
                            cm.dispose();
                        } else {
                            cm.sendOk("抱歉,这次什么都没得到");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("你的#t" + itemToUse + "#不够");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("请确定你的背包空间够用!");
                    cm.dispose();
                }
            } else if (choice == 3) {
                if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(weaponAmount)) {
                    if (cm.hasItem(itemToUse, 20)) {
                        cm.gainItem(itemToUse, -20);
                        if (Math.random() < 0.1) {
                            var weaponStr = "";
                            for (var i = 0; i < weaponAmount; i++) {
                                var weapon = weapons[Math.floor(Math.random() * weapons.length)];
                                cm.gainItem(weapon, 1, true, true);
                                weaponStr += weapon + " ";
                            }
                            cm.logLeaf("枫叶武器ID: " + weaponStr);
                        }
                        else {
                            cm.sendOk("这次什么都没得到!");
                        }
                    } else {
                        cm.sendOk("枫叶不够!");
                    }
                } else {
                    cm.sendOk("背包空间要足够!");
                }
                cm.dispose();
            } else if (choice == 4) {
                if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).isFull(2)) {
                    if (cm.hasItem(itemToUse, 1200)) {
                        cm.gainItem(buff1ID, buffAmount, true);
                        cm.gainItem(buff2ID, buffAmount, true);
                        cm.gainItem(itemToUse, -1200);
                        cm.logLeaf(buffAmount + "奶酪和苹果");
                    } else {
                        cm.sendOk("枫叶不够!");
                    }
                } else {
                    cm.sendOk("背包空间要足够!");
                }
                cm.dispose();
            } else if (choice == 5) {
                if (!cm.haveItem(5030000, 1)) {
                    if (!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.CASH).isFull(1)) {
                        if (cm.hasItem(itemToUse, 100)) {
                            cm.gainItem(5030000, 1, false, true, 1000 * 60 * 60 * 24 * hiredMerchantLength);
                            cm.gainItem(itemToUse, -100);
                            cm.logLeaf(hiredMerchantLength + "一日雇佣商人");
                        } else {
                            cm.sendOk("枫叶不够!");
                        }
                    } else {
                        cm.sendOk("背包空间要足够!");
                    }
                } else {
                    cm.sendOk("你有的话我不能再给你更多!");
                }
                cm.dispose();
            }
            else if (choice == 7) {
                // Leaf for Cash
                // if (gainCash)
                //         cm.getClient().useVotePoints(1);
                //		else
                if (cm.getPlayer().getCashShop().getCash(1) > 1000) {
                    cm.getPlayer().getCashShop().gainCash(1, -1000)
                    cm.gainItem(itemToUse, 1000);
                } else {

                    cm.sendOk("点卷" + "不够");
                    cm.dispose();
                    return;
                }

                cm.getPlayer().announce(Packages.tools.MaplePacketCreator.earnTitleMessage("获得" + 1000 + "枫叶"));
                cm.logLeaf(nxAmount + "枫叶");
                cm.dispose();
            }
            else if (choice == 9) {
                // Leaf for Cash
                // if (gainCash)
                //         cm.getClient().useVotePoints(1);
                //		else
                if (cm.getPlayer().getCashShop().getCash(1) > 9999) {

                    cm.getPlayer().getCashShop().gainCash(1, -9999)
                    cm.gainItem(itemToUse, 9999);
                }

                else {

                    cm.sendOk("点卷" + "不够");
                    cm.dispose();
                    return;
                }

                cm.getPlayer().announce(Packages.tools.MaplePacketCreator.earnTitleMessage("获得" + 9999 + "枫叶"));
                cm.logLeaf(nxAmount + "枫叶");
                cm.dispose();
            }
        }

        else {
            cm.dispose();
        }
    }
}