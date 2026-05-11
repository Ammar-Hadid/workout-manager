import { useState } from "react"
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ mode, setMode }) => {

    const inititalFormData = {
        email: '',
        userName: '',
        password: ''
    }

    const [form, setForm] = useState(inititalFormData);
    const navigate = useNavigate();
    const { setUser } = useAuth();


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
            const res = await fetch(`http://localhost:4000/api/auth/${action}`, {
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
            console.error(error)
        }

    }

    return (
        <form className="flex flex-col max-w-[50vw] gap-4 p-7" onSubmit={handleOnSubmit}>
            {mode === 'register' && (
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={form.email}
                    onChange={onInputChange}

                    className="border border-black p-2 focus:outline-0"
                />
            )}

            <input
                type="text"
                placeholder="Username"
                name="userName"
                required
                value={form.userName}
                onChange={onInputChange}

                className="border border-black p-2 focus:outline-0"

            />

            <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={form.password}
                onChange={onInputChange}

                className="border border-black p-2 focus:outline-0"

            />

            {mode === 'login' && <p className="cursor-pointer underline" onClick={() => setMode('register')}>Don’t have an account? Sign up</p>}
            {mode === 'register' && <p className="cursor-pointer underline" onClick={() => setMode('login')}>Already have an account? Sign in</p>}

            <button className="bg-black text-white p-2 cursor-pointer transition">
                {mode === "login" ? "Login" : "Register"}
            </button>
        </form>
    )
}


export default AuthForm