import authentication from "../../api/authentication/index.js";
import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";


async function fetchProfileMusicOfUser(userId) {
  if (!authentication.token) return;
  let profileReq = await fetch(`https://api.acord.app/user/${userId}/profile/inventory`, {
    method: "GET",
    headers: {
      "x-acord-token": authentication.token
    },
  });
  if (!profileReq.ok) return;
  let profile = await profileReq.json();
  return profile?.data?.features?.find(i => i.type === "profile_music")?.data;
}


dom.patch(
  '.userProfileModalInner-3fh3QA',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;
    const data = await fetchProfileMusicOfUser(user.id);
    if (!data) return;

    try {
      let oldState = await utils.spotify.request("GET", "/me/player");

      let volumeChanged = false;

      if (data.volume_percent) {
        let targetVolume = Math.min(data.volume_percent, oldState.device.volume_percent);
        if (targetVolume !== oldState.device.volume_percent) {
          volumeChanged = true;
          await utils.spotify.request(
            "PUT",
            "/me/player/volume",
            {
              volume_percent: targetVolume
            }
          );
        }
      }

      await utils.spotify.request("POST", "/me/player/queue?uri=" + data.uri);
      await utils.spotify.request("POST", "/me/player/next");
      await utils.spotify.request("PUT", "/me/player/seek?position_ms=" + data.position_ms);

      return async () => {
        if (volumeChanged) {
          await utils.spotify.request(
            "PUT",
            "/me/player/volume",
            {
              volume_percent: oldState.device.volume_percent
            }
          );
        }
        if (oldState) {
          await utils.spotify.request("POST", "/me/player/queue?uri=" + oldState.item.uri);
          await utils.spotify.request("POST", "/me/player/next");
          await utils.spotify.request("PUT", "/me/player/seek?position_ms=" + oldState.progress_ms);

          if (!oldState.is_playing) {
            await utils.spotify.request("PUT", "/me/player/pause#").catch(console.log);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
)