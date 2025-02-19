var status = 0;
var imaps = [104000000, 102000000, 101000000, 100000000, 103000000, 120000000, 105040300];
var maps = [102000000, 100000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var townText = [["你所在的城市是明珠港!好的，我会给你详细介绍 #b明珠港#k. 它是你乘坐维多利亚号在金银岛上登陆的地方。这是明珠港。许多刚从彩虹岛来到这里的初学者都是从这里开始他们的旅程。", "这是一个安静的小镇，因为港口位于岛的西端，所以它的背后有广阔的水域。这里的大多数人都是渔夫，虽然他们可能看起来很吓人，但如果你和他们攀谈，他们会对你很友好。", "城镇周围有一片美丽的草原。那里的大多数怪物都很小，很温和，非常适合初学者。如果你还没有转职，这是一个升级的好地方."], ["好的，我会给你详细介绍 #b勇士部落#k. 这是一个坐落在金银岛最北端，被落基山脉环绕的勇士之城。在不友好的气氛中，只有强者才能生存。", "在高地周围，你会发现一棵很瘦的树，一只野猪在周围跑来跑去，岛上到处都是猴子。还有一个很深的山谷，当你深入其中，你会发现一条巨大的龙，它的力量与他的体型相当。最好小心地进去，否则就根本不进去.", "如果你想成为 #b战士#k 然后找到 #r武术教练#k, 佩里翁的首领. 如果你 等级 10 级或更高等级, 并且具有足够的力量，他可能会让你成为一个战士。如果没有，最好继续训练，直到你达到那个水平。"], ["好的，我会给你们解释更多 #b魔法密林#k. 它是一个神奇的小镇，位于金银岛的东部，被高大神秘的树木所覆盖。你也会在那里发现一些妖精。它们通常不喜欢人类，所以你最好站在它们这边，保持安静。", "在森林附近，你会发现绿色的青苔，蘑菇，猴子和僵尸猴子都住在那里。往森林深处走，你会发现女巫们带着飞天扫帚在天空中遨游。警告一句:除非你真的很强壮，否则我建议你不要靠近它们。", "如果你想成为 #b魔法师#k, 寻找 #r汉斯#k, 艾林尼亚的首席魔法师。如果你的等级在8级或以上，他可能会让你成为一个魔法师。如果不是这样，你可能需要更多的狩猎和训练自己。"], ["好的，我会给你们解释更多 #b射手村#k. 这是一个位于岛上最南端的鲍曼人小镇，建在一片平原上，周围是茂密的森林和大草原。那里的天气很好，镇上的东西很多，非常适合居住。去看看吧。", "在大草原周围，你会发现像蜗牛、蘑菇和猪这样的弱小怪物。不过，据我所知，在与小镇相连的铁皮猪公园的最深处，你会时不时地发现一种巨大而有力的蘑菇，叫做蘑菇王。", "如果你想成为 #b弓箭手#k, 你得去看看 #r雅典娜·皮尔斯#k 如果你的等级达到10级以上，她可能最终会让你成为弓箭手的一员。如果没有，那就去训练自己，让自己更强大，然后再试一次。"], ["好的，我会给你们解释更多 #b废弃都市#k. 这是一个飞侠小镇，位于金银岛的西北部，那里的建筑给人一种奇怪的感觉。它大部分被乌云覆盖，但如果你能爬到一个很高的地方，你就能看到非常美丽的日落。", "在废弃都市，你可以通过下水道管去到有鳄鱼和蛇出没的沼泽，或者去有鬼魂和蝙蝠出没的地铁。在地下最深处，你会发现蕾丝，她和龙一样大，一样危险。", "如果你想成为#b飞侠#k, 寻找 #r黑暗统治者#k, #废弃都市的黑暗之心。如果你的等级在10级或以上，他很可能让你成为飞侠。如果没有，去打猎，训练自己到达那里。"], ["这里还有一些信息 #b#m120000000##k. 这是一艘潜水艇，目前停泊在金银岛的埃利尼亚和海尼斯之间。那艘潜水艇是许多海盗的家。在那里你可以看到和明珠港一样美丽的海景。", "#m120000000# 就停在亨内西和埃利尼亚之间，所以如果你稍微走出去一点，你就能欣赏到两个城镇的景色。你在城里遇到的所有海盗都很合群，也很友好。", "如果你真的想要成为 #b海盗#k, 那你最好见见 #m120000000#, #r#p1090000##k. 如果你超过了10级和20敏捷，那么她可能会让你成为一个。如果你没有达到，那么你需要更努力地训练才能达到那个水平!"], ["好的，我会给你们解释更多 #b林中之城#k. 这是一个位于金银岛东南侧的森林小镇。就在亨利西斯和蚂蚁洞之间。那里有一家旅馆，你可以在温泉池里呆上一整天后休息一下。这是个安静的小镇。", "在酒店前面有一个老和尚的名字叫 #r陶老者#k. 没人知道那个和尚的事。显然他从旅行者那里收集材料并创造了一些东西，但我不太确定细节。如果你在那个地区有任何业务，请帮我查一下.", "从林中城往东走，你会发现蚂蚁隧道连接着金银岛最深的地方。许多肮脏的，强大的怪物无处不在，所以如果你走进去的时候以为这是在公园里散步，你出来的时候就会变成一具尸体。你需要充分准备好一段艰难的旅程才可以进去。", "这就是我听到的�显然，在格鲁伍德有一个秘密入口，可以把你带到一个未知的地方。显然，一旦你深入底部，你会发现一堆黑色的岩石在周围移动。我想在不久的将来亲眼看到��"]];
var selectedMap = -1;
var town = false;

function start() {
    cm.sendNext("你想去别的城镇吗?只要花点钱，我就能做到。有点贵，但我对初学者有九折优惠。");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if ((mode == 0 && !town) || mode == -1) {
            if (type == 1 && mode != -1) {
                cm.sendNext("这个小镇也有很多值得一看的东西。如果你想去别的地方，请告诉我。");
            }
            cm.dispose();
            return;
        } else {
            status -= 2;

            if (status < 1) {
                cm.dispose();
                return;
            }
        }

    }
    if (status == 1) {
        cm.sendSimple("如果这是你第一次来这里，你可能会对这个地方感到困惑，这是可以理解的。如果你对这个地方有任何问题，尽管提出来.\r\n#L0##b金银岛上有哪些城镇?#l\r\n#L1#请带我去别的地方。#k#l");
    } else if (status == 2) {
        if (selection == 0) {
            town = true;
            var text = "在金银岛上有7个大城镇。你想知道更多的是哪些?#b";
            for (var i = 0; i < imaps.length; i++) {
                text += "\r\n#L" + i + "##m" + imaps[i] + "##l";
            }
            cm.sendSimple(text);
        } else if (selection == 1) {
            var selStr = cm.getJobId() == 0 ? "所有的新手都有九折优惠。好的，你想去哪里?#b" : "你不是新手吧?那我恐怕得向您收取全价了。你想去哪儿?#b";
            for (var i = 0; i < maps.length; i++) {
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cost[i] / (cm.getJobId() == 0 ? 10 : 1)) + " 金币)#l";
            }
            cm.sendSimple(selStr);
        }
    } else if (town) {
        if (selectedMap == -1) {
            selectedMap = selection;
        }
        if (status == 3) {
            cm.sendNext(townText[selectedMap][status - 3]);
        } else {
            townText[selectedMap][status - 3] == undefined ? cm.dispose() : cm.sendNextPrev(townText[selectedMap][status - 3]);
        }
    } else if (status == 3) {
        selectedMap = selection;
        cm.sendYesNo("我想你在这里已经没事要处理了。你真的想去 #b#m" + maps[selection] + "##k吗? 你需要付出#b" + (cost[selection] / (cm.getJobId() == 0 ? 10 : 1)) + " 金币#k作为路费.你觉得怎么样?");
    } else if (status == 4) {
        if (cm.getMeso() < (cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1))) {
            cm.sendNext("你没有足够的金币。以你的能力，你应该拥有更多!");
        } else {
            cm.gainMeso(-(cost[selectedMap] / (cm.getJobId() == 0 ? 10 : 1)));
            cm.warp(maps[selectedMap]);
        }
        cm.dispose();
    }
}