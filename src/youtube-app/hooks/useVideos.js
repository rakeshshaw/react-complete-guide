import { useEffect, useState } from "react";
import youtube from "../apis/youtube";

const useVideos = (defaultSearchKeyword) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    searchVideos(defaultSearchKeyword);
  }, [defaultSearchKeyword]);

  const searchVideos = async (keyword) => {
    const response = await youtube.get("/search", {
      params: {
        q: keyword,
      },
    });
    // console.log(response.data.items);
    setVideos(response.data.items);
  };

  return [videos, searchVideos];
};

export default useVideos;
