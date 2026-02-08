import { LitElement, css, html } from 'lit';

const CARD_NAME = 'bmw-status-card';
const VEHICLE_CARD_NAME = 'vehicle-status-card';
const VERSION = '0.1.19';

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
  prompt_template?: string;
  prompts?: string[];
  views?: string[];
  cache_hours?: number;
  generate_on_demand?: boolean;
  generate_request_id?: string;
  request_body?: Record<string, any>;
  response_path?: string;
};

type ImageConfig = {
  mode?: 'ai' | 'static' | 'off';
  static_urls?: string[];
  ai?: ImageAiConfig;
};

type BMWStatusCardConfig = {
  type: string;
  bmw_home_device_id: string;
  bmw_cardata_device_id: string;
  vehicle_status_card?: Record<string, any>;
  maptiler_api_key?: string;
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

  static styles = css`
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
    this._ensureConfig();
  }

  protected updated(): void {
    const vehicleCard = this.renderRoot.querySelector(VEHICLE_CARD_NAME) as any;
    if (vehicleCard && this.hass) {
      vehicleCard.hass = this.hass;
      if (this._vehicleConfig) {
        vehicleCard.setConfig(this._vehicleConfig);
      }
    }
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
    try {
      // eslint-disable-next-line no-console
      console.debug('[bmw-status-card] building config');
      const deviceIds = [this._config.bmw_home_device_id, this._config.bmw_cardata_device_id].filter(Boolean);
      const entityEntries = await this._getEntityRegistry();
      const deviceEntries = await this._getDeviceRegistry();

      const entities = this._buildEntityInfo(entityEntries, deviceIds);
      const vehicleInfo = this._buildVehicleInfo(deviceEntries, entities);
      this._vehicleInfo = vehicleInfo;

      const images = await this._resolveImages(vehicleInfo);
      const baseConfig = this._buildVehicleStatusCardConfig(entities, images);
      this._vehicleConfig = this._mergeVehicleConfig(baseConfig, this._config.vehicle_status_card);
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
      name: configInfo.name || attrInfo.name || name
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

  private async _generateAiImages(vehicleInfo: VehicleInfo, ai: ImageAiConfig): Promise<string[]> {
    const provider = ai.provider || 'ha_ai_task';
    const cacheHours = ai.cache_hours ?? 24;
    const cacheKey = this._buildImageCacheKey(vehicleInfo, ai);
    const prompts = this._buildPrompts(vehicleInfo, ai);
    const countPerPrompt = ai.count ?? 1;
    const maxImages = ai.max_images ?? 8;
    const onDemand = ai.generate_on_demand !== false;
    const uploadEnabled = ai.upload ?? (provider === 'openai' || provider === 'gemini');

    try {
      const cachedRaw = localStorage.getItem(cacheKey);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as { timestamp: number; images: string[] };
        const ageHours = (Date.now() - cached.timestamp) / 36e5;
        if (cached.images?.length && ageHours <= cacheHours) {
          return cached.images;
        }
      }
    } catch (_) {
      // ignore cache errors
    }

    if (onDemand && !ai.generate_request_id) {
      return [];
    }

    let images: string[] = [];

    for (const prompt of prompts) {
      if (images.length >= maxImages) break;
      const remaining = maxImages - images.length;
      const batchCount = Math.min(countPerPrompt, remaining);
      if (batchCount <= 0) break;

      if (provider === 'openai') {
        images.push(...(await this._fetchOpenAiImages(prompt, ai, batchCount)));
      } else if (provider === 'gemini') {
        images.push(...(await this._fetchGeminiImages(prompt, ai, batchCount)));
      } else if (provider === 'ha_ai_task') {
        images.push(...(await this._fetchHaAiTaskImages(prompt, ai, batchCount)));
      } else {
        images.push(...(await this._fetchGenericImages(prompt, ai, batchCount)));
      }
    }

    if (images.length) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), images }));
      } catch (_) {
        // ignore cache errors
      }
    }

    if (images.length && uploadEnabled) {
      images = await this._uploadImagesIfNeeded(images, ai);
    }

    return images;
  }

  private _buildPrompts(vehicleInfo: VehicleInfo, ai: ImageAiConfig): string[] {
    const baseTemplate = ai.prompt_template || defaultAiTemplate;
    if (ai.prompts && ai.prompts.length) {
      return ai.prompts.map((prompt) => this._buildPrompt(vehicleInfo, prompt));
    }

    const views = ai.views?.length
      ? ai.views
      : ['front 3/4 view', 'rear 3/4 view', 'side profile', 'front view', 'rear view'];

    return views.map((view) => this._buildPrompt(vehicleInfo, baseTemplate, view));
  }

  private _buildPrompt(vehicleInfo: VehicleInfo, template?: string, view?: string): string {
    const rawTemplate = template || defaultAiTemplate;
    const tokens: Record<string, string> = {
      '{make}': vehicleInfo.make || 'BMW',
      '{model}': vehicleInfo.model || '',
      '{series}': vehicleInfo.series || '',
      '{year}': vehicleInfo.year || '',
      '{color}': vehicleInfo.color || '',
      '{trim}': vehicleInfo.trim || '',
      '{body}': vehicleInfo.body || '',
      '{angle}': view || ''
    };

    let prompt = rawTemplate;
    Object.entries(tokens).forEach(([key, value]) => {
      const safeValue = value?.trim();
      prompt = prompt.replaceAll(key, safeValue || '');
    });

    if (view && !rawTemplate.includes('{angle}')) {
      prompt = `${prompt} ${view}`;
    }

    return prompt.replace(/\s+/g, ' ').trim();
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

    const baseData: Record<string, any> = {};
    if (ai.ha_entity_id) baseData.entity_id = ai.ha_entity_id;
    if (ai.model) baseData.model = ai.model;
    if (ai.size) baseData.size = ai.size;
    if (ai.aspect_ratio) baseData.aspect_ratio = ai.aspect_ratio;
    if (ai.request_body) {
      Object.assign(baseData, ai.request_body);
    }

    const taskName = this._vehicleInfo?.name || this._config?.vehicle_info?.name || 'BMW Status Card';

    const attempts: Array<Record<string, any>> = [
      { task_name: taskName, instructions: prompt },
      { task_name: taskName, instructions: prompt, n: count },
      { prompt, n: count },
      { prompt },
      { text: prompt, n: count },
      { text: prompt },
      { input: prompt, n: count },
      { input: prompt },
      { task: prompt, n: count },
      { task: prompt },
      { description: prompt, n: count },
      { description: prompt }
    ];

    let response: any;
    let lastError: any;
    for (const attempt of attempts) {
      try {
        response = await this.hass.callWS({
          type: 'call_service',
          domain: 'ai_task',
          service: 'generate_image',
          service_data: { ...baseData, ...attempt },
          return_response: true
        });
        lastError = undefined;
        break;
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!response) {
      throw new Error(`ai_task Fehler: ${lastError?.message || String(lastError)}`);
    }

    const payload = response?.response ?? response?.result ?? response;
    const urls = await this._extractHaAiTaskUrls(payload);
    return urls.filter(Boolean) as string[];
  }

  private async _uploadImagesIfNeeded(images: string[], ai: ImageAiConfig): Promise<string[]> {
    if (!this.hass) return images;

    const uploadPath = this._normalizeUploadPath(ai.upload_path);
    const results: string[] = [];

    for (const image of images) {
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
        } else {
          results.push(image);
          continue;
        }
      }

      const extension = this._guessImageExtension(url, mimeType);
      const hashInput = url || dataBase64 || image;
      const filename = `${this._hash(hashInput)}.${extension}`;

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
        results.push(localUrl || image);
      } catch (_) {
        results.push(image);
      }
    }

    return results;
  }

  private _normalizeUploadPath(rawPath?: string): string {
    const normalized = (rawPath || 'www/upload_file').replace(/^\/+/, '').replace(/\/+$/, '');
    return normalized.startsWith('www/') ? normalized : `www/${normalized}`;
  }

  private _parseDataUrl(value: string): { data: string; mimeType?: string } | null {
    if (!value.startsWith('data:')) return null;
    const match = value.match(/^data:([^;]+);base64,(.*)$/);
    if (!match) return null;
    return { mimeType: match[1], data: match[2] };
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

  private async _extractHaAiTaskUrls(payload: any): Promise<string[]> {
    if (!payload) return [];
    const candidates = payload?.images || payload?.data || payload?.results || payload?.result || payload;
    const items = Array.isArray(candidates) ? candidates : [candidates];
    const urls: string[] = [];

    for (const item of items) {
      if (!item) continue;
      if (typeof item === 'string') {
        urls.push(item);
        continue;
      }
      const url =
        item.url ||
        item.image_url ||
        item.media_url ||
        item.content_url ||
        item.media?.url ||
        item.image?.url;
      if (url) {
        urls.push(url);
        continue;
      }
      const mediaId = item.media_id || item.media_content_id || item.content_id || item.media;
      if (mediaId) {
        const resolved = await this._resolveMediaSourceUrl(String(mediaId));
        if (resolved) {
          urls.push(resolved);
        } else {
          urls.push(`/api/media/${mediaId}`);
        }
      }
    }

    return urls;
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

  private _buildVehicleStatusCardConfig(entities: EntityInfo[], images: string[]): Record<string, any> {
    const used = new Set<string>();

    const lock = this._pickEntity(entities, used, ['lock', 'binary_sensor', 'sensor'], ['lock', 'locked', 'door lock']);
    const charging = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], [
      'charging',
      'charge',
      'plugged',
      'plug',
      'charging port',
      'connector',
      'port'
    ]);
    const battery = this._pickEntity(entities, used, ['sensor'], [
      'battery',
      'soc',
      'state_of_charge',
      'state of charge',
      'state_of_energy',
      'soe'
    ]);
    const fuel = this._pickEntity(entities, used, ['sensor'], ['fuel', 'tank', 'fuel_level']);
    const range = this._pickEntity(entities, used, ['sensor'], ['range', 'remaining', 'remaining_range', 'remainingrange']);
    const electricRange = this._pickEntity(entities, used, ['sensor'], [
      'electric range',
      'ev range',
      'remaining electric range',
      'kombi remaining electric range'
    ]);
    const fuelRange = this._pickEntity(entities, used, ['sensor'], ['fuel range', 'remaining fuel', 'tank level']);
    const totalRange = this._pickEntity(entities, used, ['sensor'], ['total remaining range', 'total range']);
    const chargeTarget = this._pickEntity(entities, used, ['sensor', 'number'], [
      'target',
      'charge target',
      'target soc',
      'target state'
    ]);
    const odometer = this._pickEntity(entities, used, ['sensor'], ['odometer', 'mileage', 'distance', 'travelled']);
    const temperature = this._pickEntity(entities, used, ['sensor'], ['temperature', 'temp', 'coolant']);
    const chargingPower = this._pickEntity(entities, used, ['sensor'], [
      'charging power',
      'charge power',
      'power',
      'grid energy'
    ]);
    const chargingTime = this._pickEntity(entities, used, ['sensor'], [
      'time remaining',
      'time to fully',
      'time to full',
      'remaining time'
    ]);
    const preconditioning = this._pickEntity(entities, used, ['binary_sensor', 'sensor', 'switch'], [
      'preconditioning',
      'climatization',
      'climate',
      'hvac',
      'defrost'
    ]);
    const engine = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], ['engine', 'ignition']);
    const motion = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], ['moving', 'motion', 'driving', 'parking']);
    const alarm = this._pickEntity(entities, used, ['binary_sensor', 'sensor'], ['alarm', 'anti theft', 'anti-theft']);

    const rowMainItems: any[] = [];
    if (lock) rowMainItems.push({ type: 'entity', entity: lock, icon: 'mdi:lock' });
    if (charging) rowMainItems.push({ type: 'entity', entity: charging, icon: 'mdi:ev-station' });
    if (battery) rowMainItems.push({ type: 'entity', entity: battery, icon: 'mdi:battery' });
    if (fuel) rowMainItems.push({ type: 'entity', entity: fuel, icon: 'mdi:gas-station' });
    if (preconditioning) rowMainItems.push({ type: 'entity', entity: preconditioning, icon: 'mdi:car-defrost-front' });

    const rowInfoItems: any[] = [];
    if (electricRange || totalRange || range) {
      rowInfoItems.push({
        type: 'entity',
        entity: electricRange || totalRange || range,
        icon: 'mdi:map-marker-distance'
      });
    }
    if (odometer) rowInfoItems.push({ type: 'entity', entity: odometer, icon: 'mdi:counter' });
    if (temperature) rowInfoItems.push({ type: 'entity', entity: temperature, icon: 'mdi:thermometer' });
    if (chargingPower) rowInfoItems.push({ type: 'entity', entity: chargingPower, icon: 'mdi:flash' });
    if (chargingTime) rowInfoItems.push({ type: 'entity', entity: chargingTime, icon: 'mdi:timer' });
    if (engine) rowInfoItems.push({ type: 'entity', entity: engine, icon: 'mdi:engine' });
    if (motion) rowInfoItems.push({ type: 'entity', entity: motion, icon: 'mdi:car' });
    if (alarm) rowInfoItems.push({ type: 'entity', entity: alarm, icon: 'mdi:alarm-light' });

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
      'flap',
      'charging port',
      'port'
    ]);

    const tireEntities = this._pickEntities(entities, used, ['sensor'], [
      'tire',
      'tyre',
      'pressure',
      'wheel',
      'tpms',
      'pressure target'
    ]);
    const tireTempEntities = this._pickEntities(entities, used, ['sensor'], [
      'tire temperature',
      'tyre temperature',
      'wheel temperature'
    ]);
    const lightEntities = this._pickEntities(entities, used, ['binary_sensor', 'sensor', 'switch'], [
      'light',
      'lights',
      'headlight',
      'lamp',
      'running light'
    ]);
    const climateEntities = this._pickEntities(entities, used, ['binary_sensor', 'sensor', 'switch', 'climate'], [
      'climate',
      'hvac',
      'preconditioning',
      'defrost',
      'seat',
      'steering wheel',
      'air purification',
      'heater',
      'heating',
      'cooling'
    ]);
    const serviceEntities = this._pickEntities(entities, used, ['sensor', 'binary_sensor'], [
      'service',
      'inspection',
      'cbs',
      'check control',
      'maintenance'
    ]);
    const navigationEntities = this._pickEntities(entities, used, ['sensor', 'device_tracker'], [
      'navigation',
      'destination',
      'eta',
      'latitude',
      'longitude',
      'gps'
    ]);
    const chargingEntities = this._pickEntities(entities, used, ['sensor', 'binary_sensor', 'switch', 'number'], [
      'charging',
      'charge',
      'plug',
      'connector',
      'charging mode',
      'charging power',
      'time to fully',
      'charge target'
    ]);

    const indicator_rows: any[] = [];
    if (rowMainItems.length) {
      indicator_rows.push({ row_items: rowMainItems, alignment: 'center', no_wrap: true });
    }
    if (rowInfoItems.length) {
      indicator_rows.push({ row_items: rowInfoItems, alignment: 'center', no_wrap: true });
    }
    if (doorEntities.length || tireEntities.length) {
      const row_items: any[] = [];
      if (doorEntities.length) {
        row_items.push({
          type: 'group',
          name: 'Öffnungen',
          icon: 'mdi:car-door',
          items: doorEntities.map((entity) => ({ type: 'entity', entity }))
        });
      }
      const tireGroupItems = [...tireEntities, ...tireTempEntities];
      if (tireGroupItems.length) {
        row_items.push({
          type: 'group',
          name: 'Reifen',
          icon: 'mdi:car-tire-alert',
          items: tireGroupItems.map((entity) => ({ type: 'entity', entity }))
        });
      }
      if (row_items.length) {
        indicator_rows.push({ row_items, alignment: 'center', no_wrap: true });
      }
    }

    const extraGroups: any[] = [];
    if (chargingEntities.length) {
      extraGroups.push({
        type: 'group',
        name: 'Laden',
        icon: 'mdi:ev-station',
        items: chargingEntities.map((entity) => ({ type: 'entity', entity }))
      });
    }
    if (climateEntities.length) {
      extraGroups.push({
        type: 'group',
        name: 'Klima',
        icon: 'mdi:car-defrost-front',
        items: climateEntities.map((entity) => ({ type: 'entity', entity }))
      });
    }
    if (lightEntities.length) {
      extraGroups.push({
        type: 'group',
        name: 'Licht',
        icon: 'mdi:car-light-high',
        items: lightEntities.map((entity) => ({ type: 'entity', entity }))
      });
    }
    if (serviceEntities.length) {
      extraGroups.push({
        type: 'group',
        name: 'Service',
        icon: 'mdi:wrench',
        items: serviceEntities.map((entity) => ({ type: 'entity', entity }))
      });
    }
    if (navigationEntities.length) {
      extraGroups.push({
        type: 'group',
        name: 'Navigation',
        icon: 'mdi:navigation',
        items: navigationEntities.map((entity) => ({ type: 'entity', entity }))
      });
    }
    if (extraGroups.length) {
      indicator_rows.push({ row_items: extraGroups, alignment: 'center', no_wrap: true });
    }

    const range_info: any[] = [];
    if (battery) {
      range_info.push({
        energy_level: { entity: battery },
        range_level: electricRange || totalRange || range ? { entity: electricRange || totalRange || range } : undefined,
        charging_entity: charging || undefined,
        charge_target_entity: chargeTarget || undefined
      });
    }
    if (fuel) {
      range_info.push({
        energy_level: { entity: fuel },
        range_level: fuelRange || totalRange || range ? { entity: fuelRange || totalRange || range } : undefined
      });
    }
    if (!range_info.length && range) {
      range_info.push({
        energy_level: { entity: range }
      });
    }

    const deviceTrackers = entities.filter((entity) => entity.domain === 'device_tracker').map((e) => e.entity_id);
    const deviceTracker = deviceTrackers[0];

    const tireCard = this._buildTireCardConfig(entities);
    const buttonExclusions = new Set<string>(tireCard?.entities || []);

    const specialButtons: any[] = [];
    const statusItems: any[] = [];
    const serviceItems: any[] = [];

    const addItem = (items: any[], entity?: string, name?: string, icon?: string) => {
      if (!entity) return;
      items.push({ entity, name, icon });
    };

    addItem(statusItems, battery, 'Batterie', 'mdi:battery');
    addItem(statusItems, fuel, 'Kraftstoff', 'mdi:gas-station');
    addItem(statusItems, electricRange || totalRange || range, 'Reichweite', 'mdi:map-marker-distance');
    addItem(statusItems, odometer, 'Kilometerstand', 'mdi:counter');
    addItem(statusItems, temperature, 'Temperatur', 'mdi:thermometer');
    addItem(statusItems, chargingTime, 'Ladezeit', 'mdi:timer');
    addItem(statusItems, chargingPower, 'Ladeleistung', 'mdi:flash');

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

    if (chargingEntities.length) {
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
      specialButtons.push({
        name: 'Klima',
        icon: 'mdi:car-defrost-front',
        button_type: 'default',
        card_type: 'default',
        sub_card: {
          default_card: [
            {
              title: 'Klima',
              items: climateEntities.map((entity) => ({ entity }))
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
        single_tire_card: tireCard?.tire_card
          ? {
              enabled: true,
              tire_card: tireCard.tire_card
            }
          : undefined
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
    if (overrides.mini_map !== undefined) merged.mini_map = overrides.mini_map;
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
    const normalizedKeywords = keywords.map((k) => k.toLowerCase());
    return entities
      .filter((entity) => !used.has(entity.entity_id))
      .filter((entity) => (domains.length ? domains.includes(entity.domain) : true))
      .filter((entity) => {
        if (!normalizedKeywords.length) return true;
        const haystack = `${entity.entity_id} ${entity.name} ${entity.device_class ?? ''}`.toLowerCase();
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

  private _findEntityByKeywords(entities: EntityInfo[], keywords: string[]): string | undefined {
    return this._findEntity(entities, [], keywords, new Set())?.entity_id;
  }

  private _buildTireCardConfig(entities: EntityInfo[]): { tire_card: any; entities: string[] } | undefined {
    const match = (keywords: string[]) => this._findEntity(entities, ['sensor'], keywords, new Set());

    const frontLeft = match(['front left', 'front_left', 'row1 left', 'row1 wheel left']);
    const frontRight = match(['front right', 'front_right', 'row1 right', 'row1 wheel right']);
    const rearLeft = match(['rear left', 'rear_left', 'row2 left', 'row2 wheel left']);
    const rearRight = match(['rear right', 'rear_right', 'row2 right', 'row2 wheel right']);

    const entitiesUsed = [frontLeft, frontRight, rearLeft, rearRight]
      .filter(Boolean)
      .map((entry) => (entry as EntityInfo).entity_id);

    if (!entitiesUsed.length) return undefined;

    const tire_card = {
      title: 'Reifendruck',
      front_left: frontLeft ? { entity: frontLeft.entity_id, name: 'Vorne links' } : undefined,
      front_right: frontRight ? { entity: frontRight.entity_id, name: 'Vorne rechts' } : undefined,
      rear_left: rearLeft ? { entity: rearLeft.entity_id, name: 'Hinten links' } : undefined,
      rear_right: rearRight ? { entity: rearRight.entity_id, name: 'Hinten rechts' } : undefined
    };

    return { tire_card, entities: entitiesUsed };
  }

  protected render() {
    if (this._error) {
      return html`
        <ha-card>
          <div class="message error">${this._error}</div>
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

    return html`<vehicle-status-card></vehicle-status-card>`;
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
    this._config = { ...config, type: config.type || `custom:${CARD_NAME}` };
    this._maybeLoadGeminiModels();
    this._maybeLoadOpenAiModels();
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
      const aiTaskEntities = Object.keys(this.hass.states || {})
        .filter((entityId) => entityId.startsWith('ai_task.'))
        .sort();
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
    const onDemand = ai.generate_on_demand !== false;
    const uploadEnabled = ai.upload ?? (aiProvider === 'openai' || aiProvider === 'gemini');
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
                      <ha-entity-picker
                        .hass=${this.hass}
                        .value=${ai.ha_entity_id || ''}
                        .includeEntities=${this._aiTaskEntities || []}
                        data-path="image.ai.ha_entity_id"
                        @value-changed=${(ev: CustomEvent) => this._onSelectChanged(ev as any)}
                        label="ai_task Entity (optional)"
                        allow-custom-entity
                      ></ha-entity-picker>
                    `
                  : null}
                ${aiProvider === 'openai' || aiProvider === 'gemini'
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
