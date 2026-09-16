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
  initUploadBoxes();
  initVerifyForm();
  initWalletTabs();
  initWithdrawForm();
  initAdminDashboard();
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

/* --- Document upload boxes (verify-documents.html) ------------------------ */

function initUploadBoxes() {
  var boxes = document.querySelectorAll('[data-upload-box]');
  if (!boxes.length) return;

  boxes.forEach(function (box) {
    var input = box.querySelector('input[type="file"]');
    var nameEl = box.querySelector('.file-name');
    if (!input) return;

    box.addEventListener('click', function () { input.click(); });

    input.addEventListener('change', function () {
      if (input.files && input.files.length) {
        box.classList.add('has-file');
        if (nameEl) nameEl.textContent = 'Selected: ' + input.files[0].name;
      } else {
        box.classList.remove('has-file');
        if (nameEl) nameEl.textContent = '';
      }
    });
  });
}

/* --- Verification form (verify-documents.html) ---------------------------- */

function initVerifyForm() {
  var form = document.querySelector('#verify-form');
  if (!form) return;

  var message = document.querySelector('#verify-message');
  var statusBadge = document.querySelector('#verify-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideMessage(message);

    var idInput = document.querySelector('#id-document');
    if (idInput && (!idInput.files || !idInput.files.length)) {
      showMessage(message, 'error', 'Please upload your ID document before submitting.');
      return;
    }

    // No backend yet — files aren't actually sent anywhere until the
    // verification service exists. This just simulates the pending state.
    showMessage(message, 'success', "Documents received. We'll email you once they've been reviewed — this usually takes 24 to 48 hours.");
    if (statusBadge) {
      statusBadge.textContent = 'Pending review';
      statusBadge.className = 'badge badge-pending';
    }
    form.querySelectorAll('[data-upload-box]').forEach(function (box) {
      box.classList.remove('has-file');
    });
    form.reset();
  });
}

/* --- Wallet page: tabs ----------------------------------------------------- */

function initWalletTabs() {
  var tabs = document.querySelectorAll('[data-tab-btn]');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab-btn');

      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
        panel.classList.toggle('active', panel.getAttribute('data-tab-panel') === target);
      });
    });
  });
}

/* --- Wallet page: withdraw form -------------------------------------------- */

var MIN_WITHDRAWAL = 200;

function initWithdrawForm() {
  var form = document.querySelector('#withdraw-form');
  if (!form) return;

  var message = document.querySelector('#withdraw-message');
  var amountInput = document.querySelector('#withdraw-amount');
  var availableEl = document.querySelector('[data-available-balance]');
  var available = availableEl ? parseFloat(availableEl.getAttribute('data-available-balance')) : 0;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hideMessage(message);

    var amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      showMessage(message, 'error', 'Enter a valid withdrawal amount.');
      return;
    }
    if (amount < MIN_WITHDRAWAL) {
      showMessage(message, 'error', 'The minimum withdrawal is R' + MIN_WITHDRAWAL + '.00.');
      return;
    }
    if (amount > available) {
      showMessage(message, 'error', "That's more than your available balance of R" + available.toFixed(2) + '.');
      return;
    }

    // No backend/payment gateway yet — this just confirms the request was valid.
    showMessage(message, 'success', 'Withdrawal request for R' + amount.toFixed(2) + " sent. It'll reflect once payouts are live.");
    form.reset();
  });
}

/* --- Admin dashboard --------------------------------------------------------- */

function initAdminDashboard() {
  var releaseButtons = document.querySelectorAll('[data-release-btn]');
  var approveButtons = document.querySelectorAll('[data-approve-btn]');
  var rejectButtons = document.querySelectorAll('[data-reject-btn]');

  releaseButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('tr');
      var statusCell = row.querySelector('[data-status-cell]');
      if (statusCell) {
        statusCell.innerHTML = '<span class="badge badge-approved">Released</span>';
      }
      btn.disabled = true;
      btn.textContent = 'Released';
    });
  });

  approveButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('tr');
      var statusCell = row.querySelector('[data-status-cell]');
      if (statusCell) statusCell.innerHTML = '<span class="badge badge-approved">Approved</span>';
      row.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    });
  });

  rejectButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('tr');
      var statusCell = row.querySelector('[data-status-cell]');
      if (statusCell) statusCell.innerHTML = '<span class="badge badge-rejected">Rejected</span>';
      row.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
    });
  });
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
