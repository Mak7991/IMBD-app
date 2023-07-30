import React, { createContext, useContext } from "react";


export const AppContext = createContext();


export const withAppContext = (Component) => (props) =>
(
    <AppContext.Consumer>
        {(value) => <Component {...value} {...props} />}
    </AppContext.Consumer>
);

const AppProvider = ({ children }) => {
    const user_data = localStorage.getItem('user')

    return (
        <AppContext.Provider
            value={{ user_data }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
export const useProfile = () => useContext(AppContext);