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
package client.command.commands.gm1;

import client.Character;
import client.Client;
import client.command.Command;
import constants.id.NpcId;
import server.ItemInformationProvider;
import server.life.MonsterInformationProvider;
import tools.DatabaseConnection;
import tools.Pair;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Iterator;

public class WhoDropsCommand extends Command {
    {
        setDescription("查询物品掉落");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer();
        if (params.length < 1) {
            player.dropMessage(5, "@wd <物品名称>");
            return;
        }

        if (c.tryacquireClient()) {
            try {
                String searchString = player.getLastCommandMessage();
                String output = "";
                Iterator<Pair<Integer, String>> listIterator = ItemInformationProvider.getInstance()
                        .getItemDataByName(searchString).iterator();
                if (listIterator.hasNext()) {
                    int count = 1;
                    while (listIterator.hasNext() && count <= 3) {
                        Pair<Integer, String> data = listIterator.next();
                        output += "#b" + data.getRight() + "#k 可以由以下怪物掉落 :\r\n";
                        try (Connection con = DatabaseConnection.getConnection();
                                PreparedStatement ps = con.prepareStatement(
                                        "SELECT dropperid FROM drop_data WHERE itemid = ? LIMIT 50")) {
                            ps.setInt(1, data.getLeft());

                            try (ResultSet rs = ps.executeQuery()) {
                                while (rs.next()) {
                                    String resultName = MonsterInformationProvider.getInstance()
                                            .getMobNameFromId(rs.getInt("dropperid"));
                                    if (resultName != null) {
                                        output += resultName + ", ";
                                    }
                                }
                            }
                        } catch (Exception e) {
                            player.dropMessage(6, "读取数据失败，等会再试");
                            e.printStackTrace();
                            return;
                        }
                        output += "\r\n\r\n";
                        count++;
                    }
                } else {
                    player.dropMessage(5, "没有你要找的道具.");
                    return;
                }

                c.getAbstractPlayerInteraction().npcTalk(NpcId.MAPLE_ADMINISTRATOR, output);
            } finally {
                c.releaseClient();
            }
        } else {
            player.dropMessage(5, "处理中，等一会儿.");
        }
    }
}
