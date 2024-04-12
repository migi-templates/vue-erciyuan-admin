<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <Loading></Loading>
    </template>
  </Suspense>
</template>

<style scoped></style>
