import { Response } from "@/types";
import axios from "@api/index";

export default async function logout(): Promise<Response<any>> {
  const response = await axios.get("/logout");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
