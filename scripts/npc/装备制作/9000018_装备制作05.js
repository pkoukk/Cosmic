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
            text += "#e#r你好！在我这里可以帮你制作你所需要的武器，以下是我可以为您制作的武器列表.\r\n\r\n"//3
            text += "#L1##e#d#v1402251#埃苏莱布斯剑制作#l\r\n"//3
            text += "#L2##e#d#v1432214#埃苏莱布斯枪制作#l\r\n"//3
            text += "#L3##e#d#v1442268#埃苏莱布斯矛制作#l\r\n"//3
            text += "#L4##e#d#v1412177#埃苏莱布斯斧制作#l\r\n"//3
            text += "#L5##e#d#v1382259#埃苏莱布斯杖制作#l\r\n"//3
            text += "#L6##e#d#v1452252#埃苏莱布斯弓制作#l\r\n"//3
            text += "#L7##e#d#v1462239#埃苏莱布斯弩制作#l\r\n"//3
            text += "#L8##e#d#v1472261#埃苏莱布斯拳套制作#l\r\n"//3
            text += "#L9##e#d#v1482216#埃苏莱布斯指节制作#l\r\n"//3
            text += "#L10##e#d#v1492231##l\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
		cm.openNpc("9000018", "埃苏莱布斯双手剑","_");
        } else if (selection == 2) {
		cm.openNpc("9000018", "埃苏莱布斯枪","_");
        } else if (selection == 3) {
		cm.openNpc("9000018", "埃苏莱布斯矛","_");
        } else if (selection == 4) {
		cm.openNpc("9000018", "埃苏莱布斯斧","_");
        } else if (selection == 5) {
		cm.openNpc("9000018", "埃苏莱布斯杖","_");
        } else if (selection == 6) {
		cm.openNpc("9000018", "埃苏莱布斯弓","_");
        } else if (selection == 7) {
		cm.openNpc("9000018", "埃苏莱布斯弩","_");
        } else if (selection == 8) {
		cm.openNpc("9000018", "埃苏莱布斯拳套","_");
        } else if (selection == 9) {
		cm.openNpc("9000018", "埃苏莱布斯指节","_");
	}
    }
}


