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
			})
		});

		$('#open-donate').click(function (event) {
            $('#floatingCirclesG').show();
            $('#content').hide();
            tabs.removeClass('active');
            $.ajax({
				url: 'donate.html',
				success: function (response) {
					$('#content').html(response);
                }
			})
        });