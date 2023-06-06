<template>
    <div class="a-box">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
.a-box {
    @apply p-4 md:p-8;
    @apply rounded-md;
    @apply shadow-lg;
    @apply bg-white;
}
</style>
