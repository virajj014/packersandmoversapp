import axios from "axios";
import envs from "../env";
export default axios.create({
    baseURL: envs.BACKEND_URL,
});