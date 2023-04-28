import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import Card1 from "../../components/cards/Card1";
import CALENDER from "../../assest/image/pages/Calendar.svg";
import VEHICLE from "../../assest/image/Vehicle.svg";
import ReactPlayer from "react-player";
// import { Calendar } from "react-date-range";
import Calendar from "moedim";

const Video = () => {
  const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";
  const token = localStorage.getItem("Token")
    ? localStorage.getItem("Token")
    : null;

  const [videos, setVideos] = useState([]);
  const [items, setItems] = useState([]);
  const [calender, setCalender] = useState(false);
  const [allVehicles, setAllVehicles] = useState([[{ id: 0 }, { id: 1 }]]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(0);
  const [video, setVideo] = useState();
  const [value, setValue] = useState(new Date());
  const [temp, setTemp] = useState();

  const companyId = localStorage.getItem("UserCompanyId")
    ? localStorage.getItem("UserCompanyId")
    : null;
  const getIncidentsVideos = async () => {
    const url =
      API_URL +
      "incidents?vehicle_id=eq." +
      selectedVehicleId +
      "&select=video_url,id";
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
      setVideos(newData.splice(0, 10));
    } catch (error) {
      console.log("error", error);
    }
  };
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
  const getIncidents = async () => {
    // console.log("selectedVehicleId", selectedVehicleId);
    // setLoading(true);
    const url =
      API_URL + "incidents?vehicle_id=eq." + selectedVehicleId + "&select=*";
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

      setItems(newData);
      // setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  const selectionRange = {
    startDate: new Date("2022-04-18"),
    endDate: new Date("2022-04-18"),
    key: "selection",
  };
  function handleSelect(date) {
    console.log(date); // native Date object
  }

  useEffect(() => {
    getIncidentsVideos();
    getVehiclesUsingCompanyId();
  }, []);
  // useEffect(() => {
  //   getIncidentsVideos();
  // }, [selectedVehicleId]);
  useEffect(() => {
    getIncidents();
  }, [selectedVehicleId]);

  return (
    <>
      <MainLayout>
        <div className="">
          <div className="row mt-4">
            <div className="col-lg-12 col-md-6 col-sm-4">
              <div className="d-flex gap-3 ">
                <div
                  onClick={() => {
                    setCalender((pre) => {
                      return !pre;
                    });
                  }}
                >
                  <Card1 text={"Select Date"} icon={CALENDER} />
                </div>
                <div>
                  <Card1
                    text={" Select Vehicle"}
                    icon={VEHICLE}
                    togle={true}
                    data={allVehicles}
                    setMethod={setSelectedVehicleId}
                  />
                </div>
                <select
                  class="form-select "
                  aria-label="Default select example"
                  style={{
                    backgroundColor: "#21222d",
                    color: "white",
                    borderColor: "#21222d",
                    width: "165px",
                    height: "80px",
                    marginTop: "10px",
                    borderRadius: "20px",
                    marginLeft: "32%",
                  }}
                  onChange={(e) => {
                    // console.log("dropdown", e.target.value);
                    setVideo(e.target.value);
                  }}
                >
                  {/* <option selected>{text}</option> */}
                  <option selected>Select</option>
                  {items.map((vec) => (
                    <option value={vec.video_url} key={vec.id}>
                      {vec.id}
                    </option>
                  ))}
                  ;
                </select>
              </div>
              {calender && (
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
          </div>
          <div>
            <div className="container-fuild mt-5 mb-5">
              <div className="row gap-4">
                <div
                  className="ml-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!video?.video_url ||
                  video?.video_url?.includes("localhost") ? (
                    <h1 style={{ color: "white" }}>No Video URL Found</h1>
                  ) : (
                    <ReactPlayer
                      controls={true}
                      width={"750.74px"}
                      height={"450.94px"}
                      url={
                        !video?.video_url ||
                        video?.video_url?.includes("localhost")
                          ? "https://www.youtube.com/watch?v=2E93KHqU2s4"
                          : videos?.video_url
                      }
                      config={{
                        youtube: {
                          playerVars: {
                            enablejsapi: 1,
                            origin: window.location.origin,
                            loop: 1,
                          },
                        },
                      }}
                    />
                  )}
                </div>
                {/* <div className="col-auto">
                  <div className="d-flex flex-md-column gap-3 justify-content-md-end">
                    {videos.splice(0, videos.length).map((video) => (
                      <div key={video.id}>
                        <ReactPlayer
                          width={"240px"}
                          height={"151px"}
                          controls
                          url={
                            !video?.video_url ||
                            video?.video_url.includes("localhost")
                              ? "https://www.youtube.com/watch?v=2E93KHqU2s4"
                              : video?.video_url
                          }
                          config={{
                            youtube: {
                              playerVars: {
                                enablejsapi: 1,
                                origin: window.location.origin,
                                loop: 1,
                              },
                            },
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Video;
