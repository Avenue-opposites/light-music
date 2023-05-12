<!-- 独家放送(入口) -->
<template>
    <article class="exclusive">
        <Target>
            {{ exclusiveData.name }}
            <template #icon>
                <AngleRightIcon class="more" :size="16" />
            </template>
        </Target>
        <div class="exclusive-entires">
            <ExclusiveEntire v-for="{ name, picUrl } of exclusiveData.result" :src="picUrl" :title="name" />
        </div>
    </article>
</template>

<script setup lang="ts">
import { ExclusiveEntranceData } from "@/types";
import ExclusiveEntire from "@views/DiscoverMusic/common/ExclusiveEntire.vue";
import getExclusive from "@api/exclusive";
import { onBeforeMount, ref } from "vue";
const exclusiveData = ref<ExclusiveEntranceData>({
    name: "",
    result: []
});
onBeforeMount(async () => {
    const { data } = await getExclusive();
    exclusiveData.value = data;
});
</script>

<style lang="less" scoped>
.exclusive {
    margin: 40px 0;

    .exclusive-entires {
        display: flex;
        justify-content: space-between;
    }
}
</style>