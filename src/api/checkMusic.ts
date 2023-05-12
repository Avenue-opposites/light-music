import { Response, CheckMusicData } from "@/types";
import axios from "@api/index";

export default async function getCheckMusic(
  id: number
): Promise<Response<CheckMusicData>> {
  const response = await axios.get(`/check/music?id=${id}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
