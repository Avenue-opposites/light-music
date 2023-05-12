import { Response, ExclusiveEntranceData } from "@/types";
import axios from "@api/index";
/**
 * @description 获取独家放送(入口)
 */
export default async function getExclusive(): Promise<
  Response<ExclusiveEntranceData>
> {
  const response = await axios.get("/personalized/privatecontent");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
