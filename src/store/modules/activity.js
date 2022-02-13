export default {
    namespaced: true,
    // getters: {
    //     userCredentials(state) {
    //     },
    // },
    // mutations: {
    //     userCredentials(state, newValue) {}
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
            if (typeof value.transaction_type != "undefined")
                state.filter_by.transaction_type = value.transaction_type;
            if (typeof value.status != "undefined")
                state.filter_by.status = value.status;
        }
    },
    actions: {}
}