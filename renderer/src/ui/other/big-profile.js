import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";
import { fetchFeatures } from "./utils/fetches.js";
import { playSpotifyData } from "./utils/spotify.js";


async function fetchProfileMusicOfUser(userId) {
  return (await fetchFeatures(userId))?.find(i => i.type === "profile_music")?.data;
}


dom.patch(
  '.userProfileModalInner-3dx9L9',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const data = await fetchProfileMusicOfUser(user.id);
    if (!data) return;

    return (await playSpotifyData(data));
  }
)