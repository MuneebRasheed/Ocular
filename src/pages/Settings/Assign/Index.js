import React, { useState, useEffect } from "react";
import MainLayout from "../../../layout/MainLayout";
import CREATE from "../../../assest/image/settings/create.svg";
import FILTER from "../../../assest/image/settings/filters.svg";
import ASSIGN from "../../../assest/image/settings/play.svg";
import Card1 from "../../../components/cards/Card1";
import styles from "./Assign.module.scss";
import CreateCard from "../../../components/cards/CreateCrad/CreateCard";
import TRUK from "../../../assest/image/settings/truk.svg";
import VECTOR from "../../../assest/image/settings/Vector (1).svg";
import Input from "../../../components/Input/Index";
import { Link } from "react-router-dom";
import SideLine from "../../../components/cards/CreateCrad/SideLine/Index";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Assign = () => {
  const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";
  const authorizationToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";

  const token = localStorage.getItem("Token")
    ? localStorage.getItem("Token")
    : null;

  const companyId = localStorage.getItem("UserCompanyId")
    ? localStorage.getItem("UserCompanyId")
    : null;
  const [allVehicles, setAllVehicles] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);
  const [selectedDeviceId, setSelectedDeviceId] = useState(1);

  useEffect(() => {
    getVehiclesUsingCompanyId();
    getDevices();
  }, []);
  const [error, setError] = useState({
    isOpen: false,
    msg: "",
  });

  const getDevices = async () => {
    const url = API_URL + "devices?company_id=eq." + companyId + "&select*";
    const response = await fetch(url, {
      method: "GET",
      contentType: "application/json",
      headers: {
        Authorization: authorizationToken,
        apikey: apiKey,
      },
    });
    try {
      const newData = await response.json();
      console.log("Get Devices ", JSON.stringify(newData));
      setAllDevices(newData);
      return newData;
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
  const updateDevice = async (deviceId, vehicleId, token) => {
    const url = API_URL + "devices?id=eq." + deviceId;
    const response = await fetch(url, {
      method: "PATCH",
      contentType: "application/x-www-form-urlencoded",
      headers: {
        Authorization: token,
        apikey: apiKey,
      },
      Prefer: "return=representation",
      body: new URLSearchParams({
        vehicle_id: vehicleId,
      }),
    });
    try {
      const newData = await response.status;
      setError({ isOpen: true, msg: "Vehicle is assign " });
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
        style={{ backgroundColor: "green" }}
      />
    );
  });
  function assignVehical() {
    // console.log("selectedDeviceId", selectedDeviceId);
    updateDevice(selectedDeviceId, selectedVehicleId, token);
  }

  return (
    <>
      <MainLayout>
        <div className="container-fuild">
          {/* {console.log("selectedVehicleId", selectedVehicleId)} */}
          {error.isOpen ? (
            <Snackbar
              open={error.isOpen}
              autoHideDuration={6000}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={() => setError({ isOpen: false, msg: "" })}
            >
              <Alert
                onClose={() => setError({ isOpen: false, msg: "" })}
                severity="error"
                sx={{ width: "100%" }}
              >
                {error.msg}
              </Alert>
            </Snackbar>
          ) : null}
          <div className="row mt-5">
            <div className="col-lg-12 col-md-6 col-sm-4">
              <div className="d-flex gap-3">
                <div className="">
                  <Link to="/settings/create">
                    <Card1
                      text={"Create"}
                      icon={CREATE}
                      width={"35px"}
                      height={"35px"}
                      radius={"43.5px"}
                    />
                  </Link>
                </div>
                <div className="">
                  <Link to="/settings/assign">
                    <Card1
                      text={"Assign"}
                      icon={ASSIGN}
                      width={"35px"}
                      height={"35px"}
                      radius={"43.5px"}
                    />
                  </Link>
                </div>
                <div className="">
                  <Link to="/settings/filter">
                    <Card1
                      text={"Filter"}
                      icon={FILTER}
                      width={"35px"}
                      height={"35px"}
                      radius={"43.5px"}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-4 mt-4 ">
                <div className={styles.sectionHeading}>
                  Assign a device to a vehicle
                </div>
                <div className="d-flex flex-wrap gap-5">
                  <div className="">
                    <CreateCard icon={TRUK} width={"286px"} height={"166px"}>
                      {/* <Input type={"text"} placeholder={"Vehicle Name"} /> */}
                      <select
                        class="form-select "
                        aria-label="Default select example"
                        className={styles.dropdown}
                        style={{
                          backgroundColor: "#21222d",
                          color: "white",
                          borderColor: "#21222d",
                          width: "190px",
                        }}
                        onChange={(e) => {
                          // console.log("dropdown", e.target.value);
                          setSelectedVehicleId(e.target.value);
                        }}
                      >
                        <option selected>Select</option>
                        {allVehicles.map((vec) => (
                          <option value={vec.id} key={vec.id}>
                            {vec.name}
                          </option>
                        ))}
                        ;
                      </select>
                    </CreateCard>
                  </div>
                  <div onClick={assignVehical}>
                    <SideLine
                      type={"create"}
                      style={{
                        top: "10%",
                        left: "0%",
                        width: " auto",
                        padding: "50px 5px",
                        transform: "inherit",
                        flexDirection: "column",
                      }}
                    />
                  </div>
                  <div className="">
                    <CreateCard icon={VECTOR} width={"286px"} height={"166px"}>
                      {/* <Input type={"text"} placeholder={"Device Name"} /> */}
                      <select
                        class="form-select "
                        aria-label="Default select example"
                        className={styles.dropdown}
                        style={{
                          backgroundColor: "#21222d",
                          color: "white",
                          borderColor: "#21222d",
                          width: "190px",
                        }}
                        onChange={(e) => {
                          // console.log("dropdown", e.target.value);
                          setSelectedDeviceId(e.target.value);
                        }}
                      >
                        <option selected>Select</option>
                        {allDevices.map((vec) => (
                          <option value={vec.id} key={vec.id}>
                            {vec.id}
                          </option>
                        ))}
                        ;
                      </select>
                    </CreateCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Assign;
