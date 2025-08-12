import axios from "axios";


//const API_URL = "http://172.20.10.2:5000/" 
//const API_URL = "http://localhost:5000/" 
//const API_URL = "http://10.100.102.17:5000/"
// "http://172.19.42.37:5000/"
// "http://172.19.34.128:5000"
const API_URL = "http://127.0.0.1:5000/"
class ApiServices
{
     user(){
        return axios.get(API_URL+'users', {'Access-Control-Allow-Origin': '*'})
    }
}
export default new ApiServices()


