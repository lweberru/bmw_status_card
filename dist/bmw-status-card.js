/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,_=globalThis,m=_.trustedTypes,u=m?m.emptyScript:"",g=_.reactiveElementPolyfillSupport,f=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,g?.({ReactiveElement:$}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=t=>t,A=w.trustedTypes,C=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+k,P=`<${x}>`,I=document,O=()=>I.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,B=Array.isArray,H="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,R=/>/g,U=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,L=/"/g,V=/^(?:script|style|textarea|title)$/i,j=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,G=I.createTreeWalker(I,129);function q(t,e){if(!B(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",a=T;for(let e=0;e<i;e++){const i=t[e];let o,h,c=-1,l=0;for(;l<i.length&&(a.lastIndex=l,h=a.exec(i),null!==h);)l=a.lastIndex,a===T?"!--"===h[1]?a=M:void 0!==h[1]?a=R:void 0!==h[2]?(V.test(h[2])&&(n=RegExp("</"+h[2],"g")),a=U):void 0!==h[3]&&(a=U):a===U?">"===h[0]?(a=n??T,c=-1):void 0===h[1]?c=-2:(c=a.lastIndex-h[2].length,o=h[1],a=void 0===h[3]?U:'"'===h[3]?L:z):a===L||a===z?a=U:a===M||a===R?a=T:(a=U,n=void 0);const d=a===U&&t[e+1].startsWith("/>")?" ":"";r+=a===T?i+P:c>=0?(s.push(o),i.slice(0,c)+S+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const a=t.length-1,o=this.parts,[h,c]=F(t,e);if(this.el=J.createElement(h,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&o.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[r++],i=s.getAttribute(t).split(k),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:X}),s.removeAttribute(t)}else t.startsWith(k)&&(o.push({type:6,index:n}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),o.push({type:2,index:++n});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===x)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)o.push({type:7,index:n}),t+=k.length-1}n++}}static createElement(t,e){const i=I.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===D)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=N(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??I).importNode(e,!0);G.currentNode=s;let n=G.nextNode(),r=0,a=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new Q(n,n.nextSibling,this,t):1===o.type?e=new o.ctor(n,o.name,o.strings,this,t):6===o.type&&(e=new st(n,this,t)),this._$AV.push(e),o=i[++a]}r!==o?.index&&(n=G.nextNode(),r++)}return G.currentNode=I,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),N(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>B(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new J(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Y(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const s=t;let a,o;for(t=n[0],a=0;a<n.length-1;a++)o=Y(this,s[i+a],e,a),o===D&&(o=this._$AH[a]),r||=!N(o)||o!==this._$AH[a],o===W?t=W:t!==W&&(t+=(o??"")+n[a+1]),this._$AH[a]=o}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===D)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(J,Q),(w.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ot=rt.litElementPolyfillSupport;ot?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const ht="bmw-status-card",ct="vehicle-status-card",lt="High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}, clean studio background, realistic, sharp details.";class dt extends at{constructor(){super(...arguments),this._loading=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_vehicleConfig:{state:!0},_error:{state:!0},_loading:{state:!0},_vehicleInfo:{state:!0}}}static{this.styles=r`
    :host {
      display: block;
    }
    .message {
      padding: 12px 16px;
      color: var(--primary-text-color);
    }
    .message.error {
      color: var(--error-color, #b00020);
    }
    ha-card {
      border-radius: var(--ha-card-border-radius, 12px);
    }
  `}set hass(t){this._hass=t,this._ensureConfig()}get hass(){return this._hass}setConfig(t){this._config=t,this._vehicleConfig=void 0,this._error=void 0,t?.bmw_home_device_id&&t?.bmw_cardata_device_id||(this._error="bmw_home_device_id und bmw_cardata_device_id sind erforderlich."),this._vehicleInfo=void 0,this._entityEntriesCache=void 0,this._deviceEntriesCache=void 0,this._ensureVehicleCardLoaded(),this._ensureConfig()}updated(){const t=this.renderRoot.querySelector(ct);t&&this.hass&&(t.hass=this.hass,this._vehicleConfig&&t.setConfig(this._vehicleConfig))}getCardSize(){return 6}static getConfigElement(){return document.createElement("bmw-status-card-editor")}static getStubConfig(){return{type:`custom:${ht}`,bmw_home_device_id:"",bmw_cardata_device_id:""}}async _ensureVehicleCardLoaded(){if(!this._config?.vehicle_status_card_resource)return;if(customElements.get(ct))return;document.querySelector(`script[data-bmw-status-card="${this._config.vehicle_status_card_resource}"]`)||await new Promise((t,e)=>{const i=document.createElement("script");i.type="module",i.src=this._config.vehicle_status_card_resource,i.dataset.bmwStatusCard=this._config.vehicle_status_card_resource,i.addEventListener("load",()=>t()),i.addEventListener("error",()=>e()),document.head.appendChild(i)})}async _ensureConfig(){if(this.hass&&this._config&&!this._loading&&!this._vehicleConfig&&this._config.bmw_home_device_id&&this._config.bmw_cardata_device_id){this._loading=!0;try{console.debug("[bmw-status-card] building config");const t=[this._config.bmw_home_device_id,this._config.bmw_cardata_device_id].filter(Boolean),e=await this._getEntityRegistry(),i=await this._getDeviceRegistry(),s=this._buildEntityInfo(e,t),n=this._buildVehicleInfo(i,s);this._vehicleInfo=n;const r=await this._resolveImages(n),a=this._buildVehicleStatusCardConfig(s,r);this._vehicleConfig=this._mergeVehicleConfig(a,this._config.vehicle_status_card),this._error=void 0}catch(t){this._error=t?.message||String(t),console.error("[bmw-status-card] config build failed:",t)}finally{this._loading=!1,this.requestUpdate()}}}async _getEntityRegistry(){if(this._entityEntriesCache)return this._entityEntriesCache;const t=await this.hass.callWS({type:"config/entity_registry/list"});return this._entityEntriesCache=t,t}async _getDeviceRegistry(){if(this._deviceEntriesCache)return this._deviceEntriesCache;const t=await this.hass.callWS({type:"config/device_registry/list"});return this._deviceEntriesCache=t,t}_buildEntityInfo(t,e){const i=new Set(e);return t.filter(t=>t.device_id&&i.has(t.device_id)).map(t=>{const e=this.hass.states[t.entity_id],i=t.entity_id.split(".")[0],s=e?.attributes?.friendly_name||t.original_name||t.entity_id;return{entity_id:t.entity_id,domain:i,name:s,device_class:e?.attributes?.device_class,unit:e?.attributes?.unit_of_measurement,state:e?.state,attributes:e?.attributes||{}}})}_extractVehicleInfoFromAttributes(t){const e={};for(const i of t){const t=i.attributes||{},s=t.vehicle_basic_data||t.vehicleBasicData,n=t.vehicle_basic_data_raw||t.vehicleBasicDataRaw;s&&"object"==typeof s&&(e.model=e.model||this._toNonEmptyString(s.model_name),e.series=e.series||this._toNonEmptyString(s.series),e.color=e.color||this._toNonEmptyString(s.color),e.body=e.body||this._toNonEmptyString(s.body_type),e.year=e.year||this._extractYear(s.construction_date)),n&&"object"==typeof n&&(e.make=e.make||this._toNonEmptyString(n.brand),e.model=e.model||this._toNonEmptyString(n.modelName)||this._toNonEmptyString(n.modelRange)||this._toNonEmptyString(n.series),e.series=e.series||this._toNonEmptyString(n.series)||this._toNonEmptyString(n.seriesDevt),e.color=e.color||this._toNonEmptyString(n.colourDescription)||this._toNonEmptyString(n.colourCodeRaw),e.body=e.body||this._toNonEmptyString(n.bodyType),e.year=e.year||this._extractYear(n.constructionDate))}return e}_extractYear(t){if(t){if("number"==typeof t)return String(t);if("string"==typeof t){const e=t.match(/(19|20)\d{2}/);return e?e[0]:void 0}}}_toNonEmptyString(t){if(null==t)return;const e=String(t).trim();return e.length?e:void 0}_buildVehicleInfo(t,e){const i=this._config?.vehicle_info||{},s=[this._config?.bmw_home_device_id,this._config?.bmw_cardata_device_id],n=t.filter(t=>s.includes(t.id)),r=this._extractVehicleInfoFromAttributes(e),a=n.find(t=>t.manufacturer)?.manufacturer||"BMW",o=n.find(t=>t.model)?.model,h=n.find(t=>t.name)?.name,c=this._findEntityByKeywords(e,["model","vehicle_model","car_model"]),l=this._findEntityByKeywords(e,["series","line"]),d=this._findEntityByKeywords(e,["year","model_year"]),p=this._findEntityByKeywords(e,["color","colour"]),_=this._findEntityByKeywords(e,["trim","package","edition"]),m=this._findEntityByKeywords(e,["body","body_type"]),u=t=>{if(!t)return;const e=this.hass.states[t]?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:void 0};return{make:i.make||r.make||a,model:i.model||r.model||u(c)||o,series:i.series||r.series||u(l),year:i.year||r.year||u(d),color:i.color||r.color||u(p),trim:i.trim||r.trim||u(_),body:i.body||r.body||u(m),name:i.name||r.name||h}}async _resolveImages(t){const e=this._config?.image;if(!e||"off"===e.mode)return[];if("static"===e.mode&&e.static_urls?.length)return e.static_urls;if("ai"===e.mode&&e.ai){const i=e.ai.provider||"openai";return"openai"!==i&&"gemini"!==i||e.ai.api_key?(console.debug("[bmw-status-card] generating AI images",e.ai),this._generateAiImages(t,e.ai)):(console.warn("[bmw-status-card] image.ai.api_key fehlt – überspringe Bildgenerierung."),[])}return[]}async _generateAiImages(t,e){const i=e.provider||"openai",s=e.cache_hours??24,n=this._buildImageCacheKey(t,e),r=this._buildPrompts(t,e),a=e.count??1,o=e.max_images??8;try{const t=localStorage.getItem(n);if(t){const e=JSON.parse(t),i=(Date.now()-e.timestamp)/36e5;if(e.images?.length&&i<=s)return e.images}}catch(t){}let h=[];for(const t of r){if(h.length>=o)break;const s=o-h.length,n=Math.min(a,s);if(n<=0)break;"openai"===i?h.push(...await this._fetchOpenAiImages(t,e,n)):"gemini"===i?h.push(...await this._fetchGeminiImages(t,e,n)):h.push(...await this._fetchGenericImages(t,e,n))}if(h.length)try{localStorage.setItem(n,JSON.stringify({timestamp:Date.now(),images:h}))}catch(t){}return h}_buildPrompts(t,e){const i=e.prompt_template||lt;if(e.prompts&&e.prompts.length)return e.prompts.map(e=>this._buildPrompt(t,e));return(e.views?.length?e.views:["front 3/4 view","rear 3/4 view","side profile","front view","rear view"]).map(e=>this._buildPrompt(t,i,e))}_buildPrompt(t,e,i){const s=e||lt,n={"{make}":t.make||"BMW","{model}":t.model||"","{series}":t.series||"","{year}":t.year||"","{color}":t.color||"","{trim}":t.trim||"","{body}":t.body||"","{angle}":i||""};let r=s;return Object.entries(n).forEach(([t,e])=>{const i=e?.trim();r=r.replaceAll(t,i||"")}),i&&!s.includes("{angle}")&&(r=`${r} ${i}`),r.replace(/\s+/g," ").trim()}async _fetchOpenAiImages(t,e,i){if(!e.api_key)throw new Error("image.ai.api_key fehlt (OpenAI).");const s=e.endpoint||"https://api.openai.com/v1/images/generations",n={model:e.model||"gpt-image-1",prompt:t,size:e.size||"1024x1024",n:i},r=await fetch(s,{method:"POST",headers:{Authorization:`Bearer ${e.api_key}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!r.ok){const t=await r.text();throw new Error(`OpenAI Fehler: ${r.status} ${t}`)}const a=await r.json();return(a?.data||[]).map(t=>t.url||t.b64_json).filter(Boolean).map(t=>t.startsWith("http")?t:`data:image/png;base64,${t}`)}async _fetchGeminiImages(t,e,i){if(!e.api_key)throw new Error("image.ai.api_key fehlt (Gemini).");const s=e.model||"gemini-3-pro-image",n=e.endpoint||`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${e.api_key}`,r=e=>{const s={contents:[{role:"user",parts:[{text:t}]}],generationConfig:{candidateCount:i}};return e&&(s.responseModalities=["IMAGE"]),s},a=e.request_body||r(!0),o=async t=>await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});let h=await o(a),c="";if(!h.ok){c=await h.text();if(!(!e.request_body&&(c.includes("response_modalities")||c.includes("responseModalities")||c.includes("imageGenerationConfig")||c.includes("generation_config"))))throw new Error(`Gemini Fehler: ${h.status} ${c}`);if(h=await o(r(!1)),!h.ok){const t=await h.text();throw new Error(`Gemini Fehler: ${h.status} ${t}`)}}const l=await h.json(),d=l?.candidates||[],p=[];if(Array.isArray(d)&&d.forEach(t=>{"SAFETY"===t?.finishReason&&console.warn("[bmw-status-card] Gemini Bild durch Safety-Filter blockiert.");(t?.content?.parts||[]).forEach(t=>{const e=t.inlineData||t.inline_data;if(e?.data){const t=e.mimeType||"image/png";p.push(`data:${t};base64,${e.data}`)}})}),p.length)return p;const _=l?.predictions||l?.images||l?.data||[];return Array.isArray(_)?_.map(t=>{const e=t.bytesBase64Encoded||t?.image?.bytesBase64Encoded||t?.b64_json;return e?`data:image/png;base64,${e}`:"string"==typeof t&&t.startsWith("http")?t:t?.url?t.url:null}).filter(Boolean):[]}async _fetchGenericImages(t,e,i){if(!e.endpoint)throw new Error("image.ai.endpoint fehlt (generic).");const s=e.request_body||{prompt:t,count:i,size:e.size},n=await fetch(e.endpoint,{method:"POST",headers:{...e.api_key?{Authorization:`Bearer ${e.api_key}`}:{},"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const t=await n.text();throw new Error(`AI Fehler: ${n.status} ${t}`)}const r=await n.json(),a=this._extractByPath(r,e.response_path)||r.images||r.data||[];return Array.isArray(a)?a.map(t=>"string"==typeof t?t:t.url||t.image||t.b64_json).filter(Boolean).map(t=>t.startsWith("http")?t:`data:image/png;base64,${t}`):[]}_extractByPath(t,e){if(e)return e.split(".").reduce((t,e)=>t?t[e]:void 0,t)}_buildImageCacheKey(t,e){const i={vehicleInfo:t,provider:e.provider,model:e.model,size:e.size,aspect_ratio:e.aspect_ratio,count:e.count,max_images:e.max_images,prompt_template:e.prompt_template,prompts:e.prompts,views:e.views};return`bmw-status-card:images:${this._hash(JSON.stringify(i))}`}_hash(t){let e=0;for(let i=0;i<t.length;i+=1)e=(e<<5)-e+t.charCodeAt(i),e|=0;return String(e)}_buildVehicleStatusCardConfig(t,e){const i=new Set,s=this._pickEntity(t,i,["lock","binary_sensor","sensor"],["lock","locked","door lock"]),n=this._pickEntity(t,i,["binary_sensor","sensor"],["charging","charge","plugged","plug","charging port","connector","port"]),r=this._pickEntity(t,i,["sensor"],["battery","soc","state_of_charge","state of charge","state_of_energy","soe"]),a=this._pickEntity(t,i,["sensor"],["fuel","tank","fuel_level"]),o=this._pickEntity(t,i,["sensor"],["range","remaining","remaining_range","remainingrange"]),h=this._pickEntity(t,i,["sensor"],["electric range","ev range","remaining electric range","kombi remaining electric range"]),c=this._pickEntity(t,i,["sensor"],["fuel range","remaining fuel","tank level"]),l=this._pickEntity(t,i,["sensor"],["total remaining range","total range"]),d=this._pickEntity(t,i,["sensor","number"],["target","charge target","target soc","target state"]),p=this._pickEntity(t,i,["sensor"],["odometer","mileage","distance","travelled"]),_=this._pickEntity(t,i,["sensor"],["temperature","temp","coolant"]),m=this._pickEntity(t,i,["sensor"],["charging power","charge power","power","grid energy"]),u=this._pickEntity(t,i,["sensor"],["time remaining","time to fully","time to full","remaining time"]),g=this._pickEntity(t,i,["binary_sensor","sensor","switch"],["preconditioning","climatization","climate","hvac","defrost"]),f=this._pickEntity(t,i,["binary_sensor","sensor"],["engine","ignition"]),y=this._pickEntity(t,i,["binary_sensor","sensor"],["moving","motion","driving","parking"]),v=this._pickEntity(t,i,["binary_sensor","sensor"],["alarm","anti theft","anti-theft"]),b=[];s&&b.push({type:"entity",entity:s,icon:"mdi:lock"}),n&&b.push({type:"entity",entity:n,icon:"mdi:ev-station"}),r&&b.push({type:"entity",entity:r,icon:"mdi:battery"}),a&&b.push({type:"entity",entity:a,icon:"mdi:gas-station"}),g&&b.push({type:"entity",entity:g,icon:"mdi:car-defrost-front"});const $=[];(h||l||o)&&$.push({type:"entity",entity:h||l||o,icon:"mdi:map-marker-distance"}),p&&$.push({type:"entity",entity:p,icon:"mdi:counter"}),_&&$.push({type:"entity",entity:_,icon:"mdi:thermometer"}),m&&$.push({type:"entity",entity:m,icon:"mdi:flash"}),u&&$.push({type:"entity",entity:u,icon:"mdi:timer"}),f&&$.push({type:"entity",entity:f,icon:"mdi:engine"}),y&&$.push({type:"entity",entity:y,icon:"mdi:car"}),v&&$.push({type:"entity",entity:v,icon:"mdi:alarm-light"});const w=this._pickEntities(t,i,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","flap","lock","flap","charging port","port"]),E=this._pickEntities(t,i,["sensor"],["tire","tyre","pressure","wheel","tpms","pressure target"]),A=this._pickEntities(t,i,["sensor"],["tire temperature","tyre temperature","wheel temperature"]),C=this._pickEntities(t,i,["binary_sensor","sensor","switch"],["light","lights","headlight","lamp","running light"]),S=this._pickEntities(t,i,["binary_sensor","sensor","switch","climate"],["climate","hvac","preconditioning","defrost","seat","steering wheel","air purification","heater","heating","cooling"]),k=this._pickEntities(t,i,["sensor","binary_sensor"],["service","inspection","cbs","check control","maintenance"]),x=this._pickEntities(t,i,["sensor","device_tracker"],["navigation","destination","eta","latitude","longitude","gps"]),P=this._pickEntities(t,i,["sensor","binary_sensor","switch","number"],["charging","charge","plug","connector","charging mode","charging power","time to fully","charge target"]),I=[];if(b.length&&I.push({row_items:b,alignment:"center",no_wrap:!0}),$.length&&I.push({row_items:$,alignment:"center",no_wrap:!0}),w.length||E.length){const t=[];w.length&&t.push({type:"group",name:"Öffnungen",icon:"mdi:car-door",items:w.map(t=>({type:"entity",entity:t}))});const e=[...E,...A];e.length&&t.push({type:"group",name:"Reifen",icon:"mdi:car-tire-alert",items:e.map(t=>({type:"entity",entity:t}))}),t.length&&I.push({row_items:t,alignment:"center",no_wrap:!0})}const O=[];P.length&&O.push({type:"group",name:"Laden",icon:"mdi:ev-station",items:P.map(t=>({type:"entity",entity:t}))}),S.length&&O.push({type:"group",name:"Klima",icon:"mdi:car-defrost-front",items:S.map(t=>({type:"entity",entity:t}))}),C.length&&O.push({type:"group",name:"Licht",icon:"mdi:car-light-high",items:C.map(t=>({type:"entity",entity:t}))}),k.length&&O.push({type:"group",name:"Service",icon:"mdi:wrench",items:k.map(t=>({type:"entity",entity:t}))}),x.length&&O.push({type:"group",name:"Navigation",icon:"mdi:navigation",items:x.map(t=>({type:"entity",entity:t}))}),O.length&&I.push({row_items:O,alignment:"center",no_wrap:!0});const N=[];r&&N.push({energy_level:{entity:r},range_level:h||l||o?{entity:h||l||o}:void 0,charging_entity:n||void 0,charge_target_entity:d||void 0}),a&&N.push({energy_level:{entity:a},range_level:c||l||o?{entity:c||l||o}:void 0}),!N.length&&o&&N.push({energy_level:{entity:o}});const B=t.filter(t=>"device_tracker"===t.domain).map(t=>t.entity_id),H=B[0],T=this._buildTireCardConfig(t),M=new Set(T?.entities||[]),R=[],U=[],z=[],L=(t,e,i,s)=>{e&&t.push({entity:e,name:i,icon:s})};L(U,r,"Batterie","mdi:battery"),L(U,a,"Kraftstoff","mdi:gas-station"),L(U,h||l||o,"Reichweite","mdi:map-marker-distance"),L(U,p,"Kilometerstand","mdi:counter"),L(U,_,"Temperatur","mdi:thermometer"),L(U,u,"Ladezeit","mdi:timer"),L(U,m,"Ladeleistung","mdi:flash"),k.forEach(t=>L(z,t)),U.length&&(R.push({name:"Fahrzeug",icon:"mdi:car-info",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Fahrzeugstatus",items:U}]}}),U.forEach(t=>M.add(t.entity))),z.length&&(R.push({name:"Service",icon:"mdi:wrench",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Service",items:z}]}}),z.forEach(t=>M.add(t.entity))),P.length&&(R.push({name:"Laden",icon:"mdi:ev-station",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Ladezustand",items:P.map(t=>({entity:t}))}]}}),P.forEach(t=>M.add(t))),S.length&&(R.push({name:"Klima",icon:"mdi:car-defrost-front",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Klima",items:S.map(t=>({entity:t}))}]}}),S.forEach(t=>M.add(t))),x.length&&(R.push({name:"Navigation",icon:"mdi:navigation",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Navigation",items:x.map(t=>({entity:t}))}]}}),x.forEach(t=>M.add(t)));const V=[...R,...this._buildButtonCards(t,i,M)],j=e.length?e.map(t=>({image:t})):void 0;return{type:`custom:${ct}`,name:this._vehicleInfo?.name||"BMW",indicator_rows:I.length?I:void 0,range_info:N.length?N:void 0,button_cards:V.length?V:void 0,images:j,mini_map:H?{device_tracker:H,entities:B,maptiler_api_key:this._config?.maptiler_api_key,enable_popup:!0,map_height:240,map_zoom:14,user_location:!0,use_zone_name:!0}:void 0,layout_config:{section_order:["indicators","range_info","images","mini_map","buttons"],button_grid:{columns:2,swipe:!0},images_swipe:{autoplay:!0,loop:!0,delay:6e3,speed:600,effect:"fade",height:240},range_info_config:{layout:"row"},single_tire_card:T?.tire_card?{enabled:!0,tire_card:T.tire_card}:void 0}}}_buildButtonCards(t,e,i){const s=["lock","switch","button","cover","climate"],n=new Set([...e,...i?Array.from(i):[]]),r=t.filter(t=>!n.has(t.entity_id)).sort((t,e)=>{const i=s.indexOf(t.domain),n=s.indexOf(e.domain);return(-1===i?999:i)-(-1===n?999:n)}),a=[];for(const t of r){if(a.length>=12)break;s.includes(t.domain)&&(e.add(t.entity_id),n.add(t.entity_id),a.push({entity:t.entity_id,name:t.name,button_type:"default"}))}return a}_mergeVehicleConfig(t,e){if(!e)return t;const i={...t,...e};return["indicator_rows","range_info","images","button_cards"].forEach(t=>{void 0!==e[t]&&(i[t]=e[t])}),void 0!==e.mini_map&&(i.mini_map=e.mini_map),void 0!==e.layout_config&&(i.layout_config=e.layout_config),i}_pickEntity(t,e,i,s){const n=this._findEntity(t,i,s,e);if(n)return e.add(n.entity_id),n.entity_id}_pickEntities(t,e,i,s){const n=this._findEntities(t,i,s,e);return n.forEach(t=>e.add(t.entity_id)),n.map(t=>t.entity_id)}_findEntity(t,e,i,s){return this._findEntities(t,e,i,s)[0]}_findEntities(t,e,i,s){const n=i.map(t=>t.toLowerCase());return t.filter(t=>!s.has(t.entity_id)).filter(t=>!e.length||e.includes(t.domain)).filter(t=>{if(!n.length)return!0;const e=`${t.entity_id} ${t.name} ${t.device_class??""}`.toLowerCase();return n.some(t=>e.includes(t))}).sort((t,e)=>{const i=t.state||"",s=e.state||"";return"unknown"===i&&"unknown"!==s?1:"unknown"===s&&"unknown"!==i?-1:t.name.localeCompare(e.name)})}_findEntityByKeywords(t,e){return this._findEntity(t,[],e,new Set)?.entity_id}_buildTireCardConfig(t){const e=e=>this._findEntity(t,["sensor"],e,new Set),i=e(["front left","front_left","row1 left","row1 wheel left"]),s=e(["front right","front_right","row1 right","row1 wheel right"]),n=e(["rear left","rear_left","row2 left","row2 wheel left"]),r=e(["rear right","rear_right","row2 right","row2 wheel right"]),a=[i,s,n,r].filter(Boolean).map(t=>t.entity_id);if(!a.length)return;return{tire_card:{title:"Reifendruck",front_left:i?{entity:i.entity_id,name:"Vorne links"}:void 0,front_right:s?{entity:s.entity_id,name:"Vorne rechts"}:void 0,rear_left:n?{entity:n.entity_id,name:"Hinten links"}:void 0,rear_right:r?{entity:r.entity_id,name:"Hinten rechts"}:void 0},entities:a}}render(){return this._error?j`
        <ha-card>
          <div class="message error">${this._error}</div>
        </ha-card>
      `:customElements.get(ct)?this._vehicleConfig?j`<vehicle-status-card></vehicle-status-card>`:j`
        <ha-card>
          <div class="message">BMW Status Card wird vorbereitet…</div>
        </ha-card>
      `:j`
        <ha-card>
          <div class="message">
            Fahrzeugkarte <strong>vehicle-status-card</strong> ist nicht geladen. Installiere die Karte oder setze
            <strong>vehicle_status_card_resource</strong>.
          </div>
        </ha-card>
      `}}class pt extends at{static{this.properties={hass:{attribute:!1},_config:{state:!0},_bmwHomeEntity:{state:!0},_bmwCardataEntity:{state:!0},_bmwHomeEntities:{state:!0},_bmwCardataEntities:{state:!0},_editorError:{state:!0}}}static{this._errorHooked=!1}set hass(t){this._hass=t,this._loadIntegrationEntities(),pt._errorHooked||(pt._errorHooked=!0,window.addEventListener("error",t=>{console.error("[bmw-status-card] Window error:",t.error||t.message||t)}),window.addEventListener("unhandledrejection",t=>{console.error("[bmw-status-card] Unhandled rejection:",t.reason)}))}get hass(){return this._hass}setConfig(t){this._config={...t,type:t.type||`custom:${ht}`}}async _loadIntegrationEntities(){if(this.hass)try{const t=await this.hass.callWS({type:"config/entity_registry/list"}),e=t.filter(t=>"bmw_home"===t.platform).map(t=>t.entity_id).sort(),i=t.filter(t=>"cardata"===t.platform).map(t=>t.entity_id).sort();this._bmwHomeEntities=e,this._bmwCardataEntities=i}catch(t){}}static{this.styles=r`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    .row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .field label {
      margin: 0;
    }
    ha-alert {
      margin-bottom: 8px;
    }
    ha-textarea {
      min-height: 80px;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-top: -6px;
    }
    .error {
      margin-top: 8px;
      color: var(--error-color, #b00020);
      white-space: pre-wrap;
    }
    select,
    ha-textfield,
    ha-textarea,
    ha-entity-picker {
      width: 100%;
    }
    select {
      padding: 10px 12px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 14px;
    }
  `}_setEditorError(t){const e=t instanceof Error?`${t.message}\n${t.stack||""}`:String(t);this._editorError=e,console.error("[bmw-status-card] Editor error:",t)}_emitConfigChanged(){if(!this._config)return;const t={...this._config,type:this._config.type||`custom:${ht}`};try{console.debug("[bmw-status-card] config-changed",t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})),this._editorError=void 0}catch(t){this._setEditorError(t)}}_setConfigValue(t,e){if(this._config)try{const i=t.split("."),s=[];let n={...this._config},r=n;for(let t=0;t<i.length-1;t+=1){const e=i[t];s.push({parent:r,key:e}),r[e]={...r[e]||{}},r=r[e]}const a=i[i.length-1];""===e||null==e?delete r[a]:r[a]=e;for(let t=s.length-1;t>=0;t-=1){const{parent:e,key:i}=s[t];e[i]&&0===Object.keys(e[i]).length&&delete e[i]}this._config=n,this._emitConfigChanged()}catch(t){this._setEditorError(t)}}_onValueChanged(t){const e=t.target,i=e?.dataset?.path;i&&this._setConfigValue(i,e.value)}_onImageModeChanged(t){const e=t.currentTarget,i=t.detail?.value??e?.value;if(!i||!["off","static","ai"].includes(i))return;if(console.debug("[bmw-status-card] image mode changed:",i),!this._config)return;const s={...this._config};"off"===i?delete s.image:s.image="static"===i?{...s.image||{},mode:"static",static_urls:s.image?.static_urls||[]}:{...s.image||{},mode:"ai",ai:s.image?.ai||{}},this._config=s,this._emitConfigChanged()}_onSelectChanged(t){const e=t.currentTarget,i=e?.dataset?.path;if(!i)return;const s=t.detail?.value??e?.value;this._setConfigValue(i,s)}_onListChanged(t){const e=t.target,i=e?.dataset?.path;if(!i)return;const s=(e.value||"").split(",").map(t=>t.trim()).filter(Boolean);this._setConfigValue(i,s.length?s:void 0)}async _resolveDeviceIdFromEntity(t,e){if(this.hass)try{const i=await this.hass.callWS({type:"config/entity_registry/get",entity_id:t});i?.device_id&&this._setConfigValue(e,i.device_id)}catch(t){}}async _onEntityPicked(t){const e=t.target,i=t.detail?.value??e?.value,s=e?.dataset?.target;i&&s&&("bmw_home_device_id"===s?this._bmwHomeEntity=i:"bmw_cardata_device_id"===s&&(this._bmwCardataEntity=i),await this._resolveDeviceIdFromEntity(i,s))}render(){if(!this._config)return j``;const t=this._config.image?.mode||"off",e=this._config.image?.ai||{};try{return j`
        <div class="form">
          ${this._editorError?j`<div class="error">${this._editorError}</div>`:null}
          <ha-alert alert-type="info">Benötigt bmw_home und bmw-cardata-ha Geräte-IDs.</ha-alert>

          <div class="row">
            <ha-textfield
              label="bmw_home Geräte-ID"
              .value=${this._config.bmw_home_device_id||""}
              data-path="bmw_home_device_id"
              @input=${this._onValueChanged}
            ></ha-textfield>
            <ha-textfield
              label="bmw-cardata-ha Geräte-ID"
              .value=${this._config.bmw_cardata_device_id||""}
              data-path="bmw_cardata_device_id"
              @input=${this._onValueChanged}
            ></ha-textfield>
          </div>

          <div class="row">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._bmwHomeEntity||""}
              .includeEntities=${this._bmwHomeEntities||[]}
              data-target="bmw_home_device_id"
              @value-changed=${this._onEntityPicked}
              label="bmw_home Entity (optional, gefiltert)"
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._bmwCardataEntity||""}
              .includeEntities=${this._bmwCardataEntities||[]}
              data-target="bmw_cardata_device_id"
              @value-changed=${this._onEntityPicked}
              label="bmw-cardata-ha Entity (optional, gefiltert)"
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="row">
            <ha-textfield
              label="vehicle-status-card Resource (optional)"
              .value=${this._config.vehicle_status_card_resource||""}
              data-path="vehicle_status_card_resource"
              @input=${this._onValueChanged}
            ></ha-textfield>
            <ha-textfield
              label="MapTiler API Key (optional)"
              .value=${this._config.maptiler_api_key||""}
              data-path="maptiler_api_key"
              @input=${this._onValueChanged}
            ></ha-textfield>
          </div>
          <div class="hint">Nur nötig, wenn vehicle-status-card nicht über HACS geladen wird.</div>

          <div class="field">
            <label class="hint">Bildmodus</label>
            <select @change=${t=>this._onImageModeChanged(t)} .value=${t}>
              <option value="off">off (keine Bilder)</option>
              <option value="static">static (URLs)</option>
              <option value="ai">ai (OpenAI/Gemini/Custom)</option>
            </select>
          </div>
          <div class="hint">Pflicht: keine. Optional: Bilder über AI oder feste URLs.</div>

          ${"static"===t?j`
                <ha-textarea
                  label="Statische Bild-URLs (kommagetrennt, optional)"
                  .value=${(this._config.image?.static_urls||[]).join(", ")}
                  data-path="image.static_urls"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Beispiel: https://.../front.jpg, https://.../rear.jpg</div>
              `:null}

          ${"ai"===t?j`
                <div class="row">
                  <div class="field">
                    <label class="hint">AI Provider</label>
                    <select
                      data-path="image.ai.provider"
                      @change=${t=>this._onSelectChanged(t)}
                      .value=${e.provider||"openai"}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="gemini">Gemini (Imagen)</option>
                      <option value="generic">Generic Endpoint</option>
                    </select>
                  </div>
                  <ha-textfield
                    label="AI API Key (erforderlich für OpenAI/Gemini)"
                    .value=${e.api_key||""}
                    data-path="image.ai.api_key"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <div class="row">
                  <ha-textfield
                    label="AI Model (optional)"
                    .value=${e.model||""}
                    placeholder="OpenAI: gpt-image-1 | Gemini: imagen-3.0-generate-002"
                    data-path="image.ai.model"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                  <div class="field">
                    <label class="hint">Bildgröße (OpenAI)</label>
                    <select
                      data-path="image.ai.size"
                      @change=${t=>this._onSelectChanged(t)}
                      .value=${e.size||"1024x1024"}
                    >
                      <option value="1024x1024">1024x1024</option>
                      <option value="1792x1024">1792x1024</option>
                      <option value="1024x1792">1024x1792</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="field">
                    <label class="hint">Aspect Ratio (Gemini)</label>
                    <select
                      data-path="image.ai.aspect_ratio"
                      @change=${t=>this._onSelectChanged(t)}
                      .value=${e.aspect_ratio||"1:1"}
                    >
                      <option value="1:1">1:1</option>
                      <option value="4:3">4:3</option>
                      <option value="3:4">3:4</option>
                      <option value="16:9">16:9</option>
                      <option value="9:16">9:16</option>
                    </select>
                  </div>
                  <ha-textfield
                    label="Anzahl pro Prompt"
                    .value=${e.count??""}
                    type="number"
                    placeholder="1"
                    data-path="image.ai.count"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                  <ha-textfield
                    label="Max Bilder (optional)"
                    .value=${e.max_images??""}
                    type="number"
                    placeholder="8"
                    data-path="image.ai.max_images"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <ha-textarea
                  label="Prompt Template (optional)"
                  .value=${e.prompt_template||""}
                  placeholder="High-quality photo of a {year} {color} {make} {model}, {angle}"
                  data-path="image.ai.prompt_template"
                  @input=${this._onValueChanged}
                ></ha-textarea>
                <div class="hint">Optional: nutze {angle} für Blickwinkel. Wenn leer, wird ein Default genutzt.</div>
                <ha-textarea
                  label="Views (kommagetrennt, optional)"
                  .value=${(e.views||[]).join(", ")}
                  placeholder="front 3/4 view, rear 3/4 view, side profile"
                  data-path="image.ai.views"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <ha-textarea
                  label="Prompts (kommagetrennt, optional)"
                  .value=${(e.prompts||[]).join(", ")}
                  placeholder="Eigene Prompts überschreiben views"
                  data-path="image.ai.prompts"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Optional: Bei Prompts wird {angle} ignoriert, Views sind dann optional.</div>
              `:null}
        </div>
      `}catch(t){return this._setEditorError(t),j`<div class="error">${this._editorError}</div>`}}}customElements.define(ht,dt),customElements.define("bmw-status-card-editor",pt),window.customCards=window.customCards||[],window.customCards.push({type:ht,name:"BMW Status Card",description:"Auto-Konfiguration für bmw_home + bmw-cardata-ha, basiert auf vehicle-status-card.",version:"0.1.14"});
//# sourceMappingURL=bmw-status-card.js.map
