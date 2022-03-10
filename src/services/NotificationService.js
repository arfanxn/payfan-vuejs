import axios from "axios";

export default class NotificationService {
    static async latest() {
        try {
            const response = await axios.get('/api/user/self/notifications');
            return response;
        } catch (error) {
            return error.response;
        }
    }
}