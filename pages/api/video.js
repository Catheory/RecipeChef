import axios from "axios";

// GET `api/video`
export default async function videoHandler(req, res) {
  const { q } = req.query;
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${q}&key=${process.env.YOUTUBE_KEY}`
  );
  res.json(data);
}
