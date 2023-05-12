import { BannersData, Response } from "@/types";
import axios from "@api/index";

export default async function getBanner(): Promise<Response<BannersData>> {
  const response = await axios.get("/banner");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
