'use strict';


    var $color = $('.selected').css('background-color');
    var $canvas = $('canvas');
    var context = $canvas[0].getContext('2d');
    var lastEvent;
    var mouseDown = false;

(function($) {
  $(document).ready(function() {
    // Add your jQuery code here

    //clicking event on control list items
    $('.controls').on('click', 'li', function() {
    	//deselect
    	$(this).siblings().removeClass('selected');
    	//select new
    	$(this).addClass('selected');
    	//catch current color
    	$color = $(this).css('background-color');
    });
    //new color
    $('#revealColorSelect').click(function() {
    	//show or hide the color selector
    	changeColor();
    	$('#colorSelect').toggle();
    });
    //
    function changeColor() {
    	var r = $('#red').val();
    	var g = $('#green').val();
    	var b = $('#blue').val();
    	$('#newColor').css('background-color','rgb('+ r + ',' + g + ',' + b +')');
    }
    //when sliders change
    $('input[type=range]').change(changeColor);
    //Add color
    $('#addNewColor').click(function() {
    	var $newColor = $('<li></li>');
	    $newColor.css('background-color', $('#newColor').css('background-color'));
    	$('.controls ul').append($newColor);
    	$newColor.click();
    });
    //Mouse events on the canvas
    $canvas.mousedown(function(event) {
    	lastEvent = event;
    	mouseDown = true;
    }).mousemove(function(e) {
    //Drawing
	    if(mouseDown) {
		    context.beginPath();
		    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		    context.lineTo(e.offsetX, e.offsetY);
		    context.stroke();
		    context.strokeStyle = $color;
		    lastEvent = e;
		}
    }).mouseup(function() {
    	mouseDown = false;
    });


  });
})(jQuery);
