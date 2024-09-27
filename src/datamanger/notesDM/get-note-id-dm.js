export class getNoteById {
  async getApi(id) {
    let response = await this.makeRequest(
      `http://localhost:3000/api-notes/get-note-id/${id}`,
      "GET"
    );
    return response;
  }

  async makeRequest(url, method) {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
        },
      });
      if (!response.ok) {
        // Maneja errores de la respuesta
         return { error: true, status: response.status }; // Retorna un objeto de error
       }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }
}
