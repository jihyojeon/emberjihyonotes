'use strict';
// This guide is readable without JavaScript. Search and copying are enhancements.
const searchInput = document.getElementById('command-search');
const cards = [...document.querySelectorAll('.command-card')];
const groups = [...document.querySelectorAll('.command-group')];
const scopeButtons = [...document.querySelectorAll('[data-scope]')];
const clearSearch = document.getElementById('clear-search');
const resultCount = document.getElementById('result-count');
const emptyResults = document.getElementById('empty-results');
const copyStatus = document.getElementById('copy-status');
let scope = 'all';
let toastTimer;

function applyFilters() {
  const query = searchInput.value.trim().toLocaleLowerCase('ko');
  const terms = query.split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    const text = card.dataset.search.toLocaleLowerCase('ko');
    const inScope = scope === 'all' || (scope === 'top' && card.dataset.top === 'true') || (scope === 'removed' && card.dataset.kind === 'removed');
    card.hidden = !(inScope && terms.every(term => text.includes(term)));
    if (!card.hidden) count += 1;
  }
  for (const group of groups) {
    const visible = [...group.querySelectorAll('.command-card')].filter(card => !card.hidden).length;
    group.hidden = visible === 0;
    group.querySelector('.group-count').textContent = `${visible}개`;
    const nav = document.querySelector(`[data-nav-group="${group.dataset.group}"]`);
    nav.classList.toggle('is-dim', visible === 0);
    nav.querySelector('small').textContent = String(visible);
  }
  for (const button of scopeButtons) button.setAttribute('aria-pressed', String(button.dataset.scope === scope));
  resultCount.textContent = `${count}개 항목`;
  emptyResults.hidden = count !== 0;
  clearSearch.hidden = query.length === 0;
}

searchInput.addEventListener('input', applyFilters);
clearSearch.addEventListener('click', () => { searchInput.value = ''; applyFilters(); searchInput.focus(); });
scopeButtons.forEach(button => button.addEventListener('click', () => { scope = button.dataset.scope; applyFilters(); }));

// A table-of-contents link always opens its target, even after filtering.
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  const target = document.getElementById(link.hash.slice(1));
  if (target && (target.hidden || target.closest('[hidden]'))) {
    searchInput.value = '';
    scope = 'all';
    applyFilters();
  }
}));

function toast(message) {
  clearTimeout(toastTimer);
  copyStatus.textContent = message;
  copyStatus.classList.add('is-visible');
  toastTimer = setTimeout(() => copyStatus.classList.remove('is-visible'), 2300);
}

document.querySelectorAll('.copy-example').forEach(button => button.addEventListener('click', async () => {
  const code = document.getElementById(button.dataset.copy);
  try {
    await navigator.clipboard.writeText(code.textContent);
    button.textContent = '복사됨 ✓';
    toast('입력 예시를 복사했어요. 필요한 내용은 바꿔서 사용하세요.');
    setTimeout(() => { button.innerHTML = '복사 <span aria-hidden="true">⧉</span>'; }, 2000);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    toast('예시를 선택했어요. 복사 단축키로 가져가세요.');
  }
}));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(items => {
    for (const item of items) {
      if (!item.isIntersecting) continue;
      document.querySelectorAll('[data-nav-group]').forEach(link => link.classList.toggle('is-current', link.dataset.navGroup === item.target.dataset.group));
    }
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  groups.forEach(group => observer.observe(group));
}
