import "./Poster.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Poster = () => {
  const token = localStorage.getItem("AT");
  const [data, setData] = useState({});

  //const FETCH_URL = `https://api.spotify.com/v1/me/top/artists?time_range=${len}_term&limit=10&offset=5`

  // useEffect(() => {

  //   // if (localStorage.getItem("AT")) {
  //   //   setToken(localStorage.getItem("AT"));
  //   // }
  //   // console.log(token);
  // }, []);

  console.log(token);

  // "GET" "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1&offset=0"
  // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCGkqmbB6B8NtItE0mSsH6Ye2-jFX2NMftCvkNRrcRiJlarLb6XlRycuNN0FTzhn7NXg7sPXBYlkfpyFmpoqFxVLCbGA9o_R082zltFMIUGlarRToSqYJJbekpu6dcuzsdfqf1oYd5szJi83GrqaQ"

  const getArtists = (len = "long") => {
    console.log(token)
    axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${len}_term&limit=10&offset=5`,
        {
          headers: {
            Authorization: "Bearer " + token,
           
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>MYFEST</h1>
      <button onClick={() => getArtists()} className="show1">
        create
      </button>{" "}
      {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null}
      {/* <button onClick={() => getArtists("short")} className="show2">
        show last 4 weeks
      </button> */}
      <div className="posterBox">
        <ul>
          {/* {data?.items
            ? data.items.map((art, index) => <li key={index}>{art.name}</li>)
            : null} */}
        </ul>
      </div>
    </div>
  );
};

export default Poster;
