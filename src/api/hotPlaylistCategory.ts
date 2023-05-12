import { Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取热门歌单分类
 */
export default async function getHotPlaylistCategory(): Promise<Response<any>> {
  const response = await axios.get("/playlist/hot");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
