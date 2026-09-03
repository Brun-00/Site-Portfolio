/* =========================
   MAIN INITIALIZATION
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
       ========================= */

    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }


    /* =========================
       REVEAL ANIMATIONS
       ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            observer.observe(element);
        });
    }


    /* =========================
       GAME FILTERS
       ========================= */

    const selects = [...document.querySelectorAll("[data-filter]")];
    const cards = [...document.querySelectorAll(".game-card")];

    if (selects.length && cards.length) {

        function filterGames() {

            const values = Object.fromEntries(
                selects.map((select) => [
                    select.dataset.filter,
                    select.value
                ])
            );

            cards.forEach((card) => {

                const matches = Object.entries(values).every(
                    ([key, value]) => {
                        return value === "all" || card.dataset[key] === value;
                    }
                );

                card.style.display = matches ? "block" : "none";
            });
        }

        selects.forEach((select) => {
            select.addEventListener("change", filterGames);
        });
    }


    /* =========================
       CONTACT FORM
       ========================= */

    const form = document.querySelector(".contact-form");

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            alert(
                "Thanks for your message! Connect this form to a backend or form service before publishing."
            );

            form.reset();
        });
    }


    /* =========================
       HOME FEATURED CAROUSELS
       ========================= */

    document.querySelectorAll("[data-carousel]").forEach((carousel) => {

        const track = carousel.querySelector(".carousel-track");
        const slides = [
            ...carousel.querySelectorAll(".featured-media-slide")
        ];

        const prevButton = carousel.querySelector(".carousel-prev");
        const nextButton = carousel.querySelector(".carousel-next");
        const dotsContainer = carousel.querySelector(".carousel-dots");

        if (
            !track ||
            !slides.length ||
            !prevButton ||
            !nextButton ||
            !dotsContainer
        ) {
            return;
        }


        let currentSlide = 0;
        let startX = null;


        function updateCarousel() {

            track.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            [...dotsContainer.children].forEach((dot, index) => {
                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );
            });
        }


        function goToSlide(index) {

            currentSlide =
                (index + slides.length) % slides.length;

            updateCarousel();
        }


        /* Create dots automatically */

        slides.forEach((_, index) => {

            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "carousel-dot";

            dot.setAttribute(
                "aria-label",
                `Go to media ${index + 1}`
            );

            dot.addEventListener("click", () => {
                goToSlide(index);
            });

            dotsContainer.appendChild(dot);
        });


        prevButton.addEventListener("click", () => {
            goToSlide(currentSlide - 1);
        });


        nextButton.addEventListener("click", () => {
            goToSlide(currentSlide + 1);
        });


        /* Swipe support */

        carousel.addEventListener(
            "touchstart",
            (event) => {
                startX = event.touches[0].clientX;
            },
            { passive: true }
        );


        carousel.addEventListener(
            "touchend",
            (event) => {

                if (startX === null) {
                    return;
                }

                const delta =
                    event.changedTouches[0].clientX - startX;

                if (Math.abs(delta) > 45) {

                    if (delta < 0) {
                        goToSlide(currentSlide + 1);
                    } else {
                        goToSlide(currentSlide - 1);
                    }
                }

                startX = null;
            },
            { passive: true }
        );


        updateCarousel();
    });


    /* =========================
       SHOWCASE CAROUSELS
       ========================= */

    document.querySelectorAll(".showcase-carousel").forEach((carousel) => {

        const track = carousel.querySelector(".showcase-track");

        const slides = [
            ...carousel.querySelectorAll(".showcase-slide")
        ];

        const prevButton =
            carousel.querySelector("[data-showcase-prev]");

        const nextButton =
            carousel.querySelector("[data-showcase-next]");

        const section = carousel.closest("section");

        const dots = section
            ? [...section.querySelectorAll(".showcase-dot")]
            : [];

        if (
            !track ||
            !slides.length ||
            !prevButton ||
            !nextButton
        ) {
            return;
        }


        let currentSlide = 0;
        let startX = null;


        function pauseVideos() {

            slides.forEach((slide) => {

                const video = slide.querySelector("video");

                if (video) {
                    video.pause();
                }

            });
        }


        function updateShowcase() {

            track.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );

            });

            pauseVideos();
        }


        function goToSlide(index) {

            currentSlide =
                (index + slides.length) % slides.length;

            updateShowcase();
        }


        /* Arrow controls */

        prevButton.addEventListener("click", () => {
            goToSlide(currentSlide - 1);
        });


        nextButton.addEventListener("click", () => {
            goToSlide(currentSlide + 1);
        });


        /* Dot controls */

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {
                goToSlide(index);
            });

        });


        /* Swipe support */

        carousel.addEventListener(
            "touchstart",
            (event) => {
                startX = event.touches[0].clientX;
            },
            { passive: true }
        );


        carousel.addEventListener(
            "touchend",
            (event) => {

                if (startX === null) {
                    return;
                }

                const delta =
                    event.changedTouches[0].clientX - startX;

                if (Math.abs(delta) > 45) {

                    if (delta < 0) {
                        goToSlide(currentSlide + 1);
                    } else {
                        goToSlide(currentSlide - 1);
                    }

                }

                startX = null;
            },
            { passive: true }
        );


        updateShowcase();
    });


    /* =========================
       MEDIA GALLERY CAROUSELS
       ========================= */

    document.querySelectorAll(".media-carousel").forEach((carousel) => {

        const track = carousel.querySelector(".media-track");

        const slides = [
            ...carousel.querySelectorAll(".media-slide")
        ];

        const prevButton =
            carousel.querySelector("[data-media-prev]");

        const nextButton =
            carousel.querySelector("[data-media-next]");

        const section = carousel.closest("section");

        const dots = section
            ? [...section.querySelectorAll(".media-dot")]
            : [];

        if (
            !track ||
            !slides.length ||
            !prevButton ||
            !nextButton
        ) {
            return;
        }


        let currentSlide = 0;
        let startX = null;


        function updateMedia() {

            track.style.transform =
                `translateX(-${currentSlide * 100}%)`;

            dots.forEach((dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentSlide
                );

            });
        }


        function goToSlide(index) {

            currentSlide =
                (index + slides.length) % slides.length;

            updateMedia();
        }


        /* Arrow controls */

        prevButton.addEventListener("click", () => {
            goToSlide(currentSlide - 1);
        });


        nextButton.addEventListener("click", () => {
            goToSlide(currentSlide + 1);
        });


        /* Dot controls */

        dots.forEach((dot, index) => {

            dot.addEventListener("click", () => {
                goToSlide(index);
            });

        });


        /* Swipe support */

        carousel.addEventListener(
            "touchstart",
            (event) => {
                startX = event.touches[0].clientX;
            },
            { passive: true }
        );


        carousel.addEventListener(
            "touchend",
            (event) => {

                if (startX === null) {
                    return;
                }

                const delta =
                    event.changedTouches[0].clientX - startX;

                if (Math.abs(delta) > 45) {

                    if (delta < 0) {
                        goToSlide(currentSlide + 1);
                    } else {
                        goToSlide(currentSlide - 1);
                    }

                }

                startX = null;
            },
            { passive: true }
        );


        updateMedia();
    });

});


/* =========================
   IMAGE LIGHTBOX
   ========================= */

const galleryItems =
    document.querySelectorAll("[data-lightbox-image]");

const lightbox =
    document.querySelector(".media-lightbox");

const lightboxImage =
    document.querySelector(".media-lightbox-content img");


galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        if (!lightbox || !lightboxImage) {
            return;
        }

        const src =
            item.dataset.lightboxImage;

        if (!src) {
            return;
        }

        lightboxImage.src = src;

        lightbox.classList.add("open");
    });

});


document
    .querySelector(".lightbox-close")
    ?.addEventListener("click", () => {

        lightbox?.classList.remove("open");

    });


lightbox?.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("open");
    }

});


/* =========================
   HEADER + FOOTER COMPONENTS
   ========================= */

async function loadComponent(elementId, filePath) {

    const element =
        document.getElementById(elementId);

    if (!element) {
        return;
    }


    try {

        const response =
            await fetch(filePath);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${filePath}`
            );
        }

        element.innerHTML =
            await response.text();

    } catch (error) {

        console.error(error);

    }
}


document.addEventListener("DOMContentLoaded", () => {

    const isInsideGamesFolder =
        window.location.pathname.includes("/Games/");

    const componentPath =
        isInsideGamesFolder
            ? "../components/"
            : "components/";


    loadComponent(
        "header",
        `${componentPath}header.html`
    );

    loadComponent(
        "footer",
        `${componentPath}footer.html`
    );

});