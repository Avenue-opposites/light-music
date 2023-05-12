import { defineStore } from "pinia";
import { ref } from "vue";
import getLoginState from "@/api/loginState";
import { UserAccount } from "@/types";

const useUserInformationStore = defineStore("userInformation", () => {
  const userAccount = ref<UserAccount | null>(null);

  return {
    userAccount,
  };
});

export default useUserInformationStore;
