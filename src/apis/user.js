import http from "@/http.js"
 
const getMouInfo = (form) => {
    return http.post('/getMouInfo', form)
}

export { getMouInfo }




