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

status = -1;
var sel;
var pickup = -1;

function start() {
    cm.sendSimple("我是阿布杜拉，我是一名商人中间人专门处理稀有物品。你有什么要告诉我的?#b\r\n#L0#我想卖货物.\r\n#L1#我想知道目前的市场价格.\r\n#L2#一个商人中介吗?那是什么?");
}

function action(mode, type, selection) {
    status++;
    if(mode != 1){
        if(mode == 0 && status == 0){
            cm.dispose();
            return;
        }else if(mode == 0 && sel == 0 && status == 2){
            cm.sendNext("你现在不想卖了吗?你可以稍后出售它，但要记住特殊道具只在一周内有价值");
            cm.dispose();
            return;
        }else if(mode == 0 && sel == 2)
            status -= 2;
    }
    if(status == 0){
        if(sel == undefined)
            sel = selection;
        if (selection == 0){
            var text = "让我们看看你带来了什么……#b";
            for(var i = 0; i < 5; i++)
                text += "\r\n#L" + i + "##t" + (3994090 + i) + "#";
            cm.sendSimple(text);
        }else if (selection == 1){
            var text = "";
            for(var i = 0; i < 5; i++)
                text += "当前的市场价格 #t" + (i + 3994090) + "# 是 #rNOT DONE#k 金币\r\n";
            cm.sendNext(text);
            cm.dispose();
        }else
            cm.sendNext("我在冒险岛7日市场买这些产品，然后在其他城镇销售。我交易纪念品、香料、鲨鱼标本等等……但是没有懒惰雏菊的蛋。");
    }else if(status == 1){
        if(sel == 0){
            if(cm.haveItem(3994090 + selection)){
                pickup = 3994090 + selection;
                cm.sendYesNo("目前的价格是180金币。你现在想卖了吗?"); //Make a price changer by hour.
            }else{
                cm.sendNext("你什么都没有。别再浪费我的时间了……我是个大忙人。");
                cm.dispose();
            }
        }else
            cm.sendNextPrev("冒险岛七天市场周日是我的休息日。如果你需要见我，你必须周一到周五来……");
    }else if(status == 2){
        if(sel == 0)
            cm.sendGetNumber("你想卖多少?", 0, 0, 200);
        else{
            cm.sendPrev("哦，价格可能会有变动。我得不到好处，我得继续干下去!经常和我联系，我的价格按小时变化!");
        }
    }else if(status == 3){
        if(sel == 0)
            if(selection != 1)
                cm.sendNext("东西是不正确的。再次检查。");
            else{
                cm.sendNext("交易已经完成。下次见。");
                cm.gainMeso(180);
                cm.gainItem(pickup, -1);
            }
        cm.dispose();
    }
}