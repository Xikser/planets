<template>
    <router-link
        v-if="href"
        :to="href"
        class="a-btn"
        :class="[size, variant, iconSide]"
    >
        <slot name="icon">
            <div
                v-if="icon"
                class="icon"
            >
                <a-icon :icon="icon" />
            </div>
        </slot>
        <slot name="btn-content">
            {{ text }}
            <div
                v-show="isLoading"
                class="loader"
            >
                <div
                    class="loader-circle"
                >
                    <div class="loader-line-mask">
                        <div class="loader-line" />
                    </div>
                </div>
            </div>
        </slot>
    </router-link>
    <button
        v-else
        class="a-btn"
        :class="[size, variant, iconSide]"
    >
        <slot name="icon">
            <div
                v-if="icon"
                class="icon"
            >
                <a-icon :icon="icon" />
            </div>
        </slot>
        <slot name="btn-content">
            {{ text }}
            <div
                v-show="isLoading"
                class="loader"
            >
                <div
                    class="loader-circle"
                >
                    <div class="loader-line-mask">
                        <div class="loader-line" />
                    </div>
                </div>
            </div>
        </slot>
    </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ESide, EVariant } from "@/types";
import AIcon from "../AIcon/AIcon.vue";
export default defineComponent({
    name: `ABtn`,
    components: { AIcon },
    props: {
        href: {
            type: String as PropType<string>,
            default: ``,
        },
        text: {
            type: String as PropType<string>,
            default: ``,
        },
        size: {
            type: String as PropType<string>,
            default: `normal`,
        },
        icon: {
            type: String as PropType<string>,
            required: false,
        },
        iconSide: {
            type: String as PropType<ESide>,
            default: ESide.LEFT,
        },
        variant: {
            type: String as PropType<EVariant>,
            default: EVariant.PRIMARY,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
});
</script>
