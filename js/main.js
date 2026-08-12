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
            '.header h1, .header h2, .header .tagline, .header .location, .header .contact, .header .metric'
        );

        Array.prototype.forEach.call(items, function (el, i) {
            el.classList.add('rise');
            el.style.transitionDelay = (i * 90) + 'ms';
        });

        // Next frame, so the initial state is painted before the transition.
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                Array.prototype.forEach.call(items, function (el) {
                    el.classList.add('rise-in');
                });
            });
        });
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
        if (!stat || reduceMotion) {
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

        // A fast jump (anchor link, restored scroll position) can carry an
        // element past the viewport without the observer ever firing for it.
        // Sweep anything left above the fold so nothing stays invisible.
        function revealSkipped() {
            Array.prototype.forEach.call(
                document.querySelectorAll('.reveal:not(.reveal-in)'),
                function (el) {
                    if (el.getBoundingClientRect().bottom < 0) {
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
        window.addEventListener('load', revealSkipped);
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

    function init() {
        markReveals();
        stageHeader();
        observeReveals();
        startHeaderCounters();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
