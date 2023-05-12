import { Response } from "@/types";
import axios from "@api/index";

export default async function getRecommendRadio(): Promise<Response<any>> {
  const response = await axios.get("/personalized/djprogram");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
