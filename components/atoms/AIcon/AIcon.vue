<template>
    <div
        class="a-icon"
        :class="`size-${size} ${variant}`"
    >
        <i class="material-icons">{{ icon }}</i>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ESizes, EVariant } from "@/types";

export default defineComponent({
    name: `AIcon`,
    props: {
        icon: {
            type: String as PropType<string>,
            required: true,
        },
        size: {
            type: String as PropType<ESizes>,
            default: ESizes.M,
        },
        variant: {
            type: String as PropType<EVariant>,
            default: ``,
        },
    },
});
</script>
<style lang="scss" scoped>
.a-icon {
    @apply inline-flex justify-center items-center;

    &.primary {
        @apply bg-indigo-800 rounded-lg text-white;
    }
}
</style>
