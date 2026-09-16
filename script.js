/* ==========================================================================
   Sebenza Girl — shared script
   Handles: mobile nav toggle, register-page role switching, 18+ age check.
   No backend is wired up yet — form submissions are intercepted and shown
   as on-page messages until the real payment/verification system is built.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initRoleToggle();
  initRegisterForm();
});

/* --- Mobile nav ---------------------------------------------------------- */

function initNavToggle() {
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.querySelector('[data-nav-links]');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/* --- Register page: worker / employer toggle ----------------------------- */

function initRoleToggle() {
  var buttons = document.querySelectorAll('[data-role-btn]');
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var role = btn.getAttribute('data-role-btn');

      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      document.querySelectorAll('[data-role-fields]').forEach(function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-role-fields') === role);
      });

      var roleInput = document.querySelector('#account-role');
      if (roleInput) roleInput.value = role;
    });
  });
}

/* --- Register page: form validation + 18+ age gate ------------------------ */

function initRegisterForm() {
  var form = document.querySelector('#register-form');
  if (!form) return;

  var message = document.querySelector('#register-message');
  var dobInput = document.querySelector('#dob');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideMessage(message);

    if (dobInput && dobInput.value) {
      var age = calculateAge(dobInput.value);
      if (age < 18) {
        showMessage(message, 'error', "You need to be 18 or older to join Sebenza Girl. We can't create this account.");
        return;
      }
    }

    var terms = document.querySelector('#agree-terms');
    if (terms && !terms.checked) {
      showMessage(message, 'error', 'Please confirm you agree to the terms and verification process before continuing.');
      return;
    }

    // No backend yet — this is where the real signup request will go.
    showMessage(message, 'success', "Details look good. Once payments and verification are live, this will create your account and take you to document upload.");
    form.reset();
    document.querySelectorAll('[data-role-fields]').forEach(function (panel) {
      panel.classList.remove('active');
    });
  });
}

function calculateAge(dobValue) {
  var dob = new Date(dobValue);
  var today = new Date();
  var age = today.getFullYear() - dob.getFullYear();
  var monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

function showMessage(el, type, text) {
  if (!el) return;
  el.textContent = text;
  el.classList.remove('error', 'success');
  el.classList.add('show', type);
}

function hideMessage(el) {
  if (!el) return;
  el.classList.remove('show', 'error', 'success');
}
