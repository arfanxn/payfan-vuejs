import axios from 'axios';
// import router from '../router';
// import {useAuthUserStore} from "../stores/auth/AuthUserStore.js"; 

export default class AxiosInterceptors {

    static authentication () { 
        const markAsUnauthenticated = () => {
            if (!window.location.href.includes("auth")) { 
                window.location.replace("/auth/login");     
            }
        }


        axios.interceptors.response.use(response => { // then 
            if (response.status == 401)  // 401 == unauthorized == not-authenticated
                markAsUnauthenticated() ; 
            // else if (response.status >= 200 && response.status <= 299)  
            //     markAsAuthenticated();
            
            return response ; 
        } , err => { // catch 
            if (typeof err == "object") {
                if ("response" in err && err.response.status == 401) 
                    markAsUnauthenticated() ; 
                else if ("status" in err && err.status == 401) 
                    markAsUnauthenticated() ; 
            }

            return err ; 
        }) ;
    }
    
}
