# BMW Status Card (bmw_status_card)

Version: 0.1.82

Eine Lovelace-Karte, die automatisch Entities aus **bmw_home** und **bmw-cardata-ha** erkennt und eine **vehicle-status-card** daraus erzeugt. Zusätzlich können Fahrzeugbilder via KI generiert werden, basierend auf dem Fahrzeugmodell und Zusatzinfos.

## Upgrade-Hinweis (ab 0.1.73)

- Im visuellen Editor unter **Bildmodus → compositor (AI-Overlays)** gibt es jetzt die direkte Provider-Auswahl.
- Für präzise BMW-Overlays (Türen/Fenster/Haube/Kofferraum) wähle **Compositor Provider: gemini**.
- **ai_task** bleibt verfügbar, ist aber ohne deterministisches Inpainting.
- Neu: Standardmäßig werden im Compositor getrennte Bundles für **View + Szene** genutzt
  (`front_left|rear_right` × `parked|driving`). Dadurch bleiben Base/Masken/Overlays je Kontext stabil.

![Example Card](Example%20Card.png)

## Voraussetzungen

- [bmw_home](https://labs.bmw.com/services/cba15ad5-ed53-4ad0-b8a4-6774b477eaf8) und der Fork [bmw-cardata-ha](https://github.com/kvanbiesen/bmw-cardata-ha) sind installiert und liefern Entities (inkl. Vehicle Image).
- Die geforkte [vehicle-status-card](https://github.com/lweberru/vehicle-status-card) ist installiert (HACS – Custom Repository) oder wird per Resource geladen.
- Für persistente KI-Bilder via OpenAI/Gemini: [upload_file](https://github.com/lweberru/upload_file) installieren.
- Für serverseitige KI-Bilder: [ai_task](https://www.home-assistant.io/integrations/ai_task/) (Home Assistant AI Tasks).

## Installation (HACS – Custom Repository)

1. Dieses Repository als HACS-Frontend-Plugin hinzufügen.
2. Nach Installation Ressource hinzufügen:
   - URL: `/hacsfiles/bmw_status_card/bmw-status-card.js`
   - Typ: `module`
3. Optional: die geforkte `vehicle-status-card` ebenfalls als Ressource laden (siehe Konfiguration).

## Konfiguration (Beispiel)

```yaml
type: custom:bmw-status-card
bmw_home_device_id: 1234567890abcdef
bmw_cardata_device_id: abcdef1234567890
vehicle_status_card_resource: /hacsfiles/vehicle-status-card/vehicle-status-card.js
maptiler_api_key: !secret maptiler_key
image:
  mode: ai
  ai:
    provider: ha_ai_task
    ha_entity_id: ai_task.google_ai_task
    count: 2
    max_images: 8
    views:
      - "front 3/4 view"
      - "rear 3/4 view"
      - "side profile"
    prompt_template: "Studiofoto eines {year} {color} {make} {model} {series} {trim}, {angle}."
vehicle_info:
  color: "Blau"
  year: "2023"
  license_plate: "M-AB1234"
```

### Gemini Beispiel

```yaml
image:
  mode: ai
  ai:
    provider: gemini
    api_key: !secret gemini_api_key
    model: gemini-2.0-flash-preview-image-generation
    aspect_ratio: "1:1"
    count: 1
    max_images: 6
    upload: true
    upload_path: "www/upload_file"
    views:
      - "front 3/4 view"
      - "rear 3/4 view"
      - "side profile"
      - "front view"
      - "rear view"
    prompt_template: "High-quality photo of a {year} {color} {make} {model} {series} {trim} {body}, {angle}."
```

### Statische Bilder

```yaml
image:
  mode: static
  static_urls:
    - /local/bmw-images/front.jpg
    - /local/bmw-images/side.jpg
```

### Default-Fahrzeugbild (bmw-cardata-ha)
### Default-Fahrzeugbild (bmw-cardata-ha)

Wenn kein `image`-Block gesetzt ist oder (bei AI) noch kein Bild generiert wurde, nutzt die Karte automatisch das Vehicle-Image aus `image.<fahrzeug>_vehicle_image` (sofern verfügbar).

Alternativ kann im Editor der Modus **standard (bmw-cardata-ha Fahrzeugbild)** gewählt werden. Das entspricht:

```yaml
image:
  mode: cardata
```

### Compositor (AI-Overlays)

```yaml
image:
  mode: compositor
  compositor:
    provider:
      type: gemini
      api_key: !secret gemini_api_key
      model: gemini-2.0-flash-preview-image-generation
    base_view: "front 3/4 view"
    view_mode: "auto" # auto | front_left | rear_right
    scene_entity: "binary_sensor.320d_xdrive_vehicle_motion_state" # optional
    mask_threshold: 16 # optional, default 16
    mask_temperature: 0.1 # optional, gemini default for mask generation
    view_prompts:
      front_left: "front 3/4 view"
      rear_right: "rear 3/4 view"
    bundle_by_scene_view: true
    asset_path: "www/image_compositor/assets"
    output_path: "www/image_compositor"
    mask_base_path: "/local/image_compositor/masks"
    mask_map:
      door_front_left_open: "/local/image_compositor/masks/door_front_left_open.png"
      door_front_right_open: "/local/image_compositor/masks/door_front_right_open.png"
      hood_open: "/local/image_compositor/masks/hood_open.png"
      trunk_open: "/local/image_compositor/masks/trunk_open.png"
```

### Compositor (fertiges BMW-Gemini-Beispiel)

```yaml
type: custom:bmw-status-card
bmw_home_device_id: 1234567890abcdef
bmw_cardata_device_id: abcdef1234567890
vehicle_status_card_resource: /hacsfiles/vehicle-status-card/vehicle-status-card.js
maptiler_api_key: !secret maptiler_key
image:
  mode: compositor
  compositor:
    provider:
      type: gemini
      api_key: !secret gemini_api_key
      model: gemini-2.0-flash-preview-image-generation
      service_data:
        generationConfig:
          temperature: 0.2
    base_view: "front 3/4 view"
    asset_path: "www/image_compositor/assets"
    output_path: "www/image_compositor"
    mask_base_path: "/local/image_compositor/masks"
    mask_map:
      door_front_left_open: "/local/image_compositor/masks/door_front_left_open.png"
      door_front_right_open: "/local/image_compositor/masks/door_front_right_open.png"
      door_rear_left_open: "/local/image_compositor/masks/door_rear_left_open.png"
      door_rear_right_open: "/local/image_compositor/masks/door_rear_right_open.png"
      window_front_left_open: "/local/image_compositor/masks/window_front_left_open.png"
      window_front_right_open: "/local/image_compositor/masks/window_front_right_open.png"
      window_rear_left_open: "/local/image_compositor/masks/window_rear_left_open.png"
      window_rear_right_open: "/local/image_compositor/masks/window_rear_right_open.png"
      hood_open: "/local/image_compositor/masks/hood_open.png"
      trunk_open: "/local/image_compositor/masks/trunk_open.png"
      sunroof_open: "/local/image_compositor/masks/sunroof_open.png"
      sunroof_tilt: "/local/image_compositor/masks/sunroof_tilt.png"
```

### Visueller Editor (Compositor) – einfache Nutzung

Im Karten-Editor unter **Bildmodus → compositor (AI-Overlays)** sind jetzt alle relevanten Felder direkt auswählbar:

- **Compositor Provider**: `gemini` (empfohlen), `openai` oder `ai_task`
- Bei `gemini`/`openai`: **API Key** + **Model** (bei OpenAI zusätzlich **Bildgröße**)
- Bei `ai_task`: **ai_task Entity**
- Für alle Varianten: **Basis-Ansicht**, **Asset-Pfad**, **Output-Pfad**, **Masken-Basispfad**
- Neu: geführter 3-Schritt-Workflow mit Buttons:
  1. **Base neu erzeugen**
  2. **Masken neu erzeugen**
  3. **Overlays/Compose neu bauen**

Hinweis:
- Für präzise, deckungsgleiche BMW-Overlays nutze `gemini` oder `openai` (Inpainting).
- `ai_task` ist weiterhin möglich, aber ohne deterministisches Inpainting.
- Mit `bundle_by_scene_view: true` schreibt die Karte automatisch nach
  `.../assets/<view>/<scene>`, `.../masks/<view>/<scene>` und `.../<view>/<scene>` für Compose-Ausgaben.

### Overrides für vehicle-status-card

```yaml
vehicle_status_card:
  layout_config:
    section_order: ["indicator_rows", "images", "range_info", "mini_map", "button_cards"]
```

## Automatische Erkennung (Heuristiken)

Die Karte gruppiert Entities u. a. nach:
- Batterie / SoC
- Reichweite
- Tür-/Fensterstatus
- Reifendruck
- Ladezustand
- Standort (device_tracker)
- Klima / Vorheizen
- Service / Wartung
- Navigation / Ziel / ETA

Du kannst per `vehicle_status_card` die generierte Konfiguration jederzeit überschreiben.

## Hinweise zur KI-Bildgenerierung

- Die Karte speichert generierte Bilder im Browser-Cache (Standard: 24h).
- Für Provider `openai` wird `image.ai.api_key` benötigt.
- Für Provider `gemini` wird `image.ai.api_key` benötigt (Gemini API).
- Für Provider `ha_ai_task` wird `image.ai.ha_entity_id` empfohlen.
- Im `image.mode: compositor` kann `image.compositor.provider.type` `gemini`, `openai` oder `ai_task` sein.
- `upload` speichert OpenAI/Gemini-URLs über die [upload_file](https://github.com/lweberru/upload_file)-Integration in `/config/www` (Zugriff via `/local/`).
- Für `generic` kannst du einen eigenen Endpoint definieren.
- Mit `views` kannst du mehrere Blickwinkel erzeugen (z. B. Front/Seite/Heck). Nutze dazu `{angle}` im Prompt.

## Support

Bei Bedarf kann ich die Entity-Mappings (Keywords) für dein Fahrzeugprofil erweitern.
