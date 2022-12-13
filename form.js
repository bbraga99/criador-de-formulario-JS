class Form {
    method = 'GET';
    items = [];

    constructor(container,method,action) {
        this.container = document.querySelector(container);
        this.method = method;
        this.action = action;
    }

    addItem(item) {
        this.items.push(item);
    }

    render() {
        let formElement = document.createElement('form');
        formElement.setAttribute('method',this.method);
        formElement.setAttribute('action',this.action);

        for(let i in this.items) {
            this.items[i].render(formElement);
        }

        this.container.appendChild(formElement);
    }
}


class Input {    
    _type = 'text';
    required = false; // de inicio tudo não é um campo obrigatorio

    constructor(name,label) {
        this.name = name;
        this.label = label;
    }

    get type() {
        return this._type;
    }

    set type(t) {
        if(['text','password','email','submit'].includes(t)) {
            this._type = t;
        } else {
            throw new Error(`Input ${t} doesn't exist.`);
        }
    }

    render(formElement) {
        let el = document.createElement('input');
        el.type = this.type;
        el.name = this.name;
        el.placeholder = this.label;
        el.required = this.required;
        formElement.appendChild(el);
    }
}

class Button extends Input {
    constructor(label) {
        super('',label);
        this.type = 'submit';
    }

    render(formElement) {
        let el = document.createElement('input');
        el.type = this.type;
        el.value = this.label;
        formElement.appendChild(el);
    }
}

//IMPLEMENTAÇÃO

//Formulário
const form = new Form('.formArea','POST','https://site.com.br');

//Email
const email = new Input("email","Digite seu e-mail");
email.type = 'email';
email.required = true; // faço o email ser um campo obrigatorio
form.addItem(email);

//Senha
const password = new Input("senha","Digite a senha");
password.type = 'password';
password.required = true;
form.addItem(password);

//Botao
const button = new Button('Enviar');
form.addItem(button);

form.render();