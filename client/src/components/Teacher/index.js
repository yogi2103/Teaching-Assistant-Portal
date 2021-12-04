import React from "react";
import { useEffect } from "react/cjs/react.development";
import { getDashboardData } from "../../api";

const Teacher = () => {
  const [data, setData] = React.useState({});
  useEffect(async () => {
    let data = await getDashboardData();
    setData(data.data);
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid",
          flexDirection: "column",
          alignItems: "center",
          height: "20%",
        }}
      >
          {console.log(data)}
        <h4>doubts asked : {data?.doubtsAsked}</h4>
        <h4>doubts resolved : {data?.doubtsResolved}</h4>
        <h4>doubts escalated: {data?.doubtsEscalated}</h4>
        <h4>average doubt resolution time: {data?.avgTime} min</h4>
      </div>
      <div style={{height:"80%"}}>
        <h2 style={{ textAlign: "center", marginTop: "10px" }}>ta's report</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "spaceAround",
            border: "2px solid",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            overflow:"scroll",
            padding:"10px"
          }}
        >
            {data?.taData?.map((ta, index) => {
                return (
                    <div key={index} style={{border:"2px solid black"}}>
                    <h4>{ta?.name}</h4>
                    <p>doubts asked : {ta?.acceptedDoubts}</p>
                    <p>doubts resolved : {ta?.resolvedDoubts}</p>
                    <p>doubts escalated: {ta?.escalatedDoubts}</p>
                    <p>average doubt activity time : {ta?.avgTime} min</p>
                    </div>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default Teacher;
