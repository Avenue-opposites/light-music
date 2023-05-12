import { Response, PodcastRecommendTypeData } from "@/types";
import axios from "@api/index";
/**
 * @description 获取电台推荐类型
 */
export default async function getPodcastRecommendType(): Promise<
  Response<PodcastRecommendTypeData>
> {
  const response = await axios.get("/dj/category/recommend");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
