import { Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取热门电台
 */
export default async function getHotRadio(
  offset: number = 0,
  limit: number = 6
): Promise<Response<any>> {
  const response = await axios.get(`/dj/hot?limit=${limit}&offset=${offset}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
