/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},o=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,m=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??$)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[_("elementProperties")]=new Map,y[_("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,z=`<${C}>`,P=document,M=()=>P.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,T="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,O=/>/g,R=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),V=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),F=new WeakMap,K=P.createTreeWalker(P,129);function q(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",o=H;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===H?"!--"===l[1]?o=I:void 0!==l[1]?o=O:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=n??H,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?R:'"'===l[3]?D:L):o===D||o===L?o=R:o===I||o===O?o=H:(o=R,n=void 0);const h=o===R&&t[e+1].startsWith("/>")?" ":"";r+=o===H?i+z:d>=0?(s.push(a),i.slice(0,d)+k+i.slice(d)+S+h):i+S+(-2===d?e:h)}return[q(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,d]=G(t,e);if(this.el=Z.createElement(l,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(k)){const e=d[r++],i=s.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?tt:"?"===o[1]?et:"@"===o[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),K.nextNode(),a.push({type:2,index:++n});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:n}),t+=S.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===V)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=U(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=J(t,n._$AS(t,e.values),n,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);K.currentNode=s;let n=K.nextNode(),r=0,o=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Q(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=i[++o]}r!==a?.index&&(n=K.nextNode(),r++)}return K.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),U(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new Q(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=J(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==V,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=J(this,s[i+o],e,o),a===V&&(a=this._$AH[o]),r||=!U(a)||a!==this._$AH[o],a===W?t=W:t!==W&&(t+=(a??"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??W)===V)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(Z,Q),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ot extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new Q(e.insertBefore(M(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ot._$litElement$=!0,ot.finalized=!0,rt.litElementHydrateSupport?.({LitElement:ot});const at=rt.litElementPolyfillSupport;at?.({LitElement:ot}),(rt.litElementVersions??=[]).push("4.2.2");const lt="bmw-status-card";class dt extends ot{static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=r`
    :host { display: block; }
    ha-card { overflow: hidden; }
    .hero { position: relative; aspect-ratio: 1; background: #18211b; color: #fff; }
    .hero img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7, 16, 10, .82), rgba(7, 16, 10, .1) 72%); }
    .hero-copy { position: absolute; inset: 0; z-index: 1; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; }
    .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; opacity: .8; }
    h2 { margin: 4px 0 0; font-size: 24px; line-height: 1.1; letter-spacing: 0; }
    .subtitle { margin: 4px 0 0; font-size: 14px; opacity: .9; }
    .status { display: inline-flex; align-items: center; gap: 7px; width: fit-content; padding: 8px 12px; border: 1px solid rgba(255,255,255,.72); border-radius: 4px; background: rgba(8,18,12,.9); box-shadow: 0 2px 8px rgba(0,0,0,.42); color: #fff; font-size: 13px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,.65); }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #d8b25b; }
    .status-dot.driving { background: #59c887; }
    .content { padding: 14px; display: grid; gap: 12px; }
    .panel { border: 1px solid var(--divider-color); border-radius: 7px; overflow: hidden; background: var(--card-background-color); }
    .panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 11px; border-bottom: 1px solid var(--divider-color); background: var(--secondary-background-color); color: var(--primary-text-color); font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; }
    .panel-heading::before { content: ''; width: 4px; height: 15px; background: var(--primary-color, #007a3d); }
    .panel-heading span { flex: 1; }
    .panel-body { padding: 11px; }
    .metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: var(--divider-color); }
    .metric { min-width: 0; padding: 11px; border: 0; background: var(--card-background-color); color: inherit; font: inherit; text-align: left; cursor: pointer; }
    .metric:hover, .metric:focus-visible, .summary-item:hover, .summary-item:focus-visible, .wheel:hover, .wheel:focus-visible { outline: 2px solid var(--primary-color, #007a3d); outline-offset: -2px; }
    .metric-name { color: var(--secondary-text-color); font-size: 12px; }
    .metric-value { margin-top: 3px; color: var(--primary-text-color); font-size: 18px; font-weight: 700; overflow-wrap: anywhere; }
    .badges { display: flex; flex-wrap: wrap; gap: 7px; }
    .badge { padding: 5px 8px; border: 1px solid #c88a21; border-radius: 3px; background: #fff7df; color: #604100; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }
    .badge.alert { border-color: #bc3030; background: #fff0f0; color: #8a1f1f; }
    .summary { padding: 11px; display: grid; gap: 8px; }
    .summary-status { border: 0; padding: 0; background: transparent; color: var(--primary-text-color); font: inherit; font-size: 14px; font-weight: 700; text-align: left; cursor: pointer; }
    .summary-detail { color: var(--secondary-text-color); font-size: 13px; line-height: 1.4; }
    .fuel-periods { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
    .fuel-period { min-width: 0; }
    .fuel-period h3 { margin: 0 0 6px; font-size: 13px; color: var(--primary-text-color); }
    .fuel-value { color: var(--primary-text-color); font-size: 17px; font-weight: 700; overflow-wrap: anywhere; }
    .fuel-note { margin: 10px 0 0; }
    @media (max-width: 360px) { .fuel-periods { grid-template-columns: 1fr; } }
    .summary-items { display: flex; flex-wrap: wrap; gap: 6px; }
    .summary-item { padding: 5px 7px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--secondary-text-color); font: inherit; font-size: 12px; text-align: left; cursor: pointer; }
    .summary-item strong { color: var(--primary-text-color); }
    .tire-board { position: relative; aspect-ratio: 1; margin: 12px; overflow: hidden; border: 1px solid var(--divider-color); background: #f6f6f4; }
    .car-top { position: absolute; top: 18px; bottom: 18px; left: 50%; width: 34%; min-width: 104px; transform: translateX(-50%); border: 2px solid var(--primary-text-color); border-radius: 44% 44% 30% 30%; background: var(--card-background-color); }
    .tire-vehicle-image { position: absolute; inset: 0; box-sizing: border-box; width: 100%; height: 100%; padding: 7px; object-fit: contain; object-position: center; }
    .car-top::before { content: ''; position: absolute; top: 20%; left: 13%; width: 74%; height: 38%; border: 1px solid var(--divider-color); border-radius: 40% 40% 14% 14%; background: var(--secondary-background-color); }
    .car-top::after { content: 'Vorne'; position: absolute; top: 7px; left: 50%; transform: translateX(-50%); color: var(--secondary-text-color); font-size: 11px; font-weight: 700; }
    .wheel { position: absolute; width: 34%; max-width: 172px; padding: 5px 6px; border: 1px solid rgba(32, 42, 34, .24); border-left: 4px solid var(--primary-color, #007a3d); border-radius: 4px; background: rgba(255,255,255,.92); box-shadow: 0 1px 5px rgba(0,0,0,.18); color: #1d251f; font: inherit; font-size: 12px; text-align: left; box-sizing: border-box; cursor: pointer; }
    .wheel.warning { border-left-color: #c88716; } .wheel.alert { border-left-color: #bb3030; }
    .wheel-position { display: block; color: #58625a; font-size: 10px; font-weight: 700; }
    .wheel-value { display: grid; gap: 2px; margin-top: 3px; }
    .wheel-value span { display: flex; align-items: baseline; justify-content: space-between; gap: 2px; font-size: 9px; color: #58625a; }
    .wheel-value strong { color: #1d251f; font-size: 11px; white-space: nowrap; }
    .pressure-state { margin-top: 3px; font-size: 9px; font-weight: 700; color: #237047; }
    .wheel.warning .pressure-state { color: #8b5b00; } .wheel.alert .pressure-state { color: #a52323; }
    .front-left { top: 8px; left: 7px; } .front-right { top: 8px; right: 7px; } .rear-left { bottom: 8px; left: 7px; } .rear-right { bottom: 8px; right: 7px; }
    .map-unavailable { padding: 12px; color: var(--secondary-text-color); font-size: 13px; line-height: 1.4; }
    .message { padding: 16px; color: var(--secondary-text-color); }
    .error { color: var(--error-color, #b3261e); }
    @media (min-width: 520px) { .metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); } .group-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } }
  `}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t?.entity)throw new Error("entity ist erforderlich und muss auf sensor.status verweisen.");this._config=t}getCardSize(){return 6}static getStubConfig(){return{type:`custom:${lt}`,entity:"sensor.status"}}static getConfigElement(){return document.createElement("bmw-status-card-editor")}_presentation(){const t=this._config&&this.hass?.states[this._config.entity],e=t?.attributes.presentation;return e&&"object"==typeof e?e:void 0}_entity(t){const e=this._presentation()?.entities?.[t];return e||void 0}_value(t){if(t&&!this._isUnavailable(t.state))return`${t.state}${t.unit?` ${t.unit}`:""}`}_isUnavailable(t){return!t||["unknown","unavailable","none"].includes(t.toLowerCase())}_metric(t,e){const i=this._value(e);return i?B`<button class="metric" @click=${()=>this._openMoreInfo(e)}><div class="metric-name">${t}</div><div class="metric-value">${i}</div></button>`:W}_openMoreInfo(t){t?.entity_id&&this._openEntityId(t.entity_id)}_fuelValue(t,e){return null!==t&&Number.isFinite(t)?`${t.toLocaleString("de-DE",{maximumFractionDigits:2})} ${e}`:"Unbekannt"}_fuelConsumption(t){if(!t)return W;const e={missing_tank_capacity:"Tankinhalt in den Integrationsoptionen ergänzen.",missing_initial_total:"Anfangsverbrauch für den Lebenszeit-Gesamtwert in den Integrationsoptionen ergänzen.",fuel_unavailable:"Tankstand ist nicht verfügbar oder ungültig.",odometer_unavailable:"Kilometerstand ist nicht verfügbar oder ungültig.",unsupported_fuel_unit:"Der Tankstand-Sensor muss L oder % liefern.",unsupported_distance_unit:"Der Kilometerstand-Sensor muss km oder mi liefern.",odometer_decreased:"Rückläufiger Kilometerstand: Distanzwert wurde nicht übernommen.",source_changed:"Messquelle oder Tankinhalt geändert; Messreferenz wurde neu gesetzt."},i=[["Gesamt (Lebenszeit)",t.total],["Seit letztem Tanken",t.since_refuel],["Heute",t.today]];return B`
      <section class="panel">
        <div class="panel-heading"><span>Spritverbrauch · geschätzt</span></div>
        <div class="panel-body">
          <div class="fuel-periods">
            ${i.map(([t,e])=>B`
              <div class="fuel-period">
                <h3>${t}</h3>
                <div class="fuel-value">${this._fuelValue(e.liters,"L")}</div>
                <div class="summary-detail">${this._fuelValue(e.distance_km,"km")}</div>
                <div class="summary-detail">${this._fuelValue(e.average_l_per_100km,"l/100 km")}</div>
                ${e.incomplete?B`<div class="summary-detail">Zeitraum unvollständig</div>`:W}
              </div>
            `)}
          </div>
          ${t.started_at?B`<p class="summary-detail fuel-note">Erfassung seit ${new Date(t.started_at).toLocaleString("de-DE")}</p>`:W}
          ${t.last_refuel_at?B`<p class="summary-detail fuel-note">Letztes Tanken erkannt: ${new Date(t.last_refuel_at).toLocaleString("de-DE")} · ca. ${this._fuelValue(t.last_refuel_liters,"L")} nachgefüllt</p>`:B`<p class="summary-detail fuel-note">Noch kein Tanken erkannt. Das Tankintervall beginnt mit den konfigurierten Anfangswerten oder dem Erfassungsbeginn.</p>`}
          ${t.issues.map(t=>B`<p class="summary-detail fuel-note" role="status">${e[t]||t}</p>`)}
        </div>
      </section>
    `}_openEntityId(t){t&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}_label(t){return t.label||t.name}_isOpen(t){const e=t.state.toLowerCase();return["on","open","open_tilt","tilt","unlocked"].includes(e)||e.includes("open")}_summary(t,e,i=3){const s=(e||[]).filter(t=>!this._isUnavailable(t.state));return s.length?B`
      <section class="panel">
        <div class="panel-heading"><span>${t}</span></div>
        <div class="summary">
          <button class="summary-status" @click=${()=>this._openMoreInfo(s[0])}>${t}</button>
          <div class="summary-items">
            ${s.slice(0,i).map(t=>B`<button class="summary-item" @click=${()=>this._openMoreInfo(t)}><strong>${this._label(t)}</strong> ${this._value(t)}</button>`)}
            ${s.length>i?B`<span class="summary-item">Weitere Werte sind in Home Assistant verfügbar</span>`:W}
          </div>
        </div>
      </section>
    `:W}_openingKey(t){const e=`${t.entity_id} ${t.name}`.toLowerCase();return e.includes("sunroof")?"sunroof":e.includes("tailgate")||e.includes("trunk")?"tailgate":e.includes("hood")?"hood":e.includes("front")&&e.includes("driver")?"front-driver":e.includes("front")&&e.includes("passenger")?"front-passenger":e.includes("rear")&&e.includes("driver")?"rear-driver":e.includes("rear")&&e.includes("passenger")?"rear-passenger":t.entity_id}_openings(t){const e=(t||[]).filter(t=>!this._isUnavailable(t.state));if(!e.length)return W;const i=new Map;e.filter(t=>this._isOpen(t)).forEach(t=>i.set(this._openingKey(t),t));const s=[...i.values()];return B`
      <section class="panel">
        <div class="panel-heading"><span>Öffnungen</span></div>
        <div class="summary">
          <button class="summary-status" @click=${()=>this._openMoreInfo(s[0]||e[0])}>${s.length?"Geöffnet":"Alles geschlossen"}</button>
          <div class="summary-detail">${s.length?s.map(t=>this._label(t)).join(", "):"Türen, Fenster, Motorhaube und Heckklappe sind geschlossen."}</div>
        </div>
      </section>
    `}_climate(t){const e=(t||[]).filter(t=>!this._isUnavailable(t.state));if(!e.length)return W;const i=e.filter(t=>["on","active","running","heating","cooling"].includes(t.state.toLowerCase())),s=e.find(t=>/next.*state|timer.*next/i.test(`${t.entity_id} ${t.name}`)),n=i.length?"Klimatisierung aktiv":"Klimatisierung aus",r=i.length?i.map(t=>this._label(t)).join(", "):s?`${this._label(s)}: ${this._value(s)}`:"Keine Vorklimatisierung geplant.";return B`<section class="panel"><div class="panel-heading"><span>Klima</span></div><div class="summary"><button class="summary-status" @click=${()=>this._openMoreInfo(i[0]||s||e[0])}>${n}</button><div class="summary-detail">${r}</div></div></section>`}_tirePosition(t){if(t.position)return t.position;const e=`${t.name} ${t.entity_id}`.toLowerCase();return`${e.includes("front")?"Vorne":e.includes("rear")?"Hinten":""} ${e.includes("left")?"links":e.includes("right")?"rechts":""}`.trim()||"Unbekannt"}_tireClass(t){const e=t.toLowerCase(),i=e.includes("vorne")?"front":e.includes("hinten")?"rear":"",s=e.includes("links")?"left":e.includes("rechts")?"right":"";return i&&s?`${i}-${s}`:""}_pressureState(t,e){const i=Number.parseFloat(t.state),s=e?Number.parseFloat(e.state):Number.NaN;if(!Number.isFinite(i)||!Number.isFinite(s))return{level:"",label:"Sollwert nicht verfügbar"};const n=Math.abs(i-s);return n>=40?{level:"alert",label:`${n} kPa Abweichung`}:n>=20?{level:"warning",label:`${n} kPa Abweichung`}:{level:"",label:"Druck im Sollbereich"}}_tires(t,e){const i=(t||[]).filter(t=>!this._isUnavailable(t.state)),s=i.filter(t=>"actual"===t.role||!t.role&&!/target|soll/i.test(`${t.name} ${t.entity_id}`));if(!s.length)return W;const n=i.filter(t=>"target"===t.role||!t.role&&/target|soll/i.test(`${t.name} ${t.entity_id}`)),r=new Map(n.map(t=>[this._tirePosition(t),t]));return B`
      <section class="panel">
        <div class="panel-heading"><span>Reifendruck</span></div>
        <div class="tire-board">
          ${e?B`<img class="tire-vehicle-image" src=${e} alt="Fahrzeug von oben" />`:B`<div class="car-top"></div>`}
          ${s.map(t=>{const e=this._tirePosition(t),i=r.get(e),s=this._pressureState(t,i);return B`<button class="wheel ${this._tireClass(e)} ${s.level}" @click=${()=>this._openMoreInfo(t)}>
              <span class="wheel-position">${e}</span>
              <div class="wheel-value">
                <span>Ist<strong>${this._value(t)||"-"}</strong></span>
                <span>Soll<strong>${this._value(i)||"-"}</strong></span>
              </div>
              <div class="pressure-state">${s.label}</div>
            </button>`})}
        </div>
      </section>
    `}render(){if(!this._config||!this.hass)return W;if(!this.hass.states[this._config.entity])return B`<ha-card><div class="message error">${this._config.entity} wurde nicht gefunden.</div></ha-card>`;const t=this._presentation();if(!t)return B`<ha-card><div class="message">Die BMW-Statusdaten werden noch geladen.</div></ha-card>`;const e=t.vehicle||{},i=t.status||{},s=t.images?.[0],n=e.name||[e.manufacturer,e.model].filter(Boolean).join(" ")||"BMW",r=[e.model,e.license_plate].filter(Boolean).join(" · "),o=this._entity("device_tracker")?.entity_id,a=i.key||"unknown",l="string"==typeof i.entity_id?i.entity_id:void 0;return B`
      <ha-card>
        <div class="hero">
          ${s?B`<img src=${s} alt=${n} />`:W}
          <div class="hero-copy">
            <div><div class="eyebrow">${t.electrification?.toUpperCase()||"BMW"}</div><h2>${n}</h2>${r?B`<p class="subtitle">${r}</p>`:W}</div>
            <button class="status" @click=${()=>this._openEntityId(l)}><span class="status-dot ${a}"></span>${i.label||"Unbekannt"}</button>
          </div>
        </div>
        <div class="content">
          <section class="panel">
            <div class="panel-heading"><span>Energie & Fahrzeug</span></div>
            <div class="metrics">
              ${this._metric("Ladezustand",this._entity("battery_charge"))}
              ${"mhev"===t.electrification?this._metric("Mildhybrid-Batterie",this._entity("mild_hybrid_battery_charge")):W}
              ${this._metric("Tank",this._entity("fuel"))}
              ${this._metric("Elektrische Reichweite",this._entity("electric_range"))}
              ${this._metric("Reichweite",this._entity("total_range"))}
              ${this._metric("Kilometerstand",this._entity("odometer"))}
              ${this._metric("Laden",this._entity("charging"))}
              ${this._metric("Verriegelung",this._entity("lock"))}
              ${this._metric("Höhe über NN",this._entity("altitude"))}
            </div>
          </section>
          ${this._fuelConsumption(t.fuel_consumption)}
          ${(t.badges||[]).length?B`<section class="panel"><div class="panel-heading"><span>Hinweise</span></div><div class="panel-body"><div class="badges">${t.badges?.map(t=>B`<button class="badge ${t.level}" @click=${()=>this._openEntityId(t.entity_id)}>${t.label}</button>`)}</div></div></section>`:W}
          <section class="panel">
            <div class="panel-heading"><span>Fahrzeugposition</span></div>
            ${o?B`<bmw-status-location-map .hass=${this.hass} .entityId=${o}></bmw-status-location-map>`:B`<div class="map-unavailable">Die Fahrzeugposition ist nicht verfügbar.</div>`}
          </section>
          ${this._tires(t.groups?.tires,t.tire_image)}
          <div class="group-grid">
            ${this._openings(t.groups?.doors)}
            ${this._summary("Service",t.groups?.service,2)}
            ${this._climate(t.groups?.climate)}
          </div>
        </div>
      </ha-card>
    `}}class ct extends ot{static{this.properties={hass:{attribute:!1},entityId:{attribute:!1}}}static{this.styles=r`
    :host { display: block; }
  `}async updated(){if(this.entityId&&this.hass){if(!this._mapCard){const t=window.loadCardHelpers;if(!t)return;const e=this.entityId,i=await t();if(this._mapCard||this.entityId!==e)return;this._mapCard=await i.createCardElement({type:"map",entities:[{entity:e}],theme_mode:"auto"}),this._configuredEntityId=e,this.renderRoot.append(this._mapCard)}this._configuredEntityId!==this.entityId&&(this._mapCard.setConfig({type:"map",entities:[{entity:this.entityId}],theme_mode:"auto"}),this._configuredEntityId=this.entityId),this._mapCard.hass=this.hass}}}class ht extends ot{static{this.properties={hass:{attribute:!1},_config:{state:!0}}}static{this.styles=r`
    :host { display: block; padding: 12px; }
    .fields { display: grid; gap: 14px; }
    label { display: grid; gap: 6px; color: var(--primary-text-color); font-size: 14px; }
    input { box-sizing: border-box; width: 100%; padding: 9px; border: 1px solid var(--divider-color); border-radius: 4px; color: var(--primary-text-color); background: var(--card-background-color); font: inherit; }
  `}setConfig(t){this._config=t}_onInput(t){const e=t.target,i=e.dataset.key,s=e.value.trim(),n={...this._config||{type:`custom:${lt}`,entity:"sensor.status"}};s?n[i]=s:delete n[i],this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){const t=this._config||{entity:"sensor.status"};return B`
      <div class="fields">
        <label>BMW-Status-Sensor<input data-key="entity" .value=${t.entity||""} @input=${this._onInput} placeholder="sensor.status" /></label>
      </div>
    `}}customElements.define(lt,dt),customElements.define("bmw-status-card-editor",ht),customElements.define("bmw-status-location-map",ct),window.customCards=window.customCards||[],window.customCards.push({type:lt,name:"BMW Status Card",description:"Rendert die versionierte Präsentation von bmw_status.",version:"0.3.0"});
//# sourceMappingURL=bmw-status-card.js.map
