<template>
    <NuxtLayout name="empty">
        <main class="error-page">
            <div class="box">
                <AIcon
                    icon="error"
                    :variant="EVariant.PRIMARY"
                    :size="ESizes.M"
                />
                <h1 class="title">
                    Error {{ error?.statusCode }}
                </h1>
                <h4 class="subtitle">
                    {{ error?.statusCode === 404 ? 'Page not found' : 'Oooops.' }}
                </h4>
                <p class="text">
                    Redirect in <span class="text-indigo-500">{{ getTimer }}s</span>
                </p>
            </div>
        </main>
    </NuxtLayout>
</template>

<script lang="ts">
import { clearError } from "nuxt/app";
import { computed, defineComponent, ref, onMounted } from "vue";
import AIcon from "./components/atoms/AIcon/AIcon.vue";
import { EVariant, ESizes } from '@/types';

export default defineComponent({
    name: `Error`,
    components: { AIcon },
    props: {
        error: {
            type: Object,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {
            },
        },
    },
    setup() {
        const time = ref(5);

        const handleClearError = () => clearError({ redirect: `/` });

        const getTimer = computed(() => time);

        onMounted(() => {
            const timerInterval = setInterval(() => {
                let localStart = time.value;
                if (time.value > 0) {
                    // eslint-disable-next-line no-plusplus
                    localStart--;
                    time.value = localStart;
                } else {
                    clearInterval(timerInterval);
                    handleClearError();
                }
            }, 800);
        });

        return {
            getTimer,
            ESizes: ESizes,
            EVariant: EVariant,
        };
    },
});
</script>

<style scoped lang="scss">
.error-page {
    @apply flex justify-center items-center w-full h-screen;
    .box {
        @apply grid gap-4 max-w-[420px] mx-3 flex-col;
        .title {
            @apply text-6xl leading-none font-extrabold;
        }

        .subtitle {
            @apply text-2xl leading-9 font-medium;
        }

        .text {
            @apply text-gray-500 mt-4;
        }
    }
}
</style>
