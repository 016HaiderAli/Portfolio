/* ═══════════════════════════════════════════════════════════
   EMAILJS SETUP — fill these in before deploying
   ─────────────────────────────────────────────────────────
   1. Go to https://www.emailjs.com and create a free account
   2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
   3. Create an Email Template → copy the Template ID
      In your template use: {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
   4. Go to Account → API Keys → copy your Public Key
   5. Paste the three values below and remove the notice banner
   ═══════════════════════════════════════════════════════════ */

var EMAILJS_PUBLIC_KEY  = '';   // e.g. 'abc123XYZ'
var EMAILJS_SERVICE_ID  = '';   // e.g. 'service_xxxxxxx'
var EMAILJS_TEMPLATE_ID = '';   // e.g. 'template_xxxxxxx'

var LORE =
    'A Computer Science graduate from Karachi, Pakistan, with a background in customer ' +
    'service and data analysis. Currently focused on frontend development — learning HTML, ' +
    'CSS, JavaScript, and React. Open to opportunities, collaborations, and new challenges.';

/* ─── THEME PICKER ─── */
var currentTheme = localStorage.getItem('smh-theme') || 'dark';

function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-color');
    if (theme === 'light') document.body.classList.add('theme-light');
    if (theme === 'color') document.body.classList.add('theme-color');
    currentTheme = theme;
    localStorage.setItem('smh-theme', theme);

    document.querySelectorAll('.theme-opt').forEach(function(btn) {
        btn.classList.toggle('theme-opt--active', btn.getAttribute('data-theme') === theme);
    });
}

function initThemePicker() {
    applyTheme(currentTheme);
    document.querySelectorAll('.theme-opt').forEach(function(btn) {
        btn.addEventListener('click', function() {
            applyTheme(btn.getAttribute('data-theme'));
        });
    });
}

/* ─── TAB SWITCHING ─── */
function initTabs() {
    var buttons = document.querySelectorAll('.tab-btn');
    var panels  = document.querySelectorAll('.tab-panel');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var target = btn.getAttribute('data-tab');
            buttons.forEach(function(b) { b.classList.remove('tab-active'); });
            panels.forEach(function(p)  { p.classList.remove('tab-panel--active'); });
            btn.classList.add('tab-active');
            var panel = document.getElementById('tab-' + target);
            if (panel) panel.classList.add('tab-panel--active');
            if (target === 'about') setTimeout(animateBars, 100);
        });
    });
}

/* ─── TYPEWRITER ─── */
function runTypewriter(textEl, cursorEl, text, speed) {
    speed = speed || 24;
    var i = 0;
    var tick = setInterval(function() {
        if (i >= text.length) {
            clearInterval(tick);
            setTimeout(function() { cursorEl.style.display = 'none'; }, 1400);
            return;
        }
        textEl.textContent += text[i];
        i++;
    }, speed);
}

/* ─── BAR ANIMATIONS ─── */
function animateBars() {
    document.querySelectorAll('.bar-fill').forEach(function(bar) {
        bar.style.width = '0%';
        var target = bar.getAttribute('data-w');
        if (!target) return;
        setTimeout(function() { bar.style.width = target + '%'; }, 150);
    });
}

/* ─── PARTICLES ─── */
function spawnParticles() {
    var container = document.getElementById('particles');
    if (!container) return;
    for (var i = 0; i < 22; i++) {
        var p = document.createElement('div');
        p.className = 'particle';
        p.style.setProperty('--dur',   (7 + Math.random() * 9).toFixed(2) + 's');
        p.style.setProperty('--delay', (Math.random() * 12).toFixed(2) + 's');
        p.style.setProperty('--drift', ((Math.random() - 0.5) * 130).toFixed(0) + 'px');
        p.style.left = (Math.random() * 100).toFixed(1) + 'vw';
        container.appendChild(p);
    }
}

/* ─── LEVEL BADGE ─── */
function initLevelBadge() {
    var badge = document.getElementById('levelBadge');
    var lvNum = document.getElementById('lvNum');
    if (!badge || !lvNum) return;
    lvNum.style.transition = 'all 0.35s ease';
    badge.addEventListener('click', function() {
        lvNum.style.transform  = 'scale(1.5)';
        lvNum.style.color      = '#ffffff';
        lvNum.style.textShadow = '0 0 24px rgba(240,192,64,1)';
        setTimeout(function() {
            lvNum.style.transform  = '';
            lvNum.style.color      = '';
            lvNum.style.textShadow = '';
        }, 650);
    });
}

/* ─── PORTRAIT TILT ─── */
function initPortraitTilt() {
    var frame = document.getElementById('portraitFrame');
    if (!frame || !window.matchMedia('(pointer: fine)').matches) return;
    frame.addEventListener('mousemove', function(e) {
        var rect = frame.getBoundingClientRect();
        var dx = ((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) * 7;
        var dy = ((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * 7;
        frame.style.transform = 'perspective(600px) rotateY(' + dx + 'deg) rotateX(' + (-dy) + 'deg)';
    });
    frame.addEventListener('mouseleave', function() {
        frame.style.transition = 'transform 0.6s ease';
        frame.style.transform  = '';
        setTimeout(function() { frame.style.transition = ''; }, 650);
    });
}

/* ─── CONTACT FORM (EmailJS) ─── */
function initContactForm() {
    var btn      = document.getElementById('cfSend');
    var feedback = document.getElementById('cfFeedback');
    var notice   = document.getElementById('emailjsNotice');
    if (!btn || !feedback) return;

    // Hide notice banner once credentials are set
    if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        if (notice) notice.classList.add('hidden');
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    btn.addEventListener('click', function() {
        var name    = (document.getElementById('cfName')    || {}).value || '';
        var email   = (document.getElementById('cfEmail')   || {}).value || '';
        var subject = (document.getElementById('cfSubject') || {}).value || '';
        var message = (document.getElementById('cfMsg')     || {}).value || '';

        feedback.style.color = '';
        feedback.textContent = '';

        if (!name.trim() || !email.trim() || !message.trim()) {
            feedback.style.color = 'var(--crimson-hi)';
            feedback.textContent = 'Please fill in your name, email, and message.';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            feedback.style.color = 'var(--crimson-hi)';
            feedback.textContent = 'Please enter a valid email address.';
            return;
        }

        // Check credentials
        if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
            feedback.style.color = 'var(--crimson-hi)';
            feedback.textContent = 'EmailJS is not configured yet. See the comments in index.js.';
            return;
        }

        btn.disabled    = true;
        btn.textContent = 'Sending…';

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            from_name: name.trim(),
            reply_to:  email.trim(),
            subject:   subject.trim() || 'New message from portfolio',
            message:   message.trim()
        }).then(function() {
            feedback.style.color = 'var(--emerald-hi)';
            feedback.textContent = '✓ Message sent! I\'ll get back to you shortly.';
            btn.textContent = 'Sent ✓';
            document.getElementById('cfName').value    = '';
            document.getElementById('cfEmail').value   = '';
            document.getElementById('cfSubject').value = '';
            document.getElementById('cfMsg').value     = '';
        }, function(err) {
            feedback.style.color = 'var(--crimson-hi)';
            feedback.textContent = 'Something went wrong. Please try emailing directly: haiderali_zaidi@outlook.com';
            btn.disabled    = false;
            btn.textContent = 'Send Message';
            console.error('EmailJS error:', err);
        });
    });
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', function() {
    initThemePicker();
    spawnParticles();
    animateBars();
    initTabs();
    initLevelBadge();
    initPortraitTilt();
    initContactForm();

    setTimeout(function() {
        var textEl   = document.getElementById('loreText');
        var cursorEl = document.getElementById('loreCursor');
        if (textEl && cursorEl) runTypewriter(textEl, cursorEl, LORE);
    }, 900);
});
