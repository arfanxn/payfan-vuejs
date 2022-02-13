import Helpers from "../../Helpers";

export default {
    namespaced: true,
    // getters: {
    //     userCredentials(state) {
    //     },
    // },
    // actions: {
    //     async login(store) {},
    // },
    // modules: {}

    state: () => ({
        filter_by: {
            transaction_type: null,
            status: null
        },
        filter_options: {
            status: ["Completed", "Pending", "Failed"],
            transaction_type: ["Send", "Request", "Received"]
        }
    }),
    mutations: {
        updateFilterBy(state, value) {
            if (typeof value.transaction_type != "undefined") {
                if (value.transaction_type == null)
                    state.filter_by.transaction_type = null;
                else if (Helpers.arrayContains(state.filter_options.transaction_type, value.transaction_type))
                    state.filter_by.transaction_type = value.transaction_type;
            }
            if (typeof value.status != "undefined") {
                if (value.status == null)
                    state.filter_by.status = null;
                else if (Helpers.arrayContains(state.filter_options.status, value.status))
                    state.filter_by.status = value.status;
            }
        }
    },
    actions: {}
}