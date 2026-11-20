const WHATSAPP_NUMBER = '221770000000';
const MAKEUP_IMAGES = {
  natural: '/images/makeup/makeup-1.webp',
  softGlam: '/images/makeup/makeup-2.webp',
  evening: '/images/makeup/makeup-3.webp',
  bridal: '/images/makeup/makeup-4.webp',
  event: '/images/makeup/makeup-5.webp'
};

const hairImages = {
  braids: '/images/hair/hair-braids-unsplash.webp',
  weave: '/images/hair/hair-natural-unsplash.webp',
  wig: '/images/hair/hair-braids-detail-unsplash.webp',
  care: '/images/hair/hair-afro-unsplash.webp',
  hero: '/images/hair/hair-editorial-unsplash.webp'
};

const makeupServices = [
  { id: 'natural', name: 'Maquillage naturel', short: 'Naturel', description: 'Un maquillage léger et lumineux pour un rendu frais et naturel.', price: '10 000 FCFA', image: MAKEUP_IMAGES.natural, category: 'Maquillage naturel' },
  { id: 'soft-glam', name: 'Maquillage Soft Glam', short: 'Soft Glam', description: 'Un maquillage sophistiqué et harmonieux pour sublimer les traits du visage.', price: '15 000 FCFA', image: MAKEUP_IMAGES.softGlam, category: 'Soft Glam' },
  { id: 'evening', name: 'Maquillage soirée', short: 'Soirée', description: 'Un maquillage glamour pour vos sorties et événements.', price: '20 000 FCFA', image: MAKEUP_IMAGES.evening, category: 'Maquillage soirée' },
  { id: 'bridal', name: 'Maquillage mariée', short: 'Mariée', description: 'Une mise en beauté raffinée pour le plus beau jour de votre vie.', price: '35 000 FCFA', image: MAKEUP_IMAGES.bridal, category: 'Maquillage mariée' },
  { id: 'event', name: 'Maquillage événementiel', short: 'Événementiel', description: 'Une mise en beauté personnalisée pour vos cérémonies, anniversaires et occasions spéciales.', price: '20 000 FCFA', image: MAKEUP_IMAGES.event, category: 'Maquillage événementiel' }
];

const hairServices = [
  { id: 'braids', name: 'Tresses', description: 'Des lignes précises et des finitions sculptées, pensées pour votre quotidien.', price: 'À partir de 15 000 FCFA', image: hairImages.braids, category: 'Tresses' },
  { id: 'weave', name: 'Tissages', description: 'Une silhouette fluide et sur mesure, avec un tombé naturel et durable.', price: 'À partir de 25 000 FCFA', image: hairImages.weave, category: 'Tissages' },
  { id: 'wig', name: 'Perruques', description: 'Des looks élégants, installés et personnalisés selon votre visage.', price: 'À partir de 30 000 FCFA', image: hairImages.wig, category: 'Perruques' },
  { id: 'care', name: 'Soins capillaires', description: 'Des rituels ciblés pour nourrir, fortifier et révéler la beauté de vos cheveux.', price: 'À partir de 10 000 FCFA', image: hairImages.care, category: 'Soins capillaires' }
];

const galleryItems = [
  { image: hairImages.braids, title: 'Tresses graphiques', category: 'Tresses' },
  { image: hairImages.weave, title: 'Tissage signature', category: 'Tissages' },
  { image: hairImages.wig, title: 'Bob couture', category: 'Perruques' },
  { image: hairImages.care, title: 'Rituel cheveux naturels', category: 'Soins capillaires' },
  ...makeupServices.map((service) => ({ image: service.image, title: service.name, category: service.category }))
];

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/coiffure', label: 'Coiffure' },
  { href: '/maquillage', label: 'Maquillage' },
  { href: '/tarifs', label: 'Tarifs' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' }
];

const app = document.querySelector('#app');
const header = document.querySelector('#site-header');
const footer = document.querySelector('#site-footer');
const modal = document.querySelector('#booking-modal');
const modalFormTarget = document.querySelector('#modal-booking-form');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let activeGallery = galleryItems;
let activeGalleryIndex = 0;

function currentPath() {
  const path = window.location.pathname.replace(/\/$/, '');
  return path || '/';
}

function image(src, alt, className = '') {
  return `<img class="${className}" src="${src}" alt="${alt}" loading="lazy" />`;
}

function navTemplate() {
  const path = currentPath();
  return `<div class="site-header">
    <div class="site-header__inner">
      <a class="brand" href="/" aria-label="Afro Chic Studio, accueil">
        <span class="brand__mark">AC</span>
        <span><span class="brand__name">Afro Chic</span><span class="brand__sub">Studio beauté</span></span>
      </a>
      <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>
      <nav class="site-nav" aria-label="Navigation principale">
        ${navItems.map((item) => `<a class="${path === item.href ? 'is-active' : ''}" href="${item.href}">${item.label}</a>`).join('')}
      </nav>
      <div class="header-actions"><button class="btn" type="button" data-open-booking>Prendre rendez-vous <span>↗</span></button></div>
    </div>
  </div>`;
}

function footerTemplate() {
  return `<div class="site-footer"><div class="container">
    <div class="footer-top">
      <div><a class="brand" href="/"><span class="brand__mark">AC</span><span><span class="brand__name">Afro Chic</span><span class="brand__sub">Studio beauté</span></span></a><p>Coiffure et maquillage professionnel, pensés comme des gestes de confiance. Une beauté qui vous ressemble, avec caractère.</p></div>
      <nav class="footer-nav" aria-label="Pied de page">${navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}</nav>
      <button class="btn btn--ghost" type="button" data-open-booking>Réserver sur WhatsApp ↗</button>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Afro Chic Studio</span><span>Une réalisation Bureau Digital des PME</span><span>Dakar · Sur rendez-vous</span></div>
  </div></div>`;
}

function heroTemplate({ eyebrow, title, text, imageSrc, imageAlt, inner = false, actions = true }) {
  return `<section class="hero ${inner ? 'hero--inner' : 'hero--home'}"><div class="hero__visual">${image(imageSrc, imageAlt)}</div><div class="hero__inner"><div class="hero__copy"><div class="hero__kicker">${eyebrow}</div><h1>${title}</h1><p class="lead">${text}</p>${actions ? `<div class="hero__actions"><button class="btn" type="button" data-open-booking>Réserver mon moment <span>↗</span></button><a class="btn btn--ghost" href="/galerie">Voir nos réalisations</a></div>` : ''}</div><div class="hero__side-note">Beauté · précision · caractère</div></div></section>`;
}

function dualCard({ title, text, imageSrc, imageAlt, list, href, label }) {
  return `<article class="dual-card"><div class="dual-card__image">${image(imageSrc, imageAlt)}</div><div class="dual-card__content"><div class="eyebrow">${label}</div><h3>${title}</h3><p>${text}</p><ul class="dual-card__list">${list.map((item) => `<li>${item}</li>`).join('')}</ul><a class="btn btn--cream" href="${href}">Découvrir ${title.toLowerCase()} ↗</a></div></article>`;
}

function serviceCard(service, action = 'booking') {
  return `<article class="service-card"><div class="service-card__media">${image(service.image, `${service.name}, Afro Chic Studio`)}<span class="service-card__tag">${service.short || service.category}</span></div><div class="service-card__body"><h3>${service.name}</h3><p>${service.description}</p><div class="service-card__bottom"><span class="price">${service.price}</span>${action === 'booking' ? `<button class="btn" type="button" data-book-category="${service.category.includes('Maquillage') ? 'Maquillage' : 'Coiffure'}" data-book-service="${service.name}">Réserver</button>` : ''}</div></div></article>`;
}

function bookingFormTemplate(prefix = 'booking') {
  return `<form class="booking-form" data-booking-form>
    <div class="booking-form__row"><div class="field"><label for="${prefix}-name">Nom complet</label><input id="${prefix}-name" name="name" type="text" autocomplete="name" placeholder="Votre nom" required /></div><div class="field"><label for="${prefix}-phone">Numéro WhatsApp</label><input id="${prefix}-phone" name="phone" type="tel" autocomplete="tel" placeholder="+221 77 000 00 00" required /></div></div>
    <div class="booking-form__row"><div class="field"><label for="${prefix}-category">Catégorie</label><select id="${prefix}-category" name="category" data-category-select required><option value="Coiffure">Coiffure</option><option value="Maquillage">Maquillage</option></select></div><div class="field"><label for="${prefix}-service">Prestation</label><select id="${prefix}-service" name="service" data-service-select required></select></div></div>
    <div class="booking-form__row"><div class="field"><label for="${prefix}-date">Date souhaitée</label><input id="${prefix}-date" name="date" type="date" required /></div><div class="field"><label for="${prefix}-time">Heure souhaitée</label><input id="${prefix}-time" name="time" type="time" required /></div></div>
    <div class="field"><label for="${prefix}-notes">Commentaires éventuels</label><textarea id="${prefix}-notes" name="notes" placeholder="Dites-nous ce que vous imaginez..."></textarea></div>
    <button class="btn btn--dark" type="submit">Préparer mon message WhatsApp ↗</button>
    <div class="form-footnote">Votre message s’ouvrira dans WhatsApp. Vous gardez le dernier mot avant l’envoi.</div>
  </form>`;
}

function renderHome() {
  return `${heroTemplate({ eyebrow: 'Studio beauté afro-contemporain', title: 'Votre beauté, en version signature.', text: 'Afro Chic Studio imagine des coiffures et des maquillages qui respectent votre identité, votre rythme et la lumière de chaque occasion.', imageSrc: hairImages.hero, imageAlt: 'Femme africaine aux cheveux naturels, portrait éditorial' })}
  <section class="section section--soft"><div class="container"><div class="intro-strip"><div><div class="eyebrow">Deux univers, une même exigence</div><h2>COIFFURE & MAQUILLAGE : <span class="gold-text">VOTRE BEAUTÉ, NOTRE PASSION</span></h2></div><div><p>Des gestes précis, des matières choisies et une écoute attentive pour vous aider à vous sentir pleinement vous-même.</p><div class="stat-line"><div class="stat"><strong>2</strong><span>univers beauté</span></div><div class="stat"><strong>100%</strong><span>sur mesure</span></div></div></div></div><div class="dual-cards">${dualCard({ label: 'Lignes · textures · confiance', title: 'Coiffure', text: 'Des silhouettes capillaires qui accompagnent vos journées et vos grands moments.', imageSrc: hairImages.braids, imageAlt: 'Femme africaine avec tresses', list: ['Tresses', 'Tissages', 'Perruques', 'Soins capillaires'], href: '/coiffure' })}${dualCard({ label: 'Lumière · harmonie · éclat', title: 'Maquillage', text: 'Une mise en beauté élégante qui révèle ce que vous aimez déjà chez vous.', imageSrc: MAKEUP_IMAGES.softGlam, imageAlt: 'Femme africaine avec maquillage soft glam', list: ['Maquillage naturel', 'Soft Glam', 'Maquillage soirée', 'Maquillage mariée'], href: '/maquillage' })}</div></div></section>
  <section class="section section--cream"><div class="container"><div class="feature-band"><div class="feature-band__image">${image(MAKEUP_IMAGES.natural, 'Maquillage naturel lumineux')}</div><div class="feature-band__copy"><div class="eyebrow">L’art de vous révéler</div><h2>Le luxe, c’est de se sentir juste.</h2><p class="lead">Chaque rendez-vous commence par un échange. Nous adaptons nos gestes à votre visage, votre texture, votre style et l’énergie du moment.</p><div class="feature-points"><div class="feature-point"><strong>01 · Écouter</strong><span>Comprendre votre envie, même quand elle n’est pas encore formulée.</span></div><div class="feature-point"><strong>02 · Composer</strong><span>Créer un look cohérent avec votre personnalité et votre occasion.</span></div><div class="feature-point"><strong>03 · Sublimer</strong><span>Vous laisser repartir avec ce supplément de confiance qui change tout.</span></div><div class="feature-point"><strong>04 · Transmettre</strong><span>Partager des conseils simples pour prolonger votre éclat chez vous.</span></div></div><a class="btn btn--dark" href="/a-propos">Découvrir notre approche ↗</a></div></div></div></section>
  <section class="section section--soft"><div class="narrow" style="text-align:center"><div class="eyebrow">Un premier échange</div><h2>Votre prochain rendez-vous commence ici.</h2><p class="lead" style="margin:0 auto 30px">Dites-nous ce que vous imaginez. Nous vous répondrons avec une proposition claire et personnalisée.</p><button class="btn" type="button" data-open-booking>Prendre rendez-vous ↗</button></div></section>`;
}

function renderCoiffure() {
  return `${heroTemplate({ eyebrow: 'Lignes · textures · confiance', title: 'Coiffure pensée pour vous.', text: 'De la tresse graphique au soin profond, nous créons des silhouettes qui respectent votre cheveu et votre style.', imageSrc: hairImages.hero, imageAlt: 'Portrait de femme africaine aux cheveux texturés', inner: true })}
  <section class="section section--cream"><div class="container"><div class="section__head"><div><div class="eyebrow">Nos signatures coiffure</div><h2>Des textures, des gestes, votre caractère.</h2></div><p class="lead">Un diagnostic simple et un résultat durable, avec l’attention d’un studio à taille humaine.</p></div><div class="service-grid">${hairServices.map((service) => serviceCard(service)).join('')}</div></div></section>
  <section class="section section--soft"><div class="container"><div class="section__head"><div><div class="eyebrow">Extraits du portfolio</div><h2>La beauté se regarde de près.</h2></div><a class="text-link" href="/galerie">Voir toute la galerie</a></div><div class="gallery-grid">${galleryItems.filter((item) => ['Tresses','Tissages','Perruques','Soins capillaires'].includes(item.category)).map((item, index) => `<button class="gallery-item" type="button" data-gallery-index="${galleryItems.indexOf(item)}">${image(item.image, item.title)}<span class="gallery-item__caption"><span>${item.category}</span></span></button>`).join('')}</div></div></section>`;
}

function renderMaquillage() {
  return `${heroTemplate({ eyebrow: 'Maquillage professionnel', title: 'Sublimez votre beauté, révélez votre éclat.', text: 'Des maquillages élégants et personnalisés pour toutes vos occasions.', imageSrc: MAKEUP_IMAGES.natural, imageAlt: 'Femme africaine au maquillage naturel lumineux', inner: true })}
  <section class="section section--cream"><div class="container"><div class="section__head"><div><div class="eyebrow">Cinq façons de vous révéler</div><h2>Votre lumière, notre palette.</h2></div><p class="lead">Du naturel travaillé au glamour assumé, chaque look est pensé pour vous accompagner sans jamais vous déguiser.</p></div><div class="service-grid">${makeupServices.map((service) => serviceCard(service)).join('')}</div><div class="notice">Les tarifs sont indicatifs et peuvent varier selon les besoins de la cliente. Une prestation avec déplacement est également possible, sur devis.</div></div></section>
  <section class="section section--soft"><div class="container"><div class="feature-band"><div class="feature-band__copy"><div class="eyebrow">Le détail qui change tout</div><h2>Un maquillage qui vous ressemble, même en photo.</h2><p class="lead">Nous travaillons la lumière, les textures et les volumes avec une approche délicate, pour que votre mise en beauté reste juste à chaque regard.</p><button class="btn" type="button" data-open-booking data-book-category="Maquillage" data-book-service="Maquillage naturel">Réserver mon maquillage ↗</button></div><div class="feature-band__image">${image(MAKEUP_IMAGES.evening, 'Maquillage soirée glamour')}</div></div></div></section>`;
}

function renderTarifs() {
  const makeupRows = [...makeupServices.map((service) => ({ name: service.name, value: service.price })), { name: 'Maquillage avec déplacement', value: 'Sur devis' }];
  return `<section class="hero hero--inner" style="min-height:480px"><div class="hero__visual">${image(MAKEUP_IMAGES.bridal, 'Mise en beauté mariée')}</div><div class="hero__inner"><div class="hero__copy"><div class="hero__kicker">Des prix clairs, sans surprise</div><h1>Tarifs & prestations.</h1><p class="lead">Des repères simples pour imaginer votre rendez-vous. Chaque projet peut être ajusté ensemble.</p></div></div></section><section class="section section--soft"><div class="container"><div class="price-columns"><div class="price-panel"><div class="eyebrow">Coiffure</div><h3>Cheveux & textures</h3>${hairServices.map((service) => `<div class="price-row"><div><span class="price-row__name">${service.name}</span><span class="price-row__note">Sur consultation</span></div><span class="price-row__value">${service.price.replace('À partir de ', 'Dès ')}</span></div>`).join('')}</div><div class="price-panel price-panel--cream"><div class="eyebrow">Maquillage</div><h3>Éclat & occasion</h3>${makeupRows.map((row) => `<div class="price-row"><div><span class="price-row__name">${row.name}</span><span class="price-row__note">Prestation personnalisée</span></div><span class="price-row__value">${row.value}</span></div>`).join('')}<div class="notice">Les tarifs sont indicatifs et peuvent varier selon les besoins de la cliente.</div></div></div></div></section>`;
}

function renderGallery() {
  const filters = ['Toutes les réalisations', 'Tresses', 'Tissages', 'Perruques', 'Soins capillaires', 'Maquillage naturel', 'Soft Glam', 'Maquillage soirée', 'Maquillage mariée'];
  return `<section class="hero hero--inner" style="min-height:480px"><div class="hero__visual">${image(MAKEUP_IMAGES.event, 'Maquillage événementiel')}</div><div class="hero__inner"><div class="hero__copy"><div class="hero__kicker">Portfolio Afro Chic Studio</div><h1>La beauté en mouvement.</h1><p class="lead">Des textures, des lignes et des lumières capturées avec la même intention : vous mettre en valeur.</p></div></div></section><section class="section section--soft"><div class="container"><div class="section__head"><div><div class="eyebrow">Galerie</div><h2>Un aperçu de nos réalisations.</h2></div><p class="lead">Cliquez sur une image pour l’agrandir.</p></div><div class="filter-bar" role="tablist" aria-label="Filtrer la galerie">${filters.map((filter, index) => `<button class="filter-btn ${index === 0 ? 'is-active' : ''}" type="button" data-filter="${filter}">${filter}</button>`).join('')}</div><div class="gallery-grid" id="gallery-grid">${galleryMarkup(galleryItems)}</div></div></section>`;
}

function galleryMarkup(items) {
  return items.map((item) => `<button class="gallery-item" type="button" data-gallery-image="${item.image}" data-gallery-title="${item.title}" data-gallery-category="${item.category}">${image(item.image, item.title)}<span class="gallery-item__caption"><span>${item.category}</span></span></button>`).join('');
}

function renderAbout() {
  return `<section class="section section--cream" style="padding-top:170px"><div class="container"><div class="about-layout"><div><div class="eyebrow">À propos d’Afro Chic Studio</div><div class="about-quote">“La beauté n’a pas besoin de bruit pour être remarquée.”</div></div><div><h2>Un studio où l’on vient pour soi.</h2><div class="about-copy"><p>Afro Chic Studio est un espace de beauté afro-contemporaine créé pour celles qui veulent se sentir belles sans se conformer à un modèle unique.</p><p>Nous croyons aux gestes précis, aux échanges simples et à une esthétique qui sait rester personnelle. Ici, une tresse, un teint ou une silhouette devient une manière d’habiter sa journée avec plus d’assurance.</p><p>Notre équipe accompagne les rendez-vous du quotidien comme les moments qui comptent : cérémonie, mariage, anniversaire, shooting ou simple envie de se retrouver.</p><p>Le résultat doit être beau en miroir, naturel en mouvement et fidèle à celle que vous êtes.</p></div></div></div><div class="values"><div class="value"><div class="value__number">01</div><h3>Écoute</h3><p>Comprendre votre envie avant de proposer une solution.</p></div><div class="value"><div class="value__number">02</div><h3>Précision</h3><p>Soigner chaque détail, de la texture à la dernière touche de lumière.</p></div><div class="value"><div class="value__number">03</div><h3>Transmission</h3><p>Vous laisser des conseils utiles, pas seulement un beau résultat.</p></div></div></div></section><section class="section section--soft"><div class="narrow" style="text-align:center"><div class="eyebrow">Prête à écrire la suite ?</div><h2>On se rencontre bientôt.</h2><button class="btn" type="button" data-open-booking>Prendre rendez-vous ↗</button></div></section>`;
}

function renderContact() {
  return `<section class="section section--soft" style="padding-top:160px"><div class="container"><div class="contact-layout"><div><div class="eyebrow">Nous trouver · nous écrire</div><h1>Parlons de votre prochain look.</h1><p class="lead">Une question, une date, une idée encore floue ? Écrivez-nous. Nous vous répondrons avec une proposition claire.</p><div class="contact-list"><div class="contact-item"><span>WhatsApp</span><a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noreferrer">+221 77 000 00 00</a></div><div class="contact-item"><span>Instagram</span><strong>@afrochic.studio</strong></div><div class="contact-item"><span>Horaires</span><strong>Mar — Sam · 09h — 19h</strong></div><div class="contact-item"><span>Adresse</span><strong>Dakar · Sur rendez-vous</strong></div></div></div><div class="contact-form-wrap"><div class="eyebrow">Réservation WhatsApp</div><h3>Votre rendez-vous, en quelques lignes.</h3><p>Choisissez une catégorie et une prestation. Le message sera préparé automatiquement, puis vous pourrez l’envoyer vous-même.</p>${bookingFormTemplate('contact')}</div></div></div></section>`;
}

function renderPage() {
  const path = currentPath();
  const pages = { '/': renderHome, '/coiffure': renderCoiffure, '/maquillage': renderMaquillage, '/tarifs': renderTarifs, '/galerie': renderGallery, '/a-propos': renderAbout, '/contact': renderContact };
  const renderer = pages[path] || renderHome;
  app.innerHTML = renderer();
  header.innerHTML = navTemplate();
  footer.innerHTML = footerTemplate();
  document.title = `${path === '/' ? 'Beauté, précision, caractère' : navItems.find((item) => item.href === path)?.label || 'Afro Chic Studio'} — Afro Chic Studio`;
  app.focus({ preventScroll: true });
  attachInteractions();
}

function serviceOptions(category, selected = '') {
  const services = category === 'Maquillage' ? makeupServices : hairServices;
  return services.map((service) => `<option value="${service.name}" ${selected === service.name ? 'selected' : ''}>${service.name}</option>`).join('');
}

function syncBookingForm(form, selectedService = '') {
  const category = form.querySelector('[data-category-select]');
  const service = form.querySelector('[data-service-select]');
  if (!category || !service) return;
  service.innerHTML = serviceOptions(category.value, selectedService || service.value);
}

function openBooking(category = 'Coiffure', service = '') {
  modalFormTarget.innerHTML = bookingFormTemplate('modal');
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  const form = modalFormTarget.querySelector('form');
  form.querySelector('[data-category-select]').value = category;
  syncBookingForm(form, service);
  const date = form.querySelector('input[type="date"]');
  date.min = new Date().toISOString().split('T')[0];
  setTimeout(() => form.querySelector('input[name="name"]').focus(), 80);
}

function closeBooking() {
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
}

function handleBookingSubmit(form) {
  const data = new FormData(form);
  const message = `Bonjour Afro Chic Studio,\n\nJe souhaite prendre rendez-vous.\n\nNom : ${data.get('name')}\nNuméro : ${data.get('phone')}\nCatégorie : ${data.get('category')}\nPrestation : ${data.get('service')}\nDate souhaitée : ${data.get('date')}\nHeure souhaitée : ${data.get('time')}\nCommentaires : ${data.get('notes') || 'Aucun commentaire'}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function showLightbox(index, items = activeGallery) {
  activeGallery = items;
  activeGalleryIndex = Number(index);
  const item = activeGallery[activeGalleryIndex];
  if (!item) return;
  lightboxImage.src = item.image;
  lightboxImage.alt = item.title;
  lightboxCaption.textContent = `${item.title} · ${item.category}`;
  lightbox.hidden = false;
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

function attachInteractions() {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  menuToggle?.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => siteNav.classList.remove('is-open')));
  document.querySelectorAll('[data-open-booking]').forEach((button) => button.addEventListener('click', () => openBooking(button.dataset.bookCategory || 'Coiffure', button.dataset.bookService || '')));
  document.querySelectorAll('[data-book-category]').forEach((button) => button.addEventListener('click', () => openBooking(button.dataset.bookCategory, button.dataset.bookService)));
  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeBooking));
  document.querySelectorAll('[data-booking-form]').forEach((form) => {
    syncBookingForm(form);
    form.querySelector('[data-category-select]')?.addEventListener('change', () => syncBookingForm(form));
    form.addEventListener('submit', (event) => { event.preventDefault(); handleBookingSubmit(form); });
  });
  document.querySelectorAll('input[type="date"]').forEach((input) => { input.min = new Date().toISOString().split('T')[0]; });

  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryGrid = document.querySelector('#gallery-grid');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    const filter = button.dataset.filter;
    activeGallery = filter === 'Toutes les réalisations' ? galleryItems : galleryItems.filter((item) => item.category === filter);
    galleryGrid.innerHTML = galleryMarkup(activeGallery);
    attachGalleryClicks(galleryGrid, activeGallery);
  }));
  attachGalleryClicks(document, galleryItems);
}

function attachGalleryClicks(scope, items) {
  scope.querySelectorAll?.('[data-gallery-index]').forEach((button) => button.addEventListener('click', () => showLightbox(button.dataset.galleryIndex, galleryItems)));
  scope.querySelectorAll?.('[data-gallery-image]').forEach((button) => button.addEventListener('click', () => {
    const itemIndex = items.findIndex((item) => item.image === button.dataset.galleryImage && item.title === button.dataset.galleryTitle);
    showLightbox(itemIndex < 0 ? 0 : itemIndex, items);
  }));
}

document.querySelector('[data-close-lightbox]')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
document.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => showLightbox((activeGalleryIndex - 1 + activeGallery.length) % activeGallery.length));
document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => showLightbox((activeGalleryIndex + 1) % activeGallery.length));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { closeBooking(); closeLightbox(); }
  if (!lightbox.hidden && event.key === 'ArrowLeft') showLightbox((activeGalleryIndex - 1 + activeGallery.length) % activeGallery.length);
  if (!lightbox.hidden && event.key === 'ArrowRight') showLightbox((activeGalleryIndex + 1) % activeGallery.length);
});

renderPage();
