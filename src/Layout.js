import * as React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = ({...props}) => {
    return (
        <div>
            <p>this is main layout</p>
            <Outlet />
        </div>
    );
};
export default Layout
