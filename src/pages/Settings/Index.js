import React from "react";
import Card3 from "../../components/cards/Card3/Index";
import MainLayout from "../../layout/MainLayout";
import CREATE from "../../assest/image/settings/create.svg";
import ASSIGN from "../../assest/image/settings/play.svg";
import FILTER from "../../assest/image/settings/filters.svg";

const Settings = () => {
  return (
    <>
      <MainLayout>
        <div
          className="row mt-5 mb-5  flex flex-col items-center justify-center"
          style={{
            justifyContent: "center",
            alignItem: "center",
            height: "70vh",
            paddingTop: "90px",
          }}
        >
          <Card3 cardIcon={CREATE} name={"Create"} path={"/settings/create"} />

          <Card3 cardIcon={ASSIGN} name={"Assign"} path={"/settings/assign"} />
          <Card3
            cardIcon={FILTER}
            name={"Filter"}
            path={"/settings/filter"}
            width={"50px"}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default Settings;
