import dom from "../../api/dom/index.js";
import common from "../../api/modules/common.js";
import i18n from "../../api/i18n/index.js";
import authentication from "../../api/authentication/index.js";
import utils from "../../api/utils/index.js";
import ui from "../../api/ui/index.js";
import { fetchFeatures } from "./utils/fetches.js";

function buildBadge(displayName, sizes, image) {
  let elm = dom.parse(`
    <div style="display: flex; align-items: center; justify-content: center; width: ${sizes[0]}px; height: ${sizes[0]}px; cursor: pointer;">
      <img alt=" " src="${image}" style="height: ${sizes[1]}px"></img>
    </div>
  `);

  elm.onclick = () => {
    common.InviteActions.acceptInviteAndTransitionToInviteChannel({ inviteKey: "rrtKWh48v9" });
  }

  ui.tooltips.create(elm, displayName);
  return elm;
}

async function fetchBadgesOfUser(userId) {
  let badges = (await Promise.all(
    (await fetchFeatures(userId)).filter(i => i.type.includes("badge")).map(async i => {
      switch (i.type) {
        case "badge": {
          let req = await fetch(`https://api.acord.app/feature/badge/${i.feature_id}`);
          if (!req.ok) return null;
          let json = await req.json();
          return { name: json.data.display_name, image: json.data.image };
        }
        case "custom_badge":
        case "custom_badge_share": {
          let req = await fetch(`https://api.acord.app/feature/custom-badge/${i.feature_id}`);
          if (!req.ok) return null;
          let json = await req.json();
          return { name: json.data.badge_name, image: json.data.badge_url };
        }
      }
    })
  )).filter(i => i);
  return badges;
}

dom.patch(
  '.profileBadges-2pItdR',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.name), [22, 16], badge.image));
    });
  }
)

dom.patch(
  '.badgeList-2hF9ig',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.name), [22, 16], badge.image));
    });
  }
)

dom.patch(
  '.badgeList-2aoHPw',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.name), [24, 18], badge.image));
    });
  }
)

dom.patch(
  '.badgeList-b3Ajmk',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.name), [22, 16], badge.image));
    });
  }
)