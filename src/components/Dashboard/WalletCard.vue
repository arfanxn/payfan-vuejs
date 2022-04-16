<template>
  <div class="bg-white shadow-sm rounded-3 pt-3 pb-4 px-4 d-flex justify-content-between">
    <div class>
      <h5 class="text-navy fw-bold mb-3">{{ Helpers.ENV("APP_TITLE") }} balance</h5>
      <h1 class="fw-light my-0 py-0">{{ StrHelper.make(AuthUserStore.wallet?.data?.balance).toUSD(false).get() }} $</h1>
      <small class="text-secondary d-block mb-3">Available</small>
      <router-link to="/transfer/send"
        class="fw-bold rounded-pill py-1 px-3 border border-1 border-navy text-navy text-decoration-none">
        <small>Transfer Funds</small>
      </router-link>
    </div>

    <div class="dropstart cursor-pointer">
      <img class="vertical-dots dropdown-toggle" src="@/assets/icons/three-vertical-dots-black.png"
        data-bs-toggle="dropdown" aria-expanded="false" />
      <ul @click="e => e.stopPropagation()" class="dropdown-menu shadow pt-0">
        <header class="bg-navy px-3 py-1 text-center">
          <span class="text-white fw-bold">Wallet details</span>
        </header>
        <!-- <router-link class="dropdown-item text-dark" to="/help">Get Help</router-link> -->
        <li class="dropdown-item text-dark">
          Address : {{ AuthUserStore.wallet.data.address }}
        </li>
        <li class="dropdown-item text-dark">
          Total Transaction : {{ AuthUserStore.wallet.data.total_transaction }}
        </li>
        <li v-show="AuthUserStore.wallet.data.last_transaction" class="dropdown-item text-dark">
          Last Transaction : {{
            Helpers.tap(new Date(AuthUserStore.wallet.data.last_transaction), last_transaction =>
              `${last_transaction.getDate()} ${DateHelper.numericMonthtoString(last_transaction.getMonth(), 3)
              } ${last_transaction.getFullYear()}`)
          }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Helpers from '../../Helpers';
import StrHelper from '../../helpers/StrHelper';
import DateHelper from '../../helpers/DateHelper';
import { useAuthUserStore, } from '../../stores/auth/AuthUserStore.js';
const AuthUserStore = useAuthUserStore();

onMounted(() => {
  // listen wallet changes
  window.Echo.private('wallets.' + AuthUserStore.wallet.data['id'])
    .listen("WalletUpdatedEvent", event => {
      AuthUserStore.wallet.fill(event.wallet);
    } /**/);
});

</script>

<style scoped>
.vertical-dots {
  width: 20px;
  height: 20px;
}

.dropdown-item:active {
  background-color: #e9ecef !important;
}
</style>