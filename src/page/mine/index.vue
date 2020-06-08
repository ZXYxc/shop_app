<template>
    <div>
        <button @click="toOrder">查看我的订单</button>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods:{
            toOrder(){
                this.$router.push("/myOrder");
            }
        }
    }
</script>

<style scoped>

</style>