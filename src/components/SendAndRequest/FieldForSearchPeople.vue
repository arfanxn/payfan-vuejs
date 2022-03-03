<template>
    <div class="form-floating">
        <input
            @keyup.esc="hideResults"
            @input="hideResultsIfKeywordNull"
            v-model="state.search.keyword"
            @focus="state.search.show_results = true"
            @keyup.enter="search"
            type="text"
            class="form-control"
            id="inputSendTo"
            placeholder="Name on your contacts or Email"
        />
        <label class="text-secondary" for="inputSendTo">Name on your contacts or Email</label>
        <DropdownResultOfSearchPeople
            :keyword="state.search.keyword"
            :show="state.search.show_results"
            :users="state.search.results.users"
            :contacts="state.search.results.contacts"
            @contactClicked="onContactClicked"
            @peopleClicked="onPeopleClicked"
        />
        <button
            @keyup.esc="hideResults"
            v-show="!props.showButton"
            @click="search"
            class="btn btn-light border-dark rounded-pill py-2 px-4 mt-4"
        >Next</button>
    </div>
</template>

<script setup>
import { defineComponent, defineEmits, defineProps, onMounted, reactive } from 'vue';
import { searchPeoplesOnPayfan } from '../../services/functions';
import DropdownResultOfSearchPeople from './DropdownResultOfSearchPeople.vue';
defineComponent({ DropdownResultOfSearchPeople });
const emits = defineEmits(['peopleClicked', "contactClicked"]);
const props = defineProps({
    showButton: null,
});

const state = reactive({
    search: {
        show_results: false,
        keyword: '',
        results: {
            users: [],
            contacts: []
        }
    }
})

onMounted(() => {
    document.addEventListener("keyup", (event) => {
        if (event.keyCode == 27 || event.key == "Escape") { // key code 27 == escape key
            const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
            if (isNotCombinedKey) {
                hideResults();
            }
        }
    });
});

function search() {
    state.search.show_results = true;

    const keyword = state.search.keyword;

    if (keyword.length < 2) {
        Object.keys(state.search.results).forEach(key => (state.search.results[key] = []));
        return;
    }

    searchPeoplesOnPayfan(keyword).then(r => {
        if (r.status == 200) {
            state.search.results.contacts = r.data['contacts']
            state.search.results.users = r.data['users']
        }
    });
}

function hideResults() {
    state.search.show_results = false;
    if (state.search.keyword.length < 2) {
        Object.keys(state.search.results).forEach(key => (state.search.results[key] = []));
        return;
    }
}

function hideResultsIfKeywordNull() {
    if (state.search.keyword.length < 2)
        hideResults();
}

function onPeopleClicked(people) {
    emits("peopleClicked", people)
}
function onContactClicked(contact) {
    emits("contactClicked", contact);
}
</script>