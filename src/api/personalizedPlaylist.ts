import { PersonalizedPlaylistData, Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取个性化歌单(默认30)
 */
export default async function getPersonalizedPlaylist(
  limit: number = 30
): Promise<Response<PersonalizedPlaylistData>> {
  const response = await axios.get(`/personalized?limit=${limit}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
