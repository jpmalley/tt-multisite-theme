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
});

// Enable tooltips
$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});



// DEMO SCRIPT REMOVE FOR IMPLIMENTATION
$(document).ready(function () {
    $('#est-btn').on('click', function (e) {
        e.preventDefault;
        $('.estimator, .estimate-results').toggleClass('d-none');
    })
});
// END DEMO SCRIPT



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
    $('#mobileNav').on('click', 'a.nav-link-header.link-level-0', function (e) {
        e.preventDefault();
        $('#mobileNav').removeClass('active');
        $('.nav-overlay').removeClass('active');
    });

    // From level 1 to level 2
    $('#mobileNav').on('click', 'a.link-level-1:not(.nav-link-header, .acct-link)', function (e) {
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
    $('#mobileNav').on('click', 'a.link-level-2:not(.active)', function (e) {
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

// CCPA Request Form
$('body').on('change', '.request-for', function () {
    switch ($(this).val()) {
        case 'myself':
            $('#forMyself').collapse('show');
            $('#forSomeoneElse').collapse('hide');
            break
        case "someoneElse":
            $('#forSomeoneElse').collapse('show');
            $('#forMyself').collapse('hide');
            break
        default:
            $('#forMyself, #forSomeoneElse').collapse('hide');
    }
});

$('body').on('change', '.auth-agent', function () {
    switch ($(this).val()) {
        case 'individual':
            $('#authIndividual').collapse('show');
            $('#authBusiness').collapse('hide');
            break
        case "business":
            $('#authBusiness').collapse('show');
            $('#authIndividual').collapse('hide');
            break
        default:
            $('#authIndividual, #authBusiness').collapse('hide');
    }
});

$('body').on('change', '.intention', function () {
    switch ($(this).val()) {
        case 'requestInfo':
            $('#requestDisclaimer').collapse('show');
            $('#deleteDisclaimer').collapse('hide');
            break
        case "deleteInfo":
            $('#deleteDisclaimer').collapse('show');
            $('#requestDisclaimer').collapse('hide');
            break
        default:
            $('#requestDisclaimer, #deleteDisclaimer').collapse('hide');
    }
});

$('.custom-file input').change(function (e) {
    var files = [];
    for (var i = 0; i < $(this)[0].files.length; i++) {
        files.push($(this)[0].files[i].name);
    }
    $(this).next('.custom-file-label').html(files.join(', '));
});

// Recommendation module JS
// $(document).ready(function () {
//     $('.recommendations').removeClass('d-none');
//     $('.recommendations').slick({
//         infinite: true,
//         speed: 300,
//         centerMode: true,
//         slidesToShow: 5,
//         responsive: [
//             {
//                 breakpoint: 1200,
//                 settings: {
//                     arrows: true,
//                     centerMode: true,
//                     slidesToShow: 3
//                 }
//             },
//             {
//                 breakpoint: 613,
//                 settings: {
//                     arrows: true,
//                     centerMode: true,
//                     slidesToShow: 1
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     arrows: true,
//                     centerMode: true,
//                     slidesToShow: 1
//                 }
//             }
//         ]
//     });
// });

// Checkout scripts

// Account check modal
$(document).ready(function () {
    $('#accountCheckout').on('click', function (e) {
        e.preventDefault;
        $('.account-check, .account-sign-in').toggleClass('d-none');
    })
});

// Scroll to top on continue
$( "button.continue:not(.next-btn)" ).click(function( event ) {
    event.preventDefault();
    $("html, body").scrollTop($($(this).attr('data-target')).offset().top);
});

// Submit address button
$('body').on('click', '#submitAddress', function (e) {
    $('#changeAddress').removeClass('d-none');
    var shippingInputs = $('.shippingWrapper input, .shippingWrapper select');
    for (var i = 0; i < shippingInputs.length; i++) {
        $(shippingInputs[i]).addClass('disabled').prop('disabled', true);
    }
    setTimeout(function () {
        $('#submitAddress').addClass('disabled').prop('disabled', true);
    }, 100);
});

$('body').on('click', '#changeAddress', function (e) {
    $('#changeAddress').addClass('d-none');
    var shippingInputs = $('.shippingWrapper input, .shippingWrapper select');
    for (var i = 0; i < shippingInputs.length; i++) {
        $(shippingInputs[i]).removeClass('disabled').prop('disabled', false);
    }
    $('#submitAddress').removeClass('disabled').prop('disabled', false);
});

// Shipping address modal selector
$('body').on('click', '.shipping-address-radio', function () {
    var content = $(this).next('.shipping-address-label').children().html();
    $('#shippingAddressSelector .selected-content').html(content);
    if ($(this).val() === 'new') {
        $('#newShippingAddress').collapse('show');
    } else {
        $('#newShippingAddress').collapse('hide');
    }
    $(this).closest('.modal').modal('hide');
});

// Billing address modal selector
$('body').on('click', '.billing-address-radio', function () {
    var content = $(this).next('.billing-address-label').children().html();
    $('#billingAddressSelector .selected-content').html(content);
    if ($(this).val() === 'new') {
        $('#newBillingAddress').collapse('show');
    } else {
        $('#newBillingAddress').collapse('hide');
    }
    $(this).closest('.modal').modal('hide');
});

// Card modal selector
$('body').on('click', '.card-radio', function () {
    var content = $(this).next('.card-label').children().html();
    $('#cardSelector .selected-content').html(content);
    if ($(this).val() === 'new') {
        $('#newCard').collapse('show');
    } else {
        $('#newCard').collapse('hide');
    }
    $(this).closest('.modal').modal('hide');
});

// Card validation and formatting
var acceptedCreditCards = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
};

$('#cardNumber, #cvv').on('input', function () {
    if (validateCard($('#cardNumber').val()) && validateCVV($('#cardNumber').val(), $('#cvv').val())) {
        $('button[type="submit"]').prop('disabled', false);
    } else {
        $('button[type="submit"]').prop('disabled', true);
    }

    var node = $('#cardNumber')[0]; // vanilla javascript element
    var cursor = node.selectionStart; // store cursor position
    var lastValue = $('#cardNumber').val(); // get value before formatting

    var formattedValue = formatCardNumber(lastValue);
    $('#cardNumber').val(formattedValue); // set value to formatted

    // keep the cursor at the end on addition of spaces
    if (cursor === lastValue.length) {
        cursor = formattedValue.length;
        // decrement cursor when backspacing
        // i.e. "4444 |" => backspace => "4444|"
        if ($('#cardNumber').attr('data-lastvalue') && $('#cardNumber').attr('data-lastvalue').charAt(cursor - 1) == " ") {
            cursor--;
        }
    }

    if (lastValue != formattedValue) {
        // increment cursor when inserting character before a space
        // i.e. "1234| 6" => "5" typed => "1234 5|6"
        if (lastValue.charAt(cursor) == " " && formattedValue.charAt(cursor - 1) == " ") {
            cursor++;
        }
    }

    // set cursor position
    node.selectionStart = cursor;
    node.selectionEnd = cursor;
    // store last value
    $('#cardNumber').attr('data-lastvalue', formattedValue);
});

// format expiriaton date input
$('#expDate').on('keydown', function (e) {
    var monthAndSlashRegex = /^\d\d \/ $/;
    var isMonthAndSlashEntered = monthAndSlashRegex.exec(e.target.value);
    if (isMonthAndSlashEntered && e.key === 'Backspace') {
        e.target.value = e.target.value.slice(0, -3);
    }
});

$('#expDate').on('keyup', function (e) {
    var monthRegex = /^\d\d$/;
    var isMonthEntered = monthRegex.exec(e.target.value);
    if (e.key >= 0 && e.key <= 9 && isMonthEntered) {
        e.target.value = e.target.value + " / ";
    }
});

function formatCardNumber(value) {
    // remove all non digit characters
    var value = value.replace(/\D/g, '');
    var formattedValue;
    var maxLength;
    // american express, 15 digits
    if ((/^3[47]\d{0,13}$/).test(value)) {
        formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
        maxLength = 17;
        cvvMaxLength = 4;
    } else if ((/^\d{0,16}$/).test(value)) { // regular cc number, 16 digits
        formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
        maxLength = 19;
        cvvMaxLength = 3;
    }

    $('#cardNumber').attr('maxlength', maxLength);
    $('#cvv').attr('maxlength', cvvMaxLength);
    return formattedValue;
}


function validateCard(value) {
    // remove all non digit characters
    var value = value.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
        var digit = parseInt(value.charAt(i));

        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    var valid = (sum % 10) == 0;
    var accepted = false;

    // loop through the keys (visa, mastercard, amex, etc.)
    Object.keys(acceptedCreditCards).forEach(function (key) {
        var regex = acceptedCreditCards[key];
        if (regex.test(value)) {
            accepted = true;
        }
    });

    return valid && accepted;
}


function validateCVV(creditCard, cvv) {
    // remove all non digit characters
    var creditCard = creditCard.replace(/\D/g, '');
    var cvv = cvv.replace(/\D/g, '');
    // american express and cvv is 4 digits
    if ((acceptedCreditCards.amex).test(creditCard)) {
        if ((/^\d{4}$/).test(cvv))
            return true;
    } else if ((/^\d{3}$/).test(cvv)) { // other card & cvv is 3 digits
        return true;
    }
    return false;
}

// GDPR Message
$('#gdpr-dismiss, #gdpr-confirm').on('click', function(e) {
    e.preventDefault();
    console.log('clicked')
    $('.gdpr-message').hide();
});

// Gift guide
$('.gift-guide .nav-link').on('click', function(e) {
    e.preventDefault();
    t = $(this).attr('href');
    gsap.to(window, {duration: 1, scrollTo: t});
});