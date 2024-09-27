export class loginUser{

    async postApi(body){
        let response=await this.makeRequest("http://localhost:3000/api-login/login-user",'POST',body)
        return response;
    }


   async makeRequest(url,method,body){
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
    
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error en el inicio de sesión');
        }
    }

}