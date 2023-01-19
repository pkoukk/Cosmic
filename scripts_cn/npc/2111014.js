/*
    This file is part of the HeavenMS MapleStory Server
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

var status;

function start() {
    if (cm.isQuestStarted(3311)) {
        cm.sendOk("德朗博士的的笔记.很多公式和浮夸的科学文献可以在书页中找到，但值得注意的是，在最后一篇文章（3周前）中，有人写道，他完成了对新赫罗里德蓝图改进的研究，从而为向社会展示它做了最后的准备。。。 后面没有内容了...", 2);
    }
    cm.dispose();
}