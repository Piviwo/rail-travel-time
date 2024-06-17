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
