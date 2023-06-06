<template>
    <div
        class="a-select"
        :tabindex="tabindex"
        @blur="state.open = false"
    >
        <div
            class="selected"
            :class="{open: state.open}"
            @click="state.open = !state.open"
        >
            <div
                v-for="(selected, sIndex) in state.selected"
                v-if="isMulti && state.selected.length > 0"
                :key="`selected-${sIndex}`"
                class="item"
            >
                {{ selected.name }}
                <span
                    class="close"
                    @click="handleClick(selected)"
                >x</span>
            </div>

            <template v-else>
                {{ state.selected.name ? state.selected.name : 'Wybierz opcje' }}
            </template>
        </div>
        <div
            v-if="options && options.length > 0"
            class="items"
            :class="{'hidden': !state.open}"
        >
            <div
                v-for="(option, i) of options"
                :key="i"
                class="item"
                :class="[{'active': state.selected.name === option.name} , { 'justify-end' : isMulti }]"
                @click="handleClick(option)"
            >
                <a-icon
                    v-if="isMulti"
                    icon="done"
                    class="icon"
                    :variant="isActive(option.name) ? EVariant.PRIMARY : ''"
                    :class="!isActive(option.name) ? 'active' : ''"
                    :size="ESizes.S"
                />
                {{ option.name }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref, toRefs } from "vue";
import AIcon from "../AIcon/AIcon.vue";
import { ESizes, EVariant } from "@/types";
export default defineComponent({
    name: `ASelect`,
    components: { AIcon },
    props: {
        selected: {
            type: Object,
            required: true,
        },
        options: {
            type: Array,
            required: true,
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0,
        },
        isMulti: {
            type: Boolean,
            default: false,
        },
    },
    emits: [`update:modelValue`],
    setup(props, { emit }) {
        const {
            options,
            selected,
            isMulti,
        } = toRefs(props);
        const selectedItems = ref(isMulti.value ? [] : {});

        const state = ref({
            // eslint-disable-next-line no-nested-ternary
            selected: !isMulti.value ? selected.value ? selected.value : options.value[0] : selectedItems,
            open: false,
        });

        const isActive = (name: string) => state.value.selected.find((i) => i.name === name);

        const handleClick = (select) => {
            if (!isMulti.value) {
                state.value.selected = select;
            } else {
                const isExist = !!selectedItems.value.find((i) => i.name === select.name);
                if (isExist) {
                    state.value.selected = state.value.selected.filter((i) => i.name !== select.name);
                } else {
                    state.value.selected.push(select);
                }
            }
            emit(`update:modelValue`, state.value.selected);
            state.value.open = false;
        };

        return {
            state,
            ESizes,
            EVariant,
            isActive,
            handleClick,
        };
    },
});
</script>
<style lang="scss">
.a-select {
    @apply relative w-full outline-0 mb-4;
    .selected {
        @apply relative bg-white rounded-md border border-gray-300 cursor-pointer select-none px-4 py-2 drop-shadow-sm shadow-sm min-h-[46px];
        &::after {
            @apply absolute right-4;
            top: calc(50% - 4px);
            content: "";
            border-width: 6px;
            border-style: solid;
            border-color: dimgray transparent transparent transparent;
        }

        &.open {
            &::after {
                top: calc(50% - 8px);
                border-color: transparent transparent dimgray transparent;
            }
        }

        & .item {
            @apply inline-block bg-gray-100 rounded-md mr-2 px-2 py-1 text-sm;
            .close {
                @apply text-indigo-600 hover:opacity-40;
            }
        }
    }

    .items {
        @apply text-gray-700 absolute border-l border-r border-b border-gray-300 left-0 right-0 overflow-y-scroll bg-gray-100;
        @apply rounded-bl-md rounded-br-md shadow-xl max-h-[144px] z-50;

        & .item {
            @apply text-gray-700 px-4 py-2 cursor-pointer border-b last:border-0 flex;
            &:hover {
                @apply bg-gray-200 border-gray-200;
            }

            &.active {
                @apply bg-indigo-600 border-gray-200 text-white;
            }

            .icon {
                @apply mr-auto border border-gray-200 rounded-md;
                &.active {
                    @apply bg-white text-white;
                }
            }
        }
    }
}
</style>
