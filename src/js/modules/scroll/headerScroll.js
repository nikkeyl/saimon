let addWindowScrollEvent = false;
export function headerScroll() {
    addWindowScrollEvent = true;
    const header = document.querySelector('header.header');
    const headerShow = header.hasAttribute('data-scroll-show');
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
    let scrollDirection = 0;
    document.addEventListener("windowScroll", () => {
        const scrollTop = window.scrollY;
        if (scrollTop >= startPoint) {
            !header.classList.contains('header-scroll') ? header.classList.add('header-scroll') : null;
            if (headerShow) {
                if (scrollTop > scrollDirection) {
                    header.classList.contains('header-show') ? header.classList.remove('header-show') : null;
                } else {
                    !header.classList.contains('header-show') ? header.classList.add('header-show') : null;
                }
            }
        } else {
            header.classList.contains('header-scroll') ? header.classList.remove('header-scroll') : null;
            if (headerShow) {
                header.classList.contains('header-show') ? header.classList.remove('header-show') : null;
            }
        }
        scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
    });
}
setTimeout(() => {
    if (addWindowScrollEvent) {
        let windowScroll = new Event("windowScroll");
        window.addEventListener("scroll", () => {
            document.dispatchEvent(windowScroll);
        });
    }
}, 0);