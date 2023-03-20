var E=Object.create;var w=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,z=Object.prototype.hasOwnProperty;var L=(e,o,n,t)=>{if(o&&typeof o=="object"||typeof o=="function")for(let s of I(o))!z.call(e,s)&&s!==n&&w(e,s,{get:()=>o[s],enumerable:!(t=H(o,s))||t.enumerable});return e};var c=(e,o,n)=>(n=e!=null?E(k(e)):{},L(o||!e||!e.__esModule?w(n,"default",{value:e,enumerable:!0}):n,e));var y=require("electron");var h=c(require("electron"));function g(){let e=["content-security-policy","access-control-allow-origin"],o=["googlevideo.com","captcha"];h.default.session.defaultSession.webRequest.onHeadersReceived((n,t)=>{if(o.some(s=>n.url.includes(s)))return t({cancel:!1,responseHeaders:n.responseHeaders});Object.keys(n.responseHeaders).forEach(s=>{e.includes(s.toLowerCase())&&delete n.responseHeaders[s]}),n.responseHeaders["Access-Control-Allow-Origin"]=["*"],t({cancel:!1,responseHeaders:n.responseHeaders})})}var r=require("electron");function b(){r.ipcMain.on("GetPath",(e,o)=>{if(o==="appPath"){e.returnValue=r.app.getAppPath();return}try{e.returnValue=r.app.getPath(o)}catch{e.returnValue=null}}),r.ipcMain.on("Relaunch",()=>{r.app.quit(),r.app.relaunch()}),r.ipcMain.on("OpenDevTools",(e,o)=>{try{e.sender.openDevTools({mode:o,activate:!0})}catch{}}),r.ipcMain.on("CloseDevTools",e=>{try{e.sender.closeDevTools()}catch{}}),r.ipcMain.on("IsDevToolsOpen",e=>{e.returnValue=e.sender.isDevToolsOpened()}),r.ipcMain.on("ToggleDevTools",(e,o)=>{try{e.sender.isDevToolsOpened()?e.sender.closeDevTools():e.sender.openDevTools({mode:o,activate:!0})}catch{}}),r.ipcMain.on("QuitApp",()=>{r.app.quit(),setTimeout(()=>{process.exit(0)},100)}),r.ipcMain.on("HideWindow",(e,o)=>{r.BrowserWindow.fromWebContents(e.sender).hide()}),r.ipcMain.on("MinimizeWindow",(e,o)=>{r.BrowserWindow.fromWebContents(e.sender).minimize()}),r.ipcMain.on("MaximizeWindow",(e,o)=>{r.BrowserWindow.fromWebContents(e.sender).maximize()}),r.ipcMain.on("ToggleMaximizeWindow",(e,o)=>{let n=r.BrowserWindow.fromWebContents(e.sender);n.isMaximized()?n.unmaximize():n.maximize()}),r.ipcMain.on("ToggleMinimizeWindow",(e,o)=>{let n=r.BrowserWindow.fromWebContents(e.sender);n.isMinimized()?n.restore():n.minimize()}),r.ipcMain.on("RegisterPreload",(e,o)=>{try{r.app.commandLine.appendSwitch("preload",o)}catch{}}),r.ipcMain.handle("ExecuteWindowScript",async(e,o)=>{try{return{ok:!0,data:await e.sender.executeJavaScript(`(() => {try {${o}} catch {}})();`,!0)}}catch(n){return{ok:!1,error:`${n}`}}}),r.ipcMain.handle("ExecuteInjectorScript",async(event,arg)=>{try{let res=await eval(`(() => {try {${arg}} catch {}})();`);return{ok:!0,data:res}}catch(e){return{ok:!1,error:`${e}`}}}),r.ipcMain.handle("ShowDialog",async(e,{mode:o="open",openDirectory:n=!1,openFile:t=!0,multiSelections:s=!1,filters:i,promptToCreate:a=!1,defaultPath:d,title:x,showOverwriteConfirmation:C,message:O,showHiddenFiles:W,modal:T=!1,buttons:_,defaultId:S,type:R,cancelId:A}={})=>{let f={open:r.dialog.showOpenDialog,save:r.dialog.showSaveDialog,message:r.dialog.showMessageBox}[o];return f?{ok:!1,data:await f.apply(r.dialog,[T&&r.BrowserWindow.fromWebContents(e.sender),{defaultPath:d,filters:i,title:x,message:O,createDirectory:!0,buttons:_,type:R,defaultId:S,cancelId:A,properties:[W&&"showHiddenFiles",n&&"openDirectory",a&&"promptToCreate",n&&"openDirectory",t&&"openFile",s&&"multiSelections",C&&"showOverwriteConfirmation"].filter(p=>p)}].filter(p=>p))}:{error:"Invalid mode.",ok:!1}}),r.ipcMain.handle("ShowWindow",(e,{url:o="",options:n=null,closeOnUrl:t=""}={})=>new Promise(s=>{let i=new r.BrowserWindow(n);if(i.loadURL(o),i.webContents.on("did-navigate",(a,d)=>{d==t&&(windowInstance.close(),s(i.id))}),!t)return s(i.id)})),r.ipcMain.on("OpenExternal",(e,o)=>{r.shell.openExternal(o)})}var v=c(require("electron"));function D(){v.default.session.fromPartition("default").setPermissionRequestHandler((e,o,n)=>{n(!0)})}var l=c(require("electron")),m=c(require("path")),u=c(require("fs"));function P(){class e extends l.default.BrowserWindow{constructor(t){if(!t||!t.webPreferences||!t.webPreferences.preload||!t.title)return super(t);let s=t.webPreferences.preload;t.webPreferences.preload=m.default.join(__dirname,"preload.js"),t.webPreferences.backgroundThrottling=!1,super(t),this.__ORIGINAL_PRELOAD__=s,process.env.ORIGINAL_DISCORD_PRELOAD=s,process.env.ACORD_PRELOAD_KEY=Array(2).fill(0).map(()=>Math.random().toString(36).slice(2)).join("").replace(/^\d+/,""),this.webContents.on("dom-ready",async()=>{let i=m.default.join(__dirname,"renderer.js");if(!u.default.existsSync(i))return;let a=u.default.readFileSync(i,"utf-8");a=a.replace(/<<PRELOAD_KEY>>/gm,process.env.ACORD_PRELOAD_KEY),this.webContents.executeJavaScript(a,!0)}),this.webContents.on("did-navigate-in-page",()=>{this.webContents.send("NavigateInPage")}),this.setMinimumSize(1,1)}}Object.assign(e,l.default.BrowserWindow);let o=require.resolve("electron");delete require.cache[o].exports,require.cache[o].exports={...l.default,BrowserWindow:e}}process.argv.includes("--original")||(process.env.NODE_OPTIONS="--no-force-async-hooks-checks",y.app.commandLine.appendSwitch("no-force-async-hooks-checks"),P(),D(),g(),b());
