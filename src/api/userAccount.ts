import { Response } from "@/types";
import axios from "@api/index";

export default async function getUserAccount(): Promise<Response<any>> {
  const response = await axios.get("/user/account");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
