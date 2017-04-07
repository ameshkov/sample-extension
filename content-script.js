(function() {

    /**
     * Checks if it is html document
     *
     * @returns {boolean}
     */
    var isHtml = function () {
        return (document instanceof HTMLDocument) ||
                // https://github.com/AdguardTeam/AdguardBrowserExtension/issues/233
            ((document instanceof XMLDocument) && (document.createElement('div') instanceof HTMLDivElement));
    };

    /**
     * Initializes content script, executes userscript in the page context.
     */
    var init = function() {
        if (!isHtml()) {
            return;
        }

        var scriptText = [
            'try {',
            '(' + applyUserscript.toString() + ')();',
            '} catch (ex) {',
            '   console.log("Error in the userscript: " + ex);',
            '} finally {',
            '   var currentScript = document.currentScript;',
            '   if (currentScript && currentScript.parentNode) {',
            '       currentScript.parentNode.removeChild(currentScript);',
            '   }',
            '}',
            // So that this script looked like a file in the dev tools
            '//# sourceURL=sample-userscript.js'
        ].join('\n');
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.textContent = scriptText;
        (document.head || document.documentElement).appendChild(script);
    };

    // Go
    init();
})();