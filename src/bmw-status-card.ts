import { LitElement, css, html } from 'lit';

const CARD_NAME = 'bmw-status-card';
const VEHICLE_CARD_NAME = 'vehicle-status-card';
const VERSION = '0.1.64';

type HassState = {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
};

type HomeAssistant = {
  states: Record<string, HassState>;
  callWS: (msg: Record<string, any>) => Promise<any>;
  locale?: Record<string, any>;
};

type EntityRegistryEntry = {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  original_name?: string | null;
  disabled_by?: string | null;
};

type DeviceRegistryEntry = {
  id: string;
  name?: string;
  model?: string;
  manufacturer?: string;
  sw_version?: string;
};

type VehicleInfo = {
  make?: string;
  model?: string;
  series?: string;
  year?: string;
  color?: string;
  trim?: string;
  body?: string;
  name?: string;
  license_plate?: string;
};

type ImageAiConfig = {
  provider?: 'openai' | 'gemini' | 'generic' | 'ha_ai_task';
  endpoint?: string;
  api_key?: string;
  model?: string;
  size?: string;
  aspect_ratio?: string;
  count?: number;
  max_images?: number;
  ha_entity_id?: string;
  upload?: boolean;
  upload_path?: string;
  tag_metadata?: boolean;
  prompt_template?: string;
  prompts?: string[];
  views?: string[];
  cache_hours?: number;
  generate_on_demand?: boolean;
  generate_request_id?: string;
  generate_on_save?: boolean;
  request_body?: Record<string, any>;
  response_path?: string;
};

type ImageConfig = {
  mode?: 'ai' | 'static' | 'off';
  static_urls?: string[];
  ai?: ImageAiConfig;
};

type ImageTagMeta = {
  prompt: string;
  provider: string;
  model?: string;
  created_at: string;
};

type BMWStatusCardConfig = {
  type: string;
  bmw_home_device_id: string;
  bmw_cardata_device_id: string;
  vehicle_status_card?: Record<string, any>;
  maptiler_api_key?: string;
  maptiler_style?: string;
  vehicle_status_card_resource?: string;
  image?: ImageConfig;
  vehicle_info?: VehicleInfo;
  debug?: boolean;
};

type EntityInfo = {
  entity_id: string;
  domain: string;
  name: string;
  device_class?: string;
  unit?: string;
  state?: string;
  attributes?: Record<string, any>;
};

const defaultAiTemplate =
  'High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}, clean studio background, realistic, sharp details.';

class BMWStatusCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _vehicleConfig: { state: true },
    _error: { state: true },
    _loading: { state: true },
    _vehicleInfo: { state: true }
  };

  private _hass?: HomeAssistant;
  private _config?: BMWStatusCardConfig;
  private _vehicleConfig?: Record<string, any>;
  private _error?: string;
  private _loading = false;
  private _vehicleInfo?: VehicleInfo;
  private _entityEntriesCache?: EntityRegistryEntry[];
  private _deviceEntriesCache?: DeviceRegistryEntry[];
  private _lastVehicleConfigKey?: string;
  private _lastImageStatus?: string;
  private _lastImageZone?: string;
  private _deviceTrackerEntity?: string;
  private _autoGenerateOnce = false;
  private _statusEntities?: {
    fuel?: string;
    motion?: string;
    doors: string[];
    tires: string[];
    tireTargets: string[];
  };

  static styles = css`
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
  `;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._ensureConfig();
  }

  public get hass(): HomeAssistant {
    return this._hass as HomeAssistant;
  }

  public setConfig(config: BMWStatusCardConfig): void {
    this._config = config;
    this._vehicleConfig = undefined;
    this._error = undefined;
    if (!config?.bmw_home_device_id || !config?.bmw_cardata_device_id) {
      this._error = 'bmw_home_device_id und bmw_cardata_device_id sind erforderlich.';
    }
    this._vehicleInfo = undefined;
    this._entityEntriesCache = undefined;
    this._deviceEntriesCache = undefined;
    this._ensureVehicleCardLoaded();
    this._autoGenerateOnce = this._shouldAutoGenerateOnce();
    this._ensureConfig();
  }

  protected updated(): void {
    const vehicleCard = this.renderRoot.querySelector(VEHICLE_CARD_NAME) as any;
    if (vehicleCard && this.hass) {
      vehicleCard.hass = this.hass;
      if (this._vehicleConfig) {
        const nextKey = this._hash(JSON.stringify(this._vehicleConfig));
        if (this._lastVehicleConfigKey !== nextKey) {
          this._lastVehicleConfigKey = nextKey;
          vehicleCard.setConfig(this._vehicleConfig);
        }
      }
    }
    this._maybeRefreshImagesOnStatusChange();
  }

  public getCardSize(): number {
    return 6;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement('bmw-status-card-editor');
  }

  public static getStubConfig(): BMWStatusCardConfig {
    return {
      type: `custom:${CARD_NAME}`,
      bmw_home_device_id: '',
      bmw_cardata_device_id: ''
    } as BMWStatusCardConfig;
  }

  private async _ensureVehicleCardLoaded(): Promise<void> {
    if (!this._config?.vehicle_status_card_resource) return;
    if (customElements.get(VEHICLE_CARD_NAME)) return;
    const existing = document.querySelector(
      `script[data-bmw-status-card="${this._config.vehicle_status_card_resource}"]`
    );
    if (existing) return;

    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = this._config!.vehicle_status_card_resource!;
      script.dataset.bmwStatusCard = this._config!.vehicle_status_card_resource!;
      script.addEventListener('load', () => resolve());
      script.addEventListener('error', () => reject());
      document.head.appendChild(script);
    });
  }

  private async _ensureConfig(): Promise<void> {
    if (!this.hass || !this._config || this._loading || this._vehicleConfig) return;
    if (!this._config.bmw_home_device_id || !this._config.bmw_cardata_device_id) return;

    this._loading = true;
    if (!this._vehicleConfig) {
      this._vehicleConfig = undefined;
    }
    try {
      // eslint-disable-next-line no-console
      console.debug('[bmw-status-card] building config');
      const deviceIds = [this._config.bmw_home_device_id, this._config.bmw_cardata_device_id].filter(Boolean);
      const entityEntries = await this._getEntityRegistry();
      const deviceEntries = await this._getDeviceRegistry();

      const entities = this._buildEntityInfo(entityEntries, deviceIds);
      const vehicleInfo = this._buildVehicleInfo(deviceEntries, entities);
      this._vehicleInfo = vehicleInfo;

      const baseConfig = this._buildVehicleStatusCardConfig(entities, [], undefined);
      this._vehicleConfig = this._mergeVehicleConfig(baseConfig, this._config.vehicle_status_card);
      this.requestUpdate();

      const imagesPromise = this._resolveImages(vehicleInfo);
      const tireImagePromise = this._resolveTireCardImage(vehicleInfo, entities);

      const [images, tireImage] = await Promise.all([imagesPromise, tireImagePromise]);
      if (images.length || tireImage) {
        const nextConfig = this._buildVehicleStatusCardConfig(entities, images, tireImage || undefined);
        this._vehicleConfig = this._mergeVehicleConfig(nextConfig, this._config.vehicle_status_card);
      }
      this._error = undefined;
    } catch (err: any) {
      this._error = err?.message || String(err);
      // eslint-disable-next-line no-console
      console.error('[bmw-status-card] config build failed:', err);
    } finally {
      this._loading = false;
      this.requestUpdate();
    }
  }

  private _maybeRefreshImagesOnStatusChange(): void {
    if (!this._config?.image || this._config.image.mode !== 'ai') return;
    const ai = this._config.image.ai || {};
    const onDemand = ai.generate_on_demand !== false;
    const status = this._getVehicleStatusLabel() || 'unknown';
    const zone = this._deviceTrackerEntity
      ? this.hass?.states[this._deviceTrackerEntity]?.state || 'unknown'
      : 'unknown';
    if (this._lastImageStatus === status && this._lastImageZone === zone) return;
    this._lastImageStatus = status;
    this._lastImageZone = zone;
    if (onDemand && !ai.generate_request_id) {
      const allowOnSave = ai.generate_on_save !== false;
      if (!allowOnSave || this._isInEditor()) return;
      this._autoGenerateOnce = true;
    }
    if (this._vehicleConfig) {
      this._vehicleConfig = { ...this._vehicleConfig, images: [] };
      this._lastVehicleConfigKey = undefined;
      this.requestUpdate();
    }
    this._vehicleConfig = undefined;
    this._ensureConfig();
  }

  private _toYaml(value: any, indent = 0): string {
    const pad = '  '.repeat(indent);
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'string') {
      if (value === '' || /[:#\-?{}[\],&*!|>'"%@`\n\r\t]/.test(value)) {
        const escaped = value.replace(/"/g, '\\"');
        return `"${escaped}"`;
      }
      return value;
    }
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    if (Array.isArray(value)) {
      if (!value.length) return '[]';
      return value
        .map((item) => {
          if (item !== null && typeof item === 'object') {
            const rendered = this._toYaml(item, indent + 1);
            return `${pad}-\n${rendered}`;
          }
          return `${pad}- ${this._toYaml(item, indent + 1).trimStart()}`;
        })
        .join('\n');
    }
    if (typeof value === 'object') {
      const entries = Object.entries(value).filter(([, v]) => v !== undefined);
      if (!entries.length) return '{}';
      return entries
        .map(([key, val]) => {
          if (val !== null && typeof val === 'object') {
            const rendered = this._toYaml(val, indent + 1);
            return `${pad}${key}:\n${rendered}`;
          }
          return `${pad}${key}: ${this._toYaml(val, indent + 1).trimStart()}`;
        })
        .join('\n');
    }
    return String(value);
  }

  private async _getEntityRegistry(): Promise<EntityRegistryEntry[]> {
    if (this._entityEntriesCache) return this._entityEntriesCache;
    const entries = (await this.hass.callWS({ type: 'config/entity_registry/list' })) as EntityRegistryEntry[];
    this._entityEntriesCache = entries;
    return entries;
  }

  private async _getDeviceRegistry(): Promise<DeviceRegistryEntry[]> {
    if (this._deviceEntriesCache) return this._deviceEntriesCache;
    const entries = (await this.hass.callWS({ type: 'config/device_registry/list' })) as DeviceRegistryEntry[];
    this._deviceEntriesCache = entries;
    return entries;
  }

  private _buildEntityInfo(entries: EntityRegistryEntry[], deviceIds: string[]): EntityInfo[] {
    const deviceSet = new Set(deviceIds);
    return entries
      .filter((entry) => entry.device_id && deviceSet.has(entry.device_id))
      .filter((entry) => !entry.disabled_by)
      .map((entry) => {
        const state = this.hass.states[entry.entity_id];
        const domain = entry.entity_id.split('.')[0];
        const name = state?.attributes?.friendly_name || entry.original_name || entry.entity_id;
        return {
          entity_id: entry.entity_id,
          domain,
          name,
          device_class: state?.attributes?.device_class,
          unit: state?.attributes?.unit_of_measurement,
          state: state?.state,
          attributes: state?.attributes || {}
        };
      });
  }

  private _extractVehicleInfoFromAttributes(entities: EntityInfo[]): Partial<VehicleInfo> {
    const info: Partial<VehicleInfo> = {};

    for (const entity of entities) {
      const attrs = entity.attributes || {};
      const basic = attrs.vehicle_basic_data || attrs.vehicleBasicData;
      const raw = attrs.vehicle_basic_data_raw || attrs.vehicleBasicDataRaw;

      if (basic && typeof basic === 'object') {
        info.model = info.model || this._toNonEmptyString(basic.model_name);
        info.series = info.series || this._toNonEmptyString(basic.series);
        info.color = info.color || this._toNonEmptyString(basic.color);
        info.body = info.body || this._toNonEmptyString(basic.body_type);
        info.year = info.year || this._extractYear(basic.construction_date);
        info.license_plate =
          info.license_plate ||
          this._toNonEmptyString(basic.license_plate || basic.licensePlate || basic.registration_number);
      }

      if (raw && typeof raw === 'object') {
        info.make = info.make || this._toNonEmptyString(raw.brand);
        info.model =
          info.model ||
          this._toNonEmptyString(raw.modelName) ||
          this._toNonEmptyString(raw.modelRange) ||
          this._toNonEmptyString(raw.series);
        info.series = info.series || this._toNonEmptyString(raw.series) || this._toNonEmptyString(raw.seriesDevt);
        info.color =
          info.color || this._toNonEmptyString(raw.colourDescription) || this._toNonEmptyString(raw.colourCodeRaw);
        info.body = info.body || this._toNonEmptyString(raw.bodyType);
        info.year = info.year || this._extractYear(raw.constructionDate);
        info.license_plate =
          info.license_plate ||
          this._toNonEmptyString(raw.licensePlate || raw.license_plate || raw.registrationNumber);
      }
    }

    return info;
  }

  private _extractYear(value: any): string | undefined {
    if (!value) return undefined;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'string') {
      const match = value.match(/(19|20)\d{2}/);
      return match ? match[0] : undefined;
    }
    return undefined;
  }

  private _toNonEmptyString(value: any): string | undefined {
    if (value === null || value === undefined) return undefined;
    const text = String(value).trim();
    return text.length ? text : undefined;
  }

  private _buildVehicleInfo(deviceEntries: DeviceRegistryEntry[], entities: EntityInfo[]): VehicleInfo {
    const configInfo = this._config?.vehicle_info || {};
    const deviceIds = [this._config?.bmw_home_device_id, this._config?.bmw_cardata_device_id];
    const devices = deviceEntries.filter((d) => deviceIds.includes(d.id));
    const attrInfo = this._extractVehicleInfoFromAttributes(entities);

    const manufacturer = devices.find((d) => d.manufacturer)?.manufacturer || 'BMW';
    const modelFromDevice = devices.find((d) => d.model)?.model;
    const name = devices.find((d) => d.name)?.name;

    const modelEntity = this._findEntityByKeywords(entities, ['model', 'vehicle_model', 'car_model']);
    const seriesEntity = this._findEntityByKeywords(entities, ['series', 'line']);
    const yearEntity = this._findEntityByKeywords(entities, ['year', 'model_year']);
    const colorEntity = this._findEntityByKeywords(entities, ['color', 'colour']);
    const trimEntity = this._findEntityByKeywords(entities, ['trim', 'package', 'edition']);
    const bodyEntity = this._findEntityByKeywords(entities, ['body', 'body_type']);

    const safeState = (entityId?: string) => {
      if (!entityId) return undefined;
      const state = this.hass.states[entityId]?.state;
      return state && state !== 'unknown' && state !== 'unavailable' ? state : undefined;
    };

    return {
      make: configInfo.make || attrInfo.make || manufacturer,
      model: configInfo.model || attrInfo.model || safeState(modelEntity) || modelFromDevice,
      series: configInfo.series || attrInfo.series || safeState(seriesEntity),
      year: configInfo.year || attrInfo.year || safeState(yearEntity),
      color: configInfo.color || attrInfo.color || safeState(colorEntity),
      trim: configInfo.trim || attrInfo.trim || safeState(trimEntity),
      body: configInfo.body || attrInfo.body || safeState(bodyEntity),
      name: configInfo.name || attrInfo.name || name,
      license_plate: configInfo.license_plate || attrInfo.license_plate
    };
  }

  private async _resolveImages(vehicleInfo: VehicleInfo): Promise<string[]> {
    const imageConfig = this._config?.image;
    if (!imageConfig || imageConfig.mode === 'off') return [];

    if (imageConfig.mode === 'static' && imageConfig.static_urls?.length) {
      return imageConfig.static_urls;
    }

    if (imageConfig.mode === 'ai' && imageConfig.ai) {
      const provider = imageConfig.ai.provider || 'ha_ai_task';
      if ((provider === 'openai' || provider === 'gemini') && !imageConfig.ai.api_key) {
        // eslint-disable-next-line no-console
        console.warn('[bmw-status-card] image.ai.api_key fehlt – überspringe Bildgenerierung.');
        return [];
      }
      // eslint-disable-next-line no-console
      console.debug('[bmw-status-card] generating AI images', imageConfig.ai);
      return this._generateAiImages(vehicleInfo, imageConfig.ai);
    }

    return [];
  }

  private async _resolveTireCardImage(vehicleInfo: VehicleInfo, entities: EntityInfo[]): Promise<string | undefined> {
    const imageConfig = this._config?.image;
    if (!imageConfig || imageConfig.mode !== 'ai' || !imageConfig.ai) return undefined;

    const tireKeywords = [
      'tire',
      'tyre',
      'pressure',
      'wheel',
      'tpms',
      'reifen',
      'reifendruck',
      'rad'
    ];
    const tireCandidates = this._findEntities(entities, ['sensor'], tireKeywords, new Set());
    if (!tireCandidates.length) return undefined;

    const tireAi: ImageAiConfig = {
      ...imageConfig.ai,
      views: [
        'top-down view, directly above, centered, orthographic, clean studio background, front of the car at the bottom of the image, driver side on the left'
      ],
      max_images: 1,
      count: 1
    };

    const images = await this._generateAiImages(vehicleInfo, tireAi);
    return images[0];
  }

  private async _generateAiImages(vehicleInfo: VehicleInfo, ai: ImageAiConfig): Promise<string[]> {
    const provider = ai.provider || 'ha_ai_task';
    const cacheHours = ai.cache_hours ?? 24;
    const cacheKey = this._buildImageCacheKey(vehicleInfo, ai);
    const cacheBust = Date.now();
    const prompts = this._buildPrompts(vehicleInfo, ai);
    const countPerPrompt = ai.count ?? 1;
    const maxImages = ai.max_images ?? 8;
    const onDemand = ai.generate_on_demand !== false;
    const statusLabel = this._getVehicleStatusLabel() || 'unknown';
    const uploadEnabledBase = ai.upload ?? (provider === 'openai' || provider === 'gemini' || provider === 'ha_ai_task');
    const uploadEnabled = provider === 'ha_ai_task' ? true : uploadEnabledBase;
    const tagMetadata = ai.tag_metadata === true;
    const modelLabel = this._resolveAiModel(provider, ai);

    if (uploadEnabled) {
      const persistent = await this._tryGetPersistentCache(cacheKey, ai, maxImages, vehicleInfo, cacheBust);
      if (persistent.length) {
        if (tagMetadata) {
          await this._ensureImageMetadataForCached(persistent, prompts, ai, cacheKey, vehicleInfo);
        }
        return persistent;
      }
    }

    try {
      const cachedRaw = localStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as { timestamp: number; images: string[]; status?: string };
        const ageHours = (Date.now() - cached.timestamp) / 36e5;
        const hasEphemeral = cached.images?.some((image) => !this._isCacheableImageUrl(image));
        if (
          cached.images?.length &&
          ageHours <= cacheHours &&
          !hasEphemeral &&
          cached.status === statusLabel
        ) {
          const valid = await this._validateCachedImages(cached.images);
          if (valid) return cached.images;
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (_) {
      // ignore cache errors
    }

    if (onDemand && !ai.generate_request_id) {
      if (this._autoGenerateOnce) {
        this._autoGenerateOnce = false;
      } else {
        return [];
      }
    }

    let images: string[] = [];
    const metadata: ImageTagMeta[] = [];

    for (const prompt of prompts) {
      if (images.length >= maxImages) break;
      const remaining = maxImages - images.length;
      const batchCount = Math.min(countPerPrompt, remaining);
      if (batchCount <= 0) break;

      let batch: string[] = [];
      if (provider === 'openai') {
        batch = await this._fetchOpenAiImages(prompt, ai, batchCount);
      } else if (provider === 'gemini') {
        batch = await this._fetchGeminiImages(prompt, ai, batchCount);
      } else if (provider === 'ha_ai_task') {
        batch = await this._fetchHaAiTaskImages(prompt, ai, batchCount);
      } else {
        batch = await this._fetchGenericImages(prompt, ai, batchCount);
      }
      if (batch.length) {
        images.push(...batch);
        if (tagMetadata) {
          const created_at = new Date().toISOString();
          batch.forEach(() =>
            metadata.push({ prompt, provider, model: modelLabel, created_at })
          );
        }
      }
    }

    if (images.length && uploadEnabled) {
      images = await this._uploadImagesIfNeeded(images, ai, cacheKey, vehicleInfo, cacheBust);
    }

    if (images.length && tagMetadata && metadata.length) {
      await this._storeImageMetadata(images, metadata, ai, cacheKey, vehicleInfo);
    }

    if (images.length && images.every((image) => this._isCacheableImageUrl(image))) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), images, status: statusLabel }));
      } catch (_) {
        // ignore cache errors
      }
    }

    return images;
  }

  private _resolveAiModel(provider: string, ai: ImageAiConfig): string | undefined {
    if (ai.model) return ai.model;
    if (provider === 'openai') return 'gpt-image-1';
    if (provider === 'gemini') return 'imagen-3.0-generate-002';
    return undefined;
  }

  private _buildPrompts(vehicleInfo: VehicleInfo, ai: ImageAiConfig): string[] {
    const baseTemplate = ai.prompt_template || defaultAiTemplate;
    if (ai.prompts && ai.prompts.length) {
      return ai.prompts.map((prompt) => this._buildPrompt(vehicleInfo, prompt));
    }

    const homeParked = this._isHomeParked();
    if (homeParked && !(ai.views && ai.views.length)) {
      const homeViews = [
        'front 3/4 view, parked on a residential driveway in front of a modern house, daytime'
      ];
      return homeViews.map((view) => this._buildPrompt(vehicleInfo, baseTemplate, view));
    }

    const views = ai.views?.length
      ? ai.views
      : ['front 3/4 view', 'rear 3/4 view', 'side profile', 'front view', 'rear view'];

    return views.map((view) => this._buildPrompt(vehicleInfo, baseTemplate, view));
  }

  private _shouldAutoGenerateOnce(): boolean {
    const ai = this._config?.image?.ai;
    if (!ai || this._config?.image?.mode !== 'ai') return false;
    const onDemand = ai.generate_on_demand !== false;
    const allowOnSave = ai.generate_on_save !== false;
    if (!onDemand || !allowOnSave) return false;
    if (ai.generate_request_id) return false;
    return !this._isInEditor();
  }

  private _isInEditor(): boolean {
    return Boolean(
      this.closest('hui-dialog-edit-card') ||
        this.closest('hui-card-element-editor') ||
        this.closest('hui-card-preview')
    );
  }

  private _buildPrompt(vehicleInfo: VehicleInfo, template?: string, view?: string): string {
    const rawTemplate = template || defaultAiTemplate;
    const statusLabel = this._getVehicleStatusLabel();
    const statusScene = this._getStatusScene(statusLabel);
    const plate = vehicleInfo.license_plate;
    const tokens: Record<string, string> = {
      '{make}': vehicleInfo.make || 'BMW',
      '{model}': vehicleInfo.model || '',
      '{series}': vehicleInfo.series || '',
      '{year}': vehicleInfo.year || '',
      '{color}': vehicleInfo.color || '',
      '{trim}': vehicleInfo.trim || '',
      '{body}': vehicleInfo.body || '',
      '{angle}': view || '',
      '{status}': statusScene || statusLabel || '',
      '{plate}': plate || ''
    };

    let prompt = rawTemplate;
    Object.entries(tokens).forEach(([key, value]) => {
      const safeValue = value?.trim();
      prompt = prompt.replaceAll(key, safeValue || '');
    });

    if (view && !rawTemplate.includes('{angle}')) {
      prompt = `${prompt} ${view}`;
    }

    if ((statusScene || statusLabel) && !rawTemplate.includes('{status}')) {
      prompt = statusScene ? `${prompt} ${statusScene}` : `${prompt} status: ${statusLabel}`;
    }

    if (plate && !rawTemplate.includes('{plate}')) {
      prompt = `${prompt} license plate text: ${plate}`;
    }

    return prompt.replace(/\s+/g, ' ').trim();
  }

  private _getStatusScene(status?: string): string | undefined {
    if (!status) return undefined;
    const normalized = this._normalizeText(status);
    if (normalized.includes('driving')) return 'driving on the road, motion blur, dynamic scene';
    if (normalized.includes('parking') || normalized.includes('parked')) return 'parked in a parking lot, stationary';
    if (normalized.includes('standing') || normalized.includes('stand'))
      return 'stopped at a traffic light or intersection, stationary';
    return undefined;
  }

  private _isHomeParked(): boolean {
    if (!this.hass || !this._deviceTrackerEntity) return false;
    const trackerState = this.hass.states[this._deviceTrackerEntity]?.state;
    const inHome = trackerState?.toLowerCase() === 'home';
    const status = this._getVehicleStatusLabel();
    return Boolean(inHome && status && ['parking', 'parked'].includes(status));
  }

  private async _fetchOpenAiImages(prompt: string, ai: ImageAiConfig, count: number): Promise<string[]> {
    if (!ai.api_key) throw new Error('image.ai.api_key fehlt (OpenAI).');
    const endpoint = ai.endpoint || 'https://api.openai.com/v1/images/generations';
    const body = {
      model: ai.model || 'gpt-image-1',
      prompt,
      size: ai.size || '1024x1024',
      n: count
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ai.api_key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenAI Fehler: ${response.status} ${text}`);
    }

    const data = await response.json();
    const images = (data?.data || []).map((item: any) => item.url || item.b64_json).filter(Boolean);
    return images.map((img: string) => (img.startsWith('http') ? img : `data:image/png;base64,${img}`));
  }

  private async _fetchGeminiImages(prompt: string, ai: ImageAiConfig, count: number): Promise<string[]> {
    if (!ai.api_key) throw new Error('image.ai.api_key fehlt (Gemini).');
    const model = ai.model || 'imagen-3.0-generate-002';
    const endpoint =
      ai.endpoint ||
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${ai.api_key}`;

    const buildBody = (withResponseModalities: boolean) => {
      const baseBody: any = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          candidateCount: count
        }
      };
      if (withResponseModalities) {
        baseBody.responseModalities = ['IMAGE'];
      }
      return baseBody;
    };

    const body = ai.request_body || buildBody(true);

    const doFetch = async (payload: any) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return response;
    };

    let response = await doFetch(body);
    let responseText = '';

    if (!response.ok) {
      responseText = await response.text();
      const shouldFallback =
        !ai.request_body &&
        (responseText.includes('response_modalities') ||
          responseText.includes('responseModalities') ||
          responseText.includes('imageGenerationConfig') ||
          responseText.includes('generation_config'));

      if (shouldFallback) {
        response = await doFetch(buildBody(false));
        if (!response.ok) {
          const fallbackText = await response.text();
          throw new Error(`Gemini Fehler: ${response.status} ${fallbackText}`);
        }
      } else {
        throw new Error(`Gemini Fehler: ${response.status} ${responseText}`);
      }
    }

    const data = await response.json();
    const candidates = data?.candidates || [];
    const inlineImages: string[] = [];
    if (Array.isArray(candidates)) {
      candidates.forEach((candidate: any) => {
        if (candidate?.finishReason === 'SAFETY') {
          // eslint-disable-next-line no-console
          console.warn('[bmw-status-card] Gemini Bild durch Safety-Filter blockiert.');
        }
        const parts = candidate?.content?.parts || [];
        parts.forEach((part: any) => {
          const inline = part.inlineData || part.inline_data;
          if (inline?.data) {
            const mime = inline.mimeType || 'image/png';
            inlineImages.push(`data:${mime};base64,${inline.data}`);
          }
        });
      });
    }

    if (inlineImages.length) {
      return inlineImages;
    }

    const predictions = data?.predictions || data?.images || data?.data || [];
    if (!Array.isArray(predictions)) return [];
    return predictions
      .map((item: any) => {
        const b64 = item.bytesBase64Encoded || item?.image?.bytesBase64Encoded || item?.b64_json;
        if (b64) return `data:image/png;base64,${b64}`;
        if (typeof item === 'string' && item.startsWith('http')) return item;
        if (item?.url) return item.url;
        return null;
      })
      .filter(Boolean) as string[];
  }

  private async _fetchHaAiTaskImages(prompt: string, ai: ImageAiConfig, count: number): Promise<string[]> {
    if (!this.hass) throw new Error('Home Assistant nicht verfügbar.');

    const targetEntity = this._normalizeEntityId(ai.ha_entity_id);
    const baseTaskName = this._vehicleInfo?.name || this._config?.vehicle_info?.name || 'BMW Status Card';
    const promptHash = this._hash(prompt);
    const serviceData: Record<string, any> = {
      task_name: `${baseTaskName} [${promptHash}]`,
      instructions: prompt
    };
    if (targetEntity) {
      serviceData.entity_id = targetEntity;
    }

    const attempts = 2;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const response = await this.hass.callWS({
          type: 'call_service',
          domain: 'ai_task',
          service: 'generate_image',
          service_data: serviceData,
          return_response: true
        });

        const payload = response?.response ?? response?.result ?? response;
        const urls = await this._extractHaAiTaskUrls(payload);
        if (urls.length) return urls.filter(Boolean) as string[];

        // eslint-disable-next-line no-console
        console.warn('[bmw-status-card] ai_task: keine Bild-URL erhalten.', payload);
        if (attempt < attempts) {
          await this._delay(600);
          continue;
        }
        return [];
      } catch (err: any) {
        const message = err?.message || String(err);
        const missingImage = /response did not include image|no image|keine.*bild/i.test(message);
        if (missingImage && attempt < attempts) {
          // eslint-disable-next-line no-console
          console.warn('[bmw-status-card] ai_task: leere Bild-Antwort, retry …');
          await this._delay(600);
          continue;
        }
        if (missingImage) {
          // eslint-disable-next-line no-console
          console.warn('[bmw-status-card] ai_task: keine Bilddaten, überspringe.');
          return [];
        }
        throw new Error(`ai_task Fehler: ${message}`);
      }
    }

    return [];
  }

  private async _delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async _uploadImagesIfNeeded(
    images: string[],
    ai: ImageAiConfig,
    cacheKey?: string,
    vehicleInfo?: VehicleInfo,
    cacheBust?: number
  ): Promise<string[]> {
    if (!this.hass) return images;

    const provider = ai.provider || 'ha_ai_task';

    const uploadPath = this._normalizeUploadPath(ai.upload_path);
    const results: string[] = [];

    const cacheBase = cacheKey ? this._hash(cacheKey) : undefined;
    const filenamePrefix = cacheKey ? this._buildImageFilenamePrefix(vehicleInfo, cacheKey) : undefined;

    for (let index = 0; index < images.length; index += 1) {
      const image = images[index];
      let url: string | undefined;
      let dataBase64: string | undefined;
      let mimeType: string | undefined;

      if (this._isHttpUrl(image)) {
        url = image;
      } else {
        const parsed = this._parseDataUrl(image);
        if (parsed) {
          dataBase64 = parsed.data;
          mimeType = parsed.mimeType;
        } else if (image.startsWith('/')) {
          const normalizedPath =
            provider === 'ha_ai_task' ? this._normalizeHaAiTaskUrl(image) : image;
          const dataUrl = await this._fetchAsDataUrl(normalizedPath);
          const fetched = dataUrl ? this._parseDataUrl(dataUrl) : null;
          if (fetched) {
            dataBase64 = fetched.data;
            mimeType = fetched.mimeType;
          } else {
            if (provider === 'ha_ai_task') {
              continue;
            }
            results.push(image);
            continue;
          }
        } else if (provider === 'ha_ai_task' && image.startsWith('ai_task/')) {
          const normalizedPath = this._normalizeHaAiTaskUrl(image);
          const dataUrl = await this._fetchAsDataUrl(normalizedPath);
          const fetched = dataUrl ? this._parseDataUrl(dataUrl) : null;
          if (fetched) {
            dataBase64 = fetched.data;
            mimeType = fetched.mimeType;
          } else {
            continue;
          }
        } else {
          if (provider === 'ha_ai_task') {
            continue;
          }
          results.push(image);
          continue;
        }
      }

      const extension = this._guessImageExtension(url, mimeType);
      const hashInput = url || dataBase64 || image;
      const filename = cacheBase
        ? `${filenamePrefix}-${index + 1}.${extension}`
        : `${this._hash(hashInput)}.${extension}`;

      try {
        const response = await this.hass.callWS({
          type: 'call_service',
          domain: 'upload_file',
          service: 'upload_file',
          service_data: {
            path: uploadPath,
            filename,
            ...(url ? { url } : { data_base64: dataBase64 })
          },
          return_response: true
        });
        const payload = response?.response ?? response?.result ?? response;
        const localUrl = payload?.local_url || payload?.url || payload?.local_path;
        const normalizedUrl = this._normalizeLocalUploadUrl(localUrl) || image;
        results.push(this._withCacheBust(normalizedUrl, cacheKey, cacheBust));
      } catch (_) {
        if (provider !== 'ha_ai_task') {
          results.push(image);
        }
      }
    }

    return results;
  }

  private async _storeImageMetadata(
    images: string[],
    metadata: ImageTagMeta[],
    ai: ImageAiConfig,
    cacheKey?: string,
    vehicleInfo?: VehicleInfo
  ): Promise<void> {
    if (!this.hass || !cacheKey) return;

    const uploadPath = this._normalizeUploadPath(ai.upload_path);
    const filenamePrefix = this._buildImageFilenamePrefix(vehicleInfo, cacheKey);
    const status = this._getVehicleStatusLabel() || 'unknown';
    const info = vehicleInfo || this._vehicleInfo || {};
    const payloads: Record<string, any>[] = [];

    for (let index = 0; index < images.length; index += 1) {
      const meta = metadata[index];
      if (!meta) continue;
      const payload = {
        image_url: images[index],
        ...meta,
        status,
        vehicle: {
          make: info.make,
          model: info.model,
          series: info.series,
          year: info.year,
          color: info.color,
          trim: info.trim,
          body: info.body,
          license_plate: info.license_plate
        }
      };
      payloads.push(payload);
      const filename = `${filenamePrefix}-${index + 1}.meta.json`;
      try {
        await this.hass.callWS({
          type: 'call_service',
          domain: 'upload_file',
          service: 'upload_file',
          service_data: {
            path: uploadPath,
            filename,
            data_base64: this._toBase64(JSON.stringify(payload, null, 2))
          },
          return_response: true
        });
      } catch (_) {
        // ignore metadata upload errors
      }
    }

    try {
      localStorage.setItem(`${cacheKey}:meta`, JSON.stringify({ timestamp: Date.now(), items: payloads }));
    } catch (_) {
      // ignore cache errors
    }
  }

  private async _ensureImageMetadataForCached(
    images: string[],
    prompts: string[],
    ai: ImageAiConfig,
    cacheKey: string,
    vehicleInfo?: VehicleInfo
  ): Promise<void> {
    if (!this.hass) return;

    const uploadPath = this._normalizeUploadPath(ai.upload_path);
    const filenamePrefix = this._buildImageFilenamePrefix(vehicleInfo, cacheKey);
    const provider = ai.provider || 'ha_ai_task';
    const model = this._resolveAiModel(provider, ai);
    const status = this._getVehicleStatusLabel() || 'unknown';
    const info = vehicleInfo || this._vehicleInfo || {};

    for (let index = 0; index < images.length; index += 1) {
      const filename = `${filenamePrefix}-${index + 1}.meta.json`;
      const metaUrl = this._buildLocalUploadUrl(uploadPath, filename);
      if (await this._urlExists(metaUrl)) continue;

      const prompt = prompts[index] || prompts[0] || '';
      const payload = {
        image_url: images[index],
        prompt,
        provider,
        model,
        created_at: new Date().toISOString(),
        status,
        vehicle: {
          make: info.make,
          model: info.model,
          series: info.series,
          year: info.year,
          color: info.color,
          trim: info.trim,
          body: info.body,
          license_plate: info.license_plate
        }
      };

      try {
        await this.hass.callWS({
          type: 'call_service',
          domain: 'upload_file',
          service: 'upload_file',
          service_data: {
            path: uploadPath,
            filename,
            data_base64: this._toBase64(JSON.stringify(payload, null, 2))
          },
          return_response: true
        });
      } catch (_) {
        // ignore metadata upload errors
      }
    }
  }

  private _toBase64(value: string): string {
    return btoa(unescape(encodeURIComponent(value)));
  }

  private async _tryGetPersistentCache(
    cacheKey: string,
    ai: ImageAiConfig,
    maxImages: number,
    vehicleInfo?: VehicleInfo,
    cacheBust?: number
  ): Promise<string[]> {
    const uploadPath = this._normalizeUploadPath(ai.upload_path);
    const prefix = this._buildImageFilenamePrefix(vehicleInfo, cacheKey);
    const urls: string[] = [];
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];

    for (let index = 0; index < maxImages; index += 1) {
      let foundUrl: string | undefined;
      for (const ext of extensions) {
        const filename = `${prefix}-${index + 1}.${ext}`;
        const url = this._buildLocalUploadUrl(uploadPath, filename);
        if (await this._urlExists(url)) {
          foundUrl = url;
          break;
        }
      }
      if (!foundUrl) break;
      urls.push(this._withCacheBust(foundUrl, cacheKey, cacheBust));
    }

    return urls;
  }

  private _buildLocalUploadUrl(uploadPath: string, filename: string): string {
    const normalized = this._normalizeUploadPath(uploadPath);
    const path = normalized.replace(/^www\//, '');
    return `/local/${path}/${filename}`;
  }

  private _withCacheBust(url: string, cacheKey?: string, cacheBust?: number): string {
    if (!cacheKey) return url;
    if (!this._isLocalImageUrl(url)) return url;
    const token = this._hash(`${cacheKey}:${cacheBust ?? Date.now()}`);
    const joiner = url.includes('?') ? '&' : '?';
    return `${url}${joiner}v=${token}`;
  }

  private _buildImageFilenamePrefix(vehicleInfo?: VehicleInfo, cacheKey?: string): string {
    const info = vehicleInfo || this._vehicleInfo || {};
    const make = info.make || 'bmw';
    const model = info.model || '';
    const series = info.series || '';
    const plate = info.license_plate || '';
    const status = this._getVehicleStatusLabel() || 'unknown';
    const zone = this._deviceTrackerEntity
      ? this.hass?.states[this._deviceTrackerEntity]?.state || 'unknown'
      : 'unknown';
    const base = this._hash(cacheKey || JSON.stringify(info));
    const slug = this._slugify([make, model, series, plate, status, zone].filter(Boolean).join('-'));
    const safeSlug = slug.length ? slug : 'bmw-status-card';
    return `${safeSlug}-${base}`;
  }

  private _slugify(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60);
  }

  private async _urlExists(url: string): Promise<boolean> {
    try {
      const head = await fetch(url, { method: 'HEAD', cache: 'no-store' });
      if (head.ok) return true;
    } catch (_) {
      // ignore
    }
    try {
      const res = await fetch(url, { method: 'GET', cache: 'no-store' });
      return res.ok;
    } catch (_) {
      return false;
    }
  }

  private _isLocalImageUrl(url: string): boolean {
    return url.startsWith('/local/') || url.startsWith('local/');
  }

  private async _validateCachedImages(images: string[]): Promise<boolean> {
    const checks = images
      .filter((url) => this._isLocalImageUrl(url))
      .map((url) => this._urlExists(this._normalizeLocalUploadUrl(url) || url));
    if (!checks.length) return true;
    const results = await Promise.all(checks);
    return results.every(Boolean);
  }

  private _normalizeUploadPath(rawPath?: string): string {
    const normalized = (rawPath || 'www/upload_file').replace(/^\/+/, '').replace(/\/+$/, '');
    return normalized.startsWith('www/') ? normalized : `www/${normalized}`;
  }

  private _normalizeLocalUploadUrl(value?: string): string | undefined {
    if (!value) return undefined;
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith('/local/')) return trimmed;
    if (trimmed.startsWith('local/')) return `/${trimmed}`;
    if (trimmed.startsWith('www/')) return `/local/${trimmed.replace(/^www\//, '')}`;
    if (trimmed.includes('/www/')) return `/local/${trimmed.split('/www/')[1]}`;
    return trimmed;
  }

  private _parseDataUrl(value: string): { data: string; mimeType?: string } | null {
    if (!value.startsWith('data:')) return null;
    const match = value.match(/^data:([^;]+);base64,(.*)$/);
    if (!match) return null;
    return { mimeType: match[1], data: match[2] };
  }

  private async _fetchAsDataUrl(url: string): Promise<string | null> {
    const tryFetch = async (candidate: string): Promise<string | null> => {
      try {
        const response = await fetch(candidate, { credentials: 'same-origin' });
        if (!response.ok) return null;
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        });
      } catch (_) {
        return null;
      }
    };

    const candidates: string[] = [url];
    const [baseUrl] = url.split('?');
    if (baseUrl && baseUrl !== url) {
      candidates.push(baseUrl);
    }
    if (baseUrl.startsWith('/ai_task/')) {
      candidates.push(`/api${baseUrl}`);
    } else if (baseUrl.startsWith('/api/ai_task/')) {
      candidates.push(baseUrl.replace('/api/ai_task/', '/ai_task/'));
    }

    for (const candidate of candidates) {
      const dataUrl = await tryFetch(candidate);
      if (dataUrl) return dataUrl;
    }
    return null;
  }

  private _guessImageExtension(url?: string, mimeType?: string): string {
    if (mimeType) {
      if (mimeType.includes('png')) return 'png';
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'jpg';
      if (mimeType.includes('webp')) return 'webp';
    }
    if (url) {
      const match = url.match(/\.(png|jpg|jpeg|webp)(\?|$)/i);
      if (match) return match[1].toLowerCase().replace('jpeg', 'jpg');
    }
    return 'png';
  }

  private _isHttpUrl(value: string): boolean {
    return value.startsWith('http://') || value.startsWith('https://');
  }

  private _isCacheableImageUrl(value: string): boolean {
    const normalized = value.toLowerCase();
    if (normalized.includes('/ai_task/')) return false;
    if (normalized.includes('authsig=')) return false;
    return true;
  }

  private async _extractHaAiTaskUrls(payload: any): Promise<string[]> {
    if (!payload) return [];
    const candidates = payload?.images || payload?.data || payload?.results || payload?.result || payload;
    const items = Array.isArray(candidates) ? candidates : [candidates];
    const urls: string[] = [];

    for (const item of items) {
      if (!item) continue;
      if (typeof item === 'string') {
        urls.push(this._normalizeHaAiTaskUrl(item));
        continue;
      }
      const url =
        item.url ||
        item.image_url ||
        item.media_url ||
        item.content_url ||
        item.media?.url ||
        item.image?.url ||
        item.local_url ||
        item.local_path;
      if (url) {
        urls.push(this._normalizeHaAiTaskUrl(String(url)));
        continue;
      }
      const mediaId = item.media_id || item.media_content_id || item.content_id || item.media;
      if (mediaId) {
        const resolved = await this._resolveMediaSourceUrl(String(mediaId));
        if (resolved) {
          urls.push(this._normalizeHaAiTaskUrl(resolved));
        } else {
          urls.push(`/api/media/${mediaId}`);
        }
      }
    }

    return urls;
  }

  private _normalizeHaAiTaskUrl(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return value;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    if (trimmed.startsWith('/ai_task/')) return trimmed;
    if (trimmed.startsWith('ai_task/')) return `/${trimmed}`;
    return trimmed;
  }

  private async _resolveMediaSourceUrl(mediaId: string): Promise<string | undefined> {
    if (!this.hass || !mediaId) return undefined;
    try {
      if (mediaId.startsWith('http')) return mediaId;
      const resolved = await this.hass.callWS({
        type: 'media_source/resolve',
        media_content_id: mediaId
      });
      return resolved?.url;
    } catch (_) {
      return undefined;
    }
  }

  private async _fetchGenericImages(prompt: string, ai: ImageAiConfig, count: number): Promise<string[]> {
    if (!ai.endpoint) throw new Error('image.ai.endpoint fehlt (generic).');
    const body = ai.request_body || { prompt, count, size: ai.size };

    const response = await fetch(ai.endpoint, {
      method: 'POST',
      headers: {
        ...(ai.api_key ? { Authorization: `Bearer ${ai.api_key}` } : {}),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`AI Fehler: ${response.status} ${text}`);
    }

    const data = await response.json();
    const images = this._extractByPath(data, ai.response_path) || data.images || data.data || [];
    if (!Array.isArray(images)) return [];
    return images
      .map((item: any) => (typeof item === 'string' ? item : item.url || item.image || item.b64_json))
      .filter(Boolean)
      .map((img: string) => (img.startsWith('http') ? img : `data:image/png;base64,${img}`));
  }

  private _extractByPath(data: any, path?: string): any {
    if (!path) return undefined;
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), data);
  }

  private _buildImageCacheKey(vehicleInfo: VehicleInfo, ai: ImageAiConfig): string {
    const statusLabel = this._getVehicleStatusLabel();
    const statusScene = this._getStatusScene(statusLabel);
    const payload = {
      vehicleInfo,
      provider: ai.provider,
      model: ai.model,
      size: ai.size,
      aspect_ratio: ai.aspect_ratio,
      count: ai.count,
      max_images: ai.max_images,
      upload: ai.upload,
      upload_path: ai.upload_path,
      prompt_template: ai.prompt_template,
      prompts: ai.prompts,
      views: ai.views,
      status_label: statusLabel,
      status_scene: statusScene,
      home_parked: this._isHomeParked(),
      generate_request_id: ai.generate_on_demand !== false ? ai.generate_request_id : undefined
    };
    return `bmw-status-card:images:${this._hash(JSON.stringify(payload))}`;
  }

  private _hash(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i += 1) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return String(hash);
  }

  private _buildVehicleStatusCardConfig(
    entities: EntityInfo[],
    images: string[],
    tireImage?: string
  ): Record<string, any> {
    const used = new Set<string>();

    const lock = this._pickEntity(entities, used, ['lock', 'binary_sensor', 'sensor'], [
      'lock',
      'locked',
      'door lock',
      'verriegelt',
      'schloss',
      'türschloss'
    ]);
    const charging = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], [
      'charging',
      'charge',
      'plugged',
      'plug',
      'charging port',
      'connector',
      'port',
      'laden',
      'lade',
      'stecker',
      'anschluss',
      'ladeklappe'
    ]);
    const batteryHealth = this._pickEntity(entities, used, ['sensor'], [
      'battery health',
      'state of health',
      'soh',
      'health_state',
      'battery_health',
      'battery health state',
      'health state',
      'health_state_48v',
      '48v health',
      '48v battery health',
      'battery_health_state_48v'
    ]);
    const batteryChargeKeywords = [
      'state_of_charge',
      'state of charge',
      'soc',
      'state_of_energy',
      'soe',
      'ladezustand',
      'batteriestand',
      'charge level',
      'charge_level',
      'charge level at end of trip',
      'trip_battery_charge_level',
      'soc bei ankunft',
      'state_of_charge_predicted',
      'state_of_charge_predicted_on_integration_side'
    ];
    let batteryCharge = this._pickEntity(entities, used, ['sensor'], batteryChargeKeywords);
    const bestBatteryCharge = this._selectBestBatteryCharge(entities, batteryChargeKeywords);
    if (bestBatteryCharge && (!batteryCharge || this._isEntityUnavailable(entities, batteryCharge))) {
      batteryCharge = bestBatteryCharge;
      used.add(bestBatteryCharge);
    }
    const fuel = this._pickEntity(entities, used, ['sensor'], [
      'fuel',
      'tank',
      'fuel_level',
      'kraftstoff',
      'tankinhalt',
      'tankfüllung',
      'tankfuellung',
      'kraftstoffstand',
      'tank level',
      'range tank level'
    ]);
    const range = this._pickEntity(entities, used, ['sensor'], [
      'range',
      'remaining',
      'remaining_range',
      'remainingrange',
      'reichweite',
      'restreichweite',
      'reichweite_km',
      'range total',
      'total range',
      'range_total_range',
      'total_range',
      'range_total_range_last_sent'
    ]);
    const electricRange = this._pickEntity(entities, used, ['sensor'], [
      'electric range',
      'ev range',
      'remaining electric range',
      'kombi remaining electric range',
      'elektrische reichweite',
      'ev-reichweite'
    ]);
    const fuelRange = this._pickEntity(entities, used, ['sensor'], [
      'fuel range',
      'remaining fuel',
      'tank level',
      'kraftstoffreichweite'
    ]);
    const totalRange = this._pickEntity(entities, used, ['sensor'], [
      'total remaining range',
      'total range',
      'gesamtreichweite'
    ]);
    const chargeTarget = this._pickEntity(entities, used, ['sensor', 'number'], [
      'charge target',
      'target soc',
      'target state',
      'charge limit',
      'charge_limit',
      'charge_limit_soc',
      'ladeziel',
      'ladegrenze',
      'ladegrenze soc'
    ]);
    const odometer = this._pickEntity(entities, used, ['sensor'], [
      'odometer',
      'mileage',
      'distance',
      'travelled',
      'kilometerstand',
      'kilometer',
      'odo',
      'vehicle mileage'
    ]);
    const temperature = this._pickEntity(entities, used, ['sensor'], [
      'temperature',
      'temp',
      'coolant',
      'temperatur',
      'innen',
      'innenraum'
    ]);
    const chargingPower = this._pickEntity(entities, used, ['sensor'], [
      'charging power',
      'charge power',
      'power',
      'grid energy',
      'ladeleistung',
      'leistung'
    ]);
    const chargingTime = this._pickEntity(entities, used, ['sensor'], [
      'time remaining',
      'time to fully',
      'time to full',
      'remaining time',
      'restzeit',
      'ladezeit',
      'verbleibend'
    ]);
    const preconditioning = this._pickEntity(entities, used, ['binary_sensor', 'sensor', 'switch'], [
      'preconditioning',
      'climatization',
      'climate',
      'hvac',
      'defrost',
      'vorklimatisierung',
      'klimatisierung',
      'vorheizen',
      'klima'
    ]);
    const preconditioningState = this._findEntity(
      entities,
      ['sensor'],
      ['preconditioning state', 'preconditioning activity', 'preconditioning status', 'standklima', 'vorklimatisierung'],
      new Set()
    )?.entity_id;
    const preconditioningError = this._findEntity(
      entities,
      ['sensor'],
      ['preconditioning error', 'preconditioning error reason', 'vorklimatisierung fehler', 'standklima fehler'],
      new Set()
    )?.entity_id;
    const preconditioningRemaining = this._findEntity(
      entities,
      ['sensor'],
      ['preconditioning remaining time', 'preconditioning remaining', 'standklima rest', 'vorklimatisierung rest'],
      new Set()
    )?.entity_id;
    const preconditioningEngineUsed = this._findEntity(
      entities,
      ['binary_sensor', 'sensor'],
      ['preconditioning engine used', 'remote engine running', 'engine used'],
      new Set()
    )?.entity_id;
    const preconditioningEngineAllowed = this._findEntity(
      entities,
      ['binary_sensor', 'sensor'],
      ['preconditioning engine use allowed', 'remote engine start allowed', 'engine use allowed'],
      new Set()
    )?.entity_id;
    const engine = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], [
      'engine',
      'ignition',
      'motor',
      'zündung',
      'zuendung'
    ]);
    const pwfStatus = this._pickEntity(entities, used, ['sensor'], [
      'bmw_pwf_status',
      'pwf status',
      'pwf_status'
    ]);
    const motion = pwfStatus || this._pickEntity(entities, used, ['binary_sensor', 'sensor'], [
      'moving',
      'motion',
      'driving',
      'parking',
      'fährt',
      'bewegt',
      'parked',
      'stand',
      'status',
      'fahrstatus',
      'pwf',
      'pwf status'
    ]);
    const alarm = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], [
      'alarm',
      'anti theft',
      'anti-theft',
      'diebstahl',
      'security',
      'alarmsystem'
    ]);
    const alarmArming = this._pickEntity(entities, used, ['sensor'], [
      'alarm arming',
      'alarm_arming',
      'alarm arming state',
      'alarm_arming_state',
      'arming'
    ]);

    const electrification = this._detectElectrification(
      entities,
      batteryHealth,
      batteryCharge,
      charging,
      electricRange,
      fuel
    );
    const isElectric = electrification === 'bev' || electrification === 'phev';
    const batteryHealthIs48v = this._is48vEntity(batteryHealth);

    const isIndicatorEntity = (entityId?: string): boolean => {
      if (!entityId) return false;
      const entity = entities.find((entry) => entry.entity_id === entityId);
      if (!entity) return true;
      if (entity.domain !== 'sensor') return true;
      return !this._isNumericState(entity.state);
    };

    const rowMainItems: any[] = [];
    if (lock && isIndicatorEntity(lock)) rowMainItems.push({ type: 'entity', entity: lock, icon: 'mdi:lock' });
    if (charging && isElectric && isIndicatorEntity(charging))
      rowMainItems.push({ type: 'entity', entity: charging, icon: 'mdi:ev-station' });

    const rowInfoItems: any[] = [];
    if (engine && isIndicatorEntity(engine)) rowInfoItems.push({ type: 'entity', entity: engine, icon: 'mdi:engine' });
    if (motion && isIndicatorEntity(motion)) {
      const motionItem: any = { type: 'entity', entity: motion, icon: 'mdi:car' };
      if (pwfStatus && motion === pwfStatus) {
        motionItem.icon_template = this._buildPwfStatusIconTemplate(motion);
      }
      rowInfoItems.push(motionItem);
    }
    if (alarm && isIndicatorEntity(alarm)) rowInfoItems.push({ type: 'entity', entity: alarm, icon: 'mdi:alarm-light' });
    if (alarmArming && isIndicatorEntity(alarmArming)) {
      rowInfoItems.push({
        type: 'entity',
        entity: alarmArming,
        icon: 'mdi:shield-lock',
        icon_template: this._buildAlarmArmingIconTemplate(alarmArming)
      });
    }

    const doorEntities = this._pickEntities(entities, used, ['binary_sensor', 'sensor', 'cover'], [
      'door',
      'window',
      'trunk',
      'tailgate',
      'boot',
      'hood',
      'bonnet',
      'sunroof',
      'roof',
      'flap',
      'lock',
      'charging port',
      'port',
      'tür',
      'fenster',
      'kofferraum',
      'heckklappe',
      'motorhaube',
      'schiebedach',
      'dach',
      'klappe',
      'panoramadach',
      'door state',
      'doors overall',
      'window state',
      'sunroof state',
      'sunroof tilt',
      'tailgate door',
      'tailgate rear window',
      'tailgate state'
    ]);

    const tireEntities = this._pickEntities(entities, used, ['sensor'], [
      'tire',
      'tyre',
      'pressure',
      'wheel',
      'tpms',
      'pressure target',
      'reifen',
      'reifendruck',
      'rad',
      'solldruck',
      'target pressure',
      'tire pressure target'
    ]);
    const tireTempEntities = this._pickEntities(entities, used, ['sensor'], [
      'tire temperature',
      'tyre temperature',
      'wheel temperature',
      'reifentemperatur'
    ]);
    const tireTargetEntities = tireEntities.filter((entity) => this._isTireTargetEntity(entity));
    const tireActualEntities = tireEntities.filter((entity) => !this._isTireTargetEntity(entity));
    const lightEntities = this._pickEntities(entities, used, ['binary_sensor', 'sensor', 'switch'], [
      'light',
      'lights',
      'headlight',
      'lamp',
      'running light',
      'licht',
      'scheinwerfer',
      'abblendlicht',
      'fernlicht'
    ]);
    const climateEntities = this._pickEntities(entities, used, ['binary_sensor', 'sensor', 'switch', 'climate'], [
      'climate',
      'hvac',
      'preconditioning',
      'standklima',
      'vorklimatisierung',
      'defrost',
      'seat',
      'steering wheel',
      'air purification',
      'heater',
      'heating',
      'cooling',
      'klima',
      'sitzheizung',
      'lenkrad',
      'heizung',
      'kühlung',
      'aircon',
      'ac',
      'klimastatus',
      'climate timer'
    ]);
    const serviceEntities = this._pickEntities(entities, used, ['sensor', 'binary_sensor'], [
      'service',
      'inspection',
      'cbs',
      'check control',
      'maintenance',
      'wartung',
      'inspektion',
      'servicebedarf'
    ]);
    const navigationEntities = this._pickEntities(entities, used, ['sensor', 'device_tracker'], [
      'navigation',
      'destination',
      'eta',
      'latitude',
      'longitude',
      'gps',
      'ziel',
      'ankunft',
      'route',
      'routing',
      'navi',
      'position',
      'lat',
      'lon',
      'navigationsstatus',
      'navigationsziel',
      'ankunftsort',
      'ankunftsort breitengrad',
      'ankunftsort längengrad',
      'ankunftsort laengengrad'
    ]);
    const chargingEntities = this._pickEntities(entities, used, ['sensor', 'binary_sensor', 'switch', 'number'], [
      'charging',
      'charge',
      'plug',
      'connector',
      'charging mode',
      'charging power',
      'time to fully',
      'charge target',
      'laden',
      'lade',
      'ladeziel',
      'ladestatus',
      'ladekabel'
    ]);

    const indicator_rows: any[] = [];
    if (rowMainItems.length) {
      indicator_rows.push({ row_items: rowMainItems, alignment: 'center', no_wrap: true });
    }
    if (rowInfoItems.length) {
      indicator_rows.push({ row_items: rowInfoItems, alignment: 'center', no_wrap: true });
    }

    const extraGroups: any[] = [];
    const lightIndicatorEntities = lightEntities.filter((entity) => isIndicatorEntity(entity));
    if (lightIndicatorEntities.length) {
      extraGroups.push({
        type: 'group',
        name: 'Licht',
        icon: 'mdi:car-light-high',
        items: lightIndicatorEntities.map((entity) => ({ type: 'entity', entity }))
      });
    }
    if (extraGroups.length) {
      indicator_rows.push({ row_items: extraGroups, alignment: 'center', no_wrap: true });
    }

    const hybridCharge = this._isHybridBatteryChargeEntity(batteryCharge);
    const batteryChargeLabel = isElectric
      ? 'Batterie'
      : batteryHealthIs48v || hybridCharge
        ? '48V Batterie (Ladung)'
        : '12V Batterie';
    const batteryHealthLabel = batteryHealthIs48v ? '48V Batteriegesundheit' : 'Batteriegesundheit';

    const range_info: any[] = [];
    if (batteryCharge && isElectric) {
      range_info.push({
        title: 'Batterie Ladestand',
        icon: 'mdi:battery',
        energy_level: { entity: batteryCharge, max_value: 100, hide_icon: true },
        range_level: { value: 100, unit: '%', hide_icon: true },
        charging_entity: charging || undefined,
        charge_target_entity: chargeTarget || undefined,
        progress_color: 'var(--success-color)'
      });
    }
    if (batteryHealth && (!batteryHealthIs48v || isElectric)) {
      range_info.push({
        title: batteryHealthLabel,
        icon: 'mdi:battery-heart',
        energy_level: { entity: batteryHealth, max_value: 100, hide_icon: true },
        color_template: this._buildBatteryHealthColorTemplate(batteryHealth)
      });
    }
    if (fuel && electrification !== 'bev') {
      range_info.push({
        title: 'Tankfüllstand',
        icon: 'mdi:gas-station',
        energy_level: { entity: fuel, hide_icon: true },
        range_level: fuelRange || totalRange || range
          ? { entity: fuelRange || totalRange || range, hide_icon: true }
          : undefined,
        color_template: this._buildLowFuelColorTemplate(fuel)
      });
    }
    if (!range_info.length && range) {
      range_info.push({
        title: 'Reichweite',
        icon: 'mdi:map-marker-distance',
        energy_level: { entity: range, hide_icon: true }
      });
    }

    const deviceTrackers = entities.filter((entity) => entity.domain === 'device_tracker').map((e) => e.entity_id);
    const deviceTracker = deviceTrackers[0];
    this._deviceTrackerEntity = deviceTracker;

    const tireCard = this._buildTireCardConfig(entities, tireImage);
    const buttonExclusions = new Set<string>(tireCard?.entities || []);

    this._statusEntities = {
      fuel,
      motion,
      doors: doorEntities,
      tires: tireActualEntities,
      tireTargets: tireTargetEntities
    };

    const specialButtons: any[] = [];
    const statusItems: any[] = [];
    const serviceItems: any[] = [];

    const addItem = (items: any[], entity?: string, name?: string, icon?: string) => {
      if (!entity) return;
      items.push({ entity, name, icon });
    };

    addItem(statusItems, batteryCharge, batteryChargeLabel, 'mdi:battery');
    addItem(statusItems, batteryHealth, batteryHealthLabel, 'mdi:battery-heart');
    addItem(statusItems, fuel, 'Kraftstoff', 'mdi:gas-station');
    addItem(statusItems, electricRange || totalRange || range, 'Reichweite', 'mdi:map-marker-distance');
    addItem(statusItems, odometer, 'Kilometerstand', 'mdi:counter');
    addItem(statusItems, temperature, 'Temperatur', 'mdi:thermometer');
    if (isElectric) {
      addItem(statusItems, chargingTime, 'Ladezeit', 'mdi:timer');
      addItem(statusItems, chargingPower, 'Ladeleistung', 'mdi:flash');
    }
    addItem(statusItems, motion, 'Fahrstatus', 'mdi:car');
    addItem(statusItems, alarmArming, 'Alarmanlage', 'mdi:shield-lock');

    serviceEntities.forEach((entity) => addItem(serviceItems, entity));

    if (statusItems.length) {
      specialButtons.push({
        name: 'Fahrzeug',
        icon: 'mdi:car-info',
        button_type: 'default',
        card_type: 'default',
        sub_card: {
          default_card: [{ title: 'Fahrzeugstatus', items: statusItems }]
        }
      });
      statusItems.forEach((item) => buttonExclusions.add(item.entity));
    }

    if (serviceItems.length) {
      specialButtons.push({
        name: 'Service',
        icon: 'mdi:wrench',
        button_type: 'default',
        card_type: 'default',
        sub_card: {
          default_card: [{ title: 'Service', items: serviceItems }]
        }
      });
      serviceItems.forEach((item) => buttonExclusions.add(item.entity));
    }

    if (doorEntities.length) {
      const doorTemplateEntities = doorEntities.filter((entity) => !this._isDoorOverallEntity(entity));
      const doorTemplates = this._buildDoorTemplates(doorTemplateEntities, motion);
      specialButtons.push({
        name: 'Öffnungen',
        icon: 'mdi:car-door',
        button_type: 'default',
        card_type: 'default',
        notify: doorTemplates.notify,
        notify_icon: doorTemplates.notify_icon,
        notify_color: doorTemplates.notify_color,
        color_template: doorTemplates.color,
        sub_card: {
          default_card: [
            {
              title: 'Öffnungen',
              items: doorEntities.map((entity) => ({ entity, name: this._getDoorLabel(entity, entities) }))
            }
          ]
        }
      });
      doorEntities.forEach((entity) => buttonExclusions.add(entity));
    }

    if (tireCard?.tire_card) {
      const tireTemplates = this._buildTirePressureTemplates(tireActualEntities, tireTargetEntities);
      specialButtons.push({
        name: 'Reifen',
        icon: 'mdi:car-tire-alert',
        button_type: 'default',
        card_type: 'tire',
        notify: tireTemplates.notify,
        notify_icon: tireTemplates.notify_icon,
        notify_color: tireTemplates.notify_color,
        color_template: tireTemplates.color,
        sub_card: {
          tire_card: tireCard.tire_card
        }
      });
      (tireCard.entities || []).forEach((entity) => buttonExclusions.add(entity));
    }

    if (isElectric && chargingEntities.length) {
      specialButtons.push({
        name: 'Laden',
        icon: 'mdi:ev-station',
        button_type: 'default',
        card_type: 'default',
        sub_card: {
          default_card: [
            {
              title: 'Ladezustand',
              items: chargingEntities.map((entity) => ({ entity }))
            }
          ]
        }
      });
      chargingEntities.forEach((entity) => buttonExclusions.add(entity));
    }

    if (climateEntities.length) {
      const preconditioningTemplates = this._buildPreconditioningTemplates(
        preconditioningState,
        preconditioningError,
        preconditioningRemaining,
        preconditioningEngineUsed,
        preconditioningEngineAllowed
      );
      specialButtons.push({
        name: 'Klima',
        icon: 'mdi:car-defrost-front',
        button_type: 'default',
        card_type: 'default',
        notify: preconditioningTemplates.notify,
        notify_icon: preconditioningTemplates.notify_icon,
        notify_color: preconditioningTemplates.notify_color,
        color_template: preconditioningTemplates.color,
        sub_card: {
          default_card: [
            {
              title: 'Klima',
              items: climateEntities.map((entity) => ({ entity, name: this._getClimateLabel(entity, entities) }))
            }
          ]
        }
      });
      climateEntities.forEach((entity) => buttonExclusions.add(entity));
    }

    if (navigationEntities.length) {
      specialButtons.push({
        name: 'Navigation',
        icon: 'mdi:navigation',
        button_type: 'default',
        card_type: 'default',
        sub_card: {
          default_card: [
            {
              title: 'Navigation',
              items: navigationEntities.map((entity) => ({ entity }))
            }
          ]
        }
      });
      navigationEntities.forEach((entity) => buttonExclusions.add(entity));
    }

    const buttons = [...specialButtons, ...this._buildButtonCards(entities, used, buttonExclusions)];

    const imagesConfig = images.length
      ? images.map((url) => ({ image: url }))
      : undefined;

    return {
      type: `custom:${VEHICLE_CARD_NAME}`,
      name: this._vehicleInfo?.name || 'BMW',
      indicator_rows: indicator_rows.length ? indicator_rows : undefined,
      range_info: range_info.length ? range_info : undefined,
      button_cards: buttons.length ? buttons : undefined,
      images: imagesConfig,
      mini_map: deviceTracker
        ? {
            device_tracker: deviceTracker,
            entities: deviceTrackers,
            maptiler_api_key: this._config?.maptiler_api_key,
          maptiler_style: this._config?.maptiler_style,
            enable_popup: true,
            map_height: 240,
            map_zoom: 14,
            user_location: true,
            use_zone_name: true
          }
        : undefined,
      layout_config: {
        section_order: ['indicators', 'range_info', 'images', 'mini_map', 'buttons'],
        button_grid: {
          columns: 2,
          swipe: true
        },
        images_swipe: {
          autoplay: true,
          loop: true,
          delay: 6000,
          speed: 600,
          effect: 'fade',
          height: 240
        },
        range_info_config: {
          layout: 'row'
        },
        single_tire_card: undefined
      }
    };
  }

  private _buildButtonCards(entities: EntityInfo[], used: Set<string>, exclude?: Set<string>): any[] {
    const priorityDomains = ['lock', 'switch', 'button', 'cover', 'climate'];
    const blocked = new Set<string>([...used, ...(exclude ? Array.from(exclude) : [])]);
    const available = entities.filter((entity) => !blocked.has(entity.entity_id));

    const sorted = available.sort((a, b) => {
      const aIndex = priorityDomains.indexOf(a.domain);
      const bIndex = priorityDomains.indexOf(b.domain);
      const aRank = aIndex === -1 ? 999 : aIndex;
      const bRank = bIndex === -1 ? 999 : bIndex;
      return aRank - bRank;
    });

    const buttons: any[] = [];
    for (const entity of sorted) {
      if (buttons.length >= 12) break;
      if (!priorityDomains.includes(entity.domain)) continue;
      used.add(entity.entity_id);
      blocked.add(entity.entity_id);
      buttons.push({
        entity: entity.entity_id,
        name: entity.name,
        button_type: 'default'
      });
    }

    return buttons;
  }

  private _mergeVehicleConfig(baseConfig: Record<string, any>, overrides?: Record<string, any>): Record<string, any> {
    if (!overrides) return baseConfig;
    const merged = { ...baseConfig, ...overrides };
    const arrayKeys = ['indicator_rows', 'range_info', 'images', 'button_cards'];
    arrayKeys.forEach((key) => {
      if (overrides[key] !== undefined) merged[key] = overrides[key];
    });
    if (overrides.mini_map !== undefined) {
      if (overrides.mini_map === null) {
        merged.mini_map = null;
      } else {
        merged.mini_map = { ...(baseConfig.mini_map || {}), ...(overrides.mini_map || {}) };
      }
    }
    if (overrides.layout_config !== undefined) merged.layout_config = overrides.layout_config;
    return merged;
  }

  private _pickEntity(
    entities: EntityInfo[],
    used: Set<string>,
    domains: string[],
    keywords: string[]
  ): string | undefined {
    const candidate = this._findEntity(entities, domains, keywords, used);
    if (candidate) {
      used.add(candidate.entity_id);
      return candidate.entity_id;
    }
    return undefined;
  }

  private _pickEntities(
    entities: EntityInfo[],
    used: Set<string>,
    domains: string[],
    keywords: string[]
  ): string[] {
    const matches = this._findEntities(entities, domains, keywords, used);
    matches.forEach((entity) => used.add(entity.entity_id));
    return matches.map((entity) => entity.entity_id);
  }

  private _findEntity(
    entities: EntityInfo[],
    domains: string[],
    keywords: string[],
    used: Set<string>
  ): EntityInfo | undefined {
    const matches = this._findEntities(entities, domains, keywords, used);
    return matches[0];
  }

  private _findEntities(
    entities: EntityInfo[],
    domains: string[],
    keywords: string[],
    used: Set<string>
  ): EntityInfo[] {
    const normalizedKeywords = keywords.map((k) => this._normalizeText(k));
    return entities
      .filter((entity) => !used.has(entity.entity_id))
      .filter((entity) => (domains.length ? domains.includes(entity.domain) : true))
      .filter((entity) => {
        if (!normalizedKeywords.length) return true;
        const haystack = this._normalizeText(
          `${entity.entity_id} ${entity.name} ${entity.device_class ?? ''}`
        );
        return normalizedKeywords.some((k) => haystack.includes(k));
      })
      .sort((a, b) => {
        const aState = a.state || '';
        const bState = b.state || '';
        if (aState === 'unknown' && bState !== 'unknown') return 1;
        if (bState === 'unknown' && aState !== 'unknown') return -1;
        return a.name.localeCompare(b.name);
      });
  }

  private _normalizeText(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[ -]/g, ' ')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  private _getEntityLabel(entityId: string, entities: EntityInfo[]): string {
    const entity = entities.find((entry) => entry.entity_id === entityId);
    const raw = entity?.name?.trim();
    if (raw) return this._stripVehiclePrefix(raw);
    return this._beautifyEntityName(entityId);
  }

  private _stripVehiclePrefix(name: string): string {
    const prefixes = this._getVehiclePrefixes();
    if (!prefixes.length) return name;
    const lowerName = name.toLowerCase();
    for (const prefix of prefixes) {
      const lowerPrefix = prefix.toLowerCase();
      if (lowerName.startsWith(lowerPrefix)) {
        return name.slice(prefix.length).trim();
      }
    }
    return name;
  }

  private _getVehiclePrefixes(): string[] {
    const info = this._vehicleInfo;
    if (!info) return [];
    const candidates = [
      info.name,
      `${info.make || ''} ${info.model || ''}`.trim(),
      info.model,
      info.series,
      info.trim
    ].filter(Boolean) as string[];
    return Array.from(new Set(candidates.map((value) => value.trim()).filter(Boolean)));
  }

  private _stripPrefixToKeyword(value: string, keywords: string[]): string {
    const lower = value.toLowerCase();
    const idx = keywords
      .map((k) => lower.indexOf(k))
      .filter((i) => i >= 0)
      .sort((a, b) => a - b)[0];
    if (idx === undefined) return value;
    return value.slice(idx).trim();
  }

  private _getDoorLabel(entityId: string, entities: EntityInfo[]): string {
    const entity = entities.find((entry) => entry.entity_id === entityId);
    const rawSource = this._stripVehiclePrefix(entity?.name?.trim() || entityId);
    const source = this._stripPrefixToKeyword(rawSource, ['door', 'window', 'tailgate', 'hood', 'sunroof']);
    const text = this._normalizeText(source);

    const doorSide = (prefix: string) => {
      if (text.includes('front') && text.includes('driver')) return `${prefix} vorn links`;
      if (text.includes('front') && text.includes('passenger')) return `${prefix} vorn rechts`;
      if (text.includes('rear') && text.includes('driver')) return `${prefix} hinten links`;
      if (text.includes('rear') && text.includes('passenger')) return `${prefix} hinten rechts`;
      return undefined;
    };

    if (text.includes('doors overall')) return 'Türen gesamt';
    if (text.includes('door state')) return doorSide('Tür') || 'Tür';
    if (text.includes('window state')) return doorSide('Fenster') || 'Fenster';
    if (text.includes('tailgate rear window')) return 'Heckscheibe';
    if (text.includes('tailgate door') || text.includes('tailgate state')) return 'Heckklappe';
    if (text.includes('trunk') || text.includes('boot')) return 'Kofferraum';
    if (text.includes('hood') || text.includes('bonnet')) return 'Motorhaube';
    if (text.includes('sunroof overall')) return 'Schiebedach gesamt';
    if (text.includes('sunroof tilt')) return 'Schiebedach gekippt';
    if (text.includes('sunroof')) return 'Schiebedach';

    return this._stripVehiclePrefix(entity?.name?.trim() || this._beautifyEntityName(entityId));
  }

  private _getClimateLabel(entityId: string, entities: EntityInfo[]): string {
    const entity = entities.find((entry) => entry.entity_id === entityId);
    const rawSource = this._stripVehiclePrefix(entity?.name?.trim() || entityId);
    const source = this._stripPrefixToKeyword(rawSource, ['climate', 'preconditioning']);
    const text = this._normalizeText(source);

    if (text.includes('climate timer')) {
      const weekly = text.includes('weekly 1')
        ? 'Klima-Timer Woche 1'
        : text.includes('weekly 2')
          ? 'Klima-Timer Woche 2'
          : text.includes('next only')
            ? 'Klima-Timer Nächster'
            : 'Klima-Timer';
      if (text.includes('hour')) return `${weekly} (Stunde)`;
      if (text.includes('minute')) return `${weekly} (Minute)`;
      if (text.includes('state')) return `${weekly} (Status)`;
      return weekly;
    }

    if (text.includes('preconditioning engine used')) return 'Vorklimatisierung Motor verwendet';
    if (text.includes('preconditioning error')) return 'Vorklimatisierung Fehler';
    if (text.includes('preconditioning state')) return 'Vorklimatisierung Status';

    return this._stripVehiclePrefix(entity?.name?.trim() || this._beautifyEntityName(entityId));
  }

  private _beautifyEntityName(entityId: string): string {
    const base = entityId.split('.').pop() || entityId;
    const tokens = base
      .split('_')
      .filter(Boolean)
      .map((token) => token.toLowerCase());
    const replacements: Record<string, string> = {
      door: 'Tür',
      doors: 'Türen',
      window: 'Fenster',
      windows: 'Fenster',
      trunk: 'Kofferraum',
      tailgate: 'Heckklappe',
      boot: 'Kofferraum',
      hood: 'Motorhaube',
      bonnet: 'Motorhaube',
      sunroof: 'Schiebedach',
      roof: 'Dach',
      flap: 'Klappe',
      lock: 'Schloss',
      charging: 'Laden',
      port: 'Port',
      front: 'vorn',
      rear: 'hinten',
      left: 'links',
      right: 'rechts',
      climate: 'Klima',
      hvac: 'Klima',
      preconditioning: 'Vorklimatisierung',
      defrost: 'Enteisung',
      seat: 'Sitz',
      steering: 'Lenkrad',
      heater: 'Heizung',
      heating: 'Heizung',
      cooling: 'Kühlung',
      air: 'Luft',
      purification: 'Reinigung',
      timer: 'Timer',
      status: 'Status'
    };
    const label = tokens
      .map((token) => replacements[token] || token)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : entityId;
  }

  private _normalizeEntityId(value?: string | string[] | null): string | undefined {
    if (!value) return undefined;
    if (Array.isArray(value)) {
      const first = value.length ? String(value[0]).trim() : '';
      return this._normalizeEntityId(first);
    }
    if (typeof value === 'object') {
      const candidate = (value as any).entity_id ?? (value as any).entityId;
      return this._normalizeEntityId(candidate as any);
    }
    const trimmed = String(value).trim();
    if (!trimmed) return undefined;
    if (trimmed.includes(',')) {
      const first = trimmed.split(',')[0].trim();
      return this._normalizeEntityId(first);
    }
    if (!trimmed.includes('.') || /\s/.test(trimmed)) return undefined;
    return trimmed;
  }

  private _findEntityByKeywords(entities: EntityInfo[], keywords: string[]): string | undefined {
    return this._findEntity(entities, [], keywords, new Set())?.entity_id;
  }

  private _isNumericState(value: unknown): boolean {
    if (value === null || value === undefined) return false;
    if (typeof value === 'number') return !Number.isNaN(value);
    const normalized = String(value).trim().replace(',', '.');
    if (!normalized) return false;
    return !Number.isNaN(Number(normalized));
  }

  private _buildTireCardConfig(
    entities: EntityInfo[],
    tireImage?: string
  ): { tire_card: any; entities: string[] } | undefined {
    const match = (keywords: string[]) => this._findEntity(entities, ['sensor'], keywords, new Set());

    const frontLeft = match(['front left', 'front_left', 'row1 left', 'row1 wheel left']);
    const frontRight = match(['front right', 'front_right', 'row1 right', 'row1 wheel right']);
    const rearLeft = match(['rear left', 'rear_left', 'row2 left', 'row2 wheel left']);
    const rearRight = match(['rear right', 'rear_right', 'row2 right', 'row2 wheel right']);

    const targetMap = new Map<string, string>();
    entities.forEach((entity) => {
      if (!this._isTireTargetEntity(entity.entity_id)) return;
      const key = this._tirePositionKey(entity.entity_id);
      if (key) targetMap.set(key, entity.entity_id);
    });

    const buildTireConfig = (entry?: EntityInfo, label?: string) => {
      if (!entry) return undefined;
      const key = this._tirePositionKey(entry.entity_id);
      const target = key ? targetMap.get(key) : undefined;
      const config: any = {
        entity: entry.entity_id,
        name: label,
        color: this._buildSingleTireColorTemplate(entry.entity_id, target)
      };
      if (target) {
        config.additional_entities = [{ entity: target, prefix: 'Soll: ' }];
      }
      return { config, target };
    };

    const frontLeftConfig = buildTireConfig(frontLeft, 'Vorne links');
    const frontRightConfig = buildTireConfig(frontRight, 'Vorne rechts');
    const rearLeftConfig = buildTireConfig(rearLeft, 'Hinten links');
    const rearRightConfig = buildTireConfig(rearRight, 'Hinten rechts');

    const entitiesUsed = [frontLeft, frontRight, rearLeft, rearRight]
      .filter(Boolean)
      .map((entry) => (entry as EntityInfo).entity_id);
    const targetEntitiesUsed = [
      frontLeftConfig?.target,
      frontRightConfig?.target,
      rearLeftConfig?.target,
      rearRightConfig?.target
    ].filter(Boolean) as string[];

    if (!entitiesUsed.length) return undefined;

    const tire_card = {
      title: 'Reifendruck',
      ...(tireImage ? { background: tireImage } : {}),
      front_left: rearLeftConfig?.config,
      front_right: rearRightConfig?.config,
      rear_left: frontLeftConfig?.config,
      rear_right: frontRightConfig?.config
    };

    return { tire_card, entities: [...entitiesUsed, ...targetEntitiesUsed] };
  }

  private _buildSingleTireColorTemplate(actual: string, target?: string): string {
    if (target) {
      return (
        `{% set av = states('${actual}') | float(0) %}` +
        `{% set tv = states('${target}') | float(0) %}` +
        `{% set state = 'ok' %}` +
        `{% if tv > 0 and av > 0 %}` +
        `{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}` +
        `{% if av < err %}{% set state = 'error' %}{% elif av < warn %}{% set state = 'warn' %}{% endif %}` +
        `{% elif av > 0 %}` +
        `{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}` +
        `{% endif %}` +
        `{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`
      );
    }

    return (
      `{% set av = states('${actual}') | float(0) %}` +
      `{% set state = 'ok' %}` +
      `{% if av > 0 %}` +
      `{% if av < 180 %}{% set state = 'error' %}{% elif av < 200 %}{% set state = 'warn' %}{% endif %}` +
      `{% endif %}` +
      `{{ iif(state == 'error', 'var(--error-color)', iif(state == 'warn', 'var(--warning-color)', 'var(--success-color)')) }}`
    );
  }

  private _isTireTargetEntity(entityId: string): boolean {
    const text = this._normalizeText(entityId);
    return text.includes('target') || text.includes('solldruck');
  }

  private _isDoorSummaryEntity(entityId: string): boolean {
    const text = this._normalizeText(entityId);
    return (
      text.includes('overall') ||
      text.includes('hood') ||
      text.includes('tailgate') ||
      text.includes('sunroof overall')
    );
  }

  private _isDoorOverallEntity(entityId: string): boolean {
    const text = this._normalizeText(entityId);
    return text.includes('doors overall');
  }

  private _getVehicleStatusLabel(): string | undefined {
    const entityId = this._statusEntities?.motion;
    if (!entityId || !this.hass) return undefined;
    const state = this.hass.states[entityId]?.state;
    if (!state) return undefined;
    const normalized = this._normalizeText(state);
    if (normalized.includes('driving') || normalized.includes('fahrt')) return 'driving';
    if (normalized.includes('standing') || normalized.includes('stand')) return 'standing';
    if (normalized.includes('park') || normalized.includes('parken')) return 'parking';
    return state;
  }

  private _buildTirePressureTemplates(actuals: string[], targets: string[]): {
    notify?: string;
    color?: string;
    notify_color?: string;
    notify_icon?: string;
  } {
    const base = this._buildTirePressureTemplateBase(actuals, targets);
    if (!base) return {};
    return {
      notify: `${base}{{ ns.state in ['warn','error'] }}`,
      color: `${base}{{ iif(ns.state == 'error', 'var(--error-color)', iif(ns.state == 'warn', 'var(--warning-color)', 'var(--secondary-text-color)')) }}`,
      notify_color: `${base}{{ iif(ns.state == 'error', 'var(--error-color)', 'var(--warning-color)') }}`,
      notify_icon: `${base}{{ iif(ns.state == 'error', 'mdi:alert', 'mdi:alert-circle') }}`
    };
  }

  private _buildTirePressureTemplateBase(actuals: string[], targets: string[]): string | undefined {
    const { pairs, fallback } = this._buildTirePairs(actuals, targets);
    if (!pairs.length && !fallback.length) return undefined;
    const pairsLiteral = pairs.map((pair) => `{ 'a': '${pair.a}', 't': '${pair.t}' }`).join(', ');
    const fallbackLiteral = fallback.map((entityId) => `'${entityId}'`).join(', ');
    return `{% set pairs = [${pairsLiteral}] %}{% set fallback = [${fallbackLiteral}] %}{% set ns = namespace(state='ok') %}` +
      `{% for p in pairs %}{% set av = states(p['a']) | float(0) %}{% set tv = states(p['t']) | float(0) %}` +
      `{% if tv > 0 and av > 0 %}{% set warn = tv * 0.95 %}{% set err = tv * 0.8 %}` +
      `{% if av < err %}{% set ns.state = 'error' %}{% elif av < warn and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}` +
      `{% endif %}{% endfor %}` +
      `{% if ns.state == 'ok' %}{% for e in fallback %}{% set v = states(e) | float(0) %}` +
      `{% if v > 0 and v < 180 %}{% set ns.state = 'error' %}{% elif v > 0 and v < 200 and ns.state != 'error' %}{% set ns.state = 'warn' %}{% endif %}` +
      `{% endfor %}{% endif %}`;
  }

  private _buildDoorTemplates(doors: string[], statusEntity?: string): {
    notify?: string;
    color?: string;
    notify_color?: string;
    notify_icon?: string;
  } {
    const base = this._buildDoorTemplateBase(doors, statusEntity);
    if (!base) return {};
    return {
      notify: `${base}{{ ns.open }}`,
      color: `${base}{{ iif(ns.open, 'var(--warning-color)', 'var(--secondary-text-color)') }}`,
      notify_color: `${base}{{ 'var(--warning-color)' }}`,
      notify_icon: `${base}{{ 'mdi:car-door' }}`
    };
  }

  private _buildDoorTemplateBase(doors: string[], statusEntity?: string): string | undefined {
    if (!doors.length) return undefined;
    const doorList = doors.map((entityId) => `'${entityId}'`).join(', ');
    const status = statusEntity ? `'${statusEntity}'` : "''";
    return `{% set ns = namespace(open=false) %}` +
      `{% set status = states(${status}) | lower %}` +
      `{% if status in ['parking','parked','standing'] %}` +
      `{% for e in [${doorList}] %}` +
      `{% set s = states(e) | lower %}` +
      `{% if s not in ['closed','geschlossen','secured','gesichert','locked','verriegelt','ok','aus','off','false','no','0','inactive','not_open','unknown','unavailable','none','-'] %}` +
      `{% set ns.open = true %}{% endif %}` +
      `{% endfor %}{% endif %}`;
  }

  private _buildPreconditioningTemplates(
    stateEntity?: string,
    errorEntity?: string,
    remainingEntity?: string,
    engineUsedEntity?: string,
    engineAllowedEntity?: string
  ): {
    notify?: string;
    color?: string;
    notify_color?: string;
    notify_icon?: string;
  } {
    const base = this._buildPreconditioningTemplateBase(
      stateEntity,
      errorEntity,
      remainingEntity,
      engineUsedEntity,
      engineAllowedEntity
    );
    if (!base) return {};
    return {
      notify: `${base}{{ ns.active or ns.error }}`,
      color: `${base}{{ iif(ns.error, 'var(--error-color)', iif(ns.active, 'var(--success-color)', 'var(--secondary-text-color)')) }}`,
      notify_color: `${base}{{ iif(ns.error, 'var(--error-color)', 'var(--success-color)') }}`,
      notify_icon: `${base}{{ iif(ns.error, 'mdi:alert-circle', 'mdi:car-defrost-front') }}`
    };
  }

  private _buildPreconditioningTemplateBase(
    stateEntity?: string,
    errorEntity?: string,
    remainingEntity?: string,
    engineUsedEntity?: string,
    engineAllowedEntity?: string
  ): string | undefined {
    if (!stateEntity && !errorEntity && !remainingEntity && !engineUsedEntity && !engineAllowedEntity) return undefined;
    const state = stateEntity ? `'${stateEntity}'` : "''";
    const error = errorEntity ? `'${errorEntity}'` : "''";
    const remaining = remainingEntity ? `'${remainingEntity}'` : "''";
    const engineUsed = engineUsedEntity ? `'${engineUsedEntity}'` : "''";
    const engineAllowed = engineAllowedEntity ? `'${engineAllowedEntity}'` : "''";
    return (
      `{% set ns = namespace(active=false, error=false) %}` +
      `{% set state = states(${state}) | lower %}` +
      `{% set err = states(${error}) | lower %}` +
      `{% set remaining = states(${remaining}) | float(0) %}` +
      `{% set engine = states(${engineUsed}) | lower %}` +
      `{% set allowed = states(${engineAllowed}) | lower %}` +
      `{% if err not in ['','ok','invalid','unknown','none','-'] %}{% set ns.error = true %}{% endif %}` +
      `{% if state in ['heating','cooling','ventilation','standby'] %}{% set ns.active = true %}{% endif %}` +
      `{% if remaining > 0 %}{% set ns.active = true %}{% endif %}` +
      `{% if engine in ['true','on','yes','1'] %}{% set ns.active = true %}{% endif %}` +
      `{% if allowed in ['false','off','no','0'] and state in ['heating','cooling','ventilation'] %}{% set ns.error = true %}{% endif %}`
    );
  }

  private _detectElectrification(
    entities: EntityInfo[],
    batteryHealth?: string,
    batteryCharge?: string,
    charging?: string,
    electricRange?: string,
    fuel?: string
  ): 'bev' | 'phev' | 'mhev' | 'ice' {
    const has48v = this._is48vEntity(batteryHealth) ||
      entities.some((entity) => this._is48vEntity(entity.entity_id) || this._is48vEntity(entity.name));

    const chargeLooksHybrid = this._isHybridBatteryChargeEntity(batteryCharge);
    const electricSignal = Boolean(charging || electricRange || (!chargeLooksHybrid && batteryCharge)) ||
      Boolean(
        this._findEntity(
          entities,
          ['sensor', 'binary_sensor'],
          [
            'electric range',
            'ev range',
            'charging',
            'charge',
            'charging port',
            'traction battery',
            'high voltage',
            'hv battery',
            'electric engine',
            'state of energy'
          ],
          new Set()
        )
      );

    const hasFuel = Boolean(fuel) || Boolean(
      this._findEntity(entities, ['sensor'], ['fuel', 'tank', 'kraftstoff', 'tank level'], new Set())
    );

    if (electricSignal) return hasFuel ? 'phev' : 'bev';
    if (has48v) return 'mhev';
    return 'ice';
  }

  private _is48vEntity(value?: string): boolean {
    if (!value) return false;
    return this._normalizeText(value).includes('48v');
  }

  private _isHybridBatteryChargeEntity(value?: string): boolean {
    if (!value) return false;
    const text = this._normalizeText(value);
    return (
      text.includes('48v') ||
      text.includes('12v') ||
      text.includes('trip') ||
      text.includes('end_of_trip') ||
      text.includes('end of trip') ||
      text.includes('bei ankunft') ||
      text.includes('ankunft') ||
      text.includes('arrival') ||
      text.includes('trip_battery') ||
      text.includes('charge level at end of trip')
    );
  }

  private _selectBestBatteryCharge(entities: EntityInfo[], keywords: string[]): string | undefined {
    const candidates = this._findEntities(entities, ['sensor'], keywords, new Set());
    if (!candidates.length) return undefined;
    const scored = candidates.map((entity) => {
      const text = this._normalizeText(`${entity.entity_id} ${entity.name} ${entity.device_class ?? ''}`);
      let score = 0;
      if (!this._isUnknownState(entity.state)) score += 5;
      if (text.includes('trip') || text.includes('end_of_trip') || text.includes('end of trip')) score += 3;
      if (text.includes('bei ankunft') || text.includes('ankunft') || text.includes('arrival')) score += 3;
      if (text.includes('predicted')) score -= 2;
      return { entity: entity.entity_id, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.entity;
  }

  private _isEntityUnavailable(entities: EntityInfo[], entityId?: string): boolean {
    if (!entityId) return true;
    const entity = entities.find((entry) => entry.entity_id === entityId);
    if (!entity) return true;
    return this._isUnknownState(entity.state);
  }

  private _isUnknownState(state?: string): boolean {
    if (!state) return true;
    const normalized = this._normalizeText(state);
    return ['unknown', 'unavailable', 'none', '-'].includes(normalized);
  }

  private _buildPwfStatusIconTemplate(entityId: string): string {
    return (
      `{% set s = states('${entityId}') | lower %}` +
      `{{ iif('driving' in s or 'fahrt' in s, 'mdi:car-sports', ` +
      `iif('parking' in s or 'parked' in s or 'parken' in s, 'mdi:parking', ` +
      `iif('standing' in s or 'stand' in s, 'mdi:car-brake-hold', 'mdi:car'))) }}`
    );
  }

  private _buildAlarmArmingIconTemplate(entityId: string): string {
    return (
      `{% set s = states('${entityId}') | lower %}` +
      `{{ iif(s == 'unarmed', 'mdi:shield-off', ` +
      `iif(s == 'doorsonly', 'mdi:car-door-lock', ` +
      `iif(s == 'doorstiltcabin', 'mdi:shield-car', 'mdi:shield-lock'))) }}`
    );
  }

  private _buildTirePairs(actuals: string[], targets: string[]): { pairs: Array<{ a: string; t: string }>; fallback: string[] } {
    const targetByKey = new Map<string, string>();
    targets.forEach((entityId) => {
      const key = this._tirePositionKey(entityId);
      if (key) targetByKey.set(key, entityId);
    });
    const pairs: Array<{ a: string; t: string }> = [];
    const fallback: string[] = [];
    actuals.forEach((entityId) => {
      const key = this._tirePositionKey(entityId);
      if (!key) return;
      const target = targetByKey.get(key);
      if (target) {
        pairs.push({ a: entityId, t: target });
      } else {
        fallback.push(entityId);
      }
    });
    return { pairs, fallback };
  }

  private _buildLowFuelColorTemplate(entityId: string): string {
    return `{% set v = states('${entityId}') | float(0) %}{{ iif(v > 0 and v < 10, 'var(--error-color)', 'var(--primary-color)') }}`;
  }

  private _buildBatteryHealthColorTemplate(entityId: string): string {
    return `{% set v = states('${entityId}') | float(0) %}{{ iif(v < 80, 'var(--error-color)', iif(v < 90, 'var(--warning-color)', 'var(--success-color)')) }}`;
  }

  private _buildStatusBadges(): Array<{ label: string; level: 'warning' | 'alert' }> {
    if (!this.hass || !this._statusEntities) return [];
    const badges: Array<{ label: string; level: 'warning' | 'alert' }> = [];

    const fuelEntity = this._statusEntities.fuel;
    if (fuelEntity) {
      const stateObj = this.hass.states[fuelEntity];
      const value = Number(stateObj?.state);
      const unit = stateObj?.attributes?.unit_of_measurement;
      if (!Number.isNaN(value)) {
        const lowFuel = unit === '%' ? value <= 15 : value <= 10;
        if (lowFuel) {
          badges.push({ label: 'Tank niedrig', level: 'warning' });
        }
      }
    }

    const tireBad = this._hasLowTirePressure();
    if (tireBad) {
      badges.push({ label: 'Reifendruck niedrig', level: 'alert' });
    }

    const doorsOpenWhileParked = this._hasDoorsOpenWhileParked();
    if (doorsOpenWhileParked) {
      badges.push({ label: 'Öffnungen offen', level: 'warning' });
    }

    return badges;
  }

  private _hasLowTirePressure(): boolean {
    if (!this.hass || !this._statusEntities) return false;
    const actuals = this._statusEntities.tires || [];
    const targets = this._statusEntities.tireTargets || [];
    if (!actuals.length) return false;

    const targetMap = new Map<string, number>();
    targets.forEach((entityId) => {
      const state = this.hass.states[entityId]?.state;
      const value = Number(state);
      if (!Number.isNaN(value)) {
        const key = this._tirePositionKey(entityId);
        if (key) targetMap.set(key, value);
      }
    });

    return actuals.some((entityId) => {
      const state = this.hass.states[entityId]?.state;
      const value = Number(state);
      if (Number.isNaN(value)) return false;
      const key = this._tirePositionKey(entityId);
      const target = key ? targetMap.get(key) : undefined;
      if (target !== undefined) return value < target * 0.9;
      return value < 200;
    });
  }

  private _tirePositionKey(entityId: string): string | undefined {
    const text = this._normalizeText(entityId);
    if (text.includes('front') && text.includes('left')) return 'front_left';
    if (text.includes('front') && text.includes('right')) return 'front_right';
    if (text.includes('rear') && text.includes('left')) return 'rear_left';
    if (text.includes('rear') && text.includes('right')) return 'rear_right';
    return undefined;
  }

  private _hasDoorsOpenWhileParked(): boolean {
    if (!this.hass || !this._statusEntities) return false;
    const status = this._getVehicleStatusLabel();
    if (status !== 'parked' && status !== 'standing') return false;
    const doors = this._statusEntities.doors || [];
    return doors.some((entityId) => {
      const state = this.hass.states[entityId]?.state;
      if (!state) return false;
      const normalized = this._normalizeText(state);
      return ![
        'closed',
        'geschlossen',
        'secured',
        'gesichert',
        'locked',
        'verriegelt',
        'ok',
        'aus'
      ].some((token) => normalized.includes(token));
    });
  }

  protected render() {
    if (this._error) {
      return html`
        <ha-card>
          <div class="message error">${this._error}</div>
        </ha-card>
      `;
    }

    if (this._config?.debug && this._vehicleConfig) {
      return html`
        <ha-card>
          <div class="message">
            <strong>Debug: vehicle-status-card config</strong>
            <pre>${this._toYaml(this._vehicleConfig)}</pre>
          </div>
        </ha-card>
      `;
    }

    if (!customElements.get(VEHICLE_CARD_NAME)) {
      return html`
        <ha-card>
          <div class="message">
            Fahrzeugkarte <strong>vehicle-status-card</strong> ist nicht geladen. Installiere die Karte oder setze
            <strong>vehicle_status_card_resource</strong>.
          </div>
        </ha-card>
      `;
    }

    if (!this._vehicleConfig) {
      return html`
        <ha-card>
          <div class="message">BMW Status Card wird vorbereitet…</div>
        </ha-card>
      `;
    }

    return html`
      <div class="card-wrapper">
        <vehicle-status-card></vehicle-status-card>
      </div>
    `;
  }
}

class BMWStatusCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _bmwHomeEntity: { state: true },
    _bmwCardataEntity: { state: true },
    _bmwHomeEntities: { state: true },
    _bmwCardataEntities: { state: true },
    _aiTaskEntities: { state: true },
    _editorError: { state: true },
    _geminiModels: { state: true },
    _geminiModelsLoading: { state: true },
    _geminiModelsError: { state: true },
    _openAiModels: { state: true },
    _openAiModelsLoading: { state: true },
    _openAiModelsError: { state: true }
  };

  private _hass?: HomeAssistant;
  private _config?: BMWStatusCardConfig;
  private _bmwHomeEntity?: string;
  private _bmwCardataEntity?: string;
  private _bmwHomeEntities?: string[];
  private _bmwCardataEntities?: string[];
  private _aiTaskEntities?: string[];
  private _editorError?: string;
  private _geminiModels?: string[];
  private _geminiModelsLoading = false;
  private _geminiModelsError?: string;
  private _geminiModelsKey?: string;
  private _geminiModelsTimer?: number;
  private _openAiModels?: string[];
  private _openAiModelsLoading = false;
  private _openAiModelsError?: string;
  private _openAiModelsKey?: string;
  private _openAiModelsTimer?: number;
  private static _errorHooked = false;

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._ensureHaComponents();
    this._loadIntegrationEntities();
    if (!BMWStatusCardEditor._errorHooked) {
      BMWStatusCardEditor._errorHooked = true;
      window.addEventListener('error', (event) => {
        // eslint-disable-next-line no-console
        console.error('[bmw-status-card] Window error:', event.error || event.message || event);
      });
      window.addEventListener('unhandledrejection', (event) => {
        // eslint-disable-next-line no-console
        console.error('[bmw-status-card] Unhandled rejection:', event.reason);
      });
    }
  }

  public get hass(): HomeAssistant {
    return this._hass as HomeAssistant;
  }

  public setConfig(config: BMWStatusCardConfig): void {
    const aiEntity =
      config.image?.ai?.ha_entity_id ||
      (config.image?.ai as any)?.entity_id ||
      (config.image?.ai as any)?.ai_task_entity ||
      (config.image?.ai as any)?.entity ||
      (config.image?.ai as any)?.task_entity;
    const normalizedProvider = config.image?.mode === 'ai'
      ? config.image?.ai?.provider || 'ha_ai_task'
      : config.image?.ai?.provider;
    this._config = {
      ...config,
      type: config.type || `custom:${CARD_NAME}`,
      image: config.image?.ai
        ? {
            ...config.image,
            mode: config.image.mode || 'ai',
            ai: { ...config.image.ai, provider: normalizedProvider, ha_entity_id: aiEntity || config.image.ai.ha_entity_id }
          }
        : config.image
    };
    this._maybeLoadGeminiModels();
    this._maybeLoadOpenAiModels();
  }

  private _ensureHaComponents(): void {
    if (!customElements.get('ha-entity-picker')) {
      (customElements.get('hui-entities-card') as any)?.getConfigElement?.();
    }
  }

  private async _loadIntegrationEntities(): Promise<void> {
    if (!this.hass) return;
    try {
      const entries = (await this.hass.callWS({ type: 'config/entity_registry/list' })) as EntityRegistryEntry[];
      const homeEntities = entries
        .filter((entry) => entry.platform === 'bmw_home')
        .map((entry) => entry.entity_id)
        .sort();
      const cardataEntities = entries
        .filter((entry) => entry.platform === 'cardata')
        .map((entry) => entry.entity_id)
        .sort();
      const registryAiTask = entries
        .filter((entry) => entry.entity_id.includes('ai_task'))
        .map((entry) => entry.entity_id);
      const stateAiTask = Object.keys(this.hass.states || {}).filter((entityId) => entityId.includes('ai_task'));
      const aiTaskEntities = Array.from(new Set([...registryAiTask, ...stateAiTask])).sort();
      this._bmwHomeEntities = homeEntities;
      this._bmwCardataEntities = cardataEntities;
      this._aiTaskEntities = aiTaskEntities;
    } catch (_) {
      // ignore lookup errors
    }
  }

  static styles = css`
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
  `;

  private _setEditorError(err: unknown): void {
    const message = err instanceof Error ? `${err.message}\n${err.stack || ''}` : String(err);
    this._editorError = message;
    // Surface in browser console
    // eslint-disable-next-line no-console
    console.error('[bmw-status-card] Editor error:', err);
  }

  private _emitConfigChanged(): void {
    if (!this._config) return;
    const safeConfig: BMWStatusCardConfig = {
      ...this._config,
      type: this._config.type || `custom:${CARD_NAME}`
    };
    try {
      // eslint-disable-next-line no-console
      console.debug('[bmw-status-card] config-changed', safeConfig);
      this.dispatchEvent(
        new CustomEvent('config-changed', {
          detail: { config: safeConfig },
          bubbles: true,
          composed: true
        })
      );
      this._editorError = undefined;
    } catch (err) {
      this._setEditorError(err);
    }
  }

  private _setConfigValue(path: string, value: any): void {
    if (!this._config) return;
    try {
      const keys = path.split('.');
      const stack: any[] = [];
      let obj: any = { ...this._config };
      let cursor = obj;
      for (let i = 0; i < keys.length - 1; i += 1) {
        const key = keys[i];
        stack.push({ parent: cursor, key });
        cursor[key] = { ...(cursor[key] || {}) };
        cursor = cursor[key];
      }
      const lastKey = keys[keys.length - 1];
      if (value === '' || value === undefined || value === null) {
        delete cursor[lastKey];
      } else {
        cursor[lastKey] = value;
      }

      if (path !== 'image.ai.generate_request_id') {
        if (obj.image?.ai?.generate_request_id) {
          delete obj.image.ai.generate_request_id;
        }
      }

      // cleanup empty objects
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        const { parent, key } = stack[i];
        if (parent[key] && Object.keys(parent[key]).length === 0) {
          delete parent[key];
        }
      }

      this._config = obj as BMWStatusCardConfig;
      this._emitConfigChanged();
      this._maybeLoadGeminiModels(path, value);
      this._maybeLoadOpenAiModels(path, value);
    } catch (err) {
      this._setEditorError(err);
    }
  }

  private _onValueChanged(ev: CustomEvent): void {
    const target = ev.target as any;
    const path = target?.dataset?.path;
    if (!path) return;
    this._setConfigValue(path, target.value);
  }

  private _onImageModeChanged(ev: CustomEvent): void {
    const target = ev.currentTarget as any;
    const value = (ev.detail?.value ?? target?.value) as 'off' | 'static' | 'ai';
    if (!value || !['off', 'static', 'ai'].includes(value)) return;
    // eslint-disable-next-line no-console
    console.debug('[bmw-status-card] image mode changed:', value);
    if (!this._config) return;
    const config = { ...this._config };
    if (value === 'off') {
      delete config.image;
    } else if (value === 'static') {
      config.image = { ...(config.image || {}), mode: 'static', static_urls: config.image?.static_urls || [] };
    } else {
      config.image = { ...(config.image || {}), mode: 'ai', ai: config.image?.ai || {} };
    }
    this._config = config;
    this._emitConfigChanged();
  }

  private _onSelectChanged(ev: CustomEvent): void {
    const target = ev.currentTarget as any;
    const path = target?.dataset?.path;
    if (!path) return;
    const value = ev.detail?.value ?? target?.value;
    this._setConfigValue(path, value);
  }

  private _normalizeEntityId(value?: string | string[] | null): string | undefined {
    if (!value) return undefined;
    if (Array.isArray(value)) {
      const first = value.length ? String(value[0]).trim() : '';
      return this._normalizeEntityId(first);
    }
    if (typeof value === 'object') {
      const candidate = (value as any).entity_id ?? (value as any).entityId;
      return this._normalizeEntityId(candidate as any);
    }
    const trimmed = String(value).trim();
    if (!trimmed) return undefined;
    if (trimmed.includes(',')) {
      const first = trimmed.split(',')[0].trim();
      return this._normalizeEntityId(first);
    }
    if (!trimmed.includes('.') || /\s/.test(trimmed)) return undefined;
    return trimmed;
  }

  private _onToggleChanged(ev: Event): void {
    const target = ev.currentTarget as any;
    const path = target?.dataset?.path;
    if (!path) return;
    this._setConfigValue(path, Boolean(target?.checked));
  }

  private _maybeLoadGeminiModels(changedPath?: string, changedValue?: any): void {
    const provider = this._config?.image?.ai?.provider || 'openai';
    if (provider !== 'gemini') return;
    const apiKey =
      changedPath === 'image.ai.api_key'
        ? String(changedValue || '')
        : String(this._config?.image?.ai?.api_key || '');

    if (!apiKey || apiKey.length < 20) return;
    if (this._geminiModelsLoading) return;
    if (this._geminiModelsKey === apiKey && this._geminiModels?.length) return;

    if (this._geminiModelsTimer) {
      window.clearTimeout(this._geminiModelsTimer);
    }
    this._geminiModelsTimer = window.setTimeout(() => {
      this._loadGeminiModels(apiKey);
    }, 400);
  }

  private _maybeLoadOpenAiModels(changedPath?: string, changedValue?: any): void {
    const provider = this._config?.image?.ai?.provider || 'openai';
    if (provider !== 'openai') return;
    const apiKey =
      changedPath === 'image.ai.api_key'
        ? String(changedValue || '')
        : String(this._config?.image?.ai?.api_key || '');

    if (!apiKey || apiKey.length < 20) return;
    if (this._openAiModelsLoading) return;
    if (this._openAiModelsKey === apiKey && this._openAiModels?.length) return;

    if (this._openAiModelsTimer) {
      window.clearTimeout(this._openAiModelsTimer);
    }
    this._openAiModelsTimer = window.setTimeout(() => {
      this._loadOpenAiModels(apiKey);
    }, 400);
  }

  private async _loadOpenAiModels(apiKey: string): Promise<void> {
    this._openAiModelsLoading = true;
    this._openAiModelsError = undefined;
    this._openAiModelsKey = apiKey;
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`OpenAI ListModels Fehler: ${response.status} ${text}`);
      }
      const data = await response.json();
      const models = (data?.data || []) as Array<{ id?: string }>;
      const supported = models
        .map((model) => model.id || '')
        .filter(Boolean)
        .filter((id) => /(image|dall-e|gpt-image)/i.test(id))
        .sort();

      this._openAiModels = supported;
    } catch (err: any) {
      this._openAiModelsError = err?.message || String(err);
      this._openAiModels = undefined;
      // eslint-disable-next-line no-console
      console.warn('[bmw-status-card] OpenAI ListModels fehlgeschlagen:', err);
    } finally {
      this._openAiModelsLoading = false;
      this.requestUpdate();
    }
  }

  private async _loadGeminiModels(apiKey: string): Promise<void> {
    this._geminiModelsLoading = true;
    this._geminiModelsError = undefined;
    this._geminiModelsKey = apiKey;
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`ListModels Fehler: ${response.status} ${text}`);
      }
      const data = await response.json();
      const models = (data?.models || []) as Array<{ name?: string; supportedGenerationMethods?: string[] }>;
      const supported = models
        .filter((model) => (model.supportedGenerationMethods || []).includes('generateContent'))
        .map((model) => model.name || '')
        .filter(Boolean)
        .map((name) => name.replace(/^models\//, ''))
        .filter(Boolean)
        .sort();

      this._geminiModels = supported;
    } catch (err: any) {
      this._geminiModelsError = err?.message || String(err);
      this._geminiModels = undefined;
      // eslint-disable-next-line no-console
      console.warn('[bmw-status-card] Gemini ListModels fehlgeschlagen:', err);
    } finally {
      this._geminiModelsLoading = false;
      this.requestUpdate();
    }
  }

  private _onListChanged(ev: CustomEvent): void {
    const target = ev.target as any;
    const path = target?.dataset?.path;
    if (!path) return;
    const raw = (target.value as string) || '';
    const list = raw
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    this._setConfigValue(path, list.length ? list : undefined);
  }

  private async _resolveDeviceIdFromEntity(entityId: string, targetKey: string): Promise<void> {
    if (!this.hass) return;
    try {
      const entry = await this.hass.callWS({ type: 'config/entity_registry/get', entity_id: entityId });
      if (entry?.device_id) {
        this._setConfigValue(targetKey, entry.device_id);
      }
    } catch (_) {
      // ignore lookup errors
    }
  }

  private async _onEntityPicked(ev: CustomEvent): Promise<void> {
    const target = ev.target as any;
    const entityId = ev.detail?.value ?? target?.value;
    const targetKey = target?.dataset?.target;
    if (!entityId || !targetKey) return;
    if (targetKey === 'bmw_home_device_id') {
      this._bmwHomeEntity = entityId;
    } else if (targetKey === 'bmw_cardata_device_id') {
      this._bmwCardataEntity = entityId;
    }
    await this._resolveDeviceIdFromEntity(entityId, targetKey);
  }

  protected render() {
    if (!this._config) return html``;

    const imageMode = this._config.image?.mode || 'off';
    const ai = this._config.image?.ai || {};
    const aiProvider = ai.provider || 'ha_ai_task';
    const aiTaskOptions = (this._aiTaskEntities || []).filter((entityId) => entityId.startsWith('ai_task.'));
    const aiTaskRaw =
      ai.ha_entity_id ||
      (ai as any).entity_id ||
      (ai as any).ai_task_entity ||
      (ai as any).entity ||
      (ai as any).task_entity;
    const aiTaskValue =
      this._normalizeEntityId(aiTaskRaw) ||
      (typeof aiTaskRaw === 'string' ? aiTaskRaw.trim() : '') ||
      '';
    const aiTaskOptionsWithValue = aiTaskValue && !aiTaskOptions.includes(aiTaskValue)
      ? [aiTaskValue, ...aiTaskOptions]
      : aiTaskOptions;
    const onDemand = ai.generate_on_demand !== false;
    const uploadEnabled = ai.upload ?? (aiProvider === 'openai' || aiProvider === 'gemini' || aiProvider === 'ha_ai_task');
    try {
      return html`
        <div class="form">
          ${this._editorError ? html`<div class="error">${this._editorError}</div>` : null}
          <ha-alert alert-type="info">Benötigt bmw_home und bmw-cardata-ha Geräte-IDs.</ha-alert>

          <div class="row">
            <ha-textfield
              label="bmw_home Geräte-ID"
              .value=${this._config.bmw_home_device_id || ''}
              data-path="bmw_home_device_id"
              @input=${this._onValueChanged}
            ></ha-textfield>
            <ha-textfield
              label="bmw-cardata-ha Geräte-ID"
              .value=${this._config.bmw_cardata_device_id || ''}
              data-path="bmw_cardata_device_id"
              @input=${this._onValueChanged}
            ></ha-textfield>
          </div>

          <div class="row">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._bmwHomeEntity || ''}
              .includeEntities=${this._bmwHomeEntities || []}
              data-target="bmw_home_device_id"
              @value-changed=${this._onEntityPicked}
              label="bmw_home Entity (optional, gefiltert)"
              allow-custom-entity
            ></ha-entity-picker>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._bmwCardataEntity || ''}
              .includeEntities=${this._bmwCardataEntities || []}
              data-target="bmw_cardata_device_id"
              @value-changed=${this._onEntityPicked}
              label="bmw-cardata-ha Entity (optional, gefiltert)"
              allow-custom-entity
            ></ha-entity-picker>
          </div>

          <div class="row">
            <ha-textfield
              label="vehicle-status-card Resource (optional)"
              .value=${this._config.vehicle_status_card_resource || ''}
              data-path="vehicle_status_card_resource"
              @input=${this._onValueChanged}
            ></ha-textfield>
            <ha-textfield
              label="MapTiler API Key (optional)"
              .value=${this._config.maptiler_api_key || ''}
              data-path="maptiler_api_key"
              @input=${this._onValueChanged}
            ></ha-textfield>
          </div>
          <div class="row">
            <ha-textfield
              label="Kennzeichen (optional)"
              .value=${this._config.vehicle_info?.license_plate || ''}
              data-path="vehicle_info.license_plate"
              @input=${this._onValueChanged}
            ></ha-textfield>
          </div>
          <div class="row">
            <div class="field">
              <label class="hint">MapTiler Theme</label>
              <select
                data-path="maptiler_style"
                @change=${(ev: Event) => this._onSelectChanged(ev as any)}
                .value=${this._config.maptiler_style || 'streets'}
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
            <select @change=${(ev: Event) => this._onImageModeChanged(ev as any)} .value=${imageMode}>
              <option value="off">off (keine Bilder)</option>
              <option value="static">static (URLs)</option>
              <option value="ai">ai (OpenAI/Gemini/Custom)</option>
            </select>
          </div>
          <div class="hint">Pflicht: keine. Optional: Bilder über AI oder feste URLs.</div>

          ${imageMode === 'static'
            ? html`
                <ha-textarea
                  label="Statische Bild-URLs (kommagetrennt, optional)"
                  .value=${(this._config.image?.static_urls || []).join(', ')}
                  data-path="image.static_urls"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Beispiel: https://.../front.jpg, https://.../rear.jpg</div>
              `
            : null}

          ${imageMode === 'ai'
            ? html`
                <div class="row">
                  <div class="field">
                    <label class="hint">AI Provider</label>
                    <select
                      data-path="image.ai.provider"
                      @change=${(ev: Event) => this._onSelectChanged(ev as any)}
                      .value=${aiProvider}
                    >
                      <option value="openai">OpenAI</option>
                      <option value="gemini">Gemini (Imagen)</option>
                      <option value="ha_ai_task">Home Assistant (ai_task)</option>
                      <option value="generic">Generic Endpoint</option>
                    </select>
                  </div>
                  ${aiProvider === 'openai' || aiProvider === 'gemini'
                    ? html`
                        <ha-textfield
                          label="AI API Key (erforderlich für OpenAI/Gemini)"
                          .value=${ai.api_key || ''}
                          data-path="image.ai.api_key"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      `
                    : null}
                </div>
                <div class="actions">
                  <ha-button
                    raised
                    @click=${() =>
                      this._setConfigValue('image.ai.generate_request_id', String(Date.now()))}
                  >Generate Images</ha-button>
                  ${onDemand
                    ? html`<div class="hint">Bilder werden nur nach Klick generiert (Cache aktiv).</div>`
                    : html`<div class="hint">Auto-Generierung aktiv.</div>`}
                </div>
                ${aiProvider === 'ha_ai_task'
                  ? html`
                      <div class="hint">Nutze Home Assistant ai_task.generate_image und erhalte Media-URLs.</div>
                      <div class="field">
                        <label class="hint">ai_task Entity (optional)</label>
                        <ha-entity-picker
                          .hass=${this.hass}
                          .value=${aiTaskValue}
                          .includeEntities=${aiTaskOptions}
                          data-path="image.ai.ha_entity_id"
                          @value-changed=${this._onSelectChanged}
                          allow-custom-entity
                        ></ha-entity-picker>
                      </div>
                      ${aiTaskOptionsWithValue.length === 0
                        ? html`<div class="hint">Keine ai_task Entities gefunden.</div>`
                        : null}
                    `
                  : null}
                ${aiProvider === 'openai' || aiProvider === 'gemini' || aiProvider === 'ha_ai_task'
                  ? html`
                      <div class="row">
                        <div class="field">
                          <label class="hint">Bilder via upload_file speichern</label>
                          <ha-switch
                            .checked=${uploadEnabled}
                            data-path="image.ai.upload"
                            @change=${this._onToggleChanged}
                          ></ha-switch>
                        </div>
                        <div class="field">
                          <label class="hint">Prompt/Modell als Metadaten speichern</label>
                          <ha-switch
                            .checked=${ai.tag_metadata === true}
                            data-path="image.ai.tag_metadata"
                            @change=${this._onToggleChanged}
                          ></ha-switch>
                        </div>
                        ${uploadEnabled
                          ? html`
                              <ha-textfield
                                label="Upload Pfad (relativ zu /config)"
                                .value=${ai.upload_path || 'www/upload_file'}
                                data-path="image.ai.upload_path"
                                @input=${this._onValueChanged}
                              ></ha-textfield>
                            `
                          : null}
                      </div>
                      <div class="hint">
                        Benötigt die Integration <strong>upload_file</strong>.
                      </div>
                      <div class="hint">
                        Speichert eine <code>.meta.json</code> Datei je Bild im Upload-Pfad.
                      </div>
                    `
                  : null}
                ${aiProvider !== 'generic'
                  ? html`
                      <div class="row">
                        ${aiProvider === 'gemini' && this._geminiModels?.length
                          ? html`
                              <div class="field">
                                <label class="hint">Gemini Model (aus ListModels)</label>
                                <select
                                  data-path="image.ai.model"
                                  @change=${(ev: Event) => this._onSelectChanged(ev as any)}
                                  .value=${ai.model || ''}
                                >
                                  <option value="">Auto (Standard)</option>
                                  ${this._geminiModels.map(
                                    (model) => html`<option value=${model}>${model}</option>`
                                  )}
                                </select>
                              </div>
                            `
                          : aiProvider === 'openai' && this._openAiModels?.length
                            ? html`
                                <div class="field">
                                  <label class="hint">OpenAI Model (gefiltert)</label>
                                  <select
                                    data-path="image.ai.model"
                                    @change=${(ev: Event) => this._onSelectChanged(ev as any)}
                                    .value=${ai.model || ''}
                                  >
                                    <option value="">Auto (Standard)</option>
                                    ${this._openAiModels.map(
                                      (model) => html`<option value=${model}>${model}</option>`
                                    )}
                                  </select>
                                </div>
                              `
                            : html`
                                <ha-textfield
                                  label="AI Model (optional)"
                                  .value=${ai.model || ''}
                                  placeholder="OpenAI: gpt-image-1 | Gemini: imagen-3.0-generate-002"
                                  data-path="image.ai.model"
                                  @input=${this._onValueChanged}
                                ></ha-textfield>
                              `}
                        ${aiProvider === 'openai'
                          ? html`
                              <div class="field">
                                <label class="hint">Bildgröße (OpenAI)</label>
                                <select
                                  data-path="image.ai.size"
                                  @change=${(ev: Event) => this._onSelectChanged(ev as any)}
                                  .value=${ai.size || '1024x1024'}
                                >
                                  <option value="1024x1024">1024x1024</option>
                                  <option value="1792x1024">1792x1024</option>
                                  <option value="1024x1792">1024x1792</option>
                                </select>
                              </div>
                            `
                          : null}
                      </div>
                    `
                  : html`
                      <div class="row">
                        <ha-textfield
                          label="AI Endpoint (erforderlich)"
                          .value=${ai.endpoint || ''}
                          data-path="image.ai.endpoint"
                          @input=${this._onValueChanged}
                        ></ha-textfield>
                      </div>
                    `}
                ${aiProvider === 'gemini' && this._geminiModelsLoading
                  ? html`<div class="hint">Lade Gemini-Modelle…</div>`
                  : null}
                ${aiProvider === 'gemini' && this._geminiModelsError
                  ? html`<div class="hint">${this._geminiModelsError}</div>`
                  : null}
                ${aiProvider === 'openai' && this._openAiModelsLoading
                  ? html`<div class="hint">Lade OpenAI-Modelle…</div>`
                  : null}
                ${aiProvider === 'openai' && this._openAiModelsError
                  ? html`<div class="hint">${this._openAiModelsError}</div>`
                  : null}
                <div class="row">
                  ${aiProvider === 'gemini'
                    ? html`
                        <div class="field">
                          <label class="hint">Aspect Ratio (Gemini)</label>
                          <select
                            data-path="image.ai.aspect_ratio"
                            @change=${(ev: Event) => this._onSelectChanged(ev as any)}
                            .value=${ai.aspect_ratio || '1:1'}
                          >
                            <option value="1:1">1:1</option>
                            <option value="4:3">4:3</option>
                            <option value="3:4">3:4</option>
                            <option value="16:9">16:9</option>
                            <option value="9:16">9:16</option>
                          </select>
                        </div>
                      `
                    : null}
                  <ha-textfield
                    label="Anzahl pro Prompt"
                    .value=${ai.count ?? ''}
                    type="number"
                    placeholder="1"
                    data-path="image.ai.count"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                  <ha-textfield
                    label="Max Bilder (optional)"
                    .value=${ai.max_images ?? ''}
                    type="number"
                    placeholder="8"
                    data-path="image.ai.max_images"
                    @input=${this._onValueChanged}
                  ></ha-textfield>
                </div>
                <ha-textarea
                  label="Prompt Template (optional)"
                  .value=${ai.prompt_template || ''}
                  placeholder="High-quality photo of a {year} {color} {make} {model}, {angle}"
                  data-path="image.ai.prompt_template"
                  @input=${this._onValueChanged}
                ></ha-textarea>
                <div class="hint">Optional: nutze {angle} für Blickwinkel. Wenn leer, wird ein Default genutzt.</div>
                <ha-textarea
                  label="Views (kommagetrennt, optional)"
                  .value=${(ai.views || []).join(', ')}
                  placeholder="front 3/4 view, rear 3/4 view, side profile"
                  data-path="image.ai.views"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <ha-textarea
                  label="Prompts (kommagetrennt, optional)"
                  .value=${(ai.prompts || []).join(', ')}
                  placeholder="Eigene Prompts überschreiben views"
                  data-path="image.ai.prompts"
                  @input=${this._onListChanged}
                ></ha-textarea>
                <div class="hint">Optional: Bei Prompts wird {angle} ignoriert, Views sind dann optional.</div>
              `
            : null}
        </div>
      `;
    } catch (err) {
      this._setEditorError(err);
      return html`<div class="error">${this._editorError}</div>`;
    }
  }
}

customElements.define(CARD_NAME, BMWStatusCard);
customElements.define('bmw-status-card-editor', BMWStatusCardEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_NAME,
  name: 'BMW Status Card',
  description: 'Auto-Konfiguration für bmw_home + bmw-cardata-ha, basiert auf vehicle-status-card.',
  version: VERSION
});
