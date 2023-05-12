import axios from "@api/index";
import { Response } from "@/types";
export default async function getCountryCode(): Promise<Response<any>> {
  const response = await axios.get("/countries/code/list");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
