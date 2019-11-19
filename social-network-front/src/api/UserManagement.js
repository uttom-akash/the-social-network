import axios from './Axios'

export default {
    register:(data)=>axios.post('/api/user/register',data).then(resp=>resp.data),
    resendEmail:(data)=>axios.post('/api/user/resend-email',data).then(resp=>resp.data),
    confirmEmail:(id,code)=>axios.get(`/api/user/confirm-email?id=${id}&code=${code}`).then(resp=>resp.data),
    searchUser:(data)=>axios.get(`/api/user/search-user?name=${data}`).then(resp=>resp.data),
    getUser:(userId)=>axios.get(`/api/user/get-user?userId=${userId}`).then(resp=>resp.data),
    getUsers:(offset=0,limit=20)=>axios.get(`/api/user/get-users?offset=${offset}&limit=${limit}`).then(resp=>resp.data),
    getSpecifiedUser:(data)=>axios.post('/api/user/get-specified-users',data).then(resp=>resp.data),
    removeUser:()=>axios.get('/api/user/remove-user').then(resp=>resp.data),
}