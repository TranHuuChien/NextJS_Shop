import axios, { AxiosRequestConfig } from 'axios'
import React from "react";
import {NextRouter} from "next/router";
import {UserDataType} from "@/context/type";

export const BASE_URL = `${process.env.NEXT_PUBLIC_API_HOST}/api`

const instanceAxios = axios.create({ baseURL: BASE_URL})


type TAxiosIntercepter = {
    children: React.ReactNode
}

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {

}

let isRefreshing = false
let failedQueue:any[] = []

const processQueue = (error:any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if(token) {
            prom.resolve(token)
        }else {
            prom.reject(error)
        }
    })
    failedQueue = []
}


