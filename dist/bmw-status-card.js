/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:o,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:c,getPrototypeOf:p}=Object,_=globalThis,u=_.trustedTypes,m=u?u.emptyScript:"",g=_.reactiveElementPolyfillSupport,f=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!o(t,e),w={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const a=s?.call(this);n?.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...d(t),...c(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const a=n.fromAttribute(e,t.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const a=this.constructor;if(!1===s&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==n||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[f("elementProperties")]=new Map,$[f("finalized")]=new Map,g?.({ReactiveElement:$}),(_.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const b=globalThis,E=t=>t,A=b.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,x="?"+S,M=`<${x}>`,I=document,P=()=>I.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,B="[ \t\n\f\r]",L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,H=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,z=/"/g,j=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),G=new WeakMap,K=I.createTreeWalker(I,129);function q(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,s=[];let n,a=2===e?"<svg>":3===e?"<math>":"",r=L;for(let e=0;e<i;e++){const i=t[e];let o,l,h=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===L?"!--"===l[1]?r=U:void 0!==l[1]?r=N:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=H):void 0!==l[3]&&(r=H):r===H?">"===l[0]?(r=n??L,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?H:'"'===l[3]?z:R):r===z||r===R?r=H:r===U||r===N?r=L:(r=H,n=void 0);const c=r===H&&t[e+1].startsWith("/>")?" ":"";a+=r===L?i+M:h>=0?(s.push(o),i.slice(0,h)+C+i.slice(h)+S+c):i+S+(-2===h?e:c)}return[q(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0;const r=t.length-1,o=this.parts,[l,h]=F(t,e);if(this.el=J.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&o.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=h[a++],i=s.getAttribute(t).split(S),r=/([.?@])?(.*)/.exec(e);o.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?it:X}),s.removeAttribute(t)}else t.startsWith(S)&&(o.push({type:6,index:n}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),K.nextNode(),o.push({type:2,index:++n});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===x)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)o.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=I.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===D)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const a=O(e)?void 0:e._$litDirective$;return n?.constructor!==a&&(n?._$AO?.(!1),void 0===a?n=void 0:(n=new a(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??I).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),a=0,r=0,o=i[0];for(;void 0!==o;){if(a===o.index){let e;2===o.type?e=new Q(n,n.nextSibling,this,t):1===o.type?e=new o.ctor(n,o.name,o.strings,this,t):6===o.type&&(e=new st(n,this,t)),this._$AV.push(e),o=i[++r]}a!==o?.index&&(n=K.nextNode(),a++)}return K.currentNode=I,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=G.get(t.strings);return void 0===e&&G.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let a=!1;if(void 0===n)t=Y(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==D,a&&(this._$AH=t);else{const s=t;let r,o;for(t=n[0],r=0;r<n.length-1;r++)o=Y(this,s[i+r],e,r),o===D&&(o=this._$AH[r]),a||=!O(o)||o!==this._$AH[r],o===W?t=W:t!==W&&(t+=(o??"")+n[r+1]),this._$AH[r]=o}a&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??W)===D)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const nt=b.litHtmlPolyfillSupport;nt?.(J,Q),(b.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(P(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return D}}rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const ot=at.litElementPolyfillSupport;ot?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.2");const lt="bmw-status-card",ht="vehicle-status-card",dt="High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}, clean studio background, realistic, sharp details.";class ct extends rt{constructor(){super(...arguments),this._loading=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_vehicleConfig:{state:!0},_error:{state:!0},_loading:{state:!0},_vehicleInfo:{state:!0}}}static{this.styles=a`
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
  `}set hass(t){this._hass=t,this._ensureConfig()}get hass(){return this._hass}setConfig(t){this._config=t,this._vehicleConfig=void 0,this._error=void 0,t?.bmw_home_device_id&&t?.bmw_cardata_device_id||(this._error="bmw_home_device_id und bmw_cardata_device_id sind erforderlich."),this._vehicleInfo=void 0,this._entityEntriesCache=void 0,this._deviceEntriesCache=void 0,this._ensureVehicleCardLoaded(),this._ensureConfig()}updated(){const t=this.renderRoot.querySelector(ht);t&&this.hass&&(t.hass=this.hass,this._vehicleConfig&&t.setConfig(this._vehicleConfig))}getCardSize(){return 6}static getConfigElement(){return document.createElement("bmw-status-card-editor")}static getStubConfig(){return{type:`custom:${lt}`,bmw_home_device_id:"",bmw_cardata_device_id:""}}async _ensureVehicleCardLoaded(){if(!this._config?.vehicle_status_card_resource)return;if(customElements.get(ht))return;document.querySelector(`script[data-bmw-status-card="${this._config.vehicle_status_card_resource}"]`)||await new Promise((t,e)=>{const i=document.createElement("script");i.type="module",i.src=this._config.vehicle_status_card_resource,i.dataset.bmwStatusCard=this._config.vehicle_status_card_resource,i.addEventListener("load",()=>t()),i.addEventListener("error",()=>e()),document.head.appendChild(i)})}async _ensureConfig(){if(this.hass&&this._config&&!this._loading&&!this._vehicleConfig&&this._config.bmw_home_device_id&&this._config.bmw_cardata_device_id){this._loading=!0;try{console.debug("[bmw-status-card] building config");const t=[this._config.bmw_home_device_id,this._config.bmw_cardata_device_id].filter(Boolean),e=await this._getEntityRegistry(),i=await this._getDeviceRegistry(),s=this._buildEntityInfo(e,t),n=this._buildVehicleInfo(i,s);this._vehicleInfo=n;const a=await this._resolveImages(n),r=this._buildVehicleStatusCardConfig(s,a);this._vehicleConfig=this._mergeVehicleConfig(r,this._config.vehicle_status_card),this._error=void 0}catch(t){this._error=t?.message||String(t),console.error("[bmw-status-card] config build failed:",t)}finally{this._loading=!1,this.requestUpdate()}}}async _getEntityRegistry(){if(this._entityEntriesCache)return this._entityEntriesCache;const t=await this.hass.callWS({type:"config/entity_registry/list"});return this._entityEntriesCache=t,t}async _getDeviceRegistry(){if(this._deviceEntriesCache)return this._deviceEntriesCache;const t=await this.hass.callWS({type:"config/device_registry/list"});return this._deviceEntriesCache=t,t}_buildEntityInfo(t,e){const i=new Set(e);return t.filter(t=>t.device_id&&i.has(t.device_id)).map(t=>{const e=this.hass.states[t.entity_id],i=t.entity_id.split(".")[0],s=e?.attributes?.friendly_name||t.original_name||t.entity_id;return{entity_id:t.entity_id,domain:i,name:s,device_class:e?.attributes?.device_class,unit:e?.attributes?.unit_of_measurement,state:e?.state,attributes:e?.attributes||{}}})}_extractVehicleInfoFromAttributes(t){const e={};for(const i of t){const t=i.attributes||{},s=t.vehicle_basic_data||t.vehicleBasicData,n=t.vehicle_basic_data_raw||t.vehicleBasicDataRaw;s&&"object"==typeof s&&(e.model=e.model||this._toNonEmptyString(s.model_name),e.series=e.series||this._toNonEmptyString(s.series),e.color=e.color||this._toNonEmptyString(s.color),e.body=e.body||this._toNonEmptyString(s.body_type),e.year=e.year||this._extractYear(s.construction_date)),n&&"object"==typeof n&&(e.make=e.make||this._toNonEmptyString(n.brand),e.model=e.model||this._toNonEmptyString(n.modelName)||this._toNonEmptyString(n.modelRange)||this._toNonEmptyString(n.series),e.series=e.series||this._toNonEmptyString(n.series)||this._toNonEmptyString(n.seriesDevt),e.color=e.color||this._toNonEmptyString(n.colourDescription)||this._toNonEmptyString(n.colourCodeRaw),e.body=e.body||this._toNonEmptyString(n.bodyType),e.year=e.year||this._extractYear(n.constructionDate))}return e}_extractYear(t){if(t){if("number"==typeof t)return String(t);if("string"==typeof t){const e=t.match(/(19|20)\d{2}/);return e?e[0]:void 0}}}_toNonEmptyString(t){if(null==t)return;const e=String(t).trim();return e.length?e:void 0}_buildVehicleInfo(t,e){const i=this._config?.vehicle_info||{},s=[this._config?.bmw_home_device_id,this._config?.bmw_cardata_device_id],n=t.filter(t=>s.includes(t.id)),a=this._extractVehicleInfoFromAttributes(e),r=n.find(t=>t.manufacturer)?.manufacturer||"BMW",o=n.find(t=>t.model)?.model,l=n.find(t=>t.name)?.name,h=this._findEntityByKeywords(e,["model","vehicle_model","car_model"]),d=this._findEntityByKeywords(e,["series","line"]),c=this._findEntityByKeywords(e,["year","model_year"]),p=this._findEntityByKeywords(e,["color","colour"]),_=this._findEntityByKeywords(e,["trim","package","edition"]),u=this._findEntityByKeywords(e,["body","body_type"]),m=t=>{if(!t)return;const e=this.hass.states[t]?.state;return e&&"unknown"!==e&&"unavailable"!==e?e:void 0};return{make:i.make||a.make||r,model:i.model||a.model||m(h)||o,series:i.series||a.series||m(d),year:i.year||a.year||m(c),color:i.color||a.color||m(p),trim:i.trim||a.trim||m(_),body:i.body||a.body||m(u),name:i.name||a.name||l}}async _resolveImages(t){const e=this._config?.image;if(!e||"off"===e.mode)return[];if("static"===e.mode&&e.static_urls?.length)return e.static_urls;if("ai"===e.mode&&e.ai){const i=e.ai.provider||"ha_ai_task";return"openai"!==i&&"gemini"!==i||e.ai.api_key?(console.debug("[bmw-status-card] generating AI images",e.ai),this._generateAiImages(t,e.ai)):(console.warn("[bmw-status-card] image.ai.api_key fehlt – überspringe Bildgenerierung."),[])}return[]}async _generateAiImages(t,e){const i=e.provider||"ha_ai_task",s=e.cache_hours??24,n=this._buildImageCacheKey(t,e),a=this._buildPrompts(t,e),r=e.count??1,o=e.max_images??8,l=!1!==e.generate_on_demand,h=e.upload??("openai"===i||"gemini"===i);try{const t=localStorage.getItem(n);if(t){const e=JSON.parse(t),i=(Date.now()-e.timestamp)/36e5;if(e.images?.length&&i<=s)return e.images}}catch(t){}if(l&&!e.generate_request_id)return[];let d=[];for(const t of a){if(d.length>=o)break;const s=o-d.length,n=Math.min(r,s);if(n<=0)break;"openai"===i?d.push(...await this._fetchOpenAiImages(t,e,n)):"gemini"===i?d.push(...await this._fetchGeminiImages(t,e,n)):"ha_ai_task"===i?d.push(...await this._fetchHaAiTaskImages(t,e,n)):d.push(...await this._fetchGenericImages(t,e,n))}if(d.length)try{localStorage.setItem(n,JSON.stringify({timestamp:Date.now(),images:d}))}catch(t){}return d.length&&h&&(d=await this._uploadImagesIfNeeded(d,e)),d}_buildPrompts(t,e){const i=e.prompt_template||dt;if(e.prompts&&e.prompts.length)return e.prompts.map(e=>this._buildPrompt(t,e));return(e.views?.length?e.views:["front 3/4 view","rear 3/4 view","side profile","front view","rear view"]).map(e=>this._buildPrompt(t,i,e))}_buildPrompt(t,e,i){const s=e||dt,n={"{make}":t.make||"BMW","{model}":t.model||"","{series}":t.series||"","{year}":t.year||"","{color}":t.color||"","{trim}":t.trim||"","{body}":t.body||"","{angle}":i||""};let a=s;return Object.entries(n).forEach(([t,e])=>{const i=e?.trim();a=a.replaceAll(t,i||"")}),i&&!s.includes("{angle}")&&(a=`${a} ${i}`),a.replace(/\s+/g," ").trim()}async _fetchOpenAiImages(t,e,i){if(!e.api_key)throw new Error("image.ai.api_key fehlt (OpenAI).");const s=e.endpoint||"https://api.openai.com/v1/images/generations",n={model:e.model||"gpt-image-1",prompt:t,size:e.size||"1024x1024",n:i},a=await fetch(s,{method:"POST",headers:{Authorization:`Bearer ${e.api_key}`,"Content-Type":"application/json"},body:JSON.stringify(n)});if(!a.ok){const t=await a.text();throw new Error(`OpenAI Fehler: ${a.status} ${t}`)}const r=await a.json();return(r?.data||[]).map(t=>t.url||t.b64_json).filter(Boolean).map(t=>t.startsWith("http")?t:`data:image/png;base64,${t}`)}async _fetchGeminiImages(t,e,i){if(!e.api_key)throw new Error("image.ai.api_key fehlt (Gemini).");const s=e.model||"imagen-3.0-generate-002",n=e.endpoint||`https://generativelanguage.googleapis.com/v1beta/models/${s}:generateContent?key=${e.api_key}`,a=e=>{const s={contents:[{role:"user",parts:[{text:t}]}],generationConfig:{candidateCount:i}};return e&&(s.responseModalities=["IMAGE"]),s},r=e.request_body||a(!0),o=async t=>await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});let l=await o(r),h="";if(!l.ok){h=await l.text();if(!(!e.request_body&&(h.includes("response_modalities")||h.includes("responseModalities")||h.includes("imageGenerationConfig")||h.includes("generation_config"))))throw new Error(`Gemini Fehler: ${l.status} ${h}`);if(l=await o(a(!1)),!l.ok){const t=await l.text();throw new Error(`Gemini Fehler: ${l.status} ${t}`)}}const d=await l.json(),c=d?.candidates||[],p=[];if(Array.isArray(c)&&c.forEach(t=>{"SAFETY"===t?.finishReason&&console.warn("[bmw-status-card] Gemini Bild durch Safety-Filter blockiert.");(t?.content?.parts||[]).forEach(t=>{const e=t.inlineData||t.inline_data;if(e?.data){const t=e.mimeType||"image/png";p.push(`data:${t};base64,${e.data}`)}})}),p.length)return p;const _=d?.predictions||d?.images||d?.data||[];return Array.isArray(_)?_.map(t=>{const e=t.bytesBase64Encoded||t?.image?.bytesBase64Encoded||t?.b64_json;return e?`data:image/png;base64,${e}`:"string"==typeof t&&t.startsWith("http")?t:t?.url?t.url:null}).filter(Boolean):[]}async _fetchHaAiTaskImages(t,e,i){if(!this.hass)throw new Error("Home Assistant nicht verfügbar.");const s={};e.ha_entity_id&&(s.entity_id=e.ha_entity_id),e.model&&(s.model=e.model),e.size&&(s.size=e.size),e.aspect_ratio&&(s.aspect_ratio=e.aspect_ratio),e.request_body&&Object.assign(s,e.request_body);const n=this._vehicleInfo?.name||this._config?.vehicle_info?.name||"BMW Status Card",a=[{task_name:n,instructions:t},{task_name:n,instructions:t,n:i},{prompt:t,n:i},{prompt:t},{text:t,n:i},{text:t},{input:t,n:i},{input:t},{task:t,n:i},{task:t},{description:t,n:i},{description:t}];let r,o;for(const t of a)try{r=await this.hass.callWS({type:"call_service",domain:"ai_task",service:"generate_image",service_data:{...s,...t},return_response:!0}),o=void 0;break}catch(t){o=t}if(!r)throw new Error(`ai_task Fehler: ${o?.message||String(o)}`);const l=r?.response??r?.result??r;return(await this._extractHaAiTaskUrls(l)).filter(Boolean)}async _uploadImagesIfNeeded(t,e){if(!this.hass)return t;const i=this._normalizeUploadPath(e.upload_path),s=[];for(const e of t){let t,n,a;if(this._isHttpUrl(e))t=e;else{const t=this._parseDataUrl(e);if(!t){s.push(e);continue}n=t.data,a=t.mimeType}const r=this._guessImageExtension(t,a),o=t||n||e,l=`${this._hash(o)}.${r}`;try{const a=await this.hass.callWS({type:"call_service",domain:"upload_file",service:"upload_file",service_data:{path:i,filename:l,...t?{url:t}:{data_base64:n}},return_response:!0}),r=a?.response??a?.result??a,o=r?.local_url||r?.url||r?.local_path;s.push(o||e)}catch(t){s.push(e)}}return s}_normalizeUploadPath(t){const e=(t||"www/upload_file").replace(/^\/+/,"").replace(/\/+$/,"");return e.startsWith("www/")?e:`www/${e}`}_parseDataUrl(t){if(!t.startsWith("data:"))return null;const e=t.match(/^data:([^;]+);base64,(.*)$/);return e?{mimeType:e[1],data:e[2]}:null}_guessImageExtension(t,e){if(e){if(e.includes("png"))return"png";if(e.includes("jpeg")||e.includes("jpg"))return"jpg";if(e.includes("webp"))return"webp"}if(t){const e=t.match(/\.(png|jpg|jpeg|webp)(\?|$)/i);if(e)return e[1].toLowerCase().replace("jpeg","jpg")}return"png"}_isHttpUrl(t){return t.startsWith("http://")||t.startsWith("https://")}async _extractHaAiTaskUrls(t){if(!t)return[];const e=t?.images||t?.data||t?.results||t?.result||t,i=Array.isArray(e)?e:[e],s=[];for(const t of i){if(!t)continue;if("string"==typeof t){s.push(t);continue}const e=t.url||t.image_url||t.media_url||t.content_url||t.media?.url||t.image?.url;if(e){s.push(e);continue}const i=t.media_id||t.media_content_id||t.content_id||t.media;if(i){const t=await this._resolveMediaSourceUrl(String(i));t?s.push(t):s.push(`/api/media/${i}`)}}return s}async _resolveMediaSourceUrl(t){if(this.hass&&t)try{if(t.startsWith("http"))return t;const e=await this.hass.callWS({type:"media_source/resolve",media_content_id:t});return e?.url}catch(t){return}}async _fetchGenericImages(t,e,i){if(!e.endpoint)throw new Error("image.ai.endpoint fehlt (generic).");const s=e.request_body||{prompt:t,count:i,size:e.size},n=await fetch(e.endpoint,{method:"POST",headers:{...e.api_key?{Authorization:`Bearer ${e.api_key}`}:{},"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok){const t=await n.text();throw new Error(`AI Fehler: ${n.status} ${t}`)}const a=await n.json(),r=this._extractByPath(a,e.response_path)||a.images||a.data||[];return Array.isArray(r)?r.map(t=>"string"==typeof t?t:t.url||t.image||t.b64_json).filter(Boolean).map(t=>t.startsWith("http")?t:`data:image/png;base64,${t}`):[]}_extractByPath(t,e){if(e)return e.split(".").reduce((t,e)=>t?t[e]:void 0,t)}_buildImageCacheKey(t,e){const i={vehicleInfo:t,provider:e.provider,model:e.model,size:e.size,aspect_ratio:e.aspect_ratio,count:e.count,max_images:e.max_images,upload:e.upload,upload_path:e.upload_path,prompt_template:e.prompt_template,prompts:e.prompts,views:e.views,generate_request_id:!1!==e.generate_on_demand?e.generate_request_id:void 0};return`bmw-status-card:images:${this._hash(JSON.stringify(i))}`}_hash(t){let e=0;for(let i=0;i<t.length;i+=1)e=(e<<5)-e+t.charCodeAt(i),e|=0;return String(e)}_buildVehicleStatusCardConfig(t,e){const i=new Set,s=this._pickEntity(t,i,["lock","binary_sensor","sensor"],["lock","locked","door lock"]),n=this._pickEntity(t,i,["binary_sensor","sensor"],["charging","charge","plugged","plug","charging port","connector","port"]),a=this._pickEntity(t,i,["sensor"],["battery","soc","state_of_charge","state of charge","state_of_energy","soe"]),r=this._pickEntity(t,i,["sensor"],["fuel","tank","fuel_level"]),o=this._pickEntity(t,i,["sensor"],["range","remaining","remaining_range","remainingrange"]),l=this._pickEntity(t,i,["sensor"],["electric range","ev range","remaining electric range","kombi remaining electric range"]),h=this._pickEntity(t,i,["sensor"],["fuel range","remaining fuel","tank level"]),d=this._pickEntity(t,i,["sensor"],["total remaining range","total range"]),c=this._pickEntity(t,i,["sensor","number"],["target","charge target","target soc","target state"]),p=this._pickEntity(t,i,["sensor"],["odometer","mileage","distance","travelled"]),_=this._pickEntity(t,i,["sensor"],["temperature","temp","coolant"]),u=this._pickEntity(t,i,["sensor"],["charging power","charge power","power","grid energy"]),m=this._pickEntity(t,i,["sensor"],["time remaining","time to fully","time to full","remaining time"]),g=this._pickEntity(t,i,["binary_sensor","sensor","switch"],["preconditioning","climatization","climate","hvac","defrost"]),f=this._pickEntity(t,i,["binary_sensor","sensor"],["engine","ignition"]),y=this._pickEntity(t,i,["binary_sensor","sensor"],["moving","motion","driving","parking"]),v=this._pickEntity(t,i,["binary_sensor","sensor"],["alarm","anti theft","anti-theft"]),w=[];s&&w.push({type:"entity",entity:s,icon:"mdi:lock"}),n&&w.push({type:"entity",entity:n,icon:"mdi:ev-station"}),a&&w.push({type:"entity",entity:a,icon:"mdi:battery"}),r&&w.push({type:"entity",entity:r,icon:"mdi:gas-station"}),g&&w.push({type:"entity",entity:g,icon:"mdi:car-defrost-front"});const $=[];(l||d||o)&&$.push({type:"entity",entity:l||d||o,icon:"mdi:map-marker-distance"}),p&&$.push({type:"entity",entity:p,icon:"mdi:counter"}),_&&$.push({type:"entity",entity:_,icon:"mdi:thermometer"}),u&&$.push({type:"entity",entity:u,icon:"mdi:flash"}),m&&$.push({type:"entity",entity:m,icon:"mdi:timer"}),f&&$.push({type:"entity",entity:f,icon:"mdi:engine"}),y&&$.push({type:"entity",entity:y,icon:"mdi:car"}),v&&$.push({type:"entity",entity:v,icon:"mdi:alarm-light"});const b=this._pickEntities(t,i,["binary_sensor","sensor","cover"],["door","window","trunk","tailgate","boot","hood","bonnet","sunroof","roof","flap","lock","flap","charging port","port"]),E=this._pickEntities(t,i,["sensor"],["tire","tyre","pressure","wheel","tpms","pressure target"]),A=this._pickEntities(t,i,["sensor"],["tire temperature","tyre temperature","wheel temperature"]),k=this._pickEntities(t,i,["binary_sensor","sensor","switch"],["light","lights","headlight","lamp","running light"]),C=this._pickEntities(t,i,["binary_sensor","sensor","switch","climate"],["climate","hvac","preconditioning","defrost","seat","steering wheel","air purification","heater","heating","cooling"]),S=this._pickEntities(t,i,["sensor","binary_sensor"],["service","inspection","cbs","check control","maintenance"]),x=this._pickEntities(t,i,["sensor","device_tracker"],["navigation","destination","eta","latitude","longitude","gps"]),M=this._pickEntities(t,i,["sensor","binary_sensor","switch","number"],["charging","charge","plug","connector","charging mode","charging power","time to fully","charge target"]),I=[];if(w.length&&I.push({row_items:w,alignment:"center",no_wrap:!0}),$.length&&I.push({row_items:$,alignment:"center",no_wrap:!0}),b.length||E.length){const t=[];b.length&&t.push({type:"group",name:"Öffnungen",icon:"mdi:car-door",items:b.map(t=>({type:"entity",entity:t}))});const e=[...E,...A];e.length&&t.push({type:"group",name:"Reifen",icon:"mdi:car-tire-alert",items:e.map(t=>({type:"entity",entity:t}))}),t.length&&I.push({row_items:t,alignment:"center",no_wrap:!0})}const P=[];M.length&&P.push({type:"group",name:"Laden",icon:"mdi:ev-station",items:M.map(t=>({type:"entity",entity:t}))}),C.length&&P.push({type:"group",name:"Klima",icon:"mdi:car-defrost-front",items:C.map(t=>({type:"entity",entity:t}))}),k.length&&P.push({type:"group",name:"Licht",icon:"mdi:car-light-high",items:k.map(t=>({type:"entity",entity:t}))}),S.length&&P.push({type:"group",name:"Service",icon:"mdi:wrench",items:S.map(t=>({type:"entity",entity:t}))}),x.length&&P.push({type:"group",name:"Navigation",icon:"mdi:navigation",items:x.map(t=>({type:"entity",entity:t}))}),P.length&&I.push({row_items:P,alignment:"center",no_wrap:!0});const O=[];a&&O.push({energy_level:{entity:a},range_level:l||d||o?{entity:l||d||o}:void 0,charging_entity:n||void 0,charge_target_entity:c||void 0}),r&&O.push({energy_level:{entity:r},range_level:h||d||o?{entity:h||d||o}:void 0}),!O.length&&o&&O.push({energy_level:{entity:o}});const T=t.filter(t=>"device_tracker"===t.domain).map(t=>t.entity_id),B=T[0],L=this._buildTireCardConfig(t),U=new Set(L?.entities||[]),N=[],H=[],R=[],z=(t,e,i,s)=>{e&&t.push({entity:e,name:i,icon:s})};z(H,a,"Batterie","mdi:battery"),z(H,r,"Kraftstoff","mdi:gas-station"),z(H,l||d||o,"Reichweite","mdi:map-marker-distance"),z(H,p,"Kilometerstand","mdi:counter"),z(H,_,"Temperatur","mdi:thermometer"),z(H,m,"Ladezeit","mdi:timer"),z(H,u,"Ladeleistung","mdi:flash"),S.forEach(t=>z(R,t)),H.length&&(N.push({name:"Fahrzeug",icon:"mdi:car-info",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Fahrzeugstatus",items:H}]}}),H.forEach(t=>U.add(t.entity))),R.length&&(N.push({name:"Service",icon:"mdi:wrench",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Service",items:R}]}}),R.forEach(t=>U.add(t.entity))),M.length&&(N.push({name:"Laden",icon:"mdi:ev-station",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Ladezustand",items:M.map(t=>({entity:t}))}]}}),M.forEach(t=>U.add(t))),C.length&&(N.push({name:"Klima",icon:"mdi:car-defrost-front",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Klima",items:C.map(t=>({entity:t}))}]}}),C.forEach(t=>U.add(t))),x.length&&(N.push({name:"Navigation",icon:"mdi:navigation",button_type:"default",card_type:"default",sub_card:{default_card:[{title:"Navigation",items:x.map(t=>({entity:t}))}]}}),x.forEach(t=>U.add(t)));const j=[...N,...this._buildButtonCards(t,i,U)],V=e.length?e.map(t=>({image:t})):void 0;return{type:`custom:${ht}`,name:this._vehicleInfo?.name||"BMW",indicator_rows:I.length?I:void 0,range_info:O.length?O:void 0,button_cards:j.length?j:void 0,images:V,mini_map:B?{device_tracker:B,entities:T,maptiler_api_key:this._config?.maptiler_api_key,enable_popup:!0,map_height:240,map_zoom:14,user_location:!0,use_zone_name:!0}:void 0,layout_config:{section_order:["indicators","range_info","images","mini_map","buttons"],button_grid:{columns:2,swipe:!0},images_swipe:{autoplay:!0,loop:!0,delay:6e3,speed:600,effect:"fade",height:240},range_info_config:{layout:"row"},single_tire_card:L?.tire_card?{enabled:!0,tire_card:L.tire_card}:void 0}}}_buildButtonCards(t,e,i){const s=["lock","switch","button","cover","climate"],n=new Set([...e,...i?Array.from(i):[]]),a=t.filter(t=>!n.has(t.entity_id)).sort((t,e)=>{const i=s.indexOf(t.domain),n=s.indexOf(e.domain);return(-1===i?999:i)-(-1===n?999:n)}),r=[];for(const t of a){if(r.length>=12)break;s.includes(t.domain)&&(e.add(t.entity_id),n.add(t.entity_id),r.push({entity:t.entity_id,name:t.name,button_type:"default"}))}return r}_mergeVehicleConfig(t,e){if(!e)return t;const i={...t,...e};return["indicator_rows","range_info","images","button_cards"].forEach(t=>{void 0!==e[t]&&(i[t]=e[t])}),void 0!==e.mini_map&&(i.mini_map=e.mini_map),void 0!==e.layout_config&&(i.layout_config=e.layout_config),i}_pickEntity(t,e,i,s){const n=this._findEntity(t,i,s,e);if(n)return e.add(n.entity_id),n.entity_id}_pickEntities(t,e,i,s){const n=this._findEntities(t,i,s,e);return n.forEach(t=>e.add(t.entity_id)),n.map(t=>t.entity_id)}_findEntity(t,e,i,s){return this._findEntities(t,e,i,s)[0]}_findEntities(t,e,i,s){const n=i.map(t=>t.toLowerCase());return t.filter(t=>!s.has(t.entity_id)).filter(t=>!e.length||e.includes(t.domain)).filter(t=>{if(!n.length)return!0;const e=`${t.entity_id} ${t.name} ${t.device_class??""}`.toLowerCase();return n.some(t=>e.includes(t))}).sort((t,e)=>{const i=t.state||"",s=e.state||"";return"unknown"===i&&"unknown"!==s?1:"unknown"===s&&"unknown"!==i?-1:t.name.localeCompare(e.name)})}_findEntityByKeywords(t,e){return this._findEntity(t,[],e,new Set)?.entity_id}_buildTireCardConfig(t){const e=e=>this._findEntity(t,["sensor"],e,new Set),i=e(["front left","front_left","row1 left","row1 wheel left"]),s=e(["front right","front_right","row1 right","row1 wheel right"]),n=e(["rear left","rear_left","row2 left","row2 wheel left"]),a=e(["rear right","rear_right","row2 right","row2 wheel right"]),r=[i,s,n,a].filter(Boolean).map(t=>t.entity_id);if(!r.length)return;return{tire_card:{title:"Reifendruck",front_left:i?{entity:i.entity_id,name:"Vorne links"}:void 0,front_right:s?{entity:s.entity_id,name:"Vorne rechts"}:void 0,rear_left:n?{entity:n.entity_id,name:"Hinten links"}:void 0,rear_right:a?{entity:a.entity_id,name:"Hinten rechts"}:void 0},entities:r}}render(){return this._error?V`
        <ha-card>
          <div class="message error">${this._error}</div>
        </ha-card>
      `:customElements.get(ht)?this._vehicleConfig?V`<vehicle-status-card></vehicle-status-card>`:V`
        <ha-card>
          <div class="message">BMW Status Card wird vorbereitet…</div>
        </ha-card>
      `:V`
        <ha-card>
          <div class="message">
            Fahrzeugkarte <strong>vehicle-status-card</strong> ist nicht geladen. Installiere die Karte oder setze
            <strong>vehicle_status_card_resource</strong>.
          </div>
        </ha-card>
      `}}class pt extends rt{constructor(){super(...arguments),this._geminiModelsLoading=!1,this._openAiModelsLoading=!1}static{this.properties={hass:{attribute:!1},_config:{state:!0},_bmwHomeEntity:{state:!0},_bmwCardataEntity:{state:!0},_bmwHomeEntities:{state:!0},_bmwCardataEntities:{state:!0},_aiTaskEntities:{state:!0},_editorError:{state:!0},_geminiModels:{state:!0},_geminiModelsLoading:{state:!0},_geminiModelsError:{state:!0},_openAiModels:{state:!0},_openAiModelsLoading:{state:!0},_openAiModelsError:{state:!0}}}static{this._errorHooked=!1}set hass(t){this._hass=t,this._loadIntegrationEntities(),pt._errorHooked||(pt._errorHooked=!0,window.addEventListener("error",t=>{console.error("[bmw-status-card] Window error:",t.error||t.message||t)}),window.addEventListener("unhandledrejection",t=>{console.error("[bmw-status-card] Unhandled rejection:",t.reason)}))}get hass(){return this._hass}setConfig(t){this._config={...t,type:t.type||`custom:${lt}`},this._maybeLoadGeminiModels(),this._maybeLoadOpenAiModels()}async _loadIntegrationEntities(){if(this.hass)try{const t=await this.hass.callWS({type:"config/entity_registry/list"}),e=t.filter(t=>"bmw_home"===t.platform).map(t=>t.entity_id).sort(),i=t.filter(t=>"cardata"===t.platform).map(t=>t.entity_id).sort(),s=Object.keys(this.hass.states||{}).filter(t=>t.startsWith("ai_task.")).sort();this._bmwHomeEntities=e,this._bmwCardataEntities=i,this._aiTaskEntities=s}catch(t){}}static{this.styles=a`
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
  `}_setEditorError(t){const e=t instanceof Error?`${t.message}\n${t.stack||""}`:String(t);this._editorError=e,console.error("[bmw-status-card] Editor error:",t)}_emitConfigChanged(){if(!this._config)return;const t={...this._config,type:this._config.type||`custom:${lt}`};try{console.debug("[bmw-status-card] config-changed",t),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0})),this._editorError=void 0}catch(t){this._setEditorError(t)}}_setConfigValue(t,e){if(this._config)try{const i=t.split("."),s=[];let n={...this._config},a=n;for(let t=0;t<i.length-1;t+=1){const e=i[t];s.push({parent:a,key:e}),a[e]={...a[e]||{}},a=a[e]}const r=i[i.length-1];""===e||null==e?delete a[r]:a[r]=e;for(let t=s.length-1;t>=0;t-=1){const{parent:e,key:i}=s[t];e[i]&&0===Object.keys(e[i]).length&&delete e[i]}this._config=n,this._emitConfigChanged(),this._maybeLoadGeminiModels(t,e),this._maybeLoadOpenAiModels(t,e)}catch(t){this._setEditorError(t)}}_onValueChanged(t){const e=t.target,i=e?.dataset?.path;i&&this._setConfigValue(i,e.value)}_onImageModeChanged(t){const e=t.currentTarget,i=t.detail?.value??e?.value;if(!i||!["off","static","ai"].includes(i))return;if(console.debug("[bmw-status-card] image mode changed:",i),!this._config)return;const s={...this._config};"off"===i?delete s.image:s.image="static"===i?{...s.image||{},mode:"static",static_urls:s.image?.static_urls||[]}:{...s.image||{},mode:"ai",ai:s.image?.ai||{}},this._config=s,this._emitConfigChanged()}_onSelectChanged(t){const e=t.currentTarget,i=e?.dataset?.path;if(!i)return;const s=t.detail?.value??e?.value;this._setConfigValue(i,s)}_onToggleChanged(t){const e=t.currentTarget,i=e?.dataset?.path;i&&this._setConfigValue(i,Boolean(e?.checked))}_maybeLoadGeminiModels(t,e){if("gemini"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===t?e||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._geminiModelsLoading||this._geminiModelsKey===i&&this._geminiModels?.length||(this._geminiModelsTimer&&window.clearTimeout(this._geminiModelsTimer),this._geminiModelsTimer=window.setTimeout(()=>{this._loadGeminiModels(i)},400))}_maybeLoadOpenAiModels(t,e){if("openai"!==(this._config?.image?.ai?.provider||"openai"))return;const i=String("image.ai.api_key"===t?e||"":this._config?.image?.ai?.api_key||"");!i||i.length<20||this._openAiModelsLoading||this._openAiModelsKey===i&&this._openAiModels?.length||(this._openAiModelsTimer&&window.clearTimeout(this._openAiModelsTimer),this._openAiModelsTimer=window.setTimeout(()=>{this._loadOpenAiModels(i)},400))}async _loadOpenAiModels(t){this._openAiModelsLoading=!0,this._openAiModelsError=void 0,this._openAiModelsKey=t;try{const e=await fetch("https://api.openai.com/v1/models",{headers:{Authorization:`Bearer ${t}`}});if(!e.ok){const t=await e.text();throw new Error(`OpenAI ListModels Fehler: ${e.status} ${t}`)}const i=await e.json(),s=(i?.data||[]).map(t=>t.id||"").filter(Boolean).filter(t=>/(image|dall-e|gpt-image)/i.test(t)).sort();this._openAiModels=s}catch(t){this._openAiModelsError=t?.message||String(t),this._openAiModels=void 0,console.warn("[bmw-status-card] OpenAI ListModels fehlgeschlagen:",t)}finally{this._openAiModelsLoading=!1,this.requestUpdate()}}async _loadGeminiModels(t){this._geminiModelsLoading=!0,this._geminiModelsError=void 0,this._geminiModelsKey=t;try{const e=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${t}`);if(!e.ok){const t=await e.text();throw new Error(`ListModels Fehler: ${e.status} ${t}`)}const i=await e.json(),s=(i?.models||[]).filter(t=>(t.supportedGenerationMethods||[]).includes("generateContent")).map(t=>t.name||"").filter(Boolean).map(t=>t.replace(/^models\//,"")).filter(Boolean).sort();this._geminiModels=s}catch(t){this._geminiModelsError=t?.message||String(t),this._geminiModels=void 0,console.warn("[bmw-status-card] Gemini ListModels fehlgeschlagen:",t)}finally{this._geminiModelsLoading=!1,this.requestUpdate()}}_onListChanged(t){const e=t.target,i=e?.dataset?.path;if(!i)return;const s=(e.value||"").split(",").map(t=>t.trim()).filter(Boolean);this._setConfigValue(i,s.length?s:void 0)}async _resolveDeviceIdFromEntity(t,e){if(this.hass)try{const i=await this.hass.callWS({type:"config/entity_registry/get",entity_id:t});i?.device_id&&this._setConfigValue(e,i.device_id)}catch(t){}}async _onEntityPicked(t){const e=t.target,i=t.detail?.value??e?.value,s=e?.dataset?.target;i&&s&&("bmw_home_device_id"===s?this._bmwHomeEntity=i:"bmw_cardata_device_id"===s&&(this._bmwCardataEntity=i),await this._resolveDeviceIdFromEntity(i,s))}render(){if(!this._config)return V``;const t=this._config.image?.mode||"off",e=this._config.image?.ai||{},i=e.provider||"ha_ai_task",s=!1!==e.generate_on_demand,n=e.upload??("openai"===i||"gemini"===i);try{return V`
        <div class="form">
          ${this._editorError?V`<div class="error">${this._editorError}</div>`:null}
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

          ${"static"===t?V`
                <ha-textarea
                  label="Statische Bild-URLs (kommagetrennt, optional)"
                  .value=${(this._config.image?.static_urls||[]).join(", ")}
                  data-path="image.static_urls"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Beispiel: https://.../front.jpg, https://.../rear.jpg</div>
              `:null}

          ${"ai"===t?V`
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
                  ${"openai"===i||"gemini"===i?V`
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
                  ${s?V`<div class="hint">Bilder werden nur nach Klick generiert (Cache aktiv).</div>`:V`<div class="hint">Auto-Generierung aktiv.</div>`}
                </div>
                ${"ha_ai_task"===i?V`
                      <div class="hint">Nutze Home Assistant ai_task.generate_image und erhalte Media-URLs.</div>
                      <ha-entity-picker
                        .hass=${this.hass}
                        .value=${e.ha_entity_id||""}
                        .includeEntities=${this._aiTaskEntities||[]}
                        data-path="image.ai.ha_entity_id"
                        @value-changed=${t=>this._onSelectChanged(t)}
                        label="ai_task Entity (optional)"
                        allow-custom-entity
                      ></ha-entity-picker>
                    `:null}
                ${"openai"===i||"gemini"===i?V`
                      <div class="row">
                        <div class="field">
                          <label class="hint">Bilder via upload_file speichern</label>
                          <ha-switch
                            .checked=${n}
                            data-path="image.ai.upload"
                            @change=${this._onToggleChanged}
                          ></ha-switch>
                        </div>
                        ${n?V`
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
                ${"generic"!==i?V`
                      <div class="row">
                        ${"gemini"===i&&this._geminiModels?.length?V`
                              <div class="field">
                                <label class="hint">Gemini Model (aus ListModels)</label>
                                <select
                                  data-path="image.ai.model"
                                  @change=${t=>this._onSelectChanged(t)}
                                  .value=${e.model||""}
                                >
                                  <option value="">Auto (Standard)</option>
                                  ${this._geminiModels.map(t=>V`<option value=${t}>${t}</option>`)}
                                </select>
                              </div>
                            `:"openai"===i&&this._openAiModels?.length?V`
                                <div class="field">
                                  <label class="hint">OpenAI Model (gefiltert)</label>
                                  <select
                                    data-path="image.ai.model"
                                    @change=${t=>this._onSelectChanged(t)}
                                    .value=${e.model||""}
                                  >
                                    <option value="">Auto (Standard)</option>
                                    ${this._openAiModels.map(t=>V`<option value=${t}>${t}</option>`)}
                                  </select>
                                </div>
                              `:V`
                                <ha-textfield
                                  label="AI Model (optional)"
                                  .value=${e.model||""}
                                  placeholder="OpenAI: gpt-image-1 | Gemini: imagen-3.0-generate-002"
                                  data-path="image.ai.model"
                                  @input=${this._onValueChanged}
                                ></ha-textfield>
                              `}
                        ${"openai"===i?V`
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
                    `:V`
                      <div class="row">
                        <ha-textfield
                          label="AI Endpoint (erforderlich)"
                          .value=${e.endpoint||""}
                          data-path="image.ai.endpoint"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      </div>
                    `}
                ${"gemini"===i&&this._geminiModelsLoading?V`<div class="hint">Lade Gemini-Modelle…</div>`:null}
                ${"gemini"===i&&this._geminiModelsError?V`<div class="hint">${this._geminiModelsError}</div>`:null}
                ${"openai"===i&&this._openAiModelsLoading?V`<div class="hint">Lade OpenAI-Modelle…</div>`:null}
                ${"openai"===i&&this._openAiModelsError?V`<div class="hint">${this._openAiModelsError}</div>`:null}
                <div class="row">
                  ${"gemini"===i?V`
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
      `}catch(t){return this._setEditorError(t),V`<div class="error">${this._editorError}</div>`}}}customElements.define(lt,ct),customElements.define("bmw-status-card-editor",pt),window.customCards=window.customCards||[],window.customCards.push({type:lt,name:"BMW Status Card",description:"Auto-Konfiguration für bmw_home + bmw-cardata-ha, basiert auf vehicle-status-card.",version:"0.1.19"});
//# sourceMappingURL=bmw-status-card.js.map
