import lottie from 'lottie-web';

/* ---- Lottie: load each animation lazily and play it once when it scrolls into view ---- */
function initLottie() {
  const containers = document.querySelectorAll<HTMLElement>('[data-lottie-src]');
  if (!containers.length) return;

  const load = (el: HTMLElement) => {
    const src = el.dataset.lottieSrc;
    if (!src || el.dataset.lottieLoaded) return;
    el.dataset.lottieLoaded = 'true';
    lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: src,
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          load(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );

  containers.forEach((el) => observer.observe(el));
}

/* ---- Hero tabs (replaces the Webflow tab interaction) ---- */
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs-wrapper]').forEach((wrapper) => {
    const links = wrapper.querySelectorAll<HTMLAnchorElement>('[data-tab-link]');
    const panes = wrapper.querySelectorAll<HTMLElement>('[data-tab-pane]');

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const id = link.dataset.tabLink;
        links.forEach((l) => l.classList.toggle('w--current', l === link));
        panes.forEach((p) => p.classList.toggle('w--tab-active', p.dataset.tabPane === id));
      });
    });
  });
}

/* ---- FAQ accordion (ported from the Webflow embed) ---- */
function initAccordionCSS() {
  document.querySelectorAll<HTMLElement>('[data-accordion-css-init]').forEach((accordion) => {
    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';

    accordion.addEventListener('click', (event) => {
      const toggle = (event.target as HTMLElement).closest('[data-accordion-toggle]');
      if (!toggle) return;

      const item = toggle.closest('[data-accordion-status]');
      if (!item) return;

      const isActive = item.getAttribute('data-accordion-status') === 'active';
      item.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');

      if (closeSiblings && !isActive) {
        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
          if (sibling !== item) sibling.setAttribute('data-accordion-status', 'not-active');
        });
      }
    });
  });
}

/* ---- Mega nav dropdowns (simplified CSS version of the GSAP original) ---- */
function initMegaNav() {
  const nav = document.querySelector<HTMLElement>('.mega-nav');
  if (!nav) return;

  const toggles = nav.querySelectorAll<HTMLButtonElement>('[data-dropdown-toggle]');
  const panels = nav.querySelectorAll<HTMLElement>('[data-nav-content]');
  const backdrop = nav.querySelector<HTMLElement>('[data-menu-backdrop]');
  const burger = nav.querySelector<HTMLButtonElement>('[data-burger-toggle]');
  const back = nav.querySelector<HTMLButtonElement>('[data-mobile-back] button');
  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches;
  let closeTimer: ReturnType<typeof setTimeout> | undefined;

  const closeAll = () => {
    nav.classList.remove('nav-open', 'submenu-open');
    nav.setAttribute('data-menu-open', 'false');
    panels.forEach((p) => p.classList.remove('is-open'));
    toggles.forEach((t) => t.setAttribute('aria-expanded', 'false'));
  };

  const open = (name: string) => {
    clearTimeout(closeTimer);
    nav.classList.add('nav-open', 'submenu-open');
    nav.setAttribute('data-menu-open', 'true');
    panels.forEach((p) => p.classList.toggle('is-open', p.dataset.navContent === name));
    toggles.forEach((t) => t.setAttribute('aria-expanded', String(t.dataset.dropdownToggle === name)));
  };

  toggles.forEach((toggle) => {
    const name = toggle.dataset.dropdownToggle ?? '';

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeAll() : open(name);
    });

    toggle.addEventListener('mouseenter', () => {
      if (isDesktop()) open(name);
    });
  });

  nav.addEventListener('mouseleave', () => {
    if (!isDesktop()) return;
    closeTimer = setTimeout(closeAll, 150);
  });
  nav.addEventListener('mouseenter', () => clearTimeout(closeTimer));

  backdrop?.addEventListener('click', closeAll);
  back?.addEventListener('click', closeAll);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAll();
      nav.classList.remove('menu-open');
      burger?.setAttribute('aria-expanded', 'false');
    }
  });

  burger?.addEventListener('click', () => {
    const opened = nav.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(opened));
    if (!opened) closeAll();
  });
}

/* ---- Footer clock (ported from the Webflow embed) ---- */
function initDynamicCurrentTime() {
  const elements = document.querySelectorAll<HTMLElement>('[data-current-time]');
  if (!elements.length) return;

  const update = () => {
    elements.forEach((element) => {
      const timezone = element.getAttribute('data-current-time') || 'Australia/Melbourne';
      const formatter = new Intl.DateTimeFormat([], {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      const parts = formatter.formatToParts(new Date());
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';

      const hours = element.querySelector('[data-current-time-hours]');
      const minutes = element.querySelector('[data-current-time-minutes]');
      const seconds = element.querySelector('[data-current-time-seconds]');
      if (hours) hours.textContent = get('hour');
      if (minutes) minutes.textContent = get('minute');
      if (seconds) seconds.textContent = get('second');
    });
  };

  update();
  setInterval(update, 1000);
}

initLottie();
initTabs();
initAccordionCSS();
initMegaNav();
initDynamicCurrentTime();
