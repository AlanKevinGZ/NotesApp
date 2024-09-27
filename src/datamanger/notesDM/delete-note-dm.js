export class deleteNote {
  async deleteApi(id) {
    let response = await this.makeRequest(
      `http://localhost:3000/api-notes/notes-delete/${id}`,
      "DELETE"
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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error; // Propaga el error de la api para manejarlo en el componente
    }
  }
}
