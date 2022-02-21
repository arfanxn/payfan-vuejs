// import axios from "axios";
import {
    defineStore
} from "pinia";
import Helpers from "../Helpers";

export const useActivitiesStore = defineStore("activities", {
    state: () => ({
        filter: {
            by: {
                transaction_type: null,
                status: null
            },
            option: {
                status: ["Completed", "Pending", "Failed"],
                transaction_type: ["Send", "Request", "Received"]
            }
        }
    }),

    actions: {
        updateFilterBy({
            status,
            transaction_type
        }) {
            if (typeof transaction_type != "undefined") {
                if (transaction_type == null)
                    this.filter.by.transaction_type = null;
                else if (Helpers.arrayContains(this.filter.option.transaction_type, transaction_type))
                    this.filter.by.transaction_type = transaction_type;
            }
            if (typeof status != "undefined") {
                if (status == null)
                    this.filter.by.status = null;
                else if (Helpers.arrayContains(this.filter.option.status, status))
                    this.filter.by.status = status;
            }
        }
    }
});