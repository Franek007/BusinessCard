let burgerBtn
let navBar
let sideBar
let dropDownList
let firstBurgerBar
let caretIcon
let dropDownItems
let quoteText
let changeThemeBtn
let chagneThemeBtnColor
let quoteAthor
let quoteAuthor
let apostropheIcon
let headingBox
let technologiesBox
let carouselBoxes

//Header text animation properties
let index = 1
let speed = 50
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

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	burgerBtn = document.querySelector('.burgerBtn')
	navBar = document.querySelector('.nav')
	navSideBar = document.querySelector('.nav__sidebar')
	firstBurgerBar = document.querySelector('.firstBar')
	dropDownList = document.querySelector('.nav__drop-down')
	caretIcon = document.querySelector('.nav__drop-down-icon')
	dropDownItems = document.querySelectorAll('.nav__drop-down-item')
	changeThemeBtn = document.querySelector('.nav__appearance-toggle')
	chagneThemeBtnColor = document.querySelector('.nav__appearance-toggle--active')
	quoteText = document.querySelector('.header__quote')
	quoteAuthor = document.querySelector('.header__qoute-author')
	apostropheIcon = document.querySelector('.fa-quote-left')
	headingBox = document.querySelector('.header__heading-box')
	technologiesBox = document.querySelector('.about__slider')
	carouselBoxes = document.querySelectorAll('.about__slider-box')
	contactSendBtn = document.querySelector('.contact__btn')
	emailInput = document.getElementById('#email')
	console.log()
}

const prepareDOMEvents = () => {
	burgerBtn.addEventListener('click', handleMobileNav)
	dropDownList.addEventListener('click', handleDropDownMobileNav)
	changeThemeBtn.addEventListener('click', handleThemeBtn)
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
		console.log('test')
	})

	// Carousel calculating starting point
	technologiesBox.addEventListener('mousedown', e => {
		isDragging = true
		startX = e.clientX
		technologiesBox.style.cursor = 'grabbing'
	})
	technologiesBox.addEventListener('touchstart', e => {
		startX = e.touches[0].clientX
		console.log(`To jes startX ${startX}`)
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

		console.log(move)

		technologiesBox.style.cursor = 'grab'
		handleCarousel()
	})
	technologiesBox.addEventListener('touchend', e => {
		endX = e.changedTouches[0].clientX
		move = endX - startX
		console.log(move)
		handleCarousel()
	})

	contactSendBtn.addEventListener('click', handleContactForm)
	writingAnimation()
}

const handleContactForm = () => {
	const msgStatus = document.querySelector('.contact__msg-status')

	console.log(document.location.search)

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

	const showError = msg => {
		msgStatus.textContent = msg
	}

	const clearError = () => {
		msgStatus.textContent = ''
	}

	const checkMail = params => {
		const re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/

		if (re.test(email.value)) {
			clearError()
		} else {
			showError('E-mail jest niepoprawny')
		}
	}
}

const writingAnimation = () => {
	// setTimeout(() => {
	// 	apostropheIcon.style.visibility = 'visible'
	// 	apostropheIcon.style.opacity = '1'
	// }, 100)

	if (index >= quote.length) {
		AuthorIndex = index - quote.length
		quoteAuthor.innerHTML = quoteAuthorText.slice(0, AuthorIndex)
	} else {
		quoteText.innerHTML = quote.slice(0, index)
	}

	if (index <= quote.length + quoteAuthorText.length) {
		index++
		timeout = setTimeout(writingAnimation, speed)
	}
}

const handleThemeBtn = () => {
	changeThemeBtn.classList.toggle('nav__appearance-toggle--active')
}

const handleMobileNav = () => {
	navSideBar.classList.toggle('nav__sidebar--active')
	burgerBtn.classList.toggle('burgerBtn--active')
}

const handleCarousel = e => {
	console.log(move)
	carouselBoxes.forEach(box => {
		box.style.transform = `translateX(${move}px)`
	})

	const logKey = document.querySelector('.LogKey')
	logKey.innerHTML = `Początek X: ${startX} ----- Koniec X: ${endX}`
}

const wall = document.querySelector('.about__slider-item--wall')
let test = wall.getBoundingClientRect()

const handleDropDownMobileNav = () => {
	const caretDownSrc = './dist/img/caret-down.svg'
	const caretUpSrc = './dist/img/caret-up.svg'
	const currentSrc = caretIcon.getAttribute('src')

	if (currentSrc === caretDownSrc) {
		caretIcon.setAttribute('src', `${caretUpSrc}`)
		caretIcon.setAttribute('alt', `caret up icon`)
		dropDownItems.forEach(item => {
			item.classList.remove('nav__drop-down-item')
		})
	} else {
		caretIcon.setAttribute('src', `${caretDownSrc}`)
		caretIcon.setAttribute('alt', `caret up down`)
		dropDownItems.forEach(item => {
			item.classList.add('nav__drop-down-item')
		})
	}
}

document.addEventListener('DOMContentLoaded', main)

// const fruits = ['banan', 'truskawa', 'malina', 'mandarynka', 'jabłko']
// const newFruits = fruits.slice(3, 5)

// console.log(newFruits);

// let quote2 = `Najlepszym dowodem na to, że coś jest możliwe, jest fakt, że ktoś już tego
// dokonał.`
// let index2 = 1;

// console.log(`test: ${quote2.length}`);

// const animatedText = () => {
// 	if(index2 <= quote2.length)
// }
