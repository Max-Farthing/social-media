import { createContext, useState } from "react";

const authContext = createContext()

export default function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    function login(userData) {
        setIsAuthenticated(true)
        setUser(userData)
    }

    function logout() {
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <authContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </authContext.Provider>
    )

}

//custom hook for ease of use
export const useAuth = () => useContext(authContext)