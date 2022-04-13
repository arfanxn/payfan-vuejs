// import axios from "axios";
import {
    defineStore
} from "pinia";
import axios from "axios";
import Helpers from "../Helpers";
import router from "../router/index.js";

export const useActivitiesStore = defineStore("activities", {
    state: () => ({
        "pagination/data": {},
        "pagination/meta": {},
        filter: {
            by: {
                keyword: "",
                start_at: null,
                end_at: null,
                transaction_type: null,
                status: null
            },
            options: {
                status: ["Completed", "Pending", "Rejected", "Failed"],
                transaction_type: ["Sending", "Receiving", "Requesting", "Requested", `${Helpers.ENV("APP_NAME")} Gift`]
            }
        }
    }),

    actions: {
        updateFilterBy({
            keyword,
            start_at,
            end_at,
            status,
            transaction_type
        }) {
            if (typeof keyword != "undefined") {
                this.filter.by.keyword = !keyword ? "" : keyword;
            }
            if (typeof start_at != "undefined") {
                this.filter.by.start_at = start_at == null ? null : start_at;
            }
            if (typeof end_at != "undefined") {
                this.filter.by.end_at = end_at == null ? null : end_at;
            }
            if (typeof transaction_type != "undefined") {
                if (transaction_type == null)
                    this.filter.by.transaction_type = null;
                else if (Helpers.arrayContains(this.filter.options.transaction_type, transaction_type))
                    this.filter.by.transaction_type = transaction_type;
            }
            if (typeof status != "undefined") {
                if (status == null)
                    this.filter.by.status = null;
                else if (Helpers.arrayContains(this.filter.options.status, status))
                    this.filter.by.status = status;
            }
            router.replace({
                ...router.currentRoute,
                // remove all object keys with falsy value 
                query: Object.entries(this.filter.by).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {}),
            });
        },
        async fetch(page = 1) {
            try {
                const {
                    keyword,
                    start_at,
                    end_at,
                    status,
                    transaction_type
                } = this.filter.by;
                const response = await axios.get("/api/user/self/orders", {
                    // const response = await axios.get("/api/orders", {
                    params: {
                        page,
                        keyword: keyword || "",
                        start_at: start_at || null,
                        end_at: end_at || null,
                        type: transaction_type || null,
                        status: status || null
                    }
                });

                if (response.status == 200) {
                    this["pagination/data"] = response.data.orders.data;

                    if (delete response.data.orders.data)
                        this["pagination/meta"] = response.data.orders;
                }

                return response;
            } catch (error) {
                return error.response;
            }
        }
    }
});