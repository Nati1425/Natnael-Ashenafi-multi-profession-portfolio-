document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- Active Navigation Link Highlighting ---
    const currentLocation = window.location.href;
    const menuItem = document.querySelectorAll('header nav ul li a');
    let anActiveLinkWasFound = false;

    menuItem.forEach(link => {
        let cleanCurrentLocation = currentLocation.replace(/\/index\.html$/, '').replace(/\/$/, '').split('#')[0];
        let cleanLinkHref = link.href.replace(/\/index\.html$/, '').replace(/\/$/, '').split('#')[0];

        if (cleanLinkHref === cleanCurrentLocation) {
            link.classList.add('active');
            anActiveLinkWasFound = true;
        } else {
            link.classList.remove('active');
        }
    });

    if (!anActiveLinkWasFound) {
        const pathName = window.location.pathname;
        if (pathName === '/' || pathName.endsWith('/index.html') || pathName.endsWith('/')) {
            const homeLink = document.querySelector('header nav ul li a[href="index.html"], header nav ul li a[href="./index.html"], header nav ul li a[href="/"]');
            if (homeLink) {
                let cleanHomeLinkHref = homeLink.href.replace(/\/index\.html$/, '').replace(/\/$/, '').split('#')[0];
                let cleanCurrentLoc = window.location.href.replace(/\/index\.html$/, '').replace(/\/$/, '').split('#')[0];
                if (cleanHomeLinkHref === cleanCurrentLoc || (cleanCurrentLoc.endsWith('/') && cleanHomeLinkHref === cleanCurrentLoc.slice(0,-1)) ) {
                    homeLink.classList.add('active');
                }
            }
        }
    }

    // --- Initialize Portfolio Sliders (SwiperJS) ---
    const portfolioSliders = document.querySelectorAll('.swiper-container.portfolio-slider');
    if (portfolioSliders.length > 0) {
        if (typeof Swiper !== 'undefined') {
            portfolioSliders.forEach(sliderElement => {
                new Swiper(sliderElement, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    grabCursor: true,
                    loop: false,
                    pagination: {
                        el: sliderElement.querySelector('.swiper-pagination'),
                        clickable: true,
                    },
                    navigation: {
                        nextEl: sliderElement.querySelector('.swiper-button-next'),
                        prevEl: sliderElement.querySelector('.swiper-button-prev'),
                    },
                    breakpoints: {
                        600: { slidesPerView: 2, spaceBetween: 20 },
                        992: { slidesPerView: 3, spaceBetween: 30 }
                    }
                });
            });
        } else {
            console.warn('SwiperJS not loaded or defined when attempting to initialize sliders. Sliders may not work.');
        }
    }

    // --- Google Form Submission Handling ---
    // THIS ENTIRE SECTION HAS BEEN REMOVED as it's not needed for basic Formspree submission.
    // If you want custom on-page feedback with Formspree (AJAX), you'd add new JavaScript here.
    // For now, the form will submit directly and Formspree handles the 'thank you' redirect.

    // Example of how you might add AJAX for Formspree later (OPTIONAL - for on-page feedback):
    /*
    const contactFormSpree = document.getElementById('contactFormSpree');
    const formMessageSpree = document.getElementById('form-message-spree'); // Assuming you have a <p> tag with this ID

    if (contactFormSpree && formMessageSpree) {
        contactFormSpree.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default redirect

            const formData = new FormData(contactFormSpree);
            const submitButton = contactFormSpree.querySelector('button[type="submit"]');

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
            }
            formMessageSpree.textContent = ''; // Clear previous messages
            formMessageSpree.style.color = 'inherit';


            fetch(contactFormSpree.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formMessageSpree.textContent = 'Thank you! Your message has been sent.';
                    formMessageSpree.style.color = 'green';
                    contactFormSpree.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formMessageSpree.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formMessageSpree.textContent = 'Oops! There was a problem submitting your form.';
                        }
                        formMessageSpree.style.color = 'red';
                    })
                }
            }).catch(error => {
                formMessageSpree.textContent = 'Oops! There was a network error.';
                formMessageSpree.style.color = 'red';
            }).finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }
            });
        });
    }
    */


    // --- Copyright Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});