import authentication from "../../api/authentication/index.js";
import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";

async function fetchNameColorsOfUser(userId) {
  if (!authentication.token) return [];
  let profileReq = await fetch(`https://api.acord.app/user/${userId}/profile/inventory`, {
    method: "GET",
    headers: {
      "x-acord-token": authentication.token
    },
  });
  if (!profileReq.ok) return [];
  let profile = await profileReq.json();
  return profile?.data?.features?.find(i => i.type === "colored_name")?.data;
}


dom.patch(
  '[class*="username-"][class*="desaturateUserColors-"], [class*="container-"] > [class*="nameTag-"] > [class*="username"], [class*="userText-"] > [class*="nameTag-"] > [class*="username-"], [class*="userText-"] > [class*="nickname-"], [class*="nameAndDecorators-"] > [class*="name-"] > [class*="overflow-"], [class*="listItemContents-"] [class*="discordTag-"] [class*="username-"], [id*="message-username-"] [class*="username-"], .mention',
  /** @param {HTMLDivElement} elm */ async (elm) => {
    if (elm.getAttribute("style")) return;
    let userId = elm.classList.contains("mention") ? (utils.react.getProps(elm, i => i?.userId)?.userId) : (utils.react.getProps(elm, i => i?.user)?.user?.id || utils.react.getProps(elm, i => i?.message)?.message?.author?.id);
    if (!userId) return;
    const data = await fetchNameColorsOfUser(userId);
    if (!data) return;

    if (elm.classList.contains("mention")) data.points = data.points.map(i => ({ ...i, color: `${i.color}4d` }));

    elm.setAttribute("style",
      data.points.length === 1
        ? `background-color: ${data.points[0].color};`
        : `background-image: ${data.type}-gradient(${data.angle}, ${data.points.map(i => `${i.color}${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")});`
    );
    elm.classList.add(`acord--gradient-${elm.classList.contains("mention") ? "mention" : "name"}`);
  }
);