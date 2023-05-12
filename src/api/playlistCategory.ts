import { Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取歌单分类
 */
export default async function getPlaylistCategory(): Promise<Response<any>> {
  const response = await axios.get("/playlist/catlist");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
