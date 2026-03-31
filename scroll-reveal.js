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

    const alterCard = document.getElementById("alter-card");
    const modal = document.querySelector(".modal");
    const closeButton = document.querySelector(".close-button");

    if (alterCard && modal) {
        alterCard.addEventListener("click", () => {
            showModal();
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", (event) => {
            event.stopPropagation();
            removeModal();
        });
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                removeModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            removeModal();
        }
    });
});

function removeModal() {
    const modal = document.querySelector(".modal");
    if (!modal) {
        return;
    }

    if (modal.style.display === "none" || modal.classList.contains("is-closing")) {
        return;
    }

    const finishClose = () => {
        resetModalScroll(modal);
        modal.style.display = "none";
        modal.classList.remove("is-open", "is-closing");
        modal.setAttribute("aria-hidden", "true");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishClose();
        return;
    }

    modal.classList.remove("is-open");
    modal.classList.add("is-closing");

    const onAnimationEnd = (event) => {
        if (event.target !== modal) {
            return;
        }

        modal.removeEventListener("animationend", onAnimationEnd);
        finishClose();
    };

    modal.addEventListener("animationend", onAnimationEnd);

    window.setTimeout(() => {
        if (modal.classList.contains("is-closing")) {
            modal.removeEventListener("animationend", onAnimationEnd);
            finishClose();
        }
    }, 260);
}

function showModal() {
    const modal = document.querySelector(".modal");
    if (!modal) {
        return;
    }

    modal.style.display = "flex";
    modal.classList.remove("is-closing");
    resetModalScroll(modal);
    requestAnimationFrame(() => resetModalScroll(modal));
    void modal.offsetWidth;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

function resetModalScroll(modal) {
    modal.scrollTop = 0;
    modal.scrollLeft = 0;

    const modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
        modalContent.scrollTop = 0;
        modalContent.scrollLeft = 0;
    }
}
