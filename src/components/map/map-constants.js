export const dataLayer = {
  id: "data",
  type: "line",
  paint: {
    "line-color": "#87ced6",
    "line-width": [
      "interpolate",
      ["linear"],
      ["zoom"],
      5,
      [
        "case",
        ["==", ["get", "disp_scale"], "1:80m"],
        2,
        ["==", ["get", "disp_scale"], "1:40m"],
        0,
        0,
      ],
      10,
      [
        "case",
        ["==", ["get", "disp_scale"], "1:80m"],
        3,
        ["==", ["get", "disp_scale"], "1:40m"],
        2,
        2,
      ],
      15,
      [
        "case",
        ["==", ["get", "disp_scale"], "1:80m"],
        4,
        ["==", ["get", "disp_scale"], "1:40m"],
        4,
        4,
      ],
    ],
  },
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

export const labelsStyle = {
  id: "place-country",
  type: "symbol",
  minzoom: 1,
  maxzoom: 12,
  "source-layer": "place",
  filter: ["all", ["==", "class", "country"], ["has", "name:en"]],
  layout: {
    "text-font": ["Cabin Medium", "Noto Sans Regular"],
    "text-field": "{name:en}",
    "text-size": [
      "interpolate",
      ["linear", 1],
      ["zoom"],
      0,
      8,
      1,
      10,
      4,
      ["case", ["\u003E", ["get", "rank"], 2], 13, 15],
      8,
      ["case", ["\u003E", ["get", "rank"], 2], 18, 22],
    ],
    "text-transform": "uppercase",
    "text-max-width": 6.25,
    visibility: "visible",
  },
  "text-padding": {
    stops: [
      [1, 0],
      [4, 2],
    ],
  },
  "text-max-width": 8,
  paint: {
    "text-color": "hsl(237, 21%, 21%)",
    "text-halo-blur": 1,
    "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
    "text-halo-width": 2,
  },
};

export const customStyle = {
  version: 8,
  name: "Empty Style",
  metadata: { "maputnik:renderer": "mlgljs" },
  sources: {
    openmaptiles: {
      type: "vector",
      url: "https://wms.wheregroup.com/tileserver/tile/world-0-14.json",
    },
  },
  sprite: "https://wms.wheregroup.com/tileserver/sprites/osm-bright",
  glyphs: "https://wms.wheregroup.com/tileserver/fonts/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "place-country",
      type: "symbol",
      source: "openmaptiles",
      minzoom: 1,
      maxzoom: 12,
      "source-layer": "place",
      filter: ["all", ["==", "class", "country"], ["has", "name:en"]],
      layout: {
        "text-font": ["Cabin Medium", "Noto Sans Regular"],
        "text-field": "{name:en}",
        "text-size": [
          "interpolate",
          ["linear", 1],
          ["zoom"],
          0,
          8,
          1,
          10,
          4,
          ["case", ["\u003E", ["get", "rank"], 2], 13, 15],
          8,
          ["case", ["\u003E", ["get", "rank"], 2], 18, 22],
        ],
        "text-transform": "uppercase",
        "text-max-width": 6.25,
        visibility: "visible",
      },
      "text-padding": {
        stops: [
          [1, 0],
          [4, 2],
        ],
      },
      "text-max-width": 8,
      paint: {
        "text-color": "hsl(237, 21%, 21%)",
        "text-halo-blur": 1,
        "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
        "text-halo-width": 2,
      },
    },
  ],
};
