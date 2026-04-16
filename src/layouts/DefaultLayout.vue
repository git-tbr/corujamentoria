<script setup lang="ts">
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>

<template>
    <NavbarComponent />
    <div id="main_content">
        <slot />
    </div>
    <FooterComponent id="site_footer" />
</template>

<style scoped>
#main_content {
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - (266px + 71px));
}

#site_footer {
    margin-top: auto;
}
</style>