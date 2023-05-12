import { Response } from "@/types";
import axios from "@api/index";

export default async function getRecommendProgram(): Promise<Response<any>> {
  const response = await axios.get("/program/recommend");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
