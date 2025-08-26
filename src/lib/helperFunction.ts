import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

interface ResponseType {
    success?: number;
    statusCode?: string;
    message?: string;
    data?: string;
}


export const isAuthenticated = async (role) => {
    try {
        const cookieStore = await cookies()
        if(!cookieStore.has('access_token')) {
            return {
                isAuth: false,
            }
        }
        const access_token = cookieStore.get('access_token')
        //const { payload } = await jwtVerify(access_token.value, new TextEncoder().encode(process.env.SECRET_KEY));  

    } catch (error) {

    };
}
