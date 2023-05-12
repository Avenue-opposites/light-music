import { Response } from "@/types";
import axios from "@api/index";
/**
 * @description 获取电台节目排行榜
 */
export default async function getRadioProgramToplist(
  offset: number = 0,
  limit: number = 6
): Promise<Response<any>> {
  const response = await axios.get(
    `/dj/program/toplist?limit=${limit}&offset=${offset}`
  );
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
