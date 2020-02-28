import axios from "axios";
export const axiosCreate = axios.create();

export async function someRequest(){
  axiosCreate.get("http://localhost/users");
}