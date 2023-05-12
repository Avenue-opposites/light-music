import { Account, Profile } from "@/types";
import { defineStore } from "pinia";
import { ref, onBeforeMount } from "vue";
import getLoginState from "@api/loginState";

const useLoginState = defineStore("loginState", () => {
  const account = ref<Account>();
  const profile = ref<Profile>();
  onBeforeMount(async () => {
    const { data } = await getLoginState();
    account.value = data.account;
    profile.value = data.profile;
  });
  return {
    account,
    profile,
  };
});

export default useLoginState;
