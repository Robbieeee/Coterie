$(function (){
	
	$statisticslistcount = $('#statisticslistcount');
	
	$totalchars = $('#totalchars');
	
	$postmessage = $('#postmessage');
	
	$postscontainer = $('#postscontainer');
	
	$postmessage.keypress(function(e){
		if (e.keyCode == 13 && !e.shiftKey)
		{
		  e.preventDefault();
		  return false;
		}
		
	});

	//Ensure user cannot type a message longer than 500 characters
	$postmessage.keyup(function(e){
		$totchars = $(this).val().length;
		if($totchars <= 500)
			$totalchars.text($totchars);
		else
		{
			$totalchars.text('500');
			$(this).val($(this).val().substring(0, 500));
		}
	});
	
	//When post button is clicked display message on screen 
	$('#postbutton').click(function(){
		if(($taval = $.trim($postmessage.val())).length > 0)
		{
			$postscontainer.prepend(postitem($taval));
			$postmessage.val('');	
			$statisticslistcount.text(parseInt($statisticslistcount.text()) + 1);	
		}
	});
	
	// When repost button is pressed, post that message again
	$postscontainer.on('click', 'span.retweet', function(){
		$poststatscount = $(this).children('.poststatscount');
		$poststatscount.text(parseInt($poststatscount.text()) + 1);
		
		$postscontainer.prepend(postitem($poststatscount.closest('.tweetcontainer').find('p').text()));
		$statisticslistcount.text(parseInt($statisticslistcount.text()) + 1);	
	});
	
	// When like button is clicked, add 1 like and make it red; if it is clicked again, remove the like
	$postscontainer.on('click', 'span.like', function(){
		$poststatscount = $(this).children('.poststatscount');
		if($(this).hasClass('red'))
		{
			$(this).removeClass('red');
			$poststatscount.text(parseInt($poststatscount.text()) - 1);
		}
		else
		{
			$(this).addClass('red');
			$poststatscount.text(parseInt($poststatscount.text()) + 1);
		}
	});
	
	
	
	
//get data from database
var userMessageRef = firebase.database().ref("posts").orderByKey();
userMessageRef.once("value").then(function(snapshot) {
snapshot.forEach(function(childSnapshot) {
  var key = childSnapshot.key;
  var childData = childSnapshot.val();              

  var message_val = childSnapshot.val().userMessage;

$postscontainer.prepend(postitem(message_val));
	
	console.log(message_val);
	


  });
});
	
	
//When post button is pressed, this displays the post message box 	
	function postitem($taval)
	{
		return '<li class="tweetcontainer">'+
					'<img class="userprofimg" src="https://www.nicepng.com/png/detail/124-1243442_hotel-waiter-clipart-fancy-dinner-clipart.png">'+
					'<div class="ml58px">'+
						'<p style="margin: 0px;">'+$taval+'</p>'+
						'<div class="mt10px">'+
							'<span class="retweet poststats">'+
								'<i class="fa fa-retweet"></i>'+
								'<span class="poststatscount">0</span>'+
							'</span>'+
							'<span class="like poststats">'+
								'<i class="fa fa-heart-o"></i>'+
								'<span class="poststatscount">0</span>'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</li>';
	}
	
	
});