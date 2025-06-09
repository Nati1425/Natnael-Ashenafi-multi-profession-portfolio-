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
    const menuItems = document.querySelectorAll('header nav ul li a');
    let anActiveLinkWasFound = false;

    menuItems.forEach(link => {
        // More robust check for active link
        if (link.href === currentLocation || (link.href.endsWith('index.html') && (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')))) {
            if (anActiveLinkWasFound && !link.href.endsWith('index.html')) {
                // if a more specific link was already found, don't mark home as active
            } else {
                // Clear previously active links to handle the homepage case correctly
                document.querySelectorAll('header nav ul li a.active').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                anActiveLinkWasFound = true;
            }
        } else {
            link.classList.remove('active');
        }
    });
    
    // Final check if no link was found, default to home if on root
    if (!anActiveLinkWasFound && (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html'))) {
        const homeLink = document.querySelector('a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }


    // --- Initialize Portfolio Sliders (SwiperJS) ---
    if (typeof Swiper !== 'undefined') {
        const portfolioSliders = document.querySelectorAll('.swiper-container.portfolio-slider');
        portfolioSliders.forEach(sliderElement => {
            new Swiper(sliderElement, {
                slidesPerView: 1,
                spaceBetween: 30, // Increased space
                grabCursor: true,
                loop: false, // Set to true if you want it to loop infinitely
                pagination: {
                    el: sliderElement.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                navigation: {
                    nextEl: sliderElement.querySelector('.swiper-button-next'),
                    prevEl: sliderElement.querySelector('.swiper-button-prev'),
                },
                breakpoints: {
                    600: { slidesPerView: 2 },
                    992: { slidesPerView: 3 }
                }
            });
        });
    }


    // --- Copyright Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
