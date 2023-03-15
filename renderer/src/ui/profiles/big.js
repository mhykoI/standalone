import authentication from "../../api/authentication/index.js";
import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";


async function fetchProfileMusicOfUser(userId) {
  if (!authentication.token) return [];
  let profileReq = await fetch(`https://api.acord.app/user/${userId}/profile/inventory`, {
    method: "GET",
    headers: {
      "x-acord-token": authentication.token
    },
  });
  if (!profileReq.ok) return [];
  let profile = await profileReq.json();
  return profile?.data?.features?.find(i => i.type === "profile_music")?.data;
}


dom.patch(
  '[class*="userProfileModalInner-"]',
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

      await utils.spotify.request(
        "PUT",
        "/me/player/play",
        {
          uris: [data.uri],
          position_ms: data.position_ms
        }
      ).catch(console.log);

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
          utils.spotify.request(
            "PUT",
            "/me/player/play",
            {
              uris: [oldState.item.uri], position_ms: oldState.progress_ms
            }
          ).catch(console.log);
          if (!oldState.is_playing) setTimeout(() => {
            utils.spotify.request("PUT", "/me/player/pause#").catch(console.log);
          }, 20);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
)