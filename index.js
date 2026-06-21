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

var EMAILJS_PUBLIC_KEY  = 'B_WUxBQ7r873qqwjz';   // e.g. 'abc123XYZ'
var EMAILJS_SERVICE_ID  = 'service_grmq7t6';   // e.g. 'service_xxxxxxx'
var EMAILJS_TEMPLATE_ID = 'template_4q661kc';   // e.g. 'template_xxxxxxx'

var LORE =
    'A Computer Science graduate from Karachi, Pakistan, with a background in customer ' +
    'service and data analysis. Currently focused on frontend development — learning HTML, ' +
    'CSS, JavaScript, and React. Open to opportunities, collaborations, and new challenges.';

/* ─── THEME PICKER ─── */
var currentTheme = localStorage.getItem('smh-theme') || 'dark';

var THEME_META = {
    dark:    { icon: '🌙', label: 'Dark' },
    light:   { icon: '☀',  label: 'Light' },
    color:   { icon: '◈',  label: 'Night Owl' },
    phantom: { icon: '♠',  label: 'Phantom' },
    shield:  { icon: '🛡', label: 'Shield' }
};

function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-color', 'theme-phantom', 'theme-shield');
    if (theme === 'light')   document.body.classList.add('theme-light');
    if (theme === 'color')   document.body.classList.add('theme-color');
    if (theme === 'phantom') document.body.classList.add('theme-phantom');
    if (theme === 'shield')  document.body.classList.add('theme-shield');
    currentTheme = theme;
    localStorage.setItem('smh-theme', theme);

    var meta = THEME_META[theme] || THEME_META.dark;
    var iconEl  = document.getElementById('themeTriggerIcon');
    var labelEl = document.getElementById('themeTriggerLabel');
    if (iconEl)  iconEl.textContent  = meta.icon;
    if (labelEl) labelEl.textContent = meta.label;

    document.querySelectorAll('.theme-menu-item').forEach(function(btn) {
        btn.classList.toggle('theme-menu-item--active', btn.getAttribute('data-theme') === theme);
    });
}

function initThemePicker() {
    applyTheme(currentTheme);

    var dropdown = document.getElementById('themeDropdown');
    var trigger  = document.getElementById('themeTrigger');
    if (!dropdown || !trigger) return;

    function closeMenu() {
        dropdown.classList.remove('theme-dropdown--open');
        trigger.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu() {
        var isOpen = dropdown.classList.toggle('theme-dropdown--open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    document.querySelectorAll('.theme-menu-item').forEach(function(btn) {
        btn.addEventListener('click', function() {
            applyTheme(btn.getAttribute('data-theme'));
            closeMenu();
        });
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
}

/* ─── TAB SWITCHING ─── */
function switchTab(target) {
    var buttons = document.querySelectorAll('.tab-btn');
    var panels  = document.querySelectorAll('.tab-panel');
    buttons.forEach(function(b) { b.classList.remove('tab-active'); });
    panels.forEach(function(p)  { p.classList.remove('tab-panel--active'); });
    var btn = document.querySelector('.tab-btn[data-tab="' + target + '"]');
    if (btn) btn.classList.add('tab-active');
    var panel = document.getElementById('tab-' + target);
    if (panel) panel.classList.add('tab-panel--active');
    if (target === 'about') setTimeout(animateBars, 100);
}

function initTabs() {
    var buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            switchTab(btn.getAttribute('data-tab'));
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
        if (typeof emailjs !== 'undefined') {
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        }
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
        if (typeof emailjs === 'undefined') {
            feedback.style.color = 'var(--crimson-hi)';
            feedback.textContent = 'Message service unavailable right now — please email directly: haiderali_zaidi@outlook.com';
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

/* ─── VOICE SHOWROOM ─── */
var currentAudio    = null;
var currentPlayBtn  = null;
var currentCard     = null;
var currentRAF      = null;

var audioCtx        = null;   // shared AudioContext (created on first user gesture)
var analyserMap     = new Map(); // audio element -> { analyser, source, dataArray }

function getAudioContext() {
    if (!audioCtx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (AC) audioCtx = new AC();
    }
    return audioCtx;
}

function getAnalyserFor(audio) {
    if (analyserMap.has(audio)) return analyserMap.get(audio);
    var ctx = getAudioContext();
    if (!ctx) return null;
    try {
        var source   = ctx.createMediaElementSource(audio);
        var analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.75;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        var dataArray = new Uint8Array(analyser.frequencyBinCount);
        var entry = { analyser: analyser, dataArray: dataArray };
        analyserMap.set(audio, entry);
        return entry;
    } catch (err) {
        console.warn('Web Audio analyser unavailable:', err);
        return null;
    }
}

/* Draw sharp, high-contrast vertical bars — mirrored top/bottom, Persona-style */
function drawBars(canvas, heights, playing) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    var barCount = heights.length;
    var gap = 3;
    var barWidth = (w - gap * (barCount - 1)) / barCount;
    var midY = h / 2;
    var capH = Math.max(2, h * 0.045);

    for (var i = 0; i < barCount; i++) {
        var amp = heights[i];                 // 0..1
        var barH = Math.max(2, amp * (h * 0.92));
        var x = i * (barWidth + gap);

        // Idle bars: soft neutral white/gray. Playing bars: white base that warms
        // into the site's gold accent at higher amplitude — calmer than a full
        // gold→orange→red ramp, and reads cleanly on the dark waveform background.
        var hot = amp > 0.6;
        var barColor = playing
            ? (hot ? '#f0c040' /* gold-hi, "played"/peak accent */ : 'rgba(232,230,224,0.78)')
            : 'rgba(232,230,224,0.22)';
        ctx.fillStyle = barColor;

        // top half
        ctx.fillRect(x, midY - barH / 2, barWidth, barH / 2);
        // bottom half (mirrored, slightly dimmer)
        ctx.globalAlpha = 0.55;
        ctx.fillRect(x, midY, barWidth, barH / 2);
        ctx.globalAlpha = 1;

        // Bright gold peak cap at the tip of each bar when playing and amplitude is
        // meaningful — keeps a single warm accent colour rather than a multi-hue ramp
        if (playing && amp > 0.08) {
            ctx.fillStyle = hot ? '#f0c040' : '#ffffff';
            ctx.fillRect(x, midY - barH / 2 - capH * 0.4, barWidth, capH);
            ctx.fillRect(x, midY + barH / 2 - capH * 0.6, barWidth, capH);
        }
    }
}

/* Idle animation: gentle synthetic shimmer so empty/paused cards still feel alive */
function drawIdle(canvas, t) {
    var barCount = 28;
    var heights = [];
    for (var i = 0; i < barCount; i++) {
        var v = 0.08 + 0.05 * Math.sin(t / 600 + i * 0.6);
        heights.push(Math.max(0.04, v));
    }
    drawBars(canvas, heights, false);
}

/* Real playback animation: read live frequency data, with a synthetic fallback
   if the audio file is missing/can't decode (so the UI still looks correct). */
function animateWaveform(card, audio) {
    var canvas = card.querySelector('.waveform-canvas');
    if (!canvas) return;
    syncCanvasSize(canvas);

    var barCount = 28;
    var entry = getAnalyserFor(audio);

    function tick(t) {
        if (currentAudio !== audio) return; // stopped/switched — halt this loop

        var heights = [];
        if (entry) {
            entry.analyser.getByteFrequencyData(entry.dataArray);
            var bins = entry.dataArray.length;
            var step = bins / barCount;
            for (var i = 0; i < barCount; i++) {
                var idx = Math.floor(i * step);
                heights.push(entry.dataArray[idx] / 255);
            }
        } else {
            // Fallback: synthetic but energetic motion so it still reads as "live"
            for (var i = 0; i < barCount; i++) {
                var v = 0.25 + 0.65 * Math.abs(Math.sin(t / 140 + i * 0.45)) * Math.random();
                heights.push(Math.min(1, v));
            }
        }

        drawBars(canvas, heights, true);
        currentRAF = requestAnimationFrame(tick);
    }
    currentRAF = requestAnimationFrame(tick);
}

function stopCurrentAudio() {
    if (currentRAF) {
        cancelAnimationFrame(currentRAF);
        currentRAF = null;
    }
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    if (currentPlayBtn) {
        currentPlayBtn.classList.remove('play-btn--playing');
        var playIcon  = currentPlayBtn.querySelector('.icon-play');
        var pauseIcon = currentPlayBtn.querySelector('.icon-pause');
        if (playIcon)  playIcon.style.display  = '';
        if (pauseIcon) pauseIcon.style.display = 'none';
    }
    if (currentCard) {
        currentCard.classList.remove('voice-card--playing');
        var canvas = currentCard.querySelector('.waveform-canvas');
        if (canvas) drawBars(canvas, new Array(28).fill(0.05), false);
    }
    currentAudio   = null;
    currentPlayBtn = null;
    currentCard    = null;
}

/* Keep canvas backing resolution crisp at any rendered width (HiDPI aware) */
function syncCanvasSize(canvas) {
    var rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    var dpr = window.devicePixelRatio || 1;
    var targetW = Math.round(rect.width * dpr);
    var targetH = Math.round(rect.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width  = targetW;
        canvas.height = targetH;
    }
}

function initVoiceShowroom() {
    // Idle shimmer for every card's canvas before anything plays
    var idleStart = performance.now();
    function idleLoop(now) {
        document.querySelectorAll('.voice-card:not(.voice-card--playing) .waveform-canvas').forEach(function(canvas) {
            syncCanvasSize(canvas);
            drawIdle(canvas, now - idleStart);
        });
        requestAnimationFrame(idleLoop);
    }
    requestAnimationFrame(idleLoop);

    var playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(function(btn) {
        var audioId = btn.getAttribute('data-audio');
        var audio   = document.getElementById(audioId);
        if (!audio) return;

        var card      = btn.closest('.voice-card');
        var playIcon  = btn.querySelector('.icon-play');
        var pauseIcon = btn.querySelector('.icon-pause');

        btn.addEventListener('click', function() {
            var ctx = getAudioContext();
            if (ctx && ctx.state === 'suspended') ctx.resume();

            // If this audio is already playing, pause it
            if (currentAudio === audio && !audio.paused) {
                stopCurrentAudio();
                return;
            }
            // Stop whatever else is playing first
            stopCurrentAudio();

            audio.play().then(function() {
                currentAudio   = audio;
                currentPlayBtn = btn;
                currentCard    = card;
                btn.classList.add('play-btn--playing');
                if (card) card.classList.add('voice-card--playing');
                if (playIcon)  playIcon.style.display  = 'none';
                if (pauseIcon) pauseIcon.style.display = '';
                animateWaveform(card, audio);
            }).catch(function(err) {
                console.warn('Audio could not play (sample may be missing):', audioId, err);
                // Still show a brief "live" animation so the showroom feels functional
                currentAudio   = audio;
                currentPlayBtn = btn;
                currentCard    = card;
                btn.classList.add('play-btn--playing');
                if (card) card.classList.add('voice-card--playing');
                if (playIcon)  playIcon.style.display  = 'none';
                if (pauseIcon) pauseIcon.style.display = '';
                animateWaveform(card, audio);
                setTimeout(function() {
                    if (currentAudio === audio) stopCurrentAudio();
                }, 3500);
            });
        });

        audio.addEventListener('ended', function() {
            if (currentAudio === audio) stopCurrentAudio();
        });
    });

    // Language filters
    var filterButtons = document.querySelectorAll('.filter-btn');
    var voiceCards     = document.querySelectorAll('.voice-card');

    filterButtons.forEach(function(fbtn) {
        fbtn.addEventListener('click', function() {
            var lang = fbtn.getAttribute('data-lang');

            filterButtons.forEach(function(b) { b.classList.remove('filter-btn--active'); });
            fbtn.classList.add('filter-btn--active');

            voiceCards.forEach(function(card) {
                var matches = (lang === 'all') || (card.getAttribute('data-lang') === lang);
                card.classList.toggle('voice-card--hidden', !matches);
            });

            // Stop playback if the playing card just got hidden
            if (currentCard && currentCard.classList.contains('voice-card--hidden')) {
                stopCurrentAudio();
            }
        });
    });
}

/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', function() {
    var inits = [initThemePicker, spawnParticles, animateBars, initTabs, initPortraitTilt, initContactForm, initVoiceShowroom];
    inits.forEach(function(fn) {
        try { fn(); } catch (err) { console.error('Init failed:', fn.name, err); }
    });

    setTimeout(function() {
        var textEl   = document.getElementById('loreText');
        var cursorEl = document.getElementById('loreCursor');
        if (textEl && cursorEl) runTypewriter(textEl, cursorEl, LORE);
    }, 900);
});
