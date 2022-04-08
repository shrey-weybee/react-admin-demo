import * as React from 'react';
import AppSidebar from "./partials/AppSidebar";
import AppHeader from "./partials/AppHeader";
import AppFooter from "./partials/AppFooter";

import { Outlet } from "react-router-dom";
import {CContainer} from "@coreui/react";

const DefaultLayout = ({...props}) => {
    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CContainer lg>
                        <Outlet />
                    </CContainer>
                </div>
                <AppFooter />
            </div>
        </div>
    );
};
export default DefaultLayout
