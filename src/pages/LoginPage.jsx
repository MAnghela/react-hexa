import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, verifyCode } from "../services/authService";
import { decodeToken } from "../utils/jwtUtils";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codigo, setCode] = useState("");
    const [step, setStep] = useState("login");
    const [message, setMessage] = useState("");

    //navegar entre ventanas
    const navigate = useNavigate();

    //bloquear botones mientras se hace la petición
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            await login(email, password);
            setStep("verify");
            setMessage("Código enviado a tu correo.");
        } catch (error) {
        setMessage(error.message);
        } finally {
        setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
        const data = await verifyCode(email, codigo);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Decodificar el token para obtener la información
        const tokenData = decodeToken(data.accessToken);

        console.log("TOKEN DECODIFICADO:", tokenData);

        // setMessage("Inicio de sesión correcto.");
        // } catch (error) {
        // setMessage(error.message);
        // }
        localStorage.setItem("empleadoId", tokenData.id);
        localStorage.setItem("nombre", tokenData.nombre);
        localStorage.setItem("apellido", tokenData.apellido);
        localStorage.setItem("rol", tokenData.rol);

        const rol = tokenData.rol?.trim().toUpperCase();
        
        // Redirigir según el rol del usuario
                if (rol === "ADMIN") {
    navigate("/admin");
        } else if (rol === "VENDEDOR") {
            navigate("/vendedor");
        } else {               
    setMessage("Rol no reconocido");
        }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main className="login-page">
        <section className="login-card">
            {step === "login" && (
            <>
                <div className="login-header">
                    <h1>Iniciar sesión</h1>
                    <p>Ingresa tus datos para acceder al sistema</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Ingresar"}
                    </button>
                </form>
            </>
            )}

            {step === "verify" && (
            <>
                <div className="login-header">
                    <h1>Verificar código</h1>
                    <p>Ingresa el código enviado a tu correo</p>
                </div>

                <form className="login-form" onSubmit={handleVerify}>
                    <div className="form-group">
                        <label>Código de verificación</label>
                        <input
                        type="text"
                        placeholder="Código"
                        value={codigo}
                        onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <button type="submit">Verificar</button>
                </form>
            </>
            )}

            {message && <p className="login-message">{message}</p>}
        </section>
        </main>
    );
}

export default Login;