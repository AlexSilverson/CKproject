import { createContext, useContext} from "react";
// import { useNavigate } from "react-router-dom";
// import { useLocalStorage } from './useLocalStorage';
const AuthContext = createContext();
//TODO : аунтефикация

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useLocalStorage({keyName: "user", defaultValue: null});
//     const navigate = useNavigate();
//
//     // call this function when you want to authenticate the user
//     const login = async (data) => {
//         setUser(data);
//         navigate("/profile");
//     };
//
//     // call this function to sign out logged in user
//     const logout = () => {
//         setUser(null);
//         navigate("/", { replace: true });
//     };
//
//     const value = useMemo(
//         () => ({
//             user,
//             login,
//             logout,
//         }),
//         [user]
//     );
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

export const useAuth = () => {
    return useContext(AuthContext);
};