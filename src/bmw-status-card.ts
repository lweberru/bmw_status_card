import { LitElement, css, html, nothing } from 'lit';

const CARD_NAME = 'bmw-status-card';
const VERSION = '0.2.6';

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
  label?: string;
  position?: string;
  role?: 'actual' | 'target' | string;
};

type Badge = {
  key: string;
  label: string;
  level: 'warning' | 'alert' | string;
  entity_id?: string;
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
    entity_id?: string | null;
  };
  electrification?: string;
  entities?: Record<string, EntityData | null | undefined>;
  groups?: Record<string, EntityData[] | undefined>;
  badges?: Badge[];
  images?: string[];
  tire_image?: string;
  location_image?: string;
};

type BMWStatusCardConfig = {
  type: string;
  entity: string;
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
    .hero { position: relative; aspect-ratio: 1; background: #18211b; color: #fff; }
    .hero img { width: 100%; height: 100%; object-fit: contain; display: block; }
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
    .map-wrap { position: relative; width: 100%; border: 0; padding: 0; background: var(--secondary-background-color); cursor: pointer; }
    .map-wrap:focus-visible { outline: 2px solid var(--primary-color, #007a3d); outline-offset: -2px; }
    .map { width: 100%; aspect-ratio: 16 / 7; object-fit: cover; border: 0; display: block; }
    .map-marker { position: absolute; top: 50%; left: 50%; width: 18px; height: 18px; transform: translate(-50%, -50%); border: 3px solid #fff; border-radius: 50% 50% 50% 0; background: #c12828; box-shadow: 0 1px 5px rgba(0,0,0,.45); rotate: -45deg; }
    .map-unavailable { padding: 12px; color: var(--secondary-text-color); font-size: 13px; line-height: 1.4; }
    .message { padding: 16px; color: var(--secondary-text-color); }
    .error { color: var(--error-color, #b3261e); }
    @media (min-width: 520px) { .metrics { grid-template-columns: repeat(4, minmax(0, 1fr)); } .group-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } }
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

  private _metric(label: string, entity?: EntityData) {
    const value = this._value(entity);
    return value ? html`<button class="metric" @click=${() => this._openMoreInfo(entity)}><div class="metric-name">${label}</div><div class="metric-value">${value}</div></button>` : nothing;
  }

  private _openMoreInfo(entity?: EntityData): void {
    if (entity?.entity_id) this._openEntityId(entity.entity_id);
  }

  private _openEntityId(entityId?: string | null): void {
    if (entityId) this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }));
  }

  private _label(entry: EntityData): string {
    return entry.label || entry.name;
  }

  private _isOpen(entry: EntityData): boolean {
    const state = entry.state.toLowerCase();
    return ['on', 'open', 'open_tilt', 'tilt', 'unlocked'].includes(state) || state.includes('open');
  }

  private _summary(title: string, entries?: EntityData[], maxItems = 3) {
    const visible = (entries || []).filter((entry) => !this._isUnavailable(entry.state));
    if (!visible.length) return nothing;
    return html`
      <section class="panel">
        <div class="panel-heading"><span>${title}</span></div>
        <div class="summary">
          <button class="summary-status" @click=${() => this._openMoreInfo(visible[0])}>${title}</button>
          <div class="summary-items">
            ${visible.slice(0, maxItems).map((entry) => html`<button class="summary-item" @click=${() => this._openMoreInfo(entry)}><strong>${this._label(entry)}</strong> ${this._value(entry)}</button>`)}
            ${visible.length > maxItems ? html`<span class="summary-item">Weitere Werte sind in Home Assistant verfügbar</span>` : nothing}
          </div>
        </div>
      </section>
    `;
  }

  private _openingKey(entry: EntityData): string {
    const text = `${entry.entity_id} ${entry.name}`.toLowerCase();
    if (text.includes('sunroof')) return 'sunroof';
    if (text.includes('tailgate') || text.includes('trunk')) return 'tailgate';
    if (text.includes('hood')) return 'hood';
    if (text.includes('front') && text.includes('driver')) return 'front-driver';
    if (text.includes('front') && text.includes('passenger')) return 'front-passenger';
    if (text.includes('rear') && text.includes('driver')) return 'rear-driver';
    if (text.includes('rear') && text.includes('passenger')) return 'rear-passenger';
    return entry.entity_id;
  }

  private _openings(entries?: EntityData[]) {
    const visible = (entries || []).filter((entry) => !this._isUnavailable(entry.state));
    if (!visible.length) return nothing;
    const openByPart = new Map<string, EntityData>();
    visible.filter((entry) => this._isOpen(entry)).forEach((entry) => openByPart.set(this._openingKey(entry), entry));
    const open = [...openByPart.values()];
    return html`
      <section class="panel">
        <div class="panel-heading"><span>Öffnungen</span></div>
        <div class="summary">
          <button class="summary-status" @click=${() => this._openMoreInfo(open[0] || visible[0])}>${open.length ? 'Geöffnet' : 'Alles geschlossen'}</button>
          <div class="summary-detail">${open.length ? open.map((entry) => this._label(entry)).join(', ') : 'Türen, Fenster, Motorhaube und Heckklappe sind geschlossen.'}</div>
        </div>
      </section>
    `;
  }

  private _climate(entries?: EntityData[]) {
    const visible = (entries || []).filter((entry) => !this._isUnavailable(entry.state));
    if (!visible.length) return nothing;
    const active = visible.filter((entry) => ['on', 'active', 'running', 'heating', 'cooling'].includes(entry.state.toLowerCase()));
    const nextTimer = visible.find((entry) => /next.*state|timer.*next/i.test(`${entry.entity_id} ${entry.name}`));
    const status = active.length ? 'Klimatisierung aktiv' : 'Klimatisierung aus';
    const detail = active.length ? active.map((entry) => this._label(entry)).join(', ') : nextTimer ? `${this._label(nextTimer)}: ${this._value(nextTimer)}` : 'Keine Vorklimatisierung geplant.';
    return html`<section class="panel"><div class="panel-heading"><span>Klima</span></div><div class="summary"><button class="summary-status" @click=${() => this._openMoreInfo(active[0] || nextTimer || visible[0])}>${status}</button><div class="summary-detail">${detail}</div></div></section>`;
  }

  private _tirePosition(entry: EntityData): string {
    if (entry.position) return entry.position;
    const text = `${entry.name} ${entry.entity_id}`.toLowerCase();
    const axle = text.includes('front') ? 'Vorne' : text.includes('rear') ? 'Hinten' : '';
    const side = text.includes('left') ? 'links' : text.includes('right') ? 'rechts' : '';
    return `${axle} ${side}`.trim() || 'Unbekannt';
  }

  private _tireClass(position: string): string {
    const normalized = position.toLowerCase();
    const axle = normalized.includes('vorne') ? 'front' : normalized.includes('hinten') ? 'rear' : '';
    const side = normalized.includes('links') ? 'left' : normalized.includes('rechts') ? 'right' : '';
    return axle && side ? `${axle}-${side}` : '';
  }

  private _pressureState(actual: EntityData, target?: EntityData): { level: '' | 'warning' | 'alert'; label: string } {
    const actualValue = Number.parseFloat(actual.state);
    const targetValue = target ? Number.parseFloat(target.state) : Number.NaN;
    if (!Number.isFinite(actualValue) || !Number.isFinite(targetValue)) return { level: '', label: 'Sollwert nicht verfügbar' };
    const difference = Math.abs(actualValue - targetValue);
    if (difference >= 40) return { level: 'alert', label: `${difference} kPa Abweichung` };
    if (difference >= 20) return { level: 'warning', label: `${difference} kPa Abweichung` };
    return { level: '', label: 'Druck im Sollbereich' };
  }

  private _tires(entries?: EntityData[], tireImage?: string) {
    const visible = (entries || []).filter((entry) => !this._isUnavailable(entry.state));
    const actual = visible.filter((entry) => entry.role === 'actual' || (!entry.role && !/target|soll/i.test(`${entry.name} ${entry.entity_id}`)));
    if (!actual.length) return nothing;
    const target = visible.filter((entry) => entry.role === 'target' || (!entry.role && /target|soll/i.test(`${entry.name} ${entry.entity_id}`)));
    const targetByPosition = new Map(target.map((entry) => [this._tirePosition(entry), entry]));
    return html`
      <section class="panel">
        <div class="panel-heading"><span>Reifendruck</span></div>
        <div class="tire-board">
          ${tireImage ? html`<img class="tire-vehicle-image" src=${tireImage} alt="Fahrzeug von oben" />` : html`<div class="car-top"></div>`}
          ${actual.map((entry) => {
            const position = this._tirePosition(entry);
            const desired = targetByPosition.get(position);
            const pressure = this._pressureState(entry, desired);
            return html`<button class="wheel ${this._tireClass(position)} ${pressure.level}" @click=${() => this._openMoreInfo(entry)}>
              <span class="wheel-position">${position}</span>
              <div class="wheel-value">
                <span>Ist<strong>${this._value(entry) || '-'}</strong></span>
                <span>Soll<strong>${this._value(desired) || '-'}</strong></span>
              </div>
              <div class="pressure-state">${pressure.label}</div>
            </button>`;
          })}
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
    const mapUrl = presentation.location_image;
    const statusKey = status.key || 'unknown';
    const motionEntityId = typeof status.entity_id === 'string' ? status.entity_id : undefined;

    return html`
      <ha-card>
        <div class="hero">
          ${image ? html`<img src=${image} alt=${title} />` : nothing}
          <div class="hero-copy">
            <div><div class="eyebrow">${presentation.electrification?.toUpperCase() || 'BMW'}</div><h2>${title}</h2>${subtitle ? html`<p class="subtitle">${subtitle}</p>` : nothing}</div>
            <button class="status" @click=${() => this._openEntityId(motionEntityId)}><span class="status-dot ${statusKey}"></span>${status.label || 'Unbekannt'}</button>
          </div>
        </div>
        <div class="content">
          <section class="panel">
            <div class="panel-heading"><span>Energie & Fahrzeug</span></div>
            <div class="metrics">
              ${this._metric('Ladezustand', this._entity('battery_charge'))}
              ${presentation.electrification === 'mhev' ? this._metric('Mildhybrid-Batterie', this._entity('mild_hybrid_battery_charge')) : nothing}
              ${this._metric('Tank', this._entity('fuel'))}
              ${this._metric('Elektrische Reichweite', this._entity('electric_range'))}
              ${this._metric('Reichweite', this._entity('total_range'))}
              ${this._metric('Kilometerstand', this._entity('odometer'))}
              ${this._metric('Laden', this._entity('charging'))}
              ${this._metric('Verriegelung', this._entity('lock'))}
              ${this._metric('Höhe über NN', this._entity('altitude'))}
            </div>
          </section>
          ${(presentation.badges || []).length
            ? html`<section class="panel"><div class="panel-heading"><span>Hinweise</span></div><div class="panel-body"><div class="badges">${presentation.badges?.map((badge) => html`<button class="badge ${badge.level}" @click=${() => this._openEntityId(badge.entity_id)}>${badge.label}</button>`)}</div></div></section>`
            : nothing}
          <section class="panel">
            <div class="panel-heading"><span>Fahrzeugposition</span></div>
            ${mapUrl
              ? html`<button class="map-wrap" @click=${() => this._openMoreInfo(this._entity('device_tracker'))}><img class="map" src=${mapUrl} alt="Fahrzeugposition" /><span class="map-marker" aria-label="Fahrzeugposition"></span></button>`
              : html`<div class="map-unavailable">Die Positionskarte wird vorbereitet.</div>`}
          </section>
          ${this._tires(presentation.groups?.tires, presentation.tire_image)}
          <div class="group-grid">
            ${this._openings(presentation.groups?.doors)}
            ${this._summary('Service', presentation.groups?.service, 2)}
            ${this._climate(presentation.groups?.climate)}
          </div>
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
