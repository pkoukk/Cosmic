var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var storage;

var storages = ["储存", "取出"];
var mineralIds = [4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007];
var jewelIds = [4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008];
var crystalIds = [4004000, 4004001, 4004002, 4004003, 4004004];

function start() {
    status = -1;
    storage = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0 && status == 0) {
        cm.sendNext("如果你不着急的话，请稍后再来。");
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
        cm.sendYesNo("我可以帮你随时存取制作材料。你现在想试一下吗？");

    }
    if (status == 1 && mode == 1) {
        cm.sendSimple("我可以帮你随时存取制作材料。#b\r\n#L0#储存#l\r\n#L1#取出#l#k");
    }
    if (status == 2 && mode == 1) {
        if (selection == 0) {
            storage = 0;
        } else if (selection == 1) {
            storage = 1;
        } else {
            cm.sendSimple("再见");
            cm.dispose();
        }

        var selStr = "你想让我帮你" + storages[storage] + "什么种类矿石? #b";
        var options = [storages[storage] + "金属矿石", storages[storage] + "珠宝", storages[storage] + "水晶", "全部" + storages[storage]];
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 3 && mode == 1) {
        selectedType = selection;

        if (selectedType == 0) { //mineral 
            var selStr = "要" + storages[storage] + "什么矿石?#b";
            var minerals = ["#z4010000#", "#z4010001#", "#z4010002#", "#z4010003#", "#z4010004#", "#z4010005#", "#z4010006#", "#z4010007#"];
            for (var i = 0; i < minerals.length; i++) {
                selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 1) { //jewel 
            var selStr = "要" + storages[storage] + "什么宝石?#b";
            var jewels = ["#z4020000#", "#z4020001#", "#z4020002#", "#z4020003#", "#z4020004#", "#z4020005#", "#z4020006#", "#z4020007#", "#z4020008#"];
            for (var i = 0; i < jewels.length; i++) {
                selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 2) { //Crystal 
            var selStr = "想要" + storages[storage] + "什么水晶? #b";
            var crystals = ["#z4004000#", "#z4004001#", "#z4004002#", "#z4004003#", "#z4004004#"];
            for (var i = 0; i < crystals.length; i++) {
                selStr += "\r\n#L" + i + "# " + crystals[i] + "#l";
            }
            cm.sendSimple(selStr);
            equip = false;
        } else if (selectedType == 3) { // all
            if (storage == 0) {
                cm.carryStorageSaveItems(mineralIds);
                cm.carryStorageSaveItems(jewelIds);
                cm.carryStorageSaveItems(crystalIds);
                cm.sendOk(storages[storage] + "完成");
            } else if (storage == 1) {
                cm.sendOk("全部取出功能还没做");
            }

            cm.dispose();
        }
    } else if (status == 4 && mode == 1) {
        selectedItem = selection;

        if (selectedType == 0) { //mineral refine
            item = mineralIds[selectedItem];
        } else if (selectedType == 1) { //jewel refine
            item = jewelIds[selectedItem];
        } else if (selectedType == 2) { //Crystal refine
            item = crystalIds[selectedItem];
        }

        var prompt = "那么,你是想" + storages[storage] + "#t" + item + "#?";
        cm.sendYesNo(prompt)
    } else if (status == 5 && mode == 1) {
        if (storage == 0) {
            cm.carryStorageSaveItems([item])
        } else if (storage == 1) {
            if (!cm.canHold(item)) {
                cm.sendOk("我想你背包放不下更多这种东西了.");
            } else {
                cm.carryStorageTakeoutItem(item)
            }
        }

        cm.sendOk(storages[storage] + "完成")
        cm.dispose()
    }

}
