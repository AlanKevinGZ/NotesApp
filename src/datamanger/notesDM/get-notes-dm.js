export class getNote {

    async getApi() {
        let response = await this.makeRequest("http://localhost:3000/api-notes/get-notes", 'GET');
        return response;
    }

    async makeRequest(url, method) {
        const token = localStorage.getItem('token'); // Obtener el token del localStorage

        const response = await fetch(url, {
            method: method,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluir el token en la cabecera
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json(); // Obtener el mensaje de error
            return errorData;
        }
    }
}
