import React, { useState, useEffect } from "react";
import Card1 from "../../../components/cards/Card1/index";
import CREATE from "../../../assest/image/settings/create.svg";
import FILTER from "../../../assest/image/settings/filters.svg";
import ASSIGN from "../../../assest/image/settings/play.svg";
import MainLayout from "../../../layout/MainLayout";
import CreateCard from "../../../components/cards/CreateCrad/CreateCard";
import Input from "../../../components/Input/Index";
import styles from "../Setting.module.scss";
import LOCATION from "../../../assest/image/settings/location.svg";
import TRUK from "../../../assest/image/settings/truk.svg";
import ARROW from "../../../assest/image/settings/arrow.svg";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Create = () => {
  const [vehicalName, setVehicalName] = useState("");

  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [allDevices, setAllDevices] = useState([]);
  const [deviceType, setDeviceType] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmal, setUserEmal] = useState("");
  const [userType, setUserType] = useState("");
  const [err, setErr] = useState(false);

  let userTypes = ["Select", "user", "company administrator"];

  const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
  const AUTH_API_URL = "https://mskfjommosmgqsspinpb.supabase.co/auth/v1/";
  const RPC_FUNCTION_API_URL =
    "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/rpc/";
  const authorizationToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";

  let TOKEN = localStorage.getItem("Token");

  let userCompanyId = localStorage.getItem("UserCompanyId");

  const companyId = localStorage.getItem("UserCompanyId")
    ? localStorage.getItem("UserCompanyId")
    : null;
  const token = localStorage.getItem("Token")
    ? localStorage.getItem("Token")
    : null;
  const [allVehicles, setAllVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);

  useEffect(() => {
    getVehiclesUsingCompanyId();
    getDevices();
  }, []);
  const getDevices = async () => {
    const url = API_URL + "devices?select=*";
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
  const addNewVehicle = async (companyId, vehicleName, token) => {
    const url = API_URL + "vehicles";
    const response = await fetch(url, {
      method: "POST",
      contentType: "application/x-www-form-urlencoded",
      headers: {
        Authorization: token,
        apikey: apiKey,
      },
      Prefer: "return=representation",
      body: new URLSearchParams({
        company_id: companyId,
        name: vehicleName,
      }),
    });
    try {
      const newData = await response.status;
      setError({ isOpen: true, msg: "Vehical added" });
      return newData;
    } catch (error) {
      setError({ isOpen: true, msg: "Vehical not added" });
      console.log("error", error);
    }
  };

  const addNewDevice = async (deviceType, companyId, vehicleId, token) => {
    try {
      const url = API_URL + "devices";
      const response = await fetch(url, {
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        headers: {
          Authorization: token,
          apikey: apiKey,
        },
        Prefer: "return=representation",
        body: new URLSearchParams({
          type: deviceType,
          company_id: companyId,
          vehicle_id: vehicleId,
        }),
      });

      // throw new Error("Something went wrong");
      if (response.status >= 400) {
        throw new Error("Something went wrong");
      }
      setErr(false);

      setError({ isOpen: true, msg: "new device Added" });

      const newData = await response.status;

      // return newData;
    } catch (error) {
      setErr(true);
      setError({ isOpen: true, msg: "This device id is not exist " });

      console.log("error", error);
    }
  };

  const addNewUserUsingCompanyId = async (
    companyId,
    userEmail,
    userPassword,
    userRole,
    token
  ) => {
    const url = RPC_FUNCTION_API_URL + "users";
    const response = await fetch(url, {
      headers: {
        Authorization: token,
        apikey: apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        role: userRole,
        company_id: companyId,
      }),
    });
    try {
      console.log("Response Status", response);
      if (response.status >= 400) {
        throw new Error("Something went wrong");
      }

      const newData = await response.status;
      console.log("rsponse", response);

      setErr(false);
      setError({ isOpen: true, msg: "new user added" });
      return newData;
    } catch (error) {
      setErr(true);
      setError({ isOpen: true, msg: "new user not  added" });
      console.log("error", error);
    }
  };

  function addUser() {
    if (userEmal != "" && userPassword != "") {
      addNewUserUsingCompanyId(
        userCompanyId,
        userEmal,
        userPassword,
        userType,
        TOKEN
      );
      console.log("userType", userType);
    } else {
      console.log("Please Fill Fields");
    }
  }
  const [error, setError] = useState({
    isOpen: false,
    msg: "",
  });

  function addDevice() {
    // console.log("selectedDeviceId", selectedDeviceId);
    // "Jetson";
    addNewDevice(selectedDeviceId, userCompanyId, selectedVehicleId, TOKEN);
  }

  function addVehical() {
    if (vehicalName != "") {
      addNewVehicle(userCompanyId, vehicalName, TOKEN);
      console.log("vehical", vehicalName);
    } else {
      console.log("Please Fill Fields vehical");
    }
    // console.log("vehical", vehicalName);
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
        style={err ? { backgroundColor: "red" } : { backgroundColor: "green" }}
      />
    );
  });

  return (
    <>
      <MainLayout>
        <div className="container-fuild">
          <div className="row  ">
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
                  sx={{ width: "20%" }}
                >
                  {error.msg}
                </Alert>
              </Snackbar>
            ) : null}
            <div className="col-lg-12 col-md-6 col-sm-4">
              <div className="row mt-5 ">
                <div className="col-auto">
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
                <div className="col-auto">
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
                <div className="col-auto">
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
            </div>
            <div className="col-lg-12 col-md-6 col-sm-4 mt-4">
              <div className={styles.sectionHeading}>Add Vehicle</div>
              <div className="row gap-4">
                <div className="col-auto">
                  <CreateCard
                    icon={TRUK}
                    width={"286px"}
                    height={"166px"}
                    sideBar={true}
                    oncdlick={addVehical}
                  >
                    <Input
                      type={"text"}
                      placeholder={"Vehicle Name"}
                      value={vehicalName}
                      setValue={setVehicalName}
                    />
                  </CreateCard>
                </div>
              </div>
            </div>
            {/* <div className="col-lg-12 col-md-6 col-sm-4 ">
              <div className={styles.sectionHeading}>Add Device</div>
              <div className="row gap-4">
                <div className="col-auto">
                  <CreateCard
                    width={"286px"}
                    height={"166px"}
                    sideBar={true}
                    oncdlick={addDevice}
                  >
                    <Input
                      type={"text"}
                      placeholder={"Device Name"}
                      value={selectedDeviceId}
                      setValue={setSelectedDeviceId}
                    />

                    <select
                      class="form-select "
                      aria-label="Default select example"
                      className={styles.dropdown}
                      style={{
                        backgroundColor: "#21222d",
                        color: "white",
                        borderColor: "#21222d",
                        width: "195px",
                        marginTop: "5px",
                      }}
                      onChange={(e) => {
                        // console.log("dropdown", e.target.value);
                        setSelectedVehicleId(e.target.value);
                      }}
                    >
                      {allVehicles.map((vec) => (
                        <option value={vec.id} key={vec.id}>
                          {vec.name}
                        </option>
                      ))}
                      ;
                    </select>
                  </CreateCard>
                </div>
              </div>
            </div> */}
            <div className="col-lg-12 col-md-6 col-sm-4 ">
              <div className={styles.sectionHeading}>Add User</div>
              <div className="row">
                <div className="col-12">
                  <CreateCard
                    width={"565px"}
                    height={"166px"}
                    style={{ left: "40%" }}
                    sideBar={true}
                    oncdlick={addUser}
                  >
                    <div className="row align-items-center justify-content-center gap-3">
                      <div style={{ display: "flex" }}>
                        <div className="gap-y-4">
                          <div>
                            <Input
                              type={"text"}
                              placeholder={"User Email"}
                              value={userEmal}
                              setValue={setUserEmal}
                            />
                          </div>

                          <div>
                            <Input
                              type={"password"}
                              placeholder={"User Password"}
                              value={userPassword}
                              setValue={setUserPassword}
                            />
                          </div>
                        </div>

                        <div
                          style={{
                            height: "103px",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            marginLeft: "15px",
                          }}
                        >
                          {/* <Input
                            type={"text"}
                            placeholder={"User Type"}
                            value={userType}
                            setValue={setUserType}
                          /> */}

                          <select
                            class="form-select "
                            aria-label="Default select example"
                            className={styles.dropdown}
                            style={{
                              backgroundColor: "#21222d",
                              color: "white",
                              borderColor: "#21222d",
                              width: "195px",
                              marginBottom: "10px",
                              marginLeft: "35px",
                            }}
                            onChange={(e) => {
                              // console.log("dropdown", e.target.value);
                              setUserType(e.target.value);
                            }}
                          >
                            {userTypes.map((vec) => (
                              <option value={vec} key={vec}>
                                {vec}
                              </option>
                            ))}
                            ;
                          </select>
                        </div>
                      </div>
                    </div>
                  </CreateCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Create;
