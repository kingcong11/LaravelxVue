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

export default Errors;