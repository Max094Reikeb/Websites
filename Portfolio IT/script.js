function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

window.addEventListener('scroll', function() {
  const arrow = document.getElementById('scroll-arrow');
  const sections = document.getElementsByClassName('scroll-section');
  for (let i = 0; i < sections.length; i++) {
    const rect = sections[i].getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      if (i < sections.length - 1) {
        arrow.setAttribute('onclick', "location.href='#" + sections[i+1].id + "'");
      } else {
        arrow.setAttribute('onclick', "location.href='#" + sections[0].id + "'");
      }
      break;
    }
  }
});
