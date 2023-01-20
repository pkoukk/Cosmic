/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2019 RonanLana

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

/*
   @Author: Arthur L - Refactored command content into modules
*/
package client.command.commands.gm0;

import client.Client;
import client.command.Command;
import constants.id.NpcId;
import server.ItemInformationProvider;
import server.gachapon.Gachapon;

public class GachaCommand extends Command {
    {
        setDescription("展示扭蛋机奖励.");
    }

    @Override
    public void execute(Client c, String[] params) {
        Gachapon.GachaponType gacha = null;
        String search = c.getPlayer().getLastCommandMessage();
        String gachaName = "";
        String[] names = { "射手村", "魔法密林", "勇士部落", "废气都市", "林中之城", "古代神社", "昭和男澡堂", "昭和女澡堂",
                "新叶市", "诺特勒斯号码头" };
        int[] ids = { NpcId.GACHAPON_HENESYS, NpcId.GACHAPON_ELLINIA, NpcId.GACHAPON_PERION, NpcId.GACHAPON_KERNING,
                NpcId.GACHAPON_SLEEPYWOOD, NpcId.GACHAPON_MUSHROOM_SHRINE, NpcId.GACHAPON_SHOWA_MALE,
                NpcId.GACHAPON_SHOWA_FEMALE, NpcId.GACHAPON_NLC, NpcId.GACHAPON_NAUTILUS };
        for (int i = 0; i < names.length; i++) {
            if (search.equalsIgnoreCase(names[i])) {
                gachaName = names[i];
                gacha = Gachapon.GachaponType.getByNpcId(ids[i]);
            }
        }
        if (gacha == null) {
            c.getPlayer().yellowMessage("使用@gacha <地图名> 查看以下地区的奖励:");
            for (String name : names) {
                c.getPlayer().yellowMessage(name);
            }
            return;
        }
        String talkStr = " #b" + gachaName + "#k 扭蛋机包含以下物品.\r\n\r\n";
        for (int i = 0; i < 2; i++) {
            for (int id : gacha.getItems(i)) {
                talkStr += "-" + ItemInformationProvider.getInstance().getName(id) + "\r\n";
            }
        }
        talkStr += "\r\n注意：这里只列出特有物品，所有扭蛋机都会出的通用物品这里不会列出.";

        c.getAbstractPlayerInteraction().npcTalk(NpcId.MAPLE_ADMINISTRATOR, talkStr);
    }
}
