import React from 'react';
import axios from 'axios';

// function callServer() {
//   axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
//     params: {
//       table: 'vehicle',
//     },
//   }).then((response) => {
//     var test = response.data;
//     return (
//       <h1>{test}</h1>
//     );
//   });
// }

export function SampleComponent() {
  let [responseData, setResponseData] = React.useState('')
  axios.get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}`, {
    params: {
      table: 'vehicle',
    },
  }).then((response) => {
    setResponseData([response.data.vin])
    console.log(response.data)
  });
  return (
      <h1>{responseData}</h1>
  );
}