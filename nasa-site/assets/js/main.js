/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	document.querySelector('#marsButton').addEventListener('click', getMarsPic)
	const APIKey = "tW1jWWKehNu36Ixn5QUajaPDcMMZgOolhR9pfU58"
	function getMarsPic(){
		let marsDate = document.querySelector('#marsDate').value

		fetch( `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${marsDate}&api_key=${APIKey}`)
			.then(res => res.json()) 
			.then(data => {
				console.log (data)
	    		 return data.photos.forEach( photo=> {
	    		 	if (photo.camera.name === 'FHAZ'){
	    		 		document.querySelector('#FHAZ').src = photo.img_src
	    		 	}else if (photo.camera.name === 'RHAZ'){
	    		 		document.querySelector('#RHAZ').src = photo.img_src
	    		 	}else if (photo.camera.name === 'MAST'){
	    		 		document.querySelector('#MAST').src = photo.img_src
	    		 	}else if (photo.camera.name === 'CHEMCAM'){
	    		 		document.querySelector('#CHEMCAM').src = photo.img_src
	    		 	}else if (photo.camera.name ==='MAHLI'){
	    		 		document.querySelector('#MAHLI').src = photo.img_src
	    		 	}else if (photo.camera.name === 'MARDI'){
	    		 		document.querySelector('#MARDI').src = photo.img_src
	    		 	}else if (photo.camera.name === 'NAVCAM'){
	    		 		document.querySelector('#NAVCAM').src = photo.img_src
	    		 	}
	    		 })
			})
			.catch(err=> {
				console.log(`error ${err}`)
			})
			document.querySelector('#hidden').style.display = 'flex'
	 }


// document.querySelector('#apodButton').addEventListener('click', getPic)
// // const APIKey = "tW1jWWKehNu36Ixn5QUajaPDcMMZgOolhR9pfU58"
// function getPic(){
// 	let apodDate = document.querySelector('#apodDate').value

// 	fetch( `https://api.nasa.gov/planetary/apod?api_key=${APIKey}&date=${apodDate}`)
// 		.then(res => res.json()) 
// 		.then(data => {
// 			console.log (data)
// 			 document.querySelector('.apodTitle').innerText = data.title
// 			 if( data.media_type === 'image' ){
//           		document.querySelector('.apodImg').src = data.hdurl
//         	 }else if(data.media_type === 'video'){
//           		document.querySelector('".apodVid"').src = data.url
//         	 }
       
// 			 document.querySelector('.apodExp').innerText = data.explanation

// 		})
// 		.catch(err=> {
// 			console.log(`error ${err}`)
// 		})
// 		document.querySelector('#hidden').style.display = 'flex'
//  }



	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);

