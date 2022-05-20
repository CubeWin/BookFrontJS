const SlickPagination = function (options) {
    let self = this;
    this.perPage = 10;
    this.visiblePages = 5;

    if (!options.itemsContainer || !options.paginationContainer) {
        console.warn("Slick Pagination: Missing Required Settings");
    }

    for (let key in options) {
        this[key] = options[key];
    }

    this.items = this.itemsContainer.children;
    this.numberOfItems = this.items.length;
    this.totalPages = parseInt(Math.ceil(this.numberOfItems / this.perPage));
    this.visibilePages =
        this.totalPages < this.visiblePages
            ? this.totalPages
            : this.visiblePages;

    for (let i = 0; i < this.items.length; i++) {
        if (i < this.perPage) {
            this.items[i].style.display = "block";
        }
    }

    this.attachClickEvents = function () {
        let pageLinks = this.paginationContainer.querySelectorAll("a");

        for (let i = 0; i < pageLinks.length; i++) {
            let pageLink = pageLinks[i];

            pageLink.onclick = function (e) {
                e.preventDefault();
                let page = e.target.innerText;
                let currentPage = parseInt(
                    self.paginationContainer.querySelector(".active").innerText
                );
                let newPage =
                    page === "<<"
                        ? 1
                        : page == ">>"
                        ? self.totalPages
                        : page == "<"
                        ? currentPage - 1
                        : page == ">"
                        ? currentPage + 1
                        : parseInt(page);

                if (newPage > 0 && newPage <= self.totalPages) {
                    let startItem =
                        parseInt(newPage * self.perPage) - self.perPage;
                    let endItem = parseInt(startItem + self.perPage) - 1;
                    let startPage =
                        newPage - Math.floor(self.visibilePages / 2);
                    let endPage = newPage + Math.floor(self.visibilePages / 2);

                    for (let j = 0; j < self.items.length; j++) {
                        self.items[j].style.display =
                            j >= startItem && j <= endItem ? "block" : "none";
                    }

                    if (
                        newPage <
                        self.visibilePages -
                            Math.ceil(self.visibilePages / 2) +
                            1
                    ) {
                        startPage = 1;
                        endPage = self.visibilePages;
                    } else if (
                        newPage >
                        self.totalPages - Math.ceil(self.visibilePages / 2)
                    ) {
                        startPage = self.totalPages - (self.visibilePages - 1);
                        endPage = self.totalPages;
                    }

                    self.buildPagination(startPage, endPage, newPage);
                }

                window.scrollTo(
                    0,
                    self.itemsContainer.getBoundingClientRect().top +
                        window.scrollY -
                        200
                );
            };
        }
    };

    this.buildPagination = function (startPage, endPage, currentPage) {
        let pageLinks = "";
        let backDisabled = currentPage === 1 ? ' class="disabled"' : "";
        let nextDisabled =
            currentPage === this.totalPages ? ' class="disabled"' : "";
        let backLinks =
            this.totalPages > this.visiblePages
                ? '<li><a href="#"' +
                  backDisabled +
                  '><<</a></li><li><a href="#"' +
                  backDisabled +
                  "><</a></li>"
                : "";
        let nextLinks =
            this.totalPages > this.visiblePages
                ? '<li><a href="#"' +
                  nextDisabled +
                  '>></a></li><li><a href="#"' +
                  nextDisabled +
                  ">>></a></li>"
                : "";

        for (let i = startPage; i <= endPage; i++) {
            let active = i === currentPage ? ' class="active"' : "";
            pageLinks +=
                "<li><a" +
                active +
                ' href="#" data-page="' +
                i +
                '">' +
                i +
                "</a></li>";
        }

        this.paginationContainer.innerHTML = backLinks + pageLinks + nextLinks;

        this.attachClickEvents();
    };

    this.buildPagination(1, this.visibilePages, 1);
};

new SlickPagination({
    itemsContainer: document.getElementById("stuff"),
    paginationContainer: document.querySelector(".pagination"),
    visiblePages: 3,
});
