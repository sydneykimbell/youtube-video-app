from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
from urllib.parse import urlparse, parse_qs

app = FastAPI()

class YouTubeURL(BaseModel):
    url: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the YouTube Video API"}

@app.get("/get-video-id")
def get_video_id(url: str):
    parsed_url = urlparse(url)
    query = parse_qs(parsed_url.query)
    video_id = query.get("v")
    if video_id:
        return {"video_id": video_id[0]}
    else:
        raise HTTPException(status_code=400, detail="Invalid YouTube URL")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8001)
