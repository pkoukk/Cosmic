function start() {
    status = -1;

    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
			//显示物品ID图片用的代码是  #v这里写入ID#
            text += "#e#r你好！我可以帮你制作至尊武器！\r\n"//3
            text += "#L1##e#d#v1382012#   枫叶武器制造(每个职业武器都可制作)#l\r\n"//3
            text += "#L2##e#d#v1372132#   死灵武器制造(每个职业武器都可制作)#l\r\n"//3
            text += "#L3##e#d#v1492023#   永恒武器制造(每个职业武器都可制作)#l\r\n"//3
            text += "#L4##e#d#v1402235#   伽耶武器制造(每个职业武器都可制作)#l\r\n"//3
            text += "#L5##e#d#v1472261#   埃苏武器制造(每个职业武器都可制作)#l\r\n"//3

            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc("9000018", "装备制作01","_");
        } else if (selection == 2) {
		cm.openNpc("9000018", "装备制作02","_");
        } else if (selection == 3) {
		cm.openNpc("9000018", "装备制作03","_");
        } else if (selection == 4) {
		cm.openNpc("9000018", "装备制作04","_");
        } else if (selection == 5) {
		cm.openNpc("9000018", "装备制作05","_");
        } else if (selection == 7) {
		cm.openNpc("9000018", "777","_");
        } else if (selection == 9) {
		cm.openNpc("9000018", "9112","_");
	}
    }
}


