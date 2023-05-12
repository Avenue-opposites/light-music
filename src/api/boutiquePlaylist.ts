import { Response, BoutiquePlaylistData } from "@/types";
import axios from "@api/index";
/**
 * @description 获取精品歌单
 */
export default async function getBoutiquePlaylist(
  category: string = "全部",
  limit: number = 50,
  before?: number
): Promise<Response<BoutiquePlaylistData>> {
  const beforeParam = before ? `&before=${before}` : "";
  const response = await axios.get(
    `/top/playlist/highquality?cat=${category}&limit=${limit}${beforeParam}`
  );
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
