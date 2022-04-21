<template>
    <div class="ms-4 p-5">
        <div class>
            <h5 class="text-dark mb-4">Contacts</h5>
            <SearchPeoples @peopleClicked="addUserToContacts" @contactClicked="contactDetail" />
        </div>
        <div class>
            <small class="text-secondary d-block mt-2">Top contacts</small>
            <div class="top-contacts-lists-wrapper scrollbar-thin mt-2">
                <div class="d-flex justify-content-between cursor-pointer my-4 px-3"
                    v-for="(contact, index) in ContactsStore['pagination/data']" :key="index">
                    <a @click.prevent="contactDetail(contact)" class="d-flex text-dark w-100 me-2">
                        <UserAvatar class="me-1" :user="contact.user" style="width:65px; height:65px" />
                        <span class="ms-3 my-auto">{{ contact["user"]["name"] }}</span>
                    </a>

                    <div @click="toggleFavoriteContact($event, contact)" class="my-auto"
                        :class="`${contact['status'] == 'FAVORITED' ? 'text-success' : 'text-dark'}`">
                        <StarIcon width="24" height="24" />
                    </div>
                </div>

                <div class="p-3 bg-white w-100 text-center">
                    <span v-if="ContactsStore['pagination/data'].length <= 0" class="my-auto lh-sm">No Contacts
                        found.</span>

                    <div v-else-if="(ContactsStore['pagination/meta']['current_page'] >= 1)
                    && (ContactsStore['pagination/data'].length)">
                        <small class="fs-7 fw-light mt-3 d-block">use "Contacts Search" instead of
                            scrolling/paginating for better experience.</small>

                        <div class="mt-4 d-flex justify-content-between">
                            <div class="">
                                <button :disabled="ContactsStore['pagination/meta']['current_page'] <= 1 ? true : false"
                                    class="btn btn-sm btn-outline-secondary me-3"
                                    @click="loadContactsPagination(1)">First</button>
                            </div>
                            <div>
                                <button :disabled="ContactsStore['pagination/meta']['current_page'] <= 1 ? true : false"
                                    class="btn btn-sm btn-primary mx-1"
                                    @click="loadContactsPagination(parseInt(ContactsStore['pagination/meta']['current_page']) - 1)">
                                    Prev</button>
                                <button class="btn btn-sm btn-primary"
                                    :disabled="ContactsStore['pagination/data'].length < ContactsStore['pagination/meta']['per_page']"
                                    @click="loadContactsPagination(parseInt(ContactsStore['pagination/meta']['current_page']) + 1)">
                                    Next</button>
                            </div>
                        </div>
                        <!--  -->
                    </div>

                </div>
            </div>

            <div class="d-flex justify-content-center mt-5" v-if="ContactsStore['pagination/data'].length">
                <router-link to="/account/settings/privacy-and-notifications"
                    class="fw-bold text-navy hover-underline cursor-pointer text-center">
                    <small>View blocked contacts</small>
                </router-link>
            </div>
        </div>
        <ContactDetailsModal :contact="state.modal.contactDetail.contact" />
    </div>
</template>

<script setup>
import StarIcon from '@/components/Icons/StarIcon.vue';
import ContactDetailsModal from '../Bootstrap5/Modals/ContactDetailsModal.vue';
import { defineComponent, onMounted } from 'vue';
import Helpers from '../../Helpers';
import UserAvatar from "@/components/Avatar/UserAvatar.vue";
import ContactsService from "@/services/ContactsService.js";
import { useContactsStore } from '../../stores/ContactsStore';
import { useSearchPeoplesStore } from '../../stores/SearchPeoplesStore';
import SearchPeoples from './SearchPeoples.vue';
import { reactive } from 'vue';
import SwalPlugin from '../../plugins/SwalPlugin';
const ContactsStore = useContactsStore();
const SearchPeoplesStore = useSearchPeoplesStore();

defineComponent({ StarIcon, ContactDetailsModal, SearchPeoples });
const state = reactive({
    modal: {
        contactDetail: {
            contact: {},
        }
    }
});

onMounted(() => {
    ContactsStore.fetch({
        order_by: "updated_at:desc",
        favorited: 1,
        blocked: 0,
        added: 1,

        // parameters for handling pagination/paginator
        per_page: 30,
        page: 1,
    });
})

function loadContactsPagination(page) {
    document.querySelector(".top-contacts-lists-wrapper").scrollTo(0, 0);
    window.scrollTo(0, 0);
    ContactsStore.fetch({
        order_by: "updated_at:desc",
        favorited: 1,
        blocked: 0,
        added: 1,

        // parameters for handling pagination/paginator
        per_page: 30,
        page: page,
    });
}

function addUserToContacts(user) {
    SwalPlugin.confirm({
        title: `Add contact`,
        html: `Add "${user['name']}" to contacts ?`,
        confirmButtonText: `Add`,
        icon: "question",
    }).then(result => {
        const onError = () => SwalPlugin.alert({ title: "Something went wrong!", icon: "error" });
        if (result.isConfirmed) {
            ContactsService.addOrRm(user.id).then(r => {
                if (r.data.message?.toLowerCase()?.includes("add")) {

                    // refresh the peoples store
                    SearchPeoplesStore.fetch(SearchPeoplesStore.searchKeyword).then(() => {
                        SwalPlugin.autoCloseAlert(`"${user.name}" added to contacts`, null, "success", 1000)
                            ;
                    });

                } else {
                    onError()
                }
            })
        }
    })
}

function contactDetail(contact) {
    state.modal.contactDetail.contact = contact
    Helpers.triggerBSModal("#btn-modal-contact-detail");
}
function toggleFavoriteContact(event, contact) {
    ContactsService.toggleFavorite(contact.id).then(r => {
        if (r.data.message.toLowerCase()?.includes("add") /*favorited*/) {
            SwalPlugin.alertPositioned({
                title: `contact "${contact['user']['name']}" <strong>marked</strong> as top contacts`
            });
            if (event.target.classList.contains("text-dark")) { // if contains dark == not added to favorite
                event.target.classList.remove("text-dark");
                event.target.classList.add("text-success");
            }
        } else if (r.data.message.toLowerCase()?.includes("remove") /*unfavorited*/) {
            SwalPlugin.alertPositioned({
                title: `contact "${contact['user']['name']}" <strong>removed</strong> from top contacts`
            })
            if (event.target.classList.contains("text-success")) {
                event.target.classList.remove("text-success");
                event.target.classList.add("text-dark");
            }

        }
    })
}
</script>

<style scoped>
.top-contacts-lists-wrapper {
    overflow: auto !important;
    max-height: 550px !important;
}
</style>