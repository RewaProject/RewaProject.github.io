$(document).ready(function () {
    //Scroll slow down
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var id = $(this).attr('href');
        var targetOffset = $(id).offset().top;
                
        $('html, body').animate({ 
            scrollTop: targetOffset - 100
        }, 1500);
    });

    //simulation calculation
    const varCo2 = 0.0001378;
    const varArv = 0.00072;
    const percent = 0.18;
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    $('#Range').on('input', function () {
        let co2 = $(this).val() * varCo2
        let arvores = $(this).val() * varArv;
        let valEconoMensal = percent * $(this).val();
        let valEcono = valEconoMensal * 12;

        $('#valor').html(formatNumber($(this).val(), '2', '.', ','));
        $('#co2').html(co2.toFixed(2));
        $('#arvores').html(Math.round(arvores.toFixed(2)));
        $('#val-econo').html(formatNumber(valEcono, '2', '.', ','));
        $('#econo-mensal').html(formatNumber(valEconoMensal, '2', '.', ','));
        $('#val-medio').val(formatNumber($(this).val(), '2', '.', ',') );
        $('#econ-anual').val(formatNumber(valEcono, '2', '.', ','));
        $('#econ-mensal').val(formatNumber(valEconoMensal, '2', '.', ','));
        $('#con-selected').val($('#input-select').val());
        $(".contato").fadeIn(3000);
    });

    //mask to telefone
    jQuery("input#tel")
        .mask("(99) 9999-9999?9")
        .focusout(function (event) {
            var target, phone, element;
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;
            phone = target.value.replace(/\D/g, '');
            element = $(target);
            element.unmask();
            if (phone.length > 10) {
                element.mask("(99) 99999-999?9");
            } else {
                element.mask("(99) 9999-9999?9");
            }
                
            //show the button submit
            if ($('input#name').val() !== '' && $('input#email').val() !== '' && $('input#tel').val() !== '') {            
                $('button.disabled').prop("disabled", false);
                $('button.disabled').addClass('green');
                $('button.disabled').removeClass('disabled');    
            }

        });
    //validation to name
    $("#name").blur(function () {
        if($(this).val() == '') {
            $("#error-name").show().text('Este campo é obrigatório');
        } else {
            $("#error-name").hide()
        }
    });

    //validation to email
    $("#email").blur(function () {
        if (!filter.test($('#email').val())) {
            $("#error-email").show().text('Email inválido');
        } else {
            $("#error-email").hide()
        }
    });

    //validation to tel
    $("#tel").blur(function () {
        if($(this).val() == '') {
            $("#error-tel").show().text('Este campo é obrigatório');
        } else {
            $("#error-tel").hide()
        }
    });

    // Function format number to simulation
    function formatNumber(n, p, ts, dp) {
        var t = [];
        // Get arguments, set defaults
        if (typeof p == 'undefined') p = 2;
        if (typeof ts == 'undefined') ts = ',';
        if (typeof dp == 'undefined') dp = '.';

        // Get number and decimal part of n
        n = Number(n).toFixed(p).split('.');

        // Add thousands separator and decimal point (if requied):
        for (var iLen = n[0].length, i = iLen ? iLen % 3 || 3 : 0, j = 0; i <= iLen; i += 3) {
            t.push(n[0].substring(j, i));
            j = i;
        }
        // Insert separators and return result
        return t.join(ts) + (n[1] ? dp + n[1] : '');


    }
     
});