const servUrl = `http://localhost:8080`;

const getPages = async (book = "62832ef4a17b9b579675b435") => {
    try {
        const pages = await fetch(`${servUrl}/page/${book}`);
        if (!pages.ok) {
            throw new Error("Fallo la petición al servidor.");
        }
        const results = await pages.json();
        renderBook(results.results);
        execTurn();
        renderCarousel(results.results);
        initCarousel();

    } catch (error) {
        console.error(`=> ${error}`);
        renderError(error);
    }
};

const renderBook = (pages) => {
    let tagRender = document.querySelector("#magazine");
    let render = "";
    pages.forEach((p) => {
        render += `
            <div>
                <img
                    src="${servUrl}/upload/page/${p.id}"
                    alt="pages"
                    style="width:100%;height:100%;
                    ">
            </div>
        `;
    });
    tagRender.innerHTML += render;
};

const renderCarousel = (pages) => {
    let tagRender = document.querySelector("#carousel-cw");
    let render = "";
    pages.forEach((p) => {
        render += `
        <a class="cw-slide position-absolutes" onclick="pagTrun(${p.page})">
            <img src="${servUrl}/upload/page/${p.id}" class="rounded border">
            <div
                class="cw-num rounded-bottom d-flex justify-content-center align-items-center border-bottom">
                ${p.page}
            </div>
        </a>
        `;
    });
    tagRender.innerHTML += render;
};

const renderError = (error) => {
    let tagRender = document.querySelector("#magazine");
    let render = "";
    render += `
    <div class="errorMesage">
        Algo salió mal <br />
        ${error}
    </div>
`;
    tagRender.innerHTML += render;
};

const initCarousel = () => {
    cwMyCarousel = new PureJSCarousel({
        carousel: ".cw-carousel",
        slide: ".cw-slide",
        oneByOne: true,
        infinite: true,
    });
};

(() => {
    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
    let bookId = findGetParameter("book");
    bookId !== "" && bookId !== null && bookId !== undefined
        ? getPages(bookId)
        : getPages();
})();
