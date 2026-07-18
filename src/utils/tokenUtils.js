// Utility centralizado para manejar tokens de forma segura

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/**
 * Obtiene el token de acceso del localStorage
 * @returns {string|null} El token o null si no existe
 */
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/** 
 * Obtiene el refresh token del localStorage
 * @returns {string|null} El refresh token o null si no existe
 */
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
}

/**
 * Construye los headers con el token de autorización
 * @returns {object} Headers con token Bearer
 */
export function getAuthHeaders() {
    const token = getAccessToken();
    
    if (!token) {
        console.warn("No se encontró token de acceso");
        throw new Error("Token no disponible. Por favor, inicia sesión nuevamente.");
    }

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

/**
 * Valida si el token existe y es válido
 * @returns {boolean} true si existe token, false en caso contrario
 */
export function isTokenValid() {
    return !!getAccessToken();
}

/**
 * Limpia los tokens del localStorage (logout)
 */
export function clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function obtenerPayloadToken() {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        return null;
    }

    const payload = token.split(".")[1];

    return JSON.parse(atob(payload));
}
export function obtenerEmpleadoId() {
    const payload = obtenerPayloadToken();
    return payload?.id;
}