// Cart dropdown JS
$(document).ready(function () {
    // Toggle cart
    $('#cartLink, #cartLinkMobile, .cart-overlay, .dismiss-cart').click(function () {
        $('#cartDropdown, .cart-overlay').toggleClass('active');
    });

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

});

// Mobile nav
$(document).ready(function () {

    // Open nav
    $('#navToggler').on('click', function () {
        $('#responsiveNav').toggleClass('active');
        $('.nav-overlay').toggleClass('active');
    });

    // Close and reset nav when clicking outside
    $('.nav-overlay').on('click', function () {
        $('#responsiveNav').toggleClass('active');
        $('.nav-overlay').toggleClass('active');
        $('.menu-level-2, .menu-level-3').removeClass('active');
        $('#responsiveNav .nav-item, #responsiveNav .nav-link, #responsiveNav .level-3').removeClass('inactive');
        $('#responsiveNav .nav-link:not(.level-1), #responsiveNav .menu-header').removeClass('active nav-link-header');
    });

    // Close menu button
    $('#responsiveNav').on('click', 'a.nav-link-header.level-1', function(e) {
        e.preventDefault();
        $('#responsiveNav').removeClass('active');
        $('.nav-overlay').removeClass('active');
    });

    // From level 1 to level 2
    $('#responsiveNav').on('click', 'a.nav-link:not(.nav-link-header, .acct-link)', function(e) {
        e.preventDefault();
        var el = $(this);
        el.addClass('active nav-link-header')
        el.next('.brand-dropdown').children('.menu-level-2').addClass('active');
        el.closest('li.nav-item').siblings('.nav-item').addClass('inactive');
    });

    // From level 2 to level 1
    $('#responsiveNav').on('click', 'a.nav-link-header.level-2', function (e) {
        e.preventDefault();
        var el = $(this);
        el.removeClass('active nav-link-header')
        $('.brand-dropdown').children('.menu-level-2').removeClass('active');
        el.parent().siblings('.nav-item').find('a.nav-link').removeClass('active');
        el.closest('li.nav-item').siblings('.nav-item').removeClass('inactive');
    });

    // From level 2 to level 3
    $('#responsiveNav').on('click', 'a.menu-header:not(.active)', function(e) {
        e.preventDefault();
        var el = $(this);
        el.addClass('active nav-link-header')
        el.parent().siblings().children('a.menu-header').addClass('inactive');
        el.closest('.brand-dropdown').siblings('a.nav-link').removeClass('active').addClass('inactive');
        el.siblings().addClass('active');
    });

    // From level 3 to level 2
    $('#responsiveNav').on('click', 'a.nav-link-header.level-3', function (e) {
        e.preventDefault();
        var el = $(this);
        el.removeClass('active nav-link-header')
        el.parent().siblings().children('a.menu-header').removeClass('inactive');
        el.siblings().removeClass('active');   
        el.closest('.brand-dropdown').siblings().removeClass('inactive').addClass('active nav-link-header');
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