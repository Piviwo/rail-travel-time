import axios from "axios";
import convert from "xml-js";


export const getEVAbyName = async (stationName) => {
  const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1/stop-places/by-name/${stationName}`;
  const headers = {
    "DB-Client-ID": 'c3ff7cbf26563615a6b0f0ef81fff3b6',
    "DB-Api-Key": '03408a082deb900e39719a0f7910f040',
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
    "DB-Client-ID": 'c3ff7cbf26563615a6b0f0ef81fff3b6',
    "DB-Api-Key": '03408a082deb900e39719a0f7910f040',
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

  
  const finalStructuredData = dataJson.map((element) => {
    // define all attributes that are there always:
    const trainType= element.tl._attributes.c;
    let trainStatus = element.tl._attributes.t;
    if(trainStatus=='p'){
      trainStatus='as planned';
    }else if(trainStatus=='c'){
      trainStatus='stop is dropped';
    }else{
      trainStatus='stop was added';
    }
    
    let trainNumber = NaN;
    // define kind as a filter for departing and arriving trains
    let kind = 'none';
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
      const departure = element.dp._attributes.pt.slice(6,8) + ':' + element.dp._attributes.pt.slice(8,10);
      kind='departing';
      // define train Number based on other facts:
      if(!trainNumber){
        if(Number.isNaN(trainLabel )){
          trainNumber = trainType;
        } else if(typeof trainLabel == "string" && /^[1-9]*$/.test(trainLabel[0])){
          trainNumber = trainType + trainLabel;
        }else if(typeof trainLabel == "string" && /^[a-zA-Z]*$/.test(trainLabel[0])){
          trainNumber = trainLabel;
        }
      }
      if(element.ar){
        // return if ar and dp exist:
        const trainOrigin = element.ar._attributes.ppth.split("|");
        const arrival = element.ar._attributes.pt.slice(6,8) + ':' + element.ar._attributes.pt.slice(8,10);
        kind = 'intermediate_stop';
        return {
          trainType,
          trainNumber,
          trainStatus,
          trainLabel,
          trainPath,
          trainEnd: trainPath[trainPath.length-1],
          trainOrigin,
          trainStart: trainOrigin[0],
          departure,
          arrival,
          kind,
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
        departure,
        kind,
      };
    }else if(element.ar){
      const trainLabel=element.ar._attributes.l;
      const trainOrigin = element.ar._attributes.ppth.split("|");
      const arrival = element.ar._attributes.pt.slice(6,8) + ':' + element.ar._attributes.pt.slice(8,10);
      kind='arriving';
      // determine train number:
      if(!trainNumber){
        if(Number.isNaN(trainLabel )){
          trainNumber = trainType;
        } else if(typeof trainLabel == "string" && /^[1-9]*$/.test(trainLabel[0])){
          trainNumber = trainType + trainLabel;
        }else if(typeof trainLabel == "string" && /^[a-zA-Z]*$/.test(trainLabel[0])){
          trainNumber = trainLabel;
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
        arrival,
        kind,
      };
    };
    
  });
  return (finalStructuredData);
};


