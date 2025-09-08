'use client'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

// interface Props {
//     url: string,
//     method?: string,
//     options?: RequestInit
// }

const useFetch = ( url, method= "GET", options={}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [refreshIndex, setRefreshIndex] = useState(0)

    const optionString = JSON.stringify(options)
    const requestOptions = useMemo(() => {
        const opts = {...options}
        if(method === 'POST' && !opts.body) {
            opts.body = null
        }
        return opts
    }, [method, optionString])
    
    useEffect(() => {   
        const apiCall = async () => {
            setLoading(true)
            setError(null)
            try {
                const { data: response } = await axios({
                    url, 
                    method,
                    ...(requestOptions)
                })
                if(!response.success) {
                    throw new Error(response.message)
                }
                setData(response)
            } catch(error) {
                setError(response.message)
            } finally {
                setLoading(false)
            }
        }

        apiCall()
    }, [url, refreshIndex, requestOptions])

    const refetch = () => {
        setRefreshIndex(prev => prev + 1)
    }

    return { data, loading, error, refetch }
}

export default useFetch