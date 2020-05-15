// Cart drawer JS
$(document).ready(function () {

    // Increment using +/- buttons
    $('.btn-number').click(function (e) {
        e.preventDefault();

        var fieldName = $(this).attr('data-field');
        var type = $(this).attr('data-type');
        var input = $('input[name="' + fieldName + '"]');
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {
                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {
                input.val(currentVal + 1).change();
            }
        } else {
            input.val(0);
        }
    });
    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });
    $('.input-number').change(function () {

        var minValue = parseInt($(this).attr('min'));
        var valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $('.btn-number[data-type="minus"][data-field="' + name + '"]').removeAttr('disabled');
        } else {
            // TODO: Remove from cart when value reaches 0
            alert('Minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }


    });

    $('.input-number').keydown(function (e) {
        // Allow backspace, delete, tab, escape, enter, home, end, left, right
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 35, 36, 37, 39]) !== -1 ||
            // Allow Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true)) {
            return;
        }
        // Increment using up/down arrows
        if (e.keyCode == 38) {
            $(this).val(parseInt($(this).val()) + 1).change();
        }
        if (e.keyCode == 40) {
            e.preventDefault();
            $(this).val(parseInt($(this).val()) - 1).change();
        }
        // Prevent any other input other than numbers
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    // Dismiss cart
    $('#dismissCart, .cart-overlay').on('click', function () {
        $('#cart, #cart-email-prompt, #cart-sign-up').removeClass('active');
        $('body').removeClass('overflow-hidden');
        $('.cart-overlay').removeClass('active');
    });
    // Cart back button
    $('.cart-back-btn').on('click', function () {
        var closeId = $(this).closest('.cart-drawer').attr('id');
        $('#' + closeId).removeClass('active');
    });
    // Open cart
    $('#cartLink, #cartLinkMobile').on('click', function () {
        $('#cart').addClass('active');
        $('body').addClass('overflow-hidden');
        $('.cart-overlay').addClass('active');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('#checkOut').on('click', function () {
        $('#cart-email-prompt').addClass('active');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    $('#emailContinue').on('click', function () {
        var emailValue = $('#cart-email-init').val();
        if (emailValue) {
            $('#cart-sign-in').addClass('active');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        } else {
            $('#cart-sign-up').addClass('active');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }
    });
});

// Mobile nav
$(document).ready(function () {

    // Open nav
    $('#navToggler').on('click', function () {
        $('#mobileNav').toggleClass('active');
        $('.nav-overlay').toggleClass('active');
        $('body').toggleClass('overflow-hidden');
    });

    // Close and reset nav when clicking outside
    $('.nav-overlay').on('click', function () {
        $('#mobileNav').toggleClass('active');
        $('.nav-overlay').toggleClass('active');
        $('body').toggleClass('overflow-hidden');
        $('ul.menu-level-2, ul.menu-level-3').removeClass('active');
        $('.nav-link-header:not(.link-level-0').removeClass('nav-link-header active');
        $('li.nav-item, a.link-level-1').removeClass('inactive');
    });

    // Close menu button
    $('#mobileNav').on('click', 'a.nav-link-header.link-level-0', function(e) {
        e.preventDefault();
        $('#mobileNav').removeClass('active');
        $('.nav-overlay').removeClass('active');
    });

    // From level 1 to level 2
    $('#mobileNav').on('click', 'a.link-level-1:not(.nav-link-header, .acct-link)', function(e) {
        e.preventDefault();
        var el = $(this);
        el.addClass('active nav-link-header');
        el.next('ul.menu-level-2').addClass('active');
        el.closest('li.nav-item').siblings('li.nav-item').addClass('inactive');
    });

    // From level 2 to level 1
    $('#mobileNav').on('click', 'a.nav-link-header.link-level-1', function (e) {
        e.preventDefault();
        var el = $(this);
        el.removeClass('active nav-link-header');
        $('ul.menu-level-2').removeClass('active');
        el.closest('li.nav-item').siblings('li.nav-item').removeClass('inactive');
    });

    // From level 2 to level 3
    $('#mobileNav').on('click', 'a.link-level-2:not(.active)', function(e) {
        e.preventDefault();
        var el = $(this);
        el.addClass('active nav-link-header');
        el.next('ul.menu-level-3').addClass('active');
        el.closest('li.nav-item').siblings('li.nav-item').addClass('inactive');
        el.closest('.menu-level-2').siblings('a.link-level-1').addClass('inactive');
    });

    // From level 3 to level 2
    $('#mobileNav').on('click', 'a.nav-link-header.link-level-2', function (e) {
        e.preventDefault();
        var el = $(this);
        el.removeClass('active nav-link-header')
        $('ul.menu-level-3').removeClass('active');
        el.closest('li.nav-item').siblings('li.nav-item').removeClass('inactive');
        el.closest('.menu-level-2').siblings('a.link-level-1').removeClass('inactive');
    });
});


// Collection page size filter
$(document).ready(function () {

    var filters = [];

    // Apply filters
    $('.dropdown-menu .product-options label').on('click', function (e) {

        var $target = $(e.currentTarget),
            val = $target.attr('for'),
            input = $('#' + val),
            idx;

        if ((idx = filters.indexOf(val)) > -1) {
            filters.splice(idx, 1);
            setTimeout(function () {
                input.prop('checked', false);
                $('.' + val).removeClass('show');
            }, 0);
        } else {
            filters.push(val);
            setTimeout(function () {
                input.prop('checked', true);
                $('.' + val).addClass('show');
            }, 0);
        }

        $(e.target).blur();

        if (filters.length > 0) {
            $('.selected-filters').addClass('show');
        } else {
            $('.selected-filters').removeClass('show');
        }
        return false;
    });

    // Done button
    $('.dropdown-menu .product-options button.done').on('click', function (e) {
        e.preventDefault();
        $('#sizeFilter').dropdown('toggle');
    });

    // Clear filters button
    $('.dropdown-menu .product-options button.clear').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        for (var i = 0; i < filters.length; i++) {
            var val = filters[i];
            $('#' + val).prop('checked', false);
            $('.' + val).removeClass('show');
        }
        $('.selected-filters').removeClass('show');
        filters = [];
    });

    // Remove filter tag
    $('.remove-filter').on('click', function (e) {
        var val = $(this).parents('.btn-group').attr('for'),
            idx;

        if ((idx = filters.indexOf(val)) > -1) {
            filters.splice(idx, 1);
            setTimeout(function () {
                $('#' + val).prop('checked', false);
                $('.' + val).removeClass('show');
            }, 0);
        }
        if (filters.length < 1) {
            $('.selected-filters').removeClass('show');
        }
    });

});

// Product image style switch JS
$(document).ready(function () {
    $('.style-label').on('click', function () {
        var idx = parseInt($(this).attr('data-slide-to'));
        $('#productImages').carousel(idx);
    });
});

// Prevent click on disabled buttons
$(document).ready(function () {
    $('.btn.btn-outline-secondary.disabled').on('click', function (e) {
        e.preventDefault();
    });
});

// Recommendation module JS
$(document).ready(function () {
    $('.recommendations').removeClass('d-none');
    $('.recommendations').slick({
        infinite: true,
        speed: 300,
        centerMode: true,
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 613,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });
});