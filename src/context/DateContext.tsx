import { createContext, useContext, useMemo, useState, useCallback } from 'react'


interface DateContextType {
    setedMon: number;
    setedYear: number;
    setSetedMon: React.Dispatch<React.SetStateAction<number>>
    setSetedYear: React.Dispatch<React.SetStateAction<number>>
  }
  
  //
  const DateContext = createContext<DateContextType>({} as DateContextType)
  
  //
  export const DateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [setedYear, setSetedYear] = useState(new Date().getFullYear());
    const [setedMon, setSetedMon] = useState(new Date().getMonth() + 1);
  
    // ✅ memo化
    const contextValue = useMemo(() => ({
      setedYear,
      setSetedMon,
      setedMon,
      setSetedYear
    }), [setedMon, setedYear])
    
    return (
      <DateContext.Provider value={contextValue}>
        {children}
      </DateContext.Provider>
    );
  };
  
  // 
  export function useDate() {
    const context = useContext(DateContext);
    return context;
  }
  