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
    accept: "application/vnd.de.db.ris+json",
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

const isAlpha = str => /^[a-zA-Z]*$/.test(str);

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
    // define all attributes that are there always:
    const trainType= element.tl._attributes.c;
    const trainStatus=element.tl._attributes.t;
    let trainNumber = NaN;
    // check if IC/ICE for train number
    if(element.tl._attributes.c=='IC' || element.tl._attributes.c=='ICE'){
      // trainNumber is number to be displayed on timetable
      trainNumber = trainType + element.tl._attributes.n;
    }
    // check if dp or ar exist and give origin and destination paths:
    if(element.dp){
      // define label and path
      const trainLabel= element.dp._attributes.l;
      const trainPath = element.dp._attributes.ppth.split("|");
      // define train Number based on other facts:
      if(!trainNumber){
        if(Number.isNaN(trainLabel )){
          trainNumber = trainType;
        } else if(typeof trainLabel == "string" && isAlpha(trainLabel[0])){
          trainNumber = trainLabel;
        }else if(typeof trainLabel == "string" && Number.isInteger(trainLabel[0])){
          trainNumber = trainType + trainLabel;
        }
      }
      if(element.ar){
        // return if ar and dp exist:
        const trainOrigin = element.ar._attributes.ppth.split("|");
        return {
          trainType,
          trainNumber,
          trainStatus,
          trainLabel,
          trainPath,
          trainEnd: trainPath[trainPath.length-1],
          trainOrigin,
          trainStart: trainOrigin[0],
        };
      }
      // return if only dp exists:
      return {
        trainType,
        trainNumber,
        trainStatus,
        trainLabel,
        trainPath,
        trainEnd: trainPath[trainPath.length-1],
      };
    }else if(element.ar){
      const trainLabel=element.ar._attributes.l;
      const trainOrigin = element.ar._attributes.ppth.split("|");
      // determine train number:
      if(!trainNumber){
        if(Number.isNaN(trainLabel )){
          trainNumber = trainType;
        } else if(typeof trainLabel == "string" && isAlpha(trainLabel[0])){
          trainNumber = trainLabel;
        }else if(typeof trainLabel == "string" && Number.isInteger(trainLabel[0])){
          trainNumber = trainType + trainLabel;
        }
      }
      // return if only ar exists:
      return {
        trainType,
        trainNumber,
        trainStatus,
        trainLabel,
        trainOrigin,
        trainStart: trainOrigin[0],
      };
    };
    
  });

  console.log(finalStructuredData);
};
