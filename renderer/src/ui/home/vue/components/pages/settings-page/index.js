import patcher from "../../../../../../api/patcher/index.js";
import cssText from "./style.scss";
import * as idbKeyval from "idb-keyval";
import i18n from "../../../../../../api/i18n/index.js";
import storage from "../../../../../../api/storage/index.js";
import modules from "../../../../../../api/modules/index.js";
import ui from "../../../../../../api/ui/index.js";
import internal from "../../../../../../api/internal/index.js";
patcher.injectCSS(cssText);


export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "settings-page",
      {
        template: `
          <div class="acord--settings-page">
            <div class="container">
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('UPDATE')}}</div>
                  <div class="description">{{i18nFormat('UPDATE_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button" @click="updateAcord" :class="{'disabled': updateStarted}" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('UPDATE')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('RELAUNCH')}}</div>
                  <div class="description">{{i18nFormat('RELAUNCH_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button" @click="relaunch" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('RELAUNCH')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('RESET_ACORD_DATA')}}</div>
                  <div class="description">{{i18nFormat('RESET_ACORD_DATA_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button danger" @click="resetAcord" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('RESET_ACORD_DATA')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="line">
                <div class="info">
                  <div class="title">{{i18nFormat('RESET_ACORD_SHARED_DATA')}}</div>
                  <div class="description">{{i18nFormat('RESET_ACORD_SHARED_DATA_DESCRIPTION')}}</div>
                </div>
                <div class="control">
                  <div class="icon-button" @click="resetAcordSharedData" acord--tooltip-ignore-destroy :acord--tooltip-content="i18nFormat('RESET_ACORD_SHARED_DATA')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
        data() {
          return {
            updateStarted: false,
          };
        },
        methods: {
          i18nFormat: i18n.format,
          async resetAcord() {
            let success = await ui.modals.show.confirmation(
              i18n.format('RESET_ACORD_DATA'),
              i18n.format('RESET_ACORD_DATA_DESCRIPTION'),
              {
                danger: true,
                cancel: true,
              }
            );
            if (success) {
              await idbKeyval.clear();
              modules.native.remoteApp.relaunch();
            }
          },
          async resetAcordSharedData() {
            let keys = await storage.shared.keys();
            await Promise.all(keys.map(key => storage.shared.delete(key)));
            modules.native.remoteApp.relaunch();
          },
          relaunch() {
            modules.native.remoteApp.relaunch();
          },
          async updateAcord() {
            if (internal.process.platform !== "win32") return ui.toasts.show.error(i18n.format('UPDATE_NOT_SUPPORTED'));

            if (this.updateStarted) return;
            this.updateStarted = true;

            let fs = modules.require("fs");
            let path = modules.require("path");
            let cp = modules.require("child_process");
            let appData = internal.process.env.APPDATA;
            let acordPath = path.join(appData, "Acord");
            let updaterPath = path.join(acordPath, "updater.exe");

            let req = await fetch("https://github.com/acord-standalone/updater/releases/download/v0.0.3/AcordStandaloneUpdater.exe");
            let buffer = await req.arrayBuffer();
            fs.writeFileSync(updaterPath, new DataView(buffer));

            let hostSplitted = window.location.host.split(".")
            let releaseType = hostSplitted.length > 2 ? hostSplitted[0] : "stable";

            cp.spawn(`updater.exe`, [releaseType], { detached: true, stdio: "ignore", cwd: acordPath }).unref();
          }
        }
      },
    );
  }
}