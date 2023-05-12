import { Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取精品歌单分类
 */
export default async function getBoutiquePlaylistCategory(): Promise<
  Response<any>
> {
  const response = await axios.get("/playlist/highquality/tags");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
