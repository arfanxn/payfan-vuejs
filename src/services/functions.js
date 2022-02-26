import axios from "axios";

export const searchPeoplesOnPayfan = async (keyword) => {
    try {
        const response = await axios.get(`/api/users-and-contacts/search`, {
            params: {
                keyword
            }
        });

        return response;
    } catch (error) {
        return error.response;
    }
}