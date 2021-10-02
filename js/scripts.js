/* Template: Blink SaaS App Website Bootstrap HTML Template
   Description: Custom JS file
*/

const API_URL = 'http://localhost:3333';

const leadForm = document.getElementById('leadForm');

const nome = document.getElementById('name');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const cnpj = document.getElementById('cnpj');
const valorConta = document.getElementById('valorConta');
const submitForm = document.getElementById('submitBtn');

const eraseLetters = value => value.replace(/\D/g, '');

function switchCanSubmitStatus() {
  submitForm.disabled = !submitForm.disabled;
};

if (leadForm) {
  leadForm.addEventListener('submit', async e => {
    e.preventDefault();

    if (!isValidForm()) return;

    try {
      await fetch(`${API_URL}/leads`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: nome.value,
          email: email.value,
          telefone: telefone.value,
          cnpj: cnpj.value,
          valorConta: valorConta.value
        })
      });
      cleanLeadForm();
      $('html, body').animate({ scrollTop: 0 }, 'fast');
      $('body').addClass('stop-scrolling')
      document.getElementsByClassName("popup")[0].classList.add("active");
    } catch(err) {
      console.error(err)
    }

  });
}


function isValidForm() {
  const formErrors = [];

  if (nome.value.length < 5) {
    formErrors.push('O nome deve conter ao menos 4 carateres.');
    nome.classList.add('red-border');
    console.log(nome.classList)
  }

  if (telefone.value.length < 13) {
    formErrors.push('O telefone deve conter ddd + 8 ou 9 caracteres.');
    telefone.classList.add('red-border');
  }
  
  const cnpjLength = cnpj.value.length;
  if (cnpjLength > 0 && cnpjLength < 17) {
    formErrors.push('O CNPJ deve conter 17 caracteres.');
    cnpj.classList.add('red-border');
  }
  
  cleanInputErrors();
  showErrors(formErrors);
  return formErrors.length === 0;
}

function cleanSpecialChar(ref) {
  ref.value = ref.value.replace(/[^a-zA-Z ]/g, "");
}

function cleanInputErrors() {
  const errorsBox = document.getElementById("errors-box");
  errorsBox.innerHTML = '';

  nome.classList.remove("red-border");
  telefone.classList.remove("red-border");
  cnpj.classList.remove("red-border");
}

function showErrors(errors = []) {

  if (errors.length === 0) return;

  const errorsBox = document.getElementById("errors-box");

  for (const errText of errors) {
    var errDiv = document.createElement('div');
    errDiv.innerHTML = errText;
    errDiv.className = 'errorText';
    errorsBox.appendChild(errDiv);
  }
}



function cleanLeadForm() {
  nome.value = '';
  email.value = '';
  telefone.value = '';
  cnpj.value = '';
  valorConta.value = '';
} 

function maskCNPJ(ref) {
  ref.value = eraseLetters(ref.value)
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2');
};

function maskPhone(ref) {
  const cleanString = eraseLetters(ref.value);

  if (!cleanString) return ref.value = '';

  const stringMasked = '(' + cleanString.replace(/(\d{2})(\d)/, '$1)$2');

  const fixPhoneLen = 10;
  return ref.value = cleanString.length <= fixPhoneLen ? 
    stringMasked.replace(/(\d{4})(\d)/, '$1-$2') :
    stringMasked.replace(/(\d{5})(\d)/, '$1-$2');
};

const dismissPopButton = document.getElementById("dismiss-popup-btn");

if (dismissPopButton) {
  dismissPopButton.addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
    window.location = 'index.html';
  });
}

(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Details Lightbox - Magnific Popup */
    $('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
	

	/* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 50,
        slidesPerView: 5,
		breakpoints: {
            // when window is <= 575px
            575: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 767px
            767: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 991px
            991: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1199px
            1199: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });
    

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 5000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 2,
		spaceBetween: 40,
        breakpoints: {
            // when window is <= 991px
            991: {
                slidesPerView: 1
            }
        }
    });


    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);