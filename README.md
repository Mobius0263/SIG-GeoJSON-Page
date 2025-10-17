# Penjelasan GeoJSON

GeoJSON adalah format untuk menyandikan struktur data geografis sederhana yang didasarkan pada JavaScript Object Notation (JSON), format data terbuka yang umum. GeoJSON digunakan untuk merepresentasikan fitur-fitur geografis dan atribut non-spasialnya.

---

# GeoJSON Kelurahan Sukagalih/Pasteur

Informasi jalan diambil dari Overpas Turbo menggunakan script berikut:

```powershell
[out:json][timeout:25];

way["highway"]({{bbox}});

out body;
>;
out skel qt;
```
Untuk visualisasi, pilih "Open" di situs https://geojson.io/
<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/459212e6-5570-4723-8683-0710480972c4" />

### 1. Struktur Keseluruhan

File GeoJSON ini adalah sebuah **`FeatureCollection`**. Ini merupakan objek utama standar yang berisi sebuah *array* (larik) dari fitur-fitur geografis.

```json
{
  "type": "FeatureCollection",
  "features": [
    ...
  ]
}
```

Setiap item di dalam *array* `features` adalah objek **`Feature`** dengan struktur sebagai berikut:

* **`properties`**: Objek yang berisi metadata mengenai fitur tersebut (misalnya, nama, tipe jalan).
* **`geometry`**: Objek yang mendefinisikan bentuk dan lokasi fitur.
* **`id`**: Pengenal unik untuk fitur tersebut.

```json
{
  "type": "Feature",
  "properties": { ... },
  "geometry": { ... },
  "id": "way/4567534"
}
```

### 2. Atribut dan Properti

Objek `properties` mendeskripsikan karakteristik dari setiap fitur. File ini memiliki beragam properti, di antaranya:

| Properti                  | Properti               | Properti                  | Properti                  |
| ------------------------- | ---------------------- | ------------------------- | ------------------------- |
| `@id`                     | `access`               | `alt_name`                | `avgspeed`                |
| `bicycle`                 | `bridge`               | `covered`                 | `cycleway:both`           |
| `cycleway:left`           | `cycleway:left:lane`   | `cycleway:right`          | `destination`             |
| `destination:ref`         | `destination:symbol`   | `foot`                    | `footway`                 |
| `highway`                 | `horse`                | `incline`                 | `indoor`                  |
| `junction`                | `lanes`                | `layer`                   | `lit`                     |
| `loc_name`                | `maxspeed`             | `maxspeed:type`           | `motor_vehicle`           |
| `motorcar`                | `motorcycle`           | `name`                    | `name:en`                 |
| `name:ja`                 | `narrow`               | `noname`                  | `note`                    |
| `official_name`           | `old_name`             | `oneway`                  | `oneway:motorcar`         |
| `parking:both`            | `parking:left`         | `parking:left:orientation`| `parking:right`           |
| `ramp`                    | `ref`                  | `service`                 | `short_name`              |
| `sidewalk`                | `sidewalk:both`        | `smoothness`              | `source`                  |
| `surface`                 | `tactile_paving`       | `tunnel`                  | `turn:lanes`              |
| `wheelchair`              | `width`                | `wikipedia`               |                           |

#### Contoh Fitur dengan Properti Lengkap

Contoh ini menampilkan sebuah jalan utama dengan informasi sepeda dan lalu lintas yang detail.

```json
{
  "properties": {
    "@id": "way/4567617",
    "avgspeed": "30",
    "bicycle": "yes",
    "cycleway:left": "lane",
    "cycleway:left:lane": "advisory",
    "cycleway:right": "no",
    "foot": "yes",
    "highway": "primary",
    "lanes": "2",
    "name": "Jalan Raden Adipati Aria Wiranatakusumah",
    "old_name": "Jalan Cipaganti",
    "oneway": "yes",
    "surface": "asphalt",
    "turn:lanes": "left|right"
  }
}
```

### 3. Rincian Tipe Jalan (properti `highway`)

Properti `highway` mengklasifikasikan jenis jalan atau jalur. Berikut adalah jumlah dari setiap jenis yang ditemukan di dalam file:

| Tipe Jalan (`highway`) | Jumlah |
| ---------------------- | ------ |
| `residential`          | 54     |
| `service`              | 29     |
| `living_street`        | 22     |
| `primary`              | 18     |
| `tertiary`             | 11     |
| `footway`              | 11     |
| `secondary`            | 9      |
| `steps`                | 5      |
| `trunk`                | 5      |
| `trunk_link`           | 4      |
| `path`                 | 1      |
| `primary_link`         | 1      |
| `tertiary_link`        | 1      |
| `unclassified`         | 1      |
| **Total** | **172** |

> **Catatan**: Jumlah total (172) lebih kecil dari jumlah total fitur (201) karena beberapa fitur di dalam file tidak memiliki properti `highway`.

---

### 4. Jenis Geometri

Berdasarkan data yang dianalisis, semua fitur menggunakan satu jenis geometri:

* **`LineString`**: Merepresentasikan sebuah garis atau jalur yang didefinisikan oleh serangkaian pasangan koordinat (longitude, latitude).

#### Contoh Geometri `LineString`

Contoh ini menampilkan segmen garis sederhana yang terdiri dari dua titik.

```json
{
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [ 107.5996034, -6.9021781 ],
      [ 107.5995001, -6.9020788 ]
    ]
  }
}
```
