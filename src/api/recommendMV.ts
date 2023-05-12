import { Response, RecommendMVData } from "@/types";
import axios from "@api/index";
/**
 * @description 获取推荐MV
 */
export default async function getRecommendMV(): Promise<
  Response<RecommendMVData>
> {
  const response = await axios.get("/personalized/mv");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
