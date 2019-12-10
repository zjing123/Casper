jQuery(document).ready(function ($) {
    var resizing = false,
        navigationWrapper = $('.cd-main-nav-wrapper'),
        navigation = navigationWrapper.children('ul.nav'),
        searchForm = $('.cd-main-search'),
        pageContent = $('.site-wrapper'),
        searchTrigger = $('.cd-search-trigger'),
        coverLayer = $('.cd-cover-layer'),
        navigationTrigger = $('.cd-nav-trigger'),
        mainHeader = $('.cd-main-header'),
        siteNav = mainHeader.children('.site-nav');

    function checkWindowWidth() {
        var mq = window.getComputedStyle(mainHeader.get(0), '::before')
            .getPropertyValue('content')
            .replace(/"/g, '')
            .replace(/'/g, "");
        console.log(window.getComputedStyle(mainHeader.get(0), '::before')
            .getPropertyValue('content'))
        return mq;
    }

    function moveNavigation() {
        var screenSize = checkWindowWidth();
        console.log(screenSize)
        if (screenSize === 'desktop' && (mainHeader.children('.cd-main-search').length === 0)) {
            searchForm.detach().insertAfter(siteNav);
            navigationWrapper.hide().find('.cd-serch-wrapper').remove();
        } else if (screenSize === 'mobile') {
            var newListItem = $('<li class="cd-serch-wrapper"></li>');
            searchForm.detach().appendTo(newListItem);
            newListItem.appendTo(navigation);
            navigationWrapper.show();
        }
        resizing = false;
    }

    function checkResize() {
        if (!resizing) {
            resizing = true;
            (!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
        }
    }

    moveNavigation();

    $(window).on('resize', checkResize);

    navigationTrigger.on('click', function (event) {
        event.preventDefault();
        mainHeader.add(navigation).add(pageContent).toggleClass('nav-is-visible');
    });

    searchTrigger.on('click', function (event) {
        event.preventDefault();
        if (searchTrigger.hasClass('search-form-visible')) {
            searchForm.find('form').submit();
        } else {
            searchTrigger.addClass('search-form-visible');
            coverLayer.addClass('search-form-visible');
            siteNav.addClass('search-form-visible');
            searchForm.addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                searchForm.find('input[type="search"]').focus().end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
            });
        }
    });
    searchForm.on('click', '.close', function () {
        closeSearchForm();
    });
    coverLayer.on('click', function () {
        closeSearchForm();
    });

    function closeSearchForm() {
        searchTrigger.removeClass('search-form-visible');
        searchForm.removeClass('is-visible');
        coverLayer.removeClass('search-form-visible');
        siteNav.removeClass('search-form-visible');
    }
});
