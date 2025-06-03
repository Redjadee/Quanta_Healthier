import { createContext, useContext, useState, useMemo } from "react"

//分享框的全局状态控制
//随时随地，可以唤出
interface ShareContextType {
    share: boolean
    setShare: React.Dispatch<React.SetStateAction<boolean>>
}

const ShareContext = createContext<ShareContextType>({} as ShareContextType)

export const ShareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [share, setShare] = useState(false)
    
    const contextValue = useMemo(() => ({
        share,
        setShare
    }), [share])

    return (
        <ShareContext.Provider value={contextValue} >
            {children}
        </ShareContext.Provider>
    )
}

export function useShare() {
    const context = useContext(ShareContext)
    return context
}