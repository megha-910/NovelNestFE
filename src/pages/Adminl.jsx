
import { Outlet } from "react-router-dom";
import Admins from "./Admins";

function Adminl() {

    return (
        <div className="admin-layout">

            <Admins />

            <main className="admin-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Adminl;

