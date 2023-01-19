/**
 -- Version Info -----------------------------------------------------------------------------------
 1.0 - First Version by Drago (MapleStorySA)
 2.0 - Second Version by Ronan (HeavenMS)
 3.0 - Third Version by Jayd - translated CPQ contents to English and added Pirate items
 Special thanks to 頼晏 (ryantpayton) for also stepping in to translate CPQ scripts.
 ---------------------------------------------------------------------------------------------------
 **/

var status = 0;
var rnk = -1;
var n1 = 50; //???
var n2 = 40; //??? ???
var n3 = 7; //35
var n4 = 10; //40
var n5 = 20; //50

var cpqMap = 980000000;
var cpqMinLvl = 30;
var cpqMaxLvl = 50;
var cpqMinAmt = 2;
var cpqMaxAmt = 6;

// Ronan's custom ore refiner NPC
var refineRocks = true;     // enables moon rock, star rock
var refineCrystals = true;  // enables common crystals
var refineSpecials = true;  // enables lithium, special crystals
var feeMultiplier = 7.0;

function start() {
    status = -1;

    const YamlConfig = Java.type('config.YamlConfig');
    if (!YamlConfig.config.server.USE_CPQ) {
        if (YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
            status = 0;
            action(1, 0, 4);
        } else {
            cm.sendOk("怪物嘉年华目前不可用");
            cm.dispose();
        }

        return;
    }

    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        const YamlConfig = Java.type('config.YamlConfig');
        if (cm.getPlayer().getMapId() == 980000010) {
            if (status == 0) {
                cm.sendNext("希望你玩的开心!");
            } else if (status > 0) {
                cm.warp(980000000, 0);
                cm.dispose();
            }
        } else if (cm.getChar().getMap().isCPQLoserMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shiu = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shiu += "#rA#k";
                        cm.sendOk("不巧,尽管你很努力,但还是没有赢.\r\n\r\n#b你的成绩: " + shiu);
                        rnk = 10;
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shiu += "#rB#k";
                        rnk = 20;
                        cm.sendOk("不巧, 尽管你很努力,但还是没有赢! \r\n\r\n#b你的成绩: " + shiu);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shiu += "#rC#k";
                        rnk = 30;
                        cm.sendOk("不巧, 尽管你很努力,但还是没有赢! \r\n\r\n#b你的成绩: " + shiu);
                    } else {
                        shiu += "#rD#k";
                        rnk = 40;
                        cm.sendOk("不巧, 尽管你很努力,但还是没有赢! \r\n\r\n#b你的成绩: " + shiu);
                    }
                } else {
                    cm.warp(980000000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 10:
                        cm.warp(980000000, 0);
                        cm.gainExp(17500);
                        cm.dispose();
                        break;
                    case 20:
                        cm.warp(980000000, 0);
                        cm.gainExp(1200);
                        cm.dispose();
                        break;
                    case 30:
                        cm.warp(980000000, 0);
                        cm.gainExp(5000);
                        cm.dispose();
                        break;
                    case 40:
                        cm.warp(980000000, 0);
                        cm.gainExp(2500);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980000000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getChar().getMap().isCPQWinnerMap()) {
            if (status == 0) {
                if (cm.getChar().getParty() != null) {
                    var shi = "";
                    if (cm.getPlayer().getFestivalPoints() >= 300) {
                        shi += "#rA#k";
                        rnk = 1;
                        cm.sendOk("恭喜你,你赢了! \r\n\r\n#b你的成绩: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 100) {
                        shi += "#rB#k";
                        rnk = 2;
                        cm.sendOk("恭喜你,你赢了! \r\n\r\n#b你的成绩: " + shi);
                    } else if (cm.getPlayer().getFestivalPoints() >= 50) {
                        shi += "#rC#k";
                        rnk = 3;
                        cm.sendOk("恭喜你,你赢了! \r\n\r\n#b你的成绩: " + shi);
                    } else {
                        shi += "#rD#k";
                        rnk = 4;
                        cm.sendOk("恭喜你,你赢了! \r\n\r\n#b你的成绩: " + shi);
                    }
                } else {
                    cm.warp(980000000, 0);
                    cm.dispose();
                }
            } else if (status == 1) {
                switch (rnk) {
                    case 1:
                        cm.warp(980000000, 0);
                        cm.gainExp(50000);
                        cm.dispose();
                        break;
                    case 2:
                        cm.warp(980000000, 0);
                        cm.gainExp(25500);
                        cm.dispose();
                        break;
                    case 3:
                        cm.warp(980000000, 0);
                        cm.gainExp(21000);
                        cm.dispose();
                        break;
                    case 4:
                        cm.warp(980000000, 0);
                        cm.gainExp(19505);
                        cm.dispose();
                        break;
                    default:
                        cm.warp(980000000, 0);
                        cm.dispose();
                        break;
                }
            }
        } else if (cm.getMapId() == cpqMap) {   // only CPQ1
            if (status == 0) {
                if (cm.getParty() == null) {
                    status = 10;
                    cm.sendOk("你需要创建一个队伍才可以加入战斗!");
                } else if (!cm.isLeader()) {
                    status = 10;
                    cm.sendOk("如果你想开始战斗,让队长来.");
                } else {
                    var party = cm.getParty().getMembers();
                    var inMap = cm.partyMembersInMap();
                    var lvlOk = 0;
                    var isOutMap = 0;
                    for (var i = 0; i < party.size(); i++) {
                        if (party.get(i).getLevel() >= cpqMinLvl && party.get(i).getLevel() <= cpqMaxLvl) {
                            lvlOk++;

                            if (party.get(i).getPlayer().getMapId() != cpqMap) {
                                isOutMap++;
                            }
                        }
                    }

                    if (party >= 1) {
                        status = 10;
                        cm.sendOk("你的队伍人数不够.队伍里面需要有#b" + cpqMinAmt + "#k - #r" + cpqMaxAmt + "#k人,并且都在这个地图.");
                    } else if (lvlOk != inMap) {
                        status = 10;
                        cm.sendOk("确定对屋里的人等级在" + cpqMinLvl + "~" + cpqMaxLvl + "之间!");
                    } else if (isOutMap > 0) {
                        status = 10;
                        cm.sendOk("有的队员不在这里!");
                    } else {
                        if (!cm.sendCPQMapLists()) {
                            cm.sendOk("所有怪物嘉年华对战地图现在都在被使用了,请待会儿再来.");
                            cm.dispose();
                        }
                    }
                }
            } else if (status == 1) {
                if (cm.fieldTaken(selection)) {
                    if (cm.fieldLobbied(selection)) {
                        cm.challengeParty(selection);
                        cm.dispose();
                    } else {
                        cm.sendOk("房间人满了.");
                        cm.dispose();
                    }
                } else {
                    var party = cm.getParty().getMembers();
                    if ((selection >= 0 && selection <= 3) && party.size() < (YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 2)) {
                        cm.sendOk("你至少需要两名玩家参加战斗!");
                    } else if ((selection >= 4 && selection <= 5) && party.size() < (YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS ? 1 : 3)) {
                        cm.sendOk("你至少需要3名玩家参加战斗!");
                    } else {
                        cm.cpqLobby(selection);
                    }
                    cm.dispose();
                }
            } else if (status == 11) {
                cm.dispose();
            }
        } else {
            if (status == 0) {
                var talk = "你要做什么?如果你还没有参加过怪物嘉年华,你最好听我说一下规则! \r\n#b#L0#参加怪物嘉年华1.#l \r\n#L3#参加怪物嘉年华2.#l \r\n#L1#说下怪物嘉年华的规则.#l\r\n#L2#我要用#z4001129#和你交易.#l";
                if (YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
                    talk += "\r\n#L4# ... 我能提炼矿石吗?#l";
                }
                cm.sendSimple(talk);
            } else if (status == 1) {
                if (selection == 0) {
                    if ((cm.getLevel() > 29 && cm.getLevel() < 51) || cm.getPlayer().isGM()) {
                        cm.getChar().saveLocation("MONSTER_CARNIVAL");
                        cm.warp(980000000, 0);
                        cm.dispose();

                    } else if (cm.getLevel() < 30) {
                        cm.sendOk("你至少需要30级才可以参加怪物嘉年华.");
                        cm.dispose();

                    } else {
                        cm.sendOk("抱歉,但是怪物嘉年华只允许30~50级的玩家参与.");
                        cm.dispose();

                    }
                } else if (selection == 1) {
                    status = 60;
                    cm.sendSimple("你想做什么?\r\n#b#L0#什么是怪物嘉年华?#l\r\n#L1# 怪物嘉年华是做什么的.#l\r\n#L2# 有什么要注意的.#l\r\n#L3#没什么.#l");
                } else if (selection == 2) {
                    cm.sendSimple("记住,如果你有#z4001129#,你可以用它来交换道具.看看你想要换什么! \r\n#b#L0# #z1122007# (" + n1 + "个#z4001129#)#l\r\n#L1# #z2041211# (" + n2 + "个#z4001129#)#l\r\n#L2#战士武器#l\r\n#L3#法师武器#l\r\n#L4# 弓箭手武器#l\r\n#L5#飞侠武器#l\r\n#L6#海盗武器#l");
                } else if (selection == 3) {
                    cm.getChar().saveLocation("MONSTER_CARNIVAL");
                    cm.warp(980030000, 0);
                    cm.dispose();

                } else if (selection == 4) {
                    var selStr = "好的, 我会为你提供精细的#b矿石冶炼#k服务,这会比#k普通的冶炼贵#r" + ((feeMultiplier * 100) | 0) + "%.你想做什么?#b";

                    var options = ["冶炼矿石", "冶炼宝石"];
                    if (refineCrystals) {
                        options.push("冶炼水晶");
                    }
                    if (refineRocks) {
                        options.push("Refine plates/jewels");
                    }

                    for (var i = 0; i < options.length; i++) {
                        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
                    }

                    cm.sendSimple(selStr);

                    status = 76;
                }
            } else if (status == 2) {
                select = selection;
                if (select == 0) {
                    if (cm.haveItem(4001129, n1) && cm.canHold(4001129)) {
                        cm.gainItem(1122007, 1);
                        cm.gainItem(4001129, -n1);
                        cm.dispose();
                    } else {
                        cm.sendOk("你缺少#b#z4001129##k或者拿不下更多装备了.");
                        cm.dispose();
                    }
                } else if (select == 1) {
                    if (cm.haveItem(4001129, n2) && cm.canHold(2041211)) {
                        cm.gainItem(2041211, 1);
                        cm.gainItem(4001129, -n2);
                        cm.dispose();
                    } else {
                        cm.sendOk("缺少#b#z4001129##k或者拿不下更多装备了.");
                        cm.dispose();
                    }
                } else if (select == 2) {//S2 Warrior 26 S3 Magician 6 S4 Bowman 6 S5 Thief 8
                    status = 10;
                    cm.sendSimple("请确定你有足够多的#z4001129#来交换你想要的武器.选择你要的武器.\r\n#b#L0# #z1302004# (" + n3 + "个#z4001129#)#l\r\n#L1# #z1402006# (" + n3 + "个#z4001129#)#l\r\n#L2# #z1302009# (" + n4 + "个#z4001129#)#l\r\n#L3# #z1402007# (" + n4 + "个#z4001129#)#l\r\n#L4# #z1302010# (" + n5 + "个#z4001129#)#l\r\n#L5# #z1402003# (" + n5 + "个#z4001129#)#l\r\n#L6# #z1312006# (" + n3 + "个#z4001129#)#l\r\n#L7# #z1412004# (" + n3 + "个#z4001129#)#l\r\n#L8# #z1312007# (" + n4 + "个#z4001129#)#l\r\n#L9# #z1412005# (" + n4 + "个#z4001129#)#l\r\n#L10# #z1312008# (" + n5 + "个#z4001129#)#l\r\n#L11# #z1412003# (" + n5 + "个#z4001129#)#l\r\n#L12#下一页(1/2)#l");
                } else if (select == 3) {
                    status = 20;
                    cm.sendSimple("你想要交换哪种武器.\r\n#b#L0# #z1372001# (" + n3 + "个#z4001129#)#l\r\n#L1# #z1382018# (" + n3 + "个#z4001129#)#l\r\n#L2# #z1372012# (" + n4 + "个#z4001129#)#l\r\n#L3# #z1382019# (" + n4 + "个#z4001129#)#l\r\n#L4# #z1382001# (" + n5 + "个#z4001129#)#l\r\n#L5# #z1372007# (" + n5 + "个#z4001129#)#l");
                } else if (select == 4) {
                    status = 30;
                    cm.sendSimple("选择你想要的武器! \r\n#b#L0# #z1452006# (" + n3 + "个#z4001129#)#l\r\n#L1# #z1452007# (" + n4 + "个#z4001129#)#l\r\n#L2# #z1452008# (" + n5 + "个#z4001129#)#l\r\n#L3# #z1462005# (" + n3 + "个#z4001129#)#l\r\n#L4# #z1462006# (" + n4 + "个#z4001129#)#l\r\n#L5# #z1462007# (" + n5 + "个#z4001129#)#l");
                } else if (select == 5) {
                    status = 40;
                    cm.sendSimple("选择一个你想要的武器! \r\n#b#L0# #z1472013# (" + n3 + "个#z4001129#)#l\r\n#L1# #z1472017# (" + n4 + "个#z4001129#)#l\r\n#L2# #z1472021# (" + n5 + "个#z4001129#)#l\r\n#L3# #z1332014# (" + n3 + "个#z4001129#)#l\r\n#L4# #z1332031# (" + n4 + "个#z4001129#)#l\r\n#L5# #z1332011# (" + n4 + "个#z4001129#)#l\r\n#L6# #z1332016# (" + n5 + "个#z4001129#)#l\r\n#L7# #z1332003# (" + n5 + "个#z4001129#)#l");
                } else if (select == 6) {
                    status = 50; //pirate rewards
                    cm.sendSimple("选择想要的武器! \r\n#b#L0# #z1482005# (" + n3 + "个#z4001129#)#l \r\n#b#L1# #z1482006# (" + n4 + "个#z4001129#)#l \r\n#b#L2# #z1482007# (" + n5 + "个#z4001129#)#l \r\n#b#L3# #z1492005# (" + n3 + "个#z4001129#)#l \r\n#b#L4# #z1492006# (" + n4 + "个#z4001129#)#l \r\n#b#L5# #z1492007# (" + n5 + "个#z4001129#)#l");
                }
            } else if (status == 11) {
                if (selection == 12) {
                    cm.sendSimple("选择你想要的武器! \r\n#b#L0# #z1322015# (" + n3 + "个#z4001129#)#l\r\n#L1# #z1422008# (" + n3 + "个#z4001129#)#l\r\n#L2# #z1322016# (" + n4 + "个#z4001129#)#l\r\n#L3# #z1422007# (" + n4 + "个#z4001129#)#l\r\n#L4# #z1322017# (" + n5 + "个#z4001129#)#l\r\n#L5# #z1422005# (" + n5 + "个#z4001129#)#l\r\n#L6# #z1432003# (" + n3 + "个#z4001129#)#l\r\n#L7# #z1442003# (" + n3 + "个#z4001129#)#l\r\n#L8# #z1432005# (" + n4 + "个#z4001129#)#l\r\n#L9# #z1442009# (" + n4 + "个#z4001129#)#l\r\n#L10# #z1442005# (" + n5 + "个#z4001129#)#l\r\n#L11# #z1432004# (" + n5 + "个#z4001129#)#l\r\n#L12#上一页(2/2)#l");
                } else {
                    var item = [1302004, 1402006, 1302009, 1402007, 1302010, 1402003, 1312006, 1412004, 1312007, 1412005, 1312008, 1412003];
                    var cost = [n3, n3, n4, n4, n5, n5, n3, n3, n4, n4, n5];
                    if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                        cm.gainItem(item[selection], 1);
                        cm.gainItem(4001129, -cost[selection]);
                        cm.dispose();
                    } else {
                        cm.sendOk("你没有足够的#b#z4001129##k,或者你的背包满了.");
                        cm.dispose();
                    }
                }
            } else if (status == 12) {
                if (selection == 12) {
                    status = 10;
                    cm.sendSimple("请确定你有足够的#b#z4001129##k来交换你要的武器. 看看要什么吧! \r\n#b#L0# #z1302004# (" + n3 + "个#z4001129#)#l\r\n#L1# #z1402006# (" + n3 + "个#z4001129#)#l\r\n#L2# #z1302009# (" + n4 + "个#z4001129#)#l\r\n#L3# #z1402007# (" + n4 + "个#z4001129#)#l\r\n#L4# #z1302010# (" + n5 + "个#z4001129#)#l\r\n#L5# #z1402003# (" + n5 + "个#z4001129#)#l\r\n#L6# #z1312006# (" + n3 + "个#z4001129#)#l\r\n#L7# #z1412004# (" + n3 + "个#z4001129#)#l\r\n#L8# #z1312007# (" + n4 + "个#z4001129#)#l\r\n#L9# #z1412005# (" + n4 + "个#z4001129#)#l\r\n#L10# #z1312008# (" + n5 + "个#z4001129#)#l\r\n#L11# #z1412003# (" + n5 + "个#z4001129#)#l\r\n#L12#下一页(1/2)#l");
                } else {
                    var item = [1322015, 1422008, 1322016, 1422007, 1322017, 1422005, 1432003, 1442003, 1432005, 1442009, 1442005, 1432004];
                    var cost = [n3, n3, n4, n4, n5, n5, n3, n3, n4, n4, n5, n5];
                    if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                        cm.gainItem(item[selection], 1);
                        cm.gainItem(4001129, -cost[selection]);
                        cm.dispose();
                    } else {
                        cm.sendOk("你没有足够的#b#z4001129##k,或者背包空间不足");
                        cm.dispose();
                    }
                }
            } else if (status == 21) {
                var item = [1372001, 1382018, 1372012, 1382019, 1382001, 1372007];
                var cost = [n3, n3, n4, n4, n5, n5];
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#z4001129##k,或者背包空间不足.");
                    cm.dispose();
                }
            } else if (status == 31) {
                var item = [1452006, 1452007, 1452008, 1462005, 1462006, 1462007];
                var cost = [n3, n4, n5, n3, n4, n5];
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#z4001129##k,或者背包空间不足.");
                    cm.dispose();
                }
            } else if (status == 41) {
                var item = [1472013, 1472017, 1472021, 1332014, 1332031, 1332011, 1332016, 1332003];
                var cost = [n3, n4, n5, n3, n4, n4, n5, n5];
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#z4001129##k,或者背包空间不足.");
                    cm.dispose();
                }
            } else if (status == 51) {
                var item = [1482005, 1482006, 1482007, 1492005, 1492006, 1492007];
                var cost = [n3, n4, n5, n3, n4, n5];
                if (cm.haveItem(4001129, cost[selection]) && cm.canHold(item[selection])) {
                    cm.gainItem(item[selection], 1);
                    cm.gainItem(4001129, -cost[selection]);
                    cm.dispose();
                } else {
                    cm.sendOk("你没有足够的#b#z4001129##k,或者背包空间不足.");
                    cm.dispose();
                }
            } else if (status == 61) {
                select = selection;
                if (selection == 0) {
                    cm.sendNext("哈哈!我是#p2042000#,怪物嘉年华的主持人!");
                } else if (selection == 1) {
                    cm.sendNext("#b怪物嘉年华#k允许两个队伍在里面进行对抗赛.");
                } else if (selection == 2) {
                    cm.sendNext("当你进入嘉年华,怪物列表窗口会出现在你面前. 你要做的就是#b想用什么就点击OK按钮#k.是不是很简单?");
                } else {
                    cm.dispose();
                }
            } else if (status == 62) {
                if (select == 0) {
                    cm.sendNext("什么是怪物嘉年华？哈哈哈，试试就知道了。你需要对抗其他像你这样的冒险者#k");
                } else if (select == 1) {
                    cm.sendNext("当进入嘉年华后，你的任务是杀死对面队伍中的怪物获取点数，并使用这些点数扰乱对手，阻止他们击杀怪物#k.");
                } else if (select == 2) {
                    cm.sendNext("一旦您习惯了这些命令，请尝试使用#bTAB和F1~F12#k#bTAB在怪物召唤/技能/保护者#k之间切换，#bF1~F12使您可以直接访问其中一个窗口#k.");
                }
            } else if (status == 63) {
                if (select == 0) {
                    cm.sendNext("我知道你们用真武器互相厮杀太危险了，我不会建议这么野蛮的行为。这场战斗令人兴奋的点就在于和其它玩家进行对抗，这就是怪兽嘉年华的精髓。此外，您可以使用在怪物嘉年华期间赚取的枫叶币获得新物品和武器！ #k");
                } else if (select == 1) {
                    cm.sendNext("有三种方法可以干扰对手：#b召唤怪物、技能和保护者#k。如果您想了解更多有关详细说明的信息，我将给您更深入的说明！");
                } else if (select == 2) {
                    cm.sendNext("#b召唤#k 一个怪物攻击对方队伍. 使用点数在这召唤一个怪物，它就会攻击对手.");
                }
            } else if (status == 64) {
                if (select == 0) {
                    cm.sendNext("当然，没有那么简单。还有其他方法可以防止其他人扔下怪物，这取决于你如何做。你对这种友好的比赛感兴趣么？");
                    cm.dispose();
                } else if (select == 1) {
                    cm.sendNext("记住，留点数不是什么好主意。你用掉的每一点都会帮助你赢得比赛.");
                } else if (select == 2) {
                    cm.sendNext("#b技能#k 就是使用一些类似于 黑暗, 虚弱, 等等技能 来防止对手击杀你的怪物. 花不了多少点数，但是很值得.唯一的问题是持续时间不是很长，好好利用!");
                }
            } else if (status == 65) {
                if (select == 1) {
                    cm.sendNext("哦，你不用担心在嘉年华内死亡，在这里死亡不会丢失经验，这是别的地方都没有的体验!");
                    cm.dispose();
                } else if (select == 2) {
                    cm.sendNext("#b保护者#k本质上是一个可以使用的道具，它会大大提高你队伍召唤的怪物的能力。保护者会一直工作，直到它被对方摧毁，所以你应该先召唤几个怪物，然后再拿保护者");
                }
            } else if (status == 66) {
                cm.sendNext("最后，在怪物嘉年华期间，#b你不能使用随身携带的物品/恢复药剂#k与此同时，怪物们也不会掉落这些物品。当您#b拾取它们时，它们会立刻使用#k。所以什么决定使用他们是很重要的.");
                cm.dispose();
            } else if (status == 77) {
                var allDone;

                if (selection == 0) {
                    allDone = refineItems(0); // minerals
                } else if (selection == 1) {
                    allDone = refineItems(1); // jewels
                } else if (selection == 2 && refineCrystals) {
                    allDone = refineItems(2); // crystals
                } else if (selection == 2 && !refineCrystals || selection == 3) {
                    allDone = refineRockItems(); // moon/star rock
                }

                if (allDone) {
                    cm.sendOk("完成.感谢出席.");
                } else {
                    cm.sendOk("完成。请注意，有些物品无法合成，因为您的其他栏空间不足，或者没有足够的金币支付费用。");
                }
                cm.dispose();
            }
        }
    }
}

function getRefineFee(fee) {
    return ((feeMultiplier * fee) | 0);
}

function isRefineTarget(refineType, refineItemid) {
    if (refineType == 0) { //mineral refine
        return refineItemid >= 4010000 && refineItemid <= 4010007 && !(refineItemid == 4010007 && !refineSpecials);
    } else if (refineType == 1) { //jewel refine
        return refineItemid >= 4020000 && refineItemid <= 4020008 && !(refineItemid == 4020008 && !refineSpecials);
    } else if (refineType == 2) { //crystal refine
        return refineItemid >= 4004000 && refineItemid <= 4004004 && !(refineItemid == 4004004 && !refineSpecials);
    }

    return false;
}

function getRockRefineTarget(refineItemid) {
    if (refineItemid >= 4011000 && refineItemid <= 4011006) {
        return 0;
    } else if (refineItemid >= 4021000 && refineItemid <= 4021008) {
        return 1;
    }

    return -1;
}

function refineItems(refineType) {
    var allDone = true;

    var refineFees = [[300, 300, 300, 500, 500, 500, 800, 270], [500, 500, 500, 500, 500, 500, 500, 1000, 3000], [5000, 5000, 5000, 5000, 1000000]];
    var itemCount = {};

    const InventoryType = Java.type('client.inventory.InventoryType');
    var iter = cm.getPlayer().getInventory(InventoryType.ETC).iterator();
    while (iter.hasNext()) {
        var it = iter.next();
        var itemid = it.getItemId();

        if (isRefineTarget(refineType, itemid)) {
            var ic = itemCount[itemid];

            if (ic != undefined) {
                itemCount[itemid] += it.getQuantity();
            } else {
                itemCount[itemid] = it.getQuantity();
            }
        }
    }

    for (var key in itemCount) {
        var itemqty = itemCount[key];
        var itemid = parseInt(key);

        var refineQty = ((itemqty / 10) | 0);
        if (refineQty <= 0) {
            continue;
        }

        while (true) {
            itemqty = refineQty * 10;

            var fee = getRefineFee(refineFees[refineType][(itemid % 100) | 0] * refineQty);
            if (cm.canHold(itemid + 1000, refineQty, itemid, itemqty) && cm.getMeso() >= fee) {
                cm.gainMeso(-fee);
                cm.gainItem(itemid, -itemqty);
                cm.gainItem(itemid + (itemid != 4010007 ? 1000 : 1001), refineQty);

                break;
            } else if (refineQty <= 1) {
                allDone = false;
                break;
            } else {
                refineQty--;
            }
        }
    }

    return allDone;
}

function refineRockItems() {
    var allDone = true;
    var minItems = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    var minRocks = [2147483647, 2147483647];

    var rockItems = [4011007, 4021009];
    var rockFees = [10000, 15000];

    const InventoryType = Java.type('client.inventory.InventoryType');
    var iter = cm.getPlayer().getInventory(InventoryType.ETC).iterator();
    while (iter.hasNext()) {
        var it = iter.next();
        var itemid = it.getItemId();
        var rockRefine = getRockRefineTarget(itemid);
        if (rockRefine >= 0) {
            var rockItem = ((itemid % 100) | 0);
            var itemqty = it.getQuantity();

            minItems[rockRefine][rockItem] += itemqty;
        }
    }

    for (var i = 0; i < minRocks.length; i++) {
        for (var j = 0; j < minItems[i].length; j++) {
            if (minRocks[i] > minItems[i][j]) {
                minRocks[i] = minItems[i][j];
            }
        }
        if (minRocks[i] <= 0 || minRocks[i] == 2147483647) {
            continue;
        }

        var refineQty = minRocks[i];
        while (true) {
            var fee = getRefineFee(rockFees[i] * refineQty);
            if (cm.canHold(rockItems[i], refineQty) && cm.getMeso() >= fee) {
                cm.gainMeso(-fee);

                var j;
                if (i == 0) {
                    for (j = 4011000; j < 4011007; j++) {
                        cm.gainItem(j, -refineQty);
                    }
                    cm.gainItem(j, refineQty);
                } else {
                    for (j = 4021000; j < 4021009; j++) {
                        cm.gainItem(j, -refineQty);
                    }
                    cm.gainItem(j, refineQty);
                }

                break;
            } else if (refineQty <= 1) {
                allDone = false;
                break;
            } else {
                refineQty--;
            }
        }
    }

    return allDone;
}
