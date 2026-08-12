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

var voiceCategories = [
    {
        id: 'character',
        title: 'Character Voices',
        description: 'Strong, expressive character work for distinct anime roles.',
        representative: {
            id: 'audio-voice6',
            name: 'Goku',
            gender: 'Male',
            lang: 'en',
            avatar: 'voice-avatar--h',
            desc: 'Warm, easygoing hero voice with strong presence.',
            src: 'audio/goku.mp3'
        },
        items: [
            {
                id: 'audio-voice2',
                name: 'Senku Ishigami',
                gender: 'Male',
                lang: 'en',
                avatar: 'voice-avatar--c',
                desc: 'Rapid-fire, analytical delivery with restless genius energy.',
                src: 'audio/senku.mp3'
            },
            {
                id: 'audio-voice6',
                name: 'Goku',
                gender: 'Male',
                lang: 'en',
                avatar: 'voice-avatar--h',
                desc: 'Warm, easygoing hero voice — endlessly optimistic.',
                src: 'audio/goku.mp3'
            },
            {
                id: 'audio-voice7',
                name: 'Ayanokoji',
                gender: 'Male',
                lang: 'en',
                avatar: 'voice-avatar--b',
                desc: 'Calm, calculating delivery with quiet menace.',
                src: 'audio/ayanokoji.mp3'
            }
        ]
    },
    {
        id: 'dramatic',
        title: 'Dramatic Range',
        description: 'Commanding reads and intense performance samples.',
        representative: {
            id: 'audio-voice3',
            name: 'Vegeta — Take 1',
            gender: 'Male',
            lang: 'en',
            avatar: 'voice-avatar--g',
            desc: 'Proud, commanding Saiyan-prince tone with restrained fury.',
            src: 'audio/vegeta_take1.mp3'
        },
        items: [
            {
                id: 'audio-voice3',
                name: 'Vegeta — Take 1',
                gender: 'Male',
                lang: 'en',
                avatar: 'voice-avatar--g',
                desc: 'Proud, commanding Saiyan-prince tone — full of restrained fury.',
                src: 'audio/vegeta_take1.mp3'
            },
            {
                id: 'audio-voice4',
                name: 'Vegeta — Take 2',
                gender: 'Male',
                lang: 'en',
                avatar: 'voice-avatar--g',
                desc: 'Alternate take — a touch more controlled, theatrical menace.',
                src: 'audio/vegeta_take2.mp3'
            },
            {
                id: 'audio-voice5',
                name: 'Yami Sukehiro',
                gender: 'Male',
                lang: 'en',
                avatar: 'voice-avatar--d',
                desc: 'Gruff, larger-than-life captain energy with a streak of dry humor.',
                src: 'audio/yami.mp3'
            }
        ]
    },
    {
        id: 'jp',
        title: 'Japanese Voices',
        description: 'A strong Japanese demo with crisp delivery and presence.',
        representative: {
            id: 'audio-voice1',
            name: 'Iori',
            gender: 'Male',
            lang: 'jp',
            avatar: 'voice-avatar--a',
            desc: 'Sharp-edged intensity with a brooding undertone.',
            src: 'audio/iori.mp3'
        },
        items: [
            {
                id: 'audio-voice1',
                name: 'Iori',
                gender: 'Male',
                lang: 'jp',
                avatar: 'voice-avatar--a',
                desc: 'Sharp-edged intensity with a brooding undertone — built for rival and antagonist roles.',
                src: 'audio/iori.mp3'
            }
        ]
    },
    {
        id: 'ur',
        title: 'Urdu Tribute',
        description: 'Expressive Urdu narration and tribute-style performance.',
        representative: {
            id: 'audio-voice8',
            name: 'Zia Mohiuddin — Tribute',
            gender: 'Male',
            lang: 'ur',
            avatar: 'voice-avatar--f',
            desc: 'A tribute reading with rich timbre and deliberate pacing.',
            src: 'audio/zia.mp3'
        },
        items: [
            {
                id: 'audio-voice8',
                name: 'Zia Mohiuddin — Tribute',
                gender: 'Male',
                lang: 'ur',
                avatar: 'voice-avatar--f',
                desc: 'A tribute reading in the classic, theatrical style of Urdu narration.',
                src: 'audio/zia.mp3'
            }
        ]
    }
];

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
        currentAudio.removeEventListener('ended', onVoiceAudioEnded);
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

function getVoiceLanguages() {
    var groups = {};
    voiceCategories.forEach(function(category) {
        category.items.forEach(function(item) {
            var lang = item.lang || 'en';
            if (!groups[lang]) {
                groups[lang] = { lang: lang, label: getLanguageLabel(lang), items: [], representative: item };
            }
            groups[lang].items.push(item);
        });
    });
    return Object.keys(groups).sort().map(function(lang) { return groups[lang]; });
}

function getLanguageLabel(lang) {
    var map = { en: 'English', jp: 'Japanese', ur: 'Urdu' };
    return map[lang] || lang.toUpperCase();
}

function renderVoiceMenu(root, activeLanguage) {
    var languages = getVoiceLanguages();
    var nav = document.createElement('div');
    nav.className = 'section-category-menu voice-language-menu';

    var overviewButton = document.createElement('button');
    overviewButton.type = 'button';
    overviewButton.className = 'filter-btn' + (!activeLanguage ? ' filter-btn--active' : '');
    overviewButton.textContent = 'Overview';
    overviewButton.setAttribute('data-voice-lang', '');
    overviewButton.addEventListener('click', function() {
        renderVoiceShowroom();
    });
    overviewButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            overviewButton.click();
        }
    });
    nav.appendChild(overviewButton);

    languages.forEach(function(group) {
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'filter-btn' + (activeLanguage === group.lang ? ' filter-btn--active' : '');
        button.textContent = group.label;
        button.setAttribute('data-voice-lang', group.lang);
        button.addEventListener('click', function() {
            renderVoiceShowroom(group.lang);
        });
        button.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                button.click();
            }
        });
        nav.appendChild(button);
    });
    root.appendChild(nav);
    return nav;
}

function renderVoiceShowroom(language) {
    var root = document.getElementById('voicesBody');
    if (!root) return;
    stopCurrentAudio();
    root.innerHTML = '';

    renderVoiceMenu(root, language);
    if (!language) {
        renderVoiceShowroomOverview(root);
        return;
    }

    renderVoiceLanguageView(root, language);
}

function renderVoiceShowroomOverview(root) {
    var languages = getVoiceLanguages();
    var categoryGrid = document.createElement('div');
    categoryGrid.className = 'voice-grid';

    languages.forEach(function(group) {
        var item = group.representative || group.items[0];
        var card = document.createElement('div');
        card.className = 'collection-card design-category-panel';
        card.innerHTML =
            '<div class="collection-thumb voice-category-hero ' + item.avatar + '">' +
                '<div class="voice-category-hero-text">' + group.label + '</div>' +
            '</div>' +
            '<div class="collection-meta collection-category-meta">' +
                '<div class="collection-title">' + item.name + '</div>' +
                '<div class="collection-desc">' + (item.desc || 'Representative voice sample.') + '</div>' +
            '</div>' +
            '<div class="collection-category-footer">' +
                '<button class="cta-btn cta-btn--secondary voice-explore-btn" type="button" data-voice-lang="' + group.lang + '">Explore More</button>' +
            '</div>';
        card.tabIndex = 0;
        card.setAttribute('role', 'group');
        card.setAttribute('aria-label', group.label + ' representative voice sample');
        categoryGrid.appendChild(card);
    });
    root.appendChild(categoryGrid);

    root.querySelectorAll('.voice-explore-btn').forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            renderVoiceShowroom(btn.getAttribute('data-voice-lang'));
        });
    });
}

function renderVoiceLanguageView(root, language) {
    var languageLabel = getLanguageLabel(language);
    var headerBar = document.createElement('div');
    headerBar.className = 'designs-category-header';
    headerBar.innerHTML =
        '<div><div class="panel-label">' + languageLabel + '</div>' +
        '<p class="designs-overview-copy">Voice samples performed in ' + languageLabel + '.</p></div>';
    root.appendChild(headerBar);

    var languageItems = [];
    voiceCategories.forEach(function(cat) {
        cat.items.forEach(function(item) {
            if ((item.lang || 'en') === language) languageItems.push(item);
        });
    });

    var grid = document.createElement('div');
    grid.className = 'voice-grid';
    languageItems.forEach(function(item) {
        grid.appendChild(createVoiceCard(item));
    });
    root.appendChild(grid);

    wireVoiceShowroomInteractions(root);
}

function wireVoiceShowroomInteractions(root) {
    root.querySelectorAll('.play-btn').forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            var audioId = btn.getAttribute('data-audio');
            var audio = document.getElementById(audioId);
            if (!audio) return;
            if (currentAudio === audio && !audio.paused) {
                stopCurrentAudio();
                return;
            }
            if (currentAudio !== audio) {
                stopCurrentAudio();
            }
            playVoiceAudio(audio, btn);
        });
        btn.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                btn.click();
            }
        });
    });
}

function playVoiceAudio(audio, btn) {
    var card = btn.closest('.voice-card');
    if (!card) return;
    currentAudio = audio;
    currentPlayBtn = btn;
    currentCard = card;

    currentAudio.currentTime = 0;
    currentAudio.play().catch(function(err) {
        console.warn('Audio playback failed:', err);
    });

    currentPlayBtn.classList.add('play-btn--playing');
    var playIcon = currentPlayBtn.querySelector('.icon-play');
    var pauseIcon = currentPlayBtn.querySelector('.icon-pause');
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = '';
    currentCard.classList.add('voice-card--playing');
    currentAudio.addEventListener('ended', onVoiceAudioEnded);
    animateWaveform(currentCard, currentAudio);
}

function onVoiceAudioEnded() {
    stopCurrentAudio();
}

function createVoiceCard(item) {
    var card = document.createElement('div');
    card.className = 'voice-card';
    card.setAttribute('data-lang', item.lang || 'en');
    if (item.gender) card.setAttribute('data-gender', item.gender);

    var tags = '';
    if (item.gender) {
        tags += '<span class="voice-tag voice-tag--' + item.gender + '">' + item.gender.toUpperCase() + '</span>';
    }
    if (item.lang) {
        tags += '<span class="voice-tag voice-tag--lang">' + getLanguageLabel(item.lang) + '</span>';
    }

    card.innerHTML =
        '<div class="voice-card-top">' +
            '<button class="play-btn" type="button" data-audio="' + item.id + '">' +
                '<span class="icon-play">▶</span>' +
                '<span class="icon-pause" style="display:none;">❚❚</span>' +
            '</button>' +
            '<div class="voice-avatar ' + item.avatar + '">' +
                '<svg class="avatar-svg" viewBox="0 0 64 64" aria-hidden="true">' +
                    '<circle class="avatar-head" cx="32" cy="24" r="12"></circle>' +
                    '<path class="avatar-body" d="M18 54c0-11 14-16 14-16s14 5 14 16"></path>' +
                '</svg>' +
            '</div>' +
            '<div class="voice-info">' +
                '<div class="voice-name">' + item.name + '</div>' +
                '<div class="voice-tags">' + tags + '</div>' +
            '</div>' +
        '</div>' +
        '<div class="voice-desc">' + item.desc + '</div>' +
        '<div class="waveform"><canvas class="waveform-canvas"></canvas></div>' +
        '<audio id="' + item.id + '" preload="metadata" src="' + item.src + '"></audio>';
    return card;
}

function initVoiceShowroom() {
    renderVoiceShowroom();
}


/* ─── PROJECT PREVIEW LIGHTBOX ─── */
function initProjectLightbox() {
    var lightbox = document.getElementById('projectLightbox');
    var image = document.getElementById('projectLightboxImage');
    var title = document.getElementById('projectLightboxTitle');
    var triggers = document.querySelectorAll('.project-preview-trigger');
    if (!lightbox || !image || !title || !triggers.length) return;

    var lastTrigger = null;
    var closeButton = lightbox.querySelector('.project-lightbox-close');

    function openLightbox(trigger) {
        lastTrigger = trigger;
        image.src = trigger.getAttribute('data-preview');
        image.alt = trigger.querySelector('img').alt + ', enlarged';
        title.textContent = trigger.getAttribute('data-title') || 'Project preview';
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        if (closeButton) closeButton.focus();
    }

    function closeLightbox() {
        if (lightbox.hidden) return;
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        image.removeAttribute('src');
        var origin = _designGallery.origin || lastTrigger;
        if (origin && typeof origin.focus === 'function') origin.focus();
    }

    triggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() { openLightbox(trigger); });
    });
    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function(control) {
        control.addEventListener('click', closeLightbox);
    });
    document.addEventListener('keydown', function(event) {
        if (!lightbox.hidden && event.key === 'Escape') closeLightbox();
    });
}
/* ─── DESIGNS: data + renderer + gallery (lightbox reuse) ─── */
var designCollections = (function(){
    // Minimal curated mapping using existing files/paths. Do not invent names beyond folder names.
    var featured = [
        {
            id: 'verde-vox',
            title: 'Verde & Vox',
            category: 'brand',
            thumb: 'Designs/Facebook Page/verde_vox_cover.png',
            images: [
                'Designs/Facebook Page/verde_vox_cover.png',
                'Designs/Facebook Page/verde_vox_cover_v2.png',
                'Designs/Facebook Page/Product/verde_vox_products.png',
                'Designs/Facebook Page/Services/verde_vox_services.png'
            ]
        },
        {
            id: 'posters',
            title: 'Event Posters',
            category: 'posters',
            thumb: 'Designs/banner 1.png',
            images: ['Designs/banner 1.png', 'Designs/banner 2.png']
        },
        {
            id: 'chiyo',
            title: 'Chiyo Hasegawa',
            category: 'character',
            thumb: 'Designs/Characters/Female/Chiyo Hasegawa/742595115_2013999562570733_2535034951756441059_n.webp',
            images: [
                'Designs/Characters/Female/Chiyo Hasegawa/742595115_2013999562570733_2535034951756441059_n.webp',
                'Designs/Characters/Female/Chiyo Hasegawa/743876907_2671124996670136_7424888259407388777_n.webp',
                'Designs/Characters/Female/Chiyo Hasegawa/743975622_2011243832930811_4446370254502320946_n.webp',
                'Designs/Characters/Female/Chiyo Hasegawa/744871645_1830132437957156_3658017279455869438_n.webp'
            ]
        },
        {
            id: 'elena-von-frost',
            title: 'Elena Von Frost',
            category: 'character',
            thumb: 'Designs/Characters/Female/Elena Von Frost/743294888_1032141315973841_1833661607249819752_n.webp',
            images: [
                'Designs/Characters/Female/Elena Von Frost/743294888_1032141315973841_1833661607249819752_n.webp',
                'Designs/Characters/Female/Elena Von Frost/743658597_2005661743486786_6618689110123020700_n.webp',
                'Designs/Characters/Female/Elena Von Frost/743658598_1897519601204669_8253609318779722943_n.webp'
            ]
        }
    ];

    // Character collections (female)
    var characters = [];
    function c(title, gender, images){ return { title: title, category: 'character', gender: gender, thumb: images[0], images: images }; }
    characters.push(c('Aoi Hyuga','female',['Designs/Characters/Female/Aoi Hyuga/742895947_1385592976765553_2624286101846084300_n.webp']));
    characters.push(c('Aria Wintervale','female',['Designs/Characters/Female/Aria Wintervale/745963030_1057185257248710_8910329466598719949_n.webp']));
    characters.push(c('Chiyo Hasegawa','female',[
        'Designs/Characters/Female/Chiyo Hasegawa/742595115_2013999562570733_2535034951756441059_n.webp',
        'Designs/Characters/Female/Chiyo Hasegawa/743876907_2671124996670136_7424888259407388777_n.webp',
        'Designs/Characters/Female/Chiyo Hasegawa/743975622_2011243832930811_4446370254502320946_n.webp',
        'Designs/Characters/Female/Chiyo Hasegawa/744871645_1830132437957156_3658017279455869438_n.webp'
    ]));
    characters.push(c('Dr. Chloe Briefs','female',['Designs/Characters/Female/Dr. Chloe Briefs/745236009_1047081897764582_4624251467596767529_n.webp']));
    characters.push(c('Elena Streetwear','female',['Designs/Characters/Female/Elena Streetwear/744028252_1530174225244732_209950973273693377_n.webp']));
    characters.push(c('Elena Von Frost','female',[
        'Designs/Characters/Female/Elena Von Frost/743294888_1032141315973841_1833661607249819752_n.webp',
        'Designs/Characters/Female/Elena Von Frost/743658597_2005661743486786_6618689110123020700_n.webp',
        'Designs/Characters/Female/Elena Von Frost/743658598_1897519601204669_8253609318779722943_n.webp'
    ]));
    characters.push(c('Hanami Amamiya','female',[
        'Designs/Characters/Female/Hanami Amamiya/743910361_874679245287638_7232273282339501457_n.webp',
        'Designs/Characters/Female/Hanami Amamiya/745699558_1787971902569589_5069391773441226765_n.webp',
        'Designs/Characters/Female/Hanami Amamiya/745811959_2024276861526289_2846542302957758994_n.webp'
    ]));
    characters.push(c('Kaguya Kamashiro','female',[
        'Designs/Characters/Female/Kaguya Kamishiro/743910304_1731185044871838_285929992113146515_n.webp',
        'Designs/Characters/Female/Kaguya Kamishiro/744916581_1331839892481979_8442628133724593311_n.webp',
        'Designs/Characters/Female/Kaguya Kamishiro/745842904_995538903349416_7859887445472433039_n.webp'
    ]));
    characters.push(c('Mashiro Shiina','female',['Designs/Characters/Female/Mashiro Shiina/743831108_2208298393299416_6064071140822820803_n.webp']));
    characters.push(c('Mei Taniguchi','female',['Designs/Characters/Female/Mei Taniguchi/743337449_998781083147949_5504208825731023370_n.webp']));
    characters.push(c('Mia Beatrice','female',[
        'Designs/Characters/Female/Mia Beatrice/743519262_4552927308270054_3468436454848627875_n.webp',
        'Designs/Characters/Female/Mia Beatrice/745442069_2297653310969581_6581872201286740500_n.webp'
    ]));
    characters.push(c('Naomi Kurosawa','female',[
        'Designs/Characters/Female/Naomi Kurosawa/743252216_2487872738341862_187836809156717611_n.webp',
        'Designs/Characters/Female/Naomi Kurosawa/743777425_1135005705564961_4768213313390879000_n.webp',
        'Designs/Characters/Female/Naomi Kurosawa/746129983_1306761881224823_2822629013295711567_n.webp'
    ]));
    characters.push(c('Rin Obsidian','female',['Designs/Characters/Female/Rin Obsidian/743942268_1051274234528666_1067472134890240986_n.webp']));
    characters.push(c('Sakura Yamashita','female',[
        'Designs/Characters/Female/Sakura Yamashita/743374520_1081503777536507_1080025850658274100_n.webp',
        'Designs/Characters/Female/Sakura Yamashita/743744343_1525214425168942_4981426030848893650_n.webp',
        'Designs/Characters/Female/Sakura Yamashita/744994410_1356040976494553_4247337962983676503_n.webp'
    ]));
    characters.push(c('Saya Kirishima','female',[
        'Designs/Characters/Female/Saya Kirishima/744141547_1469747701539615_3979156764876769459_n.webp',
        'Designs/Characters/Female/Saya Kirishima/745962333_738509726022721_2107370196181454875_n.webp',
        'Designs/Characters/Female/Saya Kirishima/746430221_1972019643471665_6588373553605959626_n.webp'
    ]));
    characters.push(c('Sumi Ryuzaki','female',['Designs/Characters/Female/Sumi Ryuzaki/745623570_1996490957706329_7208469394841710552_n.webp']));
    characters.push(c('Valeria Heiden','female',[
        'Designs/Characters/Female/Valeria Heiden/743744343_1338452221179549_310146937647607211_n.webp',
        'Designs/Characters/Female/Valeria Heiden/744662109_904765739345044_915746669594526253_n.webp',
        'Designs/Characters/Female/Valeria Heiden/745700076_1059413893324131_4732678049358301990_n.webp'
    ]));
    characters.push(c('Yuki Natsuki','female',[
        'Designs/Characters/Female/Yuki Natsuki/743824533_2642167392847362_474393668460536825_n.webp',
        'Designs/Characters/Female/Yuki Natsuki/743876911_2781505552221588_3333849916352039213_n.webp',
        'Designs/Characters/Female/Yuki Natsuki/744251015_2602871216796656_8274576055559904740_n.webp'
    ]));
    characters.push(c('Yukino Shimizugawa','female',[
        'Designs/Characters/Female/Yukino Shimizugawa/743386967_1731669994821089_3637561312862698363_n.webp',
        'Designs/Characters/Female/Yukino Shimizugawa/743831109_1655529438867556_4202720225084818628_n.webp',
        'Designs/Characters/Female/Yukino Shimizugawa/745010846_1894172548206136_6025606864418641739_n.webp'
    ]));

    // Male
    characters.push(c('Daichi Hoshino','male',['Designs/Characters/Male/Daichi Hoshino/743942013_1052146620492387_2798549637356535414_n.webp']));
    characters.push(c('Edward Vance','male',['Designs/Characters/Male/Edward Vance/745442081_1658057211919626_5709088196971414020_n.webp']));
    characters.push(c('Haru Kazamatsuri','male',['Designs/Characters/Male/Haru Kazamatsuri/744441086_1043611751934597_7033989997254944643_n.webp']));
    characters.push(c('Kaito Shiranui','male',['Designs/Characters/Male/Kaito Shiranui/745685916_3803613619779648_9171751017150860821_n.webp']));
    characters.push(c('Kenji Sakamoto','male',['Designs/Characters/Male/Kenji Sakamoto/745907814_1858546301583237_534372479314217888_n.webp']));
    characters.push(c('Mason Cross','male',['Designs/Characters/Male/Mason Cross/743453188_963957683340215_6197388719828422242_n.webp']));
    characters.push(c('Professor Mohsin Ali','male',['Designs/Characters/Male/Professor Mohsin Ali/742737457_1706783700627420_6110479904942362590_n.webp']));
    characters.push(c('Ren Kurogane','male',['Designs/Characters/Male/Ren Kurogane/743294770_970047316065115_7247279608439556866_n.webp']));
    characters.push(c('Ryoto Asahina','male',['Designs/Characters/Male/Ryoto Asahina/743942336_955157000876863_7366250834735019521_n.webp']));
    characters.push(c('Shin Yamioka','male',['Designs/Characters/Male/Shin Yamioka/743910363_26823801053959983_1173863682148781318_n.webp']));
    characters.push(c('Takahiro Fuyuki','male',['Designs/Characters/Male/Takahiro Fuyuki/743484569_998664589827227_3365945058780097945_n.webp']));
    characters.push(c('Takuya Aokaze','male',['Designs/Characters/Male/Takuya Aokaze/744393535_2077570300303562_4621681877157302047_n.webp']));

    return { featured: featured, characters: characters, posters: [
        { title: 'Banner 1', images: ['Designs/banner 1.png'] },
        { title: 'Banner 2', images: ['Designs/banner 2.png'] }
    ], brand: [
        {
            title: 'Cover / Branding',
            thumb: 'Designs/Facebook Page/verde_vox_cover.png',
            images: [
                'Designs/Facebook Page/verde_vox_cover.png',
                'Designs/Facebook Page/verde_vox_cover_v2.png'
            ]
        },
        {
            title: 'Product Graphics',
            thumb: 'Designs/Facebook Page/Product/verde_vox_products.png',
            images: [
                'Designs/Facebook Page/Product/verde_vox_products.png',
                'Designs/Facebook Page/Product/verde_vox_products_v2.png'
            ]
        },
        {
            title: 'Services Visuals',
            thumb: 'Designs/Facebook Page/Services/verde_vox_services.png',
            images: [
                'Designs/Facebook Page/Services/verde_vox_services.png',
                'Designs/Facebook Page/Services/verde_vox_services_v2.png'
            ]
        }
    ], others: [
        // standalone images located at Designs/Characters root
        'Designs/Characters/749681359_1536787898184091_7047852270637956622_n.webp',
        'Designs/Characters/750582771_27189732667376543_8461086335633752284_n.webp',
        'Designs/Characters/750594016_1340291571107049_7731474203414684640_n.webp',
        'Designs/Characters/751361402_1351598889741903_711867693589138624_n.webp',
        'Designs/Characters/751833348_864199993176550_8332769955125735401_n.webp',
        'Designs/Characters/751915277_1679276063134374_1378750589070879999_n.webp',
        'Designs/Characters/752807535_37767661309491857_3232856807823720215_n.webp',
        'Designs/Characters/752854742_2120328822201915_7942031417406172189_n.webp'
    ] };
})();

// Gallery state
var _designGallery = { images: [], index: 0, origin: null };

function initDesigns() {
    try { renderDesignsTab(); } catch (e) { console.error('Designs init failed', e); }
}

function getDesignCategories() {
    return [
        {
            id: 'posters',
            title: 'Posters & Banners',
            thumb: 'Designs/banner 1.png',
            desc: 'Bold promotional layouts and event banners.'
        },
        {
            id: 'brand',
            title: 'Facebook / Social',
            thumb: 'Designs/Facebook Page/verde_vox_cover.png',
            desc: 'Branded social graphics and campaign identity work.'
        },
        {
            id: 'character',
            title: 'Character Design',
            thumb: 'Designs/Characters/Female/Chiyo Hasegawa/742595115_2013999562570733_2535034951756441059_n.webp',
            desc: 'Featured character portraits and concept art.'
        },
        {
            id: 'others',
            title: 'Other Explorations',
            thumb: 'Designs/Characters/749681359_1536787898184091_7047852270637956622_n.webp',
            desc: 'Experimental artwork and standalone visuals.'
        }
    ];
}

function renderDesignsTab(categoryId) {
    var root = document.getElementById('designsContent');
    if (!root) return;
    root.innerHTML = '';

    if (!categoryId) {
        renderDesignsOverview(root);
        return;
    }

    renderDesignCategory(root, categoryId);
}

function renderDesignsNav(root, activeCategoryId) {
    var categories = getDesignCategories();
    var overviewNav = document.createElement('div');
    overviewNav.className = 'section-category-menu';

    var overviewButton = document.createElement('button');
    overviewButton.type = 'button';
    overviewButton.className = 'filter-btn' + (!activeCategoryId ? ' filter-btn--active' : '');
    overviewButton.textContent = 'Overview';
    overviewButton.addEventListener('click', function() {
        renderDesignsTab();
    });
    overviewButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            overviewButton.click();
        }
    });
    overviewNav.appendChild(overviewButton);

    categories.forEach(function(cat) {
        var navButton = document.createElement('button');
        navButton.type = 'button';
        navButton.className = 'filter-btn' + (cat.id === activeCategoryId ? ' filter-btn--active' : '');
        navButton.textContent = cat.title;
        navButton.addEventListener('click', function() {
            renderDesignsTab(cat.id);
        });
        navButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navButton.click();
            }
        });
        overviewNav.appendChild(navButton);
    });

    root.appendChild(overviewNav);
}

function renderDesignsOverview(root) {
    renderDesignsNav(root);
    var categories = getDesignCategories();

    var categoryGrid = document.createElement('div');
    categoryGrid.className = 'designs-grid category-grid';

    categories.forEach(function(cat) {
        var card = document.createElement('div');
        card.className = 'collection-card design-category-panel';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Explore ' + cat.title);
        card.innerHTML =
            '<div class="collection-thumb"><img loading="lazy" src="' + cat.thumb + '" alt="' + cat.title + '"></div>' +
            '<div class="collection-meta collection-category-meta">' +
                '<div class="collection-title">' + cat.title + '</div>' +
                '<div class="collection-desc">' + cat.desc + '</div>' +
            '</div>' +
            '<div class="collection-category-footer">' +
                '<button class="cta-btn cta-btn--secondary design-explore-btn" type="button" data-design-category="' + cat.id + '">Explore More</button>' +
            '</div>';
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.querySelector('.design-explore-btn').click();
            }
        });
        categoryGrid.appendChild(card);
    });
    root.appendChild(categoryGrid);

    root.querySelectorAll('.design-explore-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            renderDesignsTab(btn.getAttribute('data-design-category'));
        });
    });
}

function renderDesignCategory(root, categoryId) {
    renderDesignsNav(root, categoryId);

    var titleMap = {
        brand: 'Facebook / Social',
        character: 'Character Design',
        posters: 'Posters & Banners',
        others: 'Other Explorations'
    };
    var descMap = {
        brand: 'Visual identity systems, campaign assets, and social storytelling.',
        character: 'Character concepts, portrait studies, and curated fan art.',
        posters: 'Poster design, event promotion, and typography-led layouts.',
        others: 'Creative explorations and visual experiments.'
    };

    var headerBar = document.createElement('div');
    headerBar.className = 'designs-category-header';
    headerBar.innerHTML =
        '<div><div class="panel-label">' + (titleMap[categoryId] || 'Designs') + '</div>' +
        '<p class="designs-overview-copy">' + (descMap[categoryId] || '') + '</p></div>';
    root.appendChild(headerBar);

    if (categoryId === 'character') {
        var charGrid = document.createElement('div');
        charGrid.className = 'designs-grid';
        designCollections.characters.forEach(function(c) {
            var card = document.createElement('div');
            card.className = 'collection-card design-character-card';
            card.dataset.gender = (c.gender || '').toLowerCase();
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Open ' + c.title + ' gallery');
            card.innerHTML =
                '<div class="collection-thumb"><img loading="lazy" src="' + c.thumb + '" alt="' + c.title + '"></div>' +
                '<div class="collection-meta collection-category-meta"><div class="collection-title">' + c.title + '</div></div>';
            card.addEventListener('click', function() { openDesignGallery(c.images, c.title, 0); });
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDesignGallery(c.images, c.title, 0);
                }
            });
            charGrid.appendChild(card);
        });

        var filterWrap = document.createElement('div');
        filterWrap.className = 'language-filters designs-filter-row';

        function updateCharacterFilter(filter) {
            filterWrap.querySelectorAll('.filter-btn').forEach(function(b) {
                b.classList.toggle('filter-btn--active', b.getAttribute('data-filter') === filter);
            });
            charGrid.querySelectorAll('.design-character-card').forEach(function(card) {
                var gender = (card.dataset.gender || '').toLowerCase();
                var show = filter === 'all' || gender === filter;
                card.classList.toggle('character-card--hidden', !show);
            });
        }

        ['all','female','male'].forEach(function(f) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'filter-btn';
            btn.setAttribute('data-filter', f);
            btn.textContent = f.toUpperCase();
            btn.addEventListener('click', function() {
                updateCharacterFilter(f);
            });
            filterWrap.appendChild(btn);
        });

        root.appendChild(filterWrap);
        root.appendChild(charGrid);
        updateCharacterFilter('all');
        return;
    }

    var collectionGrid = document.createElement('div');
    collectionGrid.className = 'designs-grid';
    var collectionItems = designCollections[categoryId] || [];

    if (categoryId === 'others') {
        collectionItems.forEach(function(src) {
            var card = document.createElement('div');
            card.className = 'collection-card design-character-card';
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Open exploration gallery');
            card.innerHTML =
                '<div class="collection-thumb"><img loading="lazy" src="' + src + '" alt="Exploration"></div>' +
                '<div class="collection-meta collection-category-meta"><div class="collection-title">Exploration</div></div>';
            card.addEventListener('click', function() { openDesignGallery([src], 'Exploration', 0); });
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDesignGallery([src], 'Exploration', 0);
                }
            });
            collectionGrid.appendChild(card);
        });
    } else {
        collectionItems.forEach(function(item) {
            var card = document.createElement('div');
            card.className = 'collection-card design-character-card';
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'Open ' + (item.title || 'design') + ' gallery');
            var thumb = item.images && item.images[0] ? item.images[0] : '';
            card.innerHTML =
                '<div class="collection-thumb"><img loading="lazy" src="' + thumb + '" alt="' + (item.title || 'Design') + '"></div>' +
                '<div class="collection-meta collection-category-meta"><div class="collection-title">' + (item.title || 'Design') + '</div></div>';
            card.addEventListener('click', function() { openDesignGallery(item.images || [thumb], item.title || 'Design', 0); });
            card.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openDesignGallery(item.images || [thumb], item.title || 'Design', 0);
                }
            });
            collectionGrid.appendChild(card);
        });
    }
    root.appendChild(collectionGrid);
}

function openDesignGallery(images, title, startIndex) {
    var lb = document.getElementById('projectLightbox');
    var imgEl = document.getElementById('projectLightboxImage');
    var titleEl = document.getElementById('projectLightboxTitle');
    var captionEl = document.getElementById('projectLightboxCaption');
    var prevBtn = document.querySelector('.project-lightbox-prev');
    var nextBtn = document.querySelector('.project-lightbox-next');
    if (!lb || !imgEl) return;
    _designGallery.images = images || [];
    _designGallery.index = startIndex || 0;
    _designGallery.origin = document.activeElement;
    titleEl.textContent = title || 'Gallery';
    captionEl.textContent = (_designGallery.index + 1) + ' / ' + _designGallery.images.length;
    imgEl.src = _designGallery.images[_designGallery.index] || '';
    lb.hidden = false;
    document.body.classList.add('lightbox-open');
    if (prevBtn) {
        prevBtn.style.visibility = _designGallery.images.length > 1 ? 'visible' : 'hidden';
    }
    if (nextBtn) {
        nextBtn.style.visibility = _designGallery.images.length > 1 ? 'visible' : 'hidden';
    }
    var closeBtn = lb.querySelector('[data-lightbox-close]');
    if (closeBtn) closeBtn.focus();
}

function updateGallery(delta) {
    if (!_designGallery.images.length) return;
    _designGallery.index = (_designGallery.index + delta + _designGallery.images.length) % _designGallery.images.length;
    var imgEl = document.getElementById('projectLightboxImage');
    var captionEl = document.getElementById('projectLightboxCaption');
    imgEl.src = _designGallery.images[_designGallery.index];
    captionEl.textContent = (_designGallery.index + 1) + ' / ' + _designGallery.images.length;
}

// wire gallery controls (prev/next) using delegated listeners so init order doesn't matter
document.addEventListener('click', function(e){
    if (e.target.closest('.project-lightbox-prev')) { updateGallery(-1); }
    if (e.target.closest('.project-lightbox-next')) { updateGallery(1); }
});
document.addEventListener('keydown', function(e){
    var lb = document.getElementById('projectLightbox'); if (!lb || lb.hidden) return;
    if (e.key === 'ArrowLeft') { updateGallery(-1); }
    if (e.key === 'ArrowRight') { updateGallery(1); }
});
/* ─── BOOT ─── */
document.addEventListener('DOMContentLoaded', function() {
    var inits = [initThemePicker, spawnParticles, animateBars, initTabs, initPortraitTilt, initContactForm, initVoiceShowroom, initDesigns, initProjectLightbox];
    inits.forEach(function(fn) {
        try { fn(); } catch (err) { console.error('Init failed:', fn.name, err); }
    });

    setTimeout(function() {
        var textEl   = document.getElementById('loreText');
        var cursorEl = document.getElementById('loreCursor');
        if (textEl && cursorEl) runTypewriter(textEl, cursorEl, LORE);
    }, 900);
});
