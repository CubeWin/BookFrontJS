let dragItem = document.querySelector("#move");
let myItemChange = document.querySelector("#mydiv");
let container = document.querySelector("#content-zoom");
let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let zoomEstado = false;
let miniaturaEstado = false;
let audioPage = new Audio("assets/audio/page-flip.mp3");
container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);
container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }
    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    active = false;
}

function drag(e) {
    if (active) {
        e.preventDefault();
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    myItemChange.style.transform =
        "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

const getImagePage = (page) => {
    const revista = document.querySelector(`#magazine>div[page="${page}"] img`);
    return revista.getAttribute("src");
};

$("#btnZoom").click(function () {
    const m = document.querySelector(".carrusel-content.opacity-0-cw.d-none");

    if (!m) {
        showMiniature();
    }
    widthImagen = 500;
    heightImagen = 650;
    sizeRes = calculation(widthImagen, heightImagen);
    widthBox = $(window).width();
    displayBook = $("#magazine").turn("display");
    pageBook = $("#magazine").turn("page");
    pagesBook = $("#magazine").turn("pages");

    console.log(pageBook);
    $("#firstPage").attr("src", "");
    $("#secondPage").attr("src", "");

    if (displayBook == "double") {
        sizeRes[0] = sizeRes[0] / 2;
        if (pageBook == pagesBook || pageBook == 1) {
            let imagePage = getImagePage(pageBook);
            $("#firstPage").attr("src", imagePage);
            $("#secondPage").addClass("d-none");
            $("#contentSecondPage").addClass("d-none");
            $("#secondPage").attr("src", imagePage);
        } else {
            $("#secondPage").removeClass("d-none");
            $("#contentSecondPage").removeClass("d-none");
            if (pageBook % 2 == 0) {
                console.info("El numero es PAR =>", pageBook);
                let imagePageNext = getImagePage(pageBook + 1);
                let imagePage = getImagePage(pageBook);
                $("#firstPage").attr("src", imagePage);
                $("#secondPage").attr("src", imagePageNext);
            } else {
                console.info("El numero es INPAR =>", pageBook);
                let imagePageprev = getImagePage(pageBook - 1);
                let imagePage = getImagePage(pageBook);
                $("#firstPage").attr("src", imagePageprev);
                $("#secondPage").attr("src", imagePage);
            }
        }
    } else {
        let imagePage = getImagePage(pageBook);
        $("#firstPage").attr("src", imagePage);
        $("#secondPage").addClass("d-none");
        $("#contentSecondPage").addClass("d-none");
    }
    $("#mydiv>div")
        .css("width", sizeRes[0] * 1.8)
        .css("height", sizeRes[1] * 1.8);
    $("#mydiv>div>img")
        .css("width", sizeRes[0] * 1.8)
        .css("height", sizeRes[1] * 1.8);
    if (zoomEstado == false) {
        zoomEstado = true;
        $("#content-magazine").addClass("d-none");
        $("#content-zoom").removeClass("d-none");
        $("#btnPageLeft").attr("disabled", true);
        $("#btnPageRight").attr("disabled", true);
        $("#btnMiniatura").attr("disabled", true);
        $("#btnPagIni").attr("disabled", true);
        $("#btnPagFin").attr("disabled", true);
        if (miniaturaEstado == true) {
            $("#btnMiniatura").trigger("click");
        }
    } else {
        zoomEstado = false;
        $("#content-zoom").addClass("d-none");
        $("#content-magazine").removeClass("d-none");
        $("#btnPageLeft").attr("disabled", false);
        $("#btnPageRight").attr("disabled", false);
        $("#btnMiniatura").attr("disabled", false);
        $("#btnPagIni").attr("disabled", false);
        $("#btnPagFin").attr("disabled", false);

        let bookPage = $("#magazine").turn("page");
        let bookPages = $("#magazine").turn("pages");
        btnPage(bookPage, bookPages);
    }
});

const execTurn = function () {
    widthImagen = 500;
    heightImagen = 650;
    sizeRes = calculation(widthImagen, heightImagen);
    $("#content-magazine").width(sizeRes[0]);
    $("#magazine").turn({
        width: sizeRes[0],
        height: sizeRes[1],
        display: sizeRes[2],
        duration: 800,
        gradients: true,
        elevation: 50,
        when: {
            turning: function (e, page, view) {
                audioPage.pause();
                audioPage.currentTime = 0;
                audioPage.play();
                let book = $(this);
                pagesbook = book.turn("pages");
                btnPage(page, pagesbook);
            },
        },
    });
    let bookPage = $("#magazine").turn("page");
    let bookPages = $("#magazine").turn("pages");
    btnPage(bookPage, bookPages);
};

function btnPage(a, b) {
    widthImagen = 500;
    heightImagen = 650;
    sizeRes = calculation(widthImagen, heightImagen);
    temporalWidth = 0;
    if (sizeRes[0] > 768) {
        temporalWidth = sizeRes[0] / 4;
    }
    if (a == 1) {
        $("#btnPageLeft").attr("disabled", true);
        $("#btnPagIni").attr("disabled", true);
        $("#btnPageRight").attr("disabled", false);
        $("#btnPagFin").attr("disabled", false);
        $("#content-magazine").css("left", -temporalWidth);
        $("#cw-prevpage").addClass("d-none");
        $("#cw-nextpage").removeClass("d-none");
    } else if (a == b) {
        $("#btnPageRight").attr("disabled", true);
        $("#btnPagFin").attr("disabled", true);
        $("#btnPageLeft").attr("disabled", false);
        $("#btnPagIni").attr("disabled", false);
        $("#content-magazine").css("left", temporalWidth);
        $("#cw-nextpage").addClass("d-none");
        $("#cw-prevpage").removeClass("d-none");
    } else {
        $("#btnPageLeft").attr("disabled", false);
        $("#btnPagIni").attr("disabled", false);
        $("#btnPageRight").attr("disabled", false);
        $("#btnPagFin").attr("disabled", false);
        $("#content-magazine").css("left", "0");
        setTimeout(function () {
            $("#cw-prevpage").removeClass("d-none");
            $("#cw-nextpage").removeClass("d-none");
        }, 200);
    }
}

$(window).resize(function () {
    widthImagen = 500;
    heightImagen = 650;
    sizeRes = calculation(widthImagen, heightImagen);
    $("#content-magazine").width(sizeRes[0]);
    page = $("#magazine").turn("page");
    pagesbo = $("#magazine").turn("pages");
    btnPage(page, pagesbo);
    $("#magazine").turn("options", {
        width: sizeRes[0],
        height: sizeRes[1],
        display: sizeRes[2],
    });
});

function calculation(widthImagen, heightImagen) {
    widthImagen = widthImagen * 0.9;
    heightImagen = heightImagen * 0.9;
    widthBox = $(window).width();
    heightBox = $(window).height();
    widthBoxBorder = widthBox - 10;
    heightBoxBorder = heightBox - 55;
    if (widthBox > 768) {
        display = "double";
        widthImagen = widthImagen * 2;
    } else {
        display = "single";
    }
    widthPercent = widthBoxBorder / widthImagen; //porcentaje
    heightPercent = heightBoxBorder / heightImagen; //porcentaje
    //console.log(widthPercent + '---' + heightPercent);
    if (widthPercent > heightPercent) {
        if (heightPercent < 1) {
            widthResult = widthImagen * heightPercent;
            heightResult = heightImagen * heightPercent;
        } else {
            widthResult = widthImagen;
            heightResult = heightImagen;
        }
    } else if (widthPercent == heightPercent) {
        widthResult = widthImagen * widthPercent;
        heightResult = heightImagen * heightPercent;
    } else {
        if (widthPercent < 1) {
            heightResult = heightImagen * widthPercent;
            widthResult = widthImagen * widthPercent;
        } else {
            heightResult = heightImagen;
            widthResult = widthImagen;
        }
    }
    //console.log('width: ' + widthResult + '-- height: ' + heightResult + '-- display: ' + display);
    resultSize = new Array(widthResult, heightResult, display);
    return resultSize;
}

$(window).bind("keydown", function (e) {
    if (e.keyCode == 27) if (zoomEstado == true) $("#btnZoom").trigger("click");
});

function pagTrun(a) {
    $("#magazine").turn("page", a);
}
