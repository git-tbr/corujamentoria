<script setup lang="ts">
//import FooterComponent from '@/components/FooterCoursesComponent.vue'
import NavbarComponent from '@/components/NavbarCoursesComponent.vue'
</script>

<template>
    <NavbarComponent />
    <div id="main_content">
        <slot />
    </div>
    <!-- <FooterComponent id="site_footer" /> -->
</template>

<style scoped>
#main_content {
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - (268px + 56px));
}

#site_footer {
    margin-top: auto;
}
</style>