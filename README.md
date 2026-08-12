# BMW Status Card

Version: 0.2.3

Eine Lovelace-Karte fuer die versionierte Fahrzeug-Praesentation der `bmw_status`-Integration. Die Karte liest ausschliesslich einen BMW-Status-Sensor und rendert dessen `presentation`-Attribut. CarData-Auswahl, Fachlogik, Bildgenerierung, Caching und Provider-Zugangsdaten bleiben im Backend.

## Voraussetzungen

- Die Custom Integration `bmw_status` ist eingerichtet.
- Pro Fahrzeug existiert genau ein `bmw_status`-Config Entry und dessen Sensor, zum Beispiel `sensor.status`.

## Installation

1. Dieses Repository als HACS-Frontend-Plugin hinzufuegen.
2. Die Ressource als Modul laden:
   - URL: `/hacsfiles/bmw_status_card/bmw-status-card.js`
   - Typ: `module`

## Konfiguration

```yaml
type: custom:bmw-status-card
entity: sensor.status
```

Optional kann die Karte eine statische Positionskarte von MapTiler anzeigen. Der Key bleibt ausschliesslich in der Kartenkonfiguration und wird weder im `bmw_status`-Config Entry gespeichert noch ueber den Sensor veroeffentlicht.

```yaml
type: custom:bmw-status-card
entity: sensor.status
maptiler_api_key: !secret maptiler_key
maptiler_style: streets-v2
```

MapTiler-Keys sind im Browser sichtbar. Verwende daher ausschliesslich einen auf deine Home-Assistant-Instanz eingeschraenkten Key.

## Backendvertrag

Die Karte erwartet `schema_version: 1` und liest die folgenden Werte aus `attributes.presentation`:

- `vehicle`, `status` und `electrification`
- `entities` fuer Kennzahlen wie Ladezustand, Tank und Reichweite
- `groups` fuer Oeffnungen, Reifen und Klima
- `badges` fuer semantische Warnungen
- `images` fuer serverseitig erzeugte und gecachte Fahrzeugbilder

Bei einer kuenftigen inkompatiblen Schema-Version zeigt die Karte keine heuristisch ermittelten CarData-Entities an; die Backend-Integration bleibt die alleinige Quelle fuer die Praesentation.
