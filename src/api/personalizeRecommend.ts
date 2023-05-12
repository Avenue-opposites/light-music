import { Response, PersonalizeRecommendData } from "@/types";
import axios from "@api/index";
/**
 * @description 获取个性化电台推荐
 */
export default async function getPersonalizeRecommend(
  limit: number = 6
): Promise<Response<PersonalizeRecommendData>> {
  const response = await axios.get(`/dj/personalize/recommend?limit=${limit}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
