import mailJS from '@emailjs/browser'

let navItems = document.querySelectorAll<HTMLLIElement>('nav ul li')!;
let navList = document.querySelector<HTMLUListElement>('nav ul')!;
let mobileHam = document.querySelector('#ham')!;


navItems.forEach(navItem => {
  navItem.firstElementChild?.addEventListener('click', (e) => {
    e.preventDefault();
    let href = navItem.firstElementChild?.getAttribute('href')!;
    if (href.toLowerCase().endsWith('home')) {
      window.scrollTo(0, 0);
    } else {
      document.querySelector(href)!.scrollIntoView();
    }
    // let currentActiveElement = document.querySelector<HTMLLIElement>('nav ul li.active')!;
    // currentActiveElement.classList.remove('active');
    // navItem.classList.add('active');
    mobileHam.classList.toggle('active', false)
  })
})

mobileHam.addEventListener('click', (e) => {
  e.preventDefault();
  navList.classList.toggle('active');
  mobileHam.classList.toggle('active')
})

let nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  nav?.classList.toggle('bg', window.scrollY >= 100)
  let hrefs = ['home', 'skills', 'contact']
  for (let i = 0; i < hrefs.length; i++) {
    let href = hrefs[i];
    let section = document.querySelector(`#${href}`) as HTMLElement | null;
    if (section !== null) {
      let sectionTop = section.offsetTop;
      let sectionBottom = sectionTop + section.offsetHeight;
      let scrollTop = window.scrollY + window.innerHeight / 2;
      if (scrollTop > sectionTop && scrollTop < sectionBottom) {
        let currentActiveElement = document.querySelector('nav ul li.active');
        currentActiveElement?.classList.toggle('active', false);
        navItems[i].classList.toggle('active', true);
      }
    }
  }
})

document.querySelector('section[id="contact"] button')?.addEventListener('click', async (e) => {
  e.preventDefault();
  let email = document.querySelector<HTMLInputElement>('section[id="contact"] input[type="email"]');
  let message = document.querySelector<HTMLTextAreaElement>('section[id="contact"] textarea');
  console.log({
    from: email?.value,
    message: message?.value
  })
  await mailJS.send('service_6fqtfhu', 'template_8loz1j6', {
    from: email?.value,
    message: message?.value
  }, 'Y8QswEa90HYviUy6C')
  if (email) {
    email.value = '';
  }
  if (message) {
    message.value = '';
  }
})

export { }