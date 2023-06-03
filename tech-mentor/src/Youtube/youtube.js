import axios from "axios";
const KEY = "AIzaSyAwsFzF2YMFOcZ05Bc2DY3lUGJzi2F8Xvk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 12,
    type: "video",
    key: KEY,
  },
});
