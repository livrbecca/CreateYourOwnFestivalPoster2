import "./Poster.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Poster = () => {
  //const token = localStorage.getItem("AT");
  const [token, setToken] = useState("");
  const tokenType = localStorage.getItem("tokenType");
  const [data, setData] = useState({});

  //const FETCH_URL = `https://api.spotify.com/v1/me/top/artists?time_range=${len}_term&limit=10&offset=5`

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});

    return paramsSplitUp;
  };

  useEffect(() => {
    // getReturnedParamsFromSpotifyAuth(window.location.hash);
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear(); // tried localStorage.removeItem("AT")
      localStorage.setItem("AT", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("AT")) {
      setToken(localStorage.getItem("AT"));
    }
    console.log(token);
  }, []);

  console.log(token); // works, it IS in local storage
  console.log(tokenType);

  // "GET" "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=1&offset=0"
  // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCGkqmbB6B8NtItE0mSsH6Ye2-jFX2NMftCvkNRrcRiJlarLb6XlRycuNN0FTzhn7NXg7sPXBYlkfpyFmpoqFxVLCbGA9o_R082zltFMIUGlarRToSqYJJbekpu6dcuzsdfqf1oYd5szJi83GrqaQ"

  const getArtists = (len = "long") => {
    console.log(token); // works
    // network gives error: no token provided
    axios
      .get(`https://api.spotify.com/v1/me/top/artists`, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      })
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
