import authentication from "../../../api/authentication/index.js";

const cache = new Map();

export default async function fetchFeatures(userId) {
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

setInterval(() => {
  for (let [userId, { at }] of cache) {
    if ((Date.now() - at) > 60000) cache.delete(userId);
  }
}, 60000);