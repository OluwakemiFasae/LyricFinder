import React, { useState } from "react";
import axios from "axios";
import { Consumer } from "../../context";

const Search = () => {
  const [title, setTitle] = useState([]);

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const findTracks = (e, dispatch) => {
    e.preventDefault();
    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/track.search?q_track=${title}&page_size10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
        setTitle("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Consumer>
      {(value) => {
        const { dispatch } = value;
        return (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music"></i> Search for A Song
            </h1>
            <p className="lead text-center">Get the lyrics for a song</p>
            <form onSubmit={(e) => findTracks(e, dispatch)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Song title..."
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                className="btn btn-primary btn-lg w-100 mt-2"
                type="submit"
              >
                Get Track Lyrics
              </button>
            </form>
          </div>
        );
      }}
    </Consumer>
  );
};

export default Search;
