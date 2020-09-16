class Submit {
    constructor (form, settings){
        try {
            this.form = form;
            this.settings = settings;
            this.errorHandler(settings);
        } catch(e){
            console.log(e)
        }
    }

    errorHandler(settings){
        this.fields = Object.keys(settings.fields)
        this.fields.forEach((fieldName)=>{
            try{
                let label = document.querySelector(`label[for="${fieldName}"]`),
                    name = document.querySelector(`input[id=${fieldName}]`),
                    id = document.querySelector(`#${fieldName}`)

                if(label == null || name == null || id == null)
                    throw Error("Label for, input name and id not same");

            } catch(e){
                console.log(e)
            }
        })
        /* 
            [userName,  [notEmpty, stringLength]]
            [userEmail, [notEmpty, stringLength, regexp]]
        **/
        this.inputValidators = [];
        let fields = Object.keys(settings.fields);
        
        for(const k in fields) {
            let functions = Object.keys(settings.fields[fields[k]])
            this.inputValidators.push([fields[k]])
            this.inputValidators[k].push(functions)
        }

        try{
            let proto = Object.getOwnPropertyNames(this.__proto__)

            this.inputValidators.forEach((validators) => {
                validators[1].forEach((method) => {
                    if(!proto.includes(method)){
                        throw Error(`Method ${method} not defined`)
                    }
                })
            })
        }catch(e){
            console.log(e)
        }
    }

    notEmpty(){

    }

    stringLength(){

    }

    emailInput(){

    }

    inputBetween(){

    }

    regexp() {

    }
}


module.exports = Submit;