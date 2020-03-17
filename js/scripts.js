// Cart dropdown JS
$(document).ready(function () {

    $('.cart-dropdown').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
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

// Mobile menu
$(document).ready(function () {

    $('.overlayNav').on('click', function () {
        $('#responsiveNav').toggleClass('active');
        $('.overlayNav').toggleClass('active');
    });

    $('#navToggler').on('click', function () {
        $('#responsiveNav').toggleClass('active');
        $('.overlayNav').toggleClass('active');
        $('.collapse.in').toggleClass('in');
    });

    // TODO: Get rid of this and make the clicked element turn into the nav link header instead
    $('.nav-link-header').on('click', function () {
        var el = $(this);
        if (el.closest('li.nav-item').siblings().hasClass('inactive')) {
            $('.brand-dropdown').children('.menu-level-2').removeClass('active');
            el.parent().siblings('.nav-item').find('a.nav-link').removeClass('active');
            el.closest('li.nav-item').siblings('.nav-item:not(.d-md-none)').removeClass('inactive');
        } else {
            $('#responsiveNav').toggleClass('active');
            $('.overlayNav').toggleClass('active');
        }
    });

    $('.menu-level-1 a.nav-link:not(.nav-link-header)').on('click', function() {
        var el = $(this);
        el.addClass('active')
        el.next('.brand-dropdown').children('.menu-level-2').addClass('active');
        el.closest('li.nav-item').siblings('.nav-item:not(.d-md-none)').addClass('inactive');
    });

    $('.menu-level-2 h6.menu-header').on('click', function() {
        var el = $(this);
        el.addClass('active')
        console.log(el.parent().siblings().children('h6.menu-header'))
        el.parent().siblings().children('h6.menu-header').addClass('inactive');
        el.siblings().addClass('active');
    });
});