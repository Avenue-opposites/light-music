import { Response } from "@/types";
import axios from "@api/index";

export default async function getUserDetail(
  uid: number
): Promise<Response<any>> {
  const response = await axios.get(`/user/detail?uid=${uid}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
