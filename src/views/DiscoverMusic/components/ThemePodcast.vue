<!-- 主题播客组件 -->
<template>
    <article class="theme-podcast">
        <Target>
            主题播客
            <template #icon>
                <AngleRightIcon class="more" :size="16" />
            </template>
        </Target>
        <div class="theme-podcast-container">
            <div v-for="{ alg, picUrl, name, rcmdText } of radios" class="podcast">
                <div class="theme-podcast-show round-medium">
                    <img class="transition-transform" :src="picUrl" :alt="alg">
                    <h3>{{ name }}</h3>
                </div>
                <p class="podcast-description">{{ rcmdText }}</p>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { Radio, PodcastRecommendTypeData } from '@/types';
import { random } from '@/utils';
import getPodcastRecommendType from '@api/podcastRecommendType';
import { onBeforeMount, ref } from 'vue';
const radios = ref<Radio[]>([]);
onBeforeMount(async () => {
    const { data } = await getPodcastRecommendType();
    const rom = random(0, 5);
    const from = rom * 6;
    const to = from + 6;
    radios.value = transformRadios(data).slice(from, to);
});
function transformRadios(data: PodcastRecommendTypeData): Radio[] {
    const radios: Radio[] = [];
    for (let i = 0; i < data.length; i++) {
        const { radios: rs } = data[i];
        radios.push(...rs);
    }
    return radios;
}
</script>

<style lang="less" scoped>
.theme-podcast {
    width: 100%;
    margin: 40px 0;

    .theme-podcast-container {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;

        .podcast {
            @size: 230px;
            width: @size;

            .theme-podcast-show {
                position: relative;
                width: 100%;
                height: @size;

                &:hover {
                    img {
                        transform: scale(1.1);
                    }
                }

                img {
                    width: 100%;
                    object-fit: cover;
                }

                h3 {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    color: var(--GRAY-L-3);
                    font-size: 22px;
                    padding: 10px;
                    text-shadow: 0 0 3px gray;
                }
            }

            .podcast-description {
                margin-top: 10px;
                font-size: 18px;
            }
        }
    }

    .more {
        @size: 20px;
        width: @size;
        width: @size;
    }
}
</style>