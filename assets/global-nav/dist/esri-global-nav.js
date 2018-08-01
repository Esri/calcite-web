!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.esriGlobalNav=t()}(this,function(){"use strict";function w(e){var t=e instanceof Node?e:document.createElement(e);return[].slice.call(arguments,1).forEach(function(e){e instanceof Node?t.appendChild(e):"string"==typeof e?t.innerHTML=e:function e(t,a,n){for(var i in a)"function"==typeof a[i]?t.addEventListener(n+i,a[i]):Object(a[i])===a[i]?e(t,a[i],n+i+"-"):t.setAttribute(n+i,a[i])}(t,e,"")}),t}function k(e){for(;e.lastChild;)e.removeChild(e.lastChild);var t,a;return e.appendChild((t=arguments,a=document.createDocumentFragment(),[].slice.call(t,1).forEach(function(e){e instanceof Node?a.appendChild(e):a.appendChild(document.createTextNode(e))}),a)),e}!function(){function s(e){this.value=e}function e(i){var r,o;function l(e,t){try{var a=i[e](t),n=a.value;n instanceof s?Promise.resolve(n.value).then(function(e){l("next",e)},function(e){l("throw",e)}):d(a.done?"return":"normal",a.value)}catch(e){d("throw",e)}}function d(e,t){switch(e){case"return":r.resolve({value:t,done:!0});break;case"throw":r.reject(t);break;default:r.resolve({value:t,done:!1})}(r=r.next)?l(r.key,r.arg):o=null}this._invoke=function(n,i){return new Promise(function(e,t){var a={key:n,arg:i,resolve:e,reject:t,next:null};o?o=o.next=a:(r=o=a,l(n,i))})},"function"!=typeof i.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(e){return this._invoke("next",e)},e.prototype.throw=function(e){return this._invoke("throw",e)},e.prototype.return=function(e){return this._invoke("return",e)}}();var C=function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)};function D(e,t,a){var n=document.createEvent("CustomEvent");n.initCustomEvent(t,!0,!0,a),e.dispatchEvent(n)}function y(e){var t=void 0,a=[];e.addEventListener("blur",function(){a.forEach(function(e){e.removeAttribute("js-focus"),e.removeAttribute("js-focus-ring")})},!0),e.addEventListener("focus",function(){var e=document.activeElement;e instanceof Element&&(e.setAttribute("js-focus",""),t&&e.setAttribute("js-focus-ring",""),a.push(e))},!0),e.addEventListener("keydown",function(){t=clearTimeout(t)||setTimeout(function(){t=0},100)},!0)}function M(e){var t=e.imgDef,a=void 0===t?"":t,n=e.imgClass,i=void 0===n?"":n,r=e.imgWidth,o=e.imgHeight,l=e.viewBox,d=e.id,s=e.$targetElm,c=w("span"),u={class:i,role:"presentation"};if(r&&o&&(u.width=r,u.height=o),l&&(u.viewBox=l),d&&(u.id=d),"string"==typeof a)a.indexOf(".svg")===a.length-4?function(e,t){var a=2<arguments.length&&void 0!==arguments[2]?arguments[2]:function(){},n=new XMLHttpRequest;n.addEventListener("readystatechange",function(){4===n.readyState&&(200===n.status?t(n.responseText):a())}),n.open("GET",e),n.send()}(a,function(e){c.innerHTML=e,w(c.firstElementChild,u)},function(){m({$imgWrapper:c,id:d,imgDef:a,imgClass:i,imgWidth:r,imgHeight:o})}):m({$imgWrapper:c,id:d,imgDef:a,imgClass:i,imgWidth:r,imgHeight:o});else{var p=w(document.createElementNS("http://www.w3.org/2000/svg","svg"),u,w.apply(void 0,[document.createDocumentFragment()].concat(C(a.map(function(e){return w(document.createElementNS("http://www.w3.org/2000/svg","path"),{d:e})})))));c.appendChild(p)}return s&&(s.innerHTML="",s.appendChild(c)),c;function m(e){var t=e.$imgWrapper,a=e.id,n=e.imgDef,i=e.imgClass,r=e.imgWidth,o=e.imgHeight;t.appendChild(w("img",{id:a,src:n,class:i,style:(r?"width:"+r+"px":"")+"; "+(o?"height:"+o+"px":"")}))}}var T="esri-header-account",A="esri-header-brand",t="esri-header-branding-stripe",u="esri-header-menus",N=function(e){var t=e.variant,c=void 0===t?"desktop":t,n=w("div",{class:u,id:u+"-"+c});if(n.classList.add("-"+c),"mobile"===c){var a=w("button",{class:u+"-toggle",id:u+"-"+c+"-toggle",aria:{controls:u+"-content",expanded:!1,haspopup:!0,labelledby:"esri-header-brand"}});a.addEventListener("click",function(e){D(a,"header:menu:toggle",{control:a,content:i,root:!0,state:"menu",target:n,type:"root-toggle",event:e})}),w(n,a)}var i=w("div",{class:u+"-content",aria:{hidden:!0,expanded:!1}});return w(n,i),n.addEventListener("header:update:menus",function(e){var t=e.detail;k.apply(void 0,[i].concat(C(t.map(function(e,s){return w("div",{class:u+"-menu",role:"group"},w.apply(void 0,["ul",{class:u+"-list",role:"navigation",aria:{labelledby:"esri-header-brand"}}].concat(C(e.map(function(e,t){var a=e.icon?M({imgDef:e.icon.path,imgClass:u+"-link-icon",imgWidth:e.icon.width||"16px",imgHeight:e.icon.height||"16px"}):null,n=w("a",{class:u+"-link "+(e.hideLabelInDesktop?"-hide-label":""),id:u+"-link-"+s+"-"+t,href:e.href||"javascript:;"},a,w("span",{class:u+"-link-label"},e.label));e.data&&n({data:e.data});var i=w("li",{class:u+"-item"},n),r=e.menus&&e.menus.length,o=e.tiles&&e.tiles.length;if(r||o){var l=w("button",{class:u+"-submenu-toggle"},e.label),d=w("div",{class:u+"-submenu",id:u+"-"+c+"-submenu-"+s+"-"+t,role:"group",aria:{hidden:!0,expanded:!1},data:{filled:e.menus&&10<e.menus.length?e.menus.slice(0,18).length:""}},l);r&&w(d,w.apply(void 0,["ul",{class:u+"-sublist",role:"navigation",aria:{labelledby:u+"-"+c+"-link-"+s+"-"+t}}].concat(C(e.menus.slice(0,18).map(function(e){var t=w("a",{class:u+"-sublink",href:e.href},e.label);return e.data&&w(t,{data:e.data}),e.newContext&&w(t,{target:"_blank",rel:"noopener"}),w("li",{class:u+"-subitem"},t)}))))),o&&w(d,w.apply(void 0,["ul",{class:u+"-sublist--featured",role:"navigation",aria:{labelledby:u+"-link-"+s+"-"+t},data:{filled:""+e.tiles.slice(0,4).length}}].concat(C(e.tiles.slice(0,4).map(function(e){var t=w("a",{class:u+"-sublink--featured",href:e.href},M({imgDef:e.icon,imgClass:u+"-sublink-image",imgWidth:e.width,imgHeight:e.height}),w("span",{class:u+"-sublink-text"},e.label));return e.data&&w(t,{data:e.data}),e.newContext&&w(t,{target:"_blank",rel:"noopener"}),w("li",{class:u+"-subitem--featured"},t)}))))),w(i,d),n.addEventListener("click",function(){D(n,"header:menu:toggle",{control:n,content:d,submenu:!0,state:"menu",type:"menu-toggle"})}),l.addEventListener("click",function(){D(l,"header:menu:close",{control:n,submenu:!0,content:d,type:"menu-close"})})}return i})))))}))))}),n.addEventListener("header:update:collapseMenus",function(e){var t=e.detail;if(t&&-1<t.indexOf(!0)){document.querySelector(".esri-header-menus-toggle").classList.add("-visible"),document.getElementById("esri-header-brand").classList.add("-fit-burger"),document.getElementById("esri-header-menus-mobile").classList.add("-always-visible");var a=[].slice.call(n.querySelectorAll(".esri-header-menus-menu"));t.forEach(function(e,t){e&&a[t].classList.add("-collapsed")})}}),n},o="esri-header-search",H=function(){var i=w("button",{class:o+"-control",id:o+"-control",aria:{expanded:!1,controls:o+"-content"}});i.addEventListener("click",function(e){D(i,"header:click:search",{event:e}),D(i,"header:menu:toggle",{control:i,content:r,state:"search",target:t,type:"search-toggle",event:e})});var r=w("div",{class:o+"-content",id:o+"-content",aria:{expanded:!1,labelledby:o+"-control"}}),t=w("div",{class:o},i,r);return t.addEventListener("header:update:search",function(e){var t=e.detail;if(!t.hide&&(w(i,{aria:{label:t.label}}),M({imgDef:t.image,imgClass:o+"-image",id:o+"-image",$targetElm:i}),t.dialog)){t.dialog.prefix="esri-header-search-dialog";var a=function(n){var i=w("label",{class:n.prefix+"-label",for:n.prefix+"-query-control"},n.queryLabel),r=w("input",{class:n.prefix+"-control",id:n.prefix+"-control",type:"search",name:"q",autocapitalize:"off",autocomplete:"off",autocorrect:"off",spellcheck:"false"}),o=document.createTextNode(""),l=w("div",{class:n.prefix+"-measure-text",aria:{hidden:!0}},o),d=w("div",{class:n.prefix+"-measure"},l),s=w("button",{class:n.prefix+"-submit",type:"submit",aria:{label:n.submitLabel}}),c=w("form",{class:n.prefix+"-form",action:n.action,role:"search",aria:{label:n.label}},i,r,d,s);c.addEventListener(n.prefix+":focus",function(){r.focus()});var u=!1,p="";function e(e){e&&"reset"===e.type&&(r.value="");var t=r.value;t!==p&&(p=t,D(c,n.prefix+":input",{value:p,event:e})),u&&!t?(u=!1,i.removeAttribute("data-filled"),s.removeAttribute("data-filled")):!u&&t&&(u=!0,w(i,{data:{filled:""}}),w(s,{data:{filled:""}})),o.nodeValue=t;var a=l.scrollWidth+"px";d.style.width=a}function t(e){D(c,n.prefix+":submit",{value:r.value,event:e})}return c.addEventListener("DOMNodeInserted",function e(){c.parentNode&&(c.removeEventListener("DOMNodeInserted",e),D(c,n.prefix+":update",n))}),c.addEventListener(n.prefix+":update",function(){c.ownerDocument.defaultView.matchMedia(n.matchMedia||"(max-width: 720px)").addListener(e),r.addEventListener("input",e),c.addEventListener("reset",e),c.addEventListener("submit",t),c.addEventListener(n.prefix+":unload",onunload)}),c}(t.dialog),n=w("button",{class:"esri-header-search-dialog-cancel",type:"reset"},w("span",t.dialog.cancelLabel));n.addEventListener("click",function(e){D(i,"header:menu:close",{control:i,content:r,state:"search",type:"search-close",event:e})}),w(a,n),k(r,a),i.addEventListener("click",function(e){"true"===i.getAttribute("aria-expanded")&&D(a,t.dialog.prefix+":focus",{event:e})})}}),t},S="esri-header-apps",i=function(d){var s=void 0,c=void 0,n=w("button",{class:"esri-header-canvas",tabindex:"-1",data:{open:!1}});n.addEventListener("click",function(){D(n,"header:menu:close")});var a,i,r=((a=w("div",{class:t,id:t})).addEventListener("header:update:brand",function(e){var t=e.detail;a.style.backgroundColor=t.topStripe,a.classList.add("-visible")}),a),o=((i=w("a",{class:A,id:A})).addEventListener("click",function(e){D(i,"header:click:brand",{event:e})}),i.addEventListener("header:update:brand",function(e){var t=e.detail;if(w(i,{href:t.href}),t.image&&(w(i,{aria:{label:t.label}}),M({imgDef:t.image,imgClass:A+"-image",imgWidth:t.width,imgHeight:t.height,$targetElm:i})),t.brandText){var a=w("span",{class:A+"-text"},t.brandText);w(i,a)}}),i),u=function(){var a=w("div",{class:T}),n=document.createTextNode(""),i=w("button",{class:T+"-control "+T+"-control--signin"},n);i.addEventListener("click",function(e){D(i,"header:click:signin",{event:e})});var r=w("span"),o=document.createTextNode(""),e=w("span",{class:T+"-name"},o),l=document.createTextNode(""),t=w("span",{class:T+"-id"},l),d=w("button",{class:T+"-control "+T+"-control--signedin",id:T+"-control",aria:{controls:T+"-menu",expanded:!1,haspopup:!0}},r,e,t);d.addEventListener("click",function(e){D(d,"header:click:account",{event:e}),D(d,"header:menu:toggle",{account:!0,control:d,content:y,state:"menu",target:a,type:"account-toggle"})});var s=document.createTextNode(""),c=w("button",{class:T+"-content-toggle"},s);c.addEventListener("click",function(){D(c,"header:menu:close",{control:d,content:y,type:"account-close"})});var u=w("span"),p=document.createTextNode(""),m=document.createTextNode(""),h=document.createTextNode(""),v=w("div",{class:T+"-content-info"},u,w("span",{class:T+"-content-name"},p),w("span",{class:T+"-content-id"},m),w("span",{class:T+"-content-group"},h)),f=w("ul",{class:T+"-content-menu",role:"navigation",aria:{labelledby:T+"-control"}}),g=document.createTextNode(""),b=w("button",{class:T+"-signin-control -switch"},g);b.addEventListener("click",function(e){D(b,"header:click:switch",{event:e})});var x=document.createTextNode(""),E=w("button",{class:T+"-signin-control -logout"},x);E.addEventListener("click",function(e){D(E,"header:click:signout",{event:e})});var L=w("ul",{class:T+"-signin-menu",role:"group"},w("li",{class:T+"-signin-item"},b),w("li",{class:T+"-signin-item"},E)),y=w("div",{class:T+"-menu",id:T+"-menu",role:"group",aria:{expanded:!1,hidden:!0}},c,v,f,L);return a.addEventListener("header:update:account",function(e){var t=e.detail;w(d,{aria:{label:t.label}}),s.nodeValue=t.label,n.nodeValue=t.controls.signin,g.nodeValue=t.controls.switch,x.nodeValue=t.controls.signout,t.user?(o.nodeValue=p.nodeValue=t.user.name,l.nodeValue=m.nodeValue=t.user.id,h.nodeValue=t.user.group,M({imgDef:t.user.image,imgClass:T+"-image",$targetElm:r}),M({imgDef:t.user.image,imgClass:T+"-content-image",$targetElm:u}),k.apply(void 0,[f].concat(C(t.menus.map(function(e){return w("li",{class:T+"-content-item"},w("a",{class:T+"-content-link",href:e.href},e.label))})))),k(a,d,y)):k(a,i)}),a}(),p=N({variant:"mobile"}),m=N({variant:"desktop"}),l=H(),h=function(){var s=w("div",{class:S+"-content",id:S+"-content",aria:{expanded:!1,labelledby:S+"-control"}}),c=w("span",{title:"App Launcher","aria-label":"App Launcher Icon"}),e=w("button",{class:S+"-control empty-padding",id:S+"-control"}),u=w("div",{class:"dropdown"});e.appendChild(u);var p=e;e.addEventListener("click",function(e){D(p,"header:click:apps",{event:e}),e.target.classList.contains(S+"-prevent-dropdown")||D(p,"header:menu:toggle",{state:"menu",target:m,type:"root-toggle",control:p,content:s,event:e})});var m=w("div",{class:S},p),h=function(e,t){var a=["0px","32px","24px","20px","18px","16px","14px"],n=w("li",{alt:"",class:S+"-prevent-dropdown link-off-black appLinkContainer",role:"menuitem"}),i=w("a",{href:t.url,target:"_blank",class:"appLink"});if(t.image){var r=w("div",{class:"appIconImage"});M({imgDef:t.image,imgWidth:48,imgHeight:48,$targetElm:r}),i.appendChild(r)}else{var o=Math.round(v(t.abbr||"","avenir")/5),l=a[o];6<o&&(t.abbr=t.abbr.substr(0,4),l=a[4]);var d=w("div",{class:"appIconImage"}),s=w("span",{style:"font-size: "+l,class:"avenir appIconSvgText"},t.abbr);d.appendChild(s),d.appendChild(M({imgDef:t.placeHolderIcon,imgWidth:48,imgHeight:48})),i.appendChild(d)}var c=w("p",{style:"margin:0 auto; text-align:center"},t.label);i.appendChild(c),n.appendChild(i),e.appendChild(n)},v=function e(t,a){var n=(e.canvas||(e.canvas=document.createElement("canvas"))).getContext("2d");return n.font=a,n.measureText(t).width};return m.addEventListener("header:update:apps",function(e){var t=e.detail;if(M({imgDef:t.image.path,imgWidth:t.image.width,imgHeight:t.image.height,imgClass:S+"-image",$targetElm:c}),t.icons){m.appendChild(s),p.className=S+"-control",w(p,{aria:{label:t.label}});for(var a=t.icons.length,n=" dropdown-width-"+(a<4?a:4),i=w("ul",{class:S+"-prevent-dropdown appContainer",role:"menu"}),r=100<=a?100:a,o=0;o<r;o+=1)h(i,t.icons[o]);var l=w("div",{class:S+"-prevent-dropdown"},i),d=w("nav",{class:S+"-prevent-dropdown dropdown-menu dropdown-right app-switcher-dropdown-menu "+n,role:"menu"},l);k(u,c,d)}}),m}(),v=w("div",{class:"esri-header-client"},u),e=w("div",{class:"esri-header-lineBreak"}),f=w("div",{class:"esri-header -"+(d.theme||"web")},n,r,o,p,m,l,e,h,v);y(f),f.addEventListener("header:update",function(e){var t=e.detail;t.brand&&(t.brand.topStripe&&(D(r,"header:update:brand",t.brand),f.style.marginTop="3px"),D(o,"header:update:brand",t.brand)),t.menus&&(D(m,"header:update:menus",t.menus),D(p,"header:update:menus",t.menus)),t.collapseMenus&&(D(m,"header:update:collapseMenus",t.collapseMenus),D(p,"header:update:collapseMenus",t.collapseMenus)),t.search&&D(l,"header:update:search",t.search),t.account&&D(v.lastChild,"header:update:account",t.account),t.account&&D(v.lastChild,"header:update:account",t.account),t.apps&&D(h,"header:update:apps",t.apps),f.ownerDocument.defaultView.addEventListener("keydown",function(e){27===e.keyCode&&D(f,"header:menu:close")})}),f.addEventListener("header:menu:toggle",function(e){var t=e.detail,a="true"!==t.control.getAttribute("aria-expanded")?"header:menu:open":"header:menu:close";D(t.control,a,t)});var g=null,b=null,x=null,E=null,L=null;return f.addEventListener("header:menu:open",function(e){var t=e.detail,a="menu-toggle"===t.type;w(t.control,{aria:{expanded:!0}}),w(t.content,{aria:{expanded:!0,hidden:!1}}),E&&E.control!==t.control&&D(E.control,"header:menu:close",E),"menu-toggle"===t.type&&(E=t),l===t.target?b=t:b&&(D(l,"header:menu:close",b),b=null),m===t.target||p===t.target?x=t:!x||a||s.matches||(D(m,"header:menu:close",x),D(p,"header:menu:close",x),x=null),u===t.target?g=t:g&&(D(u,"header:menu:close",g),g=null),h===t.target?L=t:L&&(D(h,"header:menu:close",L),L=null),w(n,{data:{open:!0,state:t.state}}),w(f.ownerDocument.documentElement,{data:{"header-is-open":!0}})}),f.addEventListener("header:menu:close",function(e){var t=e.detail||x||b||g||L||E;if(t){w(t.control,{aria:{expanded:!1}}),w(t.content,{aria:{expanded:!1,hidden:!0}});var a=!c.matches||"menu-close"!==t.type&&"account-close"!==t.type;b&&b.control===t.control&&D(b.content.lastChild,"reset"),a&&(w(n,{data:{open:!1}}),f.ownerDocument.documentElement.removeAttribute("data-header-is-open"))}}),f.addEventListener("DOMNodeInserted",function e(){var n=f.ownerDocument,i=n.defaultView,r=w("style"),o=void 0;function t(){var e=n.documentElement.clientWidth,t=n.documentElement.clientHeight,a=n.documentElement.scrollHeight;o=getComputedStyle(n.documentElement).overflowY.replace("visible",t<a?"scroll":"visible"),k(r,":root{--esri-vw:"+e+"px;--esri-vh:"+t+"px}[data-header-is-open]{width:"+e+"px;height:"+t+"px;overflow-y:"+o+"}"),(c=i.matchMedia("(max-width: 1023px)")).matches?(m.querySelector(".esri-header-menus-content").classList.add("hidden"),p.querySelector(".esri-header-menus-content").classList.remove("hidden")):(m.querySelector(".esri-header-menus-content").classList.remove("hidden"),p.querySelector(".esri-header-menus-content").classList.add("hidden"))}function a(){s.matches?(D(f,"header:breakpoint:s"),p.lastChild.appendChild(u),m.lastChild.appendChild(u)):(D(f,"header:breakpoint:not:s"),v.appendChild(u))}function l(){c.matches?(D(f,"header:breakpoint:sm"),w(m.lastChild,{aria:{hidden:"false"===m.lastChild.getAttribute("aria-expanded")}})):(D(f,"header:breakpoint:not:sm"),w(m.lastChild,{aria:{hidden:!1}}))}f.parentNode&&(f.removeEventListener("DOMNodeInserted",e),D(f,"header:update",d),w(n.head,r),i.addEventListener("orientationchange",t),i.addEventListener("resize",t),s=i.matchMedia("(max-width: 767px)"),c=i.matchMedia("(max-width: 1023px)"),s.addListener(a),c.addListener(l),a(),l(),t())}),f},v=function(e,t){document.createTextNode(e.buttonLabel);var a=document.createElement("button");a.classList.add(t+"-language-control"),a.setAttribute("ariaDescribedby",t+"-language"),a.innerHTML=e.buttonLabel;var n=w("div",{class:t+"-language"},a);a.addEventListener("click",function(e){e.preventDefault(),w(u,{aria:{expanded:!0}})}),e.prefix=t+"-language-dialog";var i,r,o,l=(r=w.apply(void 0,["select",{class:(i=e).prefix+"-choice",autofocus:"",aria:{label:i.optionsLabel}}].concat(C(i.options.map(function(e){var t=document.createElement("option");return t.value=e.value,t.innerHTML=e.label,t})))),(o=w("form",{class:i.prefix,aria:{labelledby:i.prefix+"-message",describedby:"dialog-description"}},w("p",{class:i.prefix+"-message",id:i.prefix+"-message"},w("strong",i.greetingLabel)," ",i.messageLabel),r,w("button",{class:i.prefix+"-submit",type:"submit",aria:{label:i.submitLabel+" "+i.optionsLabel}},i.submitLabel))).addEventListener("submit",function(e){e.preventDefault(),window.location.href=r.value}),o),d=w("button",{class:t+"-language-dialog-close",id:"dialog-description",ariaLabel:e.closeLabel});d.addEventListener("click",c),w(l,d);var s=w("button",{class:t+"-language-dialog-cancel-canvas",type:"button",tabindex:-1});function c(e){e.preventDefault(),w(u,{aria:{expanded:!1}})}s.addEventListener("click",c);var u=w("div",{class:t+"-language-dialog-barrier",aria:{expanded:!1}},l,s);return a.addEventListener("click",function(){D(a,"footer:click:language",e)}),n.addEventListener("footer:update:language",function(e){var t=e.detail;a.innerHTML=t.buttonLabel,n.ownerDocument.body.appendChild(u),n.ownerDocument.defaultView.addEventListener("keydown",function(){27===(0<arguments.length&&void 0!==arguments[0]?arguments[0]:event).keyCode&&c(event)})}),n},f=function(e,a){var t=matchMedia("(max-width: 719px)"),i=!1;t.addListener(o);var n=e.menu.map(function(e,t){return w("li",{class:a+"-menu-item",id:a+"-menu-link--"+t},w("span",{class:a+"-menu-link",role:"heading"},e.label),w("div",{class:a+"-menu--sub",id:a+"-menu--sub--"+t,aria:{labelledby:a+"-menu-link--"+t}},w.apply(void 0,["ul",{class:a+"-menu-list--sub",role:"presentation"}].concat(C(e.menu.map(function(e){return w("li",{class:a+"-menu-item--sub"},w("a",{class:a+"-menu-link--sub",href:e.href},e.label))}))))))}),r=w("div",{class:a+"-menu",aria:{label:e.label}},w.apply(void 0,["ul",{class:a+"-menu-list",role:"presentation"}].concat(C(n))));return o(),r;function o(){i!==t.matches&&(i=t.matches,n.forEach(function(e){var t,a,n;i?(a=e.firstChild,n="true"!==a.nextElementSibling.getAttribute("aria-hidden"),w(a,{tabindex:0,role:"button",aria:{expanded:!n,haspopup:!n}}),a.addEventListener("click",l),a.addEventListener("keypress",d),w(a.nextElementSibling,{aria:{hidden:!0}})):((t=e.firstChild).removeAttribute("aria-controls"),t.removeAttribute("aria-expanded"),t.removeAttribute("aria-haspopup"),t.removeAttribute("role"),t.removeAttribute("tabindex"),t.addEventListener("click",l),t.addEventListener("keypress",d),t.nextElementSibling.removeAttribute("aria-hidden"))}))}function l(e){var t=e.currentTarget,a=t.nextElementSibling,n="true"!==a.getAttribute("aria-hidden");w(t,{aria:{expanded:!n,haspopup:!n}}),w(a,{aria:{hidden:n}}),w(t,n?{aria:{controls:0}}:{aria:{controls:a.id}})}function d(e){13!==e.keyCode&&32!==e.keyCode||(e.preventDefault(),D(e.currentTarget,"click"))}},r=function(t){var e,a,n,i,r,o,l,d=t.prefix||"esri-footer",s=(e=t.brand,w("div",{class:(a=d)+"-brand"},w("a",{class:a+"-brand-link",href:e.href,aria:{label:e.label}},M({imgDef:e.path,imgClass:a+"-brand-image"})))),c=(n=t.info,w("div",{class:(i=d)+"-info",aria:{label:n.label}},w.apply(void 0,["ul",{class:i+"-info-list",role:"presentation"}].concat(C(n.menu.map(function(e,t){return w("li",{class:i+"-info-item",id:i+"-info-link--"+t},w("a",{class:i+"-info-link",href:e.href},e.label))})))))),u=t.language?v(t.language,d):w("div",{class:"esri-footer-language"}),p=f(t.menu,d),m=(r=t.social,o=d,l=document.createDocumentFragment(),r.menu.forEach(function(e){return w(l,w("li",{class:o+"-social-item"},w("a",{class:o+"-social-link -"+e.label.toLowerCase(),href:e.href,aria:{label:e.label}},M({imgDef:e.image.path,imgClass:o+"-social-image",imgWidth:30,imgHeight:30,viewBox:e.image.viewBox}))))}),w("div",{class:o+"-social",aria:{label:r.label}},w("ul",{class:o+"-social-list",role:"presentation"},l))),h=w("footer",{class:d+" "+(t.hideMenus?"skinny-footer":""),role:"navigation",aria:{label:t.label}},w("div",{class:d+"-section--1 "+(t.hideMenus?"hidden":"")},s,m),w("div",{class:d+"-section--2 "+(t.hideMenus?"hidden":"")},p),w("div",{class:d+"-section--3"},u,c));return h.addEventListener("DOMNodeInserted",function e(){h.removeEventListener("DOMNodeInserted",e),h.addEventListener("focusin",function(){var e=h.ownerDocument.documentElement.scrollHeight-h.scrollHeight;e>h.ownerDocument.defaultView.pageYOffset&&h.ownerDocument.defaultView.scrollTo(0,e)}),t.hideMenus&&document.querySelector(".esri-footer-barrier").classList.add("skinny-footer"),D(h,"footer:update",t)}),y(h),h.addEventListener("footer:update",function(e){var t=e.detail;function a(){var e=window.pageYOffset<0;w(h,{data:{hidden:e}})}t.brand&&D(s,"footer:update:brand",t.brand),t.info&&D(c,"footer:update:info",t.info),t.language&&D(u,"footer:update:language",t.language),t.menu&&D(p,"footer:update:menu",t.menu),t.social&&D(m,"footer:update:social",t.social),h.ownerDocument.defaultView.addEventListener("scroll",a),a()}),h};function l(e){var t=e.targetElm,a=e.menuData;document.querySelector(t).classList.add("esri-header-barrier");var n=i(a.header);document.querySelector(t).appendChild(n)}function d(e){var t=e.targetElm,a=e.menuData;document.querySelector(t).classList.add("esri-footer-barrier");var n=r(a.footer);document.querySelector(t).appendChild(n)}return window.esriHeader={create:i},window.esriFooter={create:r},{createHeader:l,createFooter:d,create:function(e){var t=e.headerElm,a=e.footerElm,n=e.menuData;l({menuData:n,targetElm:t}),d({menuData:n,targetElm:a})}}});
//# sourceMappingURL=esri-global-nav.js.map