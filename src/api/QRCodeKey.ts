import { Response } from "@/types";
import axios from "@api/index";

export default async function getQRCodeKey(): Promise<Response<any>> {
  const timestamp = Date.now();
  const response = await axios.get(`/login/qr/key?timestamp=${timestamp}`);
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
