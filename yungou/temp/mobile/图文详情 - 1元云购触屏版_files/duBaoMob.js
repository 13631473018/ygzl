!function(){var e=window._dup_exp_global||window._dup_exp_c_global||window._dup_global||window._ssp_global||{};!function(e){}(e),function(e){e.setPath("http://dup.baidustatic.com/"),e.define({name:"bdom",namespace:"dup.union.common",deps:{},bind:function(e,t,n){return"string"==typeof e&&(e=this.one(e)),t=t.replace(/^on/i,"").toLowerCase(),e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n),e},unbind:function(e,t,n){return(e=this.one(e))?(t=t.replace(/^on/i,"").toLowerCase(),e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n),e):null},subOne:function(e,t){var n=this;if(e.constructor===Object&&(e=this.one(e)),"string"==typeof t){for(var o=document.getElementById(t),r=o;r;){if(r===e)return o;r=r.parentNode}return null}if(t.constructor===Object){var i=null;return n.traverse(e,function(e){return n.is(e,t)?(i=e,!1):void 0}),i}},one:function(e){if(e){if(e.nodeName)return e;if(arguments.length>1&&(e=Array.prototype.slice.call(arguments,0)),"string"==typeof e)return document.getElementById(e);if(e.constructor===Object)return this.subOne(document.documentElement,e);if(e.constructor===Array){for(var t=e.concat([]),n=document.documentElement;t.length&&n;)n=this.subOne(n,t.shift());return n}}},traverse:function(e,t){if(e&&t(e)!==!1){var n=e.childNodes;if(n)for(var o=0,r=n.length;r>o;o++){var i=n[o],a=this.traverse(i,t);if(a===!1)return!1}}},langGetType:function(e){for(var t={},n="Array Boolean Date Error Function Number RegExp String".split(" "),o=0,r=n.length;r>o;o++)t["[object "+n[o]+"]"]=n[o].toLowerCase();return null==e?"null":t[Object.prototype.toString.call(e)]||"object"},isWindow:function(e){try{if(e&&"object"==typeof e&&e.document&&"setInterval"in e)return!0}catch(t){return!1}return!1},isInIframe:function(e,t){return t=2===arguments.length?t:e.parent,e!=t||!this.isWindow(e)},isInCrossDomainIframe:function(e,t){function n(e){try{return!!e.parent.location.toString()}catch(t){return!1}}t=2===arguments.length?t:e.parent;for(var o=0,r=10;o++<r&&this.isInIframe(e,t);){if(!n(e))return!0;e=e.parent}return o>=r},getNotCrossDomainTopWindow:function(e,t){1===arguments.length&&"number"===this.langGetType(arguments[0])&&(t=arguments[0],e=void 0),t=t||10;for(var n=window,o=0;o++<t&&this.isInIframe(n)&&!this.isInCrossDomainIframe(n)&&(!e||!e(n));)n=n.parent;return n},langGetAttribute:function(e,t){for(var n=e,o=t.split(".");o.length;){if(void 0===n||null===n)return;n=n[o.shift()]}return n},getInfo:function(e,t){var n,o={},r=this.getNotCrossDomainTopWindow(),i=r[STORE_NAME]||(r[STORE_NAME]={}),a=t?i:o;return"string"===this.langGetType(e)&&(n=this.langGetAttribute(a,e)),n},getDocumentTitle:function(){var e=this.getNotCrossDomainTopWindow(),t=e.document.title,n=60;return t.length>n&&(t=t.substr(0,n)),t},getScrollWidth:function(e){try{return e=e||window,"BackCompat"===e.document.compatMode?e.document.body.scrollWidth:e.document.documentElement.scrollWidth}catch(t){return 0}},getScrollHeight:function(e){try{return e=e||window,"BackCompat"===e.document.compatMode?e.document.body.scrollHeight:e.document.documentElement.scrollHeight}catch(t){return 0}},getClientWidth:function(e){try{return e=e||window,"BackCompat"===e.document.compatMode?e.document.body.clientWidth:e.document.documentElement.clientWidth}catch(t){return 0}},getClientHeight:function(e){try{return e=e||window,"BackCompat"===e.document.compatMode?e.document.body.clientHeight:e.document.documentElement.clientHeight}catch(t){return 0}},getScrollTop:function(e){e=e||window;var t=e.document;return window.pageYOffset||t.documentElement.scrollTop||t.body.scrollTop},getScrollLeft:function(e){e=e||window;var t=e.document;return window.pageXOffset||t.documentElement.scrollLeft||t.body.scrollLeft}}),e.define({name:"logic",namespace:"dup.union.common",deps:{},escapeToEncode:function(e){var t=e||"";return t&&(t=t.replace(/%u[\d|\w]{4}/g,function(e){return encodeURIComponent(unescape(e))})),t},template:function(e,t){var n=/{(.*?)}/g;return e.replace(n,function(e,n,o,r){return t[n]||""})},jsonToObj:function(e){var t="";return window.JSON&&window.JSON.parse&&(t=window.JSON.parse(e)),t},getUrlQueryValue:function(e,t){if(e&&t){var n=new RegExp("(^|&|\\?|#)"+t+"=([^&]*)(&|$)",""),o=e.match(n);if(o)return o[2]}return null},parseUrlQuery:function(e,t){e=e||"",t=t||"?";var n=arguments.callee;n.hasOwnProperty[t]||(n[t]={});var o=n[t];if(o.hasOwnProperty(e))return o[e];var r={},i=e.indexOf(t),a=e.substring(i+1),u=a.split("&");if(-1!==i)for(var s=0,c=u.length;c>s;s++){var d=u[s].split("="),p=decodeURIComponent(d[0]),l=decodeURIComponent(d[1]);r.hasOwnProperty(p)?(r[p].constructor!==Array&&(r[p]=[r[p]]),r[p].push(l)):r[p]=l}return o[e]=r,r}}),e.define({name:"cookie",namespace:"dup.union.common",deps:{},getRaw:function(e,t){var n,t=t||window,o=t.document,r=new RegExp("(^| )"+e+"=([^;]*)(;|$)"),i=r.exec(o.cookie);return i&&(n=i[2]),n},setRaw:function(e,t,n){n=n||{};var o=n.expires;"number"==typeof n.expires&&(o=new Date,o.setTime(o.getTime()+n.expires)),document.cookie=""+e+"="+t+(n.path?"; path="+n.path:"")+(o?"; expires="+o.toGMTString():"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":"")},remove:function(e){var t=new Date;t.setTime(t.getTime()-86400),this.setRaw(e,"",{path:"/",expires:t})}}),e.define({name:"businessLogic",namespace:"dup.union.business",deps:{},adsCountLimit:{inlay:8,"float":2,patch:2,linkunit:20,popup:1},adsCountRecorder:{inlay:{},"float":{},patch:{},linkunit:{},popup:{}},adsCountOption:{deviceType:"pc",displayType:"inlay-fixed",displayMainType:"inlay",displaySubType:"fixed",styleType:"template_inlay_all_normal",stuffType:"text"},displayTypeMap:{1001:"inlay-fixed",1002:"inlay-float",2001:"float-left-middle",2002:"float-right-middle",2003:"float-left-bottom",2004:"float-right-bottom",2005:"float-top",2006:"float-bottom",2007:"float-linkunit-left",3001:"patch-webpage",3002:"patch-flash",4001:"captcha-webpage"},processAdsCountOption:function(e){var t={};t.deviceType=(e.deviceType||this.adsCountOption.deviceType).toLowerCase(),t.displayType=(e.displayType||this.adsCountOption.displayType).toLowerCase(),t.styleType=(e.styleType||this.adsCountOption.styleType).toLowerCase(),t.stuffType=(e.stuffType||this.adsCountOption.stuffType).toLowerCase(),t.domId=e.domId,(t.styleType.indexOf("tlink")>-1||t.styleType.indexOf("linkunit")>-1||t.styleType.indexOf("baiducustnativead")>-1)&&(t.displayType="linkunit-fixed"),t.styleType.indexOf("float_xuanfuwin")>=0&&(t.displayType="popup-float");var n=t.displayType.split("-");return t.displayMainType=n[0]||this.adsCountOption.displayMainType,t.displaySubType=n[1]||this.adsCountOption.displaySubType,t},checkAdsCount:function(e){e=this.processAdsCountOption(e);var t=e.displayMainType,n=this.getAdsCount(e),o=this.adsCountLimit[t];return o>n},g:function(e,t){return t=t||window,"string"==typeof e||e instanceof String?t.document.getElementById(e):e&&e.nodeName&&(1==e.nodeType||9==e.nodeType)?e:e},getAdsCount:function(e){e=this.processAdsCountOption(e);var t=0,n=this.adsCountRecorder[e.displayMainType];for(var o in n)o&&n[o]&&n.hasOwnProperty(o)&&(this.g(o)?t++:n[o]=void 0);return t},setAdsCount:function(e){return e=this.processAdsCountOption(e),this.adsCountRecorder[e.displayMainType][e.domId]=1,!0},getWrapper:function(e,t){var n="cpro_"+e,o=document.getElementById(n);return o||(o=document.getElementById(t)),o},getDisplayTypeByValue:function(e){return this.displayTypeMap[e]},genStyle:function(e){var t="";for(var n in e)t+=n+":"+e[n]+("number"==typeof e[n]?"px;":";");return t},setupViewWatch:function(e,t){var n=e.slotId;require(["viewWatch"],function(t){t.register({id:n,wrapperId:e.iframeId,logType:"block",extra:"ch="+e.channel+"&jk="+e.pvId+"&n="+e.unionAccount})},!0)}}),e.define({name:"duBaoMob",namespace:"dup.ui.painter",deps:{param:"dup.business.param",bdom:"dup.union.common.bdom"},AdHook:function(){},render:function(e){e.containerId;if(e.isOnceSeach){var t=e.containerId+"_frame",n=document.getElementById(t);n&&(n.width=0,n.height=0)}var o=e.response.placement.userdefine,r="";if("undefined"!=typeof o)for(var i=o.split("|"),a=0;a<i.length;a++)tmp=i[a].split("="),"tn"==tmp[0]&&(r=tmp[1]);if(""==r||"template_inlay_all_mobile_lu_dubao"==r){var u=e.paramObj;e.isOnceSeach&&(u.ari=2,u.dc=2,u.dtm="HTML_POST"),e.paramObj=u;var s=this.param.getPmpRequestUrl(e);if(s=s.replace("stid=5&","stid=0&"),e.isAsync){var c=document.createElement("script");c.src=s,c.type="text/javascript",c.charset="UTF-8";var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d)}else{var c=document.createElement("script");c.src=s,c.charset="UTF-8",document.body.appendChild(c)}}},getWrapper:function(e,t){var n="cpro_"+e,o=document.getElementById(n);return o||(o=document.getElementById(t)),o}})}(e.oojs)}();