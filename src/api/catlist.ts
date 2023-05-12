import axios from "@api/index";
export default async function getCatlist() {
  const response = await axios.get("/playlist/catlist");
  const data = response.data;
  return data;
}
