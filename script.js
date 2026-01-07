
document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.getElementById('navToggle');
	const primaryNav = document.getElementById('primaryNav');
	const yearEl = document.getElementById('year');

	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Mobile Menu Logic
	if (navToggle && primaryNav) {
		navToggle.addEventListener('click', function (e) {
			e.stopPropagation();
			constexpanded = this.getAttribute('aria-expanded') === 'true';
			this.setAttribute('aria-expanded', String(!expanded));
			primaryNav.classList.toggle('show');
		});

		// Close clicking outside
		document.addEventListener('click', function (e) {
			if (!primaryNav.contains(e.target) && !navToggle.contains(e.target) && primaryNav.classList.contains('show')) {
				primaryNav.classList.remove('show');
				navToggle.setAttribute('aria-expanded', 'false');
			}
		});

		// Close on link click
		primaryNav.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				primaryNav.classList.remove('show');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	// Internal Links Smooth Scroll
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', function (e) {
			const targetId = this.getAttribute('href');
			if (targetId.length > 1) {
				e.preventDefault();
				const target = document.querySelector(targetId);
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			}
		});
	});

	// Scroll Animations (IntersectionObserver)
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	const fadeElements = document.querySelectorAll('.fade-in-up');
	fadeElements.forEach(el => observer.observe(el));

	// Copy Email Logic
	const copyBtn = document.getElementById('copyEmailBtn');
	const mailtoLink = document.getElementById('mailtoLink');

	if (copyBtn && mailtoLink) {
		copyBtn.addEventListener('click', function (e) {
			e.preventDefault();
			const email = mailtoLink.getAttribute('href').replace('mailto:', '');

			navigator.clipboard.writeText(email).then(() => {
				const original = copyBtn.textContent;
				copyBtn.textContent = '¡Copiado!';
				copyBtn.classList.add('primary');
				copyBtn.classList.remove('outline');

				setTimeout(() => {
					copyBtn.textContent = original;
					copyBtn.classList.remove('primary');
					copyBtn.classList.add('outline');
				}, 2000);
			}).catch(err => {
				console.error('Failed to copy text: ', err);
			});
		});
	}
});

