(function($) {
    "use strict";

    // Preloader - مطمئن می‌شویم که صفحه قبل از حذف انیمیشن بارگذاری، کاملاً لود شده است.
    $(window).on('load', function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    });

    // این تابع اطمینان می‌دهد که کد jQuery تنها پس از بارگذاری کامل DOM اجرا می‌شود.
    $(document).ready(function() {

        // ***** Owl Carousel Initialization for Services Section ********
        // این بخش اصلی‌ترین تنظیم برای کاروسل است.
        // با قرار دادن آن در $(document).ready، اطمینان حاصل می‌شود که عناصر DOM در دسترس هستند.
        $('.owl-carousel').owlCarousel({
            loop: true, // اسلایدر به صورت حلقه ای تکرار می شود
            margin: 30, // فاصله بین آیتم ها
            nav: true, // نمایش دکمه های ناوبری (فلش ها)
            dots: true, // نمایش نشانگرهای صفحه‌بندی (نقطه‌ها). این جایگزین 'pagination' شده است.
            autoplay: true, // شروع خودکار اسلایدها
            autoplayTimeout: 3000, // زمان بین هر اسلاید (3 ثانیه)
            autoplayHoverPause: true, // توقف خودکار هنگام هاور موس
            responsive: { // تنظیمات ریسپانسیو برای تعداد آیتم ها در اندازه های مختلف صفحه
                0: { // برای صفحه نمایش با عرض 0 تا 599 پیکسل
                    items: 1
                },
                600: { // برای صفحه نمایش با عرض 600 تا 999 پیکسل
                    items: 2
                },
                1000: { // برای صفحه نمایش با عرض 1000 پیکسل و بالاتر
                    items: 3
                }
            }
        });

        // Header sticky (هدر پس از اسکرول ثابت می‌شود)
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            var box = $(".header-text").height();
            var header = $("header").height();

            if (scroll >= box - header) {
                $("header").addClass("background-header");
            } else {
                $("header").removeClass("background-header");
            }
        });

        // Mobile menu dropdown (منوی کشویی برای دستگاه‌های موبایل)
        $(".submenu").on("click", function() {
            var width = $(window).width();
            if (width < 992) {
                $(this).find("ul").toggleClass("active");
            }
        });

        // Menu Dropdown Toggle (فعال/غیرفعال کردن منوی همبرگری)
        if ($(".menu-trigger").length) {
            $(".menu-trigger").on("click", function() {
                $(this).toggleClass("active");
                $(".header-area .nav").slideToggle(200);
            });
        }

        // Menu elevator animation (اسکرول نرم به بخش‌های مختلف با کلیک روی لینک‌های منو)
        $('a[href*="#"]:not([href="#"])').on("click", function() {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    var width = $(window).width();
                    if (width < 991) {
                        $(".menu-trigger").removeClass("active");
                        $(".header-area .nav").slideUp(200);
                    }
                    $('html,body').animate({
                            scrollTop: target.offset().top - 80 // 80 پیکسل از بالا فاصله می‌گیرد
                        },
                        700
                    );
                    return false;
                }
            }
        });

        // Activation of scroll spy for active menu items (فعال کردن آیتم‌های منو بر اساس اسکرول)
        // این بخش نیاز به کمی بازبینی داشت تا با ساختار قالب بهتر کار کند.
        $(document).on("scroll", onScroll); // تابع onScroll را فقط یک بار فراخوانی می‌کنیم

        function onScroll(event) {
            var scrollPos = $(document).scrollTop();
            $('.nav a').each(function() {
                var currLink = $(this);
                try {
                    var refElement = $(currLink.attr("href"));
                    // مطمئن شوید که refElement یک عنصر واقعی است و نه یک لینک جاوااسکریپت
                    if (refElement.length && refElement.offset().top <= scrollPos + 80 && refElement.offset().top + refElement.height() > scrollPos + 80) {
                        $('.nav ul li a').removeClass("active");
                        currLink.addClass("active");
                    } else {
                        currLink.removeClass("active");
                    }
                } catch (e) {
                    // console.log("Error in onScroll:", e); // برای اشکال‌زدایی اگر لازم شد
                }
            });
        }

        // Accordion (بخش سوالات متداول - FAQ)
        // اطمینان حاصل می‌کنیم که این کد Accordion به درستی کار کند.
        // این Object قبلاً تعریف شده بود، فقط اطمینان از اجرای آن لازم است.
        if($('.accordions').length){
            const Accordion = {
                settings: {
                    first_expanded: false,
                    toggle: false
                },
                openAccordion: function(toggle, content) {
                    if (content.children.length) {
                        toggle.classList.add("is-open");
                        let final_height = Math.floor(content.children[0].offsetHeight);
                        content.style.height = final_height + "px";
                    }
                },
                closeAccordion: function(toggle, content) {
                    toggle.classList.remove("is-open");
                    content.style.height = 0;
                },
                init: function(el) {
                    const _this = this;
                    let is_first_expanded = _this.settings.first_expanded;
                    if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
                    let is_toggle = _this.settings.toggle;
                    if (el.classList.contains("is-toggle")) is_toggle = true;

                    const sections = el.getElementsByClassName("accordion");
                    const all_toggles = el.getElementsByClassName("accordion-head");
                    const all_contents = el.getElementsByClassName("accordion-body");
                    for (let i = 0; i < sections.length; i++) {
                        const section = sections[i];
                        const toggle = all_toggles[i];
                        const content = all_contents[i];

                        toggle.addEventListener("click", function(e) {
                            if (!is_toggle) {
                                for (let a = 0; a < all_contents.length; a++) {
                                    _this.closeAccordion(all_toggles[a], all_contents[a]);
                                }
                                _this.openAccordion(toggle, content);
                            } else {
                                if (toggle.classList.contains("is-open")) {
                                    _this.closeAccordion(toggle, content);
                                } else {
                                    _this.openAccordion(toggle, content);
                                }
                            }
                        });

                        if (i === 0 && is_first_expanded) {
                            _this.openAccordion(toggle, content);
                        }
                    }
                }
            };

            // Initiate all instances on the page
            const accordions = document.getElementsByClassName("accordions");
            for (let i = 0; i < accordions.length; i++) {
                Accordion.init(accordions[i]);
            }
        }


        // Scroll animation init (فعال‌سازی ScrollReveal برای انیمیشن‌های ورود عناصر)
        // مطمئن شوید که scrollreveal.min.js به درستی بارگذاری شده است.
        window.sr = new ScrollReveal();

        sr.reveal('.left-text', {
            duration: 1000,
            delay: 200,
            distance: '30px',
            origin: 'left',
            easing: 'ease-out'
        });

        sr.reveal('.right-image', {
            duration: 1000,
            delay: 200,
            distance: '30px',
            origin: 'right',
            easing: 'ease-out'
        });

        // این کلاس برای کادرهای جدیدی که اضافه کردیم هم کاربرد دارد.
        sr.reveal('.feature-item, .info-box, .item-box-hover', {
            duration: 1000,
            delay: 200,
            distance: '30px',
            origin: 'bottom',
            easing: 'ease-out'
        });


        // Home seperator (افکت پارالاکس یا ثابت ماندن تصویر پس‌زمینه)
        if ($(".home-seperator").length) {
            $(".home-seperator .left-item, .home-seperator .right-item").imgfix();
        }

        // Home number counterup (انیمیشن شمارش اعداد)
        if ($(".count-item").length) {
            $(".count-item strong").counterUp({
                delay: 10,
                time: 1000
            });
        }
    }); // پایان $(document).ready(function() { ... });


    // Page loading animation (انیمیشن بارگذاری اولیه صفحه)
    // این بخش معمولا خارج از ready function است تا بلافاصله اجرا شود.
    // اما برای اطمینان از سازگاری با قالب، آن را در $(window).on('load') قرار می‌دهیم.
    $(window).on("load", function() {
        if ($(".cover").length) {
            $(".cover").parallax({
                imageSrc: $(".cover").data("image"),
                zIndex: "1"
            });
        }
        // Fade out preloader after page load
        $("#preloader").animate({
            opacity: "0"
        }, 600, function() {
            setTimeout(function() {
                $("#preloader").css("visibility", "hidden").fadeOut();
            }, 300);
        });
    });

})(window.jQuery); // پایان IIFE و اطمینان از استفاده از jQuery