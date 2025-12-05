"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/store/hooks"
import { loadCart } from "@/store/cartSlice"

export function CartInitializer() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    return null
}
