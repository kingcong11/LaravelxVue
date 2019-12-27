/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');


Vue.component('example-component', require('./components/ExampleComponent.vue').default);

class Errors {

    constructor(){
        this.errors = {};
    }

    get(field){
        if(this.errors[field]){
            return this.errors[field][0];
        }
    }

    record(errors){
        this.errors = errors;
    }

    clear(field){

        if(field){
            delete this.errors[field];
        }else{
            this.errors = {};
        }
    }

    exists(field){
        return (this.errors[field]) ? true : false;
    }

    any(){
        return (Object.keys(this.errors).length > 0);       
    }

}

class Form{

    constructor(data) {

        /* Form Data */

        this.originalData = data;

        for(let field in data){
            this[field] = data[field];
        }


        /* Errors Instance */

        this.errors = new Errors();


    }

    data(){

        let cloneData = Object.assign({}, this);

        delete cloneData.originalData;
        delete cloneData.errors;

        return cloneData;
        
    }

    post(endpoint){
        return axios.post(endpoint, this.data());
    }

    get(){
        return axios.get(endpoint, this.data());
    }

    put(){
        return axios.put(endpoint, this.data());
    }

    patch(){
        return axios.patch(endpoint, this.data());
    }

    delete(){
        return axios.delete(endpoint, this.data());
    }

    reset(){

        for (let field in this.data()){
            this[field] = '';
        }
    }
    
    submit(requestType, endpoint){

        axios[requestType](endpoint, this.data)
            .then(this.onSuccess.bind(this))
            .catch(this.onFail.bind(this));
    }

    onSuccess(result){

        var response = result.data;
        console.log(response);

        if(response.responseCode == 1){
            alert(response.message);
            // location.reload();
        }else{
            alert(`Something went wrong.`);
            // location.reload();
        }
    }

    onFail(error){
        this.errors.record(error.response.data.errors);
    }

}

const app = new Vue({
    el: '#app',

    data: {
        formService  : new Form({
            project_name : '',
            description  : ''
        })
    },

    methods: {

        submitForm(){

            // this.formService.submit('post', '/projects');

            this.formService.post('/projects')
                .then(result => {
                    var response = result.data;
                    console.log(response);

                    if(response.responseCode == 1){
                        alert(response.message);
                        this.formService.reset();
                    }else{
                        alert(`Something went wrong.`);
                    }

                })
                .catch(error => {
                    this.formService.errors.record(error.response.data.errors);
                })


        },
        
    },

});
