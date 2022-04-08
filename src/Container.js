import * as React from 'react';
import { Outlet } from "react-router-dom";

const Container = ({...props}) => {
    return (
        <div>
        <p>this container</p>
            <Outlet />
        </div>
    );
};
export default Container
