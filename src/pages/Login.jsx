import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                // Store JWT
                localStorage.setItem(
                    "token",
                    data.token
                );

                // Store username
                localStorage.setItem(
                    "username",
                    username
                );

                localStorage.setItem("userId", data.id);

                alert(data.message);

                window.location.href = "/";

            } else {

                alert(data.message || "Login failed");
            }

        } catch (error) {

            console.error(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="auth-container">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

            <p>
                Don't have an account?
            </p>

            <button onClick={() => navigate("/register")}>
                Register
            </button>

        </div>
    );
}

export default Login;