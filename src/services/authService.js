const API_URL = "http://localhost:8080/api/auth";

export async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({
        email,
        password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Error al iniciar sesión. Datos incorrectos");
    }

    return data;
    }

    export async function verifyCode(email, code) {
    const response = await fetch(`${API_URL}/verify`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email,
        codigo: code,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Error al verificar el código");
    }

    return data;
}