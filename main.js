/* =========================================================
   MAIN.JS
   Portfolio interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function initMobileMenu() {
        const burger = document.querySelector(".burger");
        const nav = document.querySelector(".nav");

        if (!burger || !nav) return;

        burger.addEventListener("click", () => {
            nav.classList.toggle("open");
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
            });
        });
    }


    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    function initRevealAnimations() {
        const revealElements = document.querySelectorAll(".reveal");

        if (!revealElements.length) return;

        if (!("IntersectionObserver" in window)) {
            revealElements.forEach((element) => {
                element.classList.add("visible");
            });
            return;
        }

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


    /* =====================================================
       GAME FILTERS
       ===================================================== */

    function initGameFilters() {
        const selects = [...document.querySelectorAll("[data-filter]")];
        const cards = [...document.querySelectorAll(".game-card")];

        if (!selects.length || !cards.length) return;

        function filterGames() {
            const filters = {};

            selects.forEach((select) => {
                filters[select.dataset.filter] = select.value;
            });

            cards.forEach((card) => {
                const matches = Object.entries(filters).every(
                    ([key, value]) => {
                        return (
                            value === "all" ||
                            card.dataset[key] === value
                        );
                    }
                );

                card.style.display = matches ? "" : "none";
            });
        }

        selects.forEach((select) => {
            select.addEventListener("change", filterGames);
        });

        filterGames();
    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    function initContactForm() {
        const form = document.querySelector(".contact-form");

        if (!form) return;

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            alert(
                "Thanks for your message! Connect this form to a backend or form service before publishing."
            );

            form.reset();
        });
    }


    /* =====================================================
       HOME FEATURED CAROUSELS
       ===================================================== */

    function initFeaturedCarousels() {
        const carousels = document.querySelectorAll("[data-carousel]");

        carousels.forEach((carousel) => {
            const track = carousel.querySelector(".carousel-track");
            const slides = [
                ...carousel.querySelectorAll(".featured-media-slide")
            ];

            const previousButton =
                carousel.querySelector(".carousel-prev");

            const nextButton =
                carousel.querySelector(".carousel-next");

            const dotsContainer =
                carousel.querySelector(".carousel-dots");

            if (
                !track ||
                !slides.length ||
                !dotsContainer
            ) {
                return;
            }

            let currentSlide = 0;
            let startX = null;

            /* -------------------------------------------------
               CREATE DOTS
               ------------------------------------------------- */

            dotsContainer.innerHTML = "";

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

            const dots = [
                ...dotsContainer.querySelectorAll(".carousel-dot")
            ];


            /* -------------------------------------------------
               UPDATE CAROUSEL
               ------------------------------------------------- */

            function updateCarousel() {
                track.style.transform =
                    `translate3d(-${currentSlide * 100}%, 0, 0)`;

                dots.forEach((dot, index) => {
                    dot.classList.toggle(
                        "active",
                        index === currentSlide
                    );
                });
            }


            /* -------------------------------------------------
               CHANGE SLIDE
               ------------------------------------------------- */

            function goToSlide(index) {
                currentSlide =
                    (index + slides.length) % slides.length;

                updateCarousel();
            }


            /* -------------------------------------------------
               BUTTONS
               ------------------------------------------------- */

            if (previousButton) {
                previousButton.addEventListener(
                    "click",
                    (event) => {
                        event.preventDefault();

                        goToSlide(currentSlide - 1);
                    }
                );
            }

            if (nextButton) {
                nextButton.addEventListener(
                    "click",
                    (event) => {
                        event.preventDefault();

                        goToSlide(currentSlide + 1);
                    }
                );
            }


            /* -------------------------------------------------
               TOUCH / SWIPE
               ------------------------------------------------- */

            carousel.addEventListener(
                "touchstart",
                (event) => {
                    startX =
                        event.changedTouches[0].clientX;
                },
                {
                    passive: true
                }
            );

            carousel.addEventListener(
                "touchend",
                (event) => {
                    if (startX === null) return;

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
                {
                    passive: true
                }
            );

            updateCarousel();
        });
    }


    /* =====================================================
       GAMEPLAY SHOWCASE CAROUSEL
       ===================================================== */

    function initShowcaseCarousels() {
        const carousels =
            document.querySelectorAll(".showcase-carousel");

        carousels.forEach((carousel) => {

            const track =
                carousel.querySelector(".showcase-track");

            const slides = [
                ...carousel.querySelectorAll(".showcase-slide")
            ];

            const previousButton =
                carousel.querySelector("[data-showcase-prev]");

            const nextButton =
                carousel.querySelector("[data-showcase-next]");

            const section =
                carousel.closest("section");

            if (!track || !slides.length) {
                return;
            }

            let currentSlide = 0;
            let startX = null;


            /* -------------------------------------------------
               FIND DOT CONTAINER
               ------------------------------------------------- */

            const dotsContainer = section
                ? section.querySelector(".showcase-dots")
                : null;

            if (!dotsContainer) {
                console.warn(
                    "Showcase dots container not found."
                );
            }


            /* -------------------------------------------------
               CREATE DOTS
               ------------------------------------------------- */

            if (dotsContainer) {
                dotsContainer.innerHTML = "";

                slides.forEach((_, index) => {
                    const dot =
                        document.createElement("button");

                    dot.type = "button";
                    dot.className = "showcase-dot";

                    dot.setAttribute(
                        "aria-label",
                        `Go to showcase video ${index + 1}`
                    );

                    dot.addEventListener("click", (event) => {
                        event.preventDefault();

                        goToSlide(index);
                    });

                    dotsContainer.appendChild(dot);
                });
            }

            const dots = dotsContainer
                ? [
                    ...dotsContainer.querySelectorAll(
                        ".showcase-dot"
                    )
                ]
                : [];


            /* -------------------------------------------------
               PAUSE VIDEOS THAT ARE NOT ACTIVE
               ------------------------------------------------- */

            function pauseInactiveVideos() {
                slides.forEach((slide, index) => {
                    const video =
                        slide.querySelector("video");

                    if (!video) return;

                    if (index !== currentSlide) {
                        video.pause();
                    }
                });
            }


            /* -------------------------------------------------
               UPDATE SHOWCASE
               ------------------------------------------------- */

            function updateShowcase() {

                track.style.transform =
                    `translate3d(-${currentSlide * 100}%, 0, 0)`;

                dots.forEach((dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentSlide
                    );

                    dot.setAttribute(
                        "aria-current",
                        index === currentSlide
                            ? "true"
                            : "false"
                    );
                });

                pauseInactiveVideos();
            }


            /* -------------------------------------------------
               GO TO SLIDE
               ------------------------------------------------- */

            function goToSlide(index) {

                currentSlide =
                    (index + slides.length) % slides.length;

                updateShowcase();
            }


            /* -------------------------------------------------
               PREVIOUS BUTTON
               ------------------------------------------------- */

            if (previousButton) {

                previousButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        goToSlide(currentSlide - 1);
                    }
                );
            }


            /* -------------------------------------------------
               NEXT BUTTON
               ------------------------------------------------- */

            if (nextButton) {

                nextButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        goToSlide(currentSlide + 1);
                    }
                );
            }


            /* -------------------------------------------------
               SWIPE
               ------------------------------------------------- */

            carousel.addEventListener(
                "touchstart",
                (event) => {

                    startX =
                        event.changedTouches[0].clientX;
                },
                {
                    passive: true
                }
            );


            carousel.addEventListener(
                "touchend",
                (event) => {

                    if (startX === null) return;

                    const delta =
                        event.changedTouches[0].clientX -
                        startX;

                    if (Math.abs(delta) > 45) {

                        if (delta < 0) {
                            goToSlide(currentSlide + 1);
                        } else {
                            goToSlide(currentSlide - 1);
                        }
                    }

                    startX = null;
                },
                {
                    passive: true
                }
            );


            updateShowcase();
        });
    }


    /* =====================================================
       MEDIA GALLERY CAROUSEL
       ===================================================== */

    function initMediaCarousels() {

        const carousels =
            document.querySelectorAll(".media-carousel");

        carousels.forEach((carousel) => {

            const track =
                carousel.querySelector(".media-track");

            const slides = [
                ...carousel.querySelectorAll(".media-slide")
            ];

            const previousButton =
                carousel.querySelector("[data-media-prev]");

            const nextButton =
                carousel.querySelector("[data-media-next]");

            const section =
                carousel.closest("section");

            if (!track || !slides.length) {
                return;
            }

            let currentSlide = 0;
            let startX = null;


            /* -------------------------------------------------
               DOT CONTAINER
               ------------------------------------------------- */

            const dotsContainer = section
                ? section.querySelector(".media-dots")
                : null;


            /* -------------------------------------------------
               CREATE DOTS
               ------------------------------------------------- */

            if (dotsContainer) {

                dotsContainer.innerHTML = "";

                slides.forEach((_, index) => {

                    const dot =
                        document.createElement("button");

                    dot.type = "button";
                    dot.className = "media-dot";

                    dot.setAttribute(
                        "aria-label",
                        `Go to gallery image ${index + 1}`
                    );

                    dot.addEventListener(
                        "click",
                        (event) => {

                            event.preventDefault();

                            goToSlide(index);
                        }
                    );

                    dotsContainer.appendChild(dot);
                });
            }


            const dots = dotsContainer
                ? [
                    ...dotsContainer.querySelectorAll(
                        ".media-dot"
                    )
                ]
                : [];


            /* -------------------------------------------------
               UPDATE MEDIA CAROUSEL
               ------------------------------------------------- */

            function updateMedia() {

                track.style.transform =
                    `translate3d(-${currentSlide * 100}%, 0, 0)`;

                dots.forEach((dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentSlide
                    );

                    dot.setAttribute(
                        "aria-current",
                        index === currentSlide
                            ? "true"
                            : "false"
                    );
                });
            }


            /* -------------------------------------------------
               GO TO SLIDE
               ------------------------------------------------- */

            function goToSlide(index) {

                currentSlide =
                    (index + slides.length) % slides.length;

                updateMedia();
            }


            /* -------------------------------------------------
               PREVIOUS BUTTON
               ------------------------------------------------- */

            if (previousButton) {

                previousButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        goToSlide(currentSlide - 1);
                    }
                );
            }


            /* -------------------------------------------------
               NEXT BUTTON
               ------------------------------------------------- */

            if (nextButton) {

                nextButton.addEventListener(
                    "click",
                    (event) => {

                        event.preventDefault();

                        goToSlide(currentSlide + 1);
                    }
                );
            }


            /* -------------------------------------------------
               SWIPE
               ------------------------------------------------- */

            carousel.addEventListener(
                "touchstart",
                (event) => {

                    startX =
                        event.changedTouches[0].clientX;
                },
                {
                    passive: true
                }
            );


            carousel.addEventListener(
                "touchend",
                (event) => {

                    if (startX === null) return;

                    const delta =
                        event.changedTouches[0].clientX -
                        startX;

                    if (Math.abs(delta) > 45) {

                        if (delta < 0) {
                            goToSlide(currentSlide + 1);
                        } else {
                            goToSlide(currentSlide - 1);
                        }
                    }

                    startX = null;
                },
                {
                    passive: true
                }
            );


            updateMedia();
        });
    }


    /* =====================================================
       IMAGE LIGHTBOX
       ===================================================== */

    function initLightbox() {

        const galleryItems =
            document.querySelectorAll(
                "[data-lightbox-image]"
            );

        const lightbox =
            document.querySelector(".media-lightbox");

        const lightboxImage =
            document.querySelector(
                ".media-lightbox-content img"
            );

        const lightboxClose =
            document.querySelector(".lightbox-close");


        if (!lightbox || !lightboxImage) {
            return;
        }


        galleryItems.forEach((item) => {

            item.addEventListener("click", () => {

                const src =
                    item.dataset.lightboxImage;

                if (!src) return;

                lightboxImage.src = src;

                lightbox.classList.add("open");
            });
        });


        if (lightboxClose) {

            lightboxClose.addEventListener(
                "click",
                () => {

                    lightbox.classList.remove("open");
                }
            );
        }


        lightbox.addEventListener(
            "click",
            (event) => {

                if (event.target === lightbox) {

                    lightbox.classList.remove(
                        "open"
                    );
                }
            }
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {

                    lightbox.classList.remove(
                        "open"
                    );
                }
            }
        );
    }


    /* =====================================================
       LOAD HEADER / FOOTER
       ===================================================== */

    async function loadComponent(
        elementId,
        filePath
    ) {

        const element =
            document.getElementById(elementId);

        if (!element) return;

        try {

            const response =
                await fetch(filePath);

            if (!response.ok) {

                throw new Error(
                    `Failed to load ${filePath} (${response.status})`
                );
            }

            element.innerHTML =
                await response.text();

        } catch (error) {

            console.error(error);
        }
    }


    /* =====================================================
       PATH DETECTION
       ===================================================== */

    const currentPath =
        window.location.pathname
            .replace(/\\/g, "/");

    const isInsideGamesFolder =
        currentPath.includes("/Games/");

    const componentPath =
        isInsideGamesFolder
            ? "../components/"
            : "components/";


    /* =====================================================
       LOAD COMPONENTS
       ===================================================== */

    Promise.all([
        loadComponent(
            "header",
            `${componentPath}header.html`
        ),

        loadComponent(
            "footer",
            `${componentPath}footer.html`
        )
    ]).finally(() => {

        /*
         * The mobile menu depends on the header
         * being loaded into the page first.
         */
        initMobileMenu();
    });


    /* =====================================================
       INITIALIZE PAGE FEATURES
       ===================================================== */

    initRevealAnimations();
    initGameFilters();
    initContactForm();

    initFeaturedCarousels();

    initShowcaseCarousels();

    initMediaCarousels();

    initLightbox();

});