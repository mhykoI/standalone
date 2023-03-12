import common from "../modules/common.js";

async function request(method, path, body) {
  let accessToken = common.SpotifyStore.getActiveSocketAndDevice()?.socket?.accessToken;
  let accountId = Object.keys(common.SpotifyStore.__getLocalVars().accounts)?.[0];
  if (!accessToken || !accountId) throw new Error("No active Spotify account");
  let req1 = await fetch(
    `https://api.spotify.com/v1${path.startsWith("/") ? path : `/${path}`}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (req1.status === 401) {
    await common.SpotifyActions.getAccessToken(accountId);
    return await request(method, path, body);
  }
  if (req1.status === 204) return null;
  return await req1.json();
}

export default {
  request
}