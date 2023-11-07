import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const fetchVideoId = async () => {
    try {
      const response = await axios.get(`/get-video-id?url=${url}`);
      setVideoId(response.data.video_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Viewer</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchVideoId}>Fetch Video</button>
      {videoId && (
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default App;

