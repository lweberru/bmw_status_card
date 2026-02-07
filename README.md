# BMW Status Card (bmw_status_card)

Version: 0.1.12

Eine Lovelace-Karte, die automatisch Entities aus **bmw_home** und **bmw-cardata-ha** erkennt und eine **vehicle-status-card** daraus erzeugt. Zusätzlich können Fahrzeugbilder via KI generiert werden, basierend auf dem Fahrzeugmodell und Zusatzinfos.

## Voraussetzungen

- **bmw_home** und **bmw-cardata-ha** sind installiert und liefern Entities.
- **vehicle-status-card** ist installiert (HACS) oder wird per Resource geladen.

## Installation (HACS – Custom Repository)

1. Dieses Repository als HACS-Frontend-Plugin hinzufügen.
2. Nach Installation Ressource hinzufügen:
   - URL: `/hacsfiles/bmw_status_card/bmw-status-card.js`
   - Typ: `module`
3. Optional: `vehicle-status-card` ebenfalls als Ressource laden (siehe Konfiguration).

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
    provider: openai
    api_key: !secret openai_api_key
    model: gpt-image-1
    size: 1024x1024
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
```

### Gemini (Imagen) Beispiel

```yaml
image:
  mode: ai
  ai:
    provider: gemini
    api_key: !secret gemini_api_key
    model: imagen-3.0-generate-002
    aspect_ratio: "1:1"
    count: 1
    max_images: 6
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
- Für Provider `gemini` wird `image.ai.api_key` benötigt (Imagen API).
- Für `generic` kannst du einen eigenen Endpoint definieren.
- Mit `views` kannst du mehrere Blickwinkel erzeugen (z. B. Front/Seite/Heck). Nutze dazu `{angle}` im Prompt.

## Support

Bei Bedarf kann ich die Entity-Mappings (Keywords) für dein Fahrzeugprofil erweitern.
