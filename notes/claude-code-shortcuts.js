(() => {
  const input = document.querySelector('#shortcut-search');
  const cards = [...document.querySelectorAll('.shortcut-card')];
  const groups = [...document.querySelectorAll('.shortcut-group')];
  const filters = [...document.querySelectorAll('[data-scope]')];
  const clear = document.querySelector('#clear-search');
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#empty-results');
  let scope = 'all';
  const normalize = value => value.normalize('NFKC').toLowerCase().replace(/control/g, 'ctrl').replace(/escape/g, 'esc').replace(/\s+/g, ' ').trim();
  const searchText = new Map(cards.map(card => [card, normalize(card.closest('section').querySelector('h2').textContent + ' ' + card.textContent)]));
  function update() {
    const query = normalize(input.value).split(' ').filter(Boolean);
    let shown = 0;
    for (const card of cards) {
      const inScope = scope === 'all' || (scope === 'top' && card.dataset.top === 'true') || (scope === 'vim' && card.dataset.vim === 'true');
      card.hidden = !inScope || !query.every(term => searchText.get(card).includes(term));
      if (!card.hidden) shown++;
    }
    for (const group of groups) {
      group.hidden = ![...group.querySelectorAll('.shortcut-card')].some(card => !card.hidden);
      document.querySelector(`.guide-sidebar a[href="#${group.id}"]`)?.classList.toggle('is-dim', group.hidden);
    }
    count.textContent = `${shown}개 사용 상황`;
    empty.hidden = shown !== 0;
    clear.hidden = !input.value;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scope === scope)));
  }
  filters.forEach(button => button.addEventListener('click', () => { scope = button.dataset.scope; update(); }));
  input.addEventListener('input', update);
  clear.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  function revealHash() {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.matches('.shortcut-card, .shortcut-group') && (target.hidden || target.closest('.shortcut-group')?.hidden)) {
      scope = 'all'; input.value = ''; update();
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    }
  }
  window.addEventListener('hashchange', revealHash);
  // A heading in the sidebar can already be the current hash while hidden by a filter.
  document.querySelectorAll('a[href^="#key-"], a[href^="#group-"]').forEach(link => link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target?.hidden || target?.closest('.shortcut-group')?.hidden) {
      scope = 'all'; input.value = ''; update();
      requestAnimationFrame(() => target?.scrollIntoView({ block: 'start' }));
    }
  }));
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const text = document.getElementById(button.dataset.copy).textContent;
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = '복사했어요';
      status.textContent = '설정 예시를 복사했어요.';
      status.classList.add('is-visible');
      setTimeout(() => { button.textContent = '복사'; status.classList.remove('is-visible'); }, 1800);
    } catch {
      status.textContent = '자동 복사가 안 돼요. 예시를 선택해서 복사해주세요.';
      status.classList.add('is-visible');
    }
  }));
  update(); revealHash();
})();
