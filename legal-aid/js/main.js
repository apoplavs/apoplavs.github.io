var tabs = $('.tabs > li');

		tabs.on("click", function(){
			$('#floatingCirclesG').show();
			$('#content').hide();
			tabs.removeClass('active');
			$(this).addClass('active');
			$.get($(this).find('a').attr('f-link'), function(data) {
				$('#content').html(data);
			});
		});

/**
 * функція яка виконується кожен раз
 * як тільки ajax завершить завантаження
 */
$(document).ajaxComplete(function() {
			setTimeout(function () {
				$('#floatingCirclesG').hide();
				$('#content').show();
			}, 100);
		});

$(document).ready(function() {
	$('#content').hide();
	$.ajax({
		url: $('.tabs > li.active').find('a').attr('f-link'),
		success: function(response) {
			$('#content').html(response);
		}
	});

    /**
     * перевірка, чи показувались користувачу
     * інтерактивні підказки, якщо ні - завантажити
     * скрипт і запустити сценарй підказок
     */
	if(document.cookie && !showedEnjoyhint()) {
		$.getScript("js/enjoyhintStart.js", function () {
            enjoyhintStart();
            setCookie();
        });
	}
});

/**
 * Listener для кнопки "підтримати проект"
 */
$('#open-donate').click(function (event) {
            $('#floatingCirclesG').show();
            $('#content').hide();
            tabs.removeClass('active');
            $.ajax({
				url: 'donate.html',
				success: function (response) {
					$('#content').html(response);
                }
            });
});


/**
 * перевіряє чи встановлені cookie
 * які відповідають за те,
 * чи показувались користувачу enjoyhint
 * @return boolean
 */
function showedEnjoyhint() {
	var  ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		if (ca[i] == "hint=1") {
        	return (true);
        }
	}
	return (false);
}

