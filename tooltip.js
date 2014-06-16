
(function($) {
    var tooltipCounter = 1 ;
    var elementCounter = 1 ;
    
	$.fn.tooltip = function(settings) {

		var config = {
				 		'tooltipType' : 'info',
				 		'tooltipIcon' : true,
				 		'backgroundColor' : 'black',
						'borderColor' : 'black',
						'fontColor' : 'black',
						'fontWeight' : 'bold',
						'fontFamily' : 'Helvetica,Arial, Verdana',
						'fontSize' : '12px',
						'alignmentType' : 'BOTTOM-CENTER',
						'width' : 200,
						'height' : 40,
						'padding' : '0px 3px 0px 3px',

						'word-wrap' : 'break-word',
						'overflow' : 'auto',
						
						'borderWidth' : 2,
						'arrowWidth' : 10,
						'borderRadius' : 5,

						'gapBetweenElementAndTooltip' : 10,
						'text' : '',
						
						'visibility' : 'hidden',
						
						'mouseover' : 'visible',
						'mouseout' : 'hidden',
						'focus' : 'visible',
						
						'hideOnClick' : 'true',
						'opacity' : 0.8,
						
						'displayIcon' : 'true',
						
						'inputMouseOut' : function(tte){ $(tte).stop().show().hide(); },
						'inputMouseOver' : function(tte) {  $(tte).stop().hide().show();},
						'inputFocus' : function(tte) { },
						'inputBlur' : function(tte) { },
						'inputClick' : function(tte) { },
						'inputHover' : function(tte) { },
						
						'tteMouseOut' : function(tte) { },
						'tteMouseOver' : function(tte) { },
						'tteBlur' : function(tte) { },
						'tteFocus' : function(tte) { },
						'tteClick' : function(tte) { $(tte).stop().show().hide(); } ,
						'tteHover' : function(tte) { }
		 			 };

			    if (settings) {
			    	$.extend(config, settings);
			    }
			    
				this.each(function() {
					var backgroundColor = config.backgroundColor;
					var borderColor = config.borderColor;
					var fontColor = config.fontColor;
					var fontWeight = config.fontWeight;
					var fontFamily = config.fontFamily;
					var fontSize = config.fontSize;
					
					// LEFT, TOP-LEFT, TOP-CENTER, TOP-RIGHT, RIGHT, BOTTOM-LEFT, BOTTOM-CENTER, BOTTOM-RIGHT
					var alignmentType = config.alignmentType;	

					var text = config.text;

					var inputElement = $(this);
					var offset = inputElement.offset();

					var inputXPos = offset.left;
					var inputYPos = offset.top;

					var tooltipElement = $('<span>');
					var tooltipType = config.tooltipType;
					var tooltipIcon = config.tooltipIcon;

					if( fontColor != null && fontColor != undefined && fontColor.length > 0 )
						config.fontColor = fontColor;
					if( backgroundColor != null && backgroundColor != undefined && backgroundColor.length > 0 )
						config.backgroundColor = backgroundColor;
					if( borderColor != null && borderColor != undefined && borderColor.length > 0 )
						config.borderColor = borderColor;
					var tooltipContent = "";

					var tooltipArrow = $('<span></span>');
					var tooltipArrowOuter = $('<span></span>');

					var gapBetweenElementAndTooltip = config.gapBetweenElementAndTooltip;

					var tooltipWidth = config.width;
					var tooltipHeight = config.height;
					
					 
					var visibility = config.visibility;
					var hideOnClick = config.hideOnClick;
					var opacity = config.opacity;
					
					if( tooltipIcon == false )
						tooltipContent = "<span></span><span>";
					else
						tooltipContent = "<span class='"+tooltipIconClass+"'></span><span>";
					
					if( text != null && text != undefined && text.length > 0 )
						tooltipContent += text;
					else
						tooltipContent += 'This is a Tooltip ';

					tooltipContent += '</span>';

					tooltipElement.html(tooltipContent);
					
					var tooltipIconClass = 'jtip-no-icon ';
					var tooltipClass = 'jtip-default';
						switch( tooltipType ) {
							case "info" :
								tooltipClass = 'jtip-info';
								tooltipIconClass = 'jtip-icon-info';
								break;
							case "warn" :
								tooltipClass = 'jtip-warn';
								tooltipIconClass = 'jtip-icon-warn';
								break;
							case "error" :
								tooltipClass = 'jtip-error';
								tooltipIconClass = 'jtip-icon-error';
								break;
							case "success" :
								tooltipClass = 'jtip-success';
								tooltipIconClass = 'jtip-icon-success';
								break;
							case "fail" :
								tooltipClass = 'jtip-fail';
								tooltipIconClass = 'jtip-icon-fail';
								break;
							case "custom":
								tooltipClass = 'jtip-custom';
								tooltipIconClass = 'jtip-icon-custom';
								break;
							default :
								tooltipClass = 'jtip-default';
								tooltipIconClass = 'jtip-no-icon ';
						}
						tooltipElement.addClass(tooltipClass);

						var elem = getTempElement();
						$(elem).addClass(tooltipClass);
						config.backgroundColor = $(elem).css("background-color");
						config.borderColor = $(elem).css("border-left-color");
						config.fontColor = $(elem).css('color');
						removeTempElement(elem);

						var tooltipElementProps = {
												tooltipWidth : config.width,
												tooltipHeight : config.height,
												elementXPos : inputXPos,
												elementYPos : inputYPos,
												elementWidth : $(this).outerWidth(),
												elementHeight : $(this).outerHeight(),
												gapBetweenElementAndTooltip : config.gapBetweenElementAndTooltip,
												alignmentType : alignmentType,
												tooltipElement : tooltipElement,
												tooltipArrow : tooltipArrow,
												tooltipArrowOuter : tooltipArrowOuter,
												backgroundColor : config.backgroundColor, 
												borderColor : config.borderColor,
												arrowAlignmentType : "LEFT",
												tooltipXPos : 0,
												tooltipYPos : 0,
												arrowWidth : config.arrowWidth,
												borderWidth : config.borderWidth,

												fontWeight : config.fontWeight,
												fontFamily : config.fontFamily,
												fontSize : config.fontSize,
												padding : '0px 3px 0px 3px',												
												heightNeeded : 40
											  };

					tooltipElementProps.heightNeeded = getHeightNeeded(text,tooltipElementProps);
											  
					positionTooltip(tooltipElementProps);

					tooltipElement.css({
										'background' : config.backgroundColor,
										
										'border-color' : config.borderColor,
										'border-style' : 'solid',
										'border-width' : tooltipElementProps.borderWidth+'px',
										'border-radius' : config.borderRadius,

										'color' : config.fontColor,
										'font-weight' : fontWeight,
										'font-family' : fontFamily,
										'font-size' : fontSize,

										'width' : tooltipWidth,
										'max-width' : tooltipWidth,
										'min-height' : tooltipHeight,
										'padding' : '0px 3px 0px 3px',

										'word-wrap' : 'break-word',
										'overflow' : 'auto'
									});

					var tooltipID = "tooltip-"+tooltipCounter;

					var tooltipContainerElement = $("<span id='"+tooltipID+"'></span>");

					tooltipContainerElement.append(tooltipElement);
					tooltipContainerElement.append(tooltipArrow);
					tooltipContainerElement.append(tooltipArrowOuter);
					
					tooltipContainerElement.css({
													'opacity' : opacity
												});
					
					$('body').append(tooltipContainerElement);

					if( visibility === 'hidden' )
						$('#'+tooltipID).hide();
					
					// Bind Events to Input Element based on user defined functions
					inputElement.bind("mouseout",function(){
						config.inputMouseOut.call(this,$('#'+tooltipID));
					});
					
					inputElement.bind("mouseover",function(){
						config.inputMouseOver.call(this,$('#'+tooltipID));
					});	

					inputElement.bind("focus",function(){
						config.inputFocus.call(this,$('#'+tooltipID));
					});

					inputElement.bind("blur",function(){
						config.inputBlur.call(this,$('#'+tooltipID));
					});
					
					inputElement.bind("click",function(){
						config.inputClick.call(this,$('#'+tooltipID));
					});
					
					inputElement.bind("hover",function(){
						config.inputHover.call(this,$('#'+tooltipID));
					});
					
					// Bind Events to Tool tip Element based on user defined functions
					$('#'+tooltipID).bind("mouseout",function(){
						config.tteMouseOut.call(this,$('#'+tooltipID));
					});
					
					$('#'+tooltipID).bind("mouseover",function(){
						config.tteMouseOver.call(this,$('#'+tooltipID));
					});	

					$('#'+tooltipID).bind("focus",function(){
						config.tteFocus.call(this,$('#'+tooltipID));
					});

					$('#'+tooltipID).bind("blur",function(){
						config.tteBlur.call(this,$('#'+tooltipID));
					});
					
					$('#'+tooltipID).bind("click",function(){
						config.tteClick.call(this,$('#'+tooltipID));
					});
					
					$('#'+tooltipID).bind("hover",function(){
						config.tteHover.call(this,$('#'+tooltipID));
					});

					var elementID = inputElement.attr('id');
					if( elementID == null || elementID == undefined || elementID.length == 0 ) {
						elementID = inputElement.prop('tagName')+'-'+elementCounter;
						inputElement.attr('id',elementID);
						elementCounter++;
					}
					
					var existingData = $('#'+elementID).data("tooltipIDList");
					if( existingData == null || existingData == undefined || existingData.length == 0 )					
						$('#'+elementID).data("tooltipIDList",""+tooltipID);
					else {
						var newData = existingData+','+tooltipID;
						$('#'+elementID).data("tooltipIDList",""+newData);
					}
					
					tooltipCounter++;				
				});
		
		function hide(tooltipID) {
			$('#'+tooltipID).stop().show().hide();
		}
		
		function show(tooltipID) {
			$('#'+tooltipID).stop().hide().show();
		}
		
		function toggle(tooltipID) {
			$('#'+tooltipID).stop().toggle();
		}

		function positionTooltip( tteProps ) {

			var windowWidth = $(window).width();
			var windowHeight = $(window).height();

			if( tteProps.alignmentType === 'RIGHT' ) {
				alignRight( tteProps );
			}

			else if( tteProps.alignmentType === 'LEFT' ) {
				alignLeft( tteProps );
			}

			else if( tteProps.alignmentType === 'TOP-CENTER' ) {
				alignTopCenter( tteProps );
			}

			else if( tteProps.alignmentType === 'TOP-LEFT' ) {
				alignTopLeft( tteProps );
			}

			else if( tteProps.alignmentType === 'TOP-RIGHT' ) {
				alignTopRight( tteProps );
			}

			else if( tteProps.alignmentType === 'BOTTOM-CENTER' ) {
				alignBottomCenter( tteProps );
			}

			else if( tteProps.alignmentType === 'BOTTOM-LEFT' ) {
				alignBottomLeft( tteProps );
			}

			else if( tteProps.alignmentType === 'BOTTOM-RIGHT' ) {
				alignBottomRight( tteProps );
			}
			
			tteProps.tooltipElement.css({
				'position' : 'absolute',
				'left' : tteProps.tooltipXPos,
				'top' : tteProps.tooltipYPos
			});

		if( tteProps.arrowAlignmentType === 'TOP-LEFT' )
			alignArrowTopLeft(tteProps);
		else if( tteProps.arrowAlignmentType === 'TOP-CENTER' )
			alignArrowTopCenter(tteProps);
		else if( tteProps.arrowAlignmentType === 'TOP-RIGHT' )
			alignArrowTopRight(tteProps);

		else if( tteProps.arrowAlignmentType === 'BOTTOM-LEFT' )
			alignArrowBottomLeft(tteProps);
		else if( tteProps.arrowAlignmentType === 'BOTTOM-CENTER' )
			alignArrowBottomCenter(tteProps);
		else if( tteProps.arrowAlignmentType === 'BOTTOM-RIGHT' )
			alignArrowBottomRight(tteProps);

		else if( tteProps.arrowAlignmentType === 'RIGHT' )
			alignArrowRight(tteProps);	
		else if( tteProps.arrowAlignmentType === 'LEFT' )
			alignArrowLeft(tteProps);
	}
		
		function alignRight( tteProps ) {
			tteProps.tooltipXPos = tteProps.elementXPos + tteProps.elementWidth + tteProps.gapBetweenElementAndTooltip;
			tteProps.tooltipYPos = tteProps.elementYPos ;

			tteProps.arrowAlignmentType = "LEFT";

			
			if( (tteProps.tooltipXPos + tteProps.tooltipWidth) > $(window).width() ) {
				//alignBottomCenter(tteProps);
				alignBottomRight(tteProps);
				//alignBottomLeft(tteProps);
			} 		
		}
		
		function alignLeft( tteProps ) {
			tteProps.tooltipXPos = tteProps.elementXPos - tteProps.gapBetweenElementAndTooltip - tteProps.tooltipWidth ;
			tteProps.tooltipYPos = tteProps.elementYPos ;

			tteProps.arrowAlignmentType = "RIGHT";
			
			 // If Hides from left
			if( tteProps.tooltipXPos < 0 || ( tteProps.tooltipXPos + tteProps.tooltipWidth + tteProps.gapBetweenElementAndTooltip > tteProps.elementXPos ) ) {
				//alignBottomCenter(tteProps);
				//alignBottomRight(tteProps);
				alignBottomLeft(tteProps);
				//alignRight(tteProps);
			}
		}

		function alignTopLeft( tteProps ) {
			tteProps.tooltipXPos = tteProps.elementXPos ;
			tteProps.tooltipYPos = tteProps.elementYPos - tteProps.tooltipHeight - tteProps.gapBetweenElementAndTooltip;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				tteProps.tooltipYPos = tteProps.elementYPos - tteProps.heightNeeded - tteProps.gapBetweenElementAndTooltip;

			tteProps.arrowAlignmentType = "BOTTOM-LEFT";
			if( tteProps.tooltipXPos < 0 )
				alignTopRight(tteProps);
			else if( tteProps.tooltipYPos < 0 )
				alignBottomLeft(tteProps);
			else if( tteProps.elementYPos < (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) )
				alignBottomLeft(tteProps);
		}
		
		function alignTopCenter( tteProps ) {
			tteProps.tooltipXPos = (tteProps.elementXPos + tteProps.elementWidth ) - (tteProps.tooltipWidth)/2;
			tteProps.tooltipYPos = tteProps.elementYPos - tteProps.tooltipHeight - tteProps.gapBetweenElementAndTooltip;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				tteProps.tooltipYPos = tteProps.elementYPos - tteProps.heightNeeded - tteProps.gapBetweenElementAndTooltip;
				
			tteProps.arrowAlignmentType = "BOTTOM-CENTER";

			if( tteProps.tooltipXPos < 0 )
				alignTopRight(tteProps);
			else if( tteProps.tooltipYPos < 0 )
				alignBottomCenter(tteProps);
			else if( tteProps.elementYPos < (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) )
				alignBottomCenter(tteProps);				
		}
		
		function alignTopRight( tteProps ) {
			tteProps.tooltipXPos = tteProps.elementXPos + tteProps.elementWidth - (tteProps.tooltipWidth + (2*tteProps.borderWidth) + (2*tteProps.borderWidth) ) ;
			tteProps.tooltipYPos = tteProps.elementYPos - tteProps.tooltipHeight - tteProps.gapBetweenElementAndTooltip;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				tteProps.tooltipYPos = tteProps.elementYPos - tteProps.heightNeeded - tteProps.gapBetweenElementAndTooltip;

			tteProps.arrowAlignmentType = "BOTTOM-RIGHT";

			if( (tteProps.tooltipXPos <=  0 ) || ((tteProps.tooltipXPos + tteProps.tooltipWidth) <= 0 ) )
				alignTopLeft(tteProps);
			else if( tteProps.tooltipYPos < 0 )
				alignBottomRight(tteProps);
			else if( tteProps.elementYPos < (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) )
				alignBottomRight(tteProps);				
		}
		
		function alignBottomLeft( tteProps ) {
			tteProps.tooltipXPos = tteProps.elementXPos ;
			tteProps.tooltipYPos = tteProps.elementYPos +  tteProps.elementHeight + tteProps.gapBetweenElementAndTooltip;

			tteProps.arrowAlignmentType = "TOP-LEFT";

			if( tteProps.tooltipXPos < 0 )
				alignBottomRight(tteProps);
		}
		
		function alignBottomCenter( tteProps ) {
			tteProps.tooltipXPos = (tteProps.elementXPos + (tteProps.elementWidth )/2) - ((tteProps.tooltipWidth)/2) ;
			tteProps.tooltipYPos = tteProps.elementYPos +  tteProps.elementHeight + tteProps.gapBetweenElementAndTooltip;

			tteProps.arrowAlignmentType = "TOP-CENTER";		
			
			if( tteProps.tooltipXPos < 0 )
				alignBottomRight(tteProps);
		}
		
		function alignBottomRight( tteProps ) {
			tteProps.tooltipXPos = tteProps.elementXPos + tteProps.elementWidth - (tteProps.tooltipWidth + (2*tteProps.borderWidth) + (2*tteProps.borderWidth) );
			tteProps.tooltipYPos = tteProps.elementYPos + tteProps.elementHeight + tteProps.gapBetweenElementAndTooltip;

			tteProps.arrowAlignmentType = "TOP-RIGHT";

			if( (tteProps.tooltipXPos <=  0 ) || ((tteProps.tooltipXPos + tteProps.tooltipWidth) <= 0 ) )
				alignBottomLeft(tteProps);
		}
		
		function alignArrowTopLeft( tteProps ) {
			/* Arrow-Up Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : tteProps.backgroundColor
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos + tteProps.arrowWidth,
								'top' : tteProps.tooltipYPos - (tteProps.arrowWidth - (tteProps.borderWidth+(tteProps.borderWidth/2))),

								'z-index' : '1000'
							});

			tteProps.tooltipArrowOuter.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : tteProps.borderColor
								
							});

			tteProps.tooltipArrowOuter.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos + tteProps.arrowWidth,
								'top' : tteProps.tooltipYPos - tteProps.arrowWidth 
							});								
		}

		function alignArrowTopCenter(tteProps) {
			/* Arrow-Top-Center Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : tteProps.backgroundColor
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos+ (tteProps.tooltipWidth/2) - tteProps.arrowWidth ,
								'top' : tteProps.tooltipYPos - (tteProps.arrowWidth - (tteProps.borderWidth+(tteProps.borderWidth/2))) ,

								'z-index' : '1000'
							});

			tteProps.tooltipArrowOuter.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : tteProps.borderColor
								
							});

			tteProps.tooltipArrowOuter.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos+ (tteProps.tooltipWidth/2) - tteProps.arrowWidth ,
								'top' : tteProps.tooltipYPos - tteProps.arrowWidth 
							});			
		}
		
		function alignArrowTopRight(tteProps) {
			/* Arrow-Top-Right Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : tteProps.backgroundColor
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos+ tteProps.tooltipWidth - (2*tteProps.arrowWidth),
								'top' : tteProps.tooltipYPos - (tteProps.arrowWidth - (tteProps.borderWidth+(tteProps.borderWidth/2))),

								'z-index' : '1000'
							});

			tteProps.tooltipArrowOuter.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : tteProps.borderColor
								
							});

			tteProps.tooltipArrowOuter.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos+ tteProps.tooltipWidth - (2*tteProps.arrowWidth),
								'top' : tteProps.tooltipYPos - tteProps.arrowWidth 
							});
		}
		
		function alignArrowBottomLeft(tteProps) {
			var top =  tteProps.tooltipYPos + (tteProps.tooltipHeight - (tteProps.borderWidth + (tteProps.borderWidth/2))) ;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				top = tteProps.tooltipYPos + tteProps.heightNeeded - tteProps.borderWidth;
			
			var topOuter = tteProps.tooltipYPos + tteProps.tooltipHeight + tteProps.borderWidth ;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				topOuter = tteProps.tooltipYPos + tteProps.heightNeeded + tteProps.borderWidth  ;

			/* Arrow-Bottom-Left Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-top-width' : tteProps.arrowWidth+'px',
								'border-top-style' : 'solid',
								'border-top-color' : tteProps.backgroundColor
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos + (tteProps.arrowWidth) ,
								'top' : top ,

								'z-index' : '1000'
							});

			tteProps.tooltipArrowOuter.css({
				'width' : '0',
				'height' : '0',
				
				'border-left-width' : tteProps.arrowWidth+'px',
				'border-left-style' : 'solid',
				'border-left-color' : 'transparent',
					
				'border-right-width' : tteProps.arrowWidth+'px',
				'border-right-style' : 'solid',
				'border-right-color' : 'transparent',
									
				'border-top-width' : tteProps.arrowWidth+'px',
				'border-top-style' : 'solid',
				'border-top-color' : tteProps.borderColor
				
			});

			tteProps.tooltipArrowOuter.css({
				'position' : 'absolute',
				'left' : tteProps.tooltipXPos + (tteProps.arrowWidth) ,
				'top' : topOuter
			});
		}

		function alignArrowBottomCenter(tteProps) {
			var top =  tteProps.tooltipYPos + (tteProps.tooltipHeight - (tteProps.borderWidth + (tteProps.borderWidth/2))) ;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				top = tteProps.tooltipYPos + tteProps.heightNeeded - tteProps.borderWidth;
			
			var topOuter = tteProps.tooltipYPos + tteProps.tooltipHeight + tteProps.borderWidth ;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				topOuter = tteProps.tooltipYPos + tteProps.heightNeeded + tteProps.borderWidth  ;

			/* Arrow-Bottom-Center Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-top-width' : tteProps.arrowWidth+'px',
								'border-top-style' : 'solid',
								'border-top-color' : tteProps.backgroundColor
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos + (tteProps.tooltipWidth/2) - (tteProps.arrowWidth) ,
								'top' : top ,

								'z-index' : '1000'
							});

			tteProps.tooltipArrowOuter.css({
				'width' : '0',
				'height' : '0',
				
				'border-left-width' : tteProps.arrowWidth+'px',
				'border-left-style' : 'solid',
				'border-left-color' : 'transparent',
					
				'border-right-width' : tteProps.arrowWidth+'px',
				'border-right-style' : 'solid',
				'border-right-color' : 'transparent',
									
				'border-top-width' : '12px',
				'border-top-style' : 'solid',
				'border-top-color' : tteProps.borderColor
				
			});

			tteProps.tooltipArrowOuter.css({
				'position' : 'absolute',
				'left' : tteProps.tooltipXPos + (tteProps.tooltipWidth/2) - (tteProps.arrowWidth) ,
				'top' : topOuter
			});			
		}

		function alignArrowBottomRight(tteProps) {
			var top =  tteProps.tooltipYPos + (tteProps.tooltipHeight - (tteProps.borderWidth + (tteProps.borderWidth/2))) ;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				top = tteProps.tooltipYPos + tteProps.heightNeeded - tteProps.borderWidth;
			
			var topOuter = tteProps.tooltipYPos + tteProps.tooltipHeight + tteProps.borderWidth ;
			if( (tteProps.heightNeeded-tteProps.gapBetweenElementAndTooltip) > tteProps.tooltipHeight )
				topOuter = tteProps.tooltipYPos + tteProps.heightNeeded + tteProps.borderWidth  ;

			/* Arrow-Bottom-Right Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : 'transparent',
									
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : 'transparent',
													
								'border-top-width' : tteProps.arrowWidth+'px',
								'border-top-style' : 'solid',
								'border-top-color' : tteProps.backgroundColor
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos + tteProps.tooltipWidth - (2*tteProps.arrowWidth) - (tteProps.arrowWidth/2) ,
								'top' : top ,

								'z-index' : '1000'
							});

			tteProps.tooltipArrowOuter.css({
				'width' : '0',
				'height' : '0',
				
				'border-left-width' : tteProps.arrowWidth+'px',
				'border-left-style' : 'solid',
				'border-left-color' : 'transparent',
					
				'border-right-width' : tteProps.arrowWidth+'px',
				'border-right-style' : 'solid',
				'border-right-color' : 'transparent',
									
				'border-top-width' : tteProps.arrowWidth+'px',
				'border-top-style' : 'solid',
				'border-top-color' : tteProps.borderColor
				
			});

			tteProps.tooltipArrowOuter.css({
				'position' : 'absolute',
				'left' : tteProps.tooltipXPos+ tteProps.tooltipWidth - (2*tteProps.arrowWidth) - (tteProps.arrowWidth/2),
				'top' : topOuter
			});			
		}

		function alignArrowRight(tteProps) {
			/* Arrow-Right Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',
													
								'border-top-width' : tteProps.arrowWidth+'px',
								'border-top-style' : 'solid',
								'border-top-color' : 'transparent',

								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : 'transparent',
								
								'border-left-width' : tteProps.arrowWidth+'px',
								'border-left-style' : 'solid',
								'border-left-color' : tteProps.backgroundColor,

								'z-index' : '1000'
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos + tteProps.tooltipWidth + (2*tteProps.borderWidth) + (tteProps.borderWidth/2),
								'top' : tteProps.tooltipYPos + (2*tteProps.borderWidth + (tteProps.borderWidth/2) )
							});

			tteProps.tooltipArrowOuter.css({
				'width' : '0',
				'height' : '0',
									
				'border-top-width' : tteProps.arrowWidth+'px',
				'border-top-style' : 'solid',
				'border-top-color' : 'transparent',

				'border-bottom-width' : tteProps.arrowWidth+'px',
				'border-bottom-style' : 'solid',
				'border-bottom-color' : 'transparent',
				
				'border-left-width' : tteProps.arrowWidth+'px',
				'border-left-style' : 'solid',
				'border-left-color' : tteProps.borderColor

				
			});

			tteProps.tooltipArrowOuter.css({
				'position' : 'absolute',
				'left' : tteProps.tooltipXPos + tteProps.tooltipWidth + (4*tteProps.borderWidth),
				'top' : tteProps.tooltipYPos + (2*tteProps.borderWidth + (tteProps.borderWidth/2))
			});
		}

		function alignArrowLeft(tteProps) {
			/* Arrow-Left Class */
			tteProps.tooltipArrow.css({
								'width' : '0',
								'height' : '0',

								'border-top-width' : tteProps.arrowWidth+'px',
								'border-top-style' : 'solid',
								'border-top-color' : 'transparent',
									
								'border-bottom-width' : tteProps.arrowWidth+'px',
								'border-bottom-style' : 'solid',
								'border-bottom-color' : 'transparent',
													
								'border-right-width' : tteProps.arrowWidth+'px',
								'border-right-style' : 'solid',
								'border-right-color' : tteProps.backgroundColor,

								'z-index' : '1000'								
							});

			tteProps.tooltipArrow.css({
								'position' : 'absolute',
								'left' : tteProps.tooltipXPos - (2*tteProps.borderWidth) ,
								'top' : tteProps.tooltipYPos + (3*tteProps.borderWidth)
							});

			tteProps.tooltipArrowOuter.css({
				'width' : '0',
				'height' : '0',
									
				'border-top-width' : tteProps.arrowWidth+'px',
				'border-top-style' : 'solid',
				'border-top-color' : 'transparent',
					
				'border-bottom-width' : tteProps.arrowWidth+'px',
				'border-bottom-style' : 'solid',
				'border-bottom-color' : 'transparent',
									
				'border-right-width' : tteProps.arrowWidth+'px',
				'border-right-style' : 'solid',
				'border-right-color' : tteProps.borderColor
			});

			tteProps.tooltipArrowOuter.css({
				'position' : 'absolute',
				'left' : tteProps.tooltipXPos - (4*tteProps.borderWidth),
				'top' : tteProps.tooltipYPos + (3*tteProps.borderWidth)
			});				
		}

		function getTempElement() {
			var div = document.createElement("span");
			div.style.position="absolute";
		    div.style.top="0px";
		    div.style.left="0px";
		    
		    div.style.width="0px";
		    document.body.appendChild(div);			
			return div;
		}
		
		function removeTempElement(elem){
			$(elem).remove();
		}
		function getHeightNeeded(content,tteProps) {
		    var text = content;
		    var div = document.createElement("span");
		    div.style.position="fixed";
		    div.style.top="0px";
		    div.style.left="0px";
		    
		    div.style.width= tteProps.tooltipWidth+"px";
//		    div.style.minHeight = "40px";
		    div.style.overflow="auto";
		    div.style.wordWrap = "break-word";
			div.style.borderWidth = tteProps.borderWidth;
			div.style.borderRadius = tteProps.borderRadius;

			div.style.backgroundColor = tteProps.backgroundColor;
			div.style.borderColor = tteProps.borderColor;
			div.style.color = tteProps.color;
			
			div.style.fontWeight = tteProps.fontWeight;
			div.style.fontSize = tteProps.fontSize;
			div.style.padding = tteProps.padding;
			div.style.fontFamily = tteProps.fontFamily;

		    div.id = "wid";
		    div.innerHTML=text;
		    document.body.appendChild(div);
		    
		    var w = document.getElementById("wid").offsetHeight;
		    var w1= document.getElementById('wid').scrollHeight;

			console.log('OH : '+w+', SH : '+w1);

		    $('#wid').remove();

		    return (w1);
		}
		/* Allow jQuery chaining */
		return this;
	};
	
}(jQuery));
