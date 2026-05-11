import { useState } from "react";


import AuthForm from "../Components/AuthForm.jsx";

const AuthPage = () => {
    const [mode, setMode] = useState('login');

    return (
        <div>
            <AuthForm mode={mode} setMode={setMode} />
        </div>
    )
}

export default AuthPage;