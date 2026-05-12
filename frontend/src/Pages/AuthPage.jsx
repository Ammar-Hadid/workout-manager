import { useState } from "react";


import AuthForm from "../Components/AuthForm.jsx";

const AuthPage = () => {
    const [mode, setMode] = useState('login');

    return (
        <section className="
        flex justify-center items-center 
        h-[80vh] w-screen">

            <div className="
            flex flex-col gap-7
            p-7
            border-3 border-black">

                <h1 className="
                text-[2rem] font-light">
                    {mode === 'login' ? 'Login' : 'Register'}
                </h1>


                <AuthForm mode={mode} setMode={setMode} />
            </div>
        </section>
    )
}

export default AuthPage;











