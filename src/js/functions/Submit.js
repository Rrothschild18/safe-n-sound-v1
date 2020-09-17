class Submit {
  constructor(form, settings) {
    try {
      this.form = form;
      this.settings = settings;
      this.errorHandler(settings);
      this.init();
    } catch (e) {
      console.log(e);
    }
  }

  /*
    This function recives the settings object wich contains all fields as objects. 
    Each field has N objects called by the name of the function
    wich will validate this field.
    Each function or 'Validator Function' has
    objects with the parameters to
    build the logic of the validation
    Ex:

    {
      firstFieldName: {
        firstValidatorFunctionName:{
          parameter1: value,
          parameter2: value,
          parameter1N: value
        },
        secondValidatorFunctionName{
        },
        nValidatorFunctionName{
        }
      },

      SecondFieldName:{},

      nFieldName:{}
    }

    ---------------
    If the FORM HTML ELEMENT passed by argunment to the constructor function
    hasnt:
    LABEL NAME = fieldName
    INPUT NAME = fieldName
    INPUT ID = fieldName

    throw an Error "Label for, input name and id not same";
    -----------------
    If the Settings object has a ValidatorFunctionaName Object wich its not
    implemented will throw an Error `Method ${method} not defined`

  **/
  errorHandler(settings) {
    this.fields = Object.keys(settings.fields);

    this.fields.forEach((fieldName) => {
      try {
        let label = document.querySelector(`label[for="${fieldName}"]`),
          name = document.querySelector(`input[id=${fieldName}]`),
          id = document.querySelector(`#${fieldName}`);

        if (label == null || name == null || id == null)
          throw Error("Label for, input name and id not same");
      } catch (e) {
        console.log(e);
      }
    });
    /* 
      [userName,  [notEmpty, stringLength]]
      [userEmail, [notEmpty, stringLength, regexp]]
    **/
    this.inputValidators = [];

    //return all objects atributtest name
    let fields = Object.keys(settings.fields);

    //For each object atribute name, push name and values nestedes
    for (const k in fields) {
      this.inputValidators.push([fields[k]]);
      this.inputValidators[k].push(Object.entries(settings.fields[fields[k]]));
    }

    try {
      console.log(this.inputValidators);
      let proto = Object.getOwnPropertyNames(this.__proto__);

      this.inputValidators.forEach((validators) => {
        validators[1].forEach((method) => {
          if (!proto.includes(method[0])) {
            throw Error(`Method ${method} not defined`);
          }
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  init() {
    let inputs = this.getAllInputs();

    inputs.forEach((input, key) => {
      let functions = this.selectValidators(key);

      input.addEventListener("focusout", (e) => {
        this.watchInput(e, functions);
      });
    });
  }

  validForm() {
    let inputs = this.getAllInputs();
    let test = [];

    inputs.forEach((input, key) => {
      let functions = this.selectValidators(key);

      test.push(this.verifyAllInputs(input, functions));
    });

    return test.every((x) => x == true);
  }

  getData() {
    let inputs = this.getAllInputs();
    let data = {};

    inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  //Retorna all Validator Funcitons from a Input
  selectValidators(key) {
    return this.inputValidators[key][1];
  }

  //Watch inputs values after FOCUS OUT
  watchInput(e, f) {
    for (let i = 0; i < f.length; i++) {
      console.log(f[i]);
      if (this.__proto__[`${f[i][0]}`](e.target, f[i][1]) == false) {
        break;
      }
      if (i == f.length - 1) this.showSuccess(e);
    }
  }

  //Verify if all inputs are valid for Submit
  verifyAllInputs(e, f) {
    for (let i = 0; i < f.length; i++) {
      console.log(f[i]);
      if (this.__proto__[`${f[i][0]}`](e, f[i][1]) == false) {
        return false;
      }
      if (i == f.length - 1) return true;
    }
  }

  //Return all this.form Inputs
  getAllInputs() {
    let inputs = [];
    this.fields.forEach((field) => {
      inputs.push(this.form.querySelector(`input[name=${field}]`));
    });

    return inputs;
  }

  /*
    Display submiiton errors
    showError()

    Display submiiton  success
    showSuccesse()
    
  **/

  showError(e, parameters) {
    let small = document.createElement("small");
    let input = e;

    try {
      if (parameters.message != undefined) {
        if (input.classList.contains("success"))
          input.classList.toggle("success");

        e.classList.add("error");
        small.innerText = parameters.message;

        if (e.nextElementSibling === null) {
          e.after(small);
          return;
        }
        e.nextElementSibling.innerText = parameters.message;
      } else {
        throw new Error("Message is not defined for this Validator");
      }
    } catch (e) {
      console.log(e);
    }
  }

  showSuccess(e) {
    let input = e.target;

    if (input.classList.contains("error")) input.classList.toggle("error");

    if (input.nextElementSibling != null) {
      input.parentNode.removeChild(input.nextElementSibling);
    }

    input.classList.add("success");
  }

  /* 
    Start of all logic of validation here
    
    Parameters:
    e = HTML ELEMENT INPUT
    parameters : ALL PARAMATERS NEEDED FOR LOGIC

    IMPLEMENT YOUR FUNCTIONS HERE

  **/

  notEmpty(e, parameters) {
    let inputData = e.value;

    if (inputData.length == 0) {
      this.showError(e, parameters);
      return false;
    }

    return true;
  }

  stringLength(e, parameters) {
    let inputData = e.value;

    if (
      inputData.length < parameters.min ||
      inputData.length > parameters.max
    ) {
      this.showError(e, parameters);
      return false;
    }
    return true;
  }

  inputBetween(e, parameters) {
    let inputData = e.value;

    if (inputData < parameters.min || inputData > parameters.max) {
      this.showError(e, parameters);
      return false;
    }
    return true;
  }

  regexp(e, parameters) {
    let inputData = e.value;

    if (!new RegExp(parameters.regexp, "g").test(inputData)) {
      this.showError(e, parameters);
      return false;
    }
    return true;
  }
}

module.exports = Submit;
