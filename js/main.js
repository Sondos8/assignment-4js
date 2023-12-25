var signUpName = document.getElementById('signupName')
var signUpEmail = document.getElementById('signupEmail')
var signUpPassword = document.getElementById('signupPassword')
var singInEmail = document.getElementById('signinEmail')
var singInPassword = document.getElementById('signinPassword')
var pathparts = location.pathname.split('/');
var baseURL = ''

for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}

signUpArray = []

if (localStorage.getItem('singUpArray')) {
    signUpArray = JSON.parse(localStorage.getItem('data'))
}

function isInput() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        return false
    } else {
        return true
    }
}

function isEmail() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return false
        }
    }
}

function signUp() {
    if (isInput()== false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmail() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'

    }    
}

function isLoginEmpty() {
    if (singInPassword.value == "" || singInEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }

    var password = singInPassword.value
    var email = singInEmail.value

    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && singUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', singUpArray[i].name)
        if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/home.html')

        } else {
                location.replace(baseURL + '/home.html')
        }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}

function logout() {
    localStorage.removeItem('sessionUsername')
}
