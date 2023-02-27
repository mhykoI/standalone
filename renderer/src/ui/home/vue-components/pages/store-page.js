export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "store-page",
      {
        template: `
        <div>
          <store-extension-card v-for="extension in extensions" :extension="extension" :key="extension.url"></store-extension-card>
        </div>
        `,
        data() {
          return {
            extensions: [
              {
                type: "plugin",
                url: "",
                name: {
                  default: "Test Plugin",
                  tr: "Deneme Plugin",
                },
                description: {
                  default: "Test Plugin description..",
                  tr: "Deneme Plugin açıklaması..",
                },
                previews: [
                  {
                    name: "Test Plugin Preview",
                    image: "https://i.imgur.com/TtfjHeP.png",
                  },
                  {
                    name: "Test Plugin Preview 2",
                    image: "https://i.imgur.com/0Z0Z0Z0.png",
                  }
                ],
                authors: [
                  {
                    id: "707309693449535599",
                    name: "Armagan#2448",
                    image: "https://i.imgur.com/rSLVd23.png"
                  },
                  {
                    id: "707309693449535599",
                    name: "Armagan#2448",
                    image: "https://i.imgur.com/rSLVd23.png"
                  }
                ],
                version: "1.0.0",
                readme: "### Test Plugin readme..",
                installed: true
              }
            ],
          }
        }
      }
    );
  }
}