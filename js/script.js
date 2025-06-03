$(document).ready(function() {

    // 0. PRELOADER
    // ----------------------------------------------------------------
    $(window).on('load', function() {
        if ($('#preloader').length) {
            // Da un pequeño respiro para que se vea la animación de la barra
            setTimeout(function() {
                $('#preloader').addClass('loaded');
            }, 500); // Ajusta este tiempo si es necesario, debe ser menor que la animación de la barra
            setTimeout(function() {
                $('#preloader').remove(); // Opcional: remover del DOM después de ocultar
            }, 1000); // Tiempo total = 500ms + duración transición opacity (0.5s)
        }
    });


    // 1. NAVBAR SCROLL BEHAVIOR, SMOOTH SCROLL & MOBILE MENU
    // ----------------------------------------------------------------
    // Navbar style change on scroll
    $(window).scroll(function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-scrolled");
        } else {
            $("#mainNav").removeClass("navbar-scrolled");
        }
    });

    // Smooth scrolling for navigation links
    $('a.nav-link[href*="#"]:not([href="#"]), a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - ($("#mainNav").height() -10) // Ajustar offset por altura de navbar
                }, 500, "easeInOutExpo"); // Requiere jQuery Easing si se usa "easeInOutExpo"

                // Cerrar menú móvil después de hacer clic (si está abierto)
                if ($('.navbar-collapse').hasClass('show')) {
                    $('.navbar-toggler').trigger('click');
                }
                return false;
            }
        }
    });
    // jQuery Easing (opcional, pero recomendado para animaciones más suaves)
    // Si no quieres agregar la librería jQuery Easing, cambia "easeInOutExpo" a "swing" o "linear".
    // Puedes incluir jQuery Easing desde un CDN:
   

    // Activar scrollspy para resaltar links en navbar (opcional, Bootstrap lo hace si usas su componente)
    $('body').scrollspy({ target: '#mainNav', offset: $("#mainNav").height() + 10 });


    // 2. TYPED.JS INITIALIZATION (Header tagline)
    // ----------------------------------------------------------------
    if ($('#typed-frase').length) {
        var typed = new Typed('#typed-frase', {
            strings: [
                "Creamos experiencias gastronómicas inolvidables.",
                "Servicios culinarios de alta cocina para tus eventos.",
                "Pasión y sabor en cada detalle.",
                "Desde 2000, el Chef Wily deleitando paladares."
            ],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    // 3. AOS (ANIMATE ON SCROLL) INITIALIZATION
    // ----------------------------------------------------------------
    AOS.init({
        duration: 1000, // Duración de la animación
        easing: 'ease-in-out-cubic', // Tipo de easing
        once: true, // Si la animación debe ocurrir solo una vez
        mirror: false, // Si los elementos deben animarse al salir de la vista
        offset: 120, // Offset (en px) desde el borde original del trigger
        delay: 100, // Retraso global
    });


    // 4. SCROLLREVEAL.JS INITIALIZATION
    // ----------------------------------------------------------------
    // Configuración general para ScrollReveal
    const sr = ScrollReveal({
        origin: 'bottom', // 'bottom', 'top', 'left', 'right'
        distance: '60px',
        duration: 1200,
        delay: 200,
        opacity: 0,
        scale: 0.9,
        easing: 'cubic-bezier(0.5, 0, 0, 1)', // Easing suave
        reset: false, // Animaciones se repiten al scrollear arriba/abajo (false para una vez)
        mobile: true // Habilitado en móviles
    });

    // Aplicar a elementos específicos
    sr.reveal('.reveal-item'); // Para la sección "Sobre Nosotros"
    sr.reveal('.section-heading', { delay: 200, origin: 'top' });
    sr.reveal('hr.divider', { delay: 300, scale: 0.5 });
    sr.reveal('.masthead #header-logo', { delay: 400, origin: 'top', distance: '30px', scale: 1 });
    sr.reveal('.masthead #brand-name-header', { delay: 500, origin: 'top', distance: '30px' });
    sr.reveal('.masthead #typed-text-container', { delay: 600 });
    sr.reveal('.masthead .btn-gelatina', { delay: 700, scale: 0.8 });

    // Revelar elementos de "Sobre Nosotros" con stagger
    ScrollReveal().reveal('#sobre-nosotros .row', { interval: 300, origin: 'left' });
    ScrollReveal().reveal('#sobre-nosotros .image-content img', { origin: 'right', delay: 400, scale: 1});
    ScrollReveal().reveal('#sobre-nosotros .text-content', { origin: 'left', delay: 200 });


    // 5. SPLITTING.JS + GSAP FOR TEXT ANIMATIONS (Ejemplo: Service Titles)
    // ----------------------------------------------------------------
    Splitting(); // Divide el texto con data-splitting

    // Animación para títulos de servicios (requiere GSAP)
    // Asegúrate que los títulos de servicio tengan la clase 'service-title' y data-splitting
    // Ejemplo de animación para .service-title que tiene data-splitting="chars"
    // y .char (hijos) son creados por Splitting.js
    // La clase CSS 'service-title .char' ya tiene opacity:0 y transform inicial

    // Este es un ejemplo de cómo se podría usar con GSAP y ScrollTrigger
    // si quieres animar al hacer scroll hacia ellos
    gsap.utils.toArray('.service-title[data-splitting]').forEach(title => {
        const chars = $(title).find('.char'); // jQuery para seleccionar los chars
        gsap.fromTo(chars,
            { // From
                opacity: 0,
                y: 30, // Mover desde abajo
                scale: 0.8,
                skewX: "15deg"
            },
            { // To
                opacity: 1,
                y: 0,
                scale: 1,
                skewX: "0deg",
                duration: 0.6,
                stagger: 0.04, // Retraso entre cada letra
                ease: "power2.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%", // Iniciar animación cuando el 85% superior del título esté en vista
                    toggleActions: "play none none none", // Play una vez
                    // markers: true // Descomentar para depurar ScrollTrigger
                }
            }
        );
    });

    // Animación para la frase destacada con Splitting si se prefiere sobre Typed.js para el header
    // (Actualmente el header usa Typed.js, esto es un ejemplo alternativo)
    /*
    if ($('#frase-splitting').length) {
        const fraseHeader = Splitting({ target: '#frase-splitting', by: 'chars' });
        gsap.from(fraseHeader[0].chars, {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            y: 80,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back.out(1.7)",
            stagger: 0.03,
            delay: 1 // Un retraso después de la carga de la página
        });
    }
    */


    // 6. SWIPER.JS (TESTIMONIALS SLIDER) INITIALIZATION
    // ----------------------------------------------------------------
    if ($('.testimonial-slider').length) {
        new Swiper('.testimonial-slider', {
            loop: true,
            speed: 800, // Velocidad de transición
            autoplay: {
                delay: 5000, // Tiempo entre slides
                disableOnInteraction: false,
            },
            slidesPerView: 1,
            spaceBetween: 30, // Espacio entre slides
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: { // Configuración responsiva
                768: { // Para pantallas mayores a 768px
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                // 992: { // Para pantallas mayores a 992px
                //     slidesPerView: 2, // Puedes mostrar 2 o 3 si el diseño lo permite
                //     spaceBetween: 50,
                // }
            }
        });
    }


    // 7. CONTACT FORM VALIDATION (jQuery)
    // ----------------------------------------------------------------
    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Prevenir envío por defecto

        var form = $(this);
        var valid = true;
        var successMessage = "¡Tu mensaje ha sido enviado! Nos pondremos en contacto pronto.";
        var errorMessage = "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.";

        // Limpiar mensajes de error previos
        form.find('.help-block.text-danger').remove();
        form.find('.form-group').removeClass('has-error'); // Clase para resaltar error
        $('#success').html('');


        // Validación de campos
        form.find('input[required], textarea[required], select[required]').each(function() {
            var field = $(this);
            var fieldName = field.attr('placeholder') || field.attr('id');
            if (field.is('select') && (field.val() === null || field.val() === "")) {
                 if (field.attr('id') === 'eventType') fieldName = "Tipo de Evento";
            }

            if ($.trim(field.val()) === '') {
                valid = false;
                var message = field.data('validation-required-message') || 'Este campo es obligatorio.';
                field.closest('.form-group').addClass('has-error');
                field.closest('.form-group').append('<p class="help-block text-danger mt-1">' + message.replace('*', fieldName) + '</p>');
            } else if (field.attr('type') === 'email') {
                var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (!emailRegex.test($.trim(field.val()))) {
                    valid = false;
                    var message = field.data('validation-email-message') || 'Por favor ingresa un email válido.';
                    field.closest('.form-group').addClass('has-error');
                    field.closest('.form-group').append('<p class="help-block text-danger mt-1">' + message + '</p>');
                }
            }
            // Puedes agregar más validaciones aquí (teléfono, etc.)
        });

        if (valid) {
            // Aquí iría la lógica de envío del formulario (AJAX)
            // Por ahora, solo mostraremos un mensaje de éxito simulado
            // Ejemplo con AJAX (necesitarías un endpoint de servidor):
            /*
            var formData = $(this).serialize();
            $.ajax({
                url: "tu_endpoint_de_envio.php", // Reemplaza con tu URL de backend
                type: "POST",
                data: formData,
                success: function() {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='btn-close' data-bs-dismiss='alert' aria-hidden='true'></button>");
                    $('#success > .alert-success').append("<strong>" + successMessage + "</strong>");
                    $('#success > .alert-success').append('</div>');
                    form[0].reset(); // Limpiar el formulario
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='btn-close' data-bs-dismiss='alert' aria-hidden='true'></button>");
                    $('#success > .alert-danger').append("<strong>" + errorMessage + "</strong>");
                    $('#success > .alert-danger').append('</div>');
                },
                complete: function() {
                    setTimeout(function() {
                        $('#success').html('');
                    }, 5000);
                }
            });
            */

            // Simulación de éxito sin AJAX:
            $('#success').html("<div class='alert alert-success mt-3'>");
            $('#success > .alert-success').html("<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>");
            $('#success > .alert-success').append("<strong>" + successMessage + "</strong>");
            $('#success > .alert-success').append('</div>');
            form[0].reset(); // Limpiar el formulario

            setTimeout(function() { // Ocultar mensaje después de unos segundos
                $('#success').html('');
            }, 7000);

        } else {
            // Si no es válido, el scroll podría ir al primer error
            // $('html, body').animate({
            //     scrollTop: ($('.has-error').first().offset().top - 100)
            // }, 500);
        }
    });


    // 8. FOOTER - CURRENT YEAR
    // ----------------------------------------------------------------
    $('#currentYear').text(new Date().getFullYear());


    // 9. LIGHTBOX2 OPTIONS (Opcional, para personalizar)
    // ----------------------------------------------------------------
    if (typeof lightbox !== 'undefined') { // Chequear si Lightbox está cargado
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true, // Si la galería es cíclica
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'albumLabel': "Imagen %1 de %2" // Personalizar etiqueta del álbum
        });
    }

}); // Fin de $(document).ready()

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_i6ulsvb';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Email enviado';
      alert('Enviado te responderemos pronto gracias por tu preferecia');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});