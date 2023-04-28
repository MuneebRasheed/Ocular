import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { Formik } from "formik";
import Snackbar from "@mui/material/Snackbar";
import styles from "./Login.module.scss";
import LOGO from "../../assest/image/sidebar/ocularlogo.svg";
import SideBar from "../../components/Sidebar";

const Login = () => {
  const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
  const AUTH_API_URL = "https://mskfjommosmgqsspinpb.supabase.co/auth/v1/";
  const RPC_FUNCTION_API_URL =
    "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/rpc/";
  const authorizationToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg";

  let userCompany;
  let TOKEN;
  let Token;
  let userCompanyId;

  const [error, setError] = useState({
    isOpen: false,
    msg: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("localStorage.getItem", localStorage.getItem("Token"));
    if (localStorage.getItem("Token") != undefined) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = (email, password) => {
    login(email, password).then((newData) => {
      if (newData.error_description == "Invalid login credentials") {
        setError({ isOpen: true, msg: newData.error_description });
      } else {
        TOKEN = newData.access_token;
        const id = newData.user.id;
        const userEmail = newData.user.email.split("@")[0];

        getPublicUserData(id, TOKEN).then((userData) => {
          userCompany = userData[0].company_id;
          userCompanyId = userCompany;

          switch (userData[0].role) {
            case "company administrator":
              console.log("case admin");
              localStorage.setItem("Token", TOKEN);
              localStorage.setItem("UserId", id);
              localStorage.setItem("UserCompanyId", userCompanyId);
              localStorage.setItem("UserEmail", userEmail);
              localStorage.setItem("Type", "Admin");
              localStorage.removeItem("DashboardVehicalID");
              navigate("/dashboard");

              break;
            case "user":
              console.log("case user");
              localStorage.setItem("Token", TOKEN);
              localStorage.setItem("UserId", id);
              localStorage.setItem("UserCompanyId", userCompanyId);
              localStorage.setItem("UserEmail", userEmail);
              localStorage.setItem("Type", "User");
              localStorage.removeItem("DashboardVehicalID");
              navigate("/dashboard");

              break;
            default:
              break;
          }
        });
      }
    });
  };

  const login = async (email, password) => {
    const url = AUTH_API_URL + "token?grant_type=password";
    const response = await fetch(url, {
      headers: {
        Authorization: authorizationToken,
        apikey: apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPublicUserData = async (Id, token) => {
    const url = API_URL + "users?id=eq." + Id + "&select=*";
    const response = await fetch(url, {
      method: "GET",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + token,
        apikey: apiKey,
      },
    });
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <div id="formContainer" className={styles.formContainerClass}>
        <img
          id="logoImage"
          src={LOGO}
          alt="Logo Image"
          width="250"
          className={styles.logoImage}
        />
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
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values.email, values.password);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <>
              <form
                id="userForm"
                className={styles.formStyling}
                action=""
                onSubmit={handleSubmit}
              >
                <input
                  id="loginEmail"
                  className={styles.inputField}
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  id="loginPassword"
                  className={`${styles.inputField}`}
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <span id="errorPara"></span>
                <button type="submit" className={styles.loginBtn}>
                  Login
                </button>
              </form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
// document.getElementById('regularLoginBtn').addEventListener('click', e => {
//   e.preventDefault();
//   document.getElementById('errorPara').innerHTML = "";
//   const email = document.getElementById('loginEmail').value;
//   const password = document.getElementById('loginPassword').value; //superuser credentials
//   // const email = "etolnay@gmail.com";
//   // const password = "ziggySupabase1";
//   // const email = "test@email.com";
//   // const password = "123456";

//   login(email, password).then(newData => {
//     if (newData.error_description == "Invalid login credentials") {
//       document.getElementById('errorPara').innerHTML = "Invalid username or password";
//     } else {
//       TOKEN = newData.access_token;
//       const id = newData.user.id;
//       const userEmail = newData.user.email.split('@')[0]; // document.getElementById('userInfoBtn').innerHTML = userEmail;

//       getPublicUserData(id, TOKEN).then(userData => {
//         userCompany = userData[0].company_id;
//         userCompanyId = userCompany;

//         switch (userData[0].role) {
//           case "administrator":
//             console.log("case admin");
//             localStorage.setItem('Token', TOKEN);
//             localStorage.setItem('UserId', id);
//             localStorage.setItem('UserCompanyId', userCompanyId);
//             localStorage.setItem('UserEmail', userEmail);
//             window.location.href = 'adminpanel.html'; // goToAdminPanel(userData[0].company_id, TOKEN);
//             // document.getElementById('userRoleAnchor').innerHTML = 'Administrator';
//             // document.getElementById('sidenavUserEmail').innerHTML = userData[0].email.split('@')[0];

//             break;

//           case "user":
//             console.log("case user");
//             localStorage.setItem('Token', TOKEN);
//             localStorage.setItem('UserId', id);
//             localStorage.setItem('UserCompanyId', userCompanyId);
//             localStorage.setItem('UserEmail', userEmail);
//             window.location.href = 'userpanel.html'; // goToUserPanel(userData[0].company_id, TOKEN);
//             // document.getElementById('userRoleAnchor').innerHTML = 'User';
//             // document.getElementById('sidenavUserEmail').innerHTML = userData[0].email.split('@')[0];

//             break;

//           default:
//             break;
//         }
//       });
//     }
//   });
// });
//     const login = async (email, password) => {
//       const url = AUTH_API_URL + 'token?grant_type=password';
//       const response = await fetch(url, {
//         headers: {
//           'Authorization': authorizationToken,
//           'apikey': apiKey,
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         method: "POST",
//         body: JSON.stringify({
//           "email": email,
//           "password": password
//         })
//       });

//       try {
//         const newData = await response.json();
//         return newData;
//       } catch (error) {
//         console.log("error", error);
//       }
//     };

//     const getPublicUserData = async (Id, token) => {
//       const url = API_URL + "users?id=eq." + Id + "&select=*";
//       const response = await fetch(url, {
//         method: 'GET',
//         contentType: 'application/json',
//         headers: {
//           'Authorization': "Bearer " + token,
//           'apikey': apiKey
//         }
//       });

//       try {
//         const newData = await response.json();
//         return newData;
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
// const API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/";
// const AUTH_API_URL = "https://mskfjommosmgqsspinpb.supabase.co/auth/v1/";
// const RPC_FUNCTION_API_URL = "https://mskfjommosmgqsspinpb.supabase.co/rest/v1/rpc/";
// const authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg';
// const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1za2Zqb21tb3NtZ3Fzc3BpbnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk4NzAzNjUsImV4cCI6MTk2NTQ0NjM2NX0.8TxiX057SzscQzsX9vQaNDMbfB0WMYsfcuRN5h-LNjg';
// let userCompany;
// let TOKEN;
// let Token;
// let userCompanyId;
