import React from "react";
import { Link } from "react-router-dom";

const CreatePlaylist = () => {
  return (
    <div>
      <Link to="/yourposter">
        <button>back</button>
      </Link>
      <h1>Create Your Festival Playlist</h1>
    </div>
  );
};

export default CreatePlaylist;
