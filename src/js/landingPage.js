let quoteText
let changeThemeBtns
let chagneThemeBtnColor
let quoteAthor
let quoteAuthor
let apostropheIcon
let headingBox
let technologiesBox
let carouselBoxes

//Header text animation properties
let index = 1
let speed = 40
let quote = `Najlepszym dowodem na to, że coś jest możliwe, jest fakt, że ktoś już tego
dokonał.`
let quoteAuthorText = `— Ralph Waldo Emerson`
let timeout

// Carousel properties
let isDragging = false
let startX = 0
let endX = 0
let move

// Contact Form
let contactSendBtn
let emailInput
let nameInput
let msgInput
let newArr

const main = () => {
	prepareDOMElements2()
	prepareDOMEvents2()
}

const prepareDOMElements2 = () => {
	quoteText = document.querySelector('.header__quote')
	quoteAuthor = document.querySelector('.header__qoute-author')
	apostropheIcon = document.querySelector('.fa-quote-left')
	headingBox = document.querySelector('.header__heading-box')
	technologiesBox = document.querySelector('.about__slider')
	carouselBoxes = document.querySelectorAll('.about__slider-box')
	contactSendBtn = document.querySelector('.contact__btn')
	emailInput = document.getElementById('email')
	nameInput = document.getElementById('name')
	msgInput = document.getElementById('msg')
	console.log('jestem tutaj tez')
}

const prepareDOMEvents2 = () => {
	console.log('jestem tutaj')
	carouselBoxes.forEach(box => {
		// Desktop
		box.addEventListener('mouseenter', () => {
			carouselBoxes.forEach(box => {
				box.style.animationPlayState = 'paused'
			})
		})

		box.addEventListener('mouseleave', () => {
			carouselBoxes.forEach(box => {
				box.style.animationPlayState = 'running'
			})
		})

		// Mobile
		box.addEventListener('touchstart', () => {
			carouselBoxes.forEach(box => {
				box.style.animationPlayState = 'paused'
			})
		})
		box.addEventListener('touchend', () => {
			carouselBoxes.forEach(box => {
				box.style.animationPlayState = 'running'
			})
		})
	})

	// Carousel checking if the cursor is on an element
	technologiesBox.addEventListener('mouseleave', () => {
		isDragging = false
		technologiesBox.style.cursor = 'grab'
	})

	// Carousel calculating starting point
	technologiesBox.addEventListener('mousedown', e => {
		isDragging = true
		startX = e.clientX
		technologiesBox.style.cursor = 'grabbing'
	})
	technologiesBox.addEventListener('touchstart', e => {
		startX = e.touches[0].clientX
	})

	// Carousel checking if its grabbing
	technologiesBox.addEventListener('mousemove', () => {
		if (isDragging == true) return
		technologiesBox.style.cursor = 'grab'
	})

	// Carousel calculating ending point and moving
	technologiesBox.addEventListener('mouseup', e => {
		endX = e.clientX
		move = endX - startX
		technologiesBox.style.cursor = 'grab'
		handleCarousel()
	})
	technologiesBox.addEventListener('touchend', e => {
		endX = e.changedTouches[0].clientX
		move = endX - startX
		handleCarousel()
	})

	contactSendBtn.addEventListener('click', handleContactForm)

	contactSendBtn.addEventListener('click', () => {
		console.log('Klikam')
	})
	writingAnimation()
}

const handleContactForm = () => {
	const msgStatus = document.querySelector('.contact__msg-status')

	if (document.location.search === '?mail_status=sent') {
		msgStatus.classList.add('success')
		msgStatus.textContent = 'Wiadomość wysłana!'

		setTimeout(() => {
			msgStatus.classList.remove('success')
		}, 3000)
	}

	if (document.location.search === '?mail_status=error') {
		msgStatus.classList.add('error')
		msgStatus.textContent = 'Wystąpił błąd.'

		setTimeout(() => {
			msgStatus.classList.remove('error')
		}, 3000)
	}

	const showError = (input, msg) => {
		const formBox = input.parentElement
		const errorText = formBox.querySelector('.contact__form-error')
		errorText.textContent = msg
		formBox.classList.add('contact__form-error-input')
	}

	const clearError = input => {
		const formBox = input.parentElement
		errorText = formBox.querySelector('.contact__form-error')

		errorText.textContent = ''
		formBox.classList.remove('contact__form-error-input')
	}

	const checkMail = () => {
		const re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

		if (re.test(email.value)) {
			clearError(email)
		} else {
			showError(email, 'E-mail jest niepoprawny')
		}
	}

	const checkForm = input => {
		input.forEach(el => {
			if (el.value === '') {
				showError(el, el.placeholder)
			} else {
				clearError(el)
			}
		})
	}
	checkForm([emailInput, msgInput, nameInput])
	checkMail()
}

const writingAnimation = () => {
	if (index >= quote.length) {
		let AuthorIndex = index - quote.length
		quoteAuthor.innerHTML = quoteAuthorText.slice(0, AuthorIndex)
	} else {
		quoteText.innerHTML = quote.slice(0, index)
	}

	if (index <= quote.length + quoteAuthorText.length) {
		index++
		timeout = setTimeout(writingAnimation, speed)
	}
}

const handleCarousel = e => {
	carouselBoxes.forEach(box => {
		box.style.transform = `translateX(${move}px)`
	})
}

document.addEventListener('DOMContentLoaded', main)
