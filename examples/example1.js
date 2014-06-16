function buildTooltip($elem,alignment,message,tooltipType) {
	if( message == null || message == undefined )
		message = $elem.attr('title');
	
	if( tooltipType == null || tooltipType == undefined )	
	tooltipType = 'info';
	
	$elem.tooltip({
		'text' : message,
		'gapBetweenElementAndTooltip' : 5,
		'alignmentType' : alignment,
		'tooltipType' : tooltipType
		});
}

$(document).ready(function(){
	
	buildTooltip($('h2'),'BOTTOM-CENTER');
	buildTooltip($('p'),'RIGHT');
	buildTooltip($('div'),'LEFT');
	buildTooltip($('form'),'TOP-CENTER');
	$('input').each(function(){
		buildTooltip($(this),'RIGHT');
	});
	
	buildTooltip($('ul'),'LEFT', ' Unordered List Tooltip ');
	
	buildTooltip($('h3'),'TOP-LEFT', ' TOP-LEFT Alignment ');
	buildTooltip($('h3'),'TOP-CENTER', ' TOP-CENTER Alignment ');
	buildTooltip($('h3'),'TOP-RIGHT', ' TOP-RIGHT Alignment ');

	buildTooltip($('h3'),'LEFT', ' LEFT Alignment ', 'fail');
	buildTooltip($('h3'),'RIGHT', ' RIGHT Alignment ');
	
	buildTooltip($('h3'),'BOTTOM-LEFT', ' BOTTOM-LEFT Alignment ', 'error');
	buildTooltip($('h3'),'BOTTOM-CENTER', ' BOTTOM-CENTER Alignment ', 'warn');
	buildTooltip($('h3'),'BOTTOM-RIGHT', ' BOTTOM-RIGHT Alignment ', 'success');	
});