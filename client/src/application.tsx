import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./config/routes";
import { useAuth } from "./contexts/AuthContext";



const Application: React.FC = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Routes>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.component isLoggedIn={isLoggedIn} />}
                    />
                );
            })}
        </Routes>
    );
};

export default Application;
