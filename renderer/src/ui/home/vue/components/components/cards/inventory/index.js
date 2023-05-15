import inventoryBadgeFeatureCard from "./inventory-badge-feature-card/index.js";
import inventoryColoredNameFeatureCard from "./inventory-colored-name-feature-card/index.js";
import inventoryHatFeatureCard from "./inventory-hat-feature-card/index.js";
import inventoryProfileMusicFeatureCard from "./inventory-profile-music-feature-card/index.js";

export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    inventoryColoredNameFeatureCard.load(vueApp);
    inventoryHatFeatureCard.load(vueApp);
    inventoryProfileMusicFeatureCard.load(vueApp);
    inventoryBadgeFeatureCard.load(vueApp);
  }
}