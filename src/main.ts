import mailJS from '@emailjs/browser'

let hrefs = ['home', 'skills', 'contact']
let navItems = document.querySelectorAll<HTMLLIElement>('nav ul li')!;
let navList = document.querySelector<HTMLUListElement>('nav ul')!;
let mobileHam = document.querySelector('#ham')!;

if (hrefs.length !== navItems.length) {
  throw new Error('hrefs and navItems are not the same length')
} else {
  navItems.forEach(navItem => {
    navItem.firstElementChild?.addEventListener('click', (e) => {
      e.preventDefault();
      let href = navItem.firstElementChild?.getAttribute('href')!;
      if (href.toLowerCase().endsWith('home')) {
        window.scrollTo(0, 0);
      } else {
        document.querySelector(href)!.scrollIntoView();
      }
      if (mobileHam.classList.contains('active')) {
        mobileHam.classList.toggle('active', false)
        navList.classList.toggle('active', false);
      }
    })
  })

  mobileHam.addEventListener('click', (e) => {
    e.preventDefault();
    navList.classList.toggle('active');
    mobileHam.classList.toggle('active')
  })


  let getCurrentSection = () => {
    document.querySelector('nav')?.classList.toggle('bg', window.scrollY >= 100)
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
          for (let j = i; j >= 0; j--)
            document.querySelector(`#${hrefs[j]}`)?.classList.toggle('active', true);
          section.classList.toggle('active', true);
        }
      }
    }
  }
  window.onload = () => getCurrentSection()
  window.addEventListener('scroll', () => getCurrentSection())
}

document.querySelector('section[id="contact"] button')?.addEventListener('click', async (e) => {
  e.preventDefault();
  let email = document.querySelector<HTMLInputElement>('section[id="contact"] input[type="email"]')!;
  let message = document.querySelector<HTMLTextAreaElement>('section[id="contact"] textarea')!;
  await mailJS.send('service_6fqtfhu', 'template_8loz1j6', {
    from: email.value,
    message: message.value
  }, 'Y8QswEa90HYviUy6C')
  email.value = '';
  message.value = '';
})

