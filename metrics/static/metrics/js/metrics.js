// Animar barras de progreso y porcentajes al entrar en viewport
(function () {
    const bars = document.querySelectorAll('.progress-animate');
    const percents = document.querySelectorAll('.percent');
  
    const barObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.percent || '0', 10);
        el.style.width = target + '%';
        el.setAttribute('aria-valuenow', target);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });
  
    bars.forEach(b => {
      b.style.width = '0%'; // estado inicial
      barObserver.observe(b);
    });
  
    // Números de porcentaje (85%, 90%, etc.)
    const percentObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const span = entry.target;
        const target = parseInt(span.dataset.percent || '0', 10);
        animateCount(span, target, 900);
        obs.unobserve(span);
      });
    }, { threshold: 0.6 });
    percents.forEach(p => percentObserver.observe(p));
  
    // Contadores grandes (años, proyectos, etc.)
    const counters = document.querySelectorAll('.count-up');
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const to = parseInt(el.dataset.countTo || '0', 10);
        animateCount(el, to, 1200);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  
    function animateCount(el, to, duration) {
      const start = 0;
      const startTime = performance.now();
      const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  
      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const value = Math.round(start + (to - start) * eased);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  })();
  