'use strict';
// The note is readable without JavaScript. Copying is an enhancement.
const copyStatus = document.getElementById('copy-status');
let toastTimer;

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
    toast('복사했어요. 채팅창에 붙여넣으세요.');
    setTimeout(() => { button.innerHTML = '복사 <span aria-hidden="true">⧉</span>'; }, 2000);
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    toast('선택했어요. 복사 단축키로 가져가세요.');
  }
}));
