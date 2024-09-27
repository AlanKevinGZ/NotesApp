// create-note-dm.js
export class createNote {
    async postApi(body) {
        try {
            let response = await this.makeRequest(
                "http://localhost:3000/api-notes/create-note",
                "POST",
                body
            );

            // Verifica si la respuesta no está OK y lanza un error con el mensaje de la API
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear la nota.');
            }

            // Si la respuesta es OK, retorna los datos
            const data = await response.json();
            return data;
        } catch (error) {
            throw error; // Propaga el error para manejarlo en el componente
        }
    }

    async makeRequest(url, method, body) {
        const token = localStorage.getItem("token"); // Obtiene el token de localStorage
        try {
            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`; // Añade el encabezado de autorización
            } else {
                console.warn("No se encontró un token de autenticación.");
            }

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(body),
            });

            return response;
        } catch (error) {
            console.error('Error en la solicitud:', error);
            throw error; // Propaga el error de la api para manejarlo en el componente
        }
    }
}
