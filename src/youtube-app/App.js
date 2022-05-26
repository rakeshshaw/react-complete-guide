import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
import useVideos from "./hooks/useVideos";

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, searchVideos] = useVideos('buildings');
  
  useEffect(()=>{
    setSelectedVideo(videos[0]);
  }, [videos]);

    return ( 
    <div className="ui container">
      <SearchBar onKeywordSubmit={searchVideos} />
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="five wide column">
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </div>
        </div>
      </div>
    </div>
     );
}
 
export default App;