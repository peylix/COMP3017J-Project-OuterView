import { useEffect } from "react"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"

export const Main = () => {
    const state: Record<string, string> = useLocation().state || {}
    const navigator = useNavigate()
    useEffect(() => {
        if (!state.userId) {
            navigator("/")
        }
    }, [])


    return <>fuck u</>
}