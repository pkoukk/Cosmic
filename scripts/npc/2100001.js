/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Muhammad
	Map(s): 		Ariant:The Town of Ariant(260000200)
	Description: 	Jewel Refiner
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0 && status == 0) {
        cm.sendNext("如果你不着急的话，请稍后再来。如你所见，现在有很多工作要做，我不可能按时交给你。");
        cm.dispose();
        return;
    }
    if (mode <= 0 && status >= 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
    }

    if (status == 0) {
        cm.sendYesNo("你是来炼制矿石还是珠宝？不管你有多少矿石，如果你没有像我这样的大师炼制，他们就看不到光明。你觉得呢，你现在想改进一下吗？");
    }
    if (status == 1 && mode == 1) {
        var selStr = "我喜欢你的态度!我们直接开始我们的事情吧.你想让我帮你锻造什么样的矿石? #b";
        var options = ["冶炼金属矿石", "冶炼珠宝", "冶炼水晶"];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 2 && mode == 1) {
        selectedType = selection;

        if (selectedType == 0) { //mineral refine
            var selStr = "要冶炼什么矿石?#b";
            var minerals = ["#z4011000#", "#z4011001#", "#z4011002#", "#z4011003#", "#z4011004#", "#z4011005#", "#z4011006#", "#z4011008#"];
            for (var i = 0; i < minerals.length; i++) {
                selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 1) { //jewel refine
            var selStr = "要制作什么宝石?#b";
            var jewels = ["#z4021000#", "#z4021001#", "#z4021002#", "#z4021003#", "#z4021004#", "#z4021005#", "#z4021006#", "#z4021007#", "#z4021008#"];
            for (var i = 0; i < jewels.length; i++) {
                selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 2) { //Crystal refine
            var selStr = "水晶? 那是贵重物品.别担心, 我一样能胜任.想要锻造什么水晶? #b";
            var crystals = ["#z4005000#", "#z4005001#", "#z4005002#", "#z4005003#"];
            for (var i = 0; i < crystals.length; i++) {
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        }
    } else if (status == 3 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0) { //mineral refine
            var itemSet = [4011000, 4011001, 4011002, 4011003, 4011004, 4011005, 4011006, 4011008];
            var matSet = [4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007];
            var matQtySet = [10, 10, 10, 10, 10, 10, 10, 10];
            var costSet = [270, 270, 270, 450, 450, 450, 720, 270];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 1) { //jewel refine
            var itemSet = [4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008];
            var matSet = [4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008];
            var matQtySet = [10, 10, 10, 10, 10, 10, 10, 10, 10];
            var costSet = [450, 450, 450, 450, 450, 450, 450, 900, 2700];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        } else if (selectedType == 2) { //Crystal refine
            var itemSet = [4005000, 4005001, 4005002, 4005003];
            var matSet = [4004000, 4004001, 4004002, 4004003];
            var matQtySet = [10, 10, 10, 10];
            var costSet = [4500, 4500, 4500, 4500];
            item = itemSet[selectedItem];
            mats = matSet[selectedItem];
            matQty = matQtySet[selectedItem];
            cost = costSet[selectedItem];
        }

        var prompt = "那么,你是想制作#t" + item + "#?要做多少呢?";
        cm.sendGetNumber(prompt, 1, 1, 100)
    } else if (status == 4 && mode == 1) {
        if (equip) {
            selectedItem = selection;
            qty = 1;
        } else {
            qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
        }

        var prompt = "你要我制作";
        if (qty == 1) {
            prompt += "一个 #t" + item + "#?";
        } else {
            prompt += qty + " #t" + item + "#?";
        }

        prompt += "给我提供这些材料,记得整理一下背包,确保有足够的空间存放你要的东西#b";

        if (mats instanceof Array) {
            for (var i = 0; i < mats.length; i++) {
                prompt += "\r\n#i" + mats[i] + "# " + matQty[i] * qty + " #t" + mats[i] + "#";
            }
        } else {
            prompt += "\r\n#i" + mats + "# " + matQty * qty + " #t" + mats + "#";
        }

        if (cost > 0) {
            prompt += "\r\n#i4031138# " + cost * qty + "金币";
        }

        cm.sendYesNo(prompt);
    } else if (status == 5 && mode == 1) {
        var complete = true;
        var recvItem = item, recvQty;

        if (item >= 2060000 && item <= 2060002) //bow arrows
        {
            recvQty = 1000 - (item - 2060000) * 100;
        } else if (item >= 2061000 && item <= 2061002) //xbow arrows
        {
            recvQty = 1000 - (item - 2061000) * 100;
        } else if (item == 4003000)//screws
        {
            recvQty = 15 * qty;
        } else {
            recvQty = qty;
        }

        if (!cm.canHold(recvItem, recvQty)) {
            cm.sendOk("我想你背包放不下更多这种东西了.");
        } else if (cm.getMeso() < cost * qty) {
            cm.sendOk("我想你的金币不够支付我的劳动.");
        } else {
            if (mats instanceof Array) {
                for (var i = 0; complete && i < mats.length; i++) {
                    if (matQty[i] * qty == 1) {
                        if (!cm.haveItem(mats[i])) {
                            complete = false;
                        }
                    } else {

                        if (cm.haveItem(mats[i], matQty[i] * qty)) {
                            complete = false;
                        }
                    }
                }
            } else {
                if (!cm.haveItem(mats, matQty * qty)) {
                    complete = false;
                }
            }

            if (!complete) {
                cm.sendOk("检查下其他栏是不是没有空间了.");
            } else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++) {
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }

                if (cost > 0) {
                    cm.gainMeso(-cost * qty);
                }

                cm.gainItem(recvItem, recvQty);
                cm.sendOk("做好了,给你. 你觉得怎么样,是不是充满艺术感? 好啦,如果你还有什么需要,你知道在哪里可以找到我.");
            }
        }

        cm.dispose();
    }
}