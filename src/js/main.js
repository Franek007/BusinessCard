let burgerBtn
let navBar
let sideBar
let firstBurgerBar
let navItems
let navHomeIcon
let footerYear

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
	})
	document.body.classList.toggle('dark-mode')
}

const handleMobileNav = () => {
	navSideBar.classList.toggle('nav__sidebar--active')
	burgerBtn.classList.toggle('burgerBtn--active')
}

const getTime = () => {
	let year = new Date()
	footerYear.textContent = year.getFullYear()
}

document.addEventListener('DOMContentLoaded', main)
