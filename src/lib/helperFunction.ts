import { NextResponse } from "next/server";

interface ResponseType {
    success?: number;
    statusCode?: string;
    message?: string;
    data?: string;
}

export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({
        success, statusCode, message, data)
    })
}