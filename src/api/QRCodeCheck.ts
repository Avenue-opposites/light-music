import { Response } from "@/types";
import axios from "@api/index";

export default async function getQRCodeCheck(
  RQCodeKey: string
): Promise<Response<any>> {
  const timestamp = Date.now();
  const response = await axios.get(
    `/login/qr/check?key=${RQCodeKey}&timestamp=${timestamp}`
  );
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
