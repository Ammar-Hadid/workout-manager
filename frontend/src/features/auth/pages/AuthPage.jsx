import { useState } from "react";


import AuthForm from "../components/AuthForm.jsx";

const AuthPage = () => {
    const [mode, setMode] = useState('login');

    return (
        <section className="flex min-h-screen w-full items-center justify-center px-lg py-section-l">

            <div className="flex w-full max-w-form flex-col gap-xl rounded-card border border-text-secondary/20 bg-bg-surface-elevated p-xl shadow-2xl md:p-2xl">

                <h1 className="text-h2 font-semibold text-text-primary">
                    {mode === 'login' ? 'Login' : 'Register'}
                </h1>


                <AuthForm mode={mode} setMode={setMode} />
            </div>
        </section>
    )
}

export default AuthPage;








