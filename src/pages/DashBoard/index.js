import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Card1 from "../../components/cards/Card1";
import CALENDER from "../../assest/image/pages/Calendar.svg";
import VEHICLE from "../../assest/image/Vehicle.svg";
import Card2 from "../../components/cards/Card2/Index";
import BarChart from "../../components/charts/barChart";
import styles from "./Dashboard.module.scss";
import axios from "axios";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
// import { Calendar } from "react-date-range";
import Calendar from "moedim";
import NewChart from "../../components/charts/newBarchart/newChart";
import { ThemeProvider } from "@material-ui/core";
const DashBoard = () => {
  const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";

  const token = localStorage.getItem("Token")
    ? localStorage.getItem("Token")
    : null;

  const companyId = localStorage.getItem("UserCompanyId")
    ? localStorage.getItem("UserCompanyId")
    : null;

  let dateArr = [
    {
      label: "Series 1",
      data: [
        {
          primary: "Ordinal Group 0",
          secondary: 33,
          radius: 33,
          fill: "#354657",
        },
        { primary: "Ordinal Group 1", secondary: 38, fill: "#5597e2" },
        {
          primary: "Ordinal Group 2",
          secondary: 54,
          radius: 33,
          fill: "#28A96C",
        },
        {
          primary: "Ordinal Group 8",
          secondary: 9,
          radius: 0,
          fill: "#d44401",
        },
        {
          primary: "Ordinal Group 9",
          secondary: 58,
          radius: 0,
          fill: "#ffe65b",
        },
      ],
    },
  ];
  let minorDateArray = new Array(25).fill(0);
  let majorDateArray = new Array(25).fill(0);
  let minorLocationArray = new Array(700).fill(0);
  let majorLocationArray = new Array(700).fill(0);

  const [allVehicles, setAllVehicles] = useState([
    { id: 0, name: "muneeb" },
    { id: 1, name: "muneeb" },
  ]);
  const [minDate, setMinDate] = useState(dateArr);
  const [majDate, setMajDate] = useState(dateArr);
  const [minLoc, setMinLoc] = useState(dateArr);
  const [majLoc, setMajLoc] = useState(dateArr);

  const [incident, setIncident] = useState([]);
  const [velocity, setVelocity] = useState(0);
  const [pedistrains, setPedistrains] = useState(0);
  const [noOfMajorIncidents, setNoOfMajorIncidents] = useState(0);
  let vehicalId;
  const [selectedVehicleId, setSelectedVehicleId] = useState();
  const [temp, setTemp] = useState();

  const [state, setState] = useState({
    chart: [],
    avg_prescribed_vel: 25,
    avg_pedestrian_count: 50,
    avg_level3_incidents: {
      main: 50,
      main_sub_left: 70,
      main_sub_right: 25,
    },
    select_date_range: false,
  });

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  function handleSelect(date) {
    console.log(date); // native Date object
  }

  function toggleDate() {
    setState({ ...state, select_date_range: !state.select_date_range });
  }

  useEffect(() => {
    getVehicleIncidentsUsingDate(selectedVehicleId, value, token);
  }, [selectedVehicleId, temp]);
  useEffect(() => {
    getVehiclesUsingCompanyId();
  }, []);

  useEffect(() => {
    if (incident.length == 0) {
      calculateVal();
      setMinLoc([]);
      setMajDate([]);
      setMinDate([]);
      setMajLoc([]);
    } else if (incident.length) {
      calculateVal();
      dataToConvertChart(minorDateArray, setMinDate);
      dataToConvertChart(majorDateArray, setMajDate);
      dataToConvertChart(majorLocationArray, setMajLoc);
      dataToConvertChart(minorLocationArray, setMinLoc);
    }
  }, [incident.length, selectedVehicleId]);
  const [value, setValue] = useState(new Date());

  const getVehiclesUsingCompanyId = async () => {
    const url = API_URL + "vehicles?company_id=eq." + companyId + "&select=*";
    const response = await fetch(url, {
      method: "GET",
      contentType: "application/json",
      headers: {
        Authorization: token,
        apikey: apiKey,
      },
    });
    try {
      const newData = await response.json();

      setAllVehicles(newData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const {
    avg_prescribed_vel,
    avg_pedestrian_count,
    avg_level3_incidents,
    chart,
    select_date_range,
  } = state;

  // const getIncidents = async () => {
  //   const url =
  //     API_URL + "incidents?vehicle_id=eq." + selectedVehicleId + "&select=*";
  //   const response = await fetch(url, {
  //     method: "GET",
  //     contentType: "application/json",
  //     headers: {
  //       Authorization: token,
  //       apikey: apiKey,
  //     },
  //   });
  //   try {
  //     const newData = await response.json();
  //     // console.log("RawData", newData);
  //     setIncident(newData);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const getVehicleIncidentsUsingDate = async (vehicleId, date, token) => {
    // incidents?vehicle_id=eq.1&created_at=gte.2022-04-18&select=*

    // "incidents?vehicle_id=eq." +
    //   vehicleId +
    //   "&created_at=gte.2022-04-18&select=*";
    var ddate = value.toLocaleDateString("en-US");
    var myArray = ddate.split("/");
    var dt = myArray[2] + "-" + myArray[0] + "-" + myArray[1];
    // 2022 - 04 - 18;
    var t = "";
    if (selectedVehicleId == undefined) {
      t = "";
    } else {
      t = "vehicle_id=eq." + vehicleId + "&";
    }

    const url =
      API_URL +
      "incidents?" +
      t +
      "created_at=gte." +
      dt +
      "&company_id=eq." +
      companyId +
      "&select=*";
    const response = await fetch(url, {
      method: "GET",
      contentType: "application/json",
      headers: {
        Authorization: token,
        apikey: apiKey,
      },
    });
    try {
      const newData = await response.json();
      console.log("newData fetch", newData);
      setIncident(newData);
    } catch (error) {
      console.log("error", error);
    }
  };

  function calculateVal() {
    // console.log("incidents", incident);
    let velc = 0;
    let pedes = 0;
    let maj = 0;

    incident?.map((val) => {
      // console.log("location", val.location);
      if (val.max_velocity !== null) {
        velc = velc + val.max_velocity;
      }
      if (val.no_pedestrians !== null) {
        pedes = pedes + val.no_pedestrians;
      }
      if (val.type === "Minor") {
        minorDateArray[parseInt(val.created_at.slice(11, 13))]++;
        minorLocationArray[parseInt(val.location)]++;
      }

      if (val.type === "Major") {
        majorDateArray[parseInt(val.created_at.slice(11, 13))]++;
        majorLocationArray[parseInt(val.location)]++;
        maj++;
      }
    });

    setPedistrains(pedes / incident.length);
    setVelocity(velc / incident.length);
    setNoOfMajorIncidents(maj / incident.length);
  }

  function dataToConvertChart(array, setDs) {
    // let bigarr = [];
    let arr = array.filter((val) => val != 0);
    if (arr.length > 0) {
      setDs(arr);
    }

    // let arr = array?.map((val, index) => {
    //   return { primary: index.toString(), secondary: val };
    // });

    // let cc = arr.filter((val) => {
    //   return val.secondary != 0;
    //   // return val;
    // });

    // bigarr = [
    //   {
    //     label: "Series 1",
    //     data: cc,
    //   },
    // ];

    // setDs(bigarr);
  }
  // console.log("arr updated", data);
  return (
    <>
      <MainLayout>
        <div className="">
          <div className="row mt-4 ">
            <div className="col-lg-12 col-md-6 col-sm-4 ps-3">
              <div className="d-flex gap-3">
                <div onClick={toggleDate}>
                  <Card1 text={"Select Date"} icon={CALENDER} />
                </div>
                <div>
                  <Card1
                    text={"DashboardVehicalID"}
                    icon={VEHICLE}
                    togle={true}
                    data={allVehicles}
                    setMethod={setSelectedVehicleId}
                  />
                </div>
              </div>
              {select_date_range && (
                <div
                  style={{
                    marginTop: "10px",
                    position: "absolute",
                    zIndex: 10,
                  }}
                >
                  <Calendar
                    value={value}
                    onChange={(d) => {
                      setValue(d);
                      var ddate = value.toLocaleDateString("en-US");
                      var myArray = ddate.split("/");

                      setTemp(myArray);
                    }}
                  />
                  {/* <Calendar ranges={[selectionRange]} onChange={handleSelect} /> */}
                </div>
              )}
            </div>
            <div className="col-lg-12 col-md-6 col-sm-4 pt-sm-3 ">
              <h4 className="text-light mt-sm-5">Average Statistics</h4>
              <div className="row ">
                <div className="col-auto col-md-4">
                  <Card2
                    text={"Average Pedestrian velocity"}
                    count={
                      isNaN(velocity.toFixed(2)) ? 0.0 : velocity.toFixed(2)
                    }
                  />
                </div>
                <div className="col-auto  col-md-4">
                  <Card2
                    text={"Average Pedestrian count"}
                    color={"#FF2226"}
                    count={
                      isNaN(pedistrains.toFixed(2))
                        ? 0.0
                        : pedistrains.toFixed(2)
                    }
                  />
                </div>
                <div className="col-auto  col-md-4">
                  <Card2
                    text={"Average Level3 Incidents"}
                    color={"#79FE0C"}
                    count={
                      isNaN(noOfMajorIncidents.toFixed(2))
                        ? 0.0
                        : noOfMajorIncidents.toFixed(2)
                    }
                    type={"level3"}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-6 col-sm-4 pt-3 ">
              <h4 className="text-light my-sm-5">Level Analytics</h4>
              <div className="row">
                <div className={`col-6 py-3 ${styles.chartCont}`}>
                  {/* {console.log("BarChart", minDate)} */}
                  {/* <BarChart
                    height={318}
                    data={chart}
                    datas={minDate}
                    title={"Level 2 incidents"}
                  /> */}
                  <NewChart datas={minDate} title="Level 2 incidents" />
                </div>
                <div className={`col-6 py-3 ${styles.chartCont}`}>
                  {/* <BarChart
                    height={318}
                    data={chart}
                    datas={majDate}
                    title={"Level 2 incidents"}
                  /> */}
                  <NewChart datas={majDate} title={"Level 3 incidents"} />
                </div>

                <div className={`col-6 py-3 ${styles.chartCont}`}>
                  {/* <BarChart
                    data={chart}
                    datas={minLoc}
                    height={175}
                    className={styles.chartCont2}
                    title={"Level 2 Incidents Location"}
                  /> */}
                  <NewChart
                    datas={minLoc}
                    title={"Level 2 Incidents Location"}
                  />
                </div>
                <div className={`col-6 py-3 ${styles.chartCont}`}>
                  {/* <BarChart
                    height={175}
                    data={chart}
                    datas={majLoc}
                    className={styles.chartCont2}
                    title={"Level 3 Incidents Location"}
                  /> */}
                  <NewChart
                    datas={majLoc}
                    title={"Level 3 Incidents Location"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <NewChart datas={minorDateArray} /> */}
      </MainLayout>
    </>
  );
};

export default DashBoard;
