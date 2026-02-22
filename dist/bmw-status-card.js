/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let a=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=s.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&s.set(i,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new a(s,e,i)},r=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:o,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:_}=Object,u=globalThis,p=u.trustedTypes,m=p?p.emptyScript:"",g=u.reactiveElementPolyfillSupport,f=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},y=(e,t)=>!o(e,t),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&l(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:a}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);a?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...h(e),...d(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(r(e))}else void 0!==e&&t.push(r(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(t)i.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=t.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),a="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const n=a.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){const n=this.constructor;if(!1===s&&(a=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??y)(a,t)||i.useDefault&&i.reflect&&a===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==a||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[f("elementProperties")]=new Map,b[f("finalized")]=new Map,g?.({ReactiveElement:b}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,$=e=>e,E=k.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+A,T=`<${x}>`,P=document,M=()=>P.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,B=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,O=/-->/g,L=/>/g,N=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,V=/"/g,H=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),j=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),R=new WeakMap,G=P.createTreeWalker(P,129);function F(e,t){if(!B(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const q=(e,t)=>{const i=e.length-1,s=[];let a,n=2===t?"<svg>":3===t?"<math>":"",r=U;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===U?"!--"===l[1]?r=O:void 0!==l[1]?r=L:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=N):void 0!==l[3]&&(r=N):r===N?">"===l[0]?(r=a??U,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?N:'"'===l[3]?V:W):r===V||r===W?r=N:r===O||r===L?r=U:(r=N,a=void 0);const d=r===N&&e[t+1].startsWith("/>")?" ":"";n+=r===U?i+T:c>=0?(s.push(o),i.slice(0,c)+C+i.slice(c)+A+d):i+A+(-2===c?t:d)}return[F(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class J{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let a=0,n=0;const r=e.length-1,o=this.parts,[l,c]=q(e,t);if(this.el=J.createElement(l,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=G.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(C)){const t=c[n++],i=s.getAttribute(e).split(A),r=/([.?@])?(.*)/.exec(t);o.push({type:1,index:a,name:r[2],strings:i,ctor:"."===r[1]?ee:"?"===r[1]?te:"@"===r[1]?ie:X}),s.removeAttribute(e)}else e.startsWith(A)&&(o.push({type:6,index:a}),s.removeAttribute(e));if(H.test(s.tagName)){const e=s.textContent.split(A),t=e.length-1;if(t>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],M()),G.nextNode(),o.push({type:2,index:++a});s.append(e[t],M())}}}else if(8===s.nodeType)if(s.data===x)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=s.data.indexOf(A,e+1));)o.push({type:7,index:a}),e+=A.length-1}a++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,s){if(t===j)return t;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const n=I(t)?void 0:t._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(e),a._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(t=Y(e,a._$AS(e,t.values),a,s)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);G.currentNode=s;let a=G.nextNode(),n=0,r=0,o=i[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new Q(a,a.nextSibling,this,e):1===o.type?t=new o.ctor(a,o.name,o.strings,this,e):6===o.type&&(t=new se(a,this,e)),this._$AV.push(t),o=i[++r]}n!==o?.index&&(a=G.nextNode(),n++)}return G.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),I(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==j&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>B(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=J.createElement(F(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Z(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=R.get(e.strings);return void 0===t&&R.set(e.strings,t=new J(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const a of e)s===t.length?t.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=t[s],i._$AI(a),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=$(e).nextSibling;$(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,s){const a=this.strings;let n=!1;if(void 0===a)e=Y(this,e,t,0),n=!I(e)||e!==this._$AH&&e!==j,n&&(this._$AH=e);else{const s=e;let r,o;for(e=a[0],r=0;r<a.length-1;r++)o=Y(this,s[i+r],t,r),o===j&&(o=this._$AH[r]),n||=!I(o)||o!==this._$AH[r],o===K?e=K:e!==K&&(e+=(o??"")+a[r+1]),this._$AH[r]=o}n&&!s&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class te extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class ie extends X{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??K)===j)return;const i=this._$AH,s=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==K&&(i===K||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(J,Q),(k.litHtmlVersions??=[]).push("3.3.2");const ne=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class re extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let a=s._$litPart$;if(void 0===a){const e=i?.renderBefore??null;s._$litPart$=a=new Q(t.insertBefore(M(),e),e,void 0,i??{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}re._$litElement$=!0,re.finalized=!0,ne.litElementHydrateSupport?.({LitElement:re});const oe=ne.litElementPolyfillSupport;oe?.({LitElement:re}),(ne.litElementVersions??=[]).push("4.2.2");const le="bmw-status-card",ce="vehicle-status-card",he="High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}, clean studio background, realistic, sharp details.";class de extends re{constructor(){super(...arguments),this._loading=!1,this._autoGenerateOnce=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_vehicleConfig:{state:!0},_error:{state:!0},_loading:{state:!0},_vehicleInfo:{state:!0}}}static{this.styles=n`
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
  `}set hass(e){this._hass=e,this._ensureConfig()}get hass(){return this._hass}setConfig(e){this._config=e,this._vehicleConfig=void 0,this._error=void 0,e?.bmw_cardata_device_id||(this._error="bmw_cardata_device_id ist erforderlich (bmw_home_device_id ist optional)."),this._vehicleInfo=void 0,this._entityEntriesCache=void 0,this._deviceEntriesCache=void 0,this._ensureVehicleCardLoaded(),this._autoGenerateOnce=this._shouldAutoGenerateOnce(),this._ensureConfig()}updated(){const e=this.renderRoot.querySelector(ce);if(e&&this.hass&&(e.hass=this.hass,this._vehicleConfig)){const t=this._hash(JSON.stringify(this._vehicleConfig));this._lastVehicleConfigKey!==t&&(this._lastVehicleConfigKey=t,e.setConfig(this._vehicleConfig))}this._maybeRefreshImagesOnStatusChange(),this._maybeRefreshMiniMapOnDeviceTrackerChange(),this._maybeRefreshCompositeOnStateChange()}getCardSize(){return 6}static getConfigElement(){return document.createElement("bmw-status-card-editor")}static getStubConfig(){return{type:`custom:${le}`,bmw_home_device_id:"",bmw_cardata_device_id:""}}async _ensureVehicleCardLoaded(){if(!this._config?.vehicle_status_card_resource)return;if(customElements.get(ce))return;document.querySelector(`script[data-bmw-status-card="${this._config.vehicle_status_card_resource}"]`)||await new Promise((e,t)=>{const i=document.createElement("script");i.type="module",i.src=this._config.vehicle_status_card_resource,i.dataset.bmwStatusCard=this._config.vehicle_status_card_resource,i.addEventListener("load",()=>e()),i.addEventListener("error",()=>t()),document.head.appendChild(i)})}async _ensureConfig(){if(this.hass&&this._config&&!this._loading&&!this._vehicleConfig&&this._config.bmw_cardata_device_id){this._loading=!0,this._vehicleConfig||(this._vehicleConfig=void 0);try{console.debug("[bmw-status-card] building config");const e=[this._config.bmw_home_device_id,this._config.bmw_cardata_device_id].filter(Boolean),t=await this._getEntityRegistry(),i=await this._getDeviceRegistry(),s=this._buildEntityInfo(t,e),a=this._buildVehicleInfo(i,s);this._vehicleInfo=a;const n=this._buildVehicleStatusCardConfig(s,[],void 0);this._vehicleConfig=this._mergeVehicleConfig(n,this._config.vehicle_status_card),this.requestUpdate();const r=this._resolveImages(a,s),o=this._resolveTireCardImage(a,s),[l,c]=await Promise.all([r,o]);if(l.length||c){const e=this._buildVehicleStatusCardConfig(s,l,c||void 0);this._vehicleConfig=this._mergeVehicleConfig(e,this._config.vehicle_status_card)}this._error=void 0}catch(e){this._error=e?.message||String(e),console.error("[bmw-status-card] config build failed:",e)}finally{this._loading=!1,this.requestUpdate()}}}_maybeRefreshImagesOnStatusChange(){if(!this._config?.image||"ai"!==this._config.image.mode)return;const e=this._config.image.ai||{},t=!1!==e.generate_on_demand,i=this._getVehicleStatusLabel()||"unknown",s=this._deviceTrackerEntity&&this.hass?.states[this._deviceTrackerEntity]?.state||"unknown";if(this._lastImageStatus!==i||this._lastImageZone!==s){if(this._lastImageStatus=i,this._lastImageZone=s,t&&!e.generate_request_id){if(!(!1!==e.generate_on_save)||this._isInEditor())return;this._autoGenerateOnce=!0}this._vehicleConfig&&(this._vehicleConfig={...this._vehicleConfig,images:[]},this._lastVehicleConfigKey=void 0,this.requestUpdate()),this._vehicleConfig=void 0,this._ensureConfig()}}_maybeRefreshCompositeOnStateChange(){if(!this._config?.image||"compositor"!==this._config.image.mode)return;const e=this._buildCompositeStateKey();e&&this._lastCompositeStateKey!==e&&(this._lastCompositeStateKey=e,this._vehicleConfig=void 0,this._ensureConfig())}_maybeRefreshMiniMapOnDeviceTrackerChange(){if(!this._config||!this.hass)return;const e=this._deviceTrackerEntity;if(!e)return;const t=this.hass.states[e]?.state,i=this._lastDeviceTrackerState?!this._isUnknownState(this._lastDeviceTrackerState):void 0,s=!!t&&!this._isUnknownState(t);this._lastDeviceTrackerState!==t&&(this._lastDeviceTrackerState=t,i!==s&&(this._vehicleConfig=void 0,this._ensureConfig()))}_toYaml(e,t=0){const i="  ".repeat(t);if(null==e)return"null";if("string"==typeof e){if(""===e||/[:#\-?{}[\],&*!|>'"%@`\n\r\t]/.test(e)){return`"${e.replace(/"/g,'\\"')}"`}return e}if("number"==typeof e||"boolean"==typeof e)return String(e);if(Array.isArray(e))return e.length?e.map(e=>{if(null!==e&&"object"==typeof e){const s=this._toYaml(e,t+1);return`${i}-\n${s}`}return`${i}- ${this._toYaml(e,t+1).trimStart()}`}).join("\n"):"[]";if("object"==typeof e){const s=Object.entries(e).filter(([,e])=>void 0!==e);return s.length?s.map(([e,s])=>{if(null!==s&&"object"==typeof s){const a=this._toYaml(s,t+1);return`${i}${e}:\n${a}`}return`${i}${e}: ${this._toYaml(s,t+1).trimStart()}`}).join("\n"):"{}"}return String(e)}async _getEntityRegistry(){if(this._entityEntriesCache)return this._entityEntriesCache;const e=await this.hass.callWS({type:"config/entity_registry/list"});return this._entityEntriesCache=e,e}async _getDeviceRegistry(){if(this._deviceEntriesCache)return this._deviceEntriesCache;const e=await this.hass.callWS({type:"config/device_registry/list"});return this._deviceEntriesCache=e,e}_buildEntityInfo(e,t){const i=new Set(t);return e.filter(e=>e.device_id&&i.has(e.device_id)).filter(e=>!e.disabled_by).map(e=>{const t=this.hass.states[e.entity_id],i=e.entity_id.split(".")[0],s=t?.attributes?.friendly_name||e.original_name||e.entity_id;return{entity_id:e.entity_id,domain:i,name:s,device_class:t?.attributes?.device_class,unit:t?.attributes?.unit_of_measurement,state:t?.state,attributes:t?.attributes||{}}})}_extractVehicleInfoFromAttributes(e){const t={};for(const i of e){const e=i.attributes||{},s=e.vehicle_basic_data||e.vehicleBasicData,a=e.vehicle_basic_data_raw||e.vehicleBasicDataRaw;s&&"object"==typeof s&&(t.model=t.model||this._toNonEmptyString(s.model_name),t.series=t.series||this._toNonEmptyString(s.series),t.color=t.color||this._toNonEmptyString(s.color),t.body=t.body||this._toNonEmptyString(s.body_type),t.year=t.year||this._extractYear(s.construction_date),t.license_plate=t.license_plate||this._toNonEmptyString(s.license_plate||s.licensePlate||s.registration_number)),a&&"object"==typeof a&&(t.make=t.make||this._toNonEmptyString(a.brand),t.model=t.model||this._toNonEmptyString(a.modelName)||this._toNonEmptyString(a.modelRange)||this._toNonEmptyString(a.series),t.series=t.series||this._toNonEmptyString(a.series)||this._toNonEmptyString(a.seriesDevt),t.color=t.color||this._toNonEmptyString(a.colourDescription)||this._toNonEmptyString(a.colourCodeRaw),t.body=t.body||this._toNonEmptyString(a.bodyType),t.year=t.year||this._extractYear(a.constructionDate),t.license_plate=t.license_plate||this._toNonEmptyString(a.licensePlate||a.license_plate||a.registrationNumber))}return t}_extractYear(e){if(e){if("number"==typeof e)return String(e);if("string"==typeof e){const t=e.match(/(19|20)\d{2}/);return t?t[0]:void 0}}}_toNonEmptyString(e){if(null==e)return;const t=String(e).trim();return t.length?t:void 0}_buildVehicleInfo(e,t){const i=this._config?.vehicle_info||{},s=[this._config?.bmw_home_device_id,this._config?.bmw_cardata_device_id],a=e.filter(e=>s.includes(e.id)),n=this._extractVehicleInfoFromAttributes(t),r=a.find(e=>e.manufacturer)?.manufacturer||"BMW",o=a.find(e=>e.model)?.model,l=a.find(e=>e.name)?.name,c=this._findEntityByKeywords(t,["model","vehicle_model","car_model"]),h=this._findEntityByKeywords(t,["series","line"]),d=this._findEntityByKeywords(t,["year","model_year"]),_=this._findEntityByKeywords(t,["color","colour"]),u=this._findEntityByKeywords(t,["trim","package","edition"]),p=this._findEntityByKeywords(t,["body","body_type"]),m=e=>{if(!e)return;const t=this.hass.states[e]?.state;return t&&"unknown"!==t&&"unavailable"!==t?t:void 0};return{make:i.make||n.make||r,model:i.model||n.model||m(c)||o,series:i.series||n.series||m(h),year:i.year||n.year||m(d),color:i.color||n.color||m(_),trim:i.trim||n.trim||m(u),body:i.body||n.body||m(p),name:i.name||n.name||l,license_plate:i.license_plate||n.license_plate}}async _resolveImages(e,t){const i=this._config?.image;let s=[];if(!i||"off"===i.mode||"cardata"===i.mode){const e=this._resolveDefaultImageUrl(t);return e?[e]:[]}if("static"===i.mode&&i.static_urls?.length)s=i.static_urls;else if("compositor"===i.mode)s=await this._resolveCompositedImages(e,t);else if("ai"===i.mode&&i.ai){const t=i.ai.provider||"ha_ai_task";"openai"!==t&&"gemini"!==t||i.ai.api_key?(console.debug("[bmw-status-card] generating AI images",i.ai),s=await this._generateAiImages(e,i.ai)):console.warn("[bmw-status-card] image.ai.api_key fehlt – überspringe Bildgenerierung.")}if(s.length)return s;const a=this._resolveDefaultImageUrl(t);return a?[a]:[]}_resolveDefaultImageUrl(e){if(!this.hass)return;const t=this._findImageEntity(e);if(!t)return;const i=this.hass.states[t];if(!i)return;const s=i.attributes||{},a=s.entity_picture||s.image_url||s.image||s.url||i.state;if(!a)return;const n=String(a).trim();return n&&"unknown"!==n&&"unavailable"!==n&&(!this._isUnknownState(i.state)||s.entity_picture||s.image_url||s.image)?n:void 0}_findImageEntity(e){const t=this._findEntity(e,["image"],["vehicle image","vehicle_image","car image","fahrzeugbild","vehicle photo","image"],new Set);if(t)return t.entity_id;const i=e.find(e=>"image"===e.domain);return i?.entity_id}async _resolveCompositedImages(e,t){if(!this.hass||!this._config?.image?.compositor)return[];const i=this._config.image.compositor,s=i.provider||{},a=this._normalizeEntityId(s.entity_id)||this._normalizeEntityId(s.ha_entity_id)||this._normalizeEntityId(this._config.image.ai?.ha_entity_id),n=this._config.image?.ai?.provider,r=String(s.model||"").toLowerCase(),o=s.type||(s.api_key?"gemini"===n||r.includes("gemini")||r.includes("imagen")?"gemini":"openai"===n||r.includes("gpt")||r.includes("dall")?"openai":"gemini":void 0)||(a?"ai_task":void 0),l={...s,type:o};"ai_task"===l.type&&(l.entity_id=a,l.service_data=s.service_data||{});const c=this._resolveCompositorContext(i,t),h=c.baseView,d=c.assetPath,_=c.outputPath,u=String(i.regenerate_request_id||"").trim(),p=Boolean(u),m=["openai","gemini"].includes(String(l.type)),g=c.bundleBySceneView?`${c.view}-${c.scene}`:void 0,f=this._buildCompositorAssetPrefix(e),v=g?`${f}-${g}`:f,y=`${v}_base`,w=this._normalizeLocalUploadUrl(d.replace(/\/$/,"").endsWith("/assets")?d.replace(/\/$/,"").replace(/\/assets$/,"/masks"):`${d.replace(/\/$/,"")}/masks`),b={...i,base_view:h,mask_base_path:c.maskBasePath||w},k=this._buildCompositorAssets(e,h,c.scene,b,m,v,y);let $=new Map;if(("gemini"===l.type||"openai"===l.type)&&!l.api_key)return console.warn("[bmw-status-card] compositor provider requires api_key:",l.type),[];try{const t=await this.hass.callWS({type:"call_service",domain:"image_compositor",service:"ensure_assets",service_data:{output_path:d,task_name_prefix:e.name||"BMW Assets",provider:l,assets:k,force:p},return_response:!0}),i=t?.response??t?.result??t,s=i?.assets||[];s.forEach(e=>{e?.name&&e?.local_url&&$.set(String(e.name),String(e.local_url))});const a=s.filter(e=>e?.name&&e?.error);if(a.length){const e=a.slice(0,5).map(e=>`${e.name}: ${e.error}`).join(" | ");console.warn("[bmw-status-card] image_compositor ensure_assets returned errors:",e)}}catch(e){return console.warn("[bmw-status-card] image_compositor ensure_assets failed:",e),[]}const E=b.base_image||$.get("base");if(!E)return console.warn("[bmw-status-card] compositor base asset missing. Check image_compositor service result and provider credentials/model."),[];const S=this._buildCompositorLayers(t,$,i),C=this._hash(JSON.stringify({baseView:h,view:c.view,scene:c.scene,assetPath:d,outputPath:_,state:this._buildCompositeStateKey(),layers:S.length,regenerateRequestId:u||void 0})),A=`${v}_state_${Math.abs(Number(C)||0)}.png`;try{const e=await this.hass.callWS({type:"call_service",domain:"image_compositor",service:"compose",service_data:{base_image:E,layers:S,cache_key:C,output_name:A,format:"png",output_path:_},return_response:!0}),t=e?.response??e?.result??e,i=t?.local_url||t?.url||t?.local_path;if(p&&this._config?.image?.compositor){const e={...this._config,image:{...this._config.image||{},compositor:{...this._config.image?.compositor||{}}}};delete(e.image?.compositor).regenerate_request_id,this._config=e}return i?[String(i)]:[]}catch(e){return console.warn("[bmw-status-card] image_compositor compose failed:",e),[]}}_resolveCompositorContext(e,t){const i=this._resolveCompositorScene(e),s=this._resolveCompositorView(e,t,i),a=this._resolveCompositorViewPrompt(e,s),n=!1!==e.bundle_by_scene_view,r=e.asset_path||"www/image_compositor/assets",o=e.output_path||"www/image_compositor",l=e.mask_base_path||"/local/image_compositor/masks",c=n?[s,i]:[];return{scene:i,view:s,baseView:a,assetPath:c.reduce((e,t)=>this._appendPathSegment(e,t),r),outputPath:c.reduce((e,t)=>this._appendPathSegment(e,t),o),maskBasePath:c.reduce((e,t)=>this._appendPathSegment(e,t),l),bundleBySceneView:n}}_resolveCompositorScene(e){const t=this._normalizeEntityId(e.scene_entity),i=this._normalizeEntityId(this._statusEntities?.motion),s=t||i,a=s?this.hass?.states[s]?.state:this._getVehicleStatusLabel();return this._mapStateToCompositorScene(a,s)}_mapStateToCompositorScene(e,t){if(!e)return"parked";const i=this._normalizeText(e);if(t&&this._isMotionStateBinarySensor(t)){if(["on","true","1","yes"].includes(i))return"driving";if(["off","false","0","no"].includes(i))return"parked"}return i.includes("driving")||i.includes("fahrt")||i.includes("moving")||i.includes("motion")?"driving":"parked"}_resolveCompositorView(e,t,i){if("front_left"===e.view_mode||"rear_right"===e.view_mode)return e.view_mode;let s=0,a=0;return this._pickEntities(t,new Set,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","tür","fenster","kofferraum","heckklappe","motorhaube","schiebedach"]).forEach(e=>{if(this._isDoorOverallEntity(e))return;const t=this.hass?.states[e]?.state;if(!t||!this._isOpenState(t))return;const i=this._getOpeningAssetKey(e,this._getSunroofState(e,t),!0);i&&(i.includes("rear_")||"trunk_open"===i?a+=1:(i.includes("front_")||"hood_open"===i)&&(s+=1))}),a>s?"rear_right":s>a?"front_left":"driving"===i?"rear_right":"front_left"}_resolveCompositorViewPrompt(e,t){const i=((e.view_prompts||{})[t]||"").trim();return i||("rear_right"===t?"rear 3/4 view":e.base_view||"front 3/4 view")}_appendPathSegment(e,t){const i=String(e||"").trim().replace(/\/+$/,""),s=String(t||"").trim().replace(/^\/+|\/+$/g,"");return i?s?`${i}/${s}`:i:s}_buildCompositorAssets(e,t,i,s,a,n,r){const o=[],l=this._buildCompositorPrompt(e,t,i),c=s.base_image,h=(this._normalizeLocalUploadUrl(s.mask_base_path)||s.mask_base_path||"").replace(/\/$/,""),d=s.mask_map||{};c||o.push({name:"base",filename:`${r}.png`,prompt:l,format:"png"});[{name:"door_front_left_open",description:"front left door open"},{name:"door_front_right_open",description:"front right door open"},{name:"door_rear_left_open",description:"rear left door open"},{name:"door_rear_right_open",description:"rear right door open"},{name:"window_front_left_open",description:"front left window open"},{name:"window_front_right_open",description:"front right window open"},{name:"window_rear_left_open",description:"rear left window open"},{name:"window_rear_right_open",description:"rear right window open"},{name:"hood_open",description:"hood open"},{name:"trunk_open",description:"trunk or tailgate open"},{name:"sunroof_open",description:"sunroof open"},{name:"sunroof_tilt",description:"sunroof tilted"}].forEach(e=>{const t=(i=e.name,d[i]||(h?`${h}/${i}.png`:void 0));var i;const s=a&&!c;o.push({name:e.name,filename:`${n}_${e.name}.png`,prompt:`${l} ${e.description}, transparent background, only the opened part visible`,format:"png",...a&&c?{base_image:c}:{},...s?{base_ref:r}:{},...a?{derive_overlay:!0}:{},...t?{mask_url:t}:{}})});return[{name:"tire_ok",description:"small green circle icon, transparent background"},{name:"tire_warn",description:"small yellow circle icon, transparent background"},{name:"tire_error",description:"small red circle icon, transparent background"}].forEach(e=>{o.push({name:e.name,filename:`${n}_${e.name}.png`,prompt:e.description,format:"png"})}),o}_buildCompositorPrompt(e,t,i){const s={"{make}":e.make||"BMW","{model}":e.model||"","{series}":e.series||"","{year}":e.year||"","{color}":e.color||"","{trim}":e.trim||"","{body}":e.body||"","{angle}":t||""};let a=he;Object.entries(s).forEach(([e,t])=>{const i=t?.trim();a=a.replaceAll(e,i||"")}),t&&!he.includes("{angle}")&&(a=`${a} ${t}`),a="driving"===i?`${a} driving on road, dynamic but realistic environment, car remains sharp`:`${a} parked in a realistic static environment`;const n=(e.license_plate||"").trim();return n&&(a=`${a} license plate text: ${n}`),a.replace(/\s+/g," ").trim()}_buildCompositorLayers(e,t,i){const s=[];this._pickEntities(e,new Set,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","flap","tür","fenster","kofferraum","heckklappe","motorhaube","schiebedach","dach","klappe","panoramadach"]).forEach(e=>{if(this._isDoorOverallEntity(e))return;const i=this.hass?.states[e]?.state;if(!i)return;const a=this._isOpenState(i),n=this._getSunroofState(e,i),r=this._getOpeningAssetKey(e,n,a);if(!r)return;const o=t.get(r);o&&s.push({image:o,x:0,y:0,opacity:1,scale:1})});const a=this._resolveTirePositions(i),n=this._getTireStatusMap(e);return Object.entries(n).forEach(([e,i])=>{const n=t.get(`tire_${i}`),r=a[e];n&&r&&s.push({image:n,x:r.x,y:r.y,opacity:1,scale:1})}),s}_resolveTirePositions(e){return{front_left:{x:270,y:220},front_right:{x:740,y:220},rear_left:{x:270,y:700},rear_right:{x:740,y:700},...e.tire_positions||{}}}_getOpeningAssetKey(e,t,i){const s=this._normalizeText(e);if(s.includes("sunroof")||s.includes("schiebedach")||s.includes("panoramadach"))return"tilt"===t?"sunroof_tilt":"open"===t?"sunroof_open":void 0;if(!i)return;if(s.includes("hood")||s.includes("bonnet")||s.includes("motorhaube"))return"hood_open";if(s.includes("trunk")||s.includes("tailgate")||s.includes("boot")||s.includes("heckklappe"))return"trunk_open";const a=s.includes("window")||s.includes("fenster"),n=s.includes("door")||s.includes("tür"),r=s.includes("front")||s.includes("row1")||s.includes("vorn"),o=s.includes("rear")||s.includes("row2")||s.includes("hinten"),l=s.includes("left")||s.includes("driver")||s.includes("links"),c=s.includes("right")||s.includes("passenger")||s.includes("rechts");return a?r&&l?"window_front_left_open":r&&c?"window_front_right_open":o&&l?"window_rear_left_open":o&&c?"window_rear_right_open":void 0:n?r&&l?"door_front_left_open":r&&c?"door_front_right_open":o&&l?"door_rear_left_open":o&&c?"door_rear_right_open":void 0:void 0}_isOpenState(e){const t=this._normalizeText(e);return!["closed","geschlossen","secured","gesichert","locked","verriegelt","ok","aus","off","false","no","0","inactive","not open","unknown","unavailable","none","-"].some(e=>t.includes(e))}_getSunroofState(e,t){const i=this._normalizeText(e);if(!(i.includes("sunroof")||i.includes("schiebedach")||i.includes("panoramadach")))return;const s=this._normalizeText(t);return s.includes("tilt")||s.includes("tilted")||s.includes("gekipp")?"tilt":this._isOpenState(t)?"open":"closed"}_getTireStatusMap(e){const t={},i=this._pickEntities(e,new Set,["sensor"],["tire","tyre","pressure","wheel","tpms","reifen","reifendruck","rad","solldruck","target pressure","tire pressure target"]),s=i.filter(e=>this._isTireTargetEntity(e)),a=i.filter(e=>!this._isTireTargetEntity(e)),n=new Map;return s.forEach(e=>{const t=this._tirePositionKey(e),i=Number(this.hass?.states[e]?.state);t&&!Number.isNaN(i)&&n.set(t,i)}),a.forEach(e=>{const i=this._tirePositionKey(e);if(!i)return;const s=Number(this.hass?.states[e]?.state);if(Number.isNaN(s))return;const a=n.get(i);let r="ok";void 0!==a&&a>0?s<.8*a?r="error":s<.95*a&&(r="warn"):s<180?r="error":s<200&&(r="warn"),t[i]=r}),t}_buildCompositeStateKey(){if(!this.hass||!this._statusEntities)return;const e={};return[...this._statusEntities.doors||[],...this._statusEntities.tires||[],...this._statusEntities.tireTargets||[]].forEach(t=>{e[t]=this.hass?.states[t]?.state??null}),this._hash(JSON.stringify(e))}async _resolveTireCardImage(e,t){const i=this._config?.image;if(!i||"ai"!==i.mode||!i.ai)return;if(!this._findEntities(t,["sensor"],["tire","tyre","pressure","wheel","tpms","reifen","reifendruck","rad"],new Set).length)return;const s={...i.ai,views:["top-down view, directly above, centered, orthographic, clean studio background, front of the car at the bottom of the image, driver side on the left"],max_images:1,count:1};return(await this._generateAiImages(e,s))[0]}async _generateAiImages(e,t){const i=t.provider||"ha_ai_task",s=t.cache_hours??24,a=this._buildImageCacheKey(e,t),n=Date.now(),r=this._buildPrompts(e,t),o=t.count??1,l=t.max_images??8,c=!1!==t.generate_on_demand,h=this._getVehicleStatusLabel()||"unknown",d=t.upload??("openai"===i||"gemini"===i||"ha_ai_task"===i),_="ha_ai_task"===i||d,u=!0===t.tag_metadata,p=this._resolveAiModel(i,t);if(_){const i=await this._tryGetPersistentCache(a,t,l,e,n);if(i.length)return u&&await this._ensureImageMetadataForCached(i,r,t,a,e),i}try{const e=localStorage.getItem(a);if(e){const t=JSON.parse(e),i=(Date.now()-t.timestamp)/36e5,n=t.images?.some(e=>!this._isCacheableImageUrl(e));if(t.images?.length&&i<=s&&!n&&t.status===h){if(await this._validateCachedImages(t.images))return t.images;localStorage.removeItem(a)}}}catch(e){}if(c&&!t.generate_request_id){if(!this._autoGenerateOnce)return[];this._autoGenerateOnce=!1}let m=[];const g=[];for(const e of r){if(m.length>=l)break;const s=l-m.length,a=Math.min(o,s);if(a<=0)break;let n=[];if(n="openai"===i?await this._fetchOpenAiImages(e,t,a):"gemini"===i?await this._fetchGeminiImages(e,t,a):"ha_ai_task"===i?await this._fetchHaAiTaskImages(e,t,a):await this._fetchGenericImages(e,t,a),n.length&&(m.push(...n),u)){const t=(new Date).toISOString();n.forEach(()=>g.push({prompt:e,provider:i,model:p,created_at:t}))}}if(m.length&&_&&(m=await this._uploadImagesIfNeeded(m,t,a,e,n)),m.length&&u&&g.length&&await this._storeImageMetadata(m,g,t,a,e),m.length&&m.every(e=>this._isCacheableImageUrl(e)))try{localStorage.setItem(a,JSON.stringify({timestamp:Date.now(),images:m,status:h}))}catch(e){}return m}_resolveAiModel(e,t){return t.model?t.model:"openai"===e?"gpt-image-1":"gemini"===e?"imagen-3.0-generate-002":void 0}_buildPrompts(e,t){const i=t.prompt_template||he;if(t.prompts&&t.prompts.length)return t.prompts.map(t=>this._buildPrompt(e,t));if(this._isHomeParked()&&(!t.views||!t.views.length)){return["front 3/4 view, parked on a residential driveway in front of a modern house, daytime"].map(t=>this._buildPrompt(e,i,t))}return(t.views?.length?t.views:["front 3/4 view","rear 3/4 view","side profile","front view","rear view"]).map(t=>this._buildPrompt(e,i,t))}_shouldAutoGenerateOnce(){const e=this._config?.image?.ai;if(!e||"ai"!==this._config?.image?.mode)return!1;const t=!1!==e.generate_on_demand,i=!1!==e.generate_on_save;return!(!t||!i)&&(!e.generate_request_id&&!this._isInEditor())}_isInEditor(){return Boolean(this.closest("hui-dialog-edit-card")||this.closest("hui-card-element-editor")||this.closest("hui-card-preview"))}_buildPrompt(e,t,i){const s=t||he,a=this._getVehicleStatusLabel(),n=this._getStatusScene(a),r=e.license_plate,o={"{make}":e.make||"BMW","{model}":e.model||"","{series}":e.series||"","{year}":e.year||"","{color}":e.color||"","{trim}":e.trim||"","{body}":e.body||"","{angle}":i||"","{status}":n||a||"","{plate}":r||""};let l=s;return Object.entries(o).forEach(([e,t])=>{const i=t?.trim();l=l.replaceAll(e,i||"")}),i&&!s.includes("{angle}")&&(l=`${l} ${i}`),!n&&!a||s.includes("{status}")||(l=n?`${l} ${n}`:`${l} status: ${a}`),r&&!s.includes("{plate}")&&(l=`${l} license plate text: ${r}`),l.replace(/\s+/g," ").trim()}_getStatusScene(e){if(!e)return;const t=this._normalizeText(e);return t.includes("driving")?"driving on the road, motion blur, dynamic scene":t.includes("parking")||t.includes("parked")?"parked in a parking lot, stationary":t.includes("standing")||t.includes("stand")?"stopped at a traffic light or intersection, stationary":void 0}_isHomeParked(){if(!this.hass||!this._deviceTrackerEntity)return!1;const e=this.hass.states[this._deviceTrackerEntity]?.state,t="home"===e?.toLowerCase(),i=this._getVehicleStatusLabel();return Boolean(t&&i&&["parking","parked"].includes(i))}async _fetchOpenAiImages(e,t,i){if(!t.api_key)throw new Error("image.ai.api_key fehlt (OpenAI).");const s=t.endpoint||"https://api.openai.com/v1/images/generations",a={model:t.model||"gpt-image-1",prompt:e,size:t.size||"1024x1024",n:i},n=await fetch(s,{method:"POST",headers:{Authorization:`Bearer ${t.api_key}`,"Content-Type":"application/json"},body:JSON.stringify(a)});if(!n.ok){const e=await n.text();throw new Error(`OpenAI Fehler: ${n.status} ${e}`)}const r=await n.json();return(r?.data||[]).map(e=>e.url||e.b64_json).filter(Boolean).map(e=>e.startsWith("http")?e:`data:image/png;base64,${e}`)}async _fetchGeminiImages(e,t,i){if(!t.api_key)throw new Error("image.ai.api_key fehlt (Gemini).");const s=t.model||"imagen-3.0-generate-002",a=t.endpoint||`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${t.api_key}`,n=t=>{const s={contents:[{role:"user",parts:[{text:e}]}],generationConfig:{candidateCount:i}};return t&&(s.responseModalities=["IMAGE"]),s},r=t.request_body||n(!0),o=async e=>await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});let l=await o(r),c="";if(!l.ok){c=await l.text();if(!(!t.request_body&&(c.includes("response_modalities")||c.includes("responseModalities")||c.includes("imageGenerationConfig")||c.includes("generation_config"))))throw new Error(`Gemini Fehler: ${l.status} ${c}`);if(l=await o(n(!1)),!l.ok){const e=await l.text();throw new Error(`Gemini Fehler: ${l.status} ${e}`)}}const h=await l.json(),d=h?.candidates||[],_=[];if(Array.isArray(d)&&d.forEach(e=>{"SAFETY"===e?.finishReason&&console.warn("[bmw-status-card] Gemini Bild durch Safety-Filter blockiert.");(e?.content?.parts||[]).forEach(e=>{const t=e.inlineData||e.inline_data;if(t?.data){const e=t.mimeType||"image/png";_.push(`data:${e};base64,${t.data}`)}})}),_.length)return _;const u=h?.predictions||h?.images||h?.data||[];return Array.isArray(u)?u.map(e=>{const t=e.bytesBase64Encoded||e?.image?.bytesBase64Encoded||e?.b64_json;return t?`data:image/png;base64,${t}`:"string"==typeof e&&e.startsWith("http")?e:e?.url?e.url:null}).filter(Boolean):[]}async _fetchHaAiTaskImages(e,t,i){if(!this.hass)throw new Error("Home Assistant nicht verfügbar.");const s=this._normalizeEntityId(t.ha_entity_id),a={task_name:`${this._vehicleInfo?.name||this._config?.vehicle_info?.name||"BMW Status Card"} [${this._hash(e)}]`,instructions:e};s&&(a.entity_id=s);for(let e=1;e<=2;e+=1)try{const t=await this.hass.callWS({type:"call_service",domain:"ai_task",service:"generate_image",service_data:a,return_response:!0}),i=t?.response??t?.result??t,s=await this._extractHaAiTaskUrls(i);if(s.length)return s.filter(Boolean);if(console.warn("[bmw-status-card] ai_task: keine Bild-URL erhalten.",i),e<2){await this._delay(600);continue}return[]}catch(t){const i=t?.message||String(t),s=/response did not include image|no image|keine.*bild/i.test(i);if(s&&e<2){console.warn("[bmw-status-card] ai_task: leere Bild-Antwort, retry …"),await this._delay(600);continue}if(s)return console.warn("[bmw-status-card] ai_task: keine Bilddaten, überspringe."),[];throw new Error(`ai_task Fehler: ${i}`)}return[]}async _delay(e){await new Promise(t=>setTimeout(t,e))}async _uploadImagesIfNeeded(e,t,i,s,a){if(!this.hass)return e;const n=t.provider||"ha_ai_task",r=this._normalizeUploadPath(t.upload_path),o=[],l=i?this._hash(i):void 0,c=i?this._buildImageFilenamePrefix(s,i):void 0;for(let t=0;t<e.length;t+=1){const s=e[t];let h,d,_;if(this._isHttpUrl(s))h=s;else{const e=this._parseDataUrl(s);if(e)d=e.data,_=e.mimeType;else if(s.startsWith("/")){const e="ha_ai_task"===n?this._normalizeHaAiTaskUrl(s):s,t=await this._fetchAsDataUrl(e),i=t?this._parseDataUrl(t):null;if(!i){if("ha_ai_task"===n)continue;o.push(s);continue}d=i.data,_=i.mimeType}else{if("ha_ai_task"!==n||!s.startsWith("ai_task/")){if("ha_ai_task"===n)continue;o.push(s);continue}{const e=this._normalizeHaAiTaskUrl(s),t=await this._fetchAsDataUrl(e),i=t?this._parseDataUrl(t):null;if(!i)continue;d=i.data,_=i.mimeType}}}const u=this._guessImageExtension(h,_),p=h||d||s,m=l?`${c}-${t+1}.${u}`:`${this._hash(p)}.${u}`;try{const e=await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:r,filename:m,...h?{url:h}:{data_base64:d}},return_response:!0}),t=e?.response??e?.result??e,n=t?.local_url||t?.url||t?.local_path,l=this._normalizeLocalUploadUrl(n)||s;o.push(this._withCacheBust(l,i,a))}catch(e){"ha_ai_task"!==n&&o.push(s)}}return o}async _storeImageMetadata(e,t,i,s,a){if(!this.hass||!s)return;const n=this._normalizeUploadPath(i.upload_path),r=this._buildImageFilenamePrefix(a,s),o=this._getVehicleStatusLabel()||"unknown",l=a||this._vehicleInfo||{},c=[];for(let i=0;i<e.length;i+=1){const s=t[i];if(!s)continue;const a={image_url:e[i],...s,status:o,vehicle:{make:l.make,model:l.model,series:l.series,year:l.year,color:l.color,trim:l.trim,body:l.body,license_plate:l.license_plate}};c.push(a);const h=`${r}-${i+1}.meta.json`;try{await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:n,filename:h,data_base64:this._toBase64(JSON.stringify(a,null,2))},return_response:!0})}catch(e){}}try{localStorage.setItem(`${s}:meta`,JSON.stringify({timestamp:Date.now(),items:c}))}catch(e){}}async _ensureImageMetadataForCached(e,t,i,s,a){if(!this.hass)return;const n=this._normalizeUploadPath(i.upload_path),r=this._buildImageFilenamePrefix(a,s),o=i.provider||"ha_ai_task",l=this._resolveAiModel(o,i),c=this._getVehicleStatusLabel()||"unknown",h=a||this._vehicleInfo||{};for(let i=0;i<e.length;i+=1){const s=`${r}-${i+1}.meta.json`,a=this._buildLocalUploadUrl(n,s);if(await this._urlExists(a))continue;const d=t[i]||t[0]||"",_={image_url:e[i],prompt:d,provider:o,model:l,created_at:(new Date).toISOString(),status:c,vehicle:{make:h.make,model:h.model,series:h.series,year:h.year,color:h.color,trim:h.trim,body:h.body,license_plate:h.license_plate}};try{await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:n,filename:s,data_base64:this._toBase64(JSON.stringify(_,null,2))},return_response:!0})}catch(e){}}}_toBase64(e){return btoa(unescape(encodeURIComponent(e)))}async _tryGetPersistentCache(e,t,i,s,a){const n=this._normalizeUploadPath(t.upload_path),r=this._buildImageFilenamePrefix(s,e),o=[],l=["png","jpg","jpeg","webp"];for(let t=0;t<i;t+=1){let i;for(const e of l){const s=`${r}-${t+1}.${e}`,a=this._buildLocalUploadUrl(n,s);if(await this._urlExists(a)){i=a;break}}if(!i)break;o.push(this._withCacheBust(i,e,a))}return o}_buildLocalUploadUrl(e,t){return`/local/${this._normalizeUploadPath(e).replace(/^www\//,"")}/${t}`}_withCacheBust(e,t,i){if(!t)return e;if(!this._isLocalImageUrl(e))return e;const s=this._hash(`${t}:${i??Date.now()}`),a=e.includes("?")?"&":"?";return`${e}${a}v=${s}`}_buildImageFilenamePrefix(e,t){const i=e||this._vehicleInfo||{},s=i.make||"bmw",a=i.model||"",n=i.series||"",r=i.license_plate||"",o=this._getVehicleStatusLabel()||"unknown",l=this._deviceTrackerEntity&&this.hass?.states[this._deviceTrackerEntity]?.state||"unknown",c=this._hash(t||JSON.stringify(i)),h=this._slugify([s,a,n,r,o,l].filter(Boolean).join("-"));return`${h.length?h:"bmw-status-card"}-${c}`}_slugify(e){return e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)}async _urlExists(e){if(this.hass&&this._isLocalImageUrl(e)){const t=await this._checkLocalFileExists(e);if(void 0!==t)return t}try{if((await fetch(e,{method:"HEAD",cache:"no-store"})).ok)return!0}catch(e){}try{return(await fetch(e,{method:"GET",cache:"no-store"})).ok}catch(e){return!1}}async _checkLocalFileExists(e){if(!this.hass)return;const t=this._normalizeLocalUploadUrl(e)||e;if(!this._isLocalImageUrl(t))return;const i=t.split("?")[0];try{const e=await this.hass.callWS({type:"call_service",domain:"upload_file",service:"file_exists",service_data:{local_url:i},return_response:!0}),t=e?.response??e?.result??e;if("boolean"==typeof t?.exists)return t.exists}catch(e){return}}_isLocalImageUrl(e){return e.startsWith("/local/")||e.startsWith("local/")}async _validateCachedImages(e){const t=e.filter(e=>this._isLocalImageUrl(e)).map(e=>this._urlExists(this._normalizeLocalUploadUrl(e)||e));if(!t.length)return!0;return(await Promise.all(t)).every(Boolean)}_normalizeUploadPath(e){const t=(e||"www/upload_file").replace(/^\/+/,"").replace(/\/+$/,"");return t.startsWith("www/")?t:`www/${t}`}_normalizeLocalUploadUrl(e){if(!e)return;const t=e.trim();return t?t.startsWith("/local/")?t:t.startsWith("local/")?`/${t}`:t.startsWith("www/")?`/local/${t.replace(/^www\//,"")}`:t.includes("/www/")?`/local/${t.split("/www/")[1]}`:t:void 0}_parseDataUrl(e){if(!e.startsWith("data:"))return null;const t=e.match(/^data:([^;]+);base64,(.*)$/);return t?{mimeType:t[1],data:t[2]}:null}async _fetchAsDataUrl(e){const t=async e=>{try{const t=await fetch(e,{credentials:"same-origin"});if(!t.ok)return null;const i=await t.blob();return await new Promise((e,t)=>{const s=new FileReader;s.onloadend=()=>e(String(s.result||"")),s.onerror=()=>t(s.error),s.readAsDataURL(i)})}catch(e){return null}},i=[e],[s]=e.split("?");s&&s!==e&&i.push(s),s.startsWith("/ai_task/")?i.push(`/api${s}`):s.startsWith("/api/ai_task/")&&i.push(s.replace("/api/ai_task/","/ai_task/"));for(const e of i){const i=await t(e);if(i)return i}return null}_guessImageExtension(e,t){if(t){if(t.includes("png"))return"png";if(t.includes("jpeg")||t.includes("jpg"))return"jpg";if(t.includes("webp"))return"webp"}if(e){const t=e.match(/\.(png|jpg|jpeg|webp)(\?|$)/i);if(t)return t[1].toLowerCase().replace("jpeg","jpg")}return"png"}_isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")}_isCacheableImageUrl(e){const t=e.toLowerCase();return!t.includes("/ai_task/")&&!t.includes("authsig=")}async _extractHaAiTaskUrls(e){if(!e)return[];const t=e?.images||e?.data||e?.results||e?.result||e,i=Array.isArray(t)?t:[t],s=[];for(const e of i){if(!e)continue;if("string"==typeof e){s.push(this._normalizeHaAiTaskUrl(e));continue}const t=e.url||e.image_url||e.media_url||e.content_url||e.media?.url||e.image?.url||e.local_url||e.local_path;if(t){s.push(this._normalizeHaAiTaskUrl(String(t)));continue}const i=e.media_id||e.media_content_id||e.content_id||e.media;if(i){const e=await this._resolveMediaSourceUrl(String(i));e?s.push(this._normalizeHaAiTaskUrl(e)):s.push(`/api/media/${i}`)}}return s}_normalizeHaAiTaskUrl(e){const t=e.trim();return t?t.startsWith("http://")||t.startsWith("https://")||t.startsWith("/ai_task/")?t:t.startsWith("ai_task/")?`/${t}`:t:e}async _resolveMediaSourceUrl(e){if(this.hass&&e)try{if(e.startsWith("http"))return e;const t=await this.hass.callWS({type:"media_source/resolve",media_content_id:e});return t?.url}catch(e){return}}async _fetchGenericImages(e,t,i){if(!t.endpoint)throw new Error("image.ai.endpoint fehlt (generic).");const s=t.request_body||{prompt:e,count:i,size:t.size},a=await fetch(t.endpoint,{method:"POST",headers:{...t.api_key?{Authorization:`Bearer ${t.api_key}`}:{},"Content-Type":"application/json"},body:JSON.stringify(s)});if(!a.ok){const e=await a.text();throw new Error(`AI Fehler: ${a.status} ${e}`)}const n=await a.json(),r=this._extractByPath(n,t.response_path)||n.images||n.data||[];return Array.isArray(r)?r.map(e=>"string"==typeof e?e:e.url||e.image||e.b64_json).filter(Boolean).map(e=>e.startsWith("http")?e:`data:image/png;base64,${e}`):[]}_extractByPath(e,t){if(t)return t.split(".").reduce((e,t)=>e?e[t]:void 0,e)}_buildImageCacheKey(e,t){const i=this._getVehicleStatusLabel(),s=this._getStatusScene(i),a={vehicleInfo:e,provider:t.provider,model:t.model,size:t.size,aspect_ratio:t.aspect_ratio,count:t.count,max_images:t.max_images,upload:t.upload,upload_path:t.upload_path,prompt_template:t.prompt_template,prompts:t.prompts,views:t.views,status_label:i,status_scene:s,home_parked:this._isHomeParked(),generate_request_id:!1!==t.generate_on_demand?t.generate_request_id:void 0};return`bmw-status-card:images:${this._hash(JSON.stringify(a))}`}_buildCompositorAssetPrefix(e){const t=[e.make,e.model,e.series,e.year,e.color,e.trim,e.license_plate].filter(e=>Boolean(e&&e.trim())).map(e=>this._slugify(e)).join("-"),i=this._hash(JSON.stringify(e||{}));return(t?`bmw-${t}-${i}`:`bmw-${i}`).slice(0,64)}_hash(e){let t=0;for(let i=0;i<e.length;i+=1)t=(t<<5)-t+e.charCodeAt(i),t|=0;return String(t)}_buildVehicleStatusCardConfig(e,t,i){const s=new Set,a=this._pickEntity(e,s,["lock","binary_sensor","sensor"],["lock","locked","door lock","verriegelt","schloss","türschloss"]),n=this._pickEntity(e,s,["binary_sensor","sensor"],["charging","charge","plugged","plug","charging port","connector","port","laden","lade","stecker","anschluss","ladeklappe"]),r=this._pickEntity(e,s,["sensor"],["battery health","state of health","soh","health_state","battery_health","battery health state","health state","health_state_48v","48v health","48v battery health","battery_health_state_48v"]),o=["state_of_charge","state of charge","soc","state_of_energy","soe","ladezustand","batteriestand","charge level","charge_level","charge level at end of trip","trip_battery_charge_level","soc bei ankunft","state_of_charge_predicted","state_of_charge_predicted_on_integration_side"];let l=this._pickEntity(e,s,["sensor"],o);const c=this._selectBestBatteryCharge(e,o);!c||l&&!this._isEntityUnavailable(e,l)||(l=c,s.add(c));const h=this._pickEntity(e,s,["sensor"],["fuel","tank","fuel_level","kraftstoff","tankinhalt","tankfüllung","tankfuellung","kraftstoffstand","tank level","range tank level"]),d=this._pickEntity(e,s,["sensor"],["range","remaining","remaining_range","remainingrange","reichweite","restreichweite","reichweite_km","range total","total range","range_total_range","total_range","range_total_range_last_sent"]),_=this._pickEntity(e,s,["sensor"],["electric range","ev range","remaining electric range","kombi remaining electric range","elektrische reichweite","ev-reichweite"]),u=this._pickEntity(e,s,["sensor"],["fuel range","remaining fuel","tank level","kraftstoffreichweite"]),p=this._pickEntity(e,s,["sensor"],["total remaining range","total range","gesamtreichweite"]),m=this._pickEntity(e,s,["sensor","number"],["charge target","target soc","target state","charge limit","charge_limit","charge_limit_soc","ladeziel","ladegrenze","ladegrenze soc"]),g=this._selectBestOdometer(e,s,["odometer","vehicle_mileage","vehicle mileage","mileage","distance","travelled","kilometerstand","kilometer","odo"]),f=this._pickEntity(e,s,["sensor"],["gps_altitude","altitude","hoehe","höhe","hohe","elevation","height"]),v=this._pickEntity(e,s,["sensor"],["temperature","temp","coolant","temperatur","innen","innenraum"]),y=this._pickEntity(e,s,["sensor"],["charging power","charge power","power","grid energy","ladeleistung","leistung"]),w=this._pickEntity(e,s,["sensor"],["time remaining","time to fully","time to full","remaining time","restzeit","ladezeit","verbleibend"]);this._pickEntity(e,s,["binary_sensor","sensor","switch"],["preconditioning","climatization","climate","hvac","defrost","vorklimatisierung","klimatisierung","vorheizen","klima"]);const b=this._findEntity(e,["sensor"],["preconditioning state","preconditioning activity","preconditioning status","standklima","vorklimatisierung"],new Set)?.entity_id,k=this._findEntity(e,["sensor"],["preconditioning error","preconditioning error reason","vorklimatisierung fehler","standklima fehler"],new Set)?.entity_id,$=this._findEntity(e,["sensor"],["preconditioning remaining time","preconditioning remaining","standklima rest","vorklimatisierung rest"],new Set)?.entity_id,E=this._findEntity(e,["binary_sensor","sensor"],["preconditioning engine used","remote engine running","engine used"],new Set)?.entity_id,S=this._findEntity(e,["binary_sensor","sensor"],["preconditioning engine use allowed","remote engine start allowed","engine use allowed"],new Set)?.entity_id,C=this._pickEntity(e,s,["binary_sensor","sensor"],["engine","ignition","motor","zündung","zuendung"]),A=this._pickEntity(e,s,["sensor"],["bmw_pwf_status","pwf status","pwf_status"]);let x=A;x&&this._isEntityUnavailable(e,x)&&(s.delete(x),x=void 0),x||(x=this._pickEntity(e,s,["binary_sensor","sensor"],["vehicle_motion_state","motion state","motion_state","vehicle motion","moving","motion","driving","parking","fährt","bewegt","parked","stand","status","fahrstatus","pwf","pwf status"]));const T=this._pickEntity(e,s,["binary_sensor","sensor"],["alarm","anti theft","anti-theft","diebstahl","security","alarmsystem"]),P=this._pickEntity(e,s,["sensor"],["alarm arming","alarm_arming","alarm arming state","alarm_arming_state","arming"]),M=this._detectElectrification(e,r,l,n,_,h),I="bev"===M||"phev"===M,B=this._is48vEntity(r),z=t=>{if(!t)return!1;const i=e.find(e=>e.entity_id===t);return!i||("sensor"!==i.domain||!this._isNumericState(i.state))},U=[];a&&z(a)&&U.push({type:"entity",entity:a,icon:"mdi:lock"}),n&&I&&z(n)&&U.push({type:"entity",entity:n,icon:"mdi:ev-station"});const O=[];if(C&&z(C)&&O.push({type:"entity",entity:C,icon:"mdi:engine"}),x&&z(x)){const e={type:"entity",entity:x,icon:"mdi:car"};A&&x===A&&(e.icon_template=this._buildPwfStatusIconTemplate(x)),O.push(e)}T&&z(T)&&O.push({type:"entity",entity:T,icon:"mdi:alarm-light"}),P&&z(P)&&O.push({type:"entity",entity:P,icon:"mdi:shield-lock",icon_template:this._buildAlarmArmingIconTemplate(P)});const L=this._pickEntities(e,s,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","flap","lock","charging port","port","tür","fenster","kofferraum","heckklappe","motorhaube","schiebedach","dach","klappe","panoramadach","door state","doors overall","window state","sunroof state","sunroof tilt","tailgate door","tailgate rear window","tailgate state"]),N=this._pickEntities(e,s,["sensor"],["tire","tyre","pressure","wheel","tpms","pressure target","reifen","reifendruck","rad","solldruck","target pressure","tire pressure target"]);this._pickEntities(e,s,["sensor"],["tire temperature","tyre temperature","wheel temperature","reifentemperatur"]);const W=N.filter(e=>this._isTireTargetEntity(e)),V=N.filter(e=>!this._isTireTargetEntity(e)),H=this._pickEntities(e,s,["binary_sensor","sensor","switch"],["light","lights","headlight","lamp","running light","licht","scheinwerfer","abblendlicht","fernlicht"]),D=this._pickEntities(e,s,["binary_sensor","sensor","switch","climate"],["climate","hvac","preconditioning","standklima","vorklimatisierung","defrost","seat","steering wheel","air purification","heater","heating","cooling","klima","sitzheizung","lenkrad","heizung","kühlung","aircon","ac","klimastatus","climate timer"]),j=this._pickEntities(e,s,["sensor","binary_sensor"],["service","inspection","cbs","check control","maintenance","wartung","inspektion","servicebedarf"]),K=this._pickEntities(e,s,["sensor","device_tracker"],["navigation","destination","eta","latitude","longitude","gps","ziel","ankunft","route","routing","navi","position","lat","lon","navigationsstatus","navigationsziel","ankunftsort","ankunftsort breitengrad","ankunftsort längengrad","ankunftsort laengengrad"]),R=this._pickEntities(e,s,["sensor","binary_sensor","switch","number"],["charging","charge","plug","connector","charging mode","charging power","time to fully","charge target","laden","lade","ladeziel","ladestatus","ladekabel"]),G=[];U.length&&G.push({row_items:U,alignment:"center",no_wrap:!0}),O.length&&G.push({row_items:O,alignment:"center",no_wrap:!0});const F=[],q=H.filter(e=>z(e));q.length&&F.push({type:"group",name:"Licht",icon:"mdi:car-light-high",items:q.map(e=>({type:"entity",entity:e}))}),F.length&&G.push({row_items:F,alignment:"center",no_wrap:!0});const J=this._isHybridBatteryChargeEntity(l),Y=I?"Batterie":B||J?"48V Batterie (Ladung)":"12V Batterie",Z=B?"48V Batteriegesundheit":"Batteriegesundheit",Q=[];l&&I&&Q.push({title:"Batterie Ladestand",icon:"mdi:battery",energy_level:{entity:l,max_value:100,hide_icon:!0},range_level:{value:100,unit:"%",hide_icon:!0},charging_entity:n||void 0,charge_target_entity:m||void 0,progress_color:"var(--success-color)"}),!r||B&&!I||Q.push({title:Z,icon:"mdi:battery-heart",energy_level:{entity:r,max_value:100,hide_icon:!0},color_template:this._buildBatteryHealthColorTemplate(r)}),h&&"bev"!==M&&Q.push({title:"Tankfüllstand",icon:"mdi:gas-station",energy_level:{entity:h,hide_icon:!0},range_level:u||p||d?{entity:u||p||d,hide_icon:!0}:void 0,color_template:this._buildLowFuelColorTemplate(h)}),!Q.length&&d&&Q.push({title:"Reichweite",icon:"mdi:map-marker-distance",energy_level:{entity:d,hide_icon:!0}});const X=e.filter(e=>"device_tracker"===e.domain).filter(e=>!this._isUnknownState(e.state)).map(e=>e.entity_id),ee=X[0];this._deviceTrackerEntity=ee,this._lastDeviceTrackerState=ee?this.hass?.states[ee]?.state:void 0;const te=this._buildTireCardConfig(e,i),ie=new Set(te?.entities||[]);this._statusEntities={fuel:h,motion:x,doors:L,tires:V,tireTargets:W};const se=[],ae=[],ne=[],re=(e,t,i,s)=>{t&&e.push({entity:t,name:i,icon:s})};if(re(ae,l,Y,"mdi:battery"),re(ae,r,Z,"mdi:battery-heart"),re(ae,h,"Kraftstoff","mdi:gas-station"),re(ae,_||p||d,"Reichweite","mdi:map-marker-distance"),re(ae,g,"Kilometerstand","mdi:counter"),re(ae,f,"Höhe","mdi:image-filter-hdr"),re(ae,v,"Temperatur","mdi:thermometer"),I&&(re(ae,w,"Ladezeit","mdi:timer"),re(ae,y,"Ladeleistung","mdi:flash")),re(ae,x,"Fahrstatus","mdi:car"),re(ae,P,"Alarmanlage","mdi:shield-lock"),j.forEach(e=>re(ne,e)),ae.length&&(se.push({name:"Fahrzeug",icon:"mdi:car-info",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Fahrzeugstatus",items:ae}]}}),ae.forEach(e=>ie.add(e.entity))),ne.length&&(se.push({name:"Service",icon:"mdi:wrench",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Service",items:ne}]}}),ne.forEach(e=>ie.add(e.entity))),L.length){const t=L.filter(e=>!this._isDoorOverallEntity(e)),i=this._buildDoorTemplates(t,x);se.push({name:"Öffnungen",icon:"mdi:car-door",button_type:"default",card_type:"default",notify:i.notify,notify_icon:i.notify_icon,notify_color:i.notify_color,color_template:i.color,sub_card:{default_card:[{title:"Öffnungen",items:L.map(t=>({entity:t,name:this._getDoorLabel(t,e)}))}]}}),L.forEach(e=>ie.add(e))}if(te?.tire_card){const e=this._buildTirePressureTemplates(V,W);se.push({name:"Reifen",icon:"mdi:car-tire-alert",button_type:"default",card_type:"tire",notify:e.notify,notify_icon:e.notify_icon,notify_color:e.notify_color,color_template:e.color,sub_card:{tire_card:te.tire_card}}),(te.entities||[]).forEach(e=>ie.add(e))}if(I&&R.length&&(se.push({name:"Laden",icon:"mdi:ev-station",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Ladezustand",items:R.map(e=>({entity:e}))}]}}),R.forEach(e=>ie.add(e))),D.length){const t=this._buildPreconditioningTemplates(b,k,$,E,S);se.push({name:"Klima",icon:"mdi:car-defrost-front",button_type:"default",card_type:"default",notify:t.notify,notify_icon:t.notify_icon,notify_color:t.notify_color,color_template:t.color,sub_card:{default_card:[{title:"Klima",items:D.map(t=>({entity:t,name:this._getClimateLabel(t,e)}))}]}}),D.forEach(e=>ie.add(e))}K.length&&(se.push({name:"Navigation",icon:"mdi:navigation",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Navigation",items:K.map(e=>({entity:e}))}]}}),K.forEach(e=>ie.add(e)));const oe=[...se,...this._buildButtonCards(e,s,ie)],le=t.length?t.map(e=>({image:e})):void 0;return{type:`custom:${ce}`,name:this._vehicleInfo?.name||"BMW",indicator_rows:G.length?G:void 0,range_info:Q.length?Q:void 0,button_cards:oe.length?oe:void 0,images:le,mini_map:ee?{device_tracker:ee,entities:X,maptiler_api_key:this._config?.maptiler_api_key,maptiler_style:this._config?.maptiler_style,enable_popup:!0,map_height:240,map_zoom:14,user_location:!0,use_zone_name:!0}:void 0,layout_config:{section_order:["indicators","range_info","images","mini_map","buttons"],button_grid:{columns:2,swipe:!0},images_swipe:{autoplay:!0,loop:!0,delay:6e3,speed:600,effect:"fade",height:240},range_info_config:{layout:"row"},single_tire_card:void 0}}}_buildButtonCards(e,t,i){const s=["lock","switch","button","cover","climate"],a=new Set([...t,...i?Array.from(i):[]]),n=e.filter(e=>!a.has(e.entity_id)).sort((e,t)=>{const i=s.indexOf(e.domain),a=s.indexOf(t.domain);return(-1===i?999:i)-(-1===a?999:a)}),r=[];for(const e of n){if(r.length>=12)break;s.includes(e.domain)&&(t.add(e.entity_id),a.add(e.entity_id),r.push({entity:e.entity_id,name:e.name,button_type:"default"}))}return r}_mergeVehicleConfig(e,t){if(!t)return e;const i={...e,...t};return["indicator_rows","range_info","images","button_cards"].forEach(e=>{void 0!==t[e]&&(i[e]=t[e])}),void 0!==t.mini_map&&(null===t.mini_map?i.mini_map=null:i.mini_map={...e.mini_map||{},...t.mini_map||{}}),void 0!==t.layout_config&&(i.layout_config=t.layout_config),i}_pickEntity(e,t,i,s){const a=this._findEntity(e,i,s,t);if(a)return t.add(a.entity_id),a.entity_id}_pickEntities(e,t,i,s){const a=this._findEntities(e,i,s,t);return a.forEach(e=>t.add(e.entity_id)),a.map(e=>e.entity_id)}_findEntity(e,t,i,s){return this._findEntities(e,t,i,s)[0]}_findEntities(e,t,i,s){const a=i.map(e=>this._normalizeText(e));return e.filter(e=>!s.has(e.entity_id)).filter(e=>!t.length||t.includes(e.domain)).filter(e=>{if(!a.length)return!0;const t=this._normalizeText(`${e.entity_id} ${e.name} ${e.device_class??""}`);return a.some(e=>t.includes(e))}).sort((e,t)=>{const i=e.state||"",s=t.state||"";return"unknown"===i&&"unknown"!==s?1:"unknown"===s&&"unknown"!==i?-1:e.name.localeCompare(t.name)})}_normalizeText(e){return e.toLowerCase().normalize("NFD").replace(/[\0-]/g," ").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim()}_getEntityLabel(e,t){const i=t.find(t=>t.entity_id===e),s=i?.name?.trim();return s?this._stripVehiclePrefix(s):this._beautifyEntityName(e)}_stripVehiclePrefix(e){const t=this._getVehiclePrefixes();if(!t.length)return e;const i=e.toLowerCase();for(const s of t){const t=s.toLowerCase();if(i.startsWith(t))return e.slice(s.length).trim()}return e}_getVehiclePrefixes(){const e=this._vehicleInfo;if(!e)return[];const t=[e.name,`${e.make||""} ${e.model||""}`.trim(),e.model,e.series,e.trim].filter(Boolean);return Array.from(new Set(t.map(e=>e.trim()).filter(Boolean)))}_stripPrefixToKeyword(e,t){const i=e.toLowerCase(),s=t.map(e=>i.indexOf(e)).filter(e=>e>=0).sort((e,t)=>e-t)[0];return void 0===s?e:e.slice(s).trim()}_getDoorLabel(e,t){const i=t.find(t=>t.entity_id===e),s=this._stripVehiclePrefix(i?.name?.trim()||e),a=this._stripPrefixToKeyword(s,["door","window","tailgate","hood","sunroof"]),n=this._normalizeText(a),r=e=>n.includes("front")&&n.includes("driver")?`${e} vorn links`:n.includes("front")&&n.includes("passenger")?`${e} vorn rechts`:n.includes("rear")&&n.includes("driver")?`${e} hinten links`:n.includes("rear")&&n.includes("passenger")?`${e} hinten rechts`:void 0;return n.includes("doors overall")?"Türen gesamt":n.includes("door state")?r("Tür")||"Tür":n.includes("window state")?r("Fenster")||"Fenster":n.includes("tailgate rear window")?"Heckscheibe":n.includes("tailgate door")||n.includes("tailgate state")?"Heckklappe":n.includes("trunk")||n.includes("boot")?"Kofferraum":n.includes("hood")||n.includes("bonnet")?"Motorhaube":n.includes("sunroof overall")?"Schiebedach gesamt":n.includes("sunroof tilt")?"Schiebedach gekippt":n.includes("sunroof")?"Schiebedach":this._stripVehiclePrefix(i?.name?.trim()||this._beautifyEntityName(e))}_getClimateLabel(e,t){const i=t.find(t=>t.entity_id===e),s=this._stripVehiclePrefix(i?.name?.trim()||e),a=this._stripPrefixToKeyword(s,["climate","preconditioning"]),n=this._normalizeText(a);if(n.includes("climate timer")){const e=n.includes("weekly 1")?"Klima-Timer Woche 1":n.includes("weekly 2")?"Klima-Timer Woche 2":n.includes("next only")?"Klima-Timer Nächster":"Klima-Timer";return n.includes("hour")?`${e} (Stunde)`:n.includes("minute")?`${e} (Minute)`:n.includes("state")?`${e} (Status)`:e}return n.includes("preconditioning engine used")?"Vorklimatisierung Motor verwendet":n.includes("preconditioning error")?"Vorklimatisierung Fehler":n.includes("preconditioning state")?"Vorklimatisierung Status":this._stripVehiclePrefix(i?.name?.trim()||this._beautifyEntityName(e))}_beautifyEntityName(e){const t=(e.split(".").pop()||e).split("_").filter(Boolean).map(e=>e.toLowerCase()),i={door:"Tür",doors:"Türen",window:"Fenster",windows:"Fenster",trunk:"Kofferraum",tailgate:"Heckklappe",boot:"Kofferraum",hood:"Motorhaube",bonnet:"Motorhaube",sunroof:"Schiebedach",roof:"Dach",flap:"Klappe",lock:"Schloss",charging:"Laden",port:"Port",front:"vorn",rear:"hinten",left:"links",right:"rechts",climate:"Klima",hvac:"Klima",preconditioning:"Vorklimatisierung",defrost:"Enteisung",seat:"Sitz",steering:"Lenkrad",heater:"Heizung",heating:"Heizung",cooling:"Kühlung",air:"Luft",purification:"Reinigung",timer:"Timer",status:"Status"},s=t.map(e=>i[e]||e).join(" ").replace(/\s+/g," ").trim();return s?s.charAt(0).toUpperCase()+s.slice(1):e}_normalizeEntityId(e){if(!e)return;if(Array.isArray(e)){const t=e.length?String(e[0]).trim():"";return this._normalizeEntityId(t)}if("object"==typeof e){const t=e.entity_id??e.entityId;return this._normalizeEntityId(t)}const t=String(e).trim();if(t){if(t.includes(",")){const e=t.split(",")[0].trim();return this._normalizeEntityId(e)}if(t.includes(".")&&!/\s/.test(t))return t}}_findEntityByKeywords(e,t){return this._findEntity(e,[],t,new Set)?.entity_id}_isNumericState(e){if(null==e)return!1;if("number"==typeof e)return!Number.isNaN(e);const t=String(e).trim().replace(",",".");return!!t&&!Number.isNaN(Number(t))}_buildTireCardConfig(e,t){const i=t=>this._findEntity(e,["sensor"],t,new Set),s=i(["front left","front_left","row1 left","row1 wheel left"]),a=i(["front right","front_right","row1 right","row1 wheel right"]),n=i(["rear left","rear_left","row2 left","row2 wheel left"]),r=i(["rear right","rear_right","row2 right","row2 wheel right"]),o=new Map;e.forEach(e=>{if(!this._isTireTargetEntity(e.entity_id))return;const t=this._tirePositionKey(e.entity_id);t&&o.set(t,e.entity_id)});const l=(e,t)=>{if(!e)return;const i=this._tirePositionKey(e.entity_id),s=i?o.get(i):void 0,a={entity:e.entity_id,name:t,color:this._buildSingleTireColorTemplate(e.entity_id,s)};return s&&(a.additional_entities=[{entity:s,prefix:"Soll: "}]),{config:a,target:s}},c=l(s,"Vorne links"),h=l(a,"Vorne rechts"),d=l(n,"Hinten links"),_=l(r,"Hinten rechts"),u=[s,a,n,r].filter(Boolean).map(e=>e.entity_id),p=[c?.target,h?.target,d?.target,_?.target].filter(Boolean);if(!u.length)return;return{tire_card:{title:"Reifendruck",...t?{background:t}:{},front_left:d?.config,front_right:_?.config,rear_left:c?.config,rear_right:h?.config},entities:[...u,...p]}}_buildSingleTireColorTemplate(e,t){return t?`{% set av = states('${e}') | float(0) %}{% set tv = states('${t}') | float(0) %}{% set state = 'ok' %}{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}{% if av < err %}{% set state = 'error' %}{% elif av < warn %}{% set state = 'warn' %}{% endif %}{% elif av > 0 %}{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}{% endif %}{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`:`{% set av = states('${e}') | float(0) %}{% set state = 'ok' %}{% if av > 0 %}{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}{% endif %}{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`}_isTireTargetEntity(e){const t=this._normalizeText(e);return t.includes("target")||t.includes("solldruck")}_isDoorSummaryEntity(e){const t=this._normalizeText(e);return t.includes("overall")||t.includes("hood")||t.includes("tailgate")||t.includes("sunroof overall")}_isDoorOverallEntity(e){return this._normalizeText(e).includes("doors overall")}_getVehicleStatusLabel(){const e=this._statusEntities?.motion;if(!e||!this.hass)return;const t=this.hass.states[e]?.state;if(!t)return;if(this._isMotionStateBinarySensor(e)){const e=this._normalizeText(t);if(["off","false","0","no"].includes(e))return"parking";if(["on","true","1","yes"].includes(e))return"driving"}const i=this._normalizeText(t);return i.includes("driving")||i.includes("fahrt")?"driving":i.includes("standing")||i.includes("stand")?"standing":i.includes("park")||i.includes("parken")?"parking":t}_isMotionStateBinarySensor(e){const t=this._normalizeText(e);return t.includes("vehicle motion state")||t.includes("motion state")}_selectBestOdometer(e,t,i){const s=this._findEntities(e,["sensor"],i,t).filter(e=>!this._isAltitudeEntity(e));if(!s.length)return;const a=s.map(e=>{const t=this._normalizeText(`${e.entity_id} ${e.name} ${e.device_class??""}`);let i=0;return(t.includes("vehicle mileage")||t.includes("vehicle_mileage"))&&(i+=10),(t.includes("mileage")||t.includes("odometer")||t.includes("kilometerstand"))&&(i+=5),this._isUnknownState(e.state)||(i+=3),{entity:e.entity_id,score:i}});a.sort((e,t)=>t.score-e.score);const n=a[0]?.entity;return n&&t.add(n),n}_isAltitudeEntity(e){const t=this._normalizeText(`${e.entity_id} ${e.name} ${e.device_class??""}`);return t.includes("altitude")||t.includes("hoehe")||t.includes("höhe")||t.includes("elevation")}_buildTirePressureTemplates(e,t){const i=this._buildTirePressureTemplateBase(e,t);return i?{notify:`${i}{{ ns.state in ['warn','error'] }}`,color:`${i}{{ iif(ns.state == 'error', 'var(--error-color)', iif(ns.state == 'warn', 'var(--warning-color)', 'var(--secondary-text-color)')) }}`,notify_color:`${i}{{ iif(ns.state == 'error', 'var(--error-color)', 'var(--warning-color)') }}`,notify_icon:`${i}{{ iif(ns.state == 'error', 'mdi:alert', 'mdi:alert-circle') }}`}:{}}_buildTirePressureTemplateBase(e,t){const{pairs:i,fallback:s}=this._buildTirePairs(e,t);if(!i.length&&!s.length)return;return`{% set pairs = [${i.map(e=>`{ 'a': '${e.a}', 't': '${e.t}' }`).join(", ")}] %}{% set fallback = [${s.map(e=>`'${e}'`).join(", ")}] %}{% set ns = namespace(state='ok') %}{% for p in pairs %}{% set av = states(p['a']) | float(0) %}{% set tv = states(p['t']) | float(0) %}{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}{% if av < err %}{% set ns.state = 'error' %}{% elif av < warn and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}{% endif %}{% endfor %}{% if ns.state == 'ok' %}{% for e in fallback %}{% set v = states(e) | float(0) %}{% if v > 0 and v < 180 %}{% set ns.state = 'error' %}{% elif v > 0 and v < 200 and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}{% endfor %}{% endif %}`}_buildDoorTemplates(e,t){const i=this._buildDoorTemplateBase(e,t);return i?{notify:`${i}{{ ns.open }}`,color:`${i}{{ iif(ns.open, 'var(--warning-color)', 'var(--secondary-text-color)') }}`,notify_color:`${i}{{ 'var(--warning-color)' }}`,notify_icon:`${i}{{ 'mdi:car-door' }}`}:{}}_buildDoorTemplateBase(e,t){if(!e.length)return;return`{% set ns = namespace(open=false) %}{% set status = states(${t?`'${t}'`:"''"}) | lower %}{% if status in ['parking','parked','standing'] %}{% for e in [${e.map(e=>`'${e}'`).join(", ")}] %}{% set s = states(e) | lower %}{% if s not in ['closed','geschlossen','secured','gesichert','locked','verriegelt','ok','aus','off','false','no','0','inactive','not_open','unknown','unavailable','none','-'] %}{% set ns.open = true %}{% endif %}{% endfor %}{% endif %}`}_buildPreconditioningTemplates(e,t,i,s,a){const n=this._buildPreconditioningTemplateBase(e,t,i,s,a);return n?{notify:`${n}{{ ns.active or ns.error }}`,color:`${n}{{ iif(ns.error, 'var(--error-color)', iif(ns.active, 'var(--success-color)', 'var(--secondary-text-color)')) }}`,notify_color:`${n}{{ iif(ns.error, 'var(--error-color)', 'var(--success-color)') }}`,notify_icon:`${n}{{ iif(ns.error, 'mdi:alert-circle', 'mdi:car-defrost-front') }}`}:{}}_buildPreconditioningTemplateBase(e,t,i,s,a){if(!(e||t||i||s||a))return;return`{% set ns = namespace(active=false, error=false) %}{% set state = states(${e?`'${e}'`:"''"}) | lower %}{% set err = states(${t?`'${t}'`:"''"}) | lower %}{% set remaining = states(${i?`'${i}'`:"''"}) | float(0) %}{% set engine = states(${s?`'${s}'`:"''"}) | lower %}{% set allowed = states(${a?`'${a}'`:"''"}) | lower %}{% if err not in ['','ok','invalid','unknown','none','-'] %}{% set ns.error = true %}{% endif %}{% if state in ['heating','cooling','ventilation','standby'] %}{% set ns.active = true %}{% endif %}{% if remaining > 0 %}{% set ns.active = true %}{% endif %}{% if engine in ['true','on','yes','1'] %}{% set ns.active = true %}{% endif %}{% if allowed in ['false','off','no','0'] and state in ['heating','cooling','ventilation'] %}{% set ns.error = true %}{% endif %}`}_detectElectrification(e,t,i,s,a,n){const r=this._is48vEntity(t)||e.some(e=>this._is48vEntity(e.entity_id)||this._is48vEntity(e.name)),o=this._isHybridBatteryChargeEntity(i),l=Boolean(s||a||!o&&i)||Boolean(this._findEntity(e,["sensor","binary_sensor"],["electric range","ev range","charging","charge","charging port","traction battery","high voltage","hv battery","electric engine","state of energy"],new Set)),c=Boolean(n)||Boolean(this._findEntity(e,["sensor"],["fuel","tank","kraftstoff","tank level"],new Set));return l?c?"phev":"bev":r?"mhev":"ice"}_is48vEntity(e){return!!e&&this._normalizeText(e).includes("48v")}_isHybridBatteryChargeEntity(e){if(!e)return!1;const t=this._normalizeText(e);return t.includes("48v")||t.includes("12v")||t.includes("trip")||t.includes("end_of_trip")||t.includes("end of trip")||t.includes("bei ankunft")||t.includes("ankunft")||t.includes("arrival")||t.includes("trip_battery")||t.includes("charge level at end of trip")}_selectBestBatteryCharge(e,t){const i=this._findEntities(e,["sensor"],t,new Set);if(!i.length)return;const s=i.map(e=>{const t=this._normalizeText(`${e.entity_id} ${e.name} ${e.device_class??""}`);let i=0;return this._isUnknownState(e.state)||(i+=5),(t.includes("trip")||t.includes("end_of_trip")||t.includes("end of trip"))&&(i+=3),(t.includes("bei ankunft")||t.includes("ankunft")||t.includes("arrival"))&&(i+=3),t.includes("predicted")&&(i-=2),{entity:e.entity_id,score:i}});return s.sort((e,t)=>t.score-e.score),s[0]?.entity}_isEntityUnavailable(e,t){if(!t)return!0;const i=e.find(e=>e.entity_id===t);return!i||this._isUnknownState(i.state)}_isUnknownState(e){if(!e)return!0;const t=this._normalizeText(e);return["unknown","unavailable","none","-"].includes(t)}_buildPwfStatusIconTemplate(e){return`{% set s = states('${e}') | lower %}{{ iif('driving' in s or 'fahrt' in s, 'mdi:car-sports', iif('parking' in s or 'parked' in s or 'parken' in s, 'mdi:parking', iif('standing' in s or 'stand' in s, 'mdi:car-brake-hold', 'mdi:car'))) }}`}_buildAlarmArmingIconTemplate(e){return`{% set s = states('${e}') | lower %}{{ iif(s == 'unarmed', 'mdi:shield-off', iif(s == 'doorsonly', 'mdi:car-door-lock', iif(s == 'doorstiltcabin', 'mdi:shield-car', 'mdi:shield-lock'))) }}`}_buildTirePairs(e,t){const i=new Map;t.forEach(e=>{const t=this._tirePositionKey(e);t&&i.set(t,e)});const s=[],a=[];return e.forEach(e=>{const t=this._tirePositionKey(e);if(!t)return;const n=i.get(t);n?s.push({a:e,t:n}):a.push(e)}),{pairs:s,fallback:a}}_buildLowFuelColorTemplate(e){return`{% set v = states('${e}') | float(0) %}{{ iif(v > 0 and v < 10, 'var(--error-color)', 'var(--primary-color)') }}`}_buildBatteryHealthColorTemplate(e){return`{% set v = states('${e}') | float(0) %}{{ iif(v < 80, 'var(--error-color)', iif(v < 90, 'var(--warning-color)', 'var(--success-color)')) }}`}_buildStatusBadges(){if(!this.hass||!this._statusEntities)return[];const e=[],t=this._statusEntities.fuel;if(t){const i=this.hass.states[t],s=Number(i?.state),a=i?.attributes?.unit_of_measurement;if(!Number.isNaN(s)){("%"===a?s<=15:s<=10)&&e.push({label:"Tank niedrig",level:"warning"})}}this._hasLowTirePressure()&&e.push({label:"Reifendruck niedrig",level:"alert"});return this._hasDoorsOpenWhileParked()&&e.push({label:"Öffnungen offen",level:"warning"}),e}_hasLowTirePressure(){if(!this.hass||!this._statusEntities)return!1;const e=this._statusEntities.tires||[],t=this._statusEntities.tireTargets||[];if(!e.length)return!1;const i=new Map;return t.forEach(e=>{const t=this.hass.states[e]?.state,s=Number(t);if(!Number.isNaN(s)){const t=this._tirePositionKey(e);t&&i.set(t,s)}}),e.some(e=>{const t=this.hass.states[e]?.state,s=Number(t);if(Number.isNaN(s))return!1;const a=this._tirePositionKey(e),n=a?i.get(a):void 0;return void 0!==n?s<.9*n:s<200})}_tirePositionKey(e){const t=this._normalizeText(e);return t.includes("front")&&t.includes("left")?"front_left":t.includes("front")&&t.includes("right")?"front_right":t.includes("rear")&&t.includes("left")?"rear_left":t.includes("rear")&&t.includes("right")?"rear_right":void 0}_hasDoorsOpenWhileParked(){if(!this.hass||!this._statusEntities)return!1;const e=this._getVehicleStatusLabel();if("parked"!==e&&"standing"!==e)return!1;return(this._statusEntities.doors||[]).some(e=>{const t=this.hass.states[e]?.state;if(!t)return!1;const i=this._normalizeText(t);return!["closed","geschlossen","secured","gesichert","locked","verriegelt","ok","aus"].some(e=>i.includes(e))})}render(){return this._error?D`
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
      `}}class _e extends re{constructor(){super(...arguments),this._geminiModelsLoading=!1,this._openAiModelsLoading=!1,this._maskPreviews=[],this._maskGenerationBusy=!1,this._compositorWorkflowStep=1,this._compositorWorkflowBusy=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_bmwHomeEntity:{state:!0},_bmwCardataEntity:{state:!0},_bmwHomeEntities:{state:!0},_bmwCardataEntities:{state:!0},_aiTaskEntities:{state:!0},_editorError:{state:!0},_geminiModels:{state:!0},_geminiModelsLoading:{state:!0},_geminiModelsError:{state:!0},_openAiModels:{state:!0},_openAiModelsLoading:{state:!0},_openAiModelsError:{state:!0},_maskPreviews:{state:!0},_maskGenerationBusy:{state:!0},_maskGenerationError:{state:!0},_compositorWorkflowStep:{state:!0},_compositorWorkflowStatus:{state:!0},_compositorWorkflowBusy:{state:!0}}}set hass(e){this._hass=e,this._ensureHaComponents(),this._loadIntegrationEntities()}get hass(){return this._hass}setConfig(e){const t=e.image?.ai?.ha_entity_id||e.image?.ai?.entity_id||e.image?.ai?.ai_task_entity||e.image?.ai?.entity||e.image?.ai?.task_entity,i="ai"===e.image?.mode?e.image?.ai?.provider||"ha_ai_task":e.image?.ai?.provider;this._config={...e,type:e.type||`custom:${le}`,image:e.image?.ai?{...e.image,mode:e.image.mode||"ai",ai:{...e.image.ai,provider:i,ha_entity_id:t||e.image.ai.ha_entity_id}}:e.image},this._maybeLoadGeminiModels(),this._maybeLoadOpenAiModels()}_ensureHaComponents(){customElements.get("ha-entity-picker")||customElements.get("hui-entities-card")?.getConfigElement?.()}async _loadIntegrationEntities(){if(this.hass)try{const e=await this.hass.callWS({type:"config/entity_registry/list"}),t=e.filter(e=>"bmw_home"===e.platform).map(e=>e.entity_id).sort(),i=e.filter(e=>"cardata"===e.platform).map(e=>e.entity_id).sort(),s=e.filter(e=>e.entity_id.includes("ai_task")).map(e=>e.entity_id),a=Object.keys(this.hass.states||{}).filter(e=>e.includes("ai_task")),n=Array.from(new Set([...s,...a])).sort();this._bmwHomeEntities=t,this._bmwCardataEntities=i,this._aiTaskEntities=n}catch(e){}}static{this.styles=n`
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
    .mask-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 10px;
      margin-top: 8px;
    }
    .mask-item {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      padding: 8px;
      background: var(--card-background-color, #fff);
    }
    .mask-item img {
      width: 100%;
      height: auto;
      border-radius: 4px;
      display: block;
      background: #111;
    }
    .mask-item .name {
      margin-top: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
      word-break: break-word;
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
  `}_setEditorError(e){const t=e instanceof Error?`${e.message}\n${e.stack||""}`:String(e);this._editorError=t,console.error("[bmw-status-card] Editor error:",e)}_emitConfigChanged(){if(!this._config)return;const e={...this._config,type:this._config.type||`custom:${le}`};try{console.debug("[bmw-status-card] config-changed",e),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0})),this._editorError=void 0}catch(e){this._setEditorError(e)}}_setConfigValue(e,t){if(this._config)try{const i=e.split("."),s=[];let a={...this._config},n=a;for(let e=0;e<i.length-1;e+=1){const t=i[e];s.push({parent:n,key:t}),n[t]={...n[t]||{}},n=n[t]}const r=i[i.length-1];""===t||null==t?delete n[r]:n[r]=t,"image.ai.generate_request_id"!==e&&a.image?.ai?.generate_request_id&&delete a.image.ai.generate_request_id;for(let e=s.length-1;e>=0;e-=1){const{parent:t,key:i}=s[e];t[i]&&0===Object.keys(t[i]).length&&delete t[i]}this._config=a,this._emitConfigChanged(),this._maybeLoadGeminiModels(e,t),this._maybeLoadOpenAiModels(e,t)}catch(e){this._setEditorError(e)}}_onValueChanged(e){const t=e.target,i=t?.dataset?.path;i&&this._setConfigValue(i,t.value)}_onImageModeChanged(e){const t=e.currentTarget,i=e.detail?.value??t?.value;if(!i||!["off","static","ai","cardata","compositor"].includes(i))return;if(console.debug("[bmw-status-card] image mode changed:",i),!this._config)return;const s={...this._config};"off"===i?delete s.image:s.image="static"===i?{...s.image||{},mode:"static",static_urls:s.image?.static_urls||[]}:"cardata"===i?{...s.image||{},mode:"cardata"}:"compositor"===i?{...s.image||{},mode:"compositor",compositor:s.image?.compositor||{}}:{...s.image||{},mode:"ai",ai:s.image?.ai||{}},this._config=s,this._emitConfigChanged()}_onSelectChanged(e){const t=e.currentTarget,i=t?.dataset?.path;if(!i)return;const s=e.detail?.value??t?.value;this._setConfigValue(i,s)}_normalizeEntityId(e){if(!e)return;if(Array.isArray(e)){const t=e.length?String(e[0]).trim():"";return this._normalizeEntityId(t)}if("object"==typeof e){const t=e.entity_id??e.entityId;return this._normalizeEntityId(t)}const t=String(e).trim();if(t){if(t.includes(",")){const e=t.split(",")[0].trim();return this._normalizeEntityId(e)}if(t.includes(".")&&!/\s/.test(t))return t}}_onToggleChanged(e){const t=e.currentTarget,i=t?.dataset?.path;i&&this._setConfigValue(i,Boolean(t?.checked))}_maybeLoadGeminiModels(e,t){if("gemini"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===e?t||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._geminiModelsLoading||this._geminiModelsKey===i&&this._geminiModels?.length||(this._geminiModelsTimer&&window.clearTimeout(this._geminiModelsTimer),this._geminiModelsTimer=window.setTimeout(()=>{this._loadGeminiModels(i)},400))}_maybeLoadOpenAiModels(e,t){if("openai"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===e?t||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._openAiModelsLoading||this._openAiModelsKey===i&&this._openAiModels?.length||(this._openAiModelsTimer&&window.clearTimeout(this._openAiModelsTimer),this._openAiModelsTimer=window.setTimeout(()=>{this._loadOpenAiModels(i)},400))}async _loadOpenAiModels(e){this._openAiModelsLoading=!0,this._openAiModelsError=void 0,this._openAiModelsKey=e;try{const t=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${e}`}});if(!t.ok){const e=await t.text();throw new Error(`OpenAI ListModels Fehler: ${t.status} ${e}`)}const i=await t.json(),s=(i?.data||[]).map(e=>e.id||"").filter(Boolean).filter(e=>/(image|dall-e|gpt-image)/i.test(e)).sort();this._openAiModels=s}catch(e){this._openAiModelsError=e?.message||String(e),this._openAiModels=void 0,console.warn("[bmw-status-card] OpenAI ListModels fehlgeschlagen:",e)}finally{this._openAiModelsLoading=!1,this.requestUpdate()}}async _loadGeminiModels(e){this._geminiModelsLoading=!0,this._geminiModelsError=void 0,this._geminiModelsKey=e;try{const t=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${e}`);if(!t.ok){const e=await t.text();throw new Error(`ListModels Fehler: ${t.status} ${e}`)}const i=await t.json(),s=(i?.models||[]).filter(e=>(e.supportedGenerationMethods||[]).includes("generateContent")).map(e=>e.name||"").filter(Boolean).map(e=>e.replace(/^models\//,"")).filter(Boolean).sort();this._geminiModels=s}catch(e){this._geminiModelsError=e?.message||String(e),this._geminiModels=void 0,console.warn("[bmw-status-card] Gemini ListModels fehlgeschlagen:",e)}finally{this._geminiModelsLoading=!1,this.requestUpdate()}}_onListChanged(e){const t=e.target,i=t?.dataset?.path;if(!i)return;const s=(t.value||"").split(",").map(e=>e.trim()).filter(Boolean);this._setConfigValue(i,s.length?s:void 0)}async _resolveDeviceIdFromEntity(e,t){if(this.hass)try{const i=await this.hass.callWS({type:"config/entity_registry/get",entity_id:e});i?.device_id&&this._setConfigValue(t,i.device_id)}catch(e){}}async _onEntityPicked(e){const t=e.target,i=e.detail?.value??t?.value,s=t?.dataset?.target;i&&s&&("bmw_home_device_id"===s?this._bmwHomeEntity=i:"bmw_cardata_device_id"===s&&(this._bmwCardataEntity=i),await this._resolveDeviceIdFromEntity(i,s))}_toWwwPath(e,t){const i=String(e||t).trim();return i?i.startsWith("/local/")?`www/${i.slice(7)}`:i.startsWith("local/")?`www/${i.slice(6)}`:i.startsWith("www/")?i:`www/${i.replace(/^\/+/,"")}`:t}_normalizeText(e){return String(e||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[_-]+/g," ").replace(/\s+/g," ").trim()}_appendPathSegment(e,t){const i=String(e||"").trim().replace(/\/+$/,""),s=String(t||"").trim().replace(/^\/+|\/+$/g,"");return i?s?`${i}/${s}`:i:s}_mapEditorStateToScene(e,t){if(!e)return"parked";const i=this._normalizeText(e);if(t&&t.startsWith("binary_sensor.")){if(["on","true","1","yes"].includes(i))return"driving";if(["off","false","0","no"].includes(i))return"parked"}return i.includes("driving")||i.includes("fahrt")||i.includes("moving")||i.includes("motion")?"driving":"parked"}_resolveEditorCompositorContext(e){const t=this._normalizeEntityId(e.scene_entity),i=t?void 0:Object.keys(this.hass?.states||{}).find(e=>this._normalizeText(e).includes("vehicle motion state")),s=t||i,a=s?this.hass?.states[s]?.state:void 0,n=this._mapEditorStateToScene(a,s),r="rear_right"===e.view_mode?"rear_right":"front_left"===e.view_mode?"front_left":"driving"===n?"rear_right":"front_left",o=(e.view_prompts?.[r]||("rear_right"===r?"rear 3/4 view":e.base_view||"front 3/4 view")).trim(),l=!1!==e.bundle_by_scene_view?[r,n]:[];return{scene:n,view:r,baseView:o,assetPath:l.reduce((e,t)=>this._appendPathSegment(e,t),e.asset_path||"www/image_compositor/assets"),outputPath:l.reduce((e,t)=>this._appendPathSegment(e,t),e.output_path||"www/image_compositor"),maskBasePath:l.reduce((e,t)=>this._appendPathSegment(e,t),e.mask_base_path||"/local/image_compositor/masks"),sceneEntity:s}}_buildCompositorBasePrompt(e,t){const i=this._config?.vehicle_info||{},s=i.make||"BMW",a=i.model||"";return`High-quality photo of a ${i.year||""} ${i.color||""} ${s} ${a} ${i.series||""} ${i.trim||""} ${i.body||""}, ${e}, ${"driving"===t?"driving on road, slight motion context, no heavy blur":"parked scene, realistic parking environment"}.`.replace(/\s+/g," ").trim()}async _generateCompositorMasks(e){if(!this.hass||!this._config?.image?.compositor)return!1;const t=this._config.image.compositor||{},i=t.provider||{},s=i.type||(i.api_key?"gemini":"ai_task");if("gemini"!==s&&"openai"!==s)return this._maskGenerationError="Maskenerzeugung unterstützt aktuell nur gemini/openai.",!1;if(!i.api_key)return this._maskGenerationError="Bitte Provider API Key setzen.",!1;this._maskGenerationBusy=!0,this._maskGenerationError=void 0,this._maskPreviews=[],this.requestUpdate();const a=this._resolveEditorCompositorContext(t),n=a.baseView,r=this._toWwwPath(a.maskBasePath,"www/image_compositor/masks"),o=this._toWwwPath(a.assetPath,"www/image_compositor/assets");try{const l=await this.hass.callWS({type:"call_service",domain:"image_compositor",service:"generate_masks",service_data:{output_path:r,asset_path:o,base_image:e||t.base_image,base_view:n,base_prompt:this._buildCompositorBasePrompt(n,a.scene),provider:{type:s,api_key:i.api_key,model:i.model,size:i.size,service_data:i.service_data}},return_response:!0}),c=l?.response??l?.result??l,h=c?.masks||[];this._maskPreviews=h.map(e=>({name:String(e.name||"mask"),local_url:e.local_url?String(e.local_url):void 0,error:e.error?String(e.error):void 0}));const d=this._maskPreviews.filter(e=>e.error);return c?.error?this._maskGenerationError=String(c.error):d.length&&(this._maskGenerationError=`${d.length} Masken konnten nicht erzeugt werden.`),!c?.error}catch(e){return this._maskGenerationError=e?.message||String(e),!1}finally{this._maskGenerationBusy=!1,this.requestUpdate()}}async _runCompositorWorkflowStep(e){if(this.hass&&this._config?.image?.compositor&&!this._compositorWorkflowBusy){this._compositorWorkflowBusy=!0,this._compositorWorkflowStatus=void 0;try{if(1===e){const e=this._resolveEditorCompositorContext(this._config.image?.compositor||{});return this._compositorWorkflowStatus=`Schritt 1 läuft: Base-Neuaufbau für ${e.view}/${e.scene} angestoßen…`,this._config.image?.compositor?.base_image?.includes("workflow_base")&&this._setConfigValue("image.compositor.base_image",void 0),this._setConfigValue("image.compositor.regenerate_request_id",String(Date.now())),this._compositorWorkflowStep=2,void(this._compositorWorkflowStatus=`Schritt 1 angestoßen. Kurz warten, bis ein neues *_base.png unter ${e.assetPath} vorhanden ist; dann Schritt 2.`)}if(2===e){if(this._compositorWorkflowStep<2)return void(this._compositorWorkflowStatus="Bitte zuerst Schritt 1 ausführen.");this._compositorWorkflowStatus="Schritt 2 läuft: Masken erzeugen…";return await this._generateCompositorMasks()?(this._compositorWorkflowStep=3,void(this._compositorWorkflowStatus="Schritt 2 erfolgreich. Als Nächstes: Overlays/Compose neu bauen.")):void(this._compositorWorkflowStatus=this._maskGenerationError||"Schritt 2 fehlgeschlagen.")}if(this._compositorWorkflowStep<3)return void(this._compositorWorkflowStatus="Bitte zuerst Schritt 1 und 2 ausführen.");this._compositorWorkflowStatus="Schritt 3 läuft: Overlays/Compose neu bauen…";try{await this.hass.callWS({type:"call_service",domain:"image_compositor",service:"clear_cache",service_data:{},return_response:!0})}catch(e){}this._setConfigValue("image.compositor.regenerate_request_id",String(Date.now())),this._compositorWorkflowStep=1,this._compositorWorkflowStatus="Schritt 3 angestoßen. Karte baut Assets/Compose jetzt neu auf."}finally{this._compositorWorkflowBusy=!1,this.requestUpdate()}}}render(){if(!this._config)return D``;const e=this._config.image?.mode||"off",t=this._config.image?.ai||{},i=this._config.image?.compositor||{},s=this._resolveEditorCompositorContext(i),a=i.provider?.type||(i.provider?.api_key?"gemini":i.provider?.entity_id?"ai_task":"gemini"),n=t.provider||"ha_ai_task",r=(this._aiTaskEntities||[]).filter(e=>e.startsWith("ai_task.")),o=t.ha_entity_id||t.entity_id||t.ai_task_entity||t.entity||t.task_entity,l=this._normalizeEntityId(o)||("string"==typeof o?o.trim():"")||"",c=l&&!r.includes(l)?[l,...r]:r,h=!1!==t.generate_on_demand,d=t.upload??("openai"===n||"gemini"===n||"ha_ai_task"===n);try{return D`
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
              <option value="cardata">standard (bmw-cardata-ha Fahrzeugbild)</option>
              <option value="compositor">compositor (AI-Overlays)</option>
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

          ${"compositor"===e?D`
                <div class="row">
                  <div class="field">
                    <label class="hint">Compositor Provider</label>
                    <select
                      data-path="image.compositor.provider.type"
                      @change=${e=>this._onSelectChanged(e)}
                      .value=${a}
                    >
                      <option value="gemini">Gemini (empfohlen für Inpainting)</option>
                      <option value="openai">OpenAI (Inpainting)</option>
                      <option value="ai_task">Home Assistant ai_task (ohne Inpainting)</option>
                    </select>
                  </div>
                  <ha-textfield
                    label="Basis-Ansicht Front (Fallback)"
                    .value=${i.base_view||""}
                    data-path="image.compositor.base_view"
                    placeholder="front 3/4 view"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <div class="row">
                  <div class="field">
                    <label class="hint">Bundle-Modus (View + Szene)</label>
                    <ha-switch
                      .checked=${!1!==i.bundle_by_scene_view}
                      data-path="image.compositor.bundle_by_scene_view"
                      @change=${this._onToggleChanged}
                    ></ha-switch>
                  </div>
                  <div class="field">
                    <label class="hint">View-Auswahl</label>
                    <select
                      data-path="image.compositor.view_mode"
                      @change=${e=>this._onSelectChanged(e)}
                      .value=${i.view_mode||"auto"}
                    >
                      <option value="auto">auto</option>
                      <option value="front_left">front_left</option>
                      <option value="rear_right">rear_right</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <ha-textfield
                    label="View-Prompt front_left (optional)"
                    .value=${i.view_prompts?.front_left||""}
                    data-path="image.compositor.view_prompts.front_left"
                    placeholder="front 3/4 view"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                  <div class="field">
                    <label class="hint">Motion-State Entity (optional)</label>
                    <ha-entity-picker
                      .hass=${this.hass}
                      .value=${i.scene_entity||""}
                      data-path="image.compositor.scene_entity"
                      @value-changed=${this._onSelectChanged}
                      allow-custom-entity
                    ></ha-entity-picker>
                  </div>
                  <ha-textfield
                    label="View-Prompt rear_right (optional)"
                    .value=${i.view_prompts?.rear_right||""}
                    data-path="image.compositor.view_prompts.rear_right"
                    placeholder="rear 3/4 view"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>

                ${"gemini"===a||"openai"===a?D`
                      <div class="row">
                        <ha-textfield
                          label="Provider API Key"
                          .value=${i.provider?.api_key||""}
                          data-path="image.compositor.provider.api_key"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                        <ha-textfield
                          label="Model (optional)"
                          .value=${i.provider?.model||""}
                          data-path="image.compositor.provider.model"
                          .placeholder=${"gemini"===a?"gemini-2.0-flash-preview-image-generation":"gpt-image-1"}
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      </div>
                      ${"openai"===a?D`
                            <div class="row">
                              <div class="field">
                                <label class="hint">Bildgröße (OpenAI)</label>
                                <select
                                  data-path="image.compositor.provider.size"
                                  @change=${e=>this._onSelectChanged(e)}
                                  .value=${i.provider?.size||"1024x1024"}
                                >
                                  <option value="1024x1024">1024x1024</option>
                                  <option value="1792x1024">1792x1024</option>
                                  <option value="1024x1792">1024x1792</option>
                                </select>
                              </div>
                            </div>
                          `:null}
                    `:D`
                      <div class="row">
                        <div class="field">
                          <label class="hint">ai_task Entity</label>
                          <ha-entity-picker
                            .hass=${this.hass}
                            .value=${i.provider?.entity_id||""}
                            .includeEntities=${r}
                            data-path="image.compositor.provider.entity_id"
                            @value-changed=${this._onSelectChanged}
                            allow-custom-entity
                          ></ha-entity-picker>
                        </div>
                      </div>
                    `}

                <div class="row">
                  <ha-textfield
                    label="Asset-Pfad (optional)"
                    .value=${i.asset_path||"www/image_compositor/assets"}
                    data-path="image.compositor.asset_path"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                  <ha-textfield
                    label="Output-Pfad (optional)"
                    .value=${i.output_path||"www/image_compositor"}
                    data-path="image.compositor.output_path"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <div class="hint">
                  Aktiv: Szene <strong>${s.scene}</strong>, View <strong>${s.view}</strong>,
                  Asset-Pfad <strong>${s.assetPath}</strong>, Masken-Pfad <strong>${s.maskBasePath}</strong>.
                </div>
                <div class="row">
                  <ha-textfield
                    label="Base-Bild (optional, /local/... oder URL)"
                    .value=${i.base_image||""}
                    data-path="image.compositor.base_image"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <div class="row">
                  <ha-textfield
                    label="Masken-Basispfad (optional)"
                    .value=${i.mask_base_path||"/local/image_compositor/masks"}
                    data-path="image.compositor.mask_base_path"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <div class="actions">
                  <ha-button
                    raised
                    .disabled=${this._maskGenerationBusy}
                    @click=${this._generateCompositorMasks}
                  >${this._maskGenerationBusy?"Erzeuge Masken…":"Masken automatisch erzeugen"}</ha-button>
                </div>
                <div class="actions">
                  <ha-button
                    raised
                    .disabled=${this._compositorWorkflowBusy}
                    @click=${()=>this._runCompositorWorkflowStep(1)}
                  >1) Base neu erzeugen</ha-button>
                  <ha-button
                    raised
                    .disabled=${this._compositorWorkflowBusy||this._compositorWorkflowStep<2}
                    @click=${()=>this._runCompositorWorkflowStep(2)}
                  >2) Masken neu erzeugen</ha-button>
                  <ha-button
                    raised
                    .disabled=${this._compositorWorkflowBusy||this._compositorWorkflowStep<3}
                    @click=${()=>this._runCompositorWorkflowStep(3)}
                  >3) Overlays/Compose neu bauen</ha-button>
                </div>
                <div class="hint">
                  Workflow: erst Base, dann Masken, dann Rebuild. Aktueller Schritt: ${this._compositorWorkflowStep}.
                </div>
                ${this._compositorWorkflowStatus?D`<div class="hint">${this._compositorWorkflowStatus}</div>`:null}
                <div class="hint">
                  Nutzt <strong>image_compositor.generate_masks</strong> und legt Masken automatisch im Masken-Pfad ab.
                </div>
                ${this._maskGenerationError?D`<div class="error">${this._maskGenerationError}</div>`:null}
                ${this._maskPreviews.length?D`
                      <div class="mask-grid">
                        ${this._maskPreviews.map(e=>D`
                            <div class="mask-item">
                              ${e.local_url?D`<img src=${e.local_url} alt=${e.name} />`:D`<div class="error">${e.error||"kein Bild"}</div>`}
                              <div class="name">${e.name}</div>
                            </div>
                          `)}
                      </div>
                    `:null}
                <div class="hint">
                  Für exakt ausgerichtete BMW-Overlays nutze <strong>Gemini</strong> oder <strong>OpenAI</strong> (Inpainting).
                  <strong>ai_task</strong> ist möglich, aber ohne deterministisches Inpainting.
                </div>
              `:null}

          ${"ai"===e?D`
                <div class="row">
                  <div class="field">
                    <label class="hint">AI Provider</label>
                    <select
                      data-path="image.ai.provider"
                      @change=${e=>this._onSelectChanged(e)}
                      .value=${n}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="gemini">Gemini (Imagen)</option>
                      <option value="ha_ai_task">Home Assistant (ai_task)</option>
                      <option value="generic">Generic Endpoint</option>
                    </select>
                  </div>
                  ${"openai"===n||"gemini"===n?D`
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
                  ${h?D`<div class="hint">Bilder werden nur nach Klick generiert (Cache aktiv).</div>`:D`<div class="hint">Auto-Generierung aktiv.</div>`}
                </div>
                ${"ha_ai_task"===n?D`
                      <div class="hint">Nutze Home Assistant ai_task.generate_image und erhalte Media-URLs.</div>
                      <div class="field">
                        <label class="hint">ai_task Entity (optional)</label>
                        <ha-entity-picker
                          .hass=${this.hass}
                          .value=${l}
                          .includeEntities=${r}
                          data-path="image.ai.ha_entity_id"
                          @value-changed=${this._onSelectChanged}
                          allow-custom-entity
                        ></ha-entity-picker>
                      </div>
                      ${0===c.length?D`<div class="hint">Keine ai_task Entities gefunden.</div>`:null}
                    `:null}
                ${"openai"===n||"gemini"===n||"ha_ai_task"===n?D`
                      <div class="row">
                        <div class="field">
                          <label class="hint">Bilder via upload_file speichern</label>
                          <ha-switch
                            .checked=${d}
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
                        ${d?D`
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
                ${"generic"!==n?D`
                      <div class="row">
                        ${"gemini"===n&&this._geminiModels?.length?D`
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
                            `:"openai"===n&&this._openAiModels?.length?D`
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
                        ${"openai"===n?D`
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
                ${"gemini"===n&&this._geminiModelsLoading?D`<div class="hint">Lade Gemini-Modelle…</div>`:null}
                ${"gemini"===n&&this._geminiModelsError?D`<div class="hint">${this._geminiModelsError}</div>`:null}
                ${"openai"===n&&this._openAiModelsLoading?D`<div class="hint">Lade OpenAI-Modelle…</div>`:null}
                ${"openai"===n&&this._openAiModelsError?D`<div class="hint">${this._openAiModelsError}</div>`:null}
                <div class="row">
                  ${"gemini"===n?D`
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
      `}catch(e){return this._setEditorError(e),D`<div class="error">${this._editorError}</div>`}}}customElements.define(le,de),customElements.define("bmw-status-card-editor",_e),window.customCards=window.customCards||[],window.customCards.push({type:le,name:"BMW Status Card",description:"Auto-Konfiguration für bmw_home + bmw-cardata-ha, basiert auf vehicle-status-card.",version:"0.1.79"});
//# sourceMappingURL=bmw-status-card.js.map
