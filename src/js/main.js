import Swap from './animations/swap.js'
import Submit from './functions/Submit.js'

try {
    const SwapCards = new Swap('.Suported .Card')
    SwapCards.init();
} catch(e){
    console.log(e)
}

try {
    const myForm = document.querySelector('#test')

    console.log(myForm)

    myForm.addEventListener('submit', function(e){
        console.log(e)
        e.preventDefault();
        const submitAlbum = new Submit(myForm, {
        fields: {
            userName: {
                notEmptyy: {
                    message: 'The username is required'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: 'The username must be more than 6 and less than 30 characters long',
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_]+$/,
                    message: 'The username can only consist of alphabetical, number and underscore',
                },
            },
            userEmail: {
                notEmpty: {
                    message: 'The password is required'
                },
                stringLength: {
                    min: 8,
                    message: 'The password must have at least 8 characters',
                },
                emailInput: {
                    message: 'This not an e-mail',
                },
            },
            userAge: {
                notEmpty: {
                    message: 'The password is required'
                },
                inputBetween: {
                    message: 'The password is required',
                    value1: 10,
                    value2: 20,
                },
                
            },
            userSpec: {
                notEmpty: {
                    message: 'The password is required'
                },
            },
            albumID: {
                notEmpty: {
                    message: 'The password is required'
                },
                stringLength: {
                    min: 6,
                    max: 30,
                    message: 'The username must be more than 6 and less than 30 characters long',
                },
                regexp: {
                    regexp: /^[a-zA-Z0-9_]+$/,
                    message: 'The username can only consist of alphabetical, number and underscore',
                },
            },
        }
    })
})

    
} catch(e){
    console.log(e)
}
