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
/* Author: Xterminator
	NPC Name: 		Robin
	Map(s): 		Maple Road : Snail Hunting Ground I (40000)
	Description: 		Beginner Helper
*/
var status;
var sel;

function start() {
    status = -1;
    sel = -1;
    cm.sendSimple("欢迎你来到这里！在开始冒险之前还有什么疑问尽管问吧。\r\n#b#L0#基本移动方法？#l\r\n#L1#击败怪物的方法？#l\r\n#L2#捡取物品的方法？#l\r\n#L3#死亡后怎么办？#l\r\n#L4#怎么学习职业技能？#l\r\n#L5#告诉我关于这个岛#l\r\n#L6#告诉我如何成为战士。#l\r\n#L7#告诉我如何成为弓箭手。#l\r\n#L8#告诉我如何成为飞侠。#l\r\n#L9#告诉我如何成为魔法师。#l\r\n#L10#告诉我如何成为海盗。#l\r\n#L12#在哪里查看我拾取的物品？#l\r\n#L13#怎么穿戴上装备？#l\r\n#L14#怎么查看在装备栏的道具？#l\r\n#L15#什么是技能？#l\r\n#L16#怎么去金银岛？#l\r\n#L17#金币是什么？#l");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && type != 4) {
            status -= 2;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        if (sel == -1) {
            sel = selection;
        }
        if (sel == 0) {
            cm.sendNext("我告诉你基本移动方法。用#b左右键#k可以在平地或斜坡上行走，用#bAlt键#k可以进行跳跃。有些鞋子可以增加你的移动速度或跳跃能力。\\r\#fUI/DialogImage.img/Help/0#");
        } else if (sel == 1) {
            cm.sendNext("我告诉你击败怪物的方法。每只怪物都有自己的血量，用物理攻击或魔法攻击都可以击败怪物。但是有些怪物很厉害，击败它们很不容易");
        } else if (sel == 2) {
            cm.sendNext("我告诉你拾取物品的方法。击败怪物后战利品会在掉在地上，这时候站在物品前按#bZ键#k，就可拾取物品。\r\n\r\n#fUI/DialogImage.img/Help/2#");
        } else if (sel == 3) {
            cm.sendNext("想知道死亡后要怎么办？与怪物战斗中如果体力值变为0，你就会死亡并变成幽灵。在死去的位置会出现墓碑，除了可以说话，其它操作都不能进行。");
        } else if (sel == 4) {
            cm.sendNext("想知道什么时候能转职？哈哈~！你真性急。每个职业都有固有的转职条件。一般8~10级你就可以选择职业。努力啊！");
        } else if (sel == 5) {
            cm.sendNext("想知道这个岛的情况？这里是叫彩虹岛的地方。从很早之前就漂浮在天空上了，因此这里很少出现凶猛的怪物。所以是相对安全的岛，是新手练习的好地方。");
        } else if (sel == 6) {
            cm.sendNext("你想成为#b战士#k吗？嗯。。。那么你必须要去金银岛。金银岛北部有有一个村落，叫#r勇士部落#k。去那里找#b武术教练#k与他进行对话，但要成为战士你的等级必需达到10级.");
        } else if (sel == 7) {
            cm.sendNext("你想成为弓箭手吗？在金银岛你想成为弓箭手。在金银岛南部有弓箭手的村落，叫#r射手村#k。弓箭手转职官赫丽娜会告诉你成为弓箭手的方法。但关键是要成为弓箭手你的等级至少10级以上。");
        } else if (sel == 8) {
            cm.sendNext("你想成为魔法师是吗？那你要去金银岛东部的魔法密林。在那里你会见到很多魔法师。而且在那里你要见汉斯。他就会让你成为魔法师。");
        } else if (sel == 9) {
            cm.sendNext("你想成为飞侠吗？那你要去金银岛西部的废弃都市。废都的达克鲁就会告诉你成为飞侠的办法。关键的是为了成为飞侠，你的等级至少10级以上。");
        } else if (sel == 10) {
            cm.sendNext("你想知道如何提高你的角色的能力值？首先按#bS#k以检查出的能力的窗口。每次每当你升级的时候，你会获得5点AP点数。请正确的分配这些AP点数！");
        } else if (sel == 11) {
            cm.sendNext("你想知道在哪里能查看拾取的道具吗？你按下Z键可以拣取地上的物品，那些物品自动放到背包。你按下I键可以确认背包的内容。");
        } else if (sel == 12) {
            cm.sendNext("你想装备道具吗？先打开背包(I)，然后点击装备栏，双击装备栏一个道具。那么你就可以装备该道具。但你要注意的是大多装备道具有职业，等级，能力等限制。所以你先确认道具的装备条件后再使用道具吧。而且你打开装备窗(E)单击道具后直接把该道具移动到你想装备的地方。");
        } else if (sel == 13) {
            cm.sendNext("你想确认现在装备的道具吗？按下E键你可以打开装备窗。在那里你就可以确认你的装备。在装备窗双击道具的话，道具就被回到背包(I)。");
        } else if (sel == 14) {
            cm.sendNext("The special 'abilities' you get after acquiring a job are called skills. You'll acquire skills that are specifically for that job. You're not at that stage yet, so you don't have any skills yet, but just remember that to check on your skills, press #bK#k to open the skill book. It'll help you down the road.");
        } else if (sel == 15) {
            cm.sendNext("怎么去金银岛？在这个岛的南部有一个叫#m60000#的港口，在那里有很大的飞船，在船前你会遇到那艘船的船长。问他就知道了。");
        } else if (sel == 16) {
            cm.sendNext("金币是冒险岛的货币。用金币你可以购买各种道具。打猎怪物或在商店卖道具或完成任务后你就可以获得金币。");
        }
    } else if (status == 1) {
        if (sel == 0) {
            cm.sendNextPrev("为了打退怪物，你应该装备武器。按#b I键#k打开背包，单击#b 装备#k然后双击你想装备的武器即可。武器装备好后按#b Ctrl键#k，就可以使用武器。只要你掌握了窍门，就可以更容易地打退怪物。\r\n\r\n#fUI/DialogImage.img/Help/1#");
        } else if (sel == 1) {
            cm.sendNextPrev("转职后你可以学习更多的专业技能，你可以设定快捷键，让这些技能使用起来更容易。攻击技能也不用按Ctrl键，只用快捷键就可以发出。");
        } else if (sel == 2) {
            cm.sendNextPrev("但是如果你的背包满了，就不能再拣取物品。所以应该把不需要的物品卖到商店里去。背包的容量在转职后会增加。");
        } else if (sel == 3) {
            cm.sendNextPrev("新手被打死，是没有任何损失的。可是对有职业的人来说影响就大了，因为他们死后就丢失部分经验值。要保重啊");
        } else if (sel == 4) {
            cm.sendNextPrev("等级并不是决定地位的唯一的事情，虽然。还需要提高了的基础上，占用一个特定能力的水平。例如，要成为一个战士，你的STR已超过35，等等，你知道我在说什么？请确保您提高了有直接的影响到你的工作能力.");
        } else if (sel == 5) {
            cm.sendNextPrev("但是如果你想变得更强大，就要离开这里。在这里你不可能学到职业技能。这个岛下面有更大的岛，叫做金银岛。那里地域广阔，这里没法跟它比。");
        } else if (sel == 8) {
            cm.sendNextPrev("啊，魔法师跟别的职业不同，是在8级转职。虽然魔法师会早点转职，但要做的努力也比别的职业大。你好好选择职业吧。");
        } else if (sel == 10) {
            cm.sendNextPrev("广场上各种能力的顶级鼠标光标的简要说明。例如，STR是战士，DEX的弓箭手，int对于魔术师和LUK窃贼。这本身是不是你需要知道的一切，所以你会通过分配点需要长期艰苦想就怎么来强调你的性格的长处.");
        } else if (sel == 15) {
            cm.sendNextPrev("啊！我还要告诉你一件事。如果你不知道现在在哪儿，就按#bw键#k。会出现大地图，你可以确认你的位置，不必担心迷路。按#bEsc键或者#k再次按#bw键#k，大地图就会关闭。");
        } else {
            start();
        }
    } else {
        start();
    }
}