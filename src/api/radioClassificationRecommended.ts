import { Response, CLASSIFICATION_PODCAST_TYPE } from "@/types";
import axios from "@api/index";

export default async function getRecommendProgram(
  type: CLASSIFICATION_PODCAST_TYPE
): Promise<Response<any>> {
  const response = await axios.get(`/dj/recommend/type?type=${type}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
