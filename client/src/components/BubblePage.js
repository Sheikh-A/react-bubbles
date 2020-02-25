// Stage 2 - Consuming the API
// Step 1 - When`BubblePages` renders, make a GET request to fetch the color data for your bubbles.
import React, { useState, useEffect } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        // res.data.data
        console.log("API INFO HERE", res);
        setColorList(res.data)
      })
      .catch(err => {
        console.log("API Data Not Pulling In", err);
      });
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
