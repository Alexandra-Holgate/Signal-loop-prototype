const form = document.getElementById('signalForm');
const resetBtn = document.getElementById('resetBtn');
const checkInBtn = document.getElementById('checkInBtn');

const result = document.getElementById('result');
const error = document.getElementById('error');
const resultTitle = document.getElementById('resultTitle');
const scoreValue = document.getElementById('scoreValue');
const resultMessage = document.getElementById('resultMessage');
const progressText = document.getElementById('progressText');

function getAnsweredCount() {
  return document.querySelectorAll('#signalForm input[type="radio"]:checked').length;
}

function updateUIState() {
  const answered = getAnsweredCount();
  const allAnswered = answered === 4;

  if (checkInBtn) checkInBtn.disabled = !allAnswered;
  if (progressText) {
    progressText.textContent = allAnswered
      ? 'Ready to check in.'
      : `Answered ${answered}/4 questions.`;
  }
}

  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');
  const q3 = document.querySelector('input[name="q3"]:checked');
  const q4 = document.querySelector('input[name="q4"]:checked');

  if (!q1 || !q2 || !q3 || !q4) {
    error.classList.add('show');
    result.classList.remove('show');
    updateUIState();
    return;
  }

  error.classList.remove('show');
function handleCheckIn() {
  if (checkInBtn) {
    const originalText = checkInBtn.textContent;
    checkInBtn.textContent = 'Calculating...';
    checkInBtn.disabled = true;
    setTimeout(() => {
      checkInBtn.textContent = originalText;
      updateUIState();
    }, 300);
  }
  const total =
    parseInt(q1.value, 10) +
    parseInt(q2.value, 10) +
    parseInt(q3.value, 10) +
    parseInt(q4.value, 10);

  const score = Math.round(((total - 4) / 16) * 100);
  displayResult(score);
}

function displayResult(score) {
  scoreValue.textContent = score + '/100';
  result.classList.remove('low', 'moderate', 'strong');

  if (score <= 39) {
    result.classList.add('low');
    resultTitle.textContent = 'Low Signal';
    resultMessage.textContent =
      'Your mental state indicates you may benefit from rest and recovery. Consider taking breaks, getting quality sleep, and engaging in restorative activities. This is a signal to prioritize self-care.';
  } else if (score <= 69) {
    result.classList.add('moderate');
    resultTitle.textContent = 'Moderate Signal';
    resultMessage.textContent =
      "You're in a stable mental state. Focus on maintaining your current routines and energy levels. Small adjustments to your schedule or activities can help optimize your performance.";
  } else {
    result.classList.add('strong');
    resultTitle.textContent = 'Strong Signal';
    resultMessage.textContent =
      "Excellent mental state! You're experiencing good clarity, focus, and energy. This is a great time for challenging tasks and important decisions. Keep up the practices that are working for you.";
  }

  result.classList.add('show');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (checkInBtn) checkInBtn.addEventListener('click', handleCheckIn);

if (resetBtn) {
  resetBtn.addEventListener('click', function () {
    form.reset();
    result.classList.remove('show');
    error.classList.remove('show');
    updateUIState();
  });
}

if (form) form.addEventListener('change', updateUIState);

// Run once on load
updateUIState();
