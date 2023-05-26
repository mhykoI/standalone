import authentication from "../../../api/authentication/index.js";

const cache = new Map();

export async function fetchFeatures(userId) {
  if (!authentication.token) return [];
  if (cache.has(userId)) return cache.get(userId).data;
  let req = await fetch(`https://api.acord.app/user/${userId}/profile/inventory`, {
    method: "GET",
    headers: {
      "x-acord-token": authentication.token
    },
  });
  if (!req.ok) {
    cache.set(userId, { at: Date.now(), data: [] });
    return [];
  }
  let data = await req.json();
  cache.set(userId, { at: Date.now(), data: data.data.features });
  return data.data.features;
}

export async function fetchGuildData(guildId) {
  if (cache.has(guildId)) return cache.get(guildId).data;
  let req = await fetch(`https://raw.githubusercontent.com/acord-standalone/assets/main/data/guilds/${guildId}.json`, { cache: "no-store" });
if (!req.ok) {
  cache.set(guildId, { at: Date.now(), data: null });
  return null;
}
let data = await req.json();
cache.set(guildId, { at: Date.now(), data });
return data;
}

setInterval(() => {
  for (let [key, { at }] of cache) {
    if ((Date.now() - at) > 60000) cache.delete(key);
  }
}, 60000);