/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Form from './core/Form';


Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('notification-component', require('./components/NotificationComponent.vue').default);

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

