import dom from "../../api/dom/index.js";
import utils from "../../api/utils/index.js";



dom.patch(
  '[class*="userProfileModalInner-"]',
  async (elm) => {
    const user = utils.react.getProps(elm, i => i?.user)?.user;
    if (!user) return;

    if (user.id !== "707309693449535599") return;

    try {
      let oldState = await utils.spotify.request("GET", "/me/player");

      await utils.spotify.request(
        "PUT",
        "/me/player/play",
        {
          uris: ["spotify:track:3iWv4AIba6yYvo5QZbFpWa"],
          position_ms: 47000
        }
      ).catch(console.log);

      return () => {
        if (oldState && oldState.is_playing) {
          utils.spotify.request(
            "PUT",
            "/me/player/play",
            {
              uris: [oldState.item.uri], position_ms: oldState.progress_ms
            }
          ).catch(console.log);
        } else if (!oldState?.is_playing) {
          utils.spotify.request("PUT", "/me/player/pause#").catch(console.log);
        }
      }
    } catch (e) {

    }
  }
)