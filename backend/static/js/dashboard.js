// Star rating
document.querySelectorAll('.star-rating').forEach(ratingEl => {
  const stars = ratingEl.querySelectorAll('.star');
  const input = ratingEl.querySelector('input[type=hidden]');

  stars.forEach((star, i) => {
    star.addEventListener('click', () => {
      if (input) input.value = i + 1;
      stars.forEach((s, j) => s.classList.toggle('active', j <= i));
    });
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, j) => s.classList.toggle('active', j <= i));
    });
  });

  ratingEl.addEventListener('mouseleave', () => {
    const val = input ? parseInt(input.value) || 0 : 0;
    stars.forEach((s, j) => s.classList.toggle('active', j < val));
  });
});

// File upload preview (for upload-box elements with inline file inputs)
document.querySelectorAll('.upload-box').forEach(box => {
  const fileInput = box.querySelector('input[type=file]');
  const label = box.querySelector('.upload-box-label');
  if (!fileInput) return;
  box.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) {
      if (label) label.textContent = fileInput.files[0].name;
      box.style.borderColor = '#22c55e';
    }
  });
});
