/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
 * @author: Ronan
 * @npc: Abdula
 * @map: Multiple towns on Maplestory
 * @func: Job Skill / Mastery Book Drop Announcer
*/

var status;
var selected = 0;
var num;
function start() {
    status = -1;
    selected = 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            var greeting = "怀旧岛单机群免费发布.禁止倒卖.你好,我是兑换商人!#b\r\n ";
            greeting += "#L0#购买三倍经验卡#l\r\n";
            greeting += "#L1#购买百宝券#l\r\n";
			//greeting += "#L6#购买高级百宝券#l\r\n";
			greeting += "#L7#购买复活护符#l\r\n";
			greeting += "#L4#点券兑换信用点#l\r\n";
			greeting += "#L5#信用点兑换点券#l\r\n";
            greeting += "#L2#购买#z4001126##l\r\n";
            greeting += "#L3#购买#z4310000##l\r\n";
            cm.sendSimple(greeting);
        } else if (status == 1) {
            selected = selection;
            var text;
            if (selection == 0) {
                text = "每4000点券可以交换1三倍经验卡,需要多少经验卡?";
            } else if (selection == 1) {
                text = "每1000点券可以交换1百宝券,需要使用多少百宝券?";
            } else if (selection == 6) {
                text = "每1500点券可以交换1高级百宝券,需要使用多少高级百宝券?";
            } else if (selection == 7) {
                text = "每1000点券可以交换1原地复活,需要使用多少原地复活?";
            } else if (selection == 2) {
                text = "#d#z4001126##b的价格是100点券,要买多少?";
            } else if (selection == 3) {
                text = "#d#z4310000##b的价格是1000点券,要买多少?";
            } else if (selection == 4) {
                text = "每1点券可以交换1信用卡，需要多少信用卡?";
            } else if (selection == 5) {
                text = "每1信用点可以交换1点券，需要多少点券?";
            }
            cm.sendGetNumber(text, 1, 1, 2000000);
        } else if (status == 2) {
            java.lang.System.out.println(selection+"");
            num = selection;
            var text;
            if (selected == 0) {
                text = "确定要使用" + (4000 * num) + "点券交换" + num + "三倍经验卡吗?";
            } else if (selected == 1) {
                text = "确定要使用" + (1000 * num) + "点券交换" + num + "百宝券吗?";
            } else if (selected == 2) {
                text = "确定要使用" + (100 * num) + "点券购买" + num + "个#z4001126#吗?";
            } else if(selected == 3){
                text = "确定要使用" + (1000 * num) + "点券购买" + num + "张#z4310000#吗?";
            } else if(selected == 4){
                text = "确定要使用" + (1 * num) + "点券交换" + num + "信用卡吗?";
            } else if(selected == 5){
                text = "确定要使用" + (1 * num) + "信用点交换" + num + "点券吗?";
            } else if(selected == 6){
                text = "确定要使用" + (1500 * num) + "点券交换" + num + "高级百宝券吗?";
            } else if(selected == 7){
                text = "确定要使用" + (1000 * num) + "点券交换" + num + "原地复活术吗?";
            }
            cm.sendYesNo(text);
        } else {
            if (selected == 0) {
                if (cm.getPlayer().getCashShop().getCash(1) >= 4000 * num) {
                    cm.getPlayer().getCashShop().gainCash(1, -4000 * num);
                    cm.gainItem(5211060,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else if (selected == 1) {
                if (cm.getPlayer().getCashShop().getCash(1) >= 1000 * num) {
                    cm.getPlayer().getCashShop().gainCash(1, -1000 * num);
                    cm.gainItem(5220000,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else if (selected == 4) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num) {
                    cm.getPlayer().getCashShop().gainCash(1, -num);
                    cm.getPlayer().getCashShop().gainCash(4, num );
                    cm.sendOk("交易成功,请到商城确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            }  else if (selected == 5) {
                if (cm.getPlayer().getCashShop().getCash(4) >= num) {
                    cm.getPlayer().getCashShop().gainCash(4, -num);
                    cm.getPlayer().getCashShop().gainCash(1, num );
                    cm.sendOk("交易成功,请到商城确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的信用点");
                }
            }   else if (selected == 2) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num*100) {
                    cm.getPlayer().getCashShop().gainCash(1, -num*100);
                    cm.gainItem(4001126,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else if (selected == 3) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num*1000) {
                    cm.getPlayer().getCashShop().gainCash(1, -num*1000);
                    cm.gainItem(4310000,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else if (selected == 6) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num*1500) {
                    cm.getPlayer().getCashShop().gainCash(1, -num*1500);
                    cm.gainItem(5220010,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else if (selected == 7) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num*1000) {
                    cm.getPlayer().getCashShop().gainCash(1, -num*1000);
                    cm.gainItem(5510000,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } 
            cm.dispose();
        }
    }
}
