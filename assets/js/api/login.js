const formLogin = document.querySelector("#form-login");
const userLogin = document.querySelector("#username");
const userPassword = document.querySelector("#password");
const sendForm = document.querySelector("#send-form");

sendForm.addEventListener("click", () => {
    const a = validLength(userLogin);
    const b = validLength(userPassword);
    if (a && b) {
        removeErrorValid();
        const send = new FormData();
        send.append("username", userLogin.value);
        send.append("password", userPassword.value);
        authLogin(send);
    }
});

const validLength = (input) => {
    if (!(input.value.length >= 4)) {
        const span = input.getAttribute("spanerror");
        input.classList.add("cw-input-error");
        document.querySelector(`#${span}`).innerText =
            "Debe ingresar 4 digitos como minimo.";
        return false;
    }
    return true;
};

const removeErrorValid = () => {
    const allInputs = document.querySelectorAll(".cw-input-error");
    allInputs.forEach((input) => {
        input.classList.remove("cw-input-error");
        const span = input.getAttribute("spanerror");
        document.querySelector(`#${span}`).innerText = "";
    });
};

const authLogin = async (sendForm) => {
    const msg = document.querySelector("#form-message-error");
    try {
        const url = `http://localhost:8080/`;
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(Object.fromEntries(sendForm)),
        });
        if (!response.ok || response.status >= 400) {
            throw new Error(
                "Fallo en la autenticacion, verificar los datos proporcionados."
            );
        }
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        msg.innerText = ``;
        window.location.href = './persona';
    } catch (error) {
        msg.innerText = `=> ${error}`;
    }
};
