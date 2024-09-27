import { jwtDecode } from "jwt-decode";


export function isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
          // Decodifica el token para obtener su payload
          const decodedToken = jwtDecode(token);
        
          // Verifica si el token ha expirado
          const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
          if (decodedToken.exp < currentTime) {
            // Token ha expirado, lo eliminamos y retornamos falso
            localStorage.removeItem('token');
            return false;
          }
    
          return true; // Token válido
        } catch (error) {
          // Si hay algún error al decodificar el token, es inválido
          localStorage.removeItem('token'); // Opcional: eliminamos el token inválido
          return false;
        }
      }
    
      return false; // No hay token
}
