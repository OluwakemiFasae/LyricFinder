import React, { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function Lyrics() {
  let params = useParams();
  let lyricUrl = `https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${params.id}&apikey=${process.env.REACT_APP_MM_KEY}`;

  let trackUrl = `https://api.musixmatch.com/ws/1.1/track.get?track_id=${params.id}&apikey=${process.env.REACT_APP_MM_KEY}`;

  const [track, setTrack] = useState([]);
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    axios
      .get(lyricUrl)
      .then((res) => {
        setLyrics(res.data.message.body.lyrics);

        axios
          .get(trackUrl)
          .then((resp) => {
            setTrack(resp.data.message.body.track);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <React.Fragment>
        <Link to="/" className="btn btn-dark btn-sm mb-4">
          Go back
        </Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by
            <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Music Genre </strong>:{" "}
            {
              track.primary_genres.music_genre_list[0].music_genre
                .music_genre_name
            }
          </li>
          <li className="list-group-item">
            <strong>Explicit Words </strong>:{" "}
            {track.explicit === 0 ? "No" : "Yes"}
          </li>
          <li className="list-group-item">
            <strong>Release Date</strong>:{" "}
            <Moment format="MM/DD/YYYY">{track.first_release_date}</Moment>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default Lyrics;
