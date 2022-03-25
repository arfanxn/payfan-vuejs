import axios from "axios";

export default class NotificationService {
    static async latest(page = 1) {
        try {
            const response = await axios.get(`/api/user/self/notifications?page=${page}`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async markAsRead(id) {
        try {
            const response = await axios.post(`/api/user/self/notification/${id}/mark-as-read`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async markAsUnread(id) {
        try {
            const response = await axios.post(`/api/user/self/notification/${id}/mark-as-unread`);
            return response;
        } catch (error) {
            return error.response;
        }
    }

    static async loadPagination(url) {
        try {
            const response = await axios.post(url);
            return response;
        } catch (error) {
            return error.response;
        }
    }
}