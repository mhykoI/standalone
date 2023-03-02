export default {
  /** @param {import("vue").App} vueApp */
  load(vueApp) {
    vueApp.component(
      "home-page",
      {
        template: `
          <div>
            <div style="width: 300px;">
              <discord-select v-model="value" :options="options" />
            </div>
            <h1>{{ value }}</h1>
          </div>
        
        `,
        data() {
          return {
            value: "1",
            options: [
              {
                value: "1",
                label: "Option 1"
              },
              {
                value: "2",
                label: "Option 2"
              },
              {
                value: "3",
                label: "Option 3"
              }
            ]
          }
        }
      }
    );
  }
}