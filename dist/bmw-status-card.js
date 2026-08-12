/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(i,t,s)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,f=g?g.emptyScript:"",m=u.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},_=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:_};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);r?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const s=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{if(e)s.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}})(s,this.constructor.elementStyles),s}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=i;const n=r.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const n=this.constructor;if(!1===i&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??_)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[v("elementProperties")]=new Map,y[v("finalized")]=new Map,m?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,U=document,z=()=>U.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,N="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,R=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,K=U.createTreeWalker(U,129);function q(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=O;for(let e=0;e<s;e++){const s=t[e];let a,l,c=-1,d=0;for(;d<s.length&&(o.lastIndex=d,l=o.exec(s),null!==l);)d=o.lastIndex,o===O?"!--"===l[1]?o=T:void 0!==l[1]?o=R:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=j):void 0!==l[3]&&(o=j):o===j?">"===l[0]?(o=r??O,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?j:'"'===l[3]?B:L):o===B||o===L?o=j:o===T||o===R?o=O:(o=j,r=void 0);const h=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===O?s+P:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+k+h):s+k+(-2===c?e:h)}return[q(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[l,c]=J(t,e);if(this.el=X.createElement(l,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=c[n++],s=i.getAttribute(t).split(k),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:s,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?st:Y}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],z()),K.nextNode(),a.push({type:2,index:++r});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function Z(t,e,s=t,i){if(e===W)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=M(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,i)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);K.currentNode=i;let r=K.nextNode(),n=0,o=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new it(r,this,t)),this._$AV.push(e),a=s[++o]}n!==a?.index&&(r=K.nextNode(),n++)}return K.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),M(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=X.createElement(q(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new G(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new X(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new Q(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=F}_$AI(t,e=this,s,i){const r=this.strings;let n=!1;if(void 0===r)t=Z(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=Z(this,i[s+o],e,o),a===W&&(a=this._$AH[o]),n||=!M(a)||a!==this._$AH[o],a===F?t=F:t!==F&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class st extends Y{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===W)return;const s=this._$AH,i=t===F&&s!==F||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==F&&(s===F||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(X,Q),(x.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new Q(e.insertBefore(z(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ot._$litElement$=!0,ot.finalized=!0,nt.litElementHydrateSupport?.({LitElement:ot});const at=nt.litElementPolyfillSupport;at?.({LitElement:ot}),(nt.litElementVersions??=[]).push("4.2.2");const lt="bmw-status-card";class ct extends ot{static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=n`
    :host { display: block; }
    ha-card { overflow: hidden; }
    .hero { position: relative; min-height: 218px; background: #18211b; color: #fff; }
    .hero img { width: 100%; height: 206px; object-fit: cover; display: block; }
    .hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7, 16, 10, .82), rgba(7, 16, 10, .1) 72%); }
    .hero-copy { position: absolute; inset: 0; z-index: 1; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; }
    .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; opacity: .8; }
    h2 { margin: 4px 0 0; font-size: 24px; line-height: 1.1; letter-spacing: 0; }
    .subtitle { margin: 4px 0 0; font-size: 14px; opacity: .9; }
    .status { display: inline-flex; align-items: center; gap: 7px; width: fit-content; padding: 7px 10px; border: 1px solid rgba(255,255,255,.35); background: rgba(0,0,0,.38); font-size: 13px; font-weight: 700; }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #d8b25b; }
    .status-dot.driving { background: #59c887; }
    .content { padding: 14px; display: grid; gap: 12px; }
    .panel { border: 1px solid var(--divider-color); border-radius: 7px; overflow: hidden; background: var(--card-background-color); }
    .panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 11px; border-bottom: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; }
    .panel-heading::before { content: ''; width: 4px; height: 15px; background: var(--primary-color, #007a3d); }
    .panel-heading span { flex: 1; }
    .panel-body { padding: 11px; }
    .metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: var(--divider-color); }
    .metric { min-width: 0; padding: 11px; background: var(--card-background-color); }
    .metric-name { color: var(--secondary-text-color); font-size: 12px; }
    .metric-value { margin-top: 3px; color: var(--primary-text-color); font-size: 18px; font-weight: 700; overflow-wrap: anywhere; }
    .badges { display: flex; flex-wrap: wrap; gap: 7px; }
    .badge { padding: 5px 8px; border: 1px solid #c88a21; border-radius: 3px; background: #fff7df; color: #604100; font-size: 12px; font-weight: 700; }
    .badge.alert { border-color: #bc3030; background: #fff0f0; color: #8a1f1f; }
    .summary { padding: 11px; display: grid; gap: 8px; }
    .summary-status { color: var(--primary-text-color); font-size: 14px; font-weight: 700; }
    .summary-detail { color: var(--secondary-text-color); font-size: 13px; line-height: 1.4; }
    .summary-items { display: flex; flex-wrap: wrap; gap: 6px; }
    .summary-item { padding: 5px 7px; border: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
    .summary-item strong { color: var(--primary-text-color); }
    .tire-board { position: relative; aspect-ratio: 1; margin: 12px; overflow: hidden; border: 1px solid var(--divider-color); background: #f6f6f4; }
    .car-top { position: absolute; top: 18px; bottom: 18px; left: 50%; width: 34%; min-width: 104px; transform: translateX(-50%); border: 2px solid var(--primary-text-color); border-radius: 44% 44% 30% 30%; background: var(--card-background-color); }
    .tire-vehicle-image { position: absolute; inset: 0; box-sizing: border-box; width: 100%; height: 100%; padding: 7px; object-fit: contain; object-position: center; }
    .car-top::before { content: ''; position: absolute; top: 20%; left: 13%; width: 74%; height: 38%; border: 1px solid var(--divider-color); border-radius: 40% 40% 14% 14%; background: var(--secondary-background-color); }
    .car-top::after { content: 'Vorne'; position: absolute; top: 7px; left: 50%; transform: translateX(-50%); color: var(--secondary-text-color); font-size: 11px; font-weight: 700; }
    .wheel { position: absolute; width: 34%; max-width: 172px; padding: 5px 6px; border: 1px solid rgba(32, 42, 34, .24); border-left: 4px solid var(--primary-color, #007a3d); border-radius: 4px; background: rgba(255,255,255,.92); box-shadow: 0 1px 5px rgba(0,0,0,.18); color: #1d251f; font-size: 12px; box-sizing: border-box; }
    .wheel.warning { border-left-color: #c88716; } .wheel.alert { border-left-color: #bb3030; }
    .wheel-position { display: block; color: #58625a; font-size: 10px; font-weight: 700; }
    .wheel-value { display: grid; gap: 2px; margin-top: 3px; }
    .wheel-value span { display: flex; align-items: baseline; justify-content: space-between; gap: 2px; font-size: 9px; color: #58625a; }
    .wheel-value strong { color: #1d251f; font-size: 11px; white-space: nowrap; }
    .pressure-state { margin-top: 3px; font-size: 9px; font-weight: 700; color: #237047; }
    .wheel.warning .pressure-state { color: #8b5b00; } .wheel.alert .pressure-state { color: #a52323; }
    .front-left { top: 8px; left: 7px; } .front-right { top: 8px; right: 7px; } .rear-left { bottom: 8px; left: 7px; } .rear-right { bottom: 8px; right: 7px; }
    .map-wrap { position: relative; background: var(--secondary-background-color); }
    .map { width: 100%; aspect-ratio: 16 / 7; object-fit: cover; border: 0; display: block; }
    .map-marker { position: absolute; top: 50%; left: 50%; width: 18px; height: 18px; transform: translate(-50%, -50%); border: 3px solid #fff; border-radius: 50% 50% 50% 0; background: #c12828; box-shadow: 0 1px 5px rgba(0,0,0,.45); rotate: -45deg; }
    .map-unavailable { padding: 12px; color: var(--secondary-text-color); font-size: 13px; line-height: 1.4; }
    .message { padding: 16px; color: var(--secondary-text-color); }
    .error { color: var(--error-color, #b3261e); }
    @media (min-width: 520px) { .metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); } .group-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } }
  `}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t?.entity)throw new Error("entity ist erforderlich und muss auf sensor.status verweisen.");this._config=t}getCardSize(){return 6}static getStubConfig(){return{type:`custom:${lt}`,entity:"sensor.status"}}static getConfigElement(){return document.createElement("bmw-status-card-editor")}_presentation(){const t=this._config&&this.hass?.states[this._config.entity],e=t?.attributes.presentation;return e&&"object"==typeof e?e:void 0}_entity(t){const e=this._presentation()?.entities?.[t];return e||void 0}_value(t){if(t&&!this._isUnavailable(t.state))return`${t.state}${t.unit?` ${t.unit}`:""}`}_isUnavailable(t){return!t||["unknown","unavailable","none"].includes(t.toLowerCase())}_metric(t,e){const s=this._value(e);return s?I`<div class="metric"><div class="metric-name">${t}</div><div class="metric-value">${s}</div></div>`:F}_label(t){return t.label||t.name}_isOpen(t){const e=t.state.toLowerCase();return["on","open","open_tilt","tilt","unlocked"].includes(e)||e.includes("open")}_summary(t,e,s=3){const i=(e||[]).filter(t=>!this._isUnavailable(t.state));return i.length?I`
      <section class="panel">
        <div class="panel-heading"><span>${t}</span></div>
        <div class="summary">
          <div class="summary-status">${t}</div>
          <div class="summary-items">
            ${i.slice(0,s).map(t=>I`<span class="summary-item"><strong>${this._label(t)}</strong> ${this._value(t)}</span>`)}
            ${i.length>s?I`<span class="summary-item">Weitere Werte sind in Home Assistant verfügbar</span>`:F}
          </div>
        </div>
      </section>
    `:F}_openingKey(t){const e=`${t.entity_id} ${t.name}`.toLowerCase();return e.includes("sunroof")?"sunroof":e.includes("tailgate")||e.includes("trunk")?"tailgate":e.includes("hood")?"hood":e.includes("front")&&e.includes("driver")?"front-driver":e.includes("front")&&e.includes("passenger")?"front-passenger":e.includes("rear")&&e.includes("driver")?"rear-driver":e.includes("rear")&&e.includes("passenger")?"rear-passenger":t.entity_id}_openings(t){const e=(t||[]).filter(t=>!this._isUnavailable(t.state));if(!e.length)return F;const s=new Map;e.filter(t=>this._isOpen(t)).forEach(t=>s.set(this._openingKey(t),t));const i=[...s.values()];return I`
      <section class="panel">
        <div class="panel-heading"><span>Öffnungen</span></div>
        <div class="summary">
          <div class="summary-status">${i.length?"Geöffnet":"Alles geschlossen"}</div>
          <div class="summary-detail">${i.length?i.map(t=>this._label(t)).join(", "):"Türen, Fenster, Motorhaube und Heckklappe sind geschlossen."}</div>
        </div>
      </section>
    `}_climate(t){const e=(t||[]).filter(t=>!this._isUnavailable(t.state));if(!e.length)return F;const s=e.filter(t=>["on","active","running","heating","cooling"].includes(t.state.toLowerCase())),i=e.find(t=>/next.*state|timer.*next/i.test(`${t.entity_id} ${t.name}`)),r=s.length?"Klimatisierung aktiv":"Klimatisierung aus",n=s.length?s.map(t=>this._label(t)).join(", "):i?`${this._label(i)}: ${this._value(i)}`:"Keine Vorklimatisierung geplant.";return I`<section class="panel"><div class="panel-heading"><span>Klima</span></div><div class="summary"><div class="summary-status">${r}</div><div class="summary-detail">${n}</div></div></section>`}_tirePosition(t){if(t.position)return t.position;const e=`${t.name} ${t.entity_id}`.toLowerCase();return`${e.includes("front")?"Vorne":e.includes("rear")?"Hinten":""} ${e.includes("left")?"links":e.includes("right")?"rechts":""}`.trim()||"Unbekannt"}_tireClass(t){const e=t.toLowerCase(),s=e.includes("vorne")?"front":e.includes("hinten")?"rear":"",i=e.includes("links")?"left":e.includes("rechts")?"right":"";return s&&i?`${s}-${i}`:""}_pressureState(t,e){const s=Number.parseFloat(t.state),i=e?Number.parseFloat(e.state):Number.NaN;if(!Number.isFinite(s)||!Number.isFinite(i))return{level:"",label:"Sollwert nicht verfügbar"};const r=Math.abs(s-i);return r>=40?{level:"alert",label:`${r} kPa Abweichung`}:r>=20?{level:"warning",label:`${r} kPa Abweichung`}:{level:"",label:"Druck im Sollbereich"}}_tires(t,e){const s=(t||[]).filter(t=>!this._isUnavailable(t.state)),i=s.filter(t=>"actual"===t.role||!t.role&&!/target|soll/i.test(`${t.name} ${t.entity_id}`));if(!i.length)return F;const r=s.filter(t=>"target"===t.role||!t.role&&/target|soll/i.test(`${t.name} ${t.entity_id}`)),n=new Map(r.map(t=>[this._tirePosition(t),t]));return I`
      <section class="panel">
        <div class="panel-heading"><span>Reifendruck</span></div>
        <div class="tire-board">
          ${e?I`<img class="tire-vehicle-image" src=${e} alt="Fahrzeug von oben" />`:I`<div class="car-top"></div>`}
          ${i.map(t=>{const e=this._tirePosition(t),s=n.get(e),i=this._pressureState(t,s);return I`<div class="wheel ${this._tireClass(e)} ${i.level}">
              <span class="wheel-position">${e}</span>
              <div class="wheel-value">
                <span>Ist<strong>${this._value(t)||"-"}</strong></span>
                <span>Soll<strong>${this._value(s)||"-"}</strong></span>
              </div>
              <div class="pressure-state">${i.label}</div>
            </div>`})}
        </div>
      </section>
    `}render(){if(!this._config||!this.hass)return F;if(!this.hass.states[this._config.entity])return I`<ha-card><div class="message error">${this._config.entity} wurde nicht gefunden.</div></ha-card>`;const t=this._presentation();if(!t)return I`<ha-card><div class="message">Die BMW-Statusdaten werden noch geladen.</div></ha-card>`;const e=t.vehicle||{},s=t.status||{},i=t.images?.[0],r=e.name||[e.manufacturer,e.model].filter(Boolean).join(" ")||"BMW",n=[e.model,e.license_plate].filter(Boolean).join(" · "),o=t.location_image,a=s.key||"unknown";return I`
      <ha-card>
        <div class="hero">
          ${i?I`<img src=${i} alt=${r} />`:F}
          <div class="hero-copy">
            <div><div class="eyebrow">${t.electrification?.toUpperCase()||"BMW"}</div><h2>${r}</h2>${n?I`<p class="subtitle">${n}</p>`:F}</div>
            <div class="status"><span class="status-dot ${a}"></span>${s.label||"Unbekannt"}</div>
          </div>
        </div>
        <div class="content">
          <section class="panel">
            <div class="panel-heading"><span>Energie & Fahrzeug</span></div>
            <div class="metrics">
              ${this._metric("Ladezustand",this._entity("battery_charge"))}
              ${this._metric("Tank",this._entity("fuel"))}
              ${this._metric("Elektrische Reichweite",this._entity("electric_range"))}
              ${this._metric("Reichweite",this._entity("total_range"))}
              ${this._metric("Kilometerstand",this._entity("odometer"))}
              ${this._metric("Laden",this._entity("charging"))}
              ${this._metric("Verriegelung",this._entity("lock"))}
            </div>
          </section>
          ${(t.badges||[]).length?I`<section class="panel"><div class="panel-heading"><span>Hinweise</span></div><div class="panel-body"><div class="badges">${t.badges?.map(t=>I`<span class="badge ${t.level}">${t.label}</span>`)}</div></div></section>`:F}
          <section class="panel">
            <div class="panel-heading"><span>Fahrzeugposition</span></div>
            ${o?I`<div class="map-wrap"><img class="map" src=${o} alt="Fahrzeugposition" /><span class="map-marker" aria-label="Fahrzeugposition"></span></div>`:I`<div class="map-unavailable">Die Positionskarte wird vorbereitet.</div>`}
          </section>
          ${this._tires(t.groups?.tires,t.tire_image)}
          <div class="group-grid">
            ${this._openings(t.groups?.doors)}
            ${this._summary("Service",t.groups?.service,2)}
            ${this._climate(t.groups?.climate)}
          </div>
        </div>
      </ha-card>
    `}}class dt extends ot{static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=n`
    :host { display: block; padding: 12px; }
    .fields { display: grid; gap: 14px; }
    label { display: grid; gap: 6px; color: var(--primary-text-color); font-size: 14px; }
    input { box-sizing: border-box; width: 100%; padding: 9px; border: 1px solid var(--divider-color); border-radius: 4px; color: var(--primary-text-color); background: var(--card-background-color); font: inherit; }
  `}setConfig(t){this._config=t}_onInput(t){const e=t.target,s=e.dataset.key,i=e.value.trim(),r={...this._config||{type:`custom:${lt}`,entity:"sensor.status"}};i?r[s]=i:delete r[s],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:r},bubbles:!0,composed:!0}))}render(){const t=this._config||{entity:"sensor.status"};return I`
      <div class="fields">
        <label>BMW-Status-Sensor<input data-key="entity" .value=${t.entity||""} @input=${this._onInput} placeholder="sensor.status" /></label>
      </div>
    `}}customElements.define(lt,ct),customElements.define("bmw-status-card-editor",dt),window.customCards=window.customCards||[],window.customCards.push({type:lt,name:"BMW Status Card",description:"Rendert die versionierte Präsentation von bmw_status.",version:"0.2.4"});
//# sourceMappingURL=bmw-status-card.js.map
