document.addEventListener("DOMContentLoaded", () => {
    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const targets = document.querySelectorAll(
        "main, main > *, .see-more, .AboutMe, .aboutme-square, section, article"
    );

    if (!("IntersectionObserver" in window)) {
        targets.forEach((element) => element.classList.add("reveal-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px",
        }
    );

    targets.forEach((element) => {
        element.classList.add("reveal-on-scroll");
        observer.observe(element);
    });
});
