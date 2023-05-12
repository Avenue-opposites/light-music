import { Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取电台类型
 */
export default async function getPodcastCategory(): Promise<Response<any>> {
  const response = await axios.get("/dj/catelist");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
