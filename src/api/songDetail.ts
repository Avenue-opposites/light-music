import { Response, SongDetailData } from "@/types";
import axios from "@api/index";

export default async function getSongDetail(
  id: number | number[]
): Promise<Response<SongDetailData>> {
  const ids = Array.isArray(id) ? id.join(",") : id.toString();
  const response = await axios.get(`/song/detail?ids=${ids}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
