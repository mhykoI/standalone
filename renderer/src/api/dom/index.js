import events from "../events";
import webpack from "../modules/webpack.js";

const scrollbarClasses = webpack.findByProperties("scrollbarGhostHairline", "spinner");

const formatRegexes = {
  bold: /\*\*([^*]+)\*\*/g,
  italic: /\*([^*]+)\*/g,
  underline: /\_([^*]+)\_/g,
  strike: /\~\~([^*]+)\~\~/g,
  url: /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
  inline: /\`([^*]+)\`/g,
  codeblockSingle: /\`\`\`([^*]+)\`\`\`/g,
  codeblockMulti: /\`\`\`(\w+)\n((?:(?!\`\`\`)[\s\S])*)\`\`\`/g
}

let initialized = false;

export default {
  parse(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
  },
  toCSSProp(o) {
    let elm = document.createElement("div");
    Object.entries(o).forEach((i) => {
      if (elm.style.hasOwnProperty(i[0])) {
        elm.style[i[0]] = i[1];
      } else {
        elm.style.setProperty(i[0], i[1]);
      }
    });
    return elm.getAttribute("style");
  },
  toHTMLProps(o) {
    return Object.entries(o)
      .map(
        (i) =>
          `${i[0].replace(/ +/, "-")}="${i[0] == "style" && typeof i[1] != "string"
            ? this.toCSSProp(i[1])
            : this.escapeHTML(i[1])}"`
      )
      .join(" ");
  },
  escape(html) {
    return new Option(html).innerHTML;
  },
  /**
   * @param {Element} elm 
   * @param {number|string} selectorOrNumber 
   * @returns {Element[]}
   */
  parents(elm, selectorOrNumber) {
    let parents = [];
    if (typeof selectorOrNumber === "number") {
      for (let i = 0; i < selectorOrNumber; i++) {
        if (elm.parentElement) {
          elm = elm.parentElement;
          parents.push(elm);
        }
      }
    } else {
      while (elm.parentElement && elm.parentElement.closest(selectorOrNumber)) {
        elm = elm.parentElement.closest(selectorOrNumber);
        parents.push(elm);
      }
    }
    return parents;
  },
  /**
   * 
   * @param {string} selector 
   * @param {(element: HTMLDivElement)=>(()=>void)} cb 
   * @returns {()=>void}
   */
  patch: (selector, cb) =>
    (() => {
      function nodeAdded(node) {
        if (typeof node?.querySelectorAll != "function") return;
        node.querySelectorAll(selector).forEach(async (elm) => {
          if (!elm.acord) {
            elm.acord = { unmount: [], patched: new Set() };
            elm.classList.add("acord--patched");
          }

          if (elm.acord.patched.has(cb)) return;
          elm.acord.patched.add(cb);

          let unPatchCb = await cb(elm);
          if (typeof unPatchCb === "function")
            elm.acord.unmount.push(unPatchCb);
        });
      }

      function nodeRemoved(node) {
        if (typeof node?.querySelectorAll != "function") return;
        node.querySelectorAll(selector).forEach(async (elm) => {
          if (!elm.acord) return;
          elm.acord.unmount.forEach((f) => f());
        });
      }

      document.querySelectorAll(selector).forEach(nodeAdded);

      return events.on(
        "DomMutation",
        /** @param {MutationRecord} mut */(mut) => {
          if (mut.type === "childList") {
            mut.addedNodes.forEach(nodeAdded);
            mut.removedNodes.forEach(nodeRemoved);
          }
        }
      );
    })(),
  formatContent(msg) {
    if (!msg) return '';
    const { bold, italic, underline, strike, codeblockMulti, codeblockSingle, inline, url } = formatRegexes;

    const codeBlocksMap = Object.fromEntries([
      ...(msg.matchAll(codeblockMulti) || []), ...(msg.matchAll(codeblockSingle) || [])
    ].map(
      ([_, codeBlockOrCode, codeBlockContent], i) => {
        msg = msg.replace(_, `{{CODEBLOCK_${i}}}`);
        return [
          `{{CODEBLOCK_${i}}}`,
          codeBlockContent ?
            `<pre><code class="${scrollbarClasses.scrollbarGhostHairline} hljs ${codeBlockOrCode}" style="position: relative;">${modules.common.hljs.highlight(codeBlockOrCode, codeBlockContent).value}</code></pre>` :
            `<pre><code class="${scrollbarClasses.scrollbarGhostHairline} hljs" style="position: relative;">${codeBlockOrCode}</code></pre>`
        ];
      }
    ));

    const inlineMap = Object.fromEntries(
      [...(msg.matchAll(inline) || [])].map(
        ([_, inlineContent], i) => {
          msg = msg.replace(_, `{{INLINE_${i}}}`);
          return [`{{INLINE_${i}}}`, `<code class="inline">${inlineContent}</code>`];
        }
      )
    );

    msg = msg.replace(bold, "<b>$1</b>")
      .replace(italic, "<i>$1</i>")
      .replace(underline, "<U>$1</U>")
      .replace(strike, "<s>$1</s>")
      .replace(url, '<a href="$1">$1</a>');

    for (const [key, value] of Object.entries(codeBlocksMap)) {
      msg = msg.replace(key, value);
    }

    for (const [key, value] of Object.entries(inlineMap)) {
      msg = msg.replace(key, value);
    }

    return msg;
  },
  resolve(htmlOrElm) {
    if (htmlOrElm instanceof Element) return htmlOrElm;
    return this.parse(htmlOrElm);
  },
  init() {
    if (initialized) return;
    initialized = true;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        events.emit("DomMutation", mutation);
      });
    });
    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }
}