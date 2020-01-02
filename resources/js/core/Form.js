import Errors from './Errors';

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

export default Form;