import { LitElement, css, html, nothing } from 'lit';

const CARD_NAME = 'bmw-status-card';
const VERSION = '0.2.1';

type HassState = {
  state: string;
  attributes: Record<string, unknown>;
};

type HomeAssistant = {
  states: Record<string, HassState>;
};

type EntityData = {
  entity_id: string;
  name: string;
  state: string;
  unit?: string;
};

type Badge = {
  key: string;
  label: string;
  level: 'warning' | 'alert' | string;
};

type Presentation = {
  vehicle?: {
    name?: string | null;
    manufacturer?: string | null;
    model?: string | null;
    license_plate?: string | null;
  };
  status?: {
    key?: string;
    label?: string | null;
  };
  electrification?: string;
  entities?: Record<string, EntityData | null | undefined>;
  groups?: Record<string, EntityData[] | undefined>;
  badges?: Badge[];
  images?: string[];
};

type BMWStatusCardConfig = {
  type: string;
  entity: string;
  maptiler_api_key?: string;
  maptiler_style?: string;
};

class BMWStatusCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true }
  };

  private _hass?: HomeAssistant;
  private _config?: BMWStatusCardConfig;

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; }
    .hero { position: relative; min-height: 206px; background: #18211b; color: #fff; }
    .hero img { width: 100%; height: 206px; object-fit: cover; display: block; }
    .hero::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7, 16, 10, .82), rgba(7, 16, 10, .1) 72%); }
    .hero-copy { position: absolute; inset: 0; z-index: 1; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; }
    .eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; opacity: .8; }
    h2 { margin: 4px 0 0; font-size: 24px; line-height: 1.1; letter-spacing: 0; }
    .subtitle { margin: 4px 0 0; font-size: 14px; opacity: .9; }
    .status { display: inline-flex; align-items: center; gap: 7px; width: fit-content; padding: 6px 9px; border: 1px solid rgba(255,255,255,.35); background: rgba(0,0,0,.26); font-size: 13px; font-weight: 700; }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #d8b25b; }
    .status-dot.driving { background: #59c887; }
    .content { padding: 14px 16px 16px; display: grid; gap: 16px; }
    .metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .metric { border-left: 3px solid var(--primary-color, #007a3d); padding: 5px 0 5px 10px; min-width: 0; }
    .metric-name { color: var(--secondary-text-color); font-size: 12px; }
    .metric-value { margin-top: 2px; color: var(--primary-text-color); font-size: 17px; font-weight: 700; overflow-wrap: anywhere; }
    .badges { display: flex; flex-wrap: wrap; gap: 7px; }
    .badge { padding: 5px 8px; border: 1px solid #c88a21; background: #fff7df; color: #604100; font-size: 12px; font-weight: 700; }
    .badge.alert { border-color: #bc3030; background: #fff0f0; color: #8a1f1f; }
    .section-title { color: var(--secondary-text-color); font-size: 12px; font-weight: 700; letter-spacing: 0; text-transform: uppercase; }
    .list { display: grid; gap: 7px; }
    .row { display: flex; justify-content: space-between; gap: 12px; color: var(--primary-text-color); font-size: 14px; }
    .row span:last-child { text-align: right; color: var(--secondary-text-color); }
    .map { width: 100%; aspect-ratio: 16 / 7; object-fit: cover; border: 0; background: var(--secondary-background-color); }
    .message { padding: 16px; color: var(--secondary-text-color); }
    .error { color: var(--error-color, #b3261e); }
    @media (min-width: 520px) { .metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
  `;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  get hass(): HomeAssistant {
    return this._hass as HomeAssistant;
  }

  setConfig(config: BMWStatusCardConfig): void {
    if (!config?.entity) {
      throw new Error('entity ist erforderlich und muss auf sensor.status verweisen.');
    }
    this._config = config;
  }

  getCardSize(): number {
    return 6;
  }

  static getStubConfig(): BMWStatusCardConfig {
    return { type: `custom:${CARD_NAME}`, entity: 'sensor.status' };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('bmw-status-card-editor');
  }

  private _presentation(): Presentation | undefined {
    const state = this._config && this.hass?.states[this._config.entity];
    const presentation = state?.attributes.presentation;
    return presentation && typeof presentation === 'object' ? (presentation as Presentation) : undefined;
  }

  private _entity(key: string): EntityData | undefined {
    const candidate = this._presentation()?.entities?.[key];
    return candidate || undefined;
  }

  private _value(entity?: EntityData): string | undefined {
    if (!entity || this._isUnavailable(entity.state)) return undefined;
    return `${entity.state}${entity.unit ? ` ${entity.unit}` : ''}`;
  }

  private _isUnavailable(value?: string): boolean {
    return !value || ['unknown', 'unavailable', 'none'].includes(value.toLowerCase());
  }

  private _mapUrl(presentation: Presentation): string | undefined {
    const key = this._config?.maptiler_api_key?.trim();
    const trackerId = presentation.entities?.device_tracker?.entity_id;
    const tracker = trackerId ? this.hass?.states[trackerId] : undefined;
    const latitude = Number(tracker?.attributes.latitude);
    const longitude = Number(tracker?.attributes.longitude);
    if (!key || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return undefined;
    const style = encodeURIComponent(this._config?.maptiler_style?.trim() || 'streets-v2');
    const point = `${longitude},${latitude},14`;
    return `https://api.maptiler.com/maps/${style}/static/${point}/640x280.png?key=${encodeURIComponent(key)}`;
  }

  private _metric(label: string, entity?: EntityData) {
    const value = this._value(entity);
    return value ? html`<div class="metric"><div class="metric-name">${label}</div><div class="metric-value">${value}</div></div>` : nothing;
  }

  private _group(title: string, entries?: EntityData[]) {
    const visible = (entries || []).filter((entry) => !this._isUnavailable(entry.state));
    if (!visible.length) return nothing;
    return html`
      <section>
        <div class="section-title">${title}</div>
        <div class="list">
          ${visible.map((entry) => html`<div class="row"><span>${entry.name}</span><span>${this._value(entry)}</span></div>`)}
        </div>
      </section>
    `;
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    const source = this.hass.states[this._config.entity];
    if (!source) return html`<ha-card><div class="message error">${this._config.entity} wurde nicht gefunden.</div></ha-card>`;
    const presentation = this._presentation();
    if (!presentation) return html`<ha-card><div class="message">Die BMW-Statusdaten werden noch geladen.</div></ha-card>`;

    const vehicle = presentation.vehicle || {};
    const status = presentation.status || {};
    const image = presentation.images?.[0];
    const title = vehicle.name || [vehicle.manufacturer, vehicle.model].filter(Boolean).join(' ') || 'BMW';
    const subtitle = [vehicle.model, vehicle.license_plate].filter(Boolean).join(' · ');
    const mapUrl = this._mapUrl(presentation);
    const statusKey = status.key || 'unknown';

    return html`
      <ha-card>
        <div class="hero">
          ${image ? html`<img src=${image} alt=${title} />` : nothing}
          <div class="hero-copy">
            <div><div class="eyebrow">${presentation.electrification?.toUpperCase() || 'BMW'}</div><h2>${title}</h2>${subtitle ? html`<p class="subtitle">${subtitle}</p>` : nothing}</div>
            <div class="status"><span class="status-dot ${statusKey}"></span>${status.label || 'Unbekannt'}</div>
          </div>
        </div>
        <div class="content">
          <div class="metrics">
            ${this._metric('Ladezustand', this._entity('battery_charge'))}
            ${this._metric('Tank', this._entity('fuel'))}
            ${this._metric('Elektrische Reichweite', this._entity('electric_range'))}
            ${this._metric('Reichweite', this._entity('total_range'))}
            ${this._metric('Kilometerstand', this._entity('odometer'))}
            ${this._metric('Laden', this._entity('charging'))}
            ${this._metric('Verriegelung', this._entity('lock'))}
          </div>
          ${(presentation.badges || []).length
            ? html`<div class="badges">${presentation.badges?.map((badge) => html`<span class="badge ${badge.level}">${badge.label}</span>`)}</div>`
            : nothing}
          ${this._group('Öffnungen', presentation.groups?.doors)}
          ${this._group('Reifen', presentation.groups?.tires)}
          ${this._group('Service', presentation.groups?.service)}
          ${this._group('Klima', presentation.groups?.climate)}
          ${mapUrl ? html`<img class="map" src=${mapUrl} alt="Fahrzeugposition" />` : nothing}
        </div>
      </ha-card>
    `;
  }
}

class BMWStatusCardEditor extends LitElement {
  static properties = { hass: { attribute: false }, _config: { state: true } };

  private _config?: BMWStatusCardConfig;

  static styles = css`
    :host { display: block; padding: 12px; }
    .fields { display: grid; gap: 14px; }
    label { display: grid; gap: 6px; color: var(--primary-text-color); font-size: 14px; }
    input { box-sizing: border-box; width: 100%; padding: 9px; border: 1px solid var(--divider-color); border-radius: 4px; color: var(--primary-text-color); background: var(--card-background-color); font: inherit; }
  `;

  setConfig(config: BMWStatusCardConfig): void {
    this._config = config;
  }

  private _onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const key = input.dataset.key as keyof BMWStatusCardConfig;
    const value = input.value.trim();
    const next = { ...(this._config || { type: `custom:${CARD_NAME}`, entity: 'sensor.status' }) };
    if (value) {
      (next as Record<string, string>)[key] = value;
    } else {
      delete (next as Record<string, string>)[key];
    }
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: next }, bubbles: true, composed: true }));
  }

  render() {
    const config = this._config || { type: `custom:${CARD_NAME}`, entity: 'sensor.status' };
    return html`
      <div class="fields">
        <label>BMW-Status-Sensor<input data-key="entity" .value=${config.entity || ''} @input=${this._onInput} placeholder="sensor.status" /></label>
        <label>MapTiler API-Key (optional)<input data-key="maptiler_api_key" .value=${config.maptiler_api_key || ''} @input=${this._onInput} /></label>
        <label>MapTiler Style (optional)<input data-key="maptiler_style" .value=${config.maptiler_style || ''} @input=${this._onInput} placeholder="streets-v2" /></label>
      </div>
    `;
  }
}

customElements.define(CARD_NAME, BMWStatusCard);
customElements.define('bmw-status-card-editor', BMWStatusCardEditor);

(window as unknown as { customCards?: unknown[] }).customCards = (window as unknown as { customCards?: unknown[] }).customCards || [];
(window as unknown as { customCards: unknown[] }).customCards.push({
  type: CARD_NAME,
  name: 'BMW Status Card',
  description: 'Rendert die versionierte Präsentation von bmw_status.',
  version: VERSION
});
