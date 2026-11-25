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


// Ensure live screenshot previews fall back cleanly if an external screenshot endpoint fails or returns a blank placeholder
document.querySelectorAll('.project-visual').forEach((card) => {
  const domainEl = card.querySelector('.browser-top small');
  if (!domainEl) return;
  const text = domainEl.textContent.trim();
  if (!text.includes('.')) return;
  const cleanDomain = text.split(' ')[0];
  const url = cleanDomain.startsWith('http') ? cleanDomain : `https://${cleanDomain}/`;
  const localMap = {
    'websitedesigners.com.au': 'assets/websitedesigners.jpg',
    'bpd.warrendigital.com.au': 'assets/bpd.jpg',
    'outdoorlivinghq.com.au': 'assets/outdoorlivinghq.jpg',
    'uniquepergolas.com.au': 'assets/uniquepergolas.jpg',
    'majesticglass.com.au': 'assets/majesticglass.jpg',
    'monacoelectrical.au': 'assets/monacoelectrical.jpg',
    'highdentalimplantsmelbourne.com.au': 'assets/highdental.jpg'
  };
  if (localMap[cleanDomain]) {
    const img = new Image();
    img.onload = () => {
      card.style.setProperty('--project-image', `url('${localMap[cleanDomain]}')`);
    };
    img.onerror = () => {
      const mshot = new Image();
      mshot.onload = () => {
        if (mshot.naturalWidth > 400) {
          card.style.setProperty('--project-image', `url('${mshot.src}')`);
        }
      };
      mshot.src = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1280`;
    };
    img.src = localMap[cleanDomain];
  }
});
