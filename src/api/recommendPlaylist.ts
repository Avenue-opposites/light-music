import { RecommendPlaylistData, Response } from "@/types";
import axios from "@api/index";

export default async function getRecommendPlaylist(): Promise<
  Response<RecommendPlaylistData>
> {
  const response = await axios.get("/recommend/resource");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
