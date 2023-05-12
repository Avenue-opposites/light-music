import { Response, RecommendNewSongData } from "@/types";
import axios from "@api/index";

export default async function getRecommendNewSong(
  limit: number = 10
): Promise<Response<RecommendNewSongData>> {
  const response = await axios.get(`/personalized/newsong?limit=${limit}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
