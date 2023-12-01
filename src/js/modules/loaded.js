export function addLoadedClass() {
    window.addEventListener('load', () => {
        document.documentElement.classList.add('loaded');
    });
}