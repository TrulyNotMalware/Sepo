<template>
    <div>
        <form :method="method" :action="action">
            <input>
            <input>
        </form>
    </div>
</template>

<script>
export default {
    props:{
        action:{
            type: String,
            required: true
        },
        method:{
            type: String,
            required: true
        }
    },
    data() {
        return {
            
        }
    },
    methods: {

    }
}
</script>

<style scoped>

</style>
