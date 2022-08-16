const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElemnet = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  mobileMenuElemnet.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);
