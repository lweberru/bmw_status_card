/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new a(s,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:o,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,_=globalThis,p=_.trustedTypes,m=p?p.emptyScript:"",g=_.reactiveElementPolyfillSupport,f=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!o(e,t),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);a?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...d(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=s;const n=a.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){const n=this.constructor;if(!1===s&&(a=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??v)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[f("elementProperties")]=new Map,w[f("finalized")]=new Map,g?.({ReactiveElement:w}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $=globalThis,k=e=>e,E=$.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+C,T=`<${x}>`,P=document,M=()=>P.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,B="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,O=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,V=/"/g,j=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),R=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),K=new WeakMap,G=P.createTreeWalker(P,129);function F(e,t){if(!z(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const q=(e,t)=>{const i=e.length-1,s=[];let a,n=2===t?"<svg>":3===t?"<math>":"",r=L;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===L?"!--"===l[1]?r=U:void 0!==l[1]?r=N:void 0!==l[2]?(j.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=O):void 0!==l[3]&&(r=O):r===O?">"===l[0]?(r=a??L,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?O:'"'===l[3]?V:H):r===V||r===H?r=O:r===U||r===N?r=L:(r=O,a=void 0);const h=r===O&&e[t+1].startsWith("/>")?" ":"";n+=r===L?i+T:c>=0?(s.push(o),i.slice(0,c)+S+i.slice(c)+C+h):i+C+(-2===c?t:h)}return[F(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,n=0;const r=e.length-1,o=this.parts,[l,c]=q(e,t);if(this.el=J.createElement(l,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=G.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(S)){const t=c[n++],i=s.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?ee:"?"===r[1]?te:"@"===r[1]?ie:X}),s.removeAttribute(e)}else e.startsWith(C)&&(o.push({type:6,index:a}),s.removeAttribute(e));if(j.test(s.tagName)){const e=s.textContent.split(C),t=e.length-1;if(t>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],M()),G.nextNode(),o.push({type:2,index:++a});s.append(e[t],M())}}}else if(8===s.nodeType)if(s.data===x)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(C,e+1));)o.push({type:7,index:a}),e+=C.length-1}a++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,s){if(t===R)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=I(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=Y(e,a._$AS(e,t.values),a,s)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);G.currentNode=s;let a=G.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new Q(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new se(a,this,e)),this._$AV.push(t),o=i[++r]}n!==o?.index&&(a=G.nextNode(),n++)}return G.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),I(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==R&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>z(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Z(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new J(e)),t}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(e,t=this,i,s){const a=this.strings;let n=!1;if(void 0===a)e=Y(this,e,t,0),n=!I(e)||e!==this._$AH&&e!==R,n&&(this._$AH=e);else{const s=e;let r,o;for(e=a[0],r=0;r<a.length-1;r++)o=Y(this,s[i+r],t,r),o===R&&(o=this._$AH[r]),n||=!I(o)||o!==this._$AH[r],o===W?e=W:e!==W&&(e+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class te extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends X{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??W)===R)return;const i=this._$AH,s=e===W&&i!==W||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const ae=$.litHtmlPolyfillSupport;ae?.(J,Q),($.litHtmlVersions??=[]).push("3.3.2");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class re extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new Q(t.insertBefore(M(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}}re._$litElement$=!0,re.finalized=!0,ne.litElementHydrateSupport?.({LitElement:re});const oe=ne.litElementPolyfillSupport;oe?.({LitElement:re}),(ne.litElementVersions??=[]).push("4.2.2");const le="bmw-status-card",ce="vehicle-status-card",de="High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}, clean studio background, realistic, sharp details.";class he extends re{constructor(){super(...arguments),this._loading=!1,this._autoGenerateOnce=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_vehicleConfig:{state:!0},_error:{state:!0},_loading:{state:!0},_vehicleInfo:{state:!0}}}static{this.styles=n`
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
  `}set hass(e){this._hass=e,this._ensureConfig()}get hass(){return this._hass}setConfig(e){this._config=e,this._vehicleConfig=void 0,this._error=void 0,e?.bmw_home_device_id&&e?.bmw_cardata_device_id||(this._error="bmw_home_device_id und bmw_cardata_device_id sind erforderlich."),this._vehicleInfo=void 0,this._entityEntriesCache=void 0,this._deviceEntriesCache=void 0,this._ensureVehicleCardLoaded(),this._autoGenerateOnce=this._shouldAutoGenerateOnce(),this._ensureConfig()}updated(){const e=this.renderRoot.querySelector(ce);if(e&&this.hass&&(e.hass=this.hass,this._vehicleConfig)){const t=this._hash(JSON.stringify(this._vehicleConfig));this._lastVehicleConfigKey!==t&&(this._lastVehicleConfigKey=t,e.setConfig(this._vehicleConfig))}this._maybeRefreshImagesOnStatusChange()}getCardSize(){return 6}static getConfigElement(){return document.createElement("bmw-status-card-editor")}static getStubConfig(){return{type:`custom:${le}`,bmw_home_device_id:"",bmw_cardata_device_id:""}}async _ensureVehicleCardLoaded(){if(!this._config?.vehicle_status_card_resource)return;if(customElements.get(ce))return;document.querySelector(`script[data-bmw-status-card="${this._config.vehicle_status_card_resource}"]`)||await new Promise((e,t)=>{const i=document.createElement("script");i.type="module",i.src=this._config.vehicle_status_card_resource,i.dataset.bmwStatusCard=this._config.vehicle_status_card_resource,i.addEventListener("load",()=>e()),i.addEventListener("error",()=>t()),document.head.appendChild(i)})}async _ensureConfig(){if(this.hass&&this._config&&!this._loading&&!this._vehicleConfig&&this._config.bmw_home_device_id&&this._config.bmw_cardata_device_id){this._loading=!0,this._vehicleConfig||(this._vehicleConfig=void 0);try{console.debug("[bmw-status-card] building config");const e=[this._config.bmw_home_device_id,this._config.bmw_cardata_device_id].filter(Boolean),t=await this._getEntityRegistry(),i=await this._getDeviceRegistry(),s=this._buildEntityInfo(t,e),a=this._buildVehicleInfo(i,s);this._vehicleInfo=a;const n=this._buildVehicleStatusCardConfig(s,[],void 0);this._vehicleConfig=this._mergeVehicleConfig(n,this._config.vehicle_status_card),this.requestUpdate();const r=this._resolveImages(a),o=this._resolveTireCardImage(a,s),[l,c]=await Promise.all([r,o]);if(l.length||c){const e=this._buildVehicleStatusCardConfig(s,l,c||void 0);this._vehicleConfig=this._mergeVehicleConfig(e,this._config.vehicle_status_card)}this._error=void 0}catch(e){this._error=e?.message||String(e),console.error("[bmw-status-card] config build failed:",e)}finally{this._loading=!1,this.requestUpdate()}}}_maybeRefreshImagesOnStatusChange(){if(!this._config?.image||"ai"!==this._config.image.mode)return;const e=this._config.image.ai||{},t=!1!==e.generate_on_demand,i=this._getVehicleStatusLabel()||"unknown";if(this._lastImageStatus!==i){if(this._lastImageStatus=i,t&&!e.generate_request_id){if(!(!1!==e.generate_on_save)||this._isInEditor())return;this._autoGenerateOnce=!0}this._ensureConfig()}}_toYaml(e,t=0){const i="  ".repeat(t);if(null==e)return"null";if("string"==typeof e){if(""===e||/[:#\-?{}[\],&*!|>'"%@`\n\r\t]/.test(e)){return`"${e.replace(/"/g,'\\"')}"`}return e}if("number"==typeof e||"boolean"==typeof e)return String(e);if(Array.isArray(e))return e.length?e.map(e=>{if(null!==e&&"object"==typeof e){const s=this._toYaml(e,t+1);return`${i}-\n${s}`}return`${i}- ${this._toYaml(e,t+1).trimStart()}`}).join("\n"):"[]";if("object"==typeof e){const s=Object.entries(e).filter(([,e])=>void 0!==e);return s.length?s.map(([e,s])=>{if(null!==s&&"object"==typeof s){const a=this._toYaml(s,t+1);return`${i}${e}:\n${a}`}return`${i}${e}: ${this._toYaml(s,t+1).trimStart()}`}).join("\n"):"{}"}return String(e)}async _getEntityRegistry(){if(this._entityEntriesCache)return this._entityEntriesCache;const e=await this.hass.callWS({type:"config/entity_registry/list"});return this._entityEntriesCache=e,e}async _getDeviceRegistry(){if(this._deviceEntriesCache)return this._deviceEntriesCache;const e=await this.hass.callWS({type:"config/device_registry/list"});return this._deviceEntriesCache=e,e}_buildEntityInfo(e,t){const i=new Set(t);return e.filter(e=>e.device_id&&i.has(e.device_id)).filter(e=>!e.disabled_by).map(e=>{const t=this.hass.states[e.entity_id],i=e.entity_id.split(".")[0],s=t?.attributes?.friendly_name||e.original_name||e.entity_id;return{entity_id:e.entity_id,domain:i,name:s,device_class:t?.attributes?.device_class,unit:t?.attributes?.unit_of_measurement,state:t?.state,attributes:t?.attributes||{}}})}_extractVehicleInfoFromAttributes(e){const t={};for(const i of e){const e=i.attributes||{},s=e.vehicle_basic_data||e.vehicleBasicData,a=e.vehicle_basic_data_raw||e.vehicleBasicDataRaw;s&&"object"==typeof s&&(t.model=t.model||this._toNonEmptyString(s.model_name),t.series=t.series||this._toNonEmptyString(s.series),t.color=t.color||this._toNonEmptyString(s.color),t.body=t.body||this._toNonEmptyString(s.body_type),t.year=t.year||this._extractYear(s.construction_date),t.license_plate=t.license_plate||this._toNonEmptyString(s.license_plate||s.licensePlate||s.registration_number)),a&&"object"==typeof a&&(t.make=t.make||this._toNonEmptyString(a.brand),t.model=t.model||this._toNonEmptyString(a.modelName)||this._toNonEmptyString(a.modelRange)||this._toNonEmptyString(a.series),t.series=t.series||this._toNonEmptyString(a.series)||this._toNonEmptyString(a.seriesDevt),t.color=t.color||this._toNonEmptyString(a.colourDescription)||this._toNonEmptyString(a.colourCodeRaw),t.body=t.body||this._toNonEmptyString(a.bodyType),t.year=t.year||this._extractYear(a.constructionDate),t.license_plate=t.license_plate||this._toNonEmptyString(a.licensePlate||a.license_plate||a.registrationNumber))}return t}_extractYear(e){if(e){if("number"==typeof e)return String(e);if("string"==typeof e){const t=e.match(/(19|20)\d{2}/);return t?t[0]:void 0}}}_toNonEmptyString(e){if(null==e)return;const t=String(e).trim();return t.length?t:void 0}_buildVehicleInfo(e,t){const i=this._config?.vehicle_info||{},s=[this._config?.bmw_home_device_id,this._config?.bmw_cardata_device_id],a=e.filter(e=>s.includes(e.id)),n=this._extractVehicleInfoFromAttributes(t),r=a.find(e=>e.manufacturer)?.manufacturer||"BMW",o=a.find(e=>e.model)?.model,l=a.find(e=>e.name)?.name,c=this._findEntityByKeywords(t,["model","vehicle_model","car_model"]),d=this._findEntityByKeywords(t,["series","line"]),h=this._findEntityByKeywords(t,["year","model_year"]),u=this._findEntityByKeywords(t,["color","colour"]),_=this._findEntityByKeywords(t,["trim","package","edition"]),p=this._findEntityByKeywords(t,["body","body_type"]),m=e=>{if(!e)return;const t=this.hass.states[e]?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:void 0};return{make:i.make||n.make||r,model:i.model||n.model||m(c)||o,series:i.series||n.series||m(d),year:i.year||n.year||m(h),color:i.color||n.color||m(u),trim:i.trim||n.trim||m(_),body:i.body||n.body||m(p),name:i.name||n.name||l,license_plate:i.license_plate||n.license_plate}}async _resolveImages(e){const t=this._config?.image;if(!t||"off"===t.mode)return[];if("static"===t.mode&&t.static_urls?.length)return t.static_urls;if("ai"===t.mode&&t.ai){const i=t.ai.provider||"ha_ai_task";return"openai"!==i&&"gemini"!==i||t.ai.api_key?(console.debug("[bmw-status-card] generating AI images",t.ai),this._generateAiImages(e,t.ai)):(console.warn("[bmw-status-card] image.ai.api_key fehlt – überspringe Bildgenerierung."),[])}return[]}async _resolveTireCardImage(e,t){const i=this._config?.image;if(!i||"ai"!==i.mode||!i.ai)return;if(!this._findEntities(t,["sensor"],["tire","tyre","pressure","wheel","tpms","reifen","reifendruck","rad"],new Set).length)return;const s={...i.ai,views:["top-down view, directly above, centered, orthographic, clean studio background, front of the car at the top of the image, driver side on the left"],max_images:1,count:1};return(await this._generateAiImages(e,s))[0]}async _generateAiImages(e,t){const i=t.provider||"ha_ai_task",s=t.cache_hours??24,a=this._buildImageCacheKey(e,t),n=this._buildPrompts(e,t),r=t.count??1,o=t.max_images??8,l=!1!==t.generate_on_demand,c=this._getVehicleStatusLabel()||"unknown",d=t.upload??("openai"===i||"gemini"===i||"ha_ai_task"===i),h="ha_ai_task"===i||d,u=!0===t.tag_metadata,_=this._resolveAiModel(i,t);if(h){const i=await this._tryGetPersistentCache(a,t,o,e);if(i.length)return i}try{const e=localStorage.getItem(a);if(e){const t=JSON.parse(e),i=(Date.now()-t.timestamp)/36e5,n=t.images?.some(e=>!this._isCacheableImageUrl(e));if(t.images?.length&&i<=s&&!n&&t.status===c){if(await this._validateCachedImages(t.images))return t.images;localStorage.removeItem(a)}}}catch(e){}if(l&&!t.generate_request_id){if(!this._autoGenerateOnce)return[];this._autoGenerateOnce=!1}let p=[];const m=[];for(const e of n){if(p.length>=o)break;const s=o-p.length,a=Math.min(r,s);if(a<=0)break;let n=[];if(n="openai"===i?await this._fetchOpenAiImages(e,t,a):"gemini"===i?await this._fetchGeminiImages(e,t,a):"ha_ai_task"===i?await this._fetchHaAiTaskImages(e,t,a):await this._fetchGenericImages(e,t,a),n.length&&(p.push(...n),u)){const t=(new Date).toISOString();n.forEach(()=>m.push({prompt:e,provider:i,model:_,created_at:t}))}}if(p.length&&h&&(p=await this._uploadImagesIfNeeded(p,t,a,e)),p.length&&u&&m.length&&await this._storeImageMetadata(p,m,t,a,e),p.length&&p.every(e=>this._isCacheableImageUrl(e)))try{localStorage.setItem(a,JSON.stringify({timestamp:Date.now(),images:p,status:c}))}catch(e){}return p}_resolveAiModel(e,t){return t.model?t.model:"openai"===e?"gpt-image-1":"gemini"===e?"imagen-3.0-generate-002":void 0}_buildPrompts(e,t){const i=t.prompt_template||de;if(t.prompts&&t.prompts.length)return t.prompts.map(t=>this._buildPrompt(e,t));if(this._isHomeParked()&&(!t.views||!t.views.length)){return["front 3/4 view, parked on a residential driveway in front of a modern house, daytime"].map(t=>this._buildPrompt(e,i,t))}return(t.views?.length?t.views:["front 3/4 view","rear 3/4 view","side profile","front view","rear view"]).map(t=>this._buildPrompt(e,i,t))}_shouldAutoGenerateOnce(){const e=this._config?.image?.ai;if(!e||"ai"!==this._config?.image?.mode)return!1;const t=!1!==e.generate_on_demand,i=!1!==e.generate_on_save;return!(!t||!i)&&(!e.generate_request_id&&!this._isInEditor())}_isInEditor(){return Boolean(this.closest("hui-dialog-edit-card")||this.closest("hui-card-element-editor")||this.closest("hui-card-preview"))}_buildPrompt(e,t,i){const s=t||de,a=this._getVehicleStatusLabel(),n=this._getStatusScene(a),r=e.license_plate,o={"{make}":e.make||"BMW","{model}":e.model||"","{series}":e.series||"","{year}":e.year||"","{color}":e.color||"","{trim}":e.trim||"","{body}":e.body||"","{angle}":i||"","{status}":n||a||"","{plate}":r||""};let l=s;return Object.entries(o).forEach(([e,t])=>{const i=t?.trim();l=l.replaceAll(e,i||"")}),i&&!s.includes("{angle}")&&(l=`${l} ${i}`),!n&&!a||s.includes("{status}")||(l=n?`${l} ${n}`:`${l} status: ${a}`),r&&!s.includes("{plate}")&&(l=`${l} license plate: ${r}`),l.replace(/\s+/g," ").trim()}_getStatusScene(e){if(!e)return;const t=this._normalizeText(e);return t.includes("driving")?"driving on the road, motion blur, dynamic scene":t.includes("parking")||t.includes("parked")?"parked in a parking lot, stationary":t.includes("standing")||t.includes("stand")?"stopped at a traffic light or intersection, stationary":void 0}_isHomeParked(){if(!this.hass||!this._deviceTrackerEntity)return!1;const e=this.hass.states[this._deviceTrackerEntity]?.state,t="home"===e?.toLowerCase(),i=this._getVehicleStatusLabel();return Boolean(t&&i&&["parking","parked"].includes(i))}async _fetchOpenAiImages(e,t,i){if(!t.api_key)throw new Error("image.ai.api_key fehlt (OpenAI).");const s=t.endpoint||"https://api.openai.com/v1/images/generations",a={model:t.model||"gpt-image-1",prompt:e,size:t.size||"1024x1024",n:i},n=await fetch(s,{method:"POST",headers:{Authorization:`Bearer ${t.api_key}`,"Content-Type":"application/json"},body:JSON.stringify(a)});if(!n.ok){const e=await n.text();throw new Error(`OpenAI Fehler: ${n.status} ${e}`)}const r=await n.json();return(r?.data||[]).map(e=>e.url||e.b64_json).filter(Boolean).map(e=>e.startsWith("http")?e:`data:image/png;base64,${e}`)}async _fetchGeminiImages(e,t,i){if(!t.api_key)throw new Error("image.ai.api_key fehlt (Gemini).");const s=t.model||"imagen-3.0-generate-002",a=t.endpoint||`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${t.api_key}`,n=t=>{const s={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{candidateCount:i}};return t&&(s.responseModalities=["IMAGE"]),s},r=t.request_body||n(!0),o=async e=>await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});let l=await o(r),c="";if(!l.ok){c=await l.text();if(!(!t.request_body&&(c.includes("response_modalities")||c.includes("responseModalities")||c.includes("imageGenerationConfig")||c.includes("generation_config"))))throw new Error(`Gemini Fehler: ${l.status} ${c}`);if(l=await o(n(!1)),!l.ok){const e=await l.text();throw new Error(`Gemini Fehler: ${l.status} ${e}`)}}const d=await l.json(),h=d?.candidates||[],u=[];if(Array.isArray(h)&&h.forEach(e=>{"SAFETY"===e?.finishReason&&console.warn("[bmw-status-card] Gemini Bild durch Safety-Filter blockiert.");(e?.content?.parts||[]).forEach(e=>{const t=e.inlineData||e.inline_data;if(t?.data){const e=t.mimeType||"image/png";u.push(`data:${e};base64,${t.data}`)}})}),u.length)return u;const _=d?.predictions||d?.images||d?.data||[];return Array.isArray(_)?_.map(e=>{const t=e.bytesBase64Encoded||e?.image?.bytesBase64Encoded||e?.b64_json;return t?`data:image/png;base64,${t}`:"string"==typeof e&&e.startsWith("http")?e:e?.url?e.url:null}).filter(Boolean):[]}async _fetchHaAiTaskImages(e,t,i){if(!this.hass)throw new Error("Home Assistant nicht verfügbar.");const s=this._normalizeEntityId(t.ha_entity_id),a={task_name:this._vehicleInfo?.name||this._config?.vehicle_info?.name||"BMW Status Card",instructions:e};s&&(a.entity_id=s);for(let e=1;e<=2;e+=1)try{const t=await this.hass.callWS({type:"call_service",domain:"ai_task",service:"generate_image",service_data:a,return_response:!0}),i=t?.response??t?.result??t,s=await this._extractHaAiTaskUrls(i);if(s.length)return s.filter(Boolean);if(console.warn("[bmw-status-card] ai_task: keine Bild-URL erhalten.",i),e<2){await this._delay(600);continue}return[]}catch(t){const i=t?.message||String(t),s=/response did not include image|no image|keine.*bild/i.test(i);if(s&&e<2){console.warn("[bmw-status-card] ai_task: leere Bild-Antwort, retry …"),await this._delay(600);continue}if(s)return console.warn("[bmw-status-card] ai_task: keine Bilddaten, überspringe."),[];throw new Error(`ai_task Fehler: ${i}`)}return[]}async _delay(e){await new Promise(t=>setTimeout(t,e))}async _uploadImagesIfNeeded(e,t,i,s){if(!this.hass)return e;const a=t.provider||"ha_ai_task",n=this._normalizeUploadPath(t.upload_path),r=[],o=i?this._hash(i):void 0,l=i?this._buildImageFilenamePrefix(s,i):void 0;for(let t=0;t<e.length;t+=1){const i=e[t];let s,c,d;if(this._isHttpUrl(i))s=i;else{const e=this._parseDataUrl(i);if(e)c=e.data,d=e.mimeType;else if(i.startsWith("/")){const e="ha_ai_task"===a?this._normalizeHaAiTaskUrl(i):i,t=await this._fetchAsDataUrl(e),s=t?this._parseDataUrl(t):null;if(!s){if("ha_ai_task"===a)continue;r.push(i);continue}c=s.data,d=s.mimeType}else{if("ha_ai_task"!==a||!i.startsWith("ai_task/")){if("ha_ai_task"===a)continue;r.push(i);continue}{const e=this._normalizeHaAiTaskUrl(i),t=await this._fetchAsDataUrl(e),s=t?this._parseDataUrl(t):null;if(!s)continue;c=s.data,d=s.mimeType}}}const h=this._guessImageExtension(s,d),u=s||c||i,_=o?`${l}-${t+1}.${h}`:`${this._hash(u)}.${h}`;try{const e=await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:n,filename:_,...s?{url:s}:{data_base64:c}},return_response:!0}),t=e?.response??e?.result??e,a=t?.local_url||t?.url||t?.local_path;r.push(this._normalizeLocalUploadUrl(a)||i)}catch(e){"ha_ai_task"!==a&&r.push(i)}}return r}async _storeImageMetadata(e,t,i,s,a){if(!this.hass||!s)return;const n=this._normalizeUploadPath(i.upload_path),r=this._buildImageFilenamePrefix(a,s),o=this._getVehicleStatusLabel()||"unknown",l=a||this._vehicleInfo||{},c=[];for(let i=0;i<e.length;i+=1){const s=t[i];if(!s)continue;const a={image_url:e[i],...s,status:o,vehicle:{make:l.make,model:l.model,series:l.series,year:l.year,color:l.color,trim:l.trim,body:l.body,license_plate:l.license_plate}};c.push(a);const d=`${r}-${i+1}.meta.json`;try{await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:n,filename:d,data_base64:this._toBase64(JSON.stringify(a,null,2))},return_response:!0})}catch(e){}}try{localStorage.setItem(`${s}:meta`,JSON.stringify({timestamp:Date.now(),items:c}))}catch(e){}}_toBase64(e){return btoa(unescape(encodeURIComponent(e)))}async _tryGetPersistentCache(e,t,i,s){const a=this._normalizeUploadPath(t.upload_path),n=this._buildImageFilenamePrefix(s,e),r=[],o=["png","jpg","jpeg","webp"];for(let e=0;e<i;e+=1){let t;for(const i of o){const s=`${n}-${e+1}.${i}`,r=this._buildLocalUploadUrl(a,s);if(await this._urlExists(r)){t=r;break}}if(!t)break;r.push(t)}return r}_buildLocalUploadUrl(e,t){return`/local/${this._normalizeUploadPath(e).replace(/^www\//,"")}/${t}`}_buildImageFilenamePrefix(e,t){const i=e||this._vehicleInfo||{},s=i.make||"bmw",a=i.model||"",n=i.series||"",r=i.license_plate||"",o=this._getVehicleStatusLabel()||"unknown",l=this._deviceTrackerEntity&&this.hass?.states[this._deviceTrackerEntity]?.state||"unknown",c=this._hash(t||JSON.stringify(i)),d=this._slugify([s,a,n,r,o,l].filter(Boolean).join("-"));return`${d.length?d:"bmw-status-card"}-${c}`}_slugify(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)}async _urlExists(e){try{if((await fetch(e,{method:"HEAD",cache:"no-store"})).ok)return!0}catch(e){}try{return(await fetch(e,{method:"GET",cache:"no-store"})).ok}catch(e){return!1}}_isLocalImageUrl(e){return e.startsWith("/local/")||e.startsWith("local/")}async _validateCachedImages(e){const t=e.filter(e=>this._isLocalImageUrl(e)).map(e=>this._urlExists(this._normalizeLocalUploadUrl(e)||e));if(!t.length)return!0;return(await Promise.all(t)).every(Boolean)}_normalizeUploadPath(e){const t=(e||"www/upload_file").replace(/^\/+/,"").replace(/\/+$/,"");return t.startsWith("www/")?t:`www/${t}`}_normalizeLocalUploadUrl(e){if(!e)return;const t=e.trim();return t?t.startsWith("/local/")?t:t.startsWith("local/")?`/${t}`:t.startsWith("www/")?`/local/${t.replace(/^www\//,"")}`:t.includes("/www/")?`/local/${t.split("/www/")[1]}`:t:void 0}_parseDataUrl(e){if(!e.startsWith("data:"))return null;const t=e.match(/^data:([^;]+);base64,(.*)$/);return t?{mimeType:t[1],data:t[2]}:null}async _fetchAsDataUrl(e){const t=async e=>{try{const t=await fetch(e,{credentials:"same-origin"});if(!t.ok)return null;const i=await t.blob();return await new Promise((e,t)=>{const s=new FileReader;s.onloadend=()=>e(String(s.result||"")),s.onerror=()=>t(s.error),s.readAsDataURL(i)})}catch(e){return null}},i=[e],[s]=e.split("?");s&&s!==e&&i.push(s),s.startsWith("/ai_task/")?i.push(`/api${s}`):s.startsWith("/api/ai_task/")&&i.push(s.replace("/api/ai_task/","/ai_task/"));for(const e of i){const i=await t(e);if(i)return i}return null}_guessImageExtension(e,t){if(t){if(t.includes("png"))return"png";if(t.includes("jpeg")||t.includes("jpg"))return"jpg";if(t.includes("webp"))return"webp"}if(e){const t=e.match(/\.(png|jpg|jpeg|webp)(\?|$)/i);if(t)return t[1].toLowerCase().replace("jpeg","jpg")}return"png"}_isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")}_isCacheableImageUrl(e){const t=e.toLowerCase();return!t.includes("/ai_task/")&&!t.includes("authsig=")}async _extractHaAiTaskUrls(e){if(!e)return[];const t=e?.images||e?.data||e?.results||e?.result||e,i=Array.isArray(t)?t:[t],s=[];for(const e of i){if(!e)continue;if("string"==typeof e){s.push(this._normalizeHaAiTaskUrl(e));continue}const t=e.url||e.image_url||e.media_url||e.content_url||e.media?.url||e.image?.url||e.local_url||e.local_path;if(t){s.push(this._normalizeHaAiTaskUrl(String(t)));continue}const i=e.media_id||e.media_content_id||e.content_id||e.media;if(i){const e=await this._resolveMediaSourceUrl(String(i));e?s.push(this._normalizeHaAiTaskUrl(e)):s.push(`/api/media/${i}`)}}return s}_normalizeHaAiTaskUrl(e){const t=e.trim();return t?t.startsWith("http://")||t.startsWith("https://")||t.startsWith("/ai_task/")?t:t.startsWith("ai_task/")?`/${t}`:t:e}async _resolveMediaSourceUrl(e){if(this.hass&&e)try{if(e.startsWith("http"))return e;const t=await this.hass.callWS({type:"media_source/resolve",media_content_id:e});return t?.url}catch(e){return}}async _fetchGenericImages(e,t,i){if(!t.endpoint)throw new Error("image.ai.endpoint fehlt (generic).");const s=t.request_body||{prompt:e,count:i,size:t.size},a=await fetch(t.endpoint,{method:"POST",headers:{...t.api_key?{Authorization:`Bearer ${t.api_key}`}:{},"Content-Type":"application/json"},body:JSON.stringify(s)});if(!a.ok){const e=await a.text();throw new Error(`AI Fehler: ${a.status} ${e}`)}const n=await a.json(),r=this._extractByPath(n,t.response_path)||n.images||n.data||[];return Array.isArray(r)?r.map(e=>"string"==typeof e?e:e.url||e.image||e.b64_json).filter(Boolean).map(e=>e.startsWith("http")?e:`data:image/png;base64,${e}`):[]}_extractByPath(e,t){if(t)return t.split(".").reduce((e,t)=>e?e[t]:void 0,e)}_buildImageCacheKey(e,t){const i=this._getVehicleStatusLabel(),s=this._getStatusScene(i),a={vehicleInfo:e,provider:t.provider,model:t.model,size:t.size,aspect_ratio:t.aspect_ratio,count:t.count,max_images:t.max_images,upload:t.upload,upload_path:t.upload_path,prompt_template:t.prompt_template,prompts:t.prompts,views:t.views,status_label:i,status_scene:s,home_parked:this._isHomeParked(),generate_request_id:!1!==t.generate_on_demand?t.generate_request_id:void 0};return`bmw-status-card:images:${this._hash(JSON.stringify(a))}`}_hash(e){let t=0;for(let i=0;i<e.length;i+=1)t=(t<<5)-t+e.charCodeAt(i),t|=0;return String(t)}_buildVehicleStatusCardConfig(e,t,i){const s=new Set,a=this._pickEntity(e,s,["lock","binary_sensor","sensor"],["lock","locked","door lock","verriegelt","schloss","türschloss"]),n=this._pickEntity(e,s,["binary_sensor","sensor"],["charging","charge","plugged","plug","charging port","connector","port","laden","lade","stecker","anschluss","ladeklappe"]),r=this._pickEntity(e,s,["sensor"],["battery health","state of health","soh","health_state","battery_health","battery health state","health state","health_state_48v","48v health","48v battery health","battery_health_state_48v"]),o=["state_of_charge","state of charge","soc","state_of_energy","soe","ladezustand","batteriestand","charge level","charge_level","charge level at end of trip","trip_battery_charge_level","soc bei ankunft","state_of_charge_predicted","state_of_charge_predicted_on_integration_side"];let l=this._pickEntity(e,s,["sensor"],o);const c=this._selectBestBatteryCharge(e,o);!c||l&&!this._isEntityUnavailable(e,l)||(l=c,s.add(c));const d=this._pickEntity(e,s,["sensor"],["fuel","tank","fuel_level","kraftstoff","tankinhalt","tankfüllung","tankfuellung","kraftstoffstand","tank level","range tank level"]),h=this._pickEntity(e,s,["sensor"],["range","remaining","remaining_range","remainingrange","reichweite","restreichweite","reichweite_km","range total","total range","range_total_range","total_range","range_total_range_last_sent"]),u=this._pickEntity(e,s,["sensor"],["electric range","ev range","remaining electric range","kombi remaining electric range","elektrische reichweite","ev-reichweite"]),_=this._pickEntity(e,s,["sensor"],["fuel range","remaining fuel","tank level","kraftstoffreichweite"]),p=this._pickEntity(e,s,["sensor"],["total remaining range","total range","gesamtreichweite"]),m=this._pickEntity(e,s,["sensor","number"],["charge target","target soc","target state","charge limit","charge_limit","charge_limit_soc","ladeziel","ladegrenze","ladegrenze soc"]),g=this._pickEntity(e,s,["sensor"],["odometer","mileage","distance","travelled","kilometerstand","kilometer","odo","vehicle mileage"]),f=this._pickEntity(e,s,["sensor"],["temperature","temp","coolant","temperatur","innen","innenraum"]),y=this._pickEntity(e,s,["sensor"],["charging power","charge power","power","grid energy","ladeleistung","leistung"]),v=this._pickEntity(e,s,["sensor"],["time remaining","time to fully","time to full","remaining time","restzeit","ladezeit","verbleibend"]);this._pickEntity(e,s,["binary_sensor","sensor","switch"],["preconditioning","climatization","climate","hvac","defrost","vorklimatisierung","klimatisierung","vorheizen","klima"]);const b=this._findEntity(e,["sensor"],["preconditioning state","preconditioning activity","preconditioning status","standklima","vorklimatisierung"],new Set)?.entity_id,w=this._findEntity(e,["sensor"],["preconditioning error","preconditioning error reason","vorklimatisierung fehler","standklima fehler"],new Set)?.entity_id,$=this._findEntity(e,["sensor"],["preconditioning remaining time","preconditioning remaining","standklima rest","vorklimatisierung rest"],new Set)?.entity_id,k=this._findEntity(e,["binary_sensor","sensor"],["preconditioning engine used","remote engine running","engine used"],new Set)?.entity_id,E=this._findEntity(e,["binary_sensor","sensor"],["preconditioning engine use allowed","remote engine start allowed","engine use allowed"],new Set)?.entity_id,A=this._pickEntity(e,s,["binary_sensor","sensor"],["engine","ignition","motor","zündung","zuendung"]),S=this._pickEntity(e,s,["sensor"],["bmw_pwf_status","pwf status","pwf_status"]),C=S||this._pickEntity(e,s,["binary_sensor","sensor"],["moving","motion","driving","parking","fährt","bewegt","parked","stand","status","fahrstatus","pwf","pwf status"]),x=this._pickEntity(e,s,["binary_sensor","sensor"],["alarm","anti theft","anti-theft","diebstahl","security","alarmsystem"]),T=this._pickEntity(e,s,["sensor"],["alarm arming","alarm_arming","alarm arming state","alarm_arming_state","arming"]),P=this._detectElectrification(e,r,l,n,u,d),M="bev"===P||"phev"===P,I=this._is48vEntity(r),z=t=>{if(!t)return!1;const i=e.find(e=>e.entity_id===t);return!i||("sensor"!==i.domain||!this._isNumericState(i.state))},B=[];a&&z(a)&&B.push({type:"entity",entity:a,icon:"mdi:lock"}),n&&M&&z(n)&&B.push({type:"entity",entity:n,icon:"mdi:ev-station"});const L=[];if(A&&z(A)&&L.push({type:"entity",entity:A,icon:"mdi:engine"}),C&&z(C)){const e={type:"entity",entity:C,icon:"mdi:car"};S&&C===S&&(e.icon_template=this._buildPwfStatusIconTemplate(C)),L.push(e)}x&&z(x)&&L.push({type:"entity",entity:x,icon:"mdi:alarm-light"}),T&&z(T)&&L.push({type:"entity",entity:T,icon:"mdi:shield-lock",icon_template:this._buildAlarmArmingIconTemplate(T)});const U=this._pickEntities(e,s,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","flap","lock","charging port","port","tür","fenster","kofferraum","heckklappe","motorhaube","schiebedach","dach","klappe","panoramadach","door state","doors overall","window state","sunroof state","sunroof tilt","tailgate door","tailgate rear window","tailgate state"]),N=this._pickEntities(e,s,["sensor"],["tire","tyre","pressure","wheel","tpms","pressure target","reifen","reifendruck","rad","solldruck","target pressure","tire pressure target"]);this._pickEntities(e,s,["sensor"],["tire temperature","tyre temperature","wheel temperature","reifentemperatur"]);const O=N.filter(e=>this._isTireTargetEntity(e)),H=N.filter(e=>!this._isTireTargetEntity(e)),V=this._pickEntities(e,s,["binary_sensor","sensor","switch"],["light","lights","headlight","lamp","running light","licht","scheinwerfer","abblendlicht","fernlicht"]),j=this._pickEntities(e,s,["binary_sensor","sensor","switch","climate"],["climate","hvac","preconditioning","standklima","vorklimatisierung","defrost","seat","steering wheel","air purification","heater","heating","cooling","klima","sitzheizung","lenkrad","heizung","kühlung","aircon","ac","klimastatus","climate timer"]),D=this._pickEntities(e,s,["sensor","binary_sensor"],["service","inspection","cbs","check control","maintenance","wartung","inspektion","servicebedarf"]),R=this._pickEntities(e,s,["sensor","device_tracker"],["navigation","destination","eta","latitude","longitude","gps","ziel","ankunft","route","routing","navi","position","lat","lon","navigationsstatus","navigationsziel","ankunftsort","ankunftsort breitengrad","ankunftsort längengrad","ankunftsort laengengrad"]),W=this._pickEntities(e,s,["sensor","binary_sensor","switch","number"],["charging","charge","plug","connector","charging mode","charging power","time to fully","charge target","laden","lade","ladeziel","ladestatus","ladekabel"]),K=[];B.length&&K.push({row_items:B,alignment:"center",no_wrap:!0}),L.length&&K.push({row_items:L,alignment:"center",no_wrap:!0});const G=[],F=V.filter(e=>z(e));F.length&&G.push({type:"group",name:"Licht",icon:"mdi:car-light-high",items:F.map(e=>({type:"entity",entity:e}))}),G.length&&K.push({row_items:G,alignment:"center",no_wrap:!0});const q=this._isHybridBatteryChargeEntity(l),J=M?"Batterie":I||q?"48V Batterie (Ladung)":"12V Batterie",Y=I?"48V Batteriegesundheit":"Batteriegesundheit",Z=[];l&&M&&Z.push({title:"Batterie Ladestand",icon:"mdi:battery",energy_level:{entity:l,max_value:100,hide_icon:!0},range_level:{value:100,unit:"%",hide_icon:!0},charging_entity:n||void 0,charge_target_entity:m||void 0,progress_color:"var(--success-color)"}),!r||I&&!M||Z.push({title:Y,icon:"mdi:battery-heart",energy_level:{entity:r,max_value:100,hide_icon:!0},color_template:this._buildBatteryHealthColorTemplate(r)}),d&&"bev"!==P&&Z.push({title:"Tankfüllstand",icon:"mdi:gas-station",energy_level:{entity:d,hide_icon:!0},range_level:_||p||h?{entity:_||p||h,hide_icon:!0}:void 0,color_template:this._buildLowFuelColorTemplate(d)}),!Z.length&&h&&Z.push({title:"Reichweite",icon:"mdi:map-marker-distance",energy_level:{entity:h,hide_icon:!0}});const Q=e.filter(e=>"device_tracker"===e.domain).map(e=>e.entity_id),X=Q[0];this._deviceTrackerEntity=X;const ee=this._buildTireCardConfig(e,i),te=new Set(ee?.entities||[]);this._statusEntities={fuel:d,motion:C,doors:U,tires:H,tireTargets:O};const ie=[],se=[],ae=[],ne=(e,t,i,s)=>{t&&e.push({entity:t,name:i,icon:s})};if(ne(se,l,J,"mdi:battery"),ne(se,r,Y,"mdi:battery-heart"),ne(se,d,"Kraftstoff","mdi:gas-station"),ne(se,u||p||h,"Reichweite","mdi:map-marker-distance"),ne(se,g,"Kilometerstand","mdi:counter"),ne(se,f,"Temperatur","mdi:thermometer"),M&&(ne(se,v,"Ladezeit","mdi:timer"),ne(se,y,"Ladeleistung","mdi:flash")),ne(se,C,"Fahrstatus","mdi:car"),ne(se,T,"Alarmanlage","mdi:shield-lock"),D.forEach(e=>ne(ae,e)),se.length&&(ie.push({name:"Fahrzeug",icon:"mdi:car-info",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Fahrzeugstatus",items:se}]}}),se.forEach(e=>te.add(e.entity))),ae.length&&(ie.push({name:"Service",icon:"mdi:wrench",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Service",items:ae}]}}),ae.forEach(e=>te.add(e.entity))),U.length){const t=U.filter(e=>!this._isDoorOverallEntity(e)),i=this._buildDoorTemplates(t,C);ie.push({name:"Öffnungen",icon:"mdi:car-door",button_type:"default",card_type:"default",notify:i.notify,notify_icon:i.notify_icon,notify_color:i.notify_color,color_template:i.color,sub_card:{default_card:[{title:"Öffnungen",items:U.map(t=>({entity:t,name:this._getDoorLabel(t,e)}))}]}}),U.forEach(e=>te.add(e))}if(ee?.tire_card){const e=this._buildTirePressureTemplates(H,O);ie.push({name:"Reifen",icon:"mdi:car-tire-alert",button_type:"default",card_type:"tire",notify:e.notify,notify_icon:e.notify_icon,notify_color:e.notify_color,color_template:e.color,sub_card:{tire_card:ee.tire_card}}),(ee.entities||[]).forEach(e=>te.add(e))}if(M&&W.length&&(ie.push({name:"Laden",icon:"mdi:ev-station",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Ladezustand",items:W.map(e=>({entity:e}))}]}}),W.forEach(e=>te.add(e))),j.length){const t=this._buildPreconditioningTemplates(b,w,$,k,E);ie.push({name:"Klima",icon:"mdi:car-defrost-front",button_type:"default",card_type:"default",notify:t.notify,notify_icon:t.notify_icon,notify_color:t.notify_color,color_template:t.color,sub_card:{default_card:[{title:"Klima",items:j.map(t=>({entity:t,name:this._getClimateLabel(t,e)}))}]}}),j.forEach(e=>te.add(e))}R.length&&(ie.push({name:"Navigation",icon:"mdi:navigation",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Navigation",items:R.map(e=>({entity:e}))}]}}),R.forEach(e=>te.add(e)));const re=[...ie,...this._buildButtonCards(e,s,te)],oe=t.length?t.map(e=>({image:e})):void 0;return{type:`custom:${ce}`,name:this._vehicleInfo?.name||"BMW",indicator_rows:K.length?K:void 0,range_info:Z.length?Z:void 0,button_cards:re.length?re:void 0,images:oe,mini_map:X?{device_tracker:X,entities:Q,maptiler_api_key:this._config?.maptiler_api_key,maptiler_style:this._config?.maptiler_style,enable_popup:!0,map_height:240,map_zoom:14,user_location:!0,use_zone_name:!0}:void 0,layout_config:{section_order:["indicators","range_info","images","mini_map","buttons"],button_grid:{columns:2,swipe:!0},images_swipe:{autoplay:!0,loop:!0,delay:6e3,speed:600,effect:"fade",height:240},range_info_config:{layout:"row"},single_tire_card:void 0}}}_buildButtonCards(e,t,i){const s=["lock","switch","button","cover","climate"],a=new Set([...t,...i?Array.from(i):[]]),n=e.filter(e=>!a.has(e.entity_id)).sort((e,t)=>{const i=s.indexOf(e.domain),a=s.indexOf(t.domain);return(-1===i?999:i)-(-1===a?999:a)}),r=[];for(const e of n){if(r.length>=12)break;s.includes(e.domain)&&(t.add(e.entity_id),a.add(e.entity_id),r.push({entity:e.entity_id,name:e.name,button_type:"default"}))}return r}_mergeVehicleConfig(e,t){if(!t)return e;const i={...e,...t};return["indicator_rows","range_info","images","button_cards"].forEach(e=>{void 0!==t[e]&&(i[e]=t[e])}),void 0!==t.mini_map&&(null===t.mini_map?i.mini_map=null:i.mini_map={...e.mini_map||{},...t.mini_map||{}}),void 0!==t.layout_config&&(i.layout_config=t.layout_config),i}_pickEntity(e,t,i,s){const a=this._findEntity(e,i,s,t);if(a)return t.add(a.entity_id),a.entity_id}_pickEntities(e,t,i,s){const a=this._findEntities(e,i,s,t);return a.forEach(e=>t.add(e.entity_id)),a.map(e=>e.entity_id)}_findEntity(e,t,i,s){return this._findEntities(e,t,i,s)[0]}_findEntities(e,t,i,s){const a=i.map(e=>this._normalizeText(e));return e.filter(e=>!s.has(e.entity_id)).filter(e=>!t.length||t.includes(e.domain)).filter(e=>{if(!a.length)return!0;const t=this._normalizeText(`${e.entity_id} ${e.name} ${e.device_class??""}`);return a.some(e=>t.includes(e))}).sort((e,t)=>{const i=e.state||"",s=t.state||"";return"unknown"===i&&"unknown"!==s?1:"unknown"===s&&"unknown"!==i?-1:e.name.localeCompare(t.name)})}_normalizeText(e){return e.toLowerCase().normalize("NFD").replace(/[\0-]/g," ").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim()}_getEntityLabel(e,t){const i=t.find(t=>t.entity_id===e),s=i?.name?.trim();return s?this._stripVehiclePrefix(s):this._beautifyEntityName(e)}_stripVehiclePrefix(e){const t=this._getVehiclePrefixes();if(!t.length)return e;const i=e.toLowerCase();for(const s of t){const t=s.toLowerCase();if(i.startsWith(t))return e.slice(s.length).trim()}return e}_getVehiclePrefixes(){const e=this._vehicleInfo;if(!e)return[];const t=[e.name,`${e.make||""} ${e.model||""}`.trim(),e.model,e.series,e.trim].filter(Boolean);return Array.from(new Set(t.map(e=>e.trim()).filter(Boolean)))}_stripPrefixToKeyword(e,t){const i=e.toLowerCase(),s=t.map(e=>i.indexOf(e)).filter(e=>e>=0).sort((e,t)=>e-t)[0];return void 0===s?e:e.slice(s).trim()}_getDoorLabel(e,t){const i=t.find(t=>t.entity_id===e),s=this._stripVehiclePrefix(i?.name?.trim()||e),a=this._stripPrefixToKeyword(s,["door","window","tailgate","hood","sunroof"]),n=this._normalizeText(a),r=e=>n.includes("front")&&n.includes("driver")?`${e} vorn links`:n.includes("front")&&n.includes("passenger")?`${e} vorn rechts`:n.includes("rear")&&n.includes("driver")?`${e} hinten links`:n.includes("rear")&&n.includes("passenger")?`${e} hinten rechts`:void 0;return n.includes("doors overall")?"Türen gesamt":n.includes("door state")?r("Tür")||"Tür":n.includes("window state")?r("Fenster")||"Fenster":n.includes("tailgate rear window")?"Heckscheibe":n.includes("tailgate door")||n.includes("tailgate state")?"Heckklappe":n.includes("trunk")||n.includes("boot")?"Kofferraum":n.includes("hood")||n.includes("bonnet")?"Motorhaube":n.includes("sunroof overall")?"Schiebedach gesamt":n.includes("sunroof tilt")?"Schiebedach gekippt":n.includes("sunroof")?"Schiebedach":this._stripVehiclePrefix(i?.name?.trim()||this._beautifyEntityName(e))}_getClimateLabel(e,t){const i=t.find(t=>t.entity_id===e),s=this._stripVehiclePrefix(i?.name?.trim()||e),a=this._stripPrefixToKeyword(s,["climate","preconditioning"]),n=this._normalizeText(a);if(n.includes("climate timer")){const e=n.includes("weekly 1")?"Klima-Timer Woche 1":n.includes("weekly 2")?"Klima-Timer Woche 2":n.includes("next only")?"Klima-Timer Nächster":"Klima-Timer";return n.includes("hour")?`${e} (Stunde)`:n.includes("minute")?`${e} (Minute)`:n.includes("state")?`${e} (Status)`:e}return n.includes("preconditioning engine used")?"Vorklimatisierung Motor verwendet":n.includes("preconditioning error")?"Vorklimatisierung Fehler":n.includes("preconditioning state")?"Vorklimatisierung Status":this._stripVehiclePrefix(i?.name?.trim()||this._beautifyEntityName(e))}_beautifyEntityName(e){const t=(e.split(".").pop()||e).split("_").filter(Boolean).map(e=>e.toLowerCase()),i={door:"Tür",doors:"Türen",window:"Fenster",windows:"Fenster",trunk:"Kofferraum",tailgate:"Heckklappe",boot:"Kofferraum",hood:"Motorhaube",bonnet:"Motorhaube",sunroof:"Schiebedach",roof:"Dach",flap:"Klappe",lock:"Schloss",charging:"Laden",port:"Port",front:"vorn",rear:"hinten",left:"links",right:"rechts",climate:"Klima",hvac:"Klima",preconditioning:"Vorklimatisierung",defrost:"Enteisung",seat:"Sitz",steering:"Lenkrad",heater:"Heizung",heating:"Heizung",cooling:"Kühlung",air:"Luft",purification:"Reinigung",timer:"Timer",status:"Status"},s=t.map(e=>i[e]||e).join(" ").replace(/\s+/g," ").trim();return s?s.charAt(0).toUpperCase()+s.slice(1):e}_normalizeEntityId(e){if(!e)return;if(Array.isArray(e)){const t=e.length?String(e[0]).trim():"";return this._normalizeEntityId(t)}if("object"==typeof e){const t=e.entity_id??e.entityId;return this._normalizeEntityId(t)}const t=String(e).trim();if(t){if(t.includes(",")){const e=t.split(",")[0].trim();return this._normalizeEntityId(e)}if(t.includes(".")&&!/\s/.test(t))return t}}_findEntityByKeywords(e,t){return this._findEntity(e,[],t,new Set)?.entity_id}_isNumericState(e){if(null==e)return!1;if("number"==typeof e)return!Number.isNaN(e);const t=String(e).trim().replace(",",".");return!!t&&!Number.isNaN(Number(t))}_buildTireCardConfig(e,t){const i=t=>this._findEntity(e,["sensor"],t,new Set),s=i(["front left","front_left","row1 left","row1 wheel left"]),a=i(["front right","front_right","row1 right","row1 wheel right"]),n=i(["rear left","rear_left","row2 left","row2 wheel left"]),r=i(["rear right","rear_right","row2 right","row2 wheel right"]),o=new Map;e.forEach(e=>{if(!this._isTireTargetEntity(e.entity_id))return;const t=this._tirePositionKey(e.entity_id);t&&o.set(t,e.entity_id)});const l=(e,t)=>{if(!e)return;const i=this._tirePositionKey(e.entity_id),s=i?o.get(i):void 0,a={entity:e.entity_id,name:t,color:this._buildSingleTireColorTemplate(e.entity_id,s)};return s&&(a.additional_entities=[{entity:s,prefix:"Soll: "}]),{config:a,target:s}},c=l(s,"Vorne links"),d=l(a,"Vorne rechts"),h=l(n,"Hinten links"),u=l(r,"Hinten rechts"),_=[s,a,n,r].filter(Boolean).map(e=>e.entity_id),p=[c?.target,d?.target,h?.target,u?.target].filter(Boolean);if(!_.length)return;return{tire_card:{title:"Reifendruck",...t?{background:t}:{},front_left:c?.config,front_right:d?.config,rear_left:h?.config,rear_right:u?.config},entities:[..._,...p]}}_buildSingleTireColorTemplate(e,t){return t?`{% set av = states('${e}') | float(0) %}{% set tv = states('${t}') | float(0) %}{% set state = 'ok' %}{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}{% if av < err %}{% set state = 'error' %}{% elif av < warn %}{% set state = 'warn' %}{% endif %}{% elif av > 0 %}{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}{% endif %}{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`:`{% set av = states('${e}') | float(0) %}{% set state = 'ok' %}{% if av > 0 %}{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}{% endif %}{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`}_isTireTargetEntity(e){const t=this._normalizeText(e);return t.includes("target")||t.includes("solldruck")}_isDoorSummaryEntity(e){const t=this._normalizeText(e);return t.includes("overall")||t.includes("hood")||t.includes("tailgate")||t.includes("sunroof overall")}_isDoorOverallEntity(e){return this._normalizeText(e).includes("doors overall")}_getVehicleStatusLabel(){const e=this._statusEntities?.motion;if(!e||!this.hass)return;const t=this.hass.states[e]?.state;if(!t)return;const i=this._normalizeText(t);return i.includes("driving")||i.includes("fahrt")?"driving":i.includes("standing")||i.includes("stand")?"standing":i.includes("park")||i.includes("parken")?"parking":t}_buildTirePressureTemplates(e,t){const i=this._buildTirePressureTemplateBase(e,t);return i?{notify:`${i}{{ ns.state in ['warn','error'] }}`,color:`${i}{{ iif(ns.state == 'error', 'var(--error-color)', iif(ns.state == 'warn', 'var(--warning-color)', 'var(--secondary-text-color)')) }}`,notify_color:`${i}{{ iif(ns.state == 'error', 'var(--error-color)', 'var(--warning-color)') }}`,notify_icon:`${i}{{ iif(ns.state == 'error', 'mdi:alert', 'mdi:alert-circle') }}`}:{}}_buildTirePressureTemplateBase(e,t){const{pairs:i,fallback:s}=this._buildTirePairs(e,t);if(!i.length&&!s.length)return;return`{% set pairs = [${i.map(e=>`{ 'a': '${e.a}', 't': '${e.t}' }`).join(", ")}] %}{% set fallback = [${s.map(e=>`'${e}'`).join(", ")}] %}{% set ns = namespace(state='ok') %}{% for p in pairs %}{% set av = states(p['a']) | float(0) %}{% set tv = states(p['t']) | float(0) %}{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}{% if av < err %}{% set ns.state = 'error' %}{% elif av < warn and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}{% endif %}{% endfor %}{% if ns.state == 'ok' %}{% for e in fallback %}{% set v = states(e) | float(0) %}{% if v > 0 and v < 180 %}{% set ns.state = 'error' %}{% elif v > 0 and v < 200 and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}{% endfor %}{% endif %}`}_buildDoorTemplates(e,t){const i=this._buildDoorTemplateBase(e,t);return i?{notify:`${i}{{ ns.open }}`,color:`${i}{{ iif(ns.open, 'var(--warning-color)', 'var(--secondary-text-color)') }}`,notify_color:`${i}{{ 'var(--warning-color)' }}`,notify_icon:`${i}{{ 'mdi:car-door' }}`}:{}}_buildDoorTemplateBase(e,t){if(!e.length)return;return`{% set ns = namespace(open=false) %}{% set status = states(${t?`'${t}'`:"''"}) | lower %}{% if status in ['parking','parked','standing'] %}{% for e in [${e.map(e=>`'${e}'`).join(", ")}] %}{% set s = states(e) | lower %}{% if s not in ['closed','geschlossen','secured','gesichert','locked','verriegelt','ok','aus','off','false','no','0','inactive','not_open','unknown','unavailable','none','-'] %}{% set ns.open = true %}{% endif %}{% endfor %}{% endif %}`}_buildPreconditioningTemplates(e,t,i,s,a){const n=this._buildPreconditioningTemplateBase(e,t,i,s,a);return n?{notify:`${n}{{ ns.active or ns.error }}`,color:`${n}{{ iif(ns.error, 'var(--error-color)', iif(ns.active, 'var(--success-color)', 'var(--secondary-text-color)')) }}`,notify_color:`${n}{{ iif(ns.error, 'var(--error-color)', 'var(--success-color)') }}`,notify_icon:`${n}{{ iif(ns.error, 'mdi:alert-circle', 'mdi:car-defrost-front') }}`}:{}}_buildPreconditioningTemplateBase(e,t,i,s,a){if(!(e||t||i||s||a))return;return`{% set ns = namespace(active=false, error=false) %}{% set state = states(${e?`'${e}'`:"''"}) | lower %}{% set err = states(${t?`'${t}'`:"''"}) | lower %}{% set remaining = states(${i?`'${i}'`:"''"}) | float(0) %}{% set engine = states(${s?`'${s}'`:"''"}) | lower %}{% set allowed = states(${a?`'${a}'`:"''"}) | lower %}{% if err not in ['','ok','invalid','unknown','none','-'] %}{% set ns.error = true %}{% endif %}{% if state in ['heating','cooling','ventilation','standby'] %}{% set ns.active = true %}{% endif %}{% if remaining > 0 %}{% set ns.active = true %}{% endif %}{% if engine in ['true','on','yes','1'] %}{% set ns.active = true %}{% endif %}{% if allowed in ['false','off','no','0'] and state in ['heating','cooling','ventilation'] %}{% set ns.error = true %}{% endif %}`}_detectElectrification(e,t,i,s,a,n){const r=this._is48vEntity(t)||e.some(e=>this._is48vEntity(e.entity_id)||this._is48vEntity(e.name)),o=this._isHybridBatteryChargeEntity(i),l=Boolean(s||a||!o&&i)||Boolean(this._findEntity(e,["sensor","binary_sensor"],["electric range","ev range","charging","charge","charging port","traction battery","high voltage","hv battery","electric engine","state of energy"],new Set)),c=Boolean(n)||Boolean(this._findEntity(e,["sensor"],["fuel","tank","kraftstoff","tank level"],new Set));return l?c?"phev":"bev":r?"mhev":"ice"}_is48vEntity(e){return!!e&&this._normalizeText(e).includes("48v")}_isHybridBatteryChargeEntity(e){if(!e)return!1;const t=this._normalizeText(e);return t.includes("48v")||t.includes("12v")||t.includes("trip")||t.includes("end_of_trip")||t.includes("end of trip")||t.includes("bei ankunft")||t.includes("ankunft")||t.includes("arrival")||t.includes("trip_battery")||t.includes("charge level at end of trip")}_selectBestBatteryCharge(e,t){const i=this._findEntities(e,["sensor"],t,new Set);if(!i.length)return;const s=i.map(e=>{const t=this._normalizeText(`${e.entity_id} ${e.name} ${e.device_class??""}`);let i=0;return this._isUnknownState(e.state)||(i+=5),(t.includes("trip")||t.includes("end_of_trip")||t.includes("end of trip"))&&(i+=3),(t.includes("bei ankunft")||t.includes("ankunft")||t.includes("arrival"))&&(i+=3),t.includes("predicted")&&(i-=2),{entity:e.entity_id,score:i}});return s.sort((e,t)=>t.score-e.score),s[0]?.entity}_isEntityUnavailable(e,t){if(!t)return!0;const i=e.find(e=>e.entity_id===t);return!i||this._isUnknownState(i.state)}_isUnknownState(e){if(!e)return!0;const t=this._normalizeText(e);return["unknown","unavailable","none","-"].includes(t)}_buildPwfStatusIconTemplate(e){return`{% set s = states('${e}') | lower %}{{ iif('driving' in s or 'fahrt' in s, 'mdi:car-sports', iif('parking' in s or 'parked' in s or 'parken' in s, 'mdi:parking', iif('standing' in s or 'stand' in s, 'mdi:car-brake-hold', 'mdi:car'))) }}`}_buildAlarmArmingIconTemplate(e){return`{% set s = states('${e}') | lower %}{{ iif(s == 'unarmed', 'mdi:shield-off', iif(s == 'doorsonly', 'mdi:car-door-lock', iif(s == 'doorstiltcabin', 'mdi:shield-car', 'mdi:shield-lock'))) }}`}_buildTirePairs(e,t){const i=new Map;t.forEach(e=>{const t=this._tirePositionKey(e);t&&i.set(t,e)});const s=[],a=[];return e.forEach(e=>{const t=this._tirePositionKey(e);if(!t)return;const n=i.get(t);n?s.push({a:e,t:n}):a.push(e)}),{pairs:s,fallback:a}}_buildLowFuelColorTemplate(e){return`{% set v = states('${e}') | float(0) %}{{ iif(v > 0 and v < 10, 'var(--error-color)', 'var(--primary-color)') }}`}_buildBatteryHealthColorTemplate(e){return`{% set v = states('${e}') | float(0) %}{{ iif(v < 80, 'var(--error-color)', iif(v < 90, 'var(--warning-color)', 'var(--success-color)')) }}`}_buildStatusBadges(){if(!this.hass||!this._statusEntities)return[];const e=[],t=this._statusEntities.fuel;if(t){const i=this.hass.states[t],s=Number(i?.state),a=i?.attributes?.unit_of_measurement;if(!Number.isNaN(s)){("%"===a?s<=15:s<=10)&&e.push({label:"Tank niedrig",level:"warning"})}}this._hasLowTirePressure()&&e.push({label:"Reifendruck niedrig",level:"alert"});return this._hasDoorsOpenWhileParked()&&e.push({label:"Öffnungen offen",level:"warning"}),e}_hasLowTirePressure(){if(!this.hass||!this._statusEntities)return!1;const e=this._statusEntities.tires||[],t=this._statusEntities.tireTargets||[];if(!e.length)return!1;const i=new Map;return t.forEach(e=>{const t=this.hass.states[e]?.state,s=Number(t);if(!Number.isNaN(s)){const t=this._tirePositionKey(e);t&&i.set(t,s)}}),e.some(e=>{const t=this.hass.states[e]?.state,s=Number(t);if(Number.isNaN(s))return!1;const a=this._tirePositionKey(e),n=a?i.get(a):void 0;return void 0!==n?s<.9*n:s<200})}_tirePositionKey(e){const t=this._normalizeText(e);return t.includes("front")&&t.includes("left")?"front_left":t.includes("front")&&t.includes("right")?"front_right":t.includes("rear")&&t.includes("left")?"rear_left":t.includes("rear")&&t.includes("right")?"rear_right":void 0}_hasDoorsOpenWhileParked(){if(!this.hass||!this._statusEntities)return!1;const e=this._getVehicleStatusLabel();if("parked"!==e&&"standing"!==e)return!1;return(this._statusEntities.doors||[]).some(e=>{const t=this.hass.states[e]?.state;if(!t)return!1;const i=this._normalizeText(t);return!["closed","geschlossen","secured","gesichert","locked","verriegelt","ok","aus"].some(e=>i.includes(e))})}render(){return this._error?D`
        <ha-card>
          <div class="message error">${this._error}</div>
        </ha-card>
      `:this._config?.debug&&this._vehicleConfig?D`
        <ha-card>
          <div class="message">
            <strong>Debug: vehicle-status-card config</strong>
            <pre>${this._toYaml(this._vehicleConfig)}</pre>
          </div>
        </ha-card>
      `:customElements.get(ce)?this._vehicleConfig?D`
      <div class="card-wrapper">
        <vehicle-status-card></vehicle-status-card>
      </div>
    `:D`
        <ha-card>
          <div class="message">BMW Status Card wird vorbereitet…</div>
        </ha-card>
      `:D`
        <ha-card>
          <div class="message">
            Fahrzeugkarte <strong>vehicle-status-card</strong> ist nicht geladen. Installiere die Karte oder setze
            <strong>vehicle_status_card_resource</strong>.
          </div>
        </ha-card>
      `}}class ue extends re{constructor(){super(...arguments),this._geminiModelsLoading=!1,this._openAiModelsLoading=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_bmwHomeEntity:{state:!0},_bmwCardataEntity:{state:!0},_bmwHomeEntities:{state:!0},_bmwCardataEntities:{state:!0},_aiTaskEntities:{state:!0},_editorError:{state:!0},_geminiModels:{state:!0},_geminiModelsLoading:{state:!0},_geminiModelsError:{state:!0},_openAiModels:{state:!0},_openAiModelsLoading:{state:!0},_openAiModelsError:{state:!0}}}static{this._errorHooked=!1}set hass(e){this._hass=e,this._ensureHaComponents(),this._loadIntegrationEntities(),ue._errorHooked||(ue._errorHooked=!0,window.addEventListener("error",e=>{console.error("[bmw-status-card] Window error:",e.error||e.message||e)}),window.addEventListener("unhandledrejection",e=>{console.error("[bmw-status-card] Unhandled rejection:",e.reason)}))}get hass(){return this._hass}setConfig(e){const t=e.image?.ai?.ha_entity_id||e.image?.ai?.entity_id||e.image?.ai?.ai_task_entity||e.image?.ai?.entity||e.image?.ai?.task_entity,i="ai"===e.image?.mode?e.image?.ai?.provider||"ha_ai_task":e.image?.ai?.provider;this._config={...e,type:e.type||`custom:${le}`,image:e.image?.ai?{...e.image,mode:e.image.mode||"ai",ai:{...e.image.ai,provider:i,ha_entity_id:t||e.image.ai.ha_entity_id}}:e.image},this._maybeLoadGeminiModels(),this._maybeLoadOpenAiModels()}_ensureHaComponents(){customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement?.()}async _loadIntegrationEntities(){if(this.hass)try{const e=await this.hass.callWS({type:"config/entity_registry/list"}),t=e.filter(e=>"bmw_home"===e.platform).map(e=>e.entity_id).sort(),i=e.filter(e=>"cardata"===e.platform).map(e=>e.entity_id).sort(),s=e.filter(e=>e.entity_id.includes("ai_task")).map(e=>e.entity_id),a=Object.keys(this.hass.states||{}).filter(e=>e.includes("ai_task")),n=Array.from(new Set([...s,...a])).sort();this._bmwHomeEntities=t,this._bmwCardataEntities=i,this._aiTaskEntities=n}catch(e){}}static{this.styles=n`
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
  `}_setEditorError(e){const t=e instanceof Error?`${e.message}\n${e.stack||""}`:String(e);this._editorError=t,console.error("[bmw-status-card] Editor error:",e)}_emitConfigChanged(){if(!this._config)return;const e={...this._config,type:this._config.type||`custom:${le}`};try{console.debug("[bmw-status-card] config-changed",e),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._editorError=void 0}catch(e){this._setEditorError(e)}}_setConfigValue(e,t){if(this._config)try{const i=e.split("."),s=[];let a={...this._config},n=a;for(let e=0;e<i.length-1;e+=1){const t=i[e];s.push({parent:n,key:t}),n[t]={...n[t]||{}},n=n[t]}const r=i[i.length-1];""===t||null==t?delete n[r]:n[r]=t,"image.ai.generate_request_id"!==e&&a.image?.ai?.generate_request_id&&delete a.image.ai.generate_request_id;for(let e=s.length-1;e>=0;e-=1){const{parent:t,key:i}=s[e];t[i]&&0===Object.keys(t[i]).length&&delete t[i]}this._config=a,this._emitConfigChanged(),this._maybeLoadGeminiModels(e,t),this._maybeLoadOpenAiModels(e,t)}catch(e){this._setEditorError(e)}}_onValueChanged(e){const t=e.target,i=t?.dataset?.path;i&&this._setConfigValue(i,t.value)}_onImageModeChanged(e){const t=e.currentTarget,i=e.detail?.value??t?.value;if(!i||!["off","static","ai"].includes(i))return;if(console.debug("[bmw-status-card] image mode changed:",i),!this._config)return;const s={...this._config};"off"===i?delete s.image:s.image="static"===i?{...s.image||{},mode:"static",static_urls:s.image?.static_urls||[]}:{...s.image||{},mode:"ai",ai:s.image?.ai||{}},this._config=s,this._emitConfigChanged()}_onSelectChanged(e){const t=e.currentTarget,i=t?.dataset?.path;if(!i)return;const s=e.detail?.value??t?.value;this._setConfigValue(i,s)}_normalizeEntityId(e){if(!e)return;if(Array.isArray(e)){const t=e.length?String(e[0]).trim():"";return this._normalizeEntityId(t)}if("object"==typeof e){const t=e.entity_id??e.entityId;return this._normalizeEntityId(t)}const t=String(e).trim();if(t){if(t.includes(",")){const e=t.split(",")[0].trim();return this._normalizeEntityId(e)}if(t.includes(".")&&!/\s/.test(t))return t}}_onToggleChanged(e){const t=e.currentTarget,i=t?.dataset?.path;i&&this._setConfigValue(i,Boolean(t?.checked))}_maybeLoadGeminiModels(e,t){if("gemini"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===e?t||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._geminiModelsLoading||this._geminiModelsKey===i&&this._geminiModels?.length||(this._geminiModelsTimer&&window.clearTimeout(this._geminiModelsTimer),this._geminiModelsTimer=window.setTimeout(()=>{this._loadGeminiModels(i)},400))}_maybeLoadOpenAiModels(e,t){if("openai"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===e?t||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._openAiModelsLoading||this._openAiModelsKey===i&&this._openAiModels?.length||(this._openAiModelsTimer&&window.clearTimeout(this._openAiModelsTimer),this._openAiModelsTimer=window.setTimeout(()=>{this._loadOpenAiModels(i)},400))}async _loadOpenAiModels(e){this._openAiModelsLoading=!0,this._openAiModelsError=void 0,this._openAiModelsKey=e;try{const t=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${e}`}});if(!t.ok){const e=await t.text();throw new Error(`OpenAI ListModels Fehler: ${t.status} ${e}`)}const i=await t.json(),s=(i?.data||[]).map(e=>e.id||"").filter(Boolean).filter(e=>/(image|dall-e|gpt-image)/i.test(e)).sort();this._openAiModels=s}catch(e){this._openAiModelsError=e?.message||String(e),this._openAiModels=void 0,console.warn("[bmw-status-card] OpenAI ListModels fehlgeschlagen:",e)}finally{this._openAiModelsLoading=!1,this.requestUpdate()}}async _loadGeminiModels(e){this._geminiModelsLoading=!0,this._geminiModelsError=void 0,this._geminiModelsKey=e;try{const t=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${e}`);if(!t.ok){const e=await t.text();throw new Error(`ListModels Fehler: ${t.status} ${e}`)}const i=await t.json(),s=(i?.models||[]).filter(e=>(e.supportedGenerationMethods||[]).includes("generateContent")).map(e=>e.name||"").filter(Boolean).map(e=>e.replace(/^models\//,"")).filter(Boolean).sort();this._geminiModels=s}catch(e){this._geminiModelsError=e?.message||String(e),this._geminiModels=void 0,console.warn("[bmw-status-card] Gemini ListModels fehlgeschlagen:",e)}finally{this._geminiModelsLoading=!1,this.requestUpdate()}}_onListChanged(e){const t=e.target,i=t?.dataset?.path;if(!i)return;const s=(t.value||"").split(",").map(e=>e.trim()).filter(Boolean);this._setConfigValue(i,s.length?s:void 0)}async _resolveDeviceIdFromEntity(e,t){if(this.hass)try{const i=await this.hass.callWS({type:"config/entity_registry/get",entity_id:e});i?.device_id&&this._setConfigValue(t,i.device_id)}catch(e){}}async _onEntityPicked(e){const t=e.target,i=e.detail?.value??t?.value,s=t?.dataset?.target;i&&s&&("bmw_home_device_id"===s?this._bmwHomeEntity=i:"bmw_cardata_device_id"===s&&(this._bmwCardataEntity=i),await this._resolveDeviceIdFromEntity(i,s))}render(){if(!this._config)return D``;const e=this._config.image?.mode||"off",t=this._config.image?.ai||{},i=t.provider||"ha_ai_task",s=(this._aiTaskEntities||[]).filter(e=>e.startsWith("ai_task.")),a=t.ha_entity_id||t.entity_id||t.ai_task_entity||t.entity||t.task_entity,n=this._normalizeEntityId(a)||("string"==typeof a?a.trim():"")||"",r=n&&!s.includes(n)?[n,...s]:s,o=!1!==t.generate_on_demand,l=t.upload??("openai"===i||"gemini"===i||"ha_ai_task"===i);try{return D`
        <div class="form">
          ${this._editorError?D`<div class="error">${this._editorError}</div>`:null}
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
            <ha-textfield
              label="Kennzeichen (optional)"
              .value=${this._config.vehicle_info?.license_plate||""}
              data-path="vehicle_info.license_plate"
              @input=${this._onValueChanged}
            ></ha-textfield>
          </div>
          <div class="row">
            <div class="field">
              <label class="hint">MapTiler Theme</label>
              <select
                data-path="maptiler_style"
                @change=${e=>this._onSelectChanged(e)}
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
            <select @change=${e=>this._onImageModeChanged(e)} .value=${e}>
              <option value="off">off (keine Bilder)</option>
              <option value="static">static (URLs)</option>
              <option value="ai">ai (OpenAI/Gemini/Custom)</option>
            </select>
          </div>
          <div class="hint">Pflicht: keine. Optional: Bilder über AI oder feste URLs.</div>

          ${"static"===e?D`
                <ha-textarea
                  label="Statische Bild-URLs (kommagetrennt, optional)"
                  .value=${(this._config.image?.static_urls||[]).join(", ")}
                  data-path="image.static_urls"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Beispiel: https://.../front.jpg, https://.../rear.jpg</div>
              `:null}

          ${"ai"===e?D`
                <div class="row">
                  <div class="field">
                    <label class="hint">AI Provider</label>
                    <select
                      data-path="image.ai.provider"
                      @change=${e=>this._onSelectChanged(e)}
                      .value=${i}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="gemini">Gemini (Imagen)</option>
                      <option value="ha_ai_task">Home Assistant (ai_task)</option>
                      <option value="generic">Generic Endpoint</option>
                    </select>
                  </div>
                  ${"openai"===i||"gemini"===i?D`
                        <ha-textfield
                          label="AI API Key (erforderlich für OpenAI/Gemini)"
                          .value=${t.api_key||""}
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
                  ${o?D`<div class="hint">Bilder werden nur nach Klick generiert (Cache aktiv).</div>`:D`<div class="hint">Auto-Generierung aktiv.</div>`}
                </div>
                ${"ha_ai_task"===i?D`
                      <div class="hint">Nutze Home Assistant ai_task.generate_image und erhalte Media-URLs.</div>
                      <div class="field">
                        <label class="hint">ai_task Entity (optional)</label>
                        <ha-entity-picker
                          .hass=${this.hass}
                          .value=${n}
                          .includeEntities=${s}
                          data-path="image.ai.ha_entity_id"
                          @value-changed=${this._onSelectChanged}
                          allow-custom-entity
                        ></ha-entity-picker>
                      </div>
                      ${0===r.length?D`<div class="hint">Keine ai_task Entities gefunden.</div>`:null}
                    `:null}
                ${"openai"===i||"gemini"===i||"ha_ai_task"===i?D`
                      <div class="row">
                        <div class="field">
                          <label class="hint">Bilder via upload_file speichern</label>
                          <ha-switch
                            .checked=${l}
                            data-path="image.ai.upload"
                            @change=${this._onToggleChanged}
                          ></ha-switch>
                        </div>
                        <div class="field">
                          <label class="hint">Prompt/Modell als Metadaten speichern</label>
                          <ha-switch
                            .checked=${!0===t.tag_metadata}
                            data-path="image.ai.tag_metadata"
                            @change=${this._onToggleChanged}
                          ></ha-switch>
                        </div>
                        ${l?D`
                              <ha-textfield
                                label="Upload Pfad (relativ zu /config)"
                                .value=${t.upload_path||"www/upload_file"}
                                data-path="image.ai.upload_path"
                                @input=${this._onValueChanged}
                              ></ha-textfield>
                            `:null}
                      </div>
                      <div class="hint">
                        Benötigt die Integration <strong>upload_file</strong>.
                      </div>
                      <div class="hint">
                        Speichert eine <code>.meta.json</code> Datei je Bild im Upload-Pfad.
                      </div>
                    `:null}
                ${"generic"!==i?D`
                      <div class="row">
                        ${"gemini"===i&&this._geminiModels?.length?D`
                              <div class="field">
                                <label class="hint">Gemini Model (aus ListModels)</label>
                                <select
                                  data-path="image.ai.model"
                                  @change=${e=>this._onSelectChanged(e)}
                                  .value=${t.model||""}
                                >
                                  <option value="">Auto (Standard)</option>
                                  ${this._geminiModels.map(e=>D`<option value=${e}>${e}</option>`)}
                                </select>
                              </div>
                            `:"openai"===i&&this._openAiModels?.length?D`
                                <div class="field">
                                  <label class="hint">OpenAI Model (gefiltert)</label>
                                  <select
                                    data-path="image.ai.model"
                                    @change=${e=>this._onSelectChanged(e)}
                                    .value=${t.model||""}
                                  >
                                    <option value="">Auto (Standard)</option>
                                    ${this._openAiModels.map(e=>D`<option value=${e}>${e}</option>`)}
                                  </select>
                                </div>
                              `:D`
                                <ha-textfield
                                  label="AI Model (optional)"
                                  .value=${t.model||""}
                                  placeholder="OpenAI: gpt-image-1 | Gemini: imagen-3.0-generate-002"
                                  data-path="image.ai.model"
                                  @input=${this._onValueChanged}
                                ></ha-textfield>
                              `}
                        ${"openai"===i?D`
                              <div class="field">
                                <label class="hint">Bildgröße (OpenAI)</label>
                                <select
                                  data-path="image.ai.size"
                                  @change=${e=>this._onSelectChanged(e)}
                                  .value=${t.size||"1024x1024"}
                                >
                                  <option value="1024x1024">1024x1024</option>
                                  <option value="1792x1024">1792x1024</option>
                                  <option value="1024x1792">1024x1792</option>
                                </select>
                              </div>
                            `:null}
                      </div>
                    `:D`
                      <div class="row">
                        <ha-textfield
                          label="AI Endpoint (erforderlich)"
                          .value=${t.endpoint||""}
                          data-path="image.ai.endpoint"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      </div>
                    `}
                ${"gemini"===i&&this._geminiModelsLoading?D`<div class="hint">Lade Gemini-Modelle…</div>`:null}
                ${"gemini"===i&&this._geminiModelsError?D`<div class="hint">${this._geminiModelsError}</div>`:null}
                ${"openai"===i&&this._openAiModelsLoading?D`<div class="hint">Lade OpenAI-Modelle…</div>`:null}
                ${"openai"===i&&this._openAiModelsError?D`<div class="hint">${this._openAiModelsError}</div>`:null}
                <div class="row">
                  ${"gemini"===i?D`
                        <div class="field">
                          <label class="hint">Aspect Ratio (Gemini)</label>
                          <select
                            data-path="image.ai.aspect_ratio"
                            @change=${e=>this._onSelectChanged(e)}
                            .value=${t.aspect_ratio||"1:1"}
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
                    .value=${t.count??""}
                    type="number"
                    placeholder="1"
                    data-path="image.ai.count"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                  <ha-textfield
                    label="Max Bilder (optional)"
                    .value=${t.max_images??""}
                    type="number"
                    placeholder="8"
                    data-path="image.ai.max_images"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <ha-textarea
                  label="Prompt Template (optional)"
                  .value=${t.prompt_template||""}
                  placeholder="High-quality photo of a {year} {color} {make} {model}, {angle}"
                  data-path="image.ai.prompt_template"
                  @input=${this._onValueChanged}
                ></ha-textarea>
                <div class="hint">Optional: nutze {angle} für Blickwinkel. Wenn leer, wird ein Default genutzt.</div>
                <ha-textarea
                  label="Views (kommagetrennt, optional)"
                  .value=${(t.views||[]).join(", ")}
                  placeholder="front 3/4 view, rear 3/4 view, side profile"
                  data-path="image.ai.views"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <ha-textarea
                  label="Prompts (kommagetrennt, optional)"
                  .value=${(t.prompts||[]).join(", ")}
                  placeholder="Eigene Prompts überschreiben views"
                  data-path="image.ai.prompts"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Optional: Bei Prompts wird {angle} ignoriert, Views sind dann optional.</div>
              `:null}
        </div>
      `}catch(e){return this._setEditorError(e),D`<div class="error">${this._editorError}</div>`}}}customElements.define(le,he),customElements.define("bmw-status-card-editor",ue),window.customCards=window.customCards||[],window.customCards.push({type:le,name:"BMW Status Card",description:"Auto-Konfiguration für bmw_home + bmw-cardata-ha, basiert auf vehicle-status-card.",version:"0.1.58"});
//# sourceMappingURL=bmw-status-card.js.map
