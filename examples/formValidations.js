	var requiredErrorMessage = ' Required ';
	var numericErrorMessage = ' Invalid Data - Only Numbers are Allowed' ;
	var alphaNumericErrorMessage = ' Invalid Data - Only Letters, Numbers are Allowed ' ;
	var specifiedCharsErrorMessage = ' Invalid Data - Only a-z A-Z 0-9 space -_,.+*=!@#~?|:;% are Allowed ';
	var urlErrorMessage =  ' Invalid Url - contains Invalid Characters or not an URL ';
	var mmddyyyyDatePatternErrorMessage = ' Invalid Date - Date Format must be in MM/DD/YYYY ';
	var clientRankErrorMessage = ' Invalid Data - Only Numbers or TBD is allowed ';
	var userNameErrorMessage = ' Invalid Data - Only Letters, Spaces and Dot symbols are Allowed ';
	var dstSponsorErrorMessage = ' Invalid Data - Only Letters, Spaces and . , are Allowed ';

	function getFormOfElement(elem) {
		var form = $(elem).closest('form');
		return form;
	}
	
	function getFormIDofElement(elem) {
		var elemID = $(elem).attr('id');
		var formID = $('#'+elemID).closest('form').attr('id');
		return formID;
	}
	
	function getTooltipIDsOfElement(elem) {
		var id = $(elem).attr('id');
		if( id != undefined ) {
			var tooltipIDList = $('#'+id).data('tooltipIDList');
		
			var tooltipIDArr = tooltipIDList.split(',');
			return tooltipIDArr;	
		} else
			return null;
	}

	function isFormSubmitted(form,failureMessage,successMessage) {
		var formSubmitted = $(form).data('submitted');
		if( formSubmitted === true ) {
			updateOverlayMessage(failureMessage,false);
			return false;
		}
		else {
			$(form).data('submitted',true);
			overlayOn(successMessage,true);
			return true;
		}
	}

	function checkAllFieldsOfFormValid(form) {
		var flag = true;
		
		// Validate All Fields
		$(form).find('.inputField').each(function(index,value){
			validateField($(this));
			var fieldValid = $(this).data('fieldValid');
			if( fieldValid == false )
				flag = false;
		});
		return flag;
	}
	
	function removeError(elem) {
		$(elem).data('fieldValid',true);
		
		$(elem).css({
			'border-top': '2px inset lightgrey',
			'border-left': '2px inset lightgrey',
		
			'border-right': '2px outset lightgrey',
			'border-bottom': '2px outset lightgrey',
			'background' : 'none'
		});
		
		$(elem).css({
			'color' : 'black'
		});
				
		var tooltipIDArr = getTooltipIDsOfElement(elem);
		$(elem).data('errorTooltipPresent',false);

		if( tooltipIDArr != null ) {
			$.each(tooltipIDArr,function(index,value) {
				$('#'+value).remove();
			});
		}
	}
	
	function addError(elem,message) {
		// removeError(elem); // Remove all previous errors of this element
		$(elem).data('fieldValid',false);
		
		$(elem).css({
			'border' : '2px solid red',
			'color' : 'red'
		});

		var errTipPresent = $(elem).data('errorTooltipPresent');
		if( errTipPresent == undefined || errTipPresent == null || errTipPresent.length == 0 || errTipPresent == false )
		{
			$(elem).tooltip({
				'alignmentType' : 'RIGHT',
				'text' : message,
				'height' : 40,
				'fontWeight' : 'bold',
				'fontSize' : '15px',
				'borderWidth': 2,
				'opacity' : 1,
				'tooltipType' : 'error',
		
				inputFocus : function(tte) { },
				inputBlur : function(tte) { },			
				inputHover : function(tte) { },
				inputMouseOut : function(tte) { },
				inputMouseOver : function(tte) { }
			});
			
			$(elem).data('errorTooltipPresent',true);
		} else {
			$.each(getTooltipIDsOfElement(elem),function(index,value) {
				$('#'+value).find('span:nth-child(1)').find('span:nth-child(2)').html(message);
			});
		}
		
		
		$(elem).focus(function(){
			$.each(getTooltipIDsOfElement(elem),function(index,value) {
				$('#'+value).stop().hide().show();
			});
		});
	
		$(elem).blur(function(){
			$.each(getTooltipIDsOfElement(elem),function(index,value) {
				$('#'+value).stop().show().hide();
			});
		});
	}


	function validateField(elem) {
		var fieldClassArr = elem.attr('class').split(/\s+/);
		var fieldValid = true;
		for( var i = 0 ; i < fieldClassArr.length ; i++ ) {
			var fieldClass = fieldClassArr[i];
			if( (fieldClass === 'inputField') || ( fieldClass === 'autoFocus' ) )
				continue;

			if( fieldClass === 'required' )
				fieldValid = isEmpty(elem);
			if( (fieldValid == true) && fieldClass.indexOf('minLength') == 0 ) {
				var minChars = fieldClass.substr(('minLength'.length));
				fieldValid = hasMinimum(elem,minChars);
			}
			if( (fieldValid == true) && fieldClass.indexOf('maxLength') == 0 ) {
				var maxChars = fieldClass.substr(('maxLength'.length));
				fieldValid = hasMaximum(elem,maxChars);				
			}
			if( (fieldValid == true) && fieldClass === 'numeric' )
				fieldValid = isNumeric(elem);
			if( (fieldValid == true) && fieldClass === 'alphaNumeric' )
				fieldValid = isAlphaNumeric(elem);
			if( (fieldValid == true) && fieldClass === 'specifiedChars' )
				fieldValid = isSpecifiedChars(elem);
			if( (fieldValid == true) && fieldClass === 'userName' )
				;
			if( (fieldValid == true) && fieldClass === 'url' )
				;
			if( (fieldValid == true) && fieldClass === 'mmddyyyyDatePattern' )
				;
			
			if( fieldValid == false )
				break;
		}
	}
	
	/* Check whether field is empty */
	function isEmpty(elem) {
		var flag = true;
		var value = elem.val().trim();
		
		if( value.length == 0 ) {
			flag = false;
			addError(elem, ' Required ');
		}
		else {
			flag = true;
			removeError(elem);
		}
		return flag;
	}

	/* Check whether field has a minimum no.of characters */
	function hasMinimum(elem,minChars) {
		var flag = true;

		if(  (elem.val().length != 0) && (elem.val().length < minChars ) ) {
				flag = false;
				addError(elem, ' Should contain atleast '+minChars+' Characters ');
		} else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}

	/* Check whether field has a Maximum no.of characters */
	function hasMaximum(elem,maxChars) {
		var flag = true;

		if(  (elem.val().length != 0) && (elem.val().length > maxChars ) ) {
				flag = false;
				addError(elem, ' Should not exceed '+maxChars+' Characters ');
		} else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}

	/* Check whether field contains only Numeric Characters */
	function isNumeric(elem) {
		var flag = true;
		var numericExp = /^[0-9]+$/;

		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(numericExp) ) {
				flag = false;
				addError(elem, ' Invalid Data - Only Numbers are Allowed');
			} else
				flag = true;
		} else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}

	/* Check whether field contains only Alpha Numeric Characters */
	function isAlphaNumeric(elem) {
		var flag = true;
		var alphaNumericExp = /^[a-zA-Z0-9]+$/;
		
		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(alphaNumericExp) ) {
				flag = false;
				addError(elem, ' Invalid Data - Only Letters, Numbers are Allowed ');
			} else
				flag = true;
		} else
			flag = true;

		if( flag == true )
			removeError(elem);	

		return flag;
	}
	
	/* Check whether field starts with Alphabets */
	function startsWithAlpha(elem) {
		var flag = true;
		var startWithAlphaExp = /^[A-Za-z][a-zA-Z0-9]*$/;
		
		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(startWithAlphaExp) ) {
				flag = false;
				addError(elem, ' Invalid Data - Should start with Alphabets ');
			} else
				flag = true;
		} else
			flag = true;

		if( flag == true )
			removeError(elem);	

		return flag;
	}

	/* Check whether field starts with Numbers */
	function startsWithNumber(elem) {
		var flag = true;
		var startWithNumberExp = /^[0-9][a-zA-Z0-9]*$/;
		
		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(startWithNumberExp) ) {
				flag = false;
				addError(elem, ' Invalid Data - Should start with Numbers ');
			} else
				flag = true;
		} else
			flag = true;

		if( flag == true )
			removeError(elem);	

		return flag;
	}
	
	/* Check whether field contains only Specified Characters */
	function isSpecifiedChars(elem) {
		var flag = true;
		var userNameExp = /^[0-9a-zA-Z\s-_,.+*=!@#~?|:;%()]+$/;
		
		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(userNameExp) ) {
				flag = false;
				addError(elem, ' Invalid Data - Only a-z A-Z 0-9 space -_,.+*=!@#~?|:;% are Allowed ');
			} else
				flag = true;
		} else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}
	
	/* Check for Client Rank Field - Allow only Numbers or TBD as Values */
	function isClientRank(elem) {
		var flag = true;
		var digitsExp = /^[0-9]+$/;

		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(digitsExp) ) {
				if( elem.val() == 'TBD' )
					flag = true;
				else {
					flag = false;
					addError(elem, clientRankErrorMessage);
				}
			} else
				flag = true;
		} else
			flag = true;

		if( flag == true )
			removeError(elem);

		return flag;
	}
	
	/* Check for Name Fields which can accept only Letters, Digits, Spaces and Dot Symbols only */
	function isUserName(elem) {
		var flag = true;
		var userNameExp = /^[a-zA-Z. ]+$/;
		
		if( elem.val().length > 0 ) {
			
			if (! elem.val().match(userNameExp) ) {
				flag = false;
				addError(elem, userNameErrorMessage);
			} else
				flag = true;
		} else
			flag = true;

		if( flag == true )
			removeError(elem);

		return flag;
	}

	/* Check for Date Fields of Pattern MMDDYYYY */
	function isMMDDYYYYDatePattern(elem) {
		var flag = true;
		var datePatternExp=/^\d{1,2}\/\d{1,2}\/\d{4}$/ ; //Basic check for format validity			

		if( elem.val().length > 0 )
		{
		    if ( !datePatternExp.test(elem.val()) ) {
		    	flag = false;
		    	addError(elem, mmddyyyyDatePatternErrorMessage );
		    }
		    else
		    { 
		    	//Detailed check for valid date ranges
				var monthfield=elem.val().split("/")[0];
			    var dayfield=elem.val().split("/")[1];
			    var yearfield=elem.val().split("/")[2];

			    var dayobj = new Date(yearfield, monthfield-1, dayfield);
			    if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
			    {
			    	flag = false;
			    	addError(elem, mmddyyyyDatePatternErrorMessage);
			    }
			    else
			    	flag = true;
		    }
		}
		else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}

	/* Check for Fields which can accept  Only Urls */
	function isUrl(elem) {
		var flag = true;
		var urlExp = /((http|ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/;

		if( elem.val().length > 0 ) {
			if (! elem.val().match(urlExp) ) {
				flag = false;
				addError(elem, urlErrorMessage);
			} else
				flag = true;		
		} else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}

	/* Check for DST Sponsor */
	function isDSTSponsor(elem) {
		var flag = true;
		var dstSponsorExp = /^[a-zA-Z,. ]+$/;
		
		if( elem.val().length > 0 ) {
			if (! elem.val().match(dstSponsorExp) ) {
				flag = false;
				addError(elem, dstSponsorErrorMessage);
			} else
				flag = true;
		} else
			flag = true;
		
		if( flag == true )
			removeError(elem);

		return flag;
	}
	
$(document).ready(function() {
	
	// For All Forms in a Page
	$('form').each(function(index,value){
		//Initially, form status is set as not submitted
		$(this).data('submitted',false);
		
		/* 	For all fields in a form, set all input fields status as true initially 
			and also
			Bind Field Validation Logic to events for all fields 
		*/
		$('.inputField').each(function(index,value){
			$(this).data('fieldValid',true);
			$(this).bind('blur',function(){
				validateField($(this));
			});
		});
		
		// For required fields, set status as false initially
		$('.required').each(function(index,value){
			$(this).data('fieldValid',false);
		});
	});
	
	$('.fieldInvalid').each(function(){
		$(this).hide();
		var elem = $(this).parent().find('.inputField');
		addError(elem,$(this).html());
	});


	function getTooltipIDsOfElement(elem) {
		var id = $(elem).attr('id');
		if( id != undefined ) {
			var tooltipIDList = $('#'+id).data('tooltipIDList');
		
			var tooltipIDArr = tooltipIDList.split(',');
			return tooltipIDArr;	
		} else
			return null;
	}
	
	function buildTooltips(elem,message) {

		$(elem).tooltip({
			'text' : message,
			'height' : 40,
			'fontWeight' : 'bold',
			'fontSize' : '15px',
			'borderWidth': 2,
			'alignmentType': 'RIGHT',
			'opacity' : 1,
			'displayIcon' : 'false',
			'gapBetweenElementAndTooltip' : 30,
			'fontColor' : 'grey',
			inputFocus : function(tte) { },
			inputBlur : function(tte) { },			
			inputHover : function(tte) { },
			inputMouseOut : function(tte) { },
			inputMouseOver : function(tte) { }
		});
		
		$(elem).hover(function(){
			$.each(getTooltipIDsOfElement(elem),function(index,value) {
				$('#'+value).stop().toggle();
			});
		});
	}
	
	// Find All Elements with Title Attribute and then build tooltips for those elements
	$('.fieldIcon').each(function(){
		var inputField =  $(this).parent().find('.inputField');
		var inputTitle = $(inputField).attr('title');
		var inputElement = $(this);
		
		
		if( inputTitle == undefined || inputTitle == null )
			return;
		else if( inputTitle.length == 0 )
			return;
		
		buildTooltips(inputElement,inputTitle);
		
		// To Prevent Native Tooltips by Browser, remove title attribute of this element
		$(inputField).attr('title','');
	});	
	
	$('#loginForm').on('reset',function(event){
		$(this).find('.inputField').each(function(index,value){
			removeError($(this));
		});
		
		document.getElementById('loginForm').reset();
	});
});