import events from "../events";

export default {
  parse(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  }
}

{
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      events.emit("dom-mutation", mutation);
    });
  });
  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true
  });
}