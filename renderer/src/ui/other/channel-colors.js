import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";
import { fetchGuildData } from "./utils/fetches.js";

dom.patch(
  '.content-1gYQeQ',
  async (elm) => {
    const channel = utils.react.getProps(elm, i => i?.channel)?.channel;
    if (!channel) return;
    const guildData = await fetchGuildData(channel.guild_id);
    if (!guildData) return;
    const data = guildData?.channel_colors?.[channel.id];
    if (!data) return;

    if (data.points.length === 1) {
      elm.style.backgroundColor = `${data.points[0].color}40`;
    } else {
      elm.style.backgroundImage = `${data.type}-gradient(${data.angle}, ${data.points.map(i => `${i.color}40${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")})`;
    }
  }
);


dom.patch('.title-17SveM', async (innerElm) => {
  let elm = dom.parents(innerElm, 3).pop();
  if (!elm) return;
  const channel = utils.react.getProps(elm, i => i?.channel)?.channel;
  if (!channel?.guild_id) return;
  const guildData = await fetchGuildData(channel.guild_id);
  if (!guildData) return;
  const data = guildData?.channel_colors?.[channel.id];
  if (!data) return;

  if (data.points.length === 1) {
    elm.style.backgroundColor = `${data.points[0].color}40`;
  } else {
    elm.style.backgroundImage = `${data.type}-gradient(${data.angle}, ${data.points.map(i => `${i.color}40${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")})`;
  }
});