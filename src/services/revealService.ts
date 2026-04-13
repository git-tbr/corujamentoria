const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

export const initReveal = (): void => {
    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
};

export const disconnectReveal = (): void => {
    observer.disconnect();
};