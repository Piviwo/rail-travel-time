import axios from "axios";
import convert from "xml-js";

export const getEVAbyName = async (stationName) => {
  const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stop-places/by-name/${stationName}`;
  const headers = {
    "DB-Client-ID": import.meta.env.DB_API_ID,
    "DB-Api-Key": import.meta.env.DB_API_KEY,
    accept: "application/vnd.de.db.ris+json",
  };

  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const stopPlaces = response.data.stopPlaces[0].evaNumber;
      return stopPlaces;
    } else {
      console.error(
        `Failed to fetch data for station ${stationName}:`,
        response.status
      );
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch data for station ${stationName}:`, error);
    return null;
  }
};

const getFormattedTime = () => {
  const now = new Date();
  const pad = (num) => num.toString().padStart(2, "0");
  return `${now.getFullYear().toString().slice(-2)}${pad(
    now.getMonth() + 1
  )}${pad(now.getDate())}/${pad(now.getHours())}`;
};

export const getTimeTable = async (stationName) => {
  const evaNumber = await getEVAbyName(stationName);

  if (!evaNumber) {
    return;
  }

  const dataNow = getFormattedTime();
  const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/plan/${evaNumber}/${dataNow}`;

  const headers = {
    "DB-Client-ID": import.meta.env.DB_API_ID,
    "DB-Api-Key": import.meta.env.DB_API_KEY,
    accept: "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    if (response.status === 200) {
      const timeTable = response.data;
      return timeTable;
    } else {
      console.error(`Failed to fetch data for station :`, response.status);
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch data for station:`, error);
    return null;
  }
};

export const getFinalData = async (stationName) => {
  const finalData = await getTimeTable(stationName);

  console.log(finalData);

  if (!finalData) {
    return;
  }

  const dataJson = JSON.parse(
    convert.xml2json(finalData, {
      compact: true,
      addParent: true,
    })
  ).timetable.s;

  console.log(dataJson);

  const finalStructuredData = dataJson.map((element) => {
    return {
      trainType: element.tl._attributes.c,
      trainNumber: element.tl._attributes.n,
      trainStatus: element.tl._attributes.t,
      arCheck: element.ar,
      dpCheck: element.dp,

      //   trainLabel: element.dp._attributes.l,
      //   trainPath: element.dp._attributes.ppth,
    };
  });

  console.log(finalStructuredData);
};
