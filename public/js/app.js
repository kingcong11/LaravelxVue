new Vue({

    el: '#app',

    data: {

        skills : []

    },


    mounted(){
        // create an http request
        axios.get('/skills').then(response => {

            var data = response.data;
            console.log(response);
            console.log(data);

            this.skills = response.data;

        });
    }
});