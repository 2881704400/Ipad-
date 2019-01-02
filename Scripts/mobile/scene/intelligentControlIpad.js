function intelligentControlIpad() {
	var $document = $(document);
	var selector = '[data-rangeslider]';
	var $inputRange = $(selector);

	// Example functionality to demonstrate a value feedback
	// and change the output's value.
	function valueOutput(element) {
		var value = element.value;
		          var output = element.parentNode.getElementsByTagName('output')[0];

		          output.innerHTML = value;
	}

	// Initial value output
	for(var i = $inputRange.length - 1; i >= 0; i--) {
		valueOutput($inputRange[i]);
	};

	// Update value output
	$document.on('input', selector, function(e) {
		valueOutput(e.target);
	});

	// Initialize the elements
	$inputRange.rangeslider({
		polyfill: false
	});

	// Example functionality to demonstrate programmatic value changes
	$document.on('click', '#js-example-change-value button', function(e) {
		var $inputRange = $('input[type="range"]', e.target.parentNode);
		var value = $('input[type="number"]', e.target.parentNode)[0].value;

		$inputRange
			.val(value)
			.change();
	});

	// Example functionality to demonstrate programmatic attribute changes
	$document.on('click', '#js-example-change-attributes button', function(e) {
		var $inputRange = $('input[type="range"]', e.target.parentNode);
		var attributes = {
			min: $('input[name="min"]', e.target.parentNode)[0].value,
			max: $('input[name="max"]', e.target.parentNode)[0].value,
			step: $('input[name="step"]', e.target.parentNode)[0].value
		};

		$inputRange
			.attr(attributes)
			.rangeslider('update', true);
	});

	// Example functionality to demonstrate destroy functionality
	$document
		.on('click', '#js-example-destroy button[data-behaviour="destroy"]', function(e) {
			$('input[type="range"]', e.target.parentNode).rangeslider('destroy');
		})
		.on('click', '#js-example-destroy button[data-behaviour="initialize"]', function(e) {
			$('input[type="range"]', e.target.parentNode).rangeslider({
				polyfill: false
			});
		});
	
	$(".contentDivIntellleftIpad").bind('touchstart',function(){
		$(".contentDivIntellleftIpad i,.contentDivIntellleftIpad label").css("color","#fdbf16")
	});
	$(".contentDivIntellleftIpad").bind('touchend',function(){
		$(".contentDivIntellleftIpad i,.contentDivIntellleftIpad label").css("color","#33CABD")
	});
	
	$(".contentDivIntellcenterIpad").bind('touchstart',function(){
		$(".contentDivIntellcenterIpad i,.contentDivIntellcenterIpad label").css("color","#fdbf16")
	});
	$(".contentDivIntellcenterIpad").bind('touchend',function(){
		$(".contentDivIntellcenterIpad i,.contentDivIntellcenterIpad label").css("color","#33CABD")
	});
	
	$(".contentDivIntellrightIpad").bind('touchstart',function(){
		$(".contentDivIntellrightIpad i,.contentDivIntellrightIpad label").css("color","#fdbf16")
	});
	$(".contentDivIntellrightIpad").bind('touchend',function(){
		$(".contentDivIntellrightIpad i,.contentDivIntellrightIpad label").css("color","#33CABD")
	});
	
	$(".huiyiDivleft").bind('touchstart',function(){
		$(".huiyiDivleft i,.huiyiDivleft label").css("color","#fdbf16")
	});
	$(".huiyiDivleft").bind('touchend',function(){
		$(".huiyiDivleft i,.huiyiDivleft label").css("color","#33CABD")
	});
	
	$(".huiyiDivCenter").bind('touchstart',function(){
		$(".huiyiDivCenter i,.huiyiDivCenter label").css("color","#fdbf16")
	});
	$(".huiyiDivCenter").bind('touchend',function(){
		$(".huiyiDivCenter i,.huiyiDivCenter label").css("color","#33CABD")
	});
	
	$(".huiyiDivRight").bind('touchstart',function(){
		$(".huiyiDivRight i,.huiyiDivRight label").css("color","#fdbf16")
	});
	$(".huiyiDivRight").bind('touchend',function(){
		$(".huiyiDivRight i,.huiyiDivRight label").css("color","#33CABD")
	});
}