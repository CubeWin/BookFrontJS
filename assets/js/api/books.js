const servUrl = `http://localhost:8080`;

const getPages = async () => {
    try {
        const books = await fetch(`${servUrl}/book/`);
        if (!books.ok) {
            throw new Error("Fallo la petición al servidor.");
        }
        const results = await books.json();
        console.log(results);
        renderBooks(results.results);
    } catch (error) {
        console.error(`=> ${error}`);
        renderError(error);
    }
};

const renderBooks = (books) => {
    const mybook = document.querySelector("#mibooks");
    let htmlBooks = "";
    books.forEach((b) => {
        htmlBooks += `
            <div class="cw__card">
                <div class="cw__card--image">
                    <div class="cw__card--picture"
                        style="background-image: url('http://localhost:8080/upload/book/${b.id}')">
                    </div>
                </div>
                <div class="card-body">
                    <h2>${b.title}</h2>
                </div>
                <div class="card-body pull-right">
                    <a href="./revista/?book=${b.id}" class="cw__card--btn"><i class="fa fa-search"></i></a>
                </div>
            </div>
            `;
    });
    mybook.innerHTML = htmlBooks;
};

const renderError = (e) => {
    const mybook = document.querySelector("#mibooks");
    let htmlBooks = `
            Error ${e}
        `;
    mybook.innerHTML = htmlBooks;
};

getPages();
// [0,1,1,2,3,5,8,13,21]

const fibonacci2 = (a) => {
    let b = [0, 1];
    for (let i = 2; i <= a; i++) {
        b[i] = b[i - 2] + b[i - 1];
    }
    return b[a];
};

console.log(fibonacci2(8));
