<template>
    <div class="dropdown">
        <a
            href="#"
            class="nav-link fw-bold fs-6 d-flex"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                class="nav-link-icon my-auto"
                src="@/assets/icons/bell-ring.png"
                alt="Notifications"
            />
        </a>
        <ul
            class="dropdown-menu pt-0 notification-dropdown-menu"
            aria-labelledby="dropdownMenuButton"
        >
            <header class="py-1 d-flex justify-content-center">
                <span class="my-auto text-white fw-bold">Notifications (0)</span>
            </header>
            <li v-for="(i, index ) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="index">
                <a class="dropdown-item" href="#">Notification {{ i }}</a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.notification-dropdown-menu header {
    background-color: #0070ba !important;
}

.notification-dropdown-menu {
    width: 300px;
    height: 100vh;
    left: 50% !important;
    transform: translateX(-50%) !important;
    top: 100% !important;
}

.nav-link-icon {
    width: 25px;
    height: 25px;
    color: white;
}
</style>