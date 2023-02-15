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
            text += "#e#d制作#v1442268#需要#v1422170#x1.#v4001083#x1.#v4001084#x1.#v4001085#x1.#v4251202#x15.#v4001129#x15.#v4031891#1亿.搜集好道具我就可以为您制作了.#l\r\n全属性+30.攻击150.伽耶汉武器为材料.合成后不计算加卷数量.\r\n"//3
            text += "#L1##r制作埃苏莱布斯武器#l\r\n\r\n"//3
            cm.sendSimple(text);
        } else if (selection == 1) {
			//1
			//2
			//3
			//4
			//5
			/*if(!cm.beibao(1,3)){
            cm.sendOk("装备栏空余不足3个空格！");
            cm.dispose();
			}else if(!cm.beibao(2,2)){
            cm.sendOk("消耗栏空余不足2个空格！");
            cm.dispose();
			}else if(!cm.beibao(3,1)){
            cm.sendOk("设置栏空余不足1个空格！");
            cm.dispose();
			}else if(!cm.beibao(4,1)){
            cm.sendOk("其他栏空余不足1个空格！");
            cm.dispose();
			}else if(!cm.beibao(5,1)){
            cm.sendOk("现金栏空余不足1个空格！");
            cm.dispose();
			}else */if(cm.haveItem(1422170,1) && cm.haveItem(4001083,1) && cm.haveItem(4001084,1) && cm.haveItem(4001085,1) && cm.haveItem(4251202,15) && cm.haveItem(4001129,15) && cm.getMeso() > 100000000){
				cm.gainItem(1422170, -1);
				cm.gainItem(4001084, -1);
				cm.gainItem(4001085, -1);
				cm.gainItem(4001083, -1);
				cm.gainItem(4251202, -15);
				cm.gainItem(4001129, -15);
				cm.gainItem(1442268,30,30,30,30,0,0,185,0,0,0,150,150,0,0);
				cm.gainMeso(-10000000);
            cm.sendOk("制作成功！");
			cm.worldMessage(6,"玩家：["+cm.getName()+"]制作了[埃苏莱布斯矛]，神器降临！可喜可贺！");
            cm.dispose();
			}else{
            cm.sendOk("您的材料不足！");
            cm.dispose();
			}
		}
    }
}


