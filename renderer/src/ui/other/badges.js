import dom from "../../api/dom/index.js";
import common from "../../api/modules/common.js";
import i18n from "../../api/i18n/index.js";
import authentication from "../../api/authentication/index.js";
import utils from "../../api/utils/index.js";
import ui from "../../api/ui/index.js";

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
  if (!authentication.token) return [];
  let profileReq = await fetch(`https://api.acord.app/user/${userId}/profile/inventory`, {
    method: "GET",
    headers: {
      "x-acord-token": authentication.token
    },
  });
  if (!profileReq.ok) return [];
  let profile = await profileReq.json();
  let badges = (await Promise.all(
    profile.data.features.filter(i => i.type === "badge").map(async i => {
      let req = await fetch(`https://api.acord.app/badges/${i.feature_id}`);
      if (!req.ok) return null;
      let json = await req.json();
      return json.data;
    })
  )).filter(i => i);
  return badges;
}

dom.patch(
  '.userPopoutInner-1hXSeY .profileBadges-31rDHI',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.display_name), [22, 16], badge.image));
    });
  }
)

dom.patch(
  '.userPanelInner-1UAR7g .badgeList-1EecKl',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.display_name), [22, 16], badge.image));
    });
  }
)

dom.patch(
  '.userProfileModalInner-3fh3QA .badgeList-2pMvZX',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.display_name), [24, 18], badge.image));
    });
  }
)

dom.patch(
  '.accountProfileCard-lbN7n- .badgeList-b3Ajmk',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const badges = await fetchBadgesOfUser(user.id);
    badges.forEach(badge => {
      elm.appendChild(buildBadge(i18n.get(badge.display_name), [22, 16], badge.image));
    });
  }
)