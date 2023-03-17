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
  '.channel-1Shao0 .avatar-1HDIsL, .message-2CShn3.groupStart-3Mlgv1:not(.systemMessage-1H1Z20) .contents-2MsGLg, .topSection-1Khgkv .wrapper-3Un6-K.avatar-1YsFQ1, .userPopoutOuter-3AVBmJ .wrapper-3Un6-K, .member-48YF_l .wrapper-3Un6-K, .userPanelOuter-xc-WYi .wrapper-3Un6-K, .voiceUser-3nRK-K .userAvatar-3Hwf1F, .panels-3wFtMD .wrapper-3Un6-K, .callContainer-HtHELf .avatarWrapper-24Rbpj, .panels-3wFtMD .container-1zzFcN .avatar-2EVtgZ',
  async (elm) => {
    // let user = elm.classList.contains('contents-2MsGLg') ? utils.react.getProps(elm, i => i?.message)?.message?.author : utils.react.getProps(elm, i => i?.user)?.user;
    let userId;
    if (elm.classList.contains('contents-2MsGLg')) {
      userId = utils.react.getProps(elm, i => i?.message, 16)?.message?.author?.id;
    } else {
      userId = utils.react.getProps(elm, i => i?.user, 16)?.user?.id;
      if (!userId) {
        let src = utils.react.getProps(elm, i => i?.src, 16)?.src;
        if (src) userId = src.split('/')?.[4];
      }
    }
    if (!userId) return;
    let hat = await fetchHatOfUser(userId);
    if (!hat) return;
    elm.style.setProperty('--hat-image', `url('${hat.image}')`);
  }
);