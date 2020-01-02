<template>
    <div>
        <input type="text" @input="updateCoupon($event.target.value)" ref="coupon">
    </div>
</template>

<script>
    export default {

        props: ['code'],

        data () {
            return {
                sampleData : 'example data',
                invalidCodes : ['FREE', 'ALLFREE']
            }
        },

        methods: {

            updateCoupon(code){

                // coupon validation
                // sanitation

                if(this.invalidCodes.includes(code)){
                    alert(`Coupon code is expired!`);

                    this.$refs.coupon.value = code = '';

                }

                this.$emit('input', code);

            }

        }
        
    }
</script>