(function (b) {
    b.toast = function (a, h, g, l, k) {
        b('.cw-toast-container').length ||
            (b('body').prepend(
                '<div class="cw-toast-container" aria-live="polite" aria-atomic="true"></div>'
            ),
            b('.cw-toast-container').append(
                '<div class="cw-toast-wrapper"></div>'
            ));
        var c = '',
            d = '',
            e = 'text-muted',
            f = '',
            m = 'object' === typeof a ? a.title || '' : a || 'Notice!';
        h = 'object' === typeof a ? a.subtitle || '' : h || '';
        g = 'object' === typeof a ? a.content || '' : g || '';
        k = 'object' === typeof a ? a.delay || 3e3 : k || 3e3;
        switch ('object' === typeof a ? a.type || '' : l || 'info') {
            case 'info':
                c = 'bg-info';
                f = e = d = 'text-white';
                break;
            case 'success':
                c = 'bg-success';
                f = e = d = 'text-white';
                break;
            case 'warning':
            case 'warn':
                c = 'bg-warning';
                f = e = d = 'text-dark';
                break;
            case 'error':
            case 'danger':
                (c = 'bg-danger'), (f = e = d = 'text-white');
        }
        a =
            '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="' +
            k +
            '">' +
            ('<div class="toast-header  border-0 ' + c + ' ' + d + '">') +
            ('<strong class="mr-auto">' + m + '</strong>');
        a += '<small class="' + e + '">' + h + '</small>';
        a +=
            '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
        a += '<span aria-hidden="true" class="' + f + '">&times;</span>';
        a += '</button>';
        a += '</div>';
        '' !== g &&
            ((a += '<div class="toast-body">'), (a += g), (a += '</div>'));
        a += '</div>';
        b('.cw-toast-wrapper').append(a);
        b('.cw-toast-wrapper .toast:last').toast('show');
    };
})(jQuery);

// $.toast({ title: title, subtitle: '11 mins ago', content: content, type: type, delay: 5000 });

function checkAdmin() {
    if (document.getElementById('adm-check-nav').checked == true) {
        document.getElementById('adm-grid-all').classList.add('adm-checked');
        //********INICIO DEL BTN ***********
        document.getElementById('adm-icon-menu').classList.remove('fa-times');
        document
            .getElementById('adm-icon-menu')
            .classList.add('fa-arrow-right');
    } else if (document.getElementById('adm-check-nav').checked == false) {
        document.getElementById('adm-grid-all').classList.remove('adm-checked');
        //********INICIO DEL BTN ***********
        document.getElementById('adm-icon-menu').classList.add('fa-times');
        document
            .getElementById('adm-icon-menu')
            .classList.remove('fa-arrow-right');
    }
}

const open_navBox = async () => {
    const btn = document.querySelector('#btn-icon-cw');
    const nav = document.querySelector('#content-button-cw');

    btn.classList.add('opacity-0-cw');
    nav.classList.add('box-util-active');
    await setTimeout(() => {
        nav.classList.remove('opacity-0-cw');
        btn.classList.add('d-none');
        nav.classList.remove('content-button-close');
        clearTimeout();
    }, 600);
};

const close_navBox = async () => {
    const btn = document.querySelector('#btn-icon-cw');
    const nav = document.querySelector('#content-button-cw');
    const m = document.querySelector('.carrusel-content.opacity-0-cw.d-none');

    if (!m) {
        showMiniature();
    }

    btn.classList.remove('opacity-0-cw');
    nav.classList.add('opacity-0-cw');
    await setTimeout(() => {
        btn.classList.remove('d-none');
        nav.classList.add('content-button-close');
        clearTimeout();
    }, 400);
};

const showMiniature = async () => {
    const m = document.querySelector('#carrusel-content-cw');
    m.classList.toggle('opacity-0-cw');
    await setTimeout(() => {
        m.classList.toggle('d-none');
        clearTimeout();
    }, 300);
};

showMiniature();
