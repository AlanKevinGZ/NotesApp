export class userLoginToken{

    async postApi(body){
        let response=await this.makeRequest("http://localhost:3000/api-login/login-user",'POST',body)
        return response;
    }


   async makeRequest(url,method,body){
    try {
        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
         return data;
        } else {
          const errorData = await response.json();
         console.log(errorData);
         
        }
      } catch (error) {
        console.log(error);
        
      }
    }

}