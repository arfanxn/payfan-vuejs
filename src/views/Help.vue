<template>
  <main class="help">
    <NavbarTop />

    <div class="">
      <div class="">
        <small class="fs-7 text-navy fw-bold">Help Center</small>
      </div>

      <div class="text-center w-100 mt-2">
        <h5 class="fw-bold">How can we help?</h5>
        <!--  -->
        <div class="d-flex mt-4  justify-content-center">
          <div class="input-group shadow-sm rounded-pill overflow-hidden mb-3" style="width : 75% ; height : 50px;">
            <span class="input-group-text bg-white border-0 d-flex justify-content-center" id="basic-addon1">
              <img src="@/assets/icons/search.png" class="search-icon my-auto" alt="" srcset="">
            </span>
            <input @keyup.enter="searchHelpByKeyword" type="text" class=" shadow-none form-control border-0"
              placeholder="Search by keyword" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>
        <!--  -->
      </div>

      <div class="mt-3">
        <p class="text-dark ">{{ helpCenterParagraph }}</p>
      </div>

      <div class="mt-5 text-center bg-white rounded py-4 shadow-sm">
        <h5 class="fw-bold">Contact us</h5>
        <!--  -->

        <div class="w-100 d-flex justify-content-evenly mt-3">
          <!--  -->
          <div class="">
            <span class="d-block fw-bold">Call {{ Helpers.ENV("APP_TITLE") }} customer service</span>
            <a :href="`tel:${Helpers.ENV('APP_HELP_PHONENUMBER') || '1-888-221-1161'}`"
              class="fs-5 hover-underline text-navy mt-2">{{ Helpers.ENV('APP_HELP_PHONENUMBER') || '1-888-221-1161' }}
            </a>
          </div>
          <div class="">
            <span class="d-block fw-bold">Email {{ Helpers.ENV("APP_TITLE") }} customer service</span>
            <a :href="`mailto:` + (Helpers.ENV('APP_HELP_EMAIL') || `help@${Helpers.ENV('APP_TITLE').toLowerCase()}.com`)"
              class="fs-5 hover-underline text-navy mt-2">{{
                Helpers.ENV("APP_HELP_EMAIL") || `help@${Helpers.ENV("APP_TITLE").toLowerCase()}.com`
              }}</a>
          </div>
          <!--  -->
        </div>

        <div class="mt-1">
          <span class="d-block fw-bold">Customer service hours</span>
          <small class="fs-7 ">08:00 to 17:00, Monday through Sunday.</small>
        </div>
        <!--  -->
      </div>

    </div>

    <Footer></Footer>
  </main>
  <!--  -->
</template>

<script setup>
import NavbarTop from '../components/Layouts/NavbarTop.vue';
import Helpers from '@/Helpers';
import Footer from '../components/Layouts/Footer.vue';
import { defineComponent } from 'vue'
defineComponent({
  NavbarTop
})

function searchHelpByKeyword(event) {
  const keyword = event.target.value;
  window.open(`https://www.google.com/search?q=${keyword}`);
}

const helpCenterParagraph = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, porro
          praesentium
          vero
          obcaecati
          repellendus
          amet eaque numquam pariatur harum error inventore qui iste cumque quia quae. Nihil ducimus odit quidem quas
          repudiandae nesciunt maxime commodi quasi eligendi, distinctio ex quae! Debitis fuga deleniti beatae ut neque
          praesentium nam sint totam officia illo consectetur pariatur hic rem blanditiis, in atque tenetur, repudiandae
          dolores cupiditate voluptatem ipsa. Quia culpa numquam omnis suscipit, obcaecati temporibus amet hic, dicta
          magnam illum voluptate quos ducimus et iure vel sunt iste molestias itaque quasi voluptates? Obcaecati odio
          deleniti harum. Sint totam illum eveniet fuga corrupti molestiae quibusdam expedita laudantium, odio sit.
          Temporibus laudantium animi consectetur eum reprehenderit perspiciatis! Asperiores sequi in sed voluptatum est
          veniam atque eligendi quisquam recusandae. Temporibus consequatur quae officiis vel veritatis, dolores quidem,
          a autem et magnam impedit sunt error obcaecati possimus voluptatum voluptatibus modi exercitationem.
          Dignissimos repellendus veritatis consectetur ex ullam voluptates nesciunt quae aut nobis provident? Odit,
          necessitatibus porro quo tenetur, beatae excepturi voluptates illo at veritatis, itaque molestias maiores
          assumenda ullam recusandae. Excepturi dolorum numquam cupiditate odit repudiandae officia labore officiis,
          reiciendis placeat totam deserunt quaerat, quia delectus, neque pariatur dolor rem nemo natus quam. Eligendi
          sunt architecto suscipit esse, dignissimos unde ad neque necessitatibus veritatis fuga quasi iure distinctio
          blanditiis sit reiciendis animi recusandae at id expedita facilis enim, reprehenderit repellat quas? Eaque,
          explicabo nulla tenetur ab architecto ipsa ad, praesentium provident asperiores totam excepturi laborum. Ipsum
          totam vero nesciunt deleniti quisquam, temporibus suscipit non commodi animi laborum, veniam, facere iure!
          Voluptas architecto quas totam perspiciatis corrupti qui itaque, aperiam quidem alias voluptate at
          exercitationem dolorem cupiditate earum explicabo laboriosam tenetur. Corporis deserunt optio incidunt
          praesentium modi explicabo rerum voluptatibus libero, iste magni voluptas neque, ullam non minima recusandae
          maiores odio repellat repellendus error magnam voluptate pariatur ducimus dolorum. Vel, dolorem fuga atque
          adipisci enim in velit molestias veniam tempore id odio animi quae possimus ex obcaecati magnam sit libero?
          Repudiandae accusamus inventore consequuntur molestiae expedita aperiam ab, eum perferendis cupiditate
          veritatis est corporis incidunt. Repellat, doloremque eaque? Minima, sed voluptatem culpa aut dolorem corrupti
          soluta odit doloremque, quos commodi porro. Esse sed molestias laboriosam placeat cum dignissimos nam modi
          blanditiis exercitationem nulla ea doloribus, voluptate aliquid officiis explicabo eum tenetur quis asperiores
          quidem ab, praesentium, est eligendi. Explicabo omnis nobis eligendi enim, quam temporibus est corporis porro
          doloremque dicta quis tempora dolor nam ducimus iure? Consequatur minus similique quasi doloremque aliquam
          cumque mollitia sequi esse dolorem dicta sit et blanditiis iure, neque ducimus expedita fuga ratione ullam
          veniam eaque quam, laudantium qui! Beatae totam molestias tempora! Esse, optio doloribus? Nostrum odio
          ratione, iure pariatur obcaecati distinctio totam ipsam quibusdam quia laudantium quas sint quae placeat ipsum
          inventore dolore fugiat eius animi necessitatibus ex sunt fuga illo. Exercitationem, reiciendis nulla aperiam
          officia dolores debitis, quidem quibusdam possimus, ducimus ea vero tempore. Eaque, impedit recusandae quae
          fugit quas doloribus delectus sequi in temporibus suscipit rem magni accusantium doloremque sed molestiae
          culpa ratione cupiditate ex vero! Voluptatibus animi placeat nam.` ;
</script>

<style scoped>
.search-icon {
  width: 20px !important;
  height: 20px !important;
}
</style>

