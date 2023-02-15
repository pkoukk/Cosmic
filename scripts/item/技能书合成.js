
//itemid:2430033
//卷轴碎片合成卷轴
var status;
var 战士 = Array(Array(2280012, 30), Array(2290000, 10), Array(2290001, 20), Array(2290002, 20), Array(2290003, 20), Array(2290004, 30), Array(2290005, 50), Array(2290006, 100), Array(2290007, 150));
var 英雄 = Array(Array(2280007, 100), Array(2290008, 150), Array(2290009, 200), Array(2290010, 100), Array(2290011, 150), Array(2290014, 15), Array(2290015, 20), Array(2290016, 100), Array(2290017, 150));
var 圣骑士 = Array(Array(2280008, 100), Array(2290012, 100), Array(2290013, 100), Array(2290018, 100), Array(2290019, 100), Array(2290020, 10), Array(2290020, 10));
var 黑骑士 = Array(Array(2290020, 100), Array(2290020, 150));
var 法师 = Array(Array(2280004, 20), Array(2290024, 20), Array(2290025, 20), Array(2290026, 40), Array(2290027, 50), Array(2290028, 40), Array(2290029, 60));
var 火毒 = Array(Array(2280000,10),Array(2290031, 30), Array(2290032, 60), Array(2290036, 30), Array(2290037, 60), Array(2290038, 20), Array(2290039, 30), Array(2290040, 50), Array(2290041, 100));
var 冰雷 = Array(Array(2290032, 60), Array(2290033, 80), Array(2290042, 30), Array(2290043, 30), Array(2290044, 20), Array(2290045, 30), Array(2290046, 50), Array(2290047, 100));
var 主教 = Array(Array(2280009, 10), Array(2290034, 40), Array(2290045, 80), Array(2290048, 50), Array(2290049, 100), Array(2290050, 15), Array(2290051, 20));
var 弓箭手 = Array(Array(2290052, 70), Array(2290053, 150), Array(2290054, 30), Array(2290055, 50));
var 神射手 = Array(Array(2290056, 80), Array(2290057, 120), Array(2290058, 20), Array(2290059, 50), Array(2290060, 80), Array(2290061, 150), Array(2290062, 20), Array(2290063, 30), Array(2290064, 30), Array(2290065, 50));
var 箭神 = Array(Array(2290066, 80), Array(2290067, 120), Array(2290068, 20), Array(2290069, 50), Array(2290070, 40), Array(2290071, 60), Array(2290072, 20), Array(2290073, 30), Array(2290074, 80), Array(2290075, 150));
var 飞侠 = Array(Array(2280006, 40), Array(2290076, 60), Array(2290077, 100), Array(2290078, 20), Array(2290079, 40), Array(2290080, 30), Array(2290081, 20), Array(2290082, 30), Array(2290083, 20));
var 隐士 = Array(Array(2280010, 200), Array(2290084, 150), Array(2290085, 150), Array(2290086, 20), Array(2290087, 40), Array(2290088, 40), Array(2290089, 50));
var 侠盗 = Array(Array(2280001,10),Array(2290090, 60), Array(2290091, 120), Array(2290092, 60), Array(2290093, 120), Array(2290094, 30), Array(2290095, 50));
var 冲锋队长 = Array(Array(2290097, 40), Array(2290098, 80), Array(2290099, 30), Array(2290100, 60), Array(2290101, 100), Array(2290102, 50), Array(2290103, 100), Array(2290104, 40), Array(2290105, 80), Array(2290106, 40), Array(2290107, 80), Array(2290108, 50), Array(2290109, 20), Array(2290110, 40));
var 船长 = Array(Array(2290112, 30), Array(2290113, 50), Array(2290114, 20), Array(2290115, 20), Array(2290116, 40), Array(2290117, 60), Array(2290118, 120), Array(2290119, 80), Array(2290120, 150), Array(2290121, 60), Array(2290122, 120), Array(2290123, 20), Array(2290124, 80));
var 战神 = Array(Array(2280013, 20), Array(2280014, 10), Array(2280015, 30), Array(2280016, 20), Array(2290126, 40), Array(2290127, 80), Array(2290128, 30), Array(2290129, 80), Array(2290130, 60), Array(2290131, 120), Array(2290132, 60), Array(2290133, 100), Array(2290134, 20), Array(2290135, 30), Array(2290136, 20), Array(2290137, 40), Array(2290138, 20), Array(2290139, 30));
function start() {
    status = -1;
    action(1, 0, 0);
}
var 技能列表 = Array();
function action(mode, type, selection) {
    if (mode == -1) {
        im.dispose();
    } else {
        if (mode == 0 && type > 0) {
            im.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            var text = "你好.需要合成什么技能书吗?\r\n";
            var job = im.getPlayer().getJob().getId();
            技能列表.push(Array(2280003,10));
            技能列表.push(Array(2280002,40));
            技能列表.push(Array(2290096,200));
            技能列表.push(Array(2290125,300));
            if (job == 112) {
                for(var i =0;i<战士.length;i++){
                    技能列表.push(战士[i]);
                }
                for(var i =0;i<英雄.length;i++){
                    技能列表.push(英雄[i]);
                }
            } else if (job == 122) {
                for(var i =0;i<战士.length;i++){
                    技能列表.push(战士[i]);
                }
                for(var i =0;i<圣骑士.length;i++){
                    技能列表.push(圣骑士[i]);
                }
            } else if (job == 132) {
                for(var i =0;i<战士.length;i++){
                    技能列表.push(战士[i]);
                }
                for(var i =0;i<黑骑士.length;i++){
                    技能列表.push(黑骑士[i]);
                }
            } else if (job == 212) {
                for(var i =0;i<法师.length;i++){
                    技能列表.push(法师[i]);
                }
                for(var i =0;i<火毒.length;i++){
                    技能列表.push(火毒[i]);
                }
            } else if (job == 222) {
                for(var i =0;i<法师.length;i++){
                    技能列表.push(法师[i]);
                }
                for(var i =0;i<冰雷.length;i++){
                    技能列表.push(冰雷[i]);
                }
            } else if (job == 232) {
                for(var i =0;i<法师.length;i++){
                    技能列表.push(法师[i]);
                }
                for(var i =0;i<主教.length;i++){
                    技能列表.push(主教[i]);
                }
            } else if (job == 312) {
                for(var i =0;i<弓箭手.length;i++){
                    技能列表.push(弓箭手[i]);
                }
                for(var i =0;i<神射手.length;i++){
                    技能列表.push(神射手[i]);
                }
            } else if (job == 322) {
                for(var i =0;i<弓箭手.length;i++){
                    技能列表.push(弓箭手[i]);
                }
                for(var i =0;i<箭神.length;i++){
                    技能列表.push(箭神[i]);
                }
            } else if (job == 412) {
                for(var i =0;i<飞侠.length;i++){
                    技能列表.push(飞侠[i]);
                }
                for(var i =0;i<隐士.length;i++){
                    技能列表.push(隐士[i]);
                }
            } else if (job == 422) {
                for(var i =0;i<飞侠.length;i++){
                    技能列表.push(飞侠[i]);
                }
                for(var i =0;i<侠盗.length;i++){
                    技能列表.push(侠盗[i]);
                }
            } else if (job == 512) {
                for(var i =0;i<冲锋队长.length;i++){
                    技能列表.push(冲锋队长[i]);
                }
            } else if (job == 522) {
                for(var i =0;i<船长.length;i++){
                    技能列表.push(船长[i]);
                }
            } else if (job == 2112) {
                for(var i =0;i<战神.length;i++){
                    技能列表.push(战神[i]);
                }
            } else{
              im.sendOk("只有四转冒险家和战神可以使用技能合成功能");
              im.dispose();
              return;
            }
            var feeCount = im.getPlayer().getItemQuantity(2430034,false);
            for(var i = 0;i<技能列表.length;i++){
                if(feeCount>=技能列表[i][1]){
                    text +="#b#L"+i+"##z"+技能列表[i][0]+"#,需要"+技能列表[i][1]+"个#z2430034##g(#e可合成#n)#l\r\n";
                }else{
                    text +="#b#L"+i+"##z"+技能列表[i][0]+"#,需要"+技能列表[i][1]+"个#z2430034##r(#e不可合成#n)#l\r\n";
                }
            }
            im.sendSimple(text);
        }else if(status == 1){
            var text = "确定要合成#i"+技能列表[selection][0]+"##z"+技能列表[selection][0]+"#?需要"+技能列表[selection][1]+"个#i2430034##z2430034#.";
            java.lang.System.out.println(技能列表[selection][0]+"");
            item = 技能列表[selection];
            java.lang.System.out.println(item[0]+"");
            im.sendYesNo(text);
        }else{
            var all = im.getPlayer().getItemQuantity(2430034,false);
            if(all>=item[1]){
                java.lang.System.out.println(item[0]+"");
                if(im.getPlayer().canHold(item[0],1)){
                    im.gainItem(item[0],1);
                    im.gainItem(2430034,-item[1]);
                    im.sendOk("合成成功");
                    status = -1;
                }else{
                    im.sendOk("背包空间不足或已经拥有了这本技能书,无法合成");
                    im.dispose();
                }
            }else{
                im.sendOk("材料不足,无法合成");
                im.dispose();
            }
        }
    }
}
var item ;