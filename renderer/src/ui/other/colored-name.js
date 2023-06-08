import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";
import { fetchFeatures } from "./utils/fetches.js";

async function fetchNameColorsOfUser(userId) {
  return (await fetchFeatures(userId))?.find(i => i.type === "colored_name")?.data;
}

function setColorsForText(elm, data) {
  if (data.points.length === 1) {
    elm.style.backgroundColor = data.points[0].color;
  } else {
    elm.style.backgroundImage = `${data.type}-gradient(${data.angle}, ${data.points.map(i => `${i.color}${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")})`;
  }

  elm.classList.add(`acord--gradient-${elm.classList.contains("mention") ? "mention" : "name"}`);
}

dom.patch(
  '.container-3g15px .defaultColor-1EVLSt, .info-3ddo6z, .name-2m3Cms > .overflow-1wOqNV, .username-h_Y3Us, .mention, .userText-1_v2Cq h1, .username-3JLfHz',
  /** @param {HTMLDivElement} elm */ async (elm) => {
    if (elm.getAttribute("style")) return;
    let userId = elm.classList.contains("mention") ? (utils.react.getProps(elm, i => i?.userId)?.userId) : (utils.react.getProps(elm, i => i?.user)?.user?.id || utils.react.getProps(elm, i => i?.message)?.message?.author?.id || utils.react.getProps(elm, i => i?.participant)?.participant?.id);
    if (!userId) return;
    let data = await fetchNameColorsOfUser(userId);
    if (!data) return;

    if (elm.classList.contains("mention")) {
      data = JSON.parse(JSON.stringify(data));
      data.points = data.points.map(i => ({ ...i, color: `${i.color}4d` }));
    }

    setColorsForText(elm, data);
  }
);

dom.patch(
  '.content-1Tgc42',
  /** @param {HTMLDivElement} elm */ async (elm) => {
    if (elm.getAttribute("style")) return;
    let userId = utils.react.getProps(elm, i => i?.user)?.user.id;
    if (!userId) return;
    let data = await fetchNameColorsOfUser(userId);
    if (!data) return;

    data = JSON.parse(JSON.stringify(data));
    data.points = data.points.map(i => ({ ...i, color: `${i.color}1a` }));

    if (data.points.length === 1) {
      elm.style.backgroundColor = data.points[0].color;
    } else {
      elm.style.backgroundImage = `${data.type}-gradient(${data.angle}, ${data.points.map(i => `${i.color}${i.percentage ? ` ${i.percentage}%` : ""}`).join(", ")})`;
    }
  }
)