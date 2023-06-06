<template>
    <div class="a-radio">
        <input
            :id="id"
            type="radio"
            :name="name"
            :value="value"
            @input="(event) => $emit('update:modelValue', event.target.value)"
        >
        <label :for="id">{{ label }}</label>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ESizes } from "@/types";
import { IRadioProps } from "./interfaces";

export default defineComponent({
    name: `ARadio`,
    props: {
        id: {
            type: String as PropType<String> | number as PropType<Number>,
            required: true,
        },
        label: {
            type: String as PropType<String>,
            required: true,
        },
        name: {
            type: String as PropType<String>,
            required: true,
        },
        value: {
            type: String as PropType<String>,
            required: true,
        },
        modelValue: {
            type: Boolean as PropType<Boolean>,
            default: false,
        },
    },
    emits: [`update:modelValue`],
    setup() {
        return { ESizes };
    },
});
</script>

<style scoped lang="scss">
@layer a-radio-outline{
    .a-radio-outline {
        @apply outline-offset-2 outline-2 outline outline-indigo-600
    }
}

.a-radio {
    @apply flex gap-x-3 items-center;

    &:hover, > *:hover {
        @apply cursor-pointer;
    }

    input[type="radio"] {
        @apply appearance-none mx-0 p-0 bg-white w-[16px] h-[16px] relative;
        @apply border border-solid border-indigo-600 rounded-full;

        &:hover, &:focus {
            @apply a-radio-outline;
        }

        &:checked {
            @apply border-8 a-radio-outline;

            &::after {
                @apply absolute content-[''] top-1/2 left-1/2 rounded-full bg-white w-[6px] h-[6px] -translate-y-1/2 -translate-x-1/2;;
            }
        }
    }
}
</style>
