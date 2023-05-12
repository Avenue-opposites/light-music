import { Response, SongURLData, SOUND_QUALITY } from "@/types";
import axios from "@api/index";

export default async function getSongUrl(
  id: number | number[],
  level: SOUND_QUALITY
): Promise<Response<SongURLData>> {
  const ids = Array.isArray(id) ? id.join(",") : id.toString();
  const response = await axios.get(`/song/url/v1?id=${ids}&level=${level}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
