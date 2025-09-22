import { useLayoutEffect, useState } from "react"

interface Size {
  width: number;
  height: number;
}

const useWindowSize = () => {
    const [size, setSize] = useState<Size>({width: 0, height: 0})

    useLayoutEffect(() => {
        const handleSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleSize()
        window.addEventListener("resize", handleSize)

        return () => {
            window.removeEventListener('resize', handleSize)
        }
    }, [])

    return size
}

export default useWindowSize;