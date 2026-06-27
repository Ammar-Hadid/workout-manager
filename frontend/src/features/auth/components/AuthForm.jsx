import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../../../shared/context/toastContext.jsx";
import DefaultButton from "../../../shared/components/DefaultButton.jsx";
import FormInput from "../../../shared/components/FormInput.jsx";
import { getApiUrl } from "../../../config/api.js";

const AuthForm = ({ mode, setMode }) => {

    const inititalFormData = {
        email: '',
        userName: '',
        password: ''
    }

    const [form, setForm] = useState(inititalFormData);
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { showToast } = useToast();


    const onInputChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const action = mode === 'login' ? 'login' : 'register';

        try {
            const res = await fetch(getApiUrl(`/auth/${action}`), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error)
            }

            setUser(data.user);
            navigate('/', { replace: true });
        }

        catch (error) {
            console.error(error);
            showToast(error.message);
        }

    }

    return (
        <form className="flex w-full flex-col gap-lg" onSubmit={handleOnSubmit}>
            {mode === 'register' && (
                <FormInput
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onInputChange}
                />
            )}

            <FormInput
                type="text"
                placeholder="Username"
                name="userName"
                required
                value={form.userName}
                onChange={onInputChange}
            />

            <FormInput
                type="password"
                placeholder="Password"
                name="password"
                required
                value={form.password}
                onChange={onInputChange}
            />

            {mode === 'login' && <button type="button" className="cursor-pointer text-left text-body-sm text-text-secondary underline decoration-primary underline-offset-4 transition hover:text-text-primary" onClick={() => setMode('register')}>Don’t have an account? Sign up</button>}
            {mode === 'register' && <button type="button" className="cursor-pointer text-left text-body-sm text-text-secondary underline decoration-primary underline-offset-4 transition hover:text-text-primary" onClick={() => setMode('login')}>Already have an account? Sign in</button>}

            <DefaultButton type="submit">
                {mode === "login" ? "Login" : "Register"}
            </DefaultButton>
        </form>
    )
}


export default AuthForm
