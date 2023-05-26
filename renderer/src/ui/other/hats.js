import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";
import { fetchFeatures } from "./utils/fetches.js";

async function fetchHatOfUser(userId) {
  let hat = (await fetchFeatures(userId)).find(i => i.type === "hat");
  if (!hat) return null;
  let req = await fetch(`https://api.acord.app/feature/hat/${hat.feature_id}`);
  return (await req.json()).data;
}

dom.patch(
  '.avatarWrapper-24Rbpj, .avatar-2EVtgZ, .userAvatar-3Hwf1F, .wrapper-3Un6-K, .message-2CShn3.groupStart-3Mlgv1:not(.systemMessage-1H1Z20) .contents-2MsGLg',
  async (elm) => {
    let userId;
    let src = utils.react.getProps(elm, i => i?.src, 1000)?.src;
    if (src) {
      let splitted = src.split('/');
      userId = splitted[3] === 'guilds' ? splitted[6] : splitted[4];
    };
    if (!userId) userId = utils.react.getProps(elm, i => i?.participant?.id, 1000)?.participant?.id;
    if (!userId) userId = utils.react.getProps(elm, i => i?.user?.id, 1000)?.user?.id;
    if (!userId) userId = utils.react.getProps(elm, i => i?.message?.author?.id, 1000)?.message?.author?.id;

    if (!userId) return;
    let hat = await fetchHatOfUser(userId);
    if (!hat) return;
    elm.style.setProperty('--hat-image', `url('${hat.image}')`);
  }
);