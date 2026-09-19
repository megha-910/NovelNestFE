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

               const text = await response.text();

        // Convert to JSON only if response has content
        const data = text ? JSON.parse(text) : {};

        console.log("Status:", response.status);
        console.log("Response:", data);

            if (response.ok) {
                  const role = data.role?.toUpperCase();
                // Store JWT
                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem("userId", data.id);

                
                  localStorage.setItem(
                    "role",
                    data.role
                );
                // Store username
                localStorage.setItem(
                    "username",
                    data.username
                );



                alert(data.message);


                if (role === "ADMIN") { 
                    window.location.href = "/admin";  
                } if(role === "USER") { 
                     window.location.href = "/"; 
                }
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