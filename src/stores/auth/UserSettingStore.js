import {
    defineStore
} from "pinia";

export const useUserSettingStore = defineStore("userSetting", {
    state: () => ({
        data: {},
    }),
    actions: {
        async fill(settings) {
            this.data = settings;
        }
    }
});