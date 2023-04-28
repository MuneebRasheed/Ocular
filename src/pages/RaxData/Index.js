import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@material-ui/core/colors";
import MainLayout from "../../layout/MainLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Calendar from "moedim";
import Card1 from "../../components/cards/Card1";
import CALENDER from "../../assest/image/pages/Calendar.svg";
import VEHICLE from "../../assest/image/Vehicle.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#21222d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const RaxData = () => {
  const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";

  const token = localStorage.getItem("Token")
    ? localStorage.getItem("Token")
    : null;

  const companyId = localStorage.getItem("UserCompanyId")
    ? localStorage.getItem("UserCompanyId")
    : null;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [allVehicles, setAllVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState();
  // "2022-04-18";
  const [value, setValue] = useState(new Date());
  const [temp, setTemp] = useState();
  const [calender, setCalender] = useState(false);
  const handleVehicle = (data) => {
    setSelectedVehicleId(data.target.value);
  };

  const getVehiclesUsingCompanyId = async () => {
    setLoading(true);
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
      // console.log("New Raw Data", newData);
      setAllVehicles(newData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getIncidents = async () => {
    setLoading(true);
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
      console.log("Newww", newData);
      setItems(newData);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getVehicleIncidentsUsingDate = async (vehicleId, date, token) => {
    // incidents?vehicle_id=eq.1&created_at=gte.2022-04-18&select=*

    // "incidents?vehicle_id=eq." +
    //   vehicleId +
    //   "&created_at=gte.2022-04-18&select=*";
    var ddate = value.toLocaleDateString("en-US");
    var myArray = ddate.split("/");
    var dt = myArray[2] + "-" + myArray[0] + "-" + myArray[1];
    var t = "";
    if (selectedVehicleId == undefined) {
      t = "";
    } else {
      t = "vehicle_id=eq." + vehicleId + "&";
    } // 2022 - 04 - 18;
    console.log(dt);
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

      setItems(newData);
      setLoading(false);
      console.log("newData fetch", newData);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getVehicleIncidentsUsingDate(selectedVehicleId, value, token);
  }, [selectedVehicleId, temp]);

  useEffect(() => {
    getVehiclesUsingCompanyId();
    // console.log("vehicalIDD", selectedVehicleId);
  }, []);

  return (
    <MainLayout>
      {/* <h1 className="text-white mb-5" style={{ fontFamily: "roboto" }}>
        Raw Data
      </h1> */}
      <div
        className="mb-5 col-lg-12 col-md-6 col-sm-4 mt-4 gap-3"
        style={{
          display: "flex",
          alignItem: "center",
        }}
      >
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
            text={"DashboardVehicalID"}
            icon={VEHICLE}
            togle={true}
            data={allVehicles}
            setMethod={handleVehicle}
          />
        </div>

        {calender && (
          <div
            style={{
              marginTop: "97px",
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

      {items.length === 0 ? (
        <div className="d-flex justify-content-center">
          <h1 className="text-white">No Incidents Found</h1>
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
              <TableHead style={{ width: "100px" }}>
                <TableRow>
                  <StyledTableCell align="center">Incident ID</StyledTableCell>
                  <StyledTableCell align="center">Device ID</StyledTableCell>
                  <StyledTableCell align="center">Location</StyledTableCell>
                  <StyledTableCell align="center">Max Velocity</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">
                    No. Pedestrains
                  </StyledTableCell>
                  <StyledTableCell align="center">Created AT</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {items.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell align="center">{row?.id}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.device_id}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.location}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.max_velocity || "No Velocity Found"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.type}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row?.no_pedestrians || "No Pedestrain Found"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {moment(row?.created_at).format("LL")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div className="bg-transparent mt-4 d-flex justify-content-center custom-paginate">
        <Pagination count={10} color="primary" />
      </div> */}
        </>
      )}
    </MainLayout>
  );
};

export default RaxData;
