/**
* Template Name: Hidayah
* Template URL: https://bootstrapmade.com/hidayah-free-simple-html-template-for-corporate/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  new Swiper('.about-details-slider', {
    effect: "coverflow",
    speed: 400,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// Translation dictionary
const translations = {
  en: {
    title: "RAWAA Gebäudereinigung - For sparkling cleanliness in every area",
    menu: ["Home", "About", "Services", "Contact Us"],
    hero: [
      {
        heading: "Welcome To RAWAA",
        text: "Your reliable partner for comprehensive cleaning services, from office cleaning to special and maintenance cleaning.",
        button: "Read More"
      },
      {
        heading: "Sparkling Cleanliness for Any Environment",
        text: "Discover our professional cleaning services for offices, hotels, surgeries and more. RAWAA building cleaning ensures immaculate cleanliness and hygiene - reliably and efficiently.",
        button: "Read More"
      },
      {
        heading: "Specialized Cleaning for Every Challenge",
        text: "From façade cleaning to fitness studios, schools and clinics - we offer tailor-made solutions for your specific cleaning needs.",
        button: "Read More"
      },
      {
        heading: "Service Beyond Cleaning",
        text: "In addition to building cleaning, we offer winter services, move-in cleaning and regular maintenance cleaning. You can rely on us for comprehensive care of your premises.",
        button: "Read More"
      }
    ],
    about: {
      sectionTitle: "About Us",
      text: "RAWAA Gebäudereinigung is your reliable partner for professional cleaning services in various areas. With a strong focus on quality and customer satisfaction, we offer customized solutions for offices, hotels, medical practices, schools and more. Our expertise also includes specialized cleaning such as facades, gyms and clinics.",
      points: [
        "Diverse services: From office and hotel cleaning to specialized services such as facade and gym cleaning.",
        "Quality and reliability: Professional cleaning solutions for private and commercial customers.",
        "Tailor-made solutions: Adaptable cleaning programs tailored to the individual needs of our customers.",
        "Experience and expertise: Many years of experience in the industry, coupled with a dedicated team of cleaning professionals."
      ],
      mission: {
        title: "Our Mission",
        slogan: "Cleanliness with Passion",
        text: "At RAWAA Gebäudereinigung, we provide first-class cleaning services characterized by a passion for cleanliness and maximum customer satisfaction."
      },
      plan: {
        title: "Our Plan",
        slogan: "Innovation for a Clean Future",
        text: "We set new standards in the cleaning industry through innovative cleaning technologies and sustainable practices."
      },
      vision: {
        title: "Our Vision",
        slogan: "Shaping the Future of Cleaning",
        text: "We aim to transform the cleaning industry with excellence and innovation, building long-term partnerships with our customers."
      }
    },
    stats: {
      title: "What we have achieved so far",
      subtitle: ["Explore our journey of accomplishments.", "English tran"],
      labels: ["Clients", "Projects", "Hours Of Support", "Hard Workers"]
    },
    services: {
      title: "Services",
      subtitle: "We know that every environment has unique cleaning requirements. That's why we offer specialized services that ensure your spaces are always spotless and welcoming.",
      footer: "With RAWAA building cleaning, you get customized cleaning solutions that meet your individual needs and ensure the highest standards. Contact us today and experience the difference!",
      items: [
        { name: "Office cleaning", text: "Keep your work environment clean and productive with our thorough and regular office cleaning services." },
        { name: "Glass & window cleaning", text: "Enjoy streak-free cleanliness and a clear view with our professional glass and window cleaning services." },
        { name: "Basic cleaning", text: "Our deep cleaning services provide a deep clean, ideal for a thorough refresh of your rooms." },
        { name: "Hotel cleaning", text: "Ensure satisfied guests with our customized cleaning services for hotels that meet the highest standards." },
        { name: "Practice cleaning", text: "Hygiene and cleanliness for your practice - we make sure your patients feel comfortable." },
        { name: "Stairwell cleaning", text: "A clean stairwell leaves a positive impression - our regular cleaning services keep it in top condition." },
        { name: "Elevator cleaning", text: "We offer thorough elevator cleaning to ensure hygiene and a clean appearance." },
        { name: "Construction cleaning", text: "Our construction cleaning removes debris and dust to keep your construction site clean and safe." },
        { name: "Underground car park cleaning", text: "A clean underground car park ensures a safe and pleasant parking environment - we take care of it." },
        { name: "Roof cleaning", text: "Our roof cleaning removes moss, dirt and debris to extend the life of your roof." },
        { name: "Facade cleaning", text: "Maintain the exterior shine of your building with our professional façade cleaning services." },
        { name: "Gym cleaning", text: "Hygienic and clean fitness rooms for a healthy training environment - we make sure of it." },
        { name: "KITA cleaning", text: "Cleanliness and safety for the little ones - our KITA cleaning meets the highest hygiene standards." },
        { name: "Clinics and hospital cleaning", text: "Sterile and clean environments are essential in hospitals - our cleaning services guarantee this." },
        { name: "School cleaning", text: "Clean schools promote a better learning environment - we offer comprehensive cleaning services for educational institutions." },
        { name: "Special cleaning", text: "Special cleaning for special requirements - we have the solution for every challenge." },
        { name: "Carpet cleaning", text: "Our carpet cleaning services deeply remove dirt and stains from the fibers, for fresh and clean carpets." },
        { name: "Winter service", text: "Safety in the cold season - our winter service keeps your paths and areas free of snow and ice." },
        { name: "Move-in cleaning", text: "For a perfect start to your new home - our move-in cleaning leaves no dirt behind." },
        { name: "Maintenance cleaning", text: "Regular and thorough maintenance cleaning for private and commercial properties - we keep your rooms spotless." }
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "We look forward to hearing from you! At RAWAA Commercial Cleaning, we are here to answer all your questions and concerns about our cleaning services.",
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Message",
        button: "Send Message"
      }
    },
    footer: {
      linksTitle: "Useful Links",
      links: [
        "Home",
        "About",
        "Services",
        "Privacy Policy",
        "Imprint",
        "Cookie Policy",
        "Contact Us"
      ],
      newsletterTitle: "Our Newsletter",
      newsletterText: "Stay up to date and receive exclusive cleaning tips and offers.<br>Subscribe now to the RAWAA Cleaning Services Newsletter!",
      subscribe: "Subscribe",
      info: {
        phone: "Phone:",
        email: "Email:"
      },
      copyright: "© Copyright 2024 RAWAA Gebäudereinigung. All Rights Reserved."
    },
    extraMenu: ["About", "Services", "Contact"]
    , contact: {
      title: "Contact",
      subtitle: "We look forward to hearing from you! At RAWAA Commercial Cleaning, we are here to answer all your questions and concerns about our cleaning services.",
      info: {
        location: "Location:",
        email: "Email:",
        phone: "Call:"
      },
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Message",
        button: "Send Message",
        loading: "Loading",
        error: "An error occurred while sending your message.",
        success: "Your message has been sent. Thank you!"
      }
    },
  },

  de: {
    title: "RAWAA Gebäudereinigung - Für strahlende Sauberkeit in jedem Bereich",
    menu: ["Home", "ÜBER UNS", "Dienstleistungen", "Kontaktiere uns"],
    hero: [
      {
        heading: "Willkommen bei der RAWAA",
        text: "Ihrem zuverlässigen Partner für umfassende Reinigungsdienste, von Büroreinigung bis hin zu Spezial- und Unterhaltsreinigungen.",
        button: "Weiterlesen"
      },
      {
        heading: "Strahlende Sauberkeit für jede Umgebung",
        text: "Entdecken Sie unsere professionellen Reinigungsdienste für Büros, Hotels, Praxen und mehr. RAWAA Gebäudereinigung sorgt für makellose Sauberkeit und Hygiene – zuverlässig und effizient.",
        button: "Weiterlesen"
      },
      {
        heading: "Spezialisierte Reinigung für jede Herausforderung",
        text: "Von Fassadenreinigung über Fitnessstudios bis hin zu Schulen und Kliniken – wir bieten maßgeschneiderte Lösungen für Ihre spezifischen Reinigungsbedürfnisse.",
        button: "Weiterlesen"
      },
      {
        heading: "Service über Reinigung hinaus",
        text: "Neben der Gebäudereinigung bieten wir Winterdienst, Einzugsreinigung und regelmäßige Unterhaltsreinigung an. Verlassen Sie sich auf uns für umfassende Pflege Ihrer Räumlichkeiten.",
        button: "Weiterlesen"
      }
    ],
    about: {
      sectionTitle: "Über uns",
      text: "RAWAA Gebäudereinigung ist Ihr verlässlicher Partner für professionelle Reinigungsdienste in verschiedenen Bereichen. Mit einem starken Fokus auf Qualität und Kundenzufriedenheit bieten wir maßgeschneiderte Lösungen.",
      points: [
        "Vielfältige Dienstleistungen: Von Büro- und Hotelreinigung bis hin zu speziellen Diensten wie Fassaden- und Fitnessstudio-Reinigung.",
        "Qualität und Zuverlässigkeit: Professionelle Reinigungslösungen für private und gewerbliche Kunden.",
        "Maßgeschneiderte Lösungen: Anpassungsfähige Reinigungsprogramme, die auf die individuellen Bedürfnisse unserer Kunden zugeschnitten sind.",
        "Erfahrung und Expertise: Langjährige Erfahrung in der Branche, gepaart mit einem engagierten Team von Reinigungsfachleuten."
      ],
      mission: {
        title: "Unsere Mission",
        slogan: "Sauberkeit mit Leidenschaft",
        text: "Bei RAWAA Gebäudereinigung bieten wir erstklassige Reinigungsdienste, die durch Leidenschaft für Sauberkeit und maximale Kundenzufriedenheit geprägt sind."
      },
      plan: {
        title: "Unser Plan",
        slogan: "Innovation für eine saubere Zukunft",
        text: "Wir setzen neue Maßstäbe in der Reinigungsbranche durch innovative Reinigungstechnologien und nachhaltige Praktiken."
      },
      vision: {
        title: "Unsere Vision",
        slogan: "Die Zukunft der Reinigung gestalten",
        text: "Wir wollen die Reinigungsbranche mit Exzellenz und Innovation transformieren und langfristige Partnerschaften mit unseren Kunden aufbauen."
      }
    },
    stats: {
      title: "Was wir bisher erreicht haben",
      subtitle: ["Erkunden Sie unseren Weg der Errungenschaften.", "hdosn smkj"],
      labels: ["Kunden", "Projekte", "Stunden der Unterstützung", "Fleißige Arbeiter"]
    },
    services: {
      title: "Dienstleistungen",
      subtitle: "Wir wissen, dass jede Umgebung einzigartige Reinigungsanforderungen hat. Deshalb bieten wir spezialisierte Dienstleistungen an, die sicherstellen, dass Ihre Räume stets makellos und einladend sind.",
      footer: "Mit RAWAA Gebäudereinigung erhalten Sie maßgeschneiderte Reinigungslösungen, die Ihre individuellen Bedürfnisse erfüllen und höchste Standards gewährleisten. Kontaktieren Sie uns noch heute und erleben Sie den Unterschied!",
      items: [
        { name: "Büroreinigung", text: "Halten Sie Ihr Arbeitsumfeld sauber und produktiv mit unseren gründlichen und regelmäßigen Büroreinigungsdiensten." },
        { name: "Glas- & Fensterreinigung", text: "Genießen Sie streifenfreie Sauberkeit und klare Sicht mit unseren professionellen Glas- und Fensterreinigungsdiensten." },
        { name: "Grundreinigung", text: "Unsere Grundreinigung bietet eine tiefgehende Sauberkeit, ideal für eine gründliche Auffrischung Ihrer Räume." },
        { name: "Hotelreinigung", text: "Sorgen Sie für zufriedene Gäste mit unseren maßgeschneiderten Reinigungsdiensten für Hotels, die höchsten Standards entsprechen." },
        { name: "Praxisreinigung", text: "Hygiene und Sauberkeit für Ihre Praxis – wir sorgen dafür, dass Ihre Patienten sich wohlfühlen." },
        { name: "Treppenhausreinigung", text: "Ein sauberes Treppenhaus hinterlässt einen positiven Eindruck – unsere regelmäßigen Reinigungen halten es in Top-Zustand." },
        { name: "Aufzugsreinigung", text: "Wir bieten gründliche Aufzugsreinigungen an, um Hygiene und ein sauberes Erscheinungsbild sicherzustellen." },
        { name: "Baureinigung", text: "Unsere Baureinigung entfernt Bauschutt und Staub, sodass Ihre Baustelle sauber und sicher bleibt." },
        { name: "Tiefgaragenreinigung", text: "Eine saubere Tiefgarage sorgt für ein sicheres und angenehmes Parkumfeld – wir kümmern uns darum." },
        { name: "Dachreinigung", text: "Unsere Dachreinigung entfernt Moos, Schmutz und Verunreinigungen, um die Lebensdauer Ihres Dachs zu verlängern." },
        { name: "Fassadenreinigung", text: "Erhalten Sie den äußeren Glanz Ihres Gebäudes mit unseren professionellen Fassadenreinigungen." },
        { name: "Fitnessstudio-Reinigung", text: "Hygienische und saubere Fitnessräume für ein gesundes Trainingsumfeld – wir sorgen dafür." },
        { name: "KITA-Reinigung", text: "Sauberkeit und Sicherheit für die Kleinsten – unsere KITA-Reinigung erfüllt höchste Hygienestandards." },
        { name: "Klinikreinigung", text: "Sterile und saubere Umgebungen sind in Kliniken unerlässlich – unsere Reinigungen garantieren dies." },
        { name: "Schulreinigung", text: "Saubere Schulen fördern ein besseres Lernumfeld – wir bieten umfassende Reinigungsdienste für Bildungseinrichtungen." },
        { name: "Sonderreinigung", text: "Spezialreinigungen für besondere Anforderungen – wir haben die Lösung für jede Herausforderung." },
        { name: "Teppichreinigung", text: "Unsere Teppichreinigungen entfernen Schmutz und Flecken tief aus den Fasern, für frische und saubere Teppiche." },
        { name: "Winterdienst", text: "Sicherheit in der kalten Jahreszeit – unser Winterdienst hält Ihre Wege und Flächen schnee- und eisfrei." },
        { name: "Einzugsreinigung", text: "Für einen perfekten Start in Ihr neues Zuhause – unsere Einzugsreinigung hinterlässt keinen Schmutz." },
        { name: "Unterhaltsreinigung", text: "Regelmäßige und gründliche Unterhaltsreinigungen für private und gewerbliche Objekte – wir halten Ihre Räume makellos." }
      ]
    },
    contact: {
      title: "Kontakt",
      subtitle: "Wir freuen uns darauf, von Ihnen zu hören! Bei RAWAA Gebäudereinigung stehen wir Ihnen für alle Fragen und Anliegen rund um unsere Reinigungsdienstleistungen zur Verfügung.",
      form: {
        name: "Ihr Name",
        email: "Deine E-Mail",
        subject: "Thema",
        message: "Nachricht",
        button: "Nachricht senden"
      }
    },
    footer: {
      linksTitle: "Nützliche Links",
      links: [
        "Home",
        "ÜBER UNS",
        "Dienstleistungen",
        "Datenschutz",
        "Impressum",
        "Cookie-Richtlinie",
        "Kontaktiere uns"
      ],
      newsletterTitle: "Unser Newsletter",
      newsletterText: "Bleiben Sie immer auf dem Laufenden und erhalten Sie exklusive Reinigungstipps und Angebote.<br>Abonnieren Sie jetzt den RAWAA Gebäudereinigung Newsletter!",
      subscribe: "Abonnieren",
      info: {
        phone: "Telefon:",
        email: "Email:"
      },
      copyright: "© Urheberrecht 2024 RAWAA Gebäudereinigung. Alle Rechte Vorbehalten."
    }
    , extraMenu: ["über uns", "Dienstleistungen", "Kontakt"],
    contact: {
      title: "Kontakt",
      subtitle: "Wir freuen uns darauf, von Ihnen zu hören! Bei RAWAA Gebäudereinigung stehen wir Ihnen für alle Fragen und Anliegen rund um unsere Reinigungsdienstleistungen zur Verfügung.",
      info: {
        location: "Standort:",
        email: "Email:",
        phone: "Anruf:"
      },
      form: {
        name: "Ihr Name",
        email: "Deine E-Mail",
        subject: "Thema",
        message: "Nachricht",
        button: "Nachricht senden",
        loading: "Wird geladen",
        error: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten.",
        success: "Ihre Nachricht wurde gesendet. Danke schön!"
      }
    }
  }
};




function getLanguage() {
  const params = new URLSearchParams(window.location.search);
  return params.get("lang") || "en";
}

// Change language in the URL and reload page
function changeLanguage() {
  const currentLang = getLanguage();
  const newLang = currentLang === "en" ? "de" : "en";
  const params = new URLSearchParams(window.location.search);
  params.set("lang", newLang);
  window.location.search = params.toString(); // reloads the page
}

// Update text content based on language
function applyTranslations() {
  const lang = getLanguage(); // e.g., from localStorage or a toggle button
  const t = translations[lang];

  // ---- <title> & <html lang> ----
  document.title = t.title;
  document.documentElement.lang = lang;

  // ---- Menu ----
  const menuItems = document.querySelectorAll("#navmenu ul li a, #navbar ul li a");
  if (menuItems.length && t.menu) {
    menuItems.forEach((item, index) => {
      if (t.menu[index]) item.innerText = t.menu[index];
    });
  }

  // ---- Language Button ----
  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.innerText = (lang === "en") ? "Deutsch" : "English";
  }

  // ---- Hero Section ----
  const heroSlides = document.querySelectorAll("#hero-carousel .carousel-item, #heroCarousel .carousel-item");
  if (heroSlides.length && t.hero) {
    heroSlides.forEach((slide, i) => {
      if (t.hero[i]) {
        const heading = slide.querySelector("h2");
        const text = slide.querySelector("p");
        const button = slide.querySelector("a");
        if (heading) heading.innerHTML = t.hero[i].heading;
        if (text) text.innerText = t.hero[i].text;
        if (button) button.innerText = t.hero[i].button;
      }
    });
  }

  // ---- About Section ----
  const aboutTitleSpan = document.querySelector("#about .section-title span");
  const aboutTitleH2 = document.querySelector("#about .section-title h2");

  if (aboutTitleSpan) aboutTitleSpan.innerText = t.about.sectionTitle;
  if (aboutTitleH2) aboutTitleH2.innerText = t.about.sectionTitle;

  const aboutText = document.querySelector("#about .content p");
  if (aboutText) aboutText.innerText = t.about.text;

  const aboutPoints = document.querySelectorAll("#about ul li");
  if (aboutPoints.length && t.about.points) {
    aboutPoints.forEach((li, i) => {
      if (t.about.points[i]) li.innerText = t.about.points[i];
    });
  }

  // Mission, Plan, Vision
  const mission = document.querySelector("#about-list .icon-box:nth-child(1)");
  if (mission) {
    mission.querySelector("h4").innerText = t.about.mission.title;
    mission.querySelector("p strong").innerText = t.about.mission.slogan;
    mission.querySelectorAll("p")[1].innerText = t.about.mission.text;
  }
  const plan = document.querySelector("#about-list .icon-box:nth-child(2)");
  if (plan) {
    plan.querySelector("h4").innerText = t.about.plan.title;
    plan.querySelector("p strong").innerText = t.about.plan.slogan;
    plan.querySelectorAll("p")[1].innerText = t.about.plan.text;
  }
  const vision = document.querySelector("#about-list .icon-box:nth-child(3)");
  if (vision) {
    vision.querySelector("h4").innerText = t.about.vision.title;
    vision.querySelector("p strong").innerText = t.about.vision.slogan;
    vision.querySelectorAll("p")[1].innerText = t.about.vision.text;
  }

  // ---- Stats ----
  const statsTitle = document.querySelector("#stats .title h3, #counts .title h3");
  const statsSubtitle = document.querySelectorAll("#stats .title p, #counts .title p");
  if (statsTitle) statsTitle.innerText = t.stats.title;
  if (statsSubtitle.length && t.stats.subtitle) {
    statsSubtitle.forEach((subtitle, i) => {
      if (t.stats.subtitle[i]) subtitle.innerText = t.stats.subtitle[i];
    });
  }
  const statLabels = document.querySelectorAll("#stats .counters p, #counts .counters p");
  if (statLabels.length && t.stats.labels) {
    statLabels.forEach((label, i) => {
      if (t.stats.labels[i]) label.innerText = t.stats.labels[i];
    });
  }

  // ---- Services ----
  const servicesTitleSpan = document.querySelector("#services .section-title span");
  const servicesTitleH2 = document.querySelector("#services .section-title h2");
  const servicesSubtitle = document.querySelector("#services .section-title p");
  if (servicesTitleSpan) servicesTitleSpan.innerText = t.services.title;
  if (servicesTitleH2) servicesTitleH2.innerText = t.services.title;
  if (servicesSubtitle) servicesSubtitle.innerText = t.services.subtitle;

  // Service Cards
  const serviceCards = document.querySelectorAll("#services .card");
  if (serviceCards.length && t.services.items) {
    serviceCards.forEach((card, i) => {
      if (t.services.items[i]) {
        const name = card.querySelector("h3 span");
        const text = card.querySelector("p");
        if (name) name.innerText = t.services.items[i].name;
        if (text) text.innerText = t.services.items[i].text;
      }
    });
  }

  const servicesFooter = document.querySelector("#services .section-title:last-of-type p");
  if (servicesFooter) servicesFooter.innerText = t.services.footer;

  // ---- Contact ----
  const contactTitle = document.querySelector("#contact .section-title h2");
  const contactTitleSpan = document.querySelector("#contact .section-title span");
  const contactSubtitle = document.querySelector("#contact .section-title p");
  if (contactTitle) contactTitle.innerText = t.contact.title;
  if (contactTitleSpan) contactTitleSpan.innerText = t.contact.title;
  if (contactSubtitle) contactSubtitle.innerText = t.contact.subtitle;

  // Form
  const form = t.contact.form;
  if (form) {
    const nameInput = document.querySelector("#contact input[name='name']");
    const emailInput = document.querySelector("#contact input[name='email']");
    const subjectInput = document.querySelector("#contact input[name='subject']");
    const messageInput = document.querySelector("#contact textarea[name='message']");
    const button = document.querySelector("#contact button[type='submit']");

    if (nameInput) nameInput.placeholder = form.name;
    if (emailInput) emailInput.placeholder = form.email;
    if (subjectInput) subjectInput.placeholder = form.subject;
    if (messageInput) messageInput.placeholder = form.message;
    if (button) button.innerText = form.button;
  }

  // ---- Footer ----
  const footerLinksTitle = document.querySelector("#footer .footer-links h4");
  if (footerLinksTitle) footerLinksTitle.innerText = t.footer.linksTitle;

  const footerLinkItems = document.querySelectorAll("#footer .footer-links ul li a");
  if (footerLinkItems.length && t.footer.links) {
    footerLinkItems.forEach((a, i) => {
      if (t.footer.links[i]) a.innerText = t.footer.links[i];
    });
  }
  const footerInfo = document.querySelector("#footer .footer-info p");
  if (footerInfo && t.footer.info) {
    const strongs = footerInfo.querySelectorAll("strong");
    if (strongs[0]) strongs[0].innerText = t.footer.info.phone + " ";
    if (strongs[1]) strongs[1].innerText = t.footer.info.email + " ";
  }
  const newsletterTitle = document.querySelector("#footer .footer-newsletter h4");
  if (newsletterTitle) newsletterTitle.innerText = t.footer.newsletterTitle;

  const newsletterText = document.querySelector("#footer .footer-newsletter p");
  if (newsletterText) newsletterText.innerHTML = t.footer.newsletterText;

  const newsletterBtn = document.querySelector("#footer .footer-newsletter input[type='submit']");
  if (newsletterBtn) newsletterBtn.value = t.footer.subscribe;

  const copyright = document.querySelector("#footer .copyright");
  if (copyright) copyright.innerHTML = t.footer.copyright;

  const extraMenuSpans = document.querySelectorAll("nav span, .nav-extra span");
  if (extraMenuSpans.length && t.extraMenu) {
    extraMenuSpans.forEach((span, i) => {
      if (t.extraMenu[i]) span.innerText = t.extraMenu[i];
    });
  }

  // ---- Contact Info ----
  const contactInfo = document.querySelector("#contact .info-wrap");
  if (contactInfo) {
    const infoBoxes = contactInfo.querySelectorAll(".info h4");
    if (infoBoxes.length && t.contact.info) {
      if (infoBoxes[0]) infoBoxes[0].innerText = t.contact.info.location;
      if (infoBoxes[1]) infoBoxes[1].innerText = t.contact.info.email;
      if (infoBoxes[2]) infoBoxes[2].innerText = t.contact.info.phone;
    }
  }

  // ---- Contact Form Messages ----
  const loadingMsg = document.querySelector("#contact .loading");
  const errorMsg = document.querySelector("#contact .error-message");
  const successMsg = document.querySelector("#contact .sent-message");
  if (loadingMsg) loadingMsg.innerText = t.contact.form.loading;
  if (errorMsg) errorMsg.innerText = t.contact.form.error;
  if (successMsg) successMsg.innerText = t.contact.form.success;
}

// Run on page load
window.addEventListener("DOMContentLoaded", applyTranslations);