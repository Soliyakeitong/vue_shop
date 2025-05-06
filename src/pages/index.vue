<template>
    <div>
        <h1>后台首页1</h1>
    </div>
</template>

<script setup>
import { getInfo } from '~/api/manager'
import { onMounted } from 'vue'

onMounted(() => {
    getInfo().then(res => {
        console.log(res)
        
    })
})

</script>

