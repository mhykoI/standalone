export default {
  config: {
    interaction(ctx) {
      if (ctx.item.id === 'test') {
        ctx.item.disabled = true
        ctx.getItem("description").description = "This is a test";
      }
    },
    load(ctx) {
      ctx.getItems() 
    }
  }
}