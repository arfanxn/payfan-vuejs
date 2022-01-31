<template>
    <main class="dropdown">
        <a
            class="cursor-pointer nav-link fw-bold fs-6 d-flex text-center text-navy fw-bold hover-underline"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >Filters</a>
        <div class="dropdown-menu py-3 px-4 dropdown-menu-filters">
            <main class="d-flex justify-content-between">
                <div class="w-100 me-1">
                    <header class="mb-3">Filter by status</header>

                    <div class="text-center wrapper-filter-menu-lists">
                        <a
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">Completed</span>
                        </a>
                        <a
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">Pending</span>
                        </a>
                        <a
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">Failed</span>
                        </a>
                    </div>
                </div>

                <div class="mx-2 border-end border-secondary"></div>

                <div class="w-100 ms-1">
                    <header class="mb-3">Filter by transaction type</header>

                    <div class="text-center wrapper-filter-menu-lists">
                        <a
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">Send</span>
                        </a>
                        <a
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">Request</span>
                        </a>
                        <a
                            class="border border-navy d-flex justify-content-center rounded-pill py-1 cursor-pointer text-dark mb-2"
                        >
                            <span class="my-auto">Received</span>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </main>
</template>

<style scoped>
.wrapper-filter-menu-lists a:hover {
    background-color: rgba(0, 48, 135, 0.85);
    color: #fff !important;
}

.dropdown-menu-filters {
    width: 450px;
    left: 50% !important;
    transform: translateX(-50%) !important;
    top: 100% !important;
}
</style>