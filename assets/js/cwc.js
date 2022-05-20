function checkAdmin() {
    if (document.getElementById("admCheck").checked == true) {
        document.getElementById("adm-grid-all").classList.add("adm-checked");
        document.getElementById("menu-icon-cw").classList.remove("transformed");
        document.querySelector(".adm-body").style.filter = "opacity(1)";
    } else if (document.getElementById("admCheck").checked == false) {
        document.getElementById("adm-grid-all").classList.remove("adm-checked");
        document.getElementById("menu-icon-cw").classList.add("transformed");
        if (window.innerWidth < 992) {
            document.querySelector(".adm-body").style.filter = "opacity(0.1)";
        }
    }
}

(function () {
    if (window.innerWidth < 992) {
        document.querySelector("#admCheck").checked = true;
        checkAdmin();
    }
})();

document.querySelector(".cw-open-lateral").addEventListener("click", () => {
    openLateral();
});

document.querySelector(".cw-close-lateral").addEventListener("click", () => {
    closeLateral();
});

const openLateral = () => {
    let old = document
        .querySelector(".cw-open-lateral")
        .getAttribute("cw-lateral-target");
    document.querySelector(old).classList.toggle("cw-disabled-modal");
};

const closeLateral = () => {
    let old = document
        .querySelector(".cw-close-lateral")
        .getAttribute("cw-lateral-target");
    document.querySelector(old).classList.toggle("cw-disabled-modal");
};
