document.getElementById('year').textContent = new Date().getFullYear();

const profilePhoto = document.getElementById('profilePhoto');
const portraitFrame = document.getElementById('portraitFrame');

if (profilePhoto && portraitFrame) {
  profilePhoto.addEventListener('error', () => {
    profilePhoto.style.display = 'none';
    portraitFrame.classList.add('photo-fallback');
  });
}

const copyEmailBtn = document.getElementById('copyEmailBtn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const email = copyEmailBtn.getAttribute('data-email');
    const originalText = copyEmailBtn.textContent;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyEmailBtn.textContent = originalText;
      }, 2000);
    } catch (err) {
      copyEmailBtn.textContent = email;
    }
  });
}
