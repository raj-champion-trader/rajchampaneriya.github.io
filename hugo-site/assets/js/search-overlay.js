(function () {
    'use strict';

    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-overlay-input');
    const resultsList = document.getElementById('search-overlay-results');
    const emptyMsg = document.getElementById('search-overlay-empty');
    const closeBtn = document.getElementById('search-overlay-close');
    const backdrop = overlay.querySelector('.search-overlay-backdrop');
    const searchToggle = document.getElementById('search-toggle');

    let fuse = null;
    let indexLoaded = false;
    let debounceTimer = null;

    // ── CDN Loader ──
    function loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.onload = callback;
        script.onerror = function () { console.error('Failed to load: ' + url); };
        document.head.appendChild(script);
    }

    function loadDependencies(callback) {
        if (typeof Fuse !== 'undefined' && typeof DOMPurify !== 'undefined') {
            callback();
            return;
        }
        let loaded = 0;
        const needed = (typeof Fuse === 'undefined' ? 1 : 0) + (typeof DOMPurify === 'undefined' ? 1 : 0);
        function done() { loaded++; if (loaded >= needed) callback(); }
        if (typeof Fuse === 'undefined') loadScript('https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js', done);
        if (typeof DOMPurify === 'undefined') loadScript('https://cdn.jsdelivr.net/npm/dompurify@3.1.7/dist/purify.min.js', done);
        if (needed === 0) callback();
    }

    // ── Index Loader ──
    function loadIndex() {
        if (indexLoaded) return;
        loadDependencies(function () {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    if (data) {
                        fuse = new Fuse(data, {
                            isCaseSensitive: false,
                            includeMatches: true,
                            minMatchCharLength: 3,
                            threshold: 0.2,
                            distance: 100,
                            ignoreLocation: true,
                            findAllMatches: true,
                            keys: [
                                { name: 'title', weight: 0.4 },
                                { name: 'summary', weight: 0.3 },
                                { name: 'content', weight: 0.2 },
                                { name: 'permalink', weight: 0.1 }
                            ]
                        });
                        indexLoaded = true;
                    }
                }
            };
            xhr.open('GET', '/index.json');
            xhr.send();
        });
    }

    // ── Exact Match Finder (case-insensitive) ──
    function findExactMatches(text, query) {
        if (!query || query.length < 2) return [];
        var indices = [];
        var lowerText = text.toLowerCase();
        var lowerQuery = query.toLowerCase();
        var pos = 0;
        while ((pos = lowerText.indexOf(lowerQuery, pos)) !== -1) {
            indices.push([pos, pos + lowerQuery.length - 1]);
            pos += lowerQuery.length;
        }
        return indices;
    }

    // ── Highlight Builder (DOM-safe, no innerHTML) ──
    function buildHighlightedFragment(text, indices) {
        if (!indices || !indices.length) return document.createTextNode(text);
        var frag = document.createDocumentFragment();
        var prev = 0;
        for (var i = 0; i < indices.length; i++) {
            var start = indices[i][0];
            var end = indices[i][1];
            if (start > prev) frag.appendChild(document.createTextNode(text.substring(prev, start)));
            var mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.textContent = text.substring(start, end + 1);
            frag.appendChild(mark);
            prev = end + 1;
        }
        if (prev < text.length) frag.appendChild(document.createTextNode(text.substring(prev)));
        return frag;
    }

    // ── Snippet Builder ──
    function buildSnippet(text, query, maxLen) {
        maxLen = maxLen || 180;
        var matches = findExactMatches(text, query);
        if (!matches.length) {
            return document.createTextNode(text.substring(0, maxLen) + (text.length > maxLen ? '…' : ''));
        }
        var firstStart = matches[0][0];
        var contextBefore = 50;
        var snippetStart = Math.max(0, firstStart - contextBefore);
        var snippetEnd = Math.min(text.length, snippetStart + maxLen);
        var slice = text.substring(snippetStart, snippetEnd);
        var sliceMatches = [];
        for (var i = 0; i < matches.length; i++) {
            var mStart = matches[i][0];
            var mEnd = matches[i][1];
            if (mStart < snippetEnd && mEnd >= snippetStart) {
                sliceMatches.push([
                    Math.max(0, mStart - snippetStart),
                    Math.min(snippetEnd - snippetStart - 1, mEnd - snippetStart)
                ]);
            }
        }
        var frag = document.createDocumentFragment();
        if (snippetStart > 0) frag.appendChild(document.createTextNode('…'));
        frag.appendChild(buildHighlightedFragment(slice, sliceMatches));
        if (snippetEnd < text.length) frag.appendChild(document.createTextNode('…'));
        return frag;
    }

    // ── Search Execution ──
    function doSearch(query) {
        resultsList.textContent = '';
        emptyMsg.style.display = 'none';
        var trimmed = (query || '').trim();
        if (!fuse || trimmed.length < 2) return;

        var results = fuse.search(trimmed, { limit: 15 });
        if (!results.length) { emptyMsg.style.display = 'block'; return; }

        for (var i = 0; i < results.length; i++) {
            var item = results[i].item;
            var li = document.createElement('li');
            li.className = 'search-overlay-result-item';

            var a = document.createElement('a');
            // Append highlight param so target page can highlight + scroll
            var separator = item.permalink.indexOf('?') === -1 ? '?' : '&';
            a.href = item.permalink + separator + 'highlight=' + encodeURIComponent(trimmed);

            var header = document.createElement('header');
            header.className = 'search-overlay-result-title';
            var titleMatches = findExactMatches(item.title, trimmed);
            if (titleMatches.length) {
                header.appendChild(buildHighlightedFragment(item.title, titleMatches));
            } else {
                header.textContent = item.title;
            }
            a.appendChild(header);

            var p = document.createElement('p');
            p.className = 'search-overlay-result-snippet';
            var contentMatches = findExactMatches(item.content, trimmed);
            if (contentMatches.length) {
                p.appendChild(buildSnippet(item.content, trimmed));
            } else {
                p.textContent = (item.summary || '').substring(0, 160) + '…';
            }
            a.appendChild(p);

            li.appendChild(a);
            resultsList.appendChild(li);
        }
    }

    // ── Overlay Controls ──
    function openOverlay() {
        loadIndex();
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { input.focus(); }, 100);
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        input.value = '';
        resultsList.textContent = '';
        emptyMsg.style.display = 'none';
    }

    if (searchToggle) searchToggle.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeOverlay);
    backdrop.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
            e.preventDefault();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            if (overlay.classList.contains('active')) closeOverlay();
            else openOverlay();
            e.preventDefault();
        }
    });

    input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () { doSearch(input.value); }, 200);
    });

    input.addEventListener('search', function () {
        if (!this.value) { resultsList.textContent = ''; emptyMsg.style.display = 'none'; }
    });

    // Close overlay when user clicks a search result
    resultsList.addEventListener('click', function () {
        closeOverlay();
    });

    // ────────────────────────────────────────────────────
    // PAGE-LEVEL HIGHLIGHT ON LOAD (from ?highlight=term)
    // ────────────────────────────────────────────────────
    var pageHighlightDone = false;
    function highlightOnPageLoad() {
        if (pageHighlightDone) return;
        pageHighlightDone = true;
        var params = new URLSearchParams(window.location.search);
        var term = params.get('highlight');
        if (!term || term.length < 2) return;

        // Elements to skip (nav, footer, code blocks, etc.)
        var skipTags = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1,
                         BUTTON: 1, MARK: 1, CODE: 1, PRE: 1, SVG: 1, NAV: 1, HEADER: 1, FOOTER: 1,
                         'search-overlay': 1 };

        // Walk text nodes and wrap matches in <mark>
        var mainEl = document.querySelector('main') || document.body;
        var walker = document.createTreeWalker(mainEl, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                // Skip if parent is in skip list
                if (node.parentElement && skipTags[node.parentElement.tagName]) return NodeFilter.FILTER_REJECT;
                // Skip if inside a skip container
                var p = node.parentElement;
                while (p && p !== mainEl) {
                    if (skipTags[p.tagName]) return NodeFilter.FILTER_REJECT;
                    p = p.parentElement;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        var textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        var firstMark = null;
        var lowerTerm = term.toLowerCase();

        for (var i = 0; i < textNodes.length; i++) {
            var node = textNodes[i];
            var text = node.textContent;
            var lowerText = text.toLowerCase();
            var pos = lowerText.indexOf(lowerTerm);
            if (pos === -1) continue;

            var parent = node.parentNode;
            var frag = document.createDocumentFragment();
            var lastIdx = 0;

            while (pos !== -1) {
                if (pos > lastIdx) frag.appendChild(document.createTextNode(text.substring(lastIdx, pos)));
                var mark = document.createElement('mark');
                mark.className = 'search-highlight search-highlight--page';
                mark.textContent = text.substring(pos, pos + term.length);
                if (!firstMark) firstMark = mark;
                frag.appendChild(mark);
                lastIdx = pos + term.length;
                pos = lowerText.indexOf(lowerTerm, lastIdx);
            }
            if (lastIdx < text.length) frag.appendChild(document.createTextNode(text.substring(lastIdx)));
            parent.replaceChild(frag, node);
        }

        // Scroll to first match after layout settles
        if (firstMark) {
            setTimeout(function () {
                firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstMark.classList.add('search-highlight--focus');
                setTimeout(function () { firstMark.classList.remove('search-highlight--focus'); }, 2000);
            }, 400);
        }

        // Show "clear highlights" bar
        showHighlightBar(term);
    }

    function showHighlightBar(term) {
        // Prevent duplicate bars (e.g. Swup page:view re-triggering)
        var existing = document.querySelector('.search-highlight-bar');
        if (existing) existing.remove();

        var bar = document.createElement('div');
        bar.className = 'search-highlight-bar';
        bar.innerHTML = '<span>Highlighting: <strong>' + escapeAttr(term) + '</strong></span>' +
            '<button class="search-highlight-bar-close">Clear</button>';
        document.body.appendChild(bar);

        var closeBtn = bar.querySelector('.search-highlight-bar-close');
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            // Remove all marks, replace with their text content
            document.querySelectorAll('mark.search-highlight--page').forEach(function (mark) {
                var textNode = document.createTextNode(mark.textContent);
                mark.parentNode.replaceChild(textNode, mark);
            });
            bar.remove();
            bar = null;
            // Clean URL
            var url = new URL(window.location);
            url.searchParams.delete('highlight');
            history.replaceState(null, '', url);
        });

        // Prevent any parent element from swallowing clicks on the bar
        bar.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    function escapeAttr(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Run highlight on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', highlightOnPageLoad);
    } else {
        highlightOnPageLoad();
    }
})();
