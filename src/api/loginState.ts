import { Response, UserAccount } from "@/types";
import axios from "@api/index";

export default async function getLoginState(): Promise<Response<UserAccount>> {
  const response = await axios.get("/login/status");
  const { data, status: code, statusText: message } = response;
  return {
    data,
    code,
    message,
  };
}
