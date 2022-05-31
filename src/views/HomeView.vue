<script setup lang="ts"></script>

<template>
  <div class="grid">
    <div class="col-8 bg-blue-600" style="height: 200px"></div>
    <div class="col-4 bg-indigo-400" style="height: 200px"></div>
  </div>

</template>

<script setup lang="ts">
import {addressBookService} from "@/services/address-book.service";
import {onMounted, ref} from "vue";
import type {Address} from "@/model/Address";
import {Ref} from "vue";

const addresses: Address[] = ref([])

onMounted( async () => await loadAddresses());

const loadAddresses = async () => {
  addresses.value = await addressBookService.getAddresses();
}
</script>