import axios from 'axios';

const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY
const axiosClient = axios.create({
    baseURL: 'https://arzunocv-strapi-backend-production.up.railway.app/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
})

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data)
const getUserResumes = (userEmail) => axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail)
const UpdateResumeDetails = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);
const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}`+"?populate=*");
const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`)
const getAllResumes = () => axiosClient.get('/user-resumes?populate=*');


export default{
    CreateNewResume,
    getUserResumes,
    UpdateResumeDetails,
    GetResumeById,
    DeleteResumeById,
    getAllResumes
}