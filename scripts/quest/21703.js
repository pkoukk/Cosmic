var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0 && type > 0) {
        qm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        if (status == 6) {
            qm.sendNext("我知道要超越你的教练需要极大的力量和意志，但你并不是能让自己颓废。你必须朝着更大更好的方向前进！你必须尽你所能去拥抱你的英雄本性!");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("......现在你的能力是什么程度，我大概了解了......呵呵......没想到我这把老骨头还能有今天......真是感动得要流眼泪......不，是鼻涕......");
    } else if (status == 1) {
        qm.sendNextPrev("#b(......也没怎么修炼嘛......?)#k", 2);
    } else if (status == 2) {
        qm.sendNextPrev("好了，这是训练的第三个也是最后一个阶段。你的最后一个对手是...#r#o9300343#s#k！你了解 #o1210100#吗？");
    } else if (status == 3) {
        qm.sendNextPrev('Well, a little bit...', 2);
    } else if (status == 4) {
        qm.sendNextPrev("他们是天生的战士！从出生的那一刻起，对食物就充满了无穷的愤怒，凡是他们经过的地方都不会留下任何食物。很可怕吧?");
    } else if (status == 5) {
        qm.sendNextPrev("#b(他不是在开玩笑吧?)#k", 2);
    } else if (status == 6) {
        qm.sendAcceptDecline("来，快点#b再次进入修炼场#k，去和那些天生的战士们修炼用的猪中战斗吧，打倒#r30只#k后，你的能力将会有一个质的飞跃。全力以赴地去战斗吧！超越我这个教练！");
    } else if (status == 7) {
        qm.forceStartQuest();
        qm.sendOk("快走吧！去打倒那些#o9300343#!");
    } else if (status == 8) {
        qm.dispose();
    }
}

function end(mode, type, selection) {
    if (mode == -1 || mode == 0 && type > 0) {
        qm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        if (status == 2) {
            qm.sendNext("你不愿意离开你的教练吗？....嗅嗅....我很感动，但你不能停在这里。你注定会得到更大更好的东西!");
            qm.dispose();
            return;
        }
        status--;
    }
    if (status == 0) {
        qm.sendNext("这么快就打倒了30只#o9300343#......我果然没有看错。虽然你失去了曾经的记忆，失去了曾经的能力，但你仍然是个英雄！只要手上的战斧还在！");
    } else if (status == 1) {
        qm.sendNextPrev("#b（这么说是为了安慰我吗？）#k", 2);
    } else if (status == 2) {
        qm.sendYesNo("我已经没什么可继续教你的了。你已经超越了我。你可以离开这里了......唉，没什么好忧郁的。我能够有机会指导你，已经很满足了。");
    } else if (status == 3) {
        if (qm.isQuestStarted(21703)) {
            qm.forceCompleteQuest();
            qm.teachSkill(21000000, qm.getPlayer().getSkillLevel(21000000), 10, -1);   // Combo Ability Skill
            qm.gainExp(2800);
        }
        qm.sendNext("(我想起了技能#b连击能力#k！ 我还想在这训练有没有效果呢，没想到真的有效！)", 2);
    } else if (status == 4) {
        qm.sendPrev("现在你回去找#p1201000#吧。他看到你的进步会很高兴的！");
    } else if (status == 5) {
        qm.dispose();
    }
}