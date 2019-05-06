$(function(){
	function timer(settings){
		var config = {
			endDate: '2019-05-10 10:00',
			timeZone: 'Asia/Kolkata',
			hours: $('#hours'),
			minutes: $('#minutes'),
			seconds: $('#seconds'),
			newSubMessage: 'and should be back online in a few minutes...'
		};
		function prependZero(number){
			return number < 10 ? '0' + number : number;
		}
		$.extend(true, config, settings || {});
		var currentTime = moment();
		var endDate = moment.tz(config.endDate, config.timeZone);
		var diffTime = endDate.valueOf() - currentTime.valueOf();
		var duration = moment.duration(diffTime, 'milliseconds');
		var days = duration.days();
		var asDays = parseInt(duration.asDays());
		var interval = 1000;
		var subMessage = $('.sub-message');
		var clock = $('.clock');
		if(diffTime < 0){
			endEvent(subMessage, config.newSubMessage, clock);
			return;
		}
		if(asDays > 0){
			$('#asDays').text(prependZero(asDays));
			$('.asDays').css('display', 'inline-block');
		}
		var intervalID = setInterval(function(){
			duration = moment.duration(duration - interval, 'milliseconds');
			var hours = duration.hours(),
				minutes = duration.minutes(),
				seconds = duration.seconds();
			asDays = parseInt(duration.asDays());
			if(hours  <= 0 && minutes <= 0 && seconds  <= 0 && asDays <= 0){
				clearInterval(intervalID);
				endEvent(subMessage, config.newSubMessage, clock);
				window.location.reload();
			}
			if(asDays === 0){
				$('.asDays').hide();
			}
			$('#asDays').text(prependZero(asDays));
			config.hours.text(prependZero(hours));
			config.minutes.text(prependZero(minutes));
			config.seconds.text(prependZero(seconds));
		}, interval);
	}
	function endEvent($el, newText, hideEl){
		$el.text(newText);
		hideEl.hide();
	}
	timer();
});
