import { Response } from "@/types";
import axios from "@api/index";

export default async function getQRCode(
  RQCodeKey: string,
  base64: boolean
): Promise<Response<any>> {
  const response = await axios.get(
    `/login/qr/create?key=${RQCodeKey}${base64 ? "&qrimg=true" : ""}`
  );
  const { data, status: code, statusText: message } = response;
  return {
    // data: data.data,
    data,
    code,
    message,
  };
}
