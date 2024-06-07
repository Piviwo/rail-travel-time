import Papa from "papaparse";

export const parseCSV = (file) => {
  Papa.parse(file, {
    header: true,
    download: true,
    delimiter: ",",
    fields: [
      "City",
      "Latitude",
      "Longitude",
      "Moscow",
      "London",
      "Berlin",
      "Madrid",
      "Rome",
      "Paris",
      "Bucharest",
      "Vienna",
      "Hamburg",
      "Warsaw",
      "Budapest",
      "Barcelona",
      "Munich",
      "Milan",
      "Prague",
      "Sofia",
      "Brussels",
      "Birmingham",
      "Cologne",
      "Naples",
      "Stockholm",
      "Turin",
      "Marseille",
      "Amsterdam",
      "Zagreb",
      "Belgrade",
      "Helsinki",
      "Oslo",
      "Copenhagen",
      "Dublin",
      "Lisbon",
      "Edinburgh",
      "Athens",
      "Riga",
      "Vilnius",
      "Tallinn",
      "Geneva",
      "Stuttgart",
      "Rotterdam",
      "Krakow",
    ],
    // complete: function (results, file) {
    //   console.log("parsing complete read", count, "records.");
    // },
    complete: function (results) {
      console.log(results);
    },
  });
};
