import "./Poster.css";
import { useEffect, useState } from "react";
import axios from "axios";


const Poster = () => {
  const [token, setToken] = useState("");
  const tokenType = localStorage.getItem("tokenType");
  const [data, setData] = useState({});

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});

    return paramsSplitUp;
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("AT", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
    if (localStorage.getItem("AT")) {
      setToken(localStorage.getItem("AT"));
    }
    getUsersTopArtists();
    // eslint-disable-next-line
  }, [token]);

  const getUsersTopArtists = (len = "long") => {
    axios
      .get(
        `https://api.spotify.com/v1/me/top/artists?time_range=${len}_term&limit=25&offset=0`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        // console.log(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="btnDiv">
        <button onClick={() => getUsersTopArtists("medium")} className="show1">
          6 months
        </button>
        <button onClick={() => getUsersTopArtists("short")} className="show2">
          4 weeks
        </button>
        <button onClick={() => getUsersTopArtists()} className="show3">
          all time
        </button>
      </div>
      <h1 className="posterHeader">MYFEST</h1>

      <div className="posterBox">
        <ul>
          {data?.items
            ? data.items.map((art, index) => (
                <a
                  key={index}
                  href={`https://open.spotify.com/artist/${art.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <li>{art.name}</li>
                </a>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Poster;
