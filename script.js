document.getElementById('year').textContent = new Date().getFullYear();

const profilePhoto = document.getElementById('profilePhoto');
const portraitFrame = document.getElementById('portraitFrame');

if (profilePhoto && portraitFrame) {
  profilePhoto.addEventListener('error', () => {
    profilePhoto.style.display = 'none';
    portraitFrame.classList.add('photo-fallback');
  });
}
