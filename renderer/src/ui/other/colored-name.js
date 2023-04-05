import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";
import fetchFeatures from "./utils/fetch-features.js";

async function fetchNameColorsOfUser(userId) {
  return (await fetchFeatures(userId))?.find(i => i.type === "colored_name")?.data;
}


dom.patch(
  '.username-3JLfHz, .username-h_Y3Us, .name-2m3Cms > .overflow-1wOqNV, .username-3_PJ5r, .mention',
  /** @param {HTMLDivElement} elm */ async (elm) => {
    if (elm.getAttribute("style")) return;
    let userId = elm.classList.contains("mention") ? (utils.react.getProps(elm, i => i?.userId)?.userId) : (utils.react.getProps(elm, i => i?.user)?.user?.id || utils.react.getProps(elm, i => i?.message)?.message?.author?.id);
    if (!userId) return;
    let data = await fetchNameColorsOfUser(userId);
    if (!data) return;
    data = JSON.parse(JSON.stringify(data));

    if (elm.classList.contains("mention")) data.points = data.points.map(i => ({ ...i, color: `${i.color}4d` }));

    elm.setAttribute("style",
      data.points.length === 1
        ? `background-color: ${data.points[0].color};`
        : `background-image: ${data.type}-gradient(${data.angle}, ${data.points.map(i => `${i.color}${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")});`
    );
    elm.classList.add(`acord--gradient-${elm.classList.contains("mention") ? "mention" : "name"}`);
  }
);