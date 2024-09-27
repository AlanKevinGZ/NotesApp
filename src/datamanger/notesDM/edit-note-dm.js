export class editNotes{

    async editeApi(id,body) {
        let response = await this.makeRequest(
          `http://localhost:3000/api-notes/notes-edit/${id}`,
          "PUT",
          body
        );
        return response;
      }
    
      async makeRequest(url, method,body) {
        const token = localStorage.getItem("token"); // Obtener el token del localStorage
    
        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Incluir el token en la cabecera
            },
            body: JSON.stringify(body)
          });
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error en la solicitud:", error);
          throw error; // Propaga el error de la api para manejarlo en el componente
        }
      }




}