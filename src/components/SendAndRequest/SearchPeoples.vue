<template>
    <div class="form-floating">
        <input @keyup.esc="hideResults" @input="hideResultsIfKeywordLessThan" v-model="SearchPeoplesStore.searchKeyword"
            @focus="SearchPeoplesStore['results/toggleShow'] = true" @keyup.enter="search" type="text"
            class="form-control" id="inputSendTo" placeholder="Name on your contacts or Email" />
        <label class="text-secondary" for="inputSendTo">Name on your contacts or Email</label>
        <ResultsSearchPeople @contactClicked="onContactClicked" @peopleClicked="onPeopleClicked" />
        <button @keyup.esc="hideResults" v-show="props.showButton" @click="search"
            class="btn btn-light border-dark rounded-pill py-2 px-4 mt-4">Next</button>
    </div>
</template>

<script setup>
import { defineComponent, defineEmits, defineProps, onMounted } from 'vue';
import { useSearchPeoplesStore } from '../../stores/SearchPeoplesStore';
import ResultsSearchPeople from './ResultsSearchPeople.vue';
const SearchPeoplesStore = useSearchPeoplesStore();
defineComponent({ ResultsSearchPeople });
const emits = defineEmits(['peopleClicked', "contactClicked"]);
const props = defineProps({
    showButton: null,
});

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
    SearchPeoplesStore['results/toggleShow'] = true;
    const keyword = SearchPeoplesStore.searchKeyword;

    if (!hideResultsIfKeywordLessThan()) return;

    // search  peoples by keyword
    SearchPeoplesStore.fetch(keyword)
}

function hideResultsIfKeywordLessThan() {
    if (SearchPeoplesStore.searchKeyword.length <= 2) {
        hideResults()
        return false
    }
    return true;
}
function hideResults() {
    SearchPeoplesStore['results/toggleShow'] = false;
}









function onPeopleClicked(people) {
    emits("peopleClicked", people)
}
function onContactClicked(contact) {
    emits("contactClicked", contact);
}
</script>