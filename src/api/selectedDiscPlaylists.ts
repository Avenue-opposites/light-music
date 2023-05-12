import { Response, SelectedDiscPlaylistData } from "@/types";
import axios from "@api/index";
/**
 * @description 获取网友精选碟歌单
 */
export default async function getSelectedDiscPlaylists(
  order: "hot" | "new",
  category: string = "全部",
  offset: number = 0,
  limit: number = 50
): Promise<Response<SelectedDiscPlaylistData>> {
  const response = await axios.get(
    `/top/playlist?cat=${category}&order=${order}&offset=${offset}&limit=${limit}`
  );
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
