<template>
    <teleport to="#modals">
        <!-- Button trigger modal -->
        <button id="btn-modal-blocked-contacts" type="button" class="btn d-none btn-primary" data-bs-toggle="modal"
            data-bs-target="#modal-blocked-contacts"></button>

        <!-- Modal -->
        <div class="modal fade" id="modal-blocked-contacts" tabindex="-1" aria-labelledby="modal-contant-detail"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body px-5 pb-5 d-flex flex-column">
                        <h5 class="text-center fw-bold  mb-4">Blocked Contacts</h5>
                        <!--  -->
                        <div v-if="ContactsStore['pagination/data/blockedContacts'].length < 1" class="d-block my-3 ">
                            <span class="text-secondary fw-bold">No blocked contacts yet.</span>
                        </div>
                        <!--  -->
                        <div class="blockedContactsListsWrapper overflow-auto scrollbar-thin">
                            <div class="d-flex justify-content-between cursor-pointer py-3 px-3" :class="
                    (index + 1)
                        < ContactsStore['pagination/data/blockedContacts']
                            .length ? `border-bottom border-secondary` : ``"
                                v-for="(contact, index) in ContactsStore['pagination/data/blockedContacts']"
                                :key="contact.id">
                                <div class="d-flex text-dark w-100 me-2">
                                    <UserAvatar :user="contact.user" />
                                    <span class="ms-3 my-auto">{{ contact.user.name }}</span>
                                </div>


                                <a @click="unblockContact(contact)" :id="`top-contact-${contact.id}`"
                                    class="my-auto text-navy fw-bold hover-underline">Unblock</a>
                            </div>

                        </div>
                        <!--  -->


                        <div class="mt-4 d-flex justify-content-between">
                            <div class="">
                                <button :disabled="ContactsStore['pagination/meta']['current_page'] <= 1 ? true : false"
                                    class="btn btn-sm btn-outline-secondary me-3"
                                    @click="loadBlockedContactsPagination(1)">First</button>
                            </div>
                            <div>
                                <button :disabled="ContactsStore['pagination/meta']['current_page'] <= 1 ? true : false"
                                    class="btn btn-sm btn-primary mx-1"
                                    @click="loadBlockedContactsPagination(parseInt(ContactsStore['pagination/meta']['current_page']) - 1)">
                                    Prev</button>
                                <button class="btn btn-sm btn-primary"
                                    :disabled="ContactsStore['pagination/data'].length < ContactsStore['pagination/meta']['per_page']"
                                    @click="loadBlockedContactsPagination(parseInt(ContactsStore['pagination/meta']['current_page']) + 1)">
                                    Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import UserAvatar from '../../Avatar/UserAvatar.vue';
import { useContactsStore } from '../../../stores/ContactsStore';
import ContactsService from '../../../services/ContactsService';
import SwalPlugin from '../../../plugins/SwalPlugin';
const ContactsStore = useContactsStore();

const blockedContactsCurrentPage = ref(1);

onMounted(() => {
    fetchBlockedContacts(blockedContactsCurrentPage.value);
    // .then(() => console.log(ContactsStore['pagination/data']));
});

function loadBlockedContactsPagination(page) {
    blockedContactsCurrentPage.value = page;
    document.querySelector(".blockedContactsListsWrapper").scrollTo(0, 0);
    window.scrollTo(0, 0);
    fetchBlockedContacts(page)
}

async function fetchBlockedContacts(page = 1) {
    return await ContactsStore.fetch({
        order_by: "added_at:desc",
        favorited: 0,
        blocked: 1,
        added: 0,

        // parameters for handling pagination/paginator
        per_page: 10,
        page: page,
    })
}


async function unblockContact(contact) {
    const confirmDeletion = await SwalPlugin.confirm({
        title: `Unblock contact`,
        html: `Unblock "${contact['user']['name']}" ?`,
        icon: `question`,
    });

    if (confirmDeletion.isConfirmed) {
        ContactsService.unblock(contact.id).then(r => {
            if (r.status == 200) {
                fetchBlockedContacts(blockedContactsCurrentPage.value).then(() => {
                    SwalPlugin.alertPositioned({
                        title: `contact "${contact.user.name}" has been unblocked.`,
                        icon: "success",
                        timer: 1500,
                    })
                });
            }
        });
    }
}
</script>

<style scoped>
.contact-icon-size {
    width: 75px;
    height: 75px;
}

.blockedContactsListsWrapper {
    max-height: 500px !important;
}

.contact-icon-size {
    width: 60px;
    height: 60px;
}
</style>