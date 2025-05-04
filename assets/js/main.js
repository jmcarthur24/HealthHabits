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
    const addNewBtn = document.querySelector('.actions-container a.btn');
    
    let goals = JSON.parse(localStorage.getItem('goals') || '[]');

    function render() {
      list.innerHTML = '';
      goals.forEach((g) => {
        const li = document.createElement('li');
        li.className = g.completed ? 'goal-item completed' : 'goal-item';

        // Create checkbox
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'goal-checkbox';
        cb.checked = g.completed;
        cb.addEventListener('change', () => {
          g.completed = cb.checked;
          localStorage.setItem('goals', JSON.stringify(goals));
          
          // Update UI immediately
          if (g.completed) {
            li.classList.add('completed');
          } else {
            li.classList.remove('completed');
          }
          
          updateProgress();
        });

        // Create content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'goal-content';

        // Create goal name
        const nameEl = document.createElement('h3');
        nameEl.className = 'goal-name';
        nameEl.textContent = g.name;
        
        // Create description if available
        let descEl = null;
        if (g.desc && g.desc.trim()) {
          descEl = document.createElement('p');
          descEl.className = 'goal-desc';
          descEl.textContent = g.desc;
        }
        
        // Create meta information
        const metaDiv = document.createElement('div');
        metaDiv.className = 'goal-meta';
        
        // Add importance indicator
        if (g.importance) {
          const importanceSpan = document.createElement('span');
          importanceSpan.className = `goal-importance importance-${g.importance.toLowerCase()}`;
          importanceSpan.textContent = g.importance;
          metaDiv.appendChild(importanceSpan);
        }
        
        // Add frequency info if available
        if (g.freq) {
          const freqSpan = document.createElement('span');
          freqSpan.textContent = `${g.freq} times per week`;
          metaDiv.appendChild(freqSpan);
        }

        // Assemble the content
        contentDiv.appendChild(nameEl);
        if (descEl) contentDiv.appendChild(descEl);
        contentDiv.appendChild(metaDiv);

        // Add everything to the list item
        li.appendChild(cb);
        li.appendChild(contentDiv);
        list.appendChild(li);
      });
      updateProgress();
    }

    function updateProgress() {
      const total = goals.length;
      const completed = goals.filter((g) => g.completed).length;
      const pct = total ? Math.round((completed / total) * 100) : 0;
      
      // Animate the progress bar
      bar.style.width = pct + '%';
      
      // Update the percentage text with a slight delay for animation effect
      setTimeout(() => {
        percentLabel.textContent = pct + '%';
      }, 200);
      
      // Add a visual indicator for completion status
      if (pct === 100 && total > 0) {
        percentLabel.style.color = '#00c853';
      } else {
        percentLabel.style.color = '#333';
      }
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
