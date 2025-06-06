document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav'); // Selects the nav inside the header

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            // This will add or remove the class "active" on the <nav> element
            nav.classList.toggle('active'); 
            
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // --- Active Navigation Link Highlighting ---
    // This code correctly highlights the current page in your menu.
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('header nav ul li a');
    let anActiveLinkWasFound = false;

    menuItems.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
            anActiveLinkWasFound = true;
        } else {
            link.classList.remove('active');
        }
    });
    
    // Fallback for the homepage (index.html)
    if (!anActiveLinkWasFound) {
        const homeLink = document.querySelector('a[href="index.html"]');
        if (homeLink && (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html'))) {
            homeLink.classList.add('active');
        }
    }


    // --- Initialize Portfolio Sliders (SwiperJS) ---
    // This code makes your image sliders work.
    if (typeof Swiper !== 'undefined') {
        const portfolioSliders = document.querySelectorAll('.swiper-container.portfolio-slider');
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
    }


    // --- Copyright Year ---
    // This code automatically updates the year in your footer.
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
