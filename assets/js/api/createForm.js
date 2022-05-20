const personaForm = () => {
    const contentForm = document.querySelector("#cw-content-forms");
    const form = document.createElement("form");
    form.setAttribute("autocomplete", "off");
    form.setAttribute("name", "maneForm");
    form.setAttribute("action", "#");
    const inputName = personaFormInputText(
        "name",
        "nombre:",
        "Ingresar nombre"
    );
    const inputUser = personaFormInputText(
        "username",
        "Usuario:",
        "Ingresar usuario"
    );
    const inputPassword = personaFormInputText(
        "password",
        "Clave:",
        "Ingresar clave"
    );
    const inputEmail = personaFormInputText(
        "email",
        "Correo:",
        "Ingresar correo"
    );
    const inputRole = personaFormInputSelect(
        "role",
        "Rol:",
        "Seleccionar rol",
        [
            { option: "Administrador", value: "ADMIN_ROLE" },
            { option: "usuario", value: "USER_ROLE" },
        ]
    );

    form.appendChild(inputName);
    form.appendChild(inputUser);
    form.appendChild(inputPassword);
    form.appendChild(inputEmail);
    form.appendChild(inputRole);
    contentForm.appendChild(form);
};

const personaFormInputText = (id, label, placeholder) => {
    const contentInput = document.createElement("div");
    const labelInput = document.createElement("label");
    const input = document.createElement("input");
    contentInput.classList.add("cw-content-input");
    labelInput.classList.add("cw-input-label");
    input.classList.add("cw-input-form");
    labelInput.setAttribute("for", id);
    input.setAttribute("id", id);
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", placeholder);
    contentInput.appendChild(labelInput);
    contentInput.appendChild(input);
    labelInput.innerText = label;
    return contentInput;
};

const personaFormInputSelect = (id, label, placeholder, options = []) => {
    const contentInput = document.createElement("div");
    const labelInput = document.createElement("label");
    const input = document.createElement("select");
    contentInput.classList.add("cw-content-input");
    labelInput.classList.add("cw-input-label");
    input.classList.add("cw-input-form");
    labelInput.setAttribute("for", id);
    input.setAttribute("id", id);
    // input.setAttribute("type", "text");
    input.setAttribute("placeholder", placeholder);
    contentInput.appendChild(labelInput);
    contentInput.appendChild(input);
    options.forEach((o) => {
        const option = document.createElement("option");
        option.setAttribute("value", o.value);
        option.innerText = o.option;
        input.appendChild(option);
    });
    labelInput.innerText = label;
    return contentInput;
};

personaForm();
