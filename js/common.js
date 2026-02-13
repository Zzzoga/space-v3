
// Doc done scripts
document.addEventListener('DOMContentLoaded', () => {
	// Smooth scroll when link clicked
	const $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 100
		}, 800);
		return false;
	});

	// Phone mask
	function maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elems = document.querySelectorAll(selector);
	
		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			console.log(template);
			let i = 0,
				newValue = template.replace(/[_\d]/g, function (a) {
					return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
				});
			i = newValue.indexOf("_");
			if (i !== -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				function (a) {
					return "\\d{1," + a.length + "}";
				}).replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type === "blur" && this.value.length < 5) {
				this.value = "";
			}
	
		}
	
		for (const elem of elems) {
			elem.addEventListener("input", mask);
			elem.addEventListener("focus", mask);
			elem.addEventListener("blur", mask);
		}
		
	}
		
	maskPhone('input[type="tel"]')

	// TEXT INPUT VALIDATE
	document.querySelectorAll('input[name="name"]').forEach(input => {
		input.addEventListener('keydown', function(e){
		  if( e.key.match(/[0-9]/) ) return e.preventDefault();
		}); 
		
		input.addEventListener('input', function(e){
		  input.value = input.value.replace(/[0-9]/g, "");
		});
	})

	// FIXED HEADER ON SCROLL
	document.addEventListener('scroll', e => {
		if(!document.querySelector('header').classList.contains('custom')) {
			if (this.pageYOffset > 10) {
				document.querySelector('header').classList.add('fixed')
			} else {
				document.querySelector('header').classList.remove('fixed')
			}
		}
	})

	// DIRECTION TAB
	const tabs = document.querySelectorAll('.direction__tab');
	const bodies = document.querySelectorAll('.direction__body');

	tabs.forEach(tab => {
		tab.addEventListener('click', function () {
		const currentTab = this.dataset.tab;

		// Убираем active у всех табов
		tabs.forEach(item => item.classList.remove('active'));
		// Добавляем active текущему табу
		this.classList.add('active');

		// Скрываем все контенты
		bodies.forEach(body => {
			body.classList.remove('active');

			// Останавливаем видео при скрытии
			const video = body.querySelector('video');
			if (video) video.pause();
		});

		// Показываем нужный контент
		const activeBody = document.querySelector(
			`.direction__body[data-tab="${currentTab}"]`
		);

		if (activeBody) {
			activeBody.classList.add('active');

			// Запускаем видео активного таба
			const video = activeBody.querySelector('video');
			if (video) video.play();
		}
		});
	});
	
	// MODAL NAV
	// document.querySelector('.burger').addEventListener('click', e => {
	// 	e.preventDefault()
	// 	if (!e.target.closest('.burger').classList.contains('active')) {
	// 		e.target.closest('.burger').classList.add('active')
	// 		document.querySelector('.modal__nav').classList.add('active')
	// 		document.querySelector('.modal__nav').classList.add('visible')
	// 		document.querySelector('body').classList.add('hidden')
	// 		document.querySelector('header').classList.add('nav__active')
	// 	} else {
	// 		e.target.closest('.burger').classList.remove('active')
	// 		document.querySelector('.modal__nav').classList.remove('active')
	// 		document.querySelector('.modal__nav').classList.remove('visible')
	// 		document.querySelector('body').classList.remove('hidden')
	// 		document.querySelector('header').classList.remove('nav__active')
	// 	}
	// })

	// SHOW/HIDE MODAL
	function showModal(item, modal) {
		document.querySelectorAll(item).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault()
				document.querySelector(modal).classList.add('active')
				document.querySelector('body').classList.add('hidden')
			})
		})
	}

	function hideModal(item, modal) {
		document.querySelectorAll(item).forEach(item => {
			item.addEventListener('click', e => {
				e.preventDefault()
				document.querySelector(modal).classList.remove('active')
				document.querySelector('body').classList.remove('hidden')
			})
		})
	}

	// showModal('.open__call', '.modal__call')
	// hideModal('.modal__call .modal__overlay', '.modal__call')
	// hideModal('.modal__call .modal__close', '.modal__call')


})


