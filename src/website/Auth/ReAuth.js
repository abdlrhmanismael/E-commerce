import { useEffect, useState } from "react";
import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";
import Loading from "../../Dasboard/Components/Loading";
export default function ReAuth() {
    const cookie = Cookie();
    const token = cookie.get("CustomerAccount");
    const [isuser, setIsUser] = useState(false);
    const [loading, setLoading] = useState(true);

    async function check() {
        try {
            if (token)
                setIsUser(true);
        } catch (err) {
            setIsUser(false);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        check();
    }, []);
    return token === "" ? (
        <Outlet />
    ) : loading ? (
        <Loading />
    ) : isuser ? (
        (window.location.pathname = "/account/login")
    ) : (
        <Outlet />
    );
}
