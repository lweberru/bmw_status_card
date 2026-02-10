/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,_=globalThis,p=_.trustedTypes,g=p?p.emptyScript:"",m=_.reactiveElementPolyfillSupport,f=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,m?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=t=>t,E=$.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+C,T=`<${x}>`,M=document,P=()=>M.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,B="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,H=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,R=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),W=new WeakMap,G=M.createTreeWalker(M,129);function F(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",r=L;for(let e=0;e<i;e++){const i=t[e];let o,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===L?"!--"===l[1]?r=U:void 0!==l[1]?r=N:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=H):void 0!==l[3]&&(r=H):r===H?">"===l[0]?(r=n??L,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?H:'"'===l[3]?V:O):r===V||r===O?r=H:r===U||r===N?r=L:(r=H,n=void 0);const h=r===H&&t[e+1].startsWith("/>")?" ":"";a+=r===L?i+T:c>=0?(s.push(o),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?e:h)}return[F(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const r=t.length-1,o=this.parts,[l,c]=q(t,e);if(this.el=Y.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[a++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(o.push({type:6,index:n}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),G.nextNode(),o.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===x)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)o.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===D)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=I(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);G.currentNode=s;let n=G.nextNode(),a=0,r=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new Q(n,n.nextSibling,this,t):1===o.type?e=new o.ctor(n,o.name,o.strings,this,t):6===o.type&&(e=new st(n,this,t)),this._$AV.push(e),o=i[++r]}a!==o?.index&&(n=G.nextNode(),a++)}return G.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),I(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Y(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=J(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==D,a&&(this._$AH=t);else{const s=t;let r,o;for(t=n[0],r=0;r<n.length-1;r++)o=J(this,s[i+r],e,r),o===D&&(o=this._$AH[r]),a||=!I(o)||o!==this._$AH[r],o===K?t=K:t!==K&&(t+=(o??"")+n[r+1]),this._$AH[r]=o}a&&!s&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??K)===D)return;const i=this._$AH,s=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=$.litHtmlPolyfillSupport;nt?.(Y,Q),($.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const ot=at.litElementPolyfillSupport;ot?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.2");const lt="bmw-status-card",ct="vehicle-status-card",dt="High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}, clean studio background, realistic, sharp details.";class ht extends rt{constructor(){super(...arguments),this._loading=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_vehicleConfig:{state:!0},_error:{state:!0},_loading:{state:!0},_vehicleInfo:{state:!0}}}static{this.styles=a`
    :host {
      display: block;
    }
    .card-wrapper {
      position: relative;
    }
    .status-overlay {
      position: absolute;
      top: 55%;
      right: 12px;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 3;
      pointer-events: none;
      max-width: 60%;
    }
    .status-badge {
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color);
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(6px);
    }
    .status-badge.warning {
      background: rgba(255, 193, 7, 0.85);
      color: #1a1a1a;
    }
    .status-badge.alert {
      background: rgba(239, 83, 80, 0.9);
      color: #fff;
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
  `}set hass(t){this._hass=t,this._ensureConfig()}get hass(){return this._hass}setConfig(t){this._config=t,this._vehicleConfig=void 0,this._error=void 0,t?.bmw_home_device_id&&t?.bmw_cardata_device_id||(this._error="bmw_home_device_id und bmw_cardata_device_id sind erforderlich."),this._vehicleInfo=void 0,this._entityEntriesCache=void 0,this._deviceEntriesCache=void 0,this._ensureVehicleCardLoaded(),this._ensureConfig()}updated(){const t=this.renderRoot.querySelector(ct);if(t&&this.hass&&(t.hass=this.hass,this._vehicleConfig)){const e=this._hash(JSON.stringify(this._vehicleConfig));this._lastVehicleConfigKey!==e&&(this._lastVehicleConfigKey=e,t.setConfig(this._vehicleConfig))}this._maybeRefreshImagesOnStatusChange()}getCardSize(){return 6}static getConfigElement(){return document.createElement("bmw-status-card-editor")}static getStubConfig(){return{type:`custom:${lt}`,bmw_home_device_id:"",bmw_cardata_device_id:""}}async _ensureVehicleCardLoaded(){if(!this._config?.vehicle_status_card_resource)return;if(customElements.get(ct))return;document.querySelector(`script[data-bmw-status-card="${this._config.vehicle_status_card_resource}"]`)||await new Promise((t,e)=>{const i=document.createElement("script");i.type="module",i.src=this._config.vehicle_status_card_resource,i.dataset.bmwStatusCard=this._config.vehicle_status_card_resource,i.addEventListener("load",()=>t()),i.addEventListener("error",()=>e()),document.head.appendChild(i)})}async _ensureConfig(){if(this.hass&&this._config&&!this._loading&&!this._vehicleConfig&&this._config.bmw_home_device_id&&this._config.bmw_cardata_device_id){this._loading=!0,this._vehicleConfig||(this._vehicleConfig=void 0);try{console.debug("[bmw-status-card] building config");const t=[this._config.bmw_home_device_id,this._config.bmw_cardata_device_id].filter(Boolean),e=await this._getEntityRegistry(),i=await this._getDeviceRegistry(),s=this._buildEntityInfo(e,t),n=this._buildVehicleInfo(i,s);this._vehicleInfo=n;const a=this._buildVehicleStatusCardConfig(s,[],void 0);this._vehicleConfig=this._mergeVehicleConfig(a,this._config.vehicle_status_card),this.requestUpdate();const r=this._resolveImages(n),o=this._resolveTireCardImage(n,s),[l,c]=await Promise.all([r,o]);if(l.length||c){const t=this._buildVehicleStatusCardConfig(s,l,c||void 0);this._vehicleConfig=this._mergeVehicleConfig(t,this._config.vehicle_status_card)}this._error=void 0}catch(t){this._error=t?.message||String(t),console.error("[bmw-status-card] config build failed:",t)}finally{this._loading=!1,this.requestUpdate()}}}_maybeRefreshImagesOnStatusChange(){if(!this._config?.image||"ai"!==this._config.image.mode)return;const t=this._config.image.ai||{};if(!1!==t.generate_on_demand&&!t.generate_request_id)return;const e=this._getVehicleStatusLabel()||"unknown";this._lastImageStatus!==e&&(this._lastImageStatus=e,this._ensureConfig())}_toYaml(t,e=0){const i="  ".repeat(e);if(null==t)return"null";if("string"==typeof t){if(""===t||/[:#\-?{}[\],&*!|>'"%@`\n\r\t]/.test(t)){return`"${t.replace(/"/g,'\\"')}"`}return t}if("number"==typeof t||"boolean"==typeof t)return String(t);if(Array.isArray(t))return t.length?t.map(t=>{if(null!==t&&"object"==typeof t){const s=this._toYaml(t,e+1);return`${i}-\n${s}`}return`${i}- ${this._toYaml(t,e+1).trimStart()}`}).join("\n"):"[]";if("object"==typeof t){const s=Object.entries(t).filter(([,t])=>void 0!==t);return s.length?s.map(([t,s])=>{if(null!==s&&"object"==typeof s){const n=this._toYaml(s,e+1);return`${i}${t}:\n${n}`}return`${i}${t}: ${this._toYaml(s,e+1).trimStart()}`}).join("\n"):"{}"}return String(t)}async _getEntityRegistry(){if(this._entityEntriesCache)return this._entityEntriesCache;const t=await this.hass.callWS({type:"config/entity_registry/list"});return this._entityEntriesCache=t,t}async _getDeviceRegistry(){if(this._deviceEntriesCache)return this._deviceEntriesCache;const t=await this.hass.callWS({type:"config/device_registry/list"});return this._deviceEntriesCache=t,t}_buildEntityInfo(t,e){const i=new Set(e);return t.filter(t=>t.device_id&&i.has(t.device_id)).filter(t=>!t.disabled_by).map(t=>{const e=this.hass.states[t.entity_id],i=t.entity_id.split(".")[0],s=e?.attributes?.friendly_name||t.original_name||t.entity_id;return{entity_id:t.entity_id,domain:i,name:s,device_class:e?.attributes?.device_class,unit:e?.attributes?.unit_of_measurement,state:e?.state,attributes:e?.attributes||{}}})}_extractVehicleInfoFromAttributes(t){const e={};for(const i of t){const t=i.attributes||{},s=t.vehicle_basic_data||t.vehicleBasicData,n=t.vehicle_basic_data_raw||t.vehicleBasicDataRaw;s&&"object"==typeof s&&(e.model=e.model||this._toNonEmptyString(s.model_name),e.series=e.series||this._toNonEmptyString(s.series),e.color=e.color||this._toNonEmptyString(s.color),e.body=e.body||this._toNonEmptyString(s.body_type),e.year=e.year||this._extractYear(s.construction_date)),n&&"object"==typeof n&&(e.make=e.make||this._toNonEmptyString(n.brand),e.model=e.model||this._toNonEmptyString(n.modelName)||this._toNonEmptyString(n.modelRange)||this._toNonEmptyString(n.series),e.series=e.series||this._toNonEmptyString(n.series)||this._toNonEmptyString(n.seriesDevt),e.color=e.color||this._toNonEmptyString(n.colourDescription)||this._toNonEmptyString(n.colourCodeRaw),e.body=e.body||this._toNonEmptyString(n.bodyType),e.year=e.year||this._extractYear(n.constructionDate))}return e}_extractYear(t){if(t){if("number"==typeof t)return String(t);if("string"==typeof t){const e=t.match(/(19|20)\d{2}/);return e?e[0]:void 0}}}_toNonEmptyString(t){if(null==t)return;const e=String(t).trim();return e.length?e:void 0}_buildVehicleInfo(t,e){const i=this._config?.vehicle_info||{},s=[this._config?.bmw_home_device_id,this._config?.bmw_cardata_device_id],n=t.filter(t=>s.includes(t.id)),a=this._extractVehicleInfoFromAttributes(e),r=n.find(t=>t.manufacturer)?.manufacturer||"BMW",o=n.find(t=>t.model)?.model,l=n.find(t=>t.name)?.name,c=this._findEntityByKeywords(e,["model","vehicle_model","car_model"]),d=this._findEntityByKeywords(e,["series","line"]),h=this._findEntityByKeywords(e,["year","model_year"]),u=this._findEntityByKeywords(e,["color","colour"]),_=this._findEntityByKeywords(e,["trim","package","edition"]),p=this._findEntityByKeywords(e,["body","body_type"]),g=t=>{if(!t)return;const e=this.hass.states[t]?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:void 0};return{make:i.make||a.make||r,model:i.model||a.model||g(c)||o,series:i.series||a.series||g(d),year:i.year||a.year||g(h),color:i.color||a.color||g(u),trim:i.trim||a.trim||g(_),body:i.body||a.body||g(p),name:i.name||a.name||l}}async _resolveImages(t){const e=this._config?.image;if(!e||"off"===e.mode)return[];if("static"===e.mode&&e.static_urls?.length)return e.static_urls;if("ai"===e.mode&&e.ai){const i=e.ai.provider||"ha_ai_task";return"openai"!==i&&"gemini"!==i||e.ai.api_key?(console.debug("[bmw-status-card] generating AI images",e.ai),this._generateAiImages(t,e.ai)):(console.warn("[bmw-status-card] image.ai.api_key fehlt – überspringe Bildgenerierung."),[])}return[]}async _resolveTireCardImage(t,e){const i=this._config?.image;if(!i||"ai"!==i.mode||!i.ai)return;if(!this._findEntities(e,["sensor"],["tire","tyre","pressure","wheel","tpms","reifen","reifendruck","rad"],new Set).length)return;const s={...i.ai,views:["top-down view, directly above, centered, orthographic, clean studio background"],max_images:1,count:1};return(await this._generateAiImages(t,s))[0]}async _generateAiImages(t,e){const i=e.provider||"ha_ai_task",s=e.cache_hours??24,n=this._buildImageCacheKey(t,e),a=this._buildPrompts(t,e),r=e.count??1,o=e.max_images??8,l=!1!==e.generate_on_demand,c=this._getVehicleStatusLabel()||"unknown",d=e.upload??("openai"===i||"gemini"===i||"ha_ai_task"===i),h="ha_ai_task"===i||d;try{const t=localStorage.getItem(n);if(t){const e=JSON.parse(t),i=(Date.now()-e.timestamp)/36e5,n=e.images?.some(t=>!this._isCacheableImageUrl(t));if(e.images?.length&&i<=s&&!n&&e.status===c)return e.images}}catch(t){}if(l&&!e.generate_request_id)return[];let u=[];for(const t of a){if(u.length>=o)break;const s=o-u.length,n=Math.min(r,s);if(n<=0)break;"openai"===i?u.push(...await this._fetchOpenAiImages(t,e,n)):"gemini"===i?u.push(...await this._fetchGeminiImages(t,e,n)):"ha_ai_task"===i?u.push(...await this._fetchHaAiTaskImages(t,e,n)):u.push(...await this._fetchGenericImages(t,e,n))}if(u.length&&h&&(u=await this._uploadImagesIfNeeded(u,e)),u.length&&u.every(t=>this._isCacheableImageUrl(t)))try{localStorage.setItem(n,JSON.stringify({timestamp:Date.now(),images:u,status:c}))}catch(t){}return u}_buildPrompts(t,e){const i=e.prompt_template||dt;if(e.prompts&&e.prompts.length)return e.prompts.map(e=>this._buildPrompt(t,e));if(this._isHomeParked()&&(!e.views||!e.views.length)){return["front 3/4 view, parked on a residential driveway in front of a modern house, daytime"].map(e=>this._buildPrompt(t,i,e))}return(e.views?.length?e.views:["front 3/4 view","rear 3/4 view","side profile","front view","rear view"]).map(e=>this._buildPrompt(t,i,e))}_buildPrompt(t,e,i){const s=e||dt,n=this._getVehicleStatusLabel(),a=this._getStatusScene(n),r={"{make}":t.make||"BMW","{model}":t.model||"","{series}":t.series||"","{year}":t.year||"","{color}":t.color||"","{trim}":t.trim||"","{body}":t.body||"","{angle}":i||"","{status}":a||n||""};let o=s;return Object.entries(r).forEach(([t,e])=>{const i=e?.trim();o=o.replaceAll(t,i||"")}),i&&!s.includes("{angle}")&&(o=`${o} ${i}`),!a&&!n||s.includes("{status}")||(o=a?`${o} ${a}`:`${o} status: ${n}`),o.replace(/\s+/g," ").trim()}_getStatusScene(t){if(!t)return;const e=this._normalizeText(t);return e.includes("driving")?"driving on the road, motion blur, dynamic scene":e.includes("parking")||e.includes("parked")?"parked in a parking lot, stationary":e.includes("standing")||e.includes("stand")?"stopped at a traffic light or intersection, stationary":void 0}_isHomeParked(){if(!this.hass||!this._deviceTrackerEntity)return!1;const t=this.hass.states[this._deviceTrackerEntity]?.state,e="home"===t?.toLowerCase(),i=this._getVehicleStatusLabel();return Boolean(e&&i&&["parking","parked"].includes(i))}async _fetchOpenAiImages(t,e,i){if(!e.api_key)throw new Error("image.ai.api_key fehlt (OpenAI).");const s=e.endpoint||"https://api.openai.com/v1/images/generations",n={model:e.model||"gpt-image-1",prompt:t,size:e.size||"1024x1024",n:i},a=await fetch(s,{method:"POST",headers:{Authorization:`Bearer ${e.api_key}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!a.ok){const t=await a.text();throw new Error(`OpenAI Fehler: ${a.status} ${t}`)}const r=await a.json();return(r?.data||[]).map(t=>t.url||t.b64_json).filter(Boolean).map(t=>t.startsWith("http")?t:`data:image/png;base64,${t}`)}async _fetchGeminiImages(t,e,i){if(!e.api_key)throw new Error("image.ai.api_key fehlt (Gemini).");const s=e.model||"imagen-3.0-generate-002",n=e.endpoint||`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${e.api_key}`,a=e=>{const s={contents:[{role:"user",parts:[{text:t}]}],generationConfig:{candidateCount:i}};return e&&(s.responseModalities=["IMAGE"]),s},r=e.request_body||a(!0),o=async t=>await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});let l=await o(r),c="";if(!l.ok){c=await l.text();if(!(!e.request_body&&(c.includes("response_modalities")||c.includes("responseModalities")||c.includes("imageGenerationConfig")||c.includes("generation_config"))))throw new Error(`Gemini Fehler: ${l.status} ${c}`);if(l=await o(a(!1)),!l.ok){const t=await l.text();throw new Error(`Gemini Fehler: ${l.status} ${t}`)}}const d=await l.json(),h=d?.candidates||[],u=[];if(Array.isArray(h)&&h.forEach(t=>{"SAFETY"===t?.finishReason&&console.warn("[bmw-status-card] Gemini Bild durch Safety-Filter blockiert.");(t?.content?.parts||[]).forEach(t=>{const e=t.inlineData||t.inline_data;if(e?.data){const t=e.mimeType||"image/png";u.push(`data:${t};base64,${e.data}`)}})}),u.length)return u;const _=d?.predictions||d?.images||d?.data||[];return Array.isArray(_)?_.map(t=>{const e=t.bytesBase64Encoded||t?.image?.bytesBase64Encoded||t?.b64_json;return e?`data:image/png;base64,${e}`:"string"==typeof t&&t.startsWith("http")?t:t?.url?t.url:null}).filter(Boolean):[]}async _fetchHaAiTaskImages(t,e,i){if(!this.hass)throw new Error("Home Assistant nicht verfügbar.");const s=this._normalizeEntityId(e.ha_entity_id),n={task_name:this._vehicleInfo?.name||this._config?.vehicle_info?.name||"BMW Status Card",instructions:t};s&&(n.entity_id=s);for(let t=1;t<=2;t+=1)try{const e=await this.hass.callWS({type:"call_service",domain:"ai_task",service:"generate_image",service_data:n,return_response:!0}),i=e?.response??e?.result??e,s=await this._extractHaAiTaskUrls(i);if(s.length)return s.filter(Boolean);if(console.warn("[bmw-status-card] ai_task: keine Bild-URL erhalten.",i),t<2){await this._delay(600);continue}return[]}catch(e){const i=e?.message||String(e),s=/response did not include image|no image|keine.*bild/i.test(i);if(s&&t<2){console.warn("[bmw-status-card] ai_task: leere Bild-Antwort, retry …"),await this._delay(600);continue}if(s)return console.warn("[bmw-status-card] ai_task: keine Bilddaten, überspringe."),[];throw new Error(`ai_task Fehler: ${i}`)}return[]}async _delay(t){await new Promise(e=>setTimeout(e,t))}async _uploadImagesIfNeeded(t,e){if(!this.hass)return t;const i=e.provider||"ha_ai_task",s=this._normalizeUploadPath(e.upload_path),n=[];for(const e of t){let t,a,r;if(this._isHttpUrl(e))t=e;else{const t=this._parseDataUrl(e);if(t)a=t.data,r=t.mimeType;else if(e.startsWith("/")){const t="ha_ai_task"===i?this._normalizeHaAiTaskUrl(e):e,s=await this._fetchAsDataUrl(t),o=s?this._parseDataUrl(s):null;if(!o){if("ha_ai_task"===i)continue;n.push(e);continue}a=o.data,r=o.mimeType}else{if("ha_ai_task"!==i||!e.startsWith("ai_task/")){if("ha_ai_task"===i)continue;n.push(e);continue}{const t=this._normalizeHaAiTaskUrl(e),i=await this._fetchAsDataUrl(t),s=i?this._parseDataUrl(i):null;if(!s)continue;a=s.data,r=s.mimeType}}}const o=this._guessImageExtension(t,r),l=t||a||e,c=`${this._hash(l)}.${o}`;try{const i=await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:s,filename:c,...t?{url:t}:{data_base64:a}},return_response:!0}),r=i?.response??i?.result??i,o=r?.local_url||r?.url||r?.local_path;n.push(this._normalizeLocalUploadUrl(o)||e)}catch(t){"ha_ai_task"!==i&&n.push(e)}}return n}_normalizeUploadPath(t){const e=(t||"www/upload_file").replace(/^\/+/,"").replace(/\/+$/,"");return e.startsWith("www/")?e:`www/${e}`}_normalizeLocalUploadUrl(t){if(!t)return;const e=t.trim();return e?e.startsWith("/local/")?e:e.startsWith("local/")?`/${e}`:e.startsWith("www/")?`/local/${e.replace(/^www\//,"")}`:e.includes("/www/")?`/local/${e.split("/www/")[1]}`:e:void 0}_parseDataUrl(t){if(!t.startsWith("data:"))return null;const e=t.match(/^data:([^;]+);base64,(.*)$/);return e?{mimeType:e[1],data:e[2]}:null}async _fetchAsDataUrl(t){const e=async t=>{try{const e=await fetch(t,{credentials:"same-origin"});if(!e.ok)return null;const i=await e.blob();return await new Promise((t,e)=>{const s=new FileReader;s.onloadend=()=>t(String(s.result||"")),s.onerror=()=>e(s.error),s.readAsDataURL(i)})}catch(t){return null}},i=[t],[s]=t.split("?");s&&s!==t&&i.push(s),s.startsWith("/ai_task/")?i.push(`/api${s}`):s.startsWith("/api/ai_task/")&&i.push(s.replace("/api/ai_task/","/ai_task/"));for(const t of i){const i=await e(t);if(i)return i}return null}_guessImageExtension(t,e){if(e){if(e.includes("png"))return"png";if(e.includes("jpeg")||e.includes("jpg"))return"jpg";if(e.includes("webp"))return"webp"}if(t){const e=t.match(/\.(png|jpg|jpeg|webp)(\?|$)/i);if(e)return e[1].toLowerCase().replace("jpeg","jpg")}return"png"}_isHttpUrl(t){return t.startsWith("http://")||t.startsWith("https://")}_isCacheableImageUrl(t){const e=t.toLowerCase();return!e.includes("/ai_task/")&&!e.includes("authsig=")}async _extractHaAiTaskUrls(t){if(!t)return[];const e=t?.images||t?.data||t?.results||t?.result||t,i=Array.isArray(e)?e:[e],s=[];for(const t of i){if(!t)continue;if("string"==typeof t){s.push(this._normalizeHaAiTaskUrl(t));continue}const e=t.url||t.image_url||t.media_url||t.content_url||t.media?.url||t.image?.url||t.local_url||t.local_path;if(e){s.push(this._normalizeHaAiTaskUrl(String(e)));continue}const i=t.media_id||t.media_content_id||t.content_id||t.media;if(i){const t=await this._resolveMediaSourceUrl(String(i));t?s.push(this._normalizeHaAiTaskUrl(t)):s.push(`/api/media/${i}`)}}return s}_normalizeHaAiTaskUrl(t){const e=t.trim();return e?e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/ai_task/")?e:e.startsWith("ai_task/")?`/${e}`:e:t}async _resolveMediaSourceUrl(t){if(this.hass&&t)try{if(t.startsWith("http"))return t;const e=await this.hass.callWS({type:"media_source/resolve",media_content_id:t});return e?.url}catch(t){return}}async _fetchGenericImages(t,e,i){if(!e.endpoint)throw new Error("image.ai.endpoint fehlt (generic).");const s=e.request_body||{prompt:t,count:i,size:e.size},n=await fetch(e.endpoint,{method:"POST",headers:{...e.api_key?{Authorization:`Bearer ${e.api_key}`}:{},"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const t=await n.text();throw new Error(`AI Fehler: ${n.status} ${t}`)}const a=await n.json(),r=this._extractByPath(a,e.response_path)||a.images||a.data||[];return Array.isArray(r)?r.map(t=>"string"==typeof t?t:t.url||t.image||t.b64_json).filter(Boolean).map(t=>t.startsWith("http")?t:`data:image/png;base64,${t}`):[]}_extractByPath(t,e){if(e)return e.split(".").reduce((t,e)=>t?t[e]:void 0,t)}_buildImageCacheKey(t,e){const i=this._getVehicleStatusLabel(),s=this._getStatusScene(i),n={vehicleInfo:t,provider:e.provider,model:e.model,size:e.size,aspect_ratio:e.aspect_ratio,count:e.count,max_images:e.max_images,upload:e.upload,upload_path:e.upload_path,prompt_template:e.prompt_template,prompts:e.prompts,views:e.views,status_label:i,status_scene:s,home_parked:this._isHomeParked(),generate_request_id:!1!==e.generate_on_demand?e.generate_request_id:void 0};return`bmw-status-card:images:${this._hash(JSON.stringify(n))}`}_hash(t){let e=0;for(let i=0;i<t.length;i+=1)e=(e<<5)-e+t.charCodeAt(i),e|=0;return String(e)}_buildVehicleStatusCardConfig(t,e,i){const s=new Set,n=this._pickEntity(t,s,["lock","binary_sensor","sensor"],["lock","locked","door lock","verriegelt","schloss","türschloss"]),a=this._pickEntity(t,s,["binary_sensor","sensor"],["charging","charge","plugged","plug","charging port","connector","port","laden","lade","stecker","anschluss","ladeklappe"]),r=this._pickEntity(t,s,["sensor"],["battery health","state of health","soh","health_state","battery_health","battery health state","health state","health_state_48v","48v health","48v battery health","battery_health_state_48v"]),o=["state_of_charge","state of charge","soc","state_of_energy","soe","ladezustand","batteriestand","charge level","charge_level","charge level at end of trip","trip_battery_charge_level","soc bei ankunft","state_of_charge_predicted","state_of_charge_predicted_on_integration_side"];let l=this._pickEntity(t,s,["sensor"],o);const c=this._selectBestBatteryCharge(t,o);!c||l&&!this._isEntityUnavailable(t,l)||(l=c,s.add(c));const d=this._pickEntity(t,s,["sensor"],["fuel","tank","fuel_level","kraftstoff","tankinhalt","tankfüllung","tankfuellung","kraftstoffstand","tank level","range tank level"]),h=this._pickEntity(t,s,["sensor"],["range","remaining","remaining_range","remainingrange","reichweite","restreichweite","reichweite_km","range total","total range","range_total_range","total_range","range_total_range_last_sent"]),u=this._pickEntity(t,s,["sensor"],["electric range","ev range","remaining electric range","kombi remaining electric range","elektrische reichweite","ev-reichweite"]),_=this._pickEntity(t,s,["sensor"],["fuel range","remaining fuel","tank level","kraftstoffreichweite"]),p=this._pickEntity(t,s,["sensor"],["total remaining range","total range","gesamtreichweite"]),g=this._pickEntity(t,s,["sensor","number"],["charge target","target soc","target state","charge limit","charge_limit","charge_limit_soc","ladeziel","ladegrenze","ladegrenze soc"]),m=this._pickEntity(t,s,["sensor"],["odometer","mileage","distance","travelled","kilometerstand","kilometer","odo","vehicle mileage"]),f=this._pickEntity(t,s,["sensor"],["temperature","temp","coolant","temperatur","innen","innenraum"]),y=this._pickEntity(t,s,["sensor"],["charging power","charge power","power","grid energy","ladeleistung","leistung"]),v=this._pickEntity(t,s,["sensor"],["time remaining","time to fully","time to full","remaining time","restzeit","ladezeit","verbleibend"]);this._pickEntity(t,s,["binary_sensor","sensor","switch"],["preconditioning","climatization","climate","hvac","defrost","vorklimatisierung","klimatisierung","vorheizen","klima"]);const b=this._findEntity(t,["sensor"],["preconditioning state","preconditioning activity","preconditioning status","standklima","vorklimatisierung"],new Set)?.entity_id,w=this._findEntity(t,["sensor"],["preconditioning error","preconditioning error reason","vorklimatisierung fehler","standklima fehler"],new Set)?.entity_id,$=this._findEntity(t,["sensor"],["preconditioning remaining time","preconditioning remaining","standklima rest","vorklimatisierung rest"],new Set)?.entity_id,k=this._findEntity(t,["binary_sensor","sensor"],["preconditioning engine used","remote engine running","engine used"],new Set)?.entity_id,E=this._findEntity(t,["binary_sensor","sensor"],["preconditioning engine use allowed","remote engine start allowed","engine use allowed"],new Set)?.entity_id,A=this._pickEntity(t,s,["binary_sensor","sensor"],["engine","ignition","motor","zündung","zuendung"]),S=this._pickEntity(t,s,["sensor"],["bmw_pwf_status","pwf status","pwf_status"]),C=S||this._pickEntity(t,s,["binary_sensor","sensor"],["moving","motion","driving","parking","fährt","bewegt","parked","stand","status","fahrstatus","pwf","pwf status"]),x=this._pickEntity(t,s,["binary_sensor","sensor"],["alarm","anti theft","anti-theft","diebstahl","security","alarmsystem"]),T=this._pickEntity(t,s,["sensor"],["alarm arming","alarm_arming","alarm arming state","alarm_arming_state","arming"]),M=this._detectElectrification(t,r,l,a,u,d),P="bev"===M||"phev"===M,I=this._is48vEntity(r),z=e=>{if(!e)return!1;const i=t.find(t=>t.entity_id===e);return!i||("sensor"!==i.domain||!this._isNumericState(i.state))},B=[];n&&z(n)&&B.push({type:"entity",entity:n,icon:"mdi:lock"}),a&&P&&z(a)&&B.push({type:"entity",entity:a,icon:"mdi:ev-station"});const L=[];if(A&&z(A)&&L.push({type:"entity",entity:A,icon:"mdi:engine"}),C&&z(C)){const t={type:"entity",entity:C,icon:"mdi:car"};S&&C===S&&(t.icon_template=this._buildPwfStatusIconTemplate(C)),L.push(t)}x&&z(x)&&L.push({type:"entity",entity:x,icon:"mdi:alarm-light"}),T&&z(T)&&L.push({type:"entity",entity:T,icon:"mdi:shield-lock",icon_template:this._buildAlarmArmingIconTemplate(T)});const U=this._pickEntities(t,s,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","flap","lock","charging port","port","tür","fenster","kofferraum","heckklappe","motorhaube","schiebedach","dach","klappe","panoramadach","door state","doors overall","window state","sunroof state","sunroof tilt","tailgate door","tailgate rear window","tailgate state"]),N=this._pickEntities(t,s,["sensor"],["tire","tyre","pressure","wheel","tpms","pressure target","reifen","reifendruck","rad","solldruck","target pressure","tire pressure target"]);this._pickEntities(t,s,["sensor"],["tire temperature","tyre temperature","wheel temperature","reifentemperatur"]);const H=N.filter(t=>this._isTireTargetEntity(t)),O=N.filter(t=>!this._isTireTargetEntity(t)),V=this._pickEntities(t,s,["binary_sensor","sensor","switch"],["light","lights","headlight","lamp","running light","licht","scheinwerfer","abblendlicht","fernlicht"]),j=this._pickEntities(t,s,["binary_sensor","sensor","switch","climate"],["climate","hvac","preconditioning","standklima","vorklimatisierung","defrost","seat","steering wheel","air purification","heater","heating","cooling","klima","sitzheizung","lenkrad","heizung","kühlung","aircon","ac","klimastatus","climate timer"]),R=this._pickEntities(t,s,["sensor","binary_sensor"],["service","inspection","cbs","check control","maintenance","wartung","inspektion","servicebedarf"]),D=this._pickEntities(t,s,["sensor","device_tracker"],["navigation","destination","eta","latitude","longitude","gps","ziel","ankunft","route","routing","navi","position","lat","lon","navigationsstatus","navigationsziel","ankunftsort","ankunftsort breitengrad","ankunftsort längengrad","ankunftsort laengengrad"]),K=this._pickEntities(t,s,["sensor","binary_sensor","switch","number"],["charging","charge","plug","connector","charging mode","charging power","time to fully","charge target","laden","lade","ladeziel","ladestatus","ladekabel"]),W=[];B.length&&W.push({row_items:B,alignment:"center",no_wrap:!0}),L.length&&W.push({row_items:L,alignment:"center",no_wrap:!0});const G=[],F=V.filter(t=>z(t));F.length&&G.push({type:"group",name:"Licht",icon:"mdi:car-light-high",items:F.map(t=>({type:"entity",entity:t}))}),G.length&&W.push({row_items:G,alignment:"center",no_wrap:!0});const q=this._isHybridBatteryChargeEntity(l),Y=P?"Batterie":I||q?"48V Batterie (Ladung)":"12V Batterie",J=I?"48V Batteriegesundheit":"Batteriegesundheit",Z=[];l&&P&&Z.push({title:"Batterie Ladestand",icon:"mdi:battery",energy_level:{entity:l,hide_icon:!0},range_level:u||p||h?{entity:u||p||h,hide_icon:!0}:void 0,charging_entity:a||void 0,charge_target_entity:g||void 0}),!r||I&&!P||Z.push({title:J,icon:"mdi:battery-heart",energy_level:{entity:r,max_value:100,hide_icon:!0},color_template:this._buildBatteryHealthColorTemplate(r)}),d&&"bev"!==M&&Z.push({title:"Tankfüllstand",icon:"mdi:gas-station",energy_level:{entity:d,hide_icon:!0},range_level:_||p||h?{entity:_||p||h,hide_icon:!0}:void 0,color_template:this._buildLowFuelColorTemplate(d)}),!Z.length&&h&&Z.push({title:"Reichweite",icon:"mdi:map-marker-distance",energy_level:{entity:h,hide_icon:!0}});const Q=t.filter(t=>"device_tracker"===t.domain).map(t=>t.entity_id),X=Q[0];this._deviceTrackerEntity=X;const tt=this._buildTireCardConfig(t,i),et=new Set(tt?.entities||[]);this._statusEntities={fuel:d,motion:C,doors:U,tires:O,tireTargets:H};const it=[],st=[],nt=[],at=(t,e,i,s)=>{e&&t.push({entity:e,name:i,icon:s})};if(at(st,l,Y,"mdi:battery"),at(st,r,J,"mdi:battery-heart"),at(st,d,"Kraftstoff","mdi:gas-station"),at(st,u||p||h,"Reichweite","mdi:map-marker-distance"),at(st,m,"Kilometerstand","mdi:counter"),at(st,f,"Temperatur","mdi:thermometer"),P&&(at(st,v,"Ladezeit","mdi:timer"),at(st,y,"Ladeleistung","mdi:flash")),at(st,C,"Fahrstatus","mdi:car"),at(st,T,"Alarmanlage","mdi:shield-lock"),R.forEach(t=>at(nt,t)),st.length&&(it.push({name:"Fahrzeug",icon:"mdi:car-info",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Fahrzeugstatus",items:st}]}}),st.forEach(t=>et.add(t.entity))),nt.length&&(it.push({name:"Service",icon:"mdi:wrench",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Service",items:nt}]}}),nt.forEach(t=>et.add(t.entity))),U.length){const e=this._buildDoorTemplates(U,C);it.push({name:"Öffnungen",icon:"mdi:car-door",button_type:"default",card_type:"default",notify:e.notify,notify_icon:e.notify_icon,notify_color:e.notify_color,color_template:e.color,sub_card:{default_card:[{title:"Öffnungen",items:U.map(e=>({entity:e,name:this._getDoorLabel(e,t)}))}]}}),U.forEach(t=>et.add(t))}if(tt?.tire_card){const t=this._buildTirePressureTemplates(O,H);it.push({name:"Reifen",icon:"mdi:car-tire-alert",button_type:"default",card_type:"tire",notify:t.notify,notify_icon:t.notify_icon,notify_color:t.notify_color,color_template:t.color,sub_card:{tire_card:tt.tire_card}}),(tt.entities||[]).forEach(t=>et.add(t))}if(P&&K.length&&(it.push({name:"Laden",icon:"mdi:ev-station",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Ladezustand",items:K.map(t=>({entity:t}))}]}}),K.forEach(t=>et.add(t))),j.length){const e=this._buildPreconditioningTemplates(b,w,$,k,E);it.push({name:"Klima",icon:"mdi:car-defrost-front",button_type:"default",card_type:"default",notify:e.notify,notify_icon:e.notify_icon,notify_color:e.notify_color,color_template:e.color,sub_card:{default_card:[{title:"Klima",items:j.map(e=>({entity:e,name:this._getClimateLabel(e,t)}))}]}}),j.forEach(t=>et.add(t))}D.length&&(it.push({name:"Navigation",icon:"mdi:navigation",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Navigation",items:D.map(t=>({entity:t}))}]}}),D.forEach(t=>et.add(t)));const rt=[...it,...this._buildButtonCards(t,s,et)],ot=e.length?e.map(t=>({image:t})):void 0;return{type:`custom:${ct}`,name:this._vehicleInfo?.name||"BMW",indicator_rows:W.length?W:void 0,range_info:Z.length?Z:void 0,button_cards:rt.length?rt:void 0,images:ot,mini_map:X?{device_tracker:X,entities:Q,maptiler_api_key:this._config?.maptiler_api_key,maptiler_style:this._config?.maptiler_style,enable_popup:!0,map_height:240,map_zoom:14,user_location:!0,use_zone_name:!0}:void 0,layout_config:{section_order:["indicators","range_info","images","mini_map","buttons"],button_grid:{columns:2,swipe:!0},images_swipe:{autoplay:!0,loop:!0,delay:6e3,speed:600,effect:"fade",height:240},range_info_config:{layout:"row"},single_tire_card:void 0}}}_buildButtonCards(t,e,i){const s=["lock","switch","button","cover","climate"],n=new Set([...e,...i?Array.from(i):[]]),a=t.filter(t=>!n.has(t.entity_id)).sort((t,e)=>{const i=s.indexOf(t.domain),n=s.indexOf(e.domain);return(-1===i?999:i)-(-1===n?999:n)}),r=[];for(const t of a){if(r.length>=12)break;s.includes(t.domain)&&(e.add(t.entity_id),n.add(t.entity_id),r.push({entity:t.entity_id,name:t.name,button_type:"default"}))}return r}_mergeVehicleConfig(t,e){if(!e)return t;const i={...t,...e};return["indicator_rows","range_info","images","button_cards"].forEach(t=>{void 0!==e[t]&&(i[t]=e[t])}),void 0!==e.mini_map&&(i.mini_map=e.mini_map),void 0!==e.layout_config&&(i.layout_config=e.layout_config),i}_pickEntity(t,e,i,s){const n=this._findEntity(t,i,s,e);if(n)return e.add(n.entity_id),n.entity_id}_pickEntities(t,e,i,s){const n=this._findEntities(t,i,s,e);return n.forEach(t=>e.add(t.entity_id)),n.map(t=>t.entity_id)}_findEntity(t,e,i,s){return this._findEntities(t,e,i,s)[0]}_findEntities(t,e,i,s){const n=i.map(t=>this._normalizeText(t));return t.filter(t=>!s.has(t.entity_id)).filter(t=>!e.length||e.includes(t.domain)).filter(t=>{if(!n.length)return!0;const e=this._normalizeText(`${t.entity_id} ${t.name} ${t.device_class??""}`);return n.some(t=>e.includes(t))}).sort((t,e)=>{const i=t.state||"",s=e.state||"";return"unknown"===i&&"unknown"!==s?1:"unknown"===s&&"unknown"!==i?-1:t.name.localeCompare(e.name)})}_normalizeText(t){return t.toLowerCase().normalize("NFD").replace(/[\0-]/g," ").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim()}_getEntityLabel(t,e){const i=e.find(e=>e.entity_id===t),s=i?.name?.trim();return s?this._stripVehiclePrefix(s):this._beautifyEntityName(t)}_stripVehiclePrefix(t){const e=this._getVehiclePrefixes();if(!e.length)return t;const i=t.toLowerCase();for(const s of e){const e=s.toLowerCase();if(i.startsWith(e))return t.slice(s.length).trim()}return t}_getVehiclePrefixes(){const t=this._vehicleInfo;if(!t)return[];const e=[t.name,`${t.make||""} ${t.model||""}`.trim(),t.model,t.series,t.trim].filter(Boolean);return Array.from(new Set(e.map(t=>t.trim()).filter(Boolean)))}_stripPrefixToKeyword(t,e){const i=t.toLowerCase(),s=e.map(t=>i.indexOf(t)).filter(t=>t>=0).sort((t,e)=>t-e)[0];return void 0===s?t:t.slice(s).trim()}_getDoorLabel(t,e){const i=e.find(e=>e.entity_id===t),s=this._stripVehiclePrefix(i?.name?.trim()||t),n=this._stripPrefixToKeyword(s,["door","window","tailgate","hood","sunroof"]),a=this._normalizeText(n),r=t=>a.includes("front")&&a.includes("driver")?`${t} vorn links`:a.includes("front")&&a.includes("passenger")?`${t} vorn rechts`:a.includes("rear")&&a.includes("driver")?`${t} hinten links`:a.includes("rear")&&a.includes("passenger")?`${t} hinten rechts`:void 0;return a.includes("doors overall")?"Türen gesamt":a.includes("door state")?r("Tür")||"Tür":a.includes("window state")?r("Fenster")||"Fenster":a.includes("tailgate rear window")?"Heckscheibe":a.includes("tailgate door")||a.includes("tailgate state")?"Heckklappe":a.includes("trunk")||a.includes("boot")?"Kofferraum":a.includes("hood")||a.includes("bonnet")?"Motorhaube":a.includes("sunroof overall")?"Schiebedach gesamt":a.includes("sunroof tilt")?"Schiebedach gekippt":a.includes("sunroof")?"Schiebedach":this._stripVehiclePrefix(i?.name?.trim()||this._beautifyEntityName(t))}_getClimateLabel(t,e){const i=e.find(e=>e.entity_id===t),s=this._stripVehiclePrefix(i?.name?.trim()||t),n=this._stripPrefixToKeyword(s,["climate","preconditioning"]),a=this._normalizeText(n);if(a.includes("climate timer")){const t=a.includes("weekly 1")?"Klima-Timer Woche 1":a.includes("weekly 2")?"Klima-Timer Woche 2":a.includes("next only")?"Klima-Timer Nächster":"Klima-Timer";return a.includes("hour")?`${t} (Stunde)`:a.includes("minute")?`${t} (Minute)`:a.includes("state")?`${t} (Status)`:t}return a.includes("preconditioning engine used")?"Vorklimatisierung Motor verwendet":a.includes("preconditioning error")?"Vorklimatisierung Fehler":a.includes("preconditioning state")?"Vorklimatisierung Status":this._stripVehiclePrefix(i?.name?.trim()||this._beautifyEntityName(t))}_beautifyEntityName(t){const e=(t.split(".").pop()||t).split("_").filter(Boolean).map(t=>t.toLowerCase()),i={door:"Tür",doors:"Türen",window:"Fenster",windows:"Fenster",trunk:"Kofferraum",tailgate:"Heckklappe",boot:"Kofferraum",hood:"Motorhaube",bonnet:"Motorhaube",sunroof:"Schiebedach",roof:"Dach",flap:"Klappe",lock:"Schloss",charging:"Laden",port:"Port",front:"vorn",rear:"hinten",left:"links",right:"rechts",climate:"Klima",hvac:"Klima",preconditioning:"Vorklimatisierung",defrost:"Enteisung",seat:"Sitz",steering:"Lenkrad",heater:"Heizung",heating:"Heizung",cooling:"Kühlung",air:"Luft",purification:"Reinigung",timer:"Timer",status:"Status"},s=e.map(t=>i[t]||t).join(" ").replace(/\s+/g," ").trim();return s?s.charAt(0).toUpperCase()+s.slice(1):t}_normalizeEntityId(t){if(!t)return;if(Array.isArray(t)){const e=t.length?String(t[0]).trim():"";return this._normalizeEntityId(e)}if("object"==typeof t){const e=t.entity_id??t.entityId;return this._normalizeEntityId(e)}const e=String(t).trim();if(e){if(e.includes(",")){const t=e.split(",")[0].trim();return this._normalizeEntityId(t)}if(e.includes(".")&&!/\s/.test(e))return e}}_findEntityByKeywords(t,e){return this._findEntity(t,[],e,new Set)?.entity_id}_isNumericState(t){if(null==t)return!1;if("number"==typeof t)return!Number.isNaN(t);const e=String(t).trim().replace(",",".");return!!e&&!Number.isNaN(Number(e))}_buildTireCardConfig(t,e){const i=e=>this._findEntity(t,["sensor"],e,new Set),s=i(["front left","front_left","row1 left","row1 wheel left"]),n=i(["front right","front_right","row1 right","row1 wheel right"]),a=i(["rear left","rear_left","row2 left","row2 wheel left"]),r=i(["rear right","rear_right","row2 right","row2 wheel right"]),o=new Map;t.forEach(t=>{if(!this._isTireTargetEntity(t.entity_id))return;const e=this._tirePositionKey(t.entity_id);e&&o.set(e,t.entity_id)});const l=(t,e)=>{if(!t)return;const i=this._tirePositionKey(t.entity_id),s=i?o.get(i):void 0,n={entity:t.entity_id,name:e,color:this._buildSingleTireColorTemplate(t.entity_id,s)};return s&&(n.additional_entities=[{entity:s,prefix:"Soll: "}]),{config:n,target:s}},c=l(s,"Vorne links"),d=l(n,"Vorne rechts"),h=l(a,"Hinten links"),u=l(r,"Hinten rechts"),_=[s,n,a,r].filter(Boolean).map(t=>t.entity_id),p=[c?.target,d?.target,h?.target,u?.target].filter(Boolean);if(!_.length)return;return{tire_card:{title:"Reifendruck",...e?{background:e}:{},front_left:c?.config,front_right:d?.config,rear_left:h?.config,rear_right:u?.config},entities:[..._,...p]}}_buildSingleTireColorTemplate(t,e){return e?`{% set av = states('${t}') | float(0) %}{% set tv = states('${e}') | float(0) %}{% set state = 'ok' %}{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}{% if av < err %}{% set state = 'error' %}{% elif av < warn %}{% set state = 'warn' %}{% endif %}{% elif av > 0 %}{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}{% endif %}{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`:`{% set av = states('${t}') | float(0) %}{% set state = 'ok' %}{% if av > 0 %}{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}{% endif %}{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`}_isTireTargetEntity(t){const e=this._normalizeText(t);return e.includes("target")||e.includes("solldruck")}_isDoorSummaryEntity(t){const e=this._normalizeText(t);return e.includes("overall")||e.includes("hood")||e.includes("tailgate")||e.includes("sunroof overall")}_getVehicleStatusLabel(){const t=this._statusEntities?.motion;if(!t||!this.hass)return;const e=this.hass.states[t]?.state;if(!e)return;const i=this._normalizeText(e);return i.includes("driving")||i.includes("fahrt")?"driving":i.includes("standing")||i.includes("stand")?"standing":i.includes("park")||i.includes("parken")?"parking":e}_buildTirePressureTemplates(t,e){const i=this._buildTirePressureTemplateBase(t,e);return i?{notify:`${i}{{ ns.state in ['warn','error'] }}`,color:`${i}{{ iif(ns.state == 'error', 'var(--error-color)', iif(ns.state == 'warn', 'var(--warning-color)', 'var(--secondary-text-color)')) }}`,notify_color:`${i}{{ iif(ns.state == 'error', 'var(--error-color)', 'var(--warning-color)') }}`,notify_icon:`${i}{{ iif(ns.state == 'error', 'mdi:alert', 'mdi:alert-circle') }}`}:{}}_buildTirePressureTemplateBase(t,e){const{pairs:i,fallback:s}=this._buildTirePairs(t,e);if(!i.length&&!s.length)return;return`{% set pairs = [${i.map(t=>`{ 'a': '${t.a}', 't': '${t.t}' }`).join(", ")}] %}{% set fallback = [${s.map(t=>`'${t}'`).join(", ")}] %}{% set ns = namespace(state='ok') %}{% for p in pairs %}{% set av = states(p['a']) | float(0) %}{% set tv = states(p['t']) | float(0) %}{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}{% if av < err %}{% set ns.state = 'error' %}{% elif av < warn and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}{% endif %}{% endfor %}{% if ns.state == 'ok' %}{% for e in fallback %}{% set v = states(e) | float(0) %}{% if v > 0 and v < 180 %}{% set ns.state = 'error' %}{% elif v > 0 and v < 200 and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}{% endfor %}{% endif %}`}_buildDoorTemplates(t,e){const i=this._buildDoorTemplateBase(t,e);return i?{notify:`${i}{{ ns.open }}`,color:`${i}{{ iif(ns.open, 'var(--warning-color)', 'var(--secondary-text-color)') }}`,notify_color:`${i}{{ 'var(--warning-color)' }}`,notify_icon:`${i}{{ 'mdi:car-door' }}`}:{}}_buildDoorTemplateBase(t,e){if(!t.length)return;return`{% set ns = namespace(open=false) %}{% set status = states(${e?`'${e}'`:"''"}) | lower %}{% if status in ['parking','parked','standing'] %}{% for e in [${t.map(t=>`'${t}'`).join(", ")}] %}{% set s = states(e) | lower %}{% if s not in ['closed','geschlossen','secured','gesichert','locked','verriegelt','ok','aus','off','false','no','0','inactive','not_open','unknown','unavailable','none','-'] %}{% set ns.open = true %}{% endif %}{% endfor %}{% endif %}`}_buildPreconditioningTemplates(t,e,i,s,n){const a=this._buildPreconditioningTemplateBase(t,e,i,s,n);return a?{notify:`${a}{{ ns.active or ns.error }}`,color:`${a}{{ iif(ns.error, 'var(--error-color)', iif(ns.active, 'var(--success-color)', 'var(--secondary-text-color)')) }}`,notify_color:`${a}{{ iif(ns.error, 'var(--error-color)', 'var(--success-color)') }}`,notify_icon:`${a}{{ iif(ns.error, 'mdi:alert-circle', 'mdi:car-defrost-front') }}`}:{}}_buildPreconditioningTemplateBase(t,e,i,s,n){if(!(t||e||i||s||n))return;return`{% set ns = namespace(active=false, error=false) %}{% set state = states(${t?`'${t}'`:"''"}) | lower %}{% set err = states(${e?`'${e}'`:"''"}) | lower %}{% set remaining = states(${i?`'${i}'`:"''"}) | float(0) %}{% set engine = states(${s?`'${s}'`:"''"}) | lower %}{% set allowed = states(${n?`'${n}'`:"''"}) | lower %}{% if err not in ['','ok','invalid','unknown','none','-'] %}{% set ns.error = true %}{% endif %}{% if state in ['heating','cooling','ventilation','standby'] %}{% set ns.active = true %}{% endif %}{% if remaining > 0 %}{% set ns.active = true %}{% endif %}{% if engine in ['true','on','yes','1'] %}{% set ns.active = true %}{% endif %}{% if allowed in ['false','off','no','0'] and state in ['heating','cooling','ventilation'] %}{% set ns.error = true %}{% endif %}`}_detectElectrification(t,e,i,s,n,a){const r=this._is48vEntity(e)||t.some(t=>this._is48vEntity(t.entity_id)||this._is48vEntity(t.name)),o=this._isHybridBatteryChargeEntity(i),l=Boolean(s||n||!o&&i)||Boolean(this._findEntity(t,["sensor","binary_sensor"],["electric range","ev range","charging","charge","charging port","traction battery","high voltage","hv battery","electric engine","state of energy"],new Set)),c=Boolean(a)||Boolean(this._findEntity(t,["sensor"],["fuel","tank","kraftstoff","tank level"],new Set));return l?c?"phev":"bev":r?"mhev":"ice"}_is48vEntity(t){return!!t&&this._normalizeText(t).includes("48v")}_isHybridBatteryChargeEntity(t){if(!t)return!1;const e=this._normalizeText(t);return e.includes("48v")||e.includes("12v")||e.includes("trip")||e.includes("end_of_trip")||e.includes("end of trip")||e.includes("bei ankunft")||e.includes("ankunft")||e.includes("arrival")||e.includes("trip_battery")||e.includes("charge level at end of trip")}_selectBestBatteryCharge(t,e){const i=this._findEntities(t,["sensor"],e,new Set);if(!i.length)return;const s=i.map(t=>{const e=this._normalizeText(`${t.entity_id} ${t.name} ${t.device_class??""}`);let i=0;return this._isUnknownState(t.state)||(i+=5),(e.includes("trip")||e.includes("end_of_trip")||e.includes("end of trip"))&&(i+=3),(e.includes("bei ankunft")||e.includes("ankunft")||e.includes("arrival"))&&(i+=3),e.includes("predicted")&&(i-=2),{entity:t.entity_id,score:i}});return s.sort((t,e)=>e.score-t.score),s[0]?.entity}_isEntityUnavailable(t,e){if(!e)return!0;const i=t.find(t=>t.entity_id===e);return!i||this._isUnknownState(i.state)}_isUnknownState(t){if(!t)return!0;const e=this._normalizeText(t);return["unknown","unavailable","none","-"].includes(e)}_buildPwfStatusIconTemplate(t){return`{% set s = states('${t}') | lower %}{{ iif('driving' in s or 'fahrt' in s, 'mdi:car-sports', iif('parking' in s or 'parked' in s or 'parken' in s, 'mdi:parking', iif('standing' in s or 'stand' in s, 'mdi:car-brake-hold', 'mdi:car'))) }}`}_buildAlarmArmingIconTemplate(t){return`{% set s = states('${t}') | lower %}{{ iif(s == 'unarmed', 'mdi:shield-off', iif(s == 'doorsonly', 'mdi:car-door-lock', iif(s == 'doorstiltcabin', 'mdi:shield-car', 'mdi:shield-lock'))) }}`}_buildTirePairs(t,e){const i=new Map;e.forEach(t=>{const e=this._tirePositionKey(t);e&&i.set(e,t)});const s=[],n=[];return t.forEach(t=>{const e=this._tirePositionKey(t);if(!e)return;const a=i.get(e);a?s.push({a:t,t:a}):n.push(t)}),{pairs:s,fallback:n}}_buildLowFuelColorTemplate(t){return`{% set v = states('${t}') | float(0) %}{{ iif(v > 0 and v < 10, 'var(--error-color)', 'var(--primary-color)') }}`}_buildBatteryHealthColorTemplate(t){return`{% set v = states('${t}') | float(0) %}{{ iif(v < 80, 'var(--error-color)', iif(v < 90, 'var(--warning-color)', 'var(--success-color)')) }}`}_buildStatusBadges(){if(!this.hass||!this._statusEntities)return[];const t=[],e=this._statusEntities.fuel;if(e){const i=this.hass.states[e],s=Number(i?.state),n=i?.attributes?.unit_of_measurement;if(!Number.isNaN(s)){("%"===n?s<=15:s<=10)&&t.push({label:"Tank niedrig",level:"warning"})}}this._hasLowTirePressure()&&t.push({label:"Reifendruck niedrig",level:"alert"});return this._hasDoorsOpenWhileParked()&&t.push({label:"Öffnungen offen",level:"warning"}),t}_hasLowTirePressure(){if(!this.hass||!this._statusEntities)return!1;const t=this._statusEntities.tires||[],e=this._statusEntities.tireTargets||[];if(!t.length)return!1;const i=new Map;return e.forEach(t=>{const e=this.hass.states[t]?.state,s=Number(e);if(!Number.isNaN(s)){const e=this._tirePositionKey(t);e&&i.set(e,s)}}),t.some(t=>{const e=this.hass.states[t]?.state,s=Number(e);if(Number.isNaN(s))return!1;const n=this._tirePositionKey(t),a=n?i.get(n):void 0;return void 0!==a?s<.9*a:s<200})}_tirePositionKey(t){const e=this._normalizeText(t);return e.includes("front")&&e.includes("left")?"front_left":e.includes("front")&&e.includes("right")?"front_right":e.includes("rear")&&e.includes("left")?"rear_left":e.includes("rear")&&e.includes("right")?"rear_right":void 0}_hasDoorsOpenWhileParked(){if(!this.hass||!this._statusEntities)return!1;const t=this._getVehicleStatusLabel();if("parked"!==t&&"standing"!==t)return!1;return(this._statusEntities.doors||[]).some(t=>{const e=this.hass.states[t]?.state;if(!e)return!1;const i=this._normalizeText(e);return!["closed","geschlossen","secured","gesichert","locked","verriegelt","ok","aus"].some(t=>i.includes(t))})}render(){return this._error?R`
        <ha-card>
          <div class="message error">${this._error}</div>
        </ha-card>
      `:this._config?.debug&&this._vehicleConfig?R`
        <ha-card>
          <div class="message">
            <strong>Debug: vehicle-status-card config</strong>
            <pre>${this._toYaml(this._vehicleConfig)}</pre>
          </div>
        </ha-card>
      `:customElements.get(ct)?this._vehicleConfig?R`
      <div class="card-wrapper">
        <vehicle-status-card></vehicle-status-card>
      </div>
    `:R`
        <ha-card>
          <div class="message">BMW Status Card wird vorbereitet…</div>
        </ha-card>
      `:R`
        <ha-card>
          <div class="message">
            Fahrzeugkarte <strong>vehicle-status-card</strong> ist nicht geladen. Installiere die Karte oder setze
            <strong>vehicle_status_card_resource</strong>.
          </div>
        </ha-card>
      `}}class ut extends rt{constructor(){super(...arguments),this._geminiModelsLoading=!1,this._openAiModelsLoading=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_bmwHomeEntity:{state:!0},_bmwCardataEntity:{state:!0},_bmwHomeEntities:{state:!0},_bmwCardataEntities:{state:!0},_aiTaskEntities:{state:!0},_editorError:{state:!0},_geminiModels:{state:!0},_geminiModelsLoading:{state:!0},_geminiModelsError:{state:!0},_openAiModels:{state:!0},_openAiModelsLoading:{state:!0},_openAiModelsError:{state:!0}}}static{this._errorHooked=!1}set hass(t){this._hass=t,this._ensureHaComponents(),this._loadIntegrationEntities(),ut._errorHooked||(ut._errorHooked=!0,window.addEventListener("error",t=>{console.error("[bmw-status-card] Window error:",t.error||t.message||t)}),window.addEventListener("unhandledrejection",t=>{console.error("[bmw-status-card] Unhandled rejection:",t.reason)}))}get hass(){return this._hass}setConfig(t){const e=t.image?.ai?.ha_entity_id||t.image?.ai?.entity_id||t.image?.ai?.ai_task_entity||t.image?.ai?.entity||t.image?.ai?.task_entity,i="ai"===t.image?.mode?t.image?.ai?.provider||"ha_ai_task":t.image?.ai?.provider;this._config={...t,type:t.type||`custom:${lt}`,image:t.image?.ai?{...t.image,mode:t.image.mode||"ai",ai:{...t.image.ai,provider:i,ha_entity_id:e||t.image.ai.ha_entity_id}}:t.image},this._maybeLoadGeminiModels(),this._maybeLoadOpenAiModels()}_ensureHaComponents(){customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement?.()}async _loadIntegrationEntities(){if(this.hass)try{const t=await this.hass.callWS({type:"config/entity_registry/list"}),e=t.filter(t=>"bmw_home"===t.platform).map(t=>t.entity_id).sort(),i=t.filter(t=>"cardata"===t.platform).map(t=>t.entity_id).sort(),s=t.filter(t=>t.entity_id.includes("ai_task")).map(t=>t.entity_id),n=Object.keys(this.hass.states||{}).filter(t=>t.includes("ai_task")),a=Array.from(new Set([...s,...n])).sort();this._bmwHomeEntities=e,this._bmwCardataEntities=i,this._aiTaskEntities=a}catch(t){}}static{this.styles=a`
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
    .actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    .actions ha-button {
      --mdc-theme-primary: var(--primary-color);
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
  `}_setEditorError(t){const e=t instanceof Error?`${t.message}\n${t.stack||""}`:String(t);this._editorError=e,console.error("[bmw-status-card] Editor error:",t)}_emitConfigChanged(){if(!this._config)return;const t={...this._config,type:this._config.type||`custom:${lt}`};try{console.debug("[bmw-status-card] config-changed",t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})),this._editorError=void 0}catch(t){this._setEditorError(t)}}_setConfigValue(t,e){if(this._config)try{const i=t.split("."),s=[];let n={...this._config},a=n;for(let t=0;t<i.length-1;t+=1){const e=i[t];s.push({parent:a,key:e}),a[e]={...a[e]||{}},a=a[e]}const r=i[i.length-1];""===e||null==e?delete a[r]:a[r]=e;for(let t=s.length-1;t>=0;t-=1){const{parent:e,key:i}=s[t];e[i]&&0===Object.keys(e[i]).length&&delete e[i]}this._config=n,this._emitConfigChanged(),this._maybeLoadGeminiModels(t,e),this._maybeLoadOpenAiModels(t,e)}catch(t){this._setEditorError(t)}}_onValueChanged(t){const e=t.target,i=e?.dataset?.path;i&&this._setConfigValue(i,e.value)}_onImageModeChanged(t){const e=t.currentTarget,i=t.detail?.value??e?.value;if(!i||!["off","static","ai"].includes(i))return;if(console.debug("[bmw-status-card] image mode changed:",i),!this._config)return;const s={...this._config};"off"===i?delete s.image:s.image="static"===i?{...s.image||{},mode:"static",static_urls:s.image?.static_urls||[]}:{...s.image||{},mode:"ai",ai:s.image?.ai||{}},this._config=s,this._emitConfigChanged()}_onSelectChanged(t){const e=t.currentTarget,i=e?.dataset?.path;if(!i)return;const s=t.detail?.value??e?.value;this._setConfigValue(i,s)}_normalizeEntityId(t){if(!t)return;if(Array.isArray(t)){const e=t.length?String(t[0]).trim():"";return this._normalizeEntityId(e)}if("object"==typeof t){const e=t.entity_id??t.entityId;return this._normalizeEntityId(e)}const e=String(t).trim();if(e){if(e.includes(",")){const t=e.split(",")[0].trim();return this._normalizeEntityId(t)}if(e.includes(".")&&!/\s/.test(e))return e}}_onToggleChanged(t){const e=t.currentTarget,i=e?.dataset?.path;i&&this._setConfigValue(i,Boolean(e?.checked))}_maybeLoadGeminiModels(t,e){if("gemini"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===t?e||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._geminiModelsLoading||this._geminiModelsKey===i&&this._geminiModels?.length||(this._geminiModelsTimer&&window.clearTimeout(this._geminiModelsTimer),this._geminiModelsTimer=window.setTimeout(()=>{this._loadGeminiModels(i)},400))}_maybeLoadOpenAiModels(t,e){if("openai"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===t?e||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._openAiModelsLoading||this._openAiModelsKey===i&&this._openAiModels?.length||(this._openAiModelsTimer&&window.clearTimeout(this._openAiModelsTimer),this._openAiModelsTimer=window.setTimeout(()=>{this._loadOpenAiModels(i)},400))}async _loadOpenAiModels(t){this._openAiModelsLoading=!0,this._openAiModelsError=void 0,this._openAiModelsKey=t;try{const e=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${t}`}});if(!e.ok){const t=await e.text();throw new Error(`OpenAI ListModels Fehler: ${e.status} ${t}`)}const i=await e.json(),s=(i?.data||[]).map(t=>t.id||"").filter(Boolean).filter(t=>/(image|dall-e|gpt-image)/i.test(t)).sort();this._openAiModels=s}catch(t){this._openAiModelsError=t?.message||String(t),this._openAiModels=void 0,console.warn("[bmw-status-card] OpenAI ListModels fehlgeschlagen:",t)}finally{this._openAiModelsLoading=!1,this.requestUpdate()}}async _loadGeminiModels(t){this._geminiModelsLoading=!0,this._geminiModelsError=void 0,this._geminiModelsKey=t;try{const e=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${t}`);if(!e.ok){const t=await e.text();throw new Error(`ListModels Fehler: ${e.status} ${t}`)}const i=await e.json(),s=(i?.models||[]).filter(t=>(t.supportedGenerationMethods||[]).includes("generateContent")).map(t=>t.name||"").filter(Boolean).map(t=>t.replace(/^models\//,"")).filter(Boolean).sort();this._geminiModels=s}catch(t){this._geminiModelsError=t?.message||String(t),this._geminiModels=void 0,console.warn("[bmw-status-card] Gemini ListModels fehlgeschlagen:",t)}finally{this._geminiModelsLoading=!1,this.requestUpdate()}}_onListChanged(t){const e=t.target,i=e?.dataset?.path;if(!i)return;const s=(e.value||"").split(",").map(t=>t.trim()).filter(Boolean);this._setConfigValue(i,s.length?s:void 0)}async _resolveDeviceIdFromEntity(t,e){if(this.hass)try{const i=await this.hass.callWS({type:"config/entity_registry/get",entity_id:t});i?.device_id&&this._setConfigValue(e,i.device_id)}catch(t){}}async _onEntityPicked(t){const e=t.target,i=t.detail?.value??e?.value,s=e?.dataset?.target;i&&s&&("bmw_home_device_id"===s?this._bmwHomeEntity=i:"bmw_cardata_device_id"===s&&(this._bmwCardataEntity=i),await this._resolveDeviceIdFromEntity(i,s))}render(){if(!this._config)return R``;const t=this._config.image?.mode||"off",e=this._config.image?.ai||{},i=e.provider||"ha_ai_task",s=(this._aiTaskEntities||[]).filter(t=>t.startsWith("ai_task.")),n=e.ha_entity_id||e.entity_id||e.ai_task_entity||e.entity||e.task_entity,a=this._normalizeEntityId(n)||("string"==typeof n?n.trim():"")||"",r=a&&!s.includes(a)?[a,...s]:s,o=!1!==e.generate_on_demand,l=e.upload??("openai"===i||"gemini"===i||"ha_ai_task"===i);try{return R`
        <div class="form">
          ${this._editorError?R`<div class="error">${this._editorError}</div>`:null}
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
          <div class="row">
            <div class="field">
              <label class="hint">MapTiler Theme</label>
              <select
                data-path="maptiler_style"
                @change=${t=>this._onSelectChanged(t)}
                .value=${this._config.maptiler_style||"streets"}
              >
                <option value="streets">Streets</option>
                <option value="outdoor">Outdoors</option>
                <option value="satellite">Satellite</option>
                <option value="hybrid">Hybrid</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="basic">Basic</option>
                <option value="bright">Bright</option>
                <option value="topo">Topo</option>
                <option value="voyager">Voyager</option>
              </select>
            </div>
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

          ${"static"===t?R`
                <ha-textarea
                  label="Statische Bild-URLs (kommagetrennt, optional)"
                  .value=${(this._config.image?.static_urls||[]).join(", ")}
                  data-path="image.static_urls"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Beispiel: https://.../front.jpg, https://.../rear.jpg</div>
              `:null}

          ${"ai"===t?R`
                <div class="row">
                  <div class="field">
                    <label class="hint">AI Provider</label>
                    <select
                      data-path="image.ai.provider"
                      @change=${t=>this._onSelectChanged(t)}
                      .value=${i}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="gemini">Gemini (Imagen)</option>
                      <option value="ha_ai_task">Home Assistant (ai_task)</option>
                      <option value="generic">Generic Endpoint</option>
                    </select>
                  </div>
                  ${"openai"===i||"gemini"===i?R`
                        <ha-textfield
                          label="AI API Key (erforderlich für OpenAI/Gemini)"
                          .value=${e.api_key||""}
                          data-path="image.ai.api_key"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      `:null}
                </div>
                <div class="actions">
                  <ha-button
                    raised
                    @click=${()=>this._setConfigValue("image.ai.generate_request_id",String(Date.now()))}
                  >Generate Images</ha-button>
                  ${o?R`<div class="hint">Bilder werden nur nach Klick generiert (Cache aktiv).</div>`:R`<div class="hint">Auto-Generierung aktiv.</div>`}
                </div>
                ${"ha_ai_task"===i?R`
                      <div class="hint">Nutze Home Assistant ai_task.generate_image und erhalte Media-URLs.</div>
                      <div class="field">
                        <label class="hint">ai_task Entity (optional)</label>
                        <ha-entity-picker
                          .hass=${this.hass}
                          .value=${a}
                          .includeEntities=${s}
                          data-path="image.ai.ha_entity_id"
                          @value-changed=${this._onSelectChanged}
                          allow-custom-entity
                        ></ha-entity-picker>
                      </div>
                      ${0===r.length?R`<div class="hint">Keine ai_task Entities gefunden.</div>`:null}
                    `:null}
                ${"openai"===i||"gemini"===i||"ha_ai_task"===i?R`
                      <div class="row">
                        <div class="field">
                          <label class="hint">Bilder via upload_file speichern</label>
                          <ha-switch
                            .checked=${l}
                            data-path="image.ai.upload"
                            @change=${this._onToggleChanged}
                          ></ha-switch>
                        </div>
                        ${l?R`
                              <ha-textfield
                                label="Upload Pfad (relativ zu /config)"
                                .value=${e.upload_path||"www/upload_file"}
                                data-path="image.ai.upload_path"
                                @input=${this._onValueChanged}
                              ></ha-textfield>
                            `:null}
                      </div>
                      <div class="hint">
                        Benötigt die Integration <strong>upload_file</strong>.
                      </div>
                    `:null}
                ${"generic"!==i?R`
                      <div class="row">
                        ${"gemini"===i&&this._geminiModels?.length?R`
                              <div class="field">
                                <label class="hint">Gemini Model (aus ListModels)</label>
                                <select
                                  data-path="image.ai.model"
                                  @change=${t=>this._onSelectChanged(t)}
                                  .value=${e.model||""}
                                >
                                  <option value="">Auto (Standard)</option>
                                  ${this._geminiModels.map(t=>R`<option value=${t}>${t}</option>`)}
                                </select>
                              </div>
                            `:"openai"===i&&this._openAiModels?.length?R`
                                <div class="field">
                                  <label class="hint">OpenAI Model (gefiltert)</label>
                                  <select
                                    data-path="image.ai.model"
                                    @change=${t=>this._onSelectChanged(t)}
                                    .value=${e.model||""}
                                  >
                                    <option value="">Auto (Standard)</option>
                                    ${this._openAiModels.map(t=>R`<option value=${t}>${t}</option>`)}
                                  </select>
                                </div>
                              `:R`
                                <ha-textfield
                                  label="AI Model (optional)"
                                  .value=${e.model||""}
                                  placeholder="OpenAI: gpt-image-1 | Gemini: imagen-3.0-generate-002"
                                  data-path="image.ai.model"
                                  @input=${this._onValueChanged}
                                ></ha-textfield>
                              `}
                        ${"openai"===i?R`
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
                            `:null}
                      </div>
                    `:R`
                      <div class="row">
                        <ha-textfield
                          label="AI Endpoint (erforderlich)"
                          .value=${e.endpoint||""}
                          data-path="image.ai.endpoint"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      </div>
                    `}
                ${"gemini"===i&&this._geminiModelsLoading?R`<div class="hint">Lade Gemini-Modelle…</div>`:null}
                ${"gemini"===i&&this._geminiModelsError?R`<div class="hint">${this._geminiModelsError}</div>`:null}
                ${"openai"===i&&this._openAiModelsLoading?R`<div class="hint">Lade OpenAI-Modelle…</div>`:null}
                ${"openai"===i&&this._openAiModelsError?R`<div class="hint">${this._openAiModelsError}</div>`:null}
                <div class="row">
                  ${"gemini"===i?R`
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
                      `:null}
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
      `}catch(t){return this._setEditorError(t),R`<div class="error">${this._editorError}</div>`}}}customElements.define(lt,ht),customElements.define("bmw-status-card-editor",ut),window.customCards=window.customCards||[],window.customCards.push({type:lt,name:"BMW Status Card",description:"Auto-Konfiguration für bmw_home + bmw-cardata-ha, basiert auf vehicle-status-card.",version:"0.1.48"});
//# sourceMappingURL=bmw-status-card.js.map
