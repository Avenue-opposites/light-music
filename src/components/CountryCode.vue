<template>
    <div class="country-code">
        <ul>
            <li class="transition-background" v-for="{ code, zh } in countryCodeList">
                <span>
                    {{ zh }}
                </span>
                <span>
                    <span class="plus">+</span>{{ code }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import getCountryCode from "@/api/countryCode";
type countryCode = {
    code: string;
    en: string;
    locale: string;
    zh: string
}

const countryCodeList = ref<countryCode[]>([]);
onBeforeMount(async () => {
    const { data } = await getCountryCode();
    const countryCodes = data.data as Array<{ label: string, countryList: countryCode[] }>;
    const list = [];
    for (let i = 0; i < countryCodes.length; i++) {
        const { countryList } = countryCodes[i];
        list.push(...countryList);
    }
    countryCodeList.value = list;
});
</script>

<style lang="less" scoped>
.country-code {
    position: absolute;
    z-index: 1;
    top: 160%;
    left: -31%;
    width: 250px;
    height: 250px;
    background-color: var(--WL-1);
    border: 1px solid var(--thin-border);
    border-radius: 10px;
    box-shadow: 5px 5px 30px var(--thin-border);
    overflow-y: scroll;
    scrollbar-width: 0px;
    /* 兼容Firefox */
    -ms-overflow-style: none;

    >ul {
        padding-top: 10px;

        li {
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            font-size: 16px;

            &:hover {
                background-color: var(--GRAY-L-3);
            }

            .plus {
                vertical-align: 2px;
            }
        }
    }

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>