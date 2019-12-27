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

        let cloneData = {};

        for (let property in this.originalData){
            cloneData[property] = this[property];
        }

        return cloneData;
        
    }

    post(endpoint){
        return this.submit('post', endpoint);
    }

    get(){
        return this.submit('get', endpoint);
    }

    put(){
        return this.submit('put', endpoint);
    }

    patch(){
        return this.submit('patch', endpoint);
    }

    delete(){
        return this.submit('delete', endpoint);
    }

    reset(){

        for (let field in this.data()){
            this[field] = '';
        }

        this.errors.clear();
    }
    
    submit(requestType, endpoint){

        return new Promise((resolve, reject) => {

            axios[requestType](endpoint, this.data())
                .then(result => {
                    this.onSuccess(result.data);

                    resolve(result.data);
                })
                .catch(error => {
                    this.onFail(error.response.data.errors);

                    reject(error.response.data.errors);
                })
        });

    }

    onSuccess(response){

        console.log(response);

        if(response.responseCode == 1){
            alert(response.message); //this would be a general response, you can place general actions here after submitting form
        }else{
            alert(`Other general response`); //this would be a general response, you can place general actions here after submitting form
        }

        this.reset();
    }

    onFail(errors){

        console.log(errors);
        this.errors.record(errors);
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

            this.formService.post('/projects')
                .then(response => {
                    console.log(`Reload`);
                })
                .catch(error => {
                    // this you want to do
                    console.log(`promt this`);
                });

        },
        
    },

});
