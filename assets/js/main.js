(function () {
  const page = document.body.dataset.page;

  if (page === 'create') initCreatePage();
  if (page === 'tracker') initTrackerPage();
  if (page === 'contact') initContactPage();

  function initCreatePage() {
    const form = document.getElementById('goalForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.goalName.value.trim();
      const desc = form.description.value.trim();
      const freq = parseInt(form.frequency.value, 10);
      const importance = form.importance.value;

      if (!name || !freq) {
        alert('Please fill in the required fields.');
        return;
      }

      const goal = {
        id: Date.now(),
        name,
        desc,
        freq,
        importance,
        completed: false,
      };

      const goals = JSON.parse(localStorage.getItem('goals') || '[]');
      goals.push(goal);
      localStorage.setItem('goals', JSON.stringify(goals));

      window.location.href = 'tracker.html';
    });
  }

  function initTrackerPage() {
    const list = document.getElementById('goalList');
    const bar = document.getElementById('progressBar');
    const percentLabel = document.getElementById('progressPercent');
    const resetBtn = document.getElementById('resetBtn');

    let goals = JSON.parse(localStorage.getItem('goals') || '[]');

    function render() {
      list.innerHTML = '';
      goals.forEach((g) => {
        const li = document.createElement('li');
        li.className = 'goal-item';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = g.completed;
        cb.addEventListener('change', () => {
          g.completed = cb.checked;
          localStorage.setItem('goals', JSON.stringify(goals));
          updateProgress();
        });

        const span = document.createElement('span');
        span.textContent = ' ' + g.name;

        li.appendChild(cb);
        li.appendChild(span);
        list.appendChild(li);
      });
      updateProgress();
    }

    function updateProgress() {
      const total = goals.length;
      const completed = goals.filter((g) => g.completed).length;
      const pct = total ? Math.round((completed / total) * 100) : 0;
      bar.style.width = pct + '%';
      percentLabel.textContent = pct + '%';
    }

    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all goals?')) {
        localStorage.removeItem('goals');
        goals = [];
        render();
      }
    });

    render();
  }

  function initContactPage() {
    const form = document.getElementById('contactForm');
    const resp = document.getElementById('contactResponse');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();

      if (!name || !email || !msg) {
        alert('Please fill in all fields.');
        return;
      }

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email.');
        return;
      }

      form.reset();
      resp.classList.remove('hidden');
    });
  }
})();
