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


var travelFrom = [777777777, 541000000];
var travelFee = [3000, 10000];

var travelMap = [800000000, 550000000];
var travelPlace = ["Mushroom Shrine of Japan", "Trend Zone of Malaysia"];
var travelPlaceShort = ["Mushroom Shrine", "Metropolis"];
var travelPlaceCountry = ["Japan", "Malaysia"];
var travelAgent = ["I", "#r#p9201135##k"];

var travelDescription = ["如果你想感受日本的精华，没有什么比参观神社更好的了。古代神社是一个神话般的地方，供奉着自古以来无与伦比的蘑菇神。",
    "如果您想体会热带的积极快乐，马来西亚居民渴望欢迎您。并且，大都市本身就是当地经济的中心，众所周知，这个地方因为旅游而闻名。"];

var travelDescription2 = ["看看为蘑菇神服务的女萨满，我强烈建议尝试章鱼烧、炒面和其他在日本街头出售的小吃们。现在，让我们前往#b古代神社#k，一个自古流传的地方。",
    "到达那里后，我强烈建议您安排参观#m551000000#。为什么？你肯定已经知道那个叫阴森世界的奇幻主题公园吧。不知道？它是这里最棒的主题公园，值得一游！现在，让我们前往#b吉隆大都市#k"];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1, 0, 0);
}

function getTravelingStatus(mapid) {
    for (var i = 0; i < travelMap.length; i++) {
        if (mapid == travelMap[i]) {
            return i;
        }
    }

    return -1;
}

function getTravelType(mapid) {
    for (var i = 0; i < travelFrom.length; i++) {
        if (mapid == travelFrom[i]) {
            return i;
        }
    }

    return 0;
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && status == 4) {
            status -= 2;
        } else {
            cm.dispose();
            return;
        }
    }

    if (travelStatus != -1) {
        if (status == 0) {
            cm.sendSimple("这趟旅途如何？你喜欢么？#b\r\n#L0#是的，这趟旅途很美满. 我现在可以回 #m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#吗?\r\n#L1#不，我还想再多逛逛.");
        } else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("好的.我现在带你回你来日本之前的地方.如果你还想再来旅游，随时和我说!");
            } else if (selection == 1) {
                cm.sendOk("好的，如果你改变主意了，就告诉我");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1) {
                map = 104000000;
            }

            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            cm.sendNext("如果你厌倦了单调的日常生活，出去换个心情吧？没有什么马上比吸收新文化，学习新东西更棒的了！你是时候改出去走走了。我们冒险旅行社推荐你去#b环游世界#k！你不用担心旅行费用的问题，我们旅行社会给你一个完美的旅程，并且只要#b" + cm.numberWithCommas(travelFee[travelType]) + "金币#k");
        } else if (status == 1) {
            cm.sendSimple("我们现在可供你选择以下目的地: #b" + travelPlace[travelType] + "#k. " + travelAgent[travelType] + "我将会作为你的旅游向导.放心,目的地的数量会越来越多.现在,想要到" + travelPlaceShort[travelType] + "吗?#b\r\n#L0#是的,带我去" + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
        } else if (status == 2) {
            cm.sendNext("你想去#b#m" + travelPlace[travelType] + "##k吗? " + travelDescription[travelType]);
        } else if (status == 3) {
            if (cm.getMeso() < travelFee[travelType]) {
                cm.sendNext("你的金币不够这次旅行.");
                cm.dispose();
                return;
            }
            cm.sendNextPrev(travelDescription2[travelType]);
        } else if (status == 4) {
            cm.gainMeso(-travelFee[travelType]);
            cm.getPlayer().saveLocation("WORLDTOUR");
            cm.warp(travelMap[travelType], 0);
            cm.dispose();
        }
    }
}