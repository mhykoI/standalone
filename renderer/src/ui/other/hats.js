import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";
import fetchFeatures from "./utils/fetch-features.js";

async function fetchHatOfUser(userId) {
  let hat = (await fetchFeatures(userId)).find(i => i.type === "hat");
  if (!hat) return null;
  let req = await fetch(`https://api.acord.app/feature/hat/${hat.feature_id}`);
  return (await req.json()).data;
}

dom.patch(
  '.channel-1Shao0 .avatar-1HDIsL, .message-2CShn3.groupStart-3Mlgv1:not(.systemMessage-1H1Z20) .contents-2MsGLg, .topSection-1Khgkv .wrapper-3Un6-K.avatar-1YsFQ1, .userPopoutOuter-3AVBmJ .wrapper-3Un6-K, .member-48YF_l .wrapper-3Un6-K, .userPanelOuter-xc-WYi .wrapper-3Un6-K, .voiceUser-3nRK-K .userAvatar-3Hwf1F, .panels-3wFtMD .wrapper-3Un6-K, .callContainer-HtHELf .avatarWrapper-24Rbpj, .panels-3wFtMD .container-1zzFcN .avatar-2EVtgZ, .tileChild-2k7Wqh, .layout-1qmrhw .wrapper-3Un6-K, .mainChannelInfo-3I-_7Y .wrapper-3mYmFS.icon-kZI9Yh, .callContainer-HtHELf .wrapper-3mYmFS.clickable-3mbTtV, .userMenuItem-2pMhk- .wrapper-3Un6-K',
  async (elm) => {
    let userId;
    let src = utils.react.getProps(elm, i => i?.src, 1000)?.src;
    if (src) userId = src.split('/')?.[4];
    if (!userId) userId = utils.react.getProps(elm, i => i?.participant?.id, 1000)?.participant?.id;
    if (!userId) userId = utils.react.getProps(elm, i => i?.user?.id, 1000)?.user?.id;
    if (!userId) userId = utils.react.getProps(elm, i => i?.message?.author?.id, 1000)?.message?.author?.id;

    if (!userId) return;
    let hat = await fetchHatOfUser(userId);
    if (!hat) return;
    elm.style.setProperty('--hat-image', `url('${hat.image}')`);
  }
);