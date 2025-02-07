<script setup>
const { openWallet } = useAuth()
</script>

<template>
  <div>
    <button @click="async () => await openWallet('keplrextension')">
      Open Wallet
    </button>
  </div>
</template>
