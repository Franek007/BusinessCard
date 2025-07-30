let burgerBtn
let navBar
let sideBar
let navSideBar
let firstBurgerBar
let navItems
let navHomeIcon
let changeThemeBtns
let chagneThemeBtnColor
let footerYear
let isDark = false

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	burgerBtn = document.querySelector('.burgerBtn')
	navBar = document.querySelector('.nav')
	navSideBar = navBar.querySelector('.nav__sidebar')
	firstBurgerBar = navBar.querySelector('.firstBar')
	navItems = navBar.querySelectorAll('.nav__item')
	navHomeIcon = navBar.querySelector('.nav__icon')
	changeThemeBtns = document.querySelectorAll('.nav__appearance-toggle')
	chagneThemeBtnColor = document.querySelector('.nav__appearance-toggle--active')
	footerYear = document.querySelector('.footer__year')
}

const prepareDOMEvents = () => {
	savedTheme()
	burgerBtn.addEventListener('click', handleMobileNav)
	navItems.forEach(item => {
		item.addEventListener('click', handleMobileNav)
	})
	navHomeIcon.addEventListener('click', () => {
		if (navSideBar.classList.contains('nav__sidebar--active')) {
			navSideBar.classList.remove('nav__sidebar--active')
		}
	})
	changeThemeBtns.forEach(btn => {
		btn.addEventListener('click', handleThemeBtn)
	})
	getTime()
}

const handleThemeBtn = () => {
	changeThemeBtns.forEach(btn => {
		btn.classList.toggle('nav__appearance-toggle--active')
		btn.classList.contains('nav__appearance-toggle--active')
			? localStorage.setItem('isActive', 'true')
			: localStorage.setItem('isActive', 'false')
	})

	const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light'

	if (currentTheme === 'dark') {
		document.body.classList.remove('dark-mode')
		localStorage.setItem('theme', 'light')
	} else {
		document.body.classList.add('dark-mode')
		localStorage.setItem('theme', 'dark')
	}
}

const savedTheme = () => {
	const savedTheme = localStorage.getItem('theme')
	const activeAnimation = localStorage.getItem('isActive')

	if (savedTheme === 'dark') {
		document.body.classList.add('dark-mode')
	}

	if (activeAnimation === 'true') {
		changeThemeBtns.forEach(btn => {
			btn.classList.add('nav__appearance-toggle--active')
		})
	} else {
		changeThemeBtns.forEach(btn => {
			btn.classList.remove('nav__appearance-toggle--active')
		})
	}
}

const handleMobileNav = () => {
	navSideBar.classList.toggle('nav__sidebar--active')
	burgerBtn.classList.toggle('burgerBtn--active')
}

const getTime = () => {
	let year = new Date()
	footerYear.textContent = year.getFullYear()
	console.log(
		'%c Made with ❤️ by Franek Rubinowicz → frubinowicz.com ',
		'color: #fff; background: linear-gradient(to right, #2c3e50, #4ca1af); padding: 12px 24px; font-size: 16px; border-radius: 8px; font-family: monospace;'
	)
}

document.addEventListener('DOMContentLoaded', main)
