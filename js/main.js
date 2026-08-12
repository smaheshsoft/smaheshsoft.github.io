/* Motion layer: scroll reveals, staggered entrances, animated counters.
   Classes are applied from JS so the markup stays clean and the page
   degrades gracefully to fully static content when JS is unavailable. */

(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.add('js');
    if (reduceMotion) {
        document.documentElement.classList.add('reduce-motion');
    }

    /* ---- Header entrance ---------------------------------------------- */

    function stageHeader() {
        var items = document.querySelectorAll(
            '.header h1, .header h2, .header .tagline, .header .location, .header .contact, .header .actions, .header .metric'
        );

        Array.prototype.forEach.call(items, function (el, i) {
            el.classList.add('rise');
            el.style.transitionDelay = (i * 90) + 'ms';
        });

        function show() {
            Array.prototype.forEach.call(items, function (el) {
                el.classList.add('rise-in');
            });
        }

        // Next frame, so the initial state is painted before the transition.
        requestAnimationFrame(function () {
            requestAnimationFrame(show);
        });

        // rAF never fires while the tab is hidden, which would leave the
        // header blank on a background-tab load. Timer fallback guarantees it.
        window.setTimeout(show, 250);
    }

    /* ---- Counters ------------------------------------------------------ */

    // Splits "99.99%" -> {prefix:"", value:99.99, suffix:"%", decimals:2}
    // Returns null for non-numeric labels such as "Multi-Region".
    function parseStat(text) {
        var match = text.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
        if (!match) {
            return null;
        }
        var decimals = (match[2].split('.')[1] || '').length;
        return {
            prefix: match[1],
            value: parseFloat(match[2]),
            suffix: match[3],
            decimals: decimals
        };
    }

    function countUp(el) {
        if (el.dataset.counted) {
            return;
        }
        el.dataset.counted = 'true';

        var stat = parseStat(el.textContent.trim());
        // Hidden tabs don't run rAF, which would freeze the number at zero.
        if (!stat || reduceMotion || document.hidden) {
            return;
        }

        var duration = 1400;
        var start = null;

        function frame(now) {
            if (start === null) {
                start = now;
            }
            var progress = Math.min((now - start) / duration, 1);
            // easeOutExpo
            var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            var current = (stat.value * eased).toFixed(stat.decimals);
            el.textContent = stat.prefix + current + stat.suffix;

            if (progress < 1) {
                requestAnimationFrame(frame);
            }
        }

        el.textContent = stat.prefix + (0).toFixed(stat.decimals) + stat.suffix;
        requestAnimationFrame(frame);
    }

    /* ---- Scroll reveal -------------------------------------------------- */

    var REVEAL_GROUPS = [
        '.section h3',
        '.section-intro',
        '.section > .container > p',
        '.showcase-head p',
        '.skills-grid > div',
        '.competencies li',
        '.project',
        '.role'
    ];

    function markReveals() {
        REVEAL_GROUPS.forEach(function (selector) {
            var nodes = document.querySelectorAll(selector);
            Array.prototype.forEach.call(nodes, function (el, i) {
                if (el.closest('.header')) {
                    return;
                }
                el.classList.add('reveal');
                // Stagger within a group, capped so long lists don't crawl.
                el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
            });
        });
    }

    function observeReveals() {
        var targets = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            Array.prototype.forEach.call(targets, function (el) {
                el.classList.add('reveal-in');
            });
            Array.prototype.forEach.call(
                document.querySelectorAll('.metric strong, .outcome strong'),
                countUp
            );
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('reveal-in');
                Array.prototype.forEach.call(
                    entry.target.querySelectorAll('.outcome strong'),
                    countUp
                );
                observer.unobserve(entry.target);
            });
        // threshold 0 (not a ratio) so panels taller than the viewport, which
        // can never reach a meaningful visible ratio, still trigger.
        }, { threshold: 0, rootMargin: '0px 0px -80px 0px' });

        Array.prototype.forEach.call(targets, function (el) {
            observer.observe(el);
        });

        // Safety net for cases the observer can miss: a fast jump (anchor link,
        // restored scroll position) carrying an element past the viewport, or a
        // background-tab load where observer callbacks are not delivered.
        // Reveals anything that has already entered or passed the viewport.
        function revealSkipped() {
            var limit = window.innerHeight - 80;
            Array.prototype.forEach.call(
                document.querySelectorAll('.reveal:not(.reveal-in)'),
                function (el) {
                    if (el.getBoundingClientRect().top < limit) {
                        el.classList.add('reveal-in');
                        Array.prototype.forEach.call(
                            el.querySelectorAll('.outcome strong'),
                            countUp
                        );
                        observer.unobserve(el);
                    }
                }
            );
        }

        window.addEventListener('scroll', revealSkipped, { passive: true });
        window.addEventListener('resize', revealSkipped);
        window.addEventListener('load', revealSkipped);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) {
                revealSkipped();
            }
        });
    }

    function startHeaderCounters() {
        Array.prototype.forEach.call(
            document.querySelectorAll('.metric strong'),
            function (el, i) {
                window.setTimeout(function () {
                    countUp(el);
                }, 500 + i * 90);
            }
        );
    }

    /* ---- Force a real download for the resume ---------------------------- */

    // The `download` attribute alone is unreliable: browsers ignore it on
    // file:// pages and built-in PDF viewers often open the file instead.
    // Fetching as a blob and clicking an object URL forces a save every time.
    function wireDownload() {
        var link = document.querySelector('a[download]');
        if (!link || typeof fetch !== 'function' || !window.URL || !URL.createObjectURL) {
            return;
        }

        link.addEventListener('click', function (event) {
            // Let the plain link work if fetch can't reach the file (file://).
            if (location.protocol === 'file:') {
                return;
            }

            event.preventDefault();
            var name = link.getAttribute('download') || 'resume.pdf';
            link.classList.add('is-busy');

            fetch(link.href)
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error('HTTP ' + res.status);
                    }
                    return res.blob();
                })
                .then(function (blob) {
                    var url = URL.createObjectURL(blob);
                    var temp = document.createElement('a');
                    temp.href = url;
                    temp.download = name;
                    document.body.appendChild(temp);
                    temp.click();
                    document.body.removeChild(temp);
                    // Revoke once the browser has had time to start the save.
                    window.setTimeout(function () {
                        URL.revokeObjectURL(url);
                    }, 4000);
                })
                .catch(function () {
                    // Network/CORS failure: fall back to normal navigation.
                    window.location.href = link.href;
                })
                .then(function () {
                    link.classList.remove('is-busy');
                });
        });
    }

    function init() {
        markReveals();
        stageHeader();
        wireDownload();
        observeReveals();
        startHeaderCounters();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
