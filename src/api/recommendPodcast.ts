import { Response } from "@/types";
import axios from "@api/index";

export default async function getRecommendPodcast(): Promise<Response<any>> {
  const response = await axios.get("/dj/recommend");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
