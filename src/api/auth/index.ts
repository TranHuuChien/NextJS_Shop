import { API_ENDPOINT } from "@/lib/UrlConstant"
import { TLoginAuth, TRegisterAuth } from "@/types/auth"
import axios from "axios"


export const loginAuth = async (data: TLoginAuth) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/login`, data)
  return res.data
}

export const registerAuth = async (data: TRegisterAuth) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/register`, data)
  return res.data
}


export const logoutAuth = async () => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.INDEX}/logout`)
  return res.data
}
