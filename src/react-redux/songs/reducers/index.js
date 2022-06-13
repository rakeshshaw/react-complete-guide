import { combineReducers } from "redux";

const songsReducer = () => {
  return [
    { title: "abc song", duration: "4:05" },
    { title: "pqr song", duration: "3:05" },
    { title: "xyz song", duration: "4:15" },
    { title: "mno song", duration: "4:25" },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }

  return selectedSong;
};

export default combineReducers({
    songs: songsReducer,
    selectedSong: selectedSongReducer
});
