import dom from "../../api/dom/index.js";
import webpack from "../../api/modules/webpack.js";
import patcher from "../../api/patcher/index.js";
import storage from "../../api/storage/index.js";
import utils from "../../api/utils/index.js";
import i18n from "../../api/i18n/index.js";
import ui from "../../api/ui/index.js";

import "../../api/extensions";

import cssText from "./style.scss";
import vueComponents from "./vue/components/index.js";
import events from "../../api/events/index.js";
import shared from "../../api/shared/index.js";
import common from "../../api/modules/common.js";
import authentication from "../../api/authentication/index.js";
patcher.injectCSS(cssText);

{
  let script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.47/vue.global.min.js";
  document.head.appendChild(script);
}

const CURRENT_VERSION = "<<CURRENT_VERSION>>";
let LATEST_VERSION = CURRENT_VERSION;

dom.patch('a[href="/store"][data-list-item-id$="___nitro"]', (elm) => {
  utils.ifExists(
    elm.querySelector('.name-2m3Cms'),
    /** @param {HTMLDivElement} nameElm */(nameElm) => {
      let parent = nameElm.parentElement;
      nameElm.textContent = i18n.format("APP_NAME");
      if (CURRENT_VERSION !== LATEST_VERSION) {
        parent.style.justifyContent = "space-between";
        parent.appendChild(
          dom.parse(`
            <div class="acord--update-required" acord--tooltip-content="${i18n.format("UPDATE_REQUIRED_DESCRIPTION", CURRENT_VERSION, LATEST_VERSION)}">
              ${i18n.format("UPDATE_REQUIRED")}
            </div>
          `)
        )
      }
    }
  );

  utils.ifExists(
    elm.querySelector('[class*="premiumTrialAcknowledgedBadge-"]'),
    (nitroElm) => {
      nitroElm.remove();
    }
  );

  utils.ifExists(
    elm.querySelector('svg.linkButtonIcon-7rsZcu'),
    fillSVGElmWithAcordLogo
  );
});

async function checkHasUpdate() {
  const version = await fetch("https://raw.githubusercontent.com/acord-standalone/standalone/main/version").then(r => r.text());
  LATEST_VERSION = version.trim();
}

checkHasUpdate();
setInterval(checkHasUpdate, 1000 * 60 * 60);

let internalVueApp = null;
(async () => {
  let headerItemClasses;
  while (true) {
    headerItemClasses = webpack.findByProperties("divider", "hamburger", "themed");
    if (headerItemClasses) break;
    await new Promise((r) => setTimeout(r, 100));
  }

  const tabBarClasses = webpack.findByProperties("tabBar", "maxWidthWithToolbar");
  const headerClasses = webpack.findByProperties("topPill", "headerText");
  dom.patch('.applicationStore-2nk7Lo > .homeWrapperNormal-bu1BS6.homeWrapper-L4ors0', (elm) => {

    utils.ifExists(
      elm.querySelector('.defaultColor-1EVLSt.defaultColor-1GKx81.title-17SveM'),
      (titleElm) => {
        titleElm.innerHTML = `
          ${i18n.format("APP_NAME")}
          <div class="acord--connected-status"></div>
        `;

        if (internalVueApp) {
          let container = dom.parents(titleElm, 2).pop();

          container.appendChild(
            dom.parse(`<div class="${headerItemClasses.divider}"></div>`)
          );

          const buttonsContainer = dom.parse(`
          <div class="${tabBarClasses.tabBar} ${headerClasses.topPill}">
          </div>
        `);

          let buttons = [];

          function buildButton(id, text, customClasses = "", noPadding = false, authRequired = false) {
            let elm = dom.parse(`<div id="tab-button-${id}" class="acord--tabs-tab-button ${customClasses} ${tabBarClasses.item} ${headerClasses.item} ${headerClasses.themed}">${text}</div>`);

            buttons.push(elm);

            if (authRequired) elm.classList.add("auth-required");
            if (!authentication.token && authRequired) elm.classList.add("disabled");

            elm.setSelected = (s) => {
              if (s) elm.classList.add(headerClasses.selected, "selected");
              else elm.classList.remove(headerClasses.selected, "selected");
            }

            elm.setSelected(internalVueApp.selectedTab === id);

            elm.onclick = () => {
              buttons.forEach((b) => b.setSelected(false));
              elm.setSelected(true);
              internalVueApp.selectedTab = id;
              internalVueApp.noPadding = noPadding;
            }
            return elm;
          }

          if (!shared.blockedUsers?.[common.UserStore.getCurrentUser().id]) {
            buttonsContainer.appendChild(buildButton("home", i18n.format("HOME"), "", false));
            buttonsContainer.appendChild(buildButton("extensions", i18n.format("EXTENSIONS"), "", false));
            buttonsContainer.appendChild(buildButton("settings", i18n.format("SETTINGS"), "", false));
            buttonsContainer.appendChild(buildButton("inventory", i18n.format("INVENTORY"), "inventory-tab-button", false, true));
            buttonsContainer.appendChild(buildButton("explore", i18n.format("EXPLORE"), "explore-tab-button", false, false));
            buttonsContainer.appendChild(buildButton("store-router", i18n.format("STORE"), "store-tab-button", true, true));
          }

          container.appendChild(buttonsContainer);
        }
      }
    );
    utils.ifExists(
      elm.querySelector('.iconWrapper-2awDjA > svg.icon-2xnN2Y'),
      fillSVGElmWithAcordLogo
    );

    function updateAuthRelatedStuff() {
      let connected = !!storage.authentication.token;
      utils.ifExists(
        document.querySelector(".acord--connected-status"),
        (element) => {
          element.classList[connected ? "add" : "remove"]("connected");
        }
      );
      document.querySelectorAll(".acord--tabs-tab-button.auth-required").forEach((elm) => {
        elm.classList[connected ? "remove" : "add"]("disabled");
      });
    }

    storage.authentication.when().then(updateAuthRelatedStuff);
    events.on("CurrentUserChange", updateAuthRelatedStuff);
    events.on("AuthenticationSuccess", updateAuthRelatedStuff);
    events.on("AuthenticationFailure", updateAuthRelatedStuff);
    updateAuthRelatedStuff();

    return () => {
      events.off("CurrentUserChange", updateAuthRelatedStuff);
      events.off("AuthenticationSuccess", updateAuthRelatedStuff);
      events.off("AuthenticationFailure", updateAuthRelatedStuff);
    }
  });
})();

function fillSVGElmWithAcordLogo(svgElm) {
  svgElm.setAttribute("viewBox", "0 0 813.5 1493");
  svgElm.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgElm.innerHTML = `
    <defs>
      <style>
        .acord--logo-color {
          fill: currentColor;
          fill-rule: evenodd;
        }
      </style>
    </defs>
    <g>
      <path class="acord--logo-color" d="M817.266,1322.5h285v365h-285v-365Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M555.235,1523.78s91.169-319.85,92.531-319.28c114.7,47.83,160,192,160,192l-52.12,186.61s-31.129,137.71-80.88,120.39C528.026,1652.42,555.235,1523.78,555.235,1523.78Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M1364.77,1525.28s-91.17-319.85-92.54-319.28c-114.7,47.83-160,192-160,192l52.12,186.61s31.13,137.71,80.88,120.39C1391.97,1653.92,1364.77,1525.28,1364.77,1525.28Z" transform="translate(-553.25 -213.5)"/>
    </g>
    <path class="acord--logo-color" d="M874.766,275.5s14.579-61.918,87-62c80.824-.092,87,62,87,62s199.43,851.47,198,852c-210.33,77.71-146,180-146,180h-281s63.7-103.82-146-181C671.014,1125.49,874.766,275.5,874.766,275.5Z" transform="translate(-553.25 -213.5)"/>
    <g>
      <path class="acord--logo-color" d="M1238.14,897.5a53.882,53.882,0,0,1,53.88,53.875c0,24.939-20.25,46.987-43.25,53.125-4.45,1.18-10.19-39-11-39-0.58,0-27.71,3.51-31,4-5.58.828-11.93-13.876-4-20,1.93-1.491,26.62-6.959,29-7,0.62-.011-7.34-41.618-7-43C1225.64,895.944,1233.52,897.5,1238.14,897.5Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M1173.64,632.5a53.882,53.882,0,0,1,53.88,53.875c0,24.939-20.25,46.987-43.25,53.125-4.45,1.185-10.19-39-11-39-0.58,0-27.71,3.51-31,4-5.58.828-11.93-13.876-4-20,1.93-1.491,26.62-6.959,29-7,0.62-.011-7.34-41.618-7-43C1161.14,630.944,1169.02,632.5,1173.64,632.5Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M1115.16,373a53.874,53.874,0,0,1,53.87,53.875c0,24.939-20.24,46.987-43.25,53.125-4.44,1.185-10.18-39-11-39-0.58,0-27.7,3.51-31,4-5.57.828-11.92-13.876-4-20,1.93-1.491,26.62-6.959,29-7,0.62-.011-7.34-41.618-7-43C1102.65,371.444,1110.53,373,1115.16,373Z" transform="translate(-553.25 -213.5)"/>
    </g>
    <g>
      <path class="acord--logo-color" d="M683.922,897.75a53.875,53.875,0,0,0-53.875,53.875c0,24.939,20.245,46.987,43.25,53.125,4.441,1.18,10.185-39,11-39,0.576,0,27.7,3.51,31,4,5.572,0.828,11.926-13.876,4-20-1.93-1.491-26.621-6.959-29-7-0.62-.011,7.339-41.618,7-43C696.424,896.194,688.544,897.75,683.922,897.75Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M748.422,632.75a53.875,53.875,0,0,0-53.875,53.875c0,24.939,20.245,46.987,43.25,53.125,4.441,1.185,10.185-39,11-39,0.576,0,27.7,3.51,31,4,5.572,0.828,11.926-13.876,4-20-1.93-1.491-26.621-6.959-29-7-0.62-.011,7.339-41.618,7-43C760.924,631.194,753.044,632.75,748.422,632.75Z" transform="translate(-553.25 -213.5)"/>
      <path class="acord--logo-color" d="M806.906,373.25a53.875,53.875,0,0,0-53.875,53.875c0,24.939,20.245,46.987,43.25,53.125,4.442,1.185,10.185-39,11-39,0.577,0,27.7,3.51,31,4,5.572,0.828,11.926-13.876,4-20-1.93-1.491-26.621-6.959-29-7-0.62-.011,7.339-41.618,7-43C819.409,371.694,811.528,373.25,806.906,373.25Z" transform="translate(-553.25 -213.5)"/>
    </g>
  `;
}


(async () => {
  await ui.vue.ready.when();

  const baseVueElm = dom.parse(`
    <div class="acord--tabs-content-container">
      <div class="tab">
        <keep-alive>
          <component :is="\`\${selectedTab}-page\`" />
        </keep-alive>
      </div>
    </div>
  `);

  /** @type {import("vue").App} */
  const vueApp = Vue.createApp({
    data() {
      return {
        selectedTab: "home",
        noPadding: false
      };
    },
    watch: {
      noPadding(val) {
        if (val) {
          baseVueElm.classList.add("no-padding");
        } else {
          baseVueElm.classList.remove("no-padding");
        }
      }
    },
    mounted() {
      internalVueApp = this;
    }
  });

  ui.vue.components.load(vueApp);
  vueComponents.load(vueApp);
  vueApp.mount(baseVueElm);

  dom.patch('.hero-1aNo0v', (elm) => {
    /** @type {HTMLDivElement} */
    let containerElm = dom.parents(elm, '[class*="premiumContainer-"]').pop();
    console.log("UI PATCH", elm, containerElm);
    if (!containerElm) return;
    containerElm.replaceChildren(baseVueElm);
  });
})();

dom.patch('.premiumTrialBadge-pEqntF.premiumTrialAcknowledgedBadge-2QxbU_', (e) => {
  e.remove();
});



