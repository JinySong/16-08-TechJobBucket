(function(){
	angular
		.module('TJdb')
		.controller('JobListCtrl', function (jobSrv, $location,$window,$http) {
		var joblVm = this;

	 	joblVm.jobs = jobSrv.getJobs();
	  
	  	joblVm.sortOptions = [
		    {label: 'Position', sortField: 'Title', reverse: false},
		    {label: 'Company', sortField: "Company", reverse: true}
		]

		joblVm.sortSelect = joblVm.sortOptions[0];

		joblVm.goToJob = goToJob;
		joblVm.goToSignUp = goToSignUp;
		joblVm.goToApply = goToApply;
		joblVm.saveJob = saveJob;
		joblVm.goToAcc = goToAcc;
		joblVm.logOut = logOut;
		joblVm.localStorage = !!localStorage.authToken;
		joblVm.scrollNav = scrollNav;
		joblVm.scrollToAnchor = scrollToAnchor;
		joblVm.docReady = docReady;
		docReady();
		scrollNav()
		var stopLoop = !0;

		// $scope.$watch(joblVm.localStorage, function () {
		// })

        
		
	  	function goToJob(id){
	  		$location.path('/job/'+id)
	  	}

	  	function goToSignUp() {
	  		console.log('hi')
	  		$location.path('/registerLogin')
	  	}

	  	function goToAcc() {
	  		$location.path('user/'+localStorage.loginEmail)
	  	}

	  	function logOut() {
			console.log(localStorage.authToken)
			console.log('removing')
			localStorage.removeItem('authToken');
			console.log(!!localStorage.authToken);
			$location.path('/');
		}

	  	function goToApply(id){
	  		for (var i=0; i<joblVm.jobs.length; i++) {
	  			if (joblVm.jobs[i]._id == id) {
	  				$window.location.href=joblVm.jobs[i].ApplyLink;
	  			}
	  		}
		}
		//test this
	  	function saveJob(jobId) {
	  		return $http.get('/saveLink/'+localStorage.loginEmail+'/'+jobId).then(function(res) {
	            console.log('Job Saved to User')
	        }, function(err) {
	            console.log('Job did not save to user: ', err)
	        })
	  	}

	  	function scrollNav () {
	  		$(window).scroll(function() {
	  			var scroll = $(window).scrollTop();
	  			 // $("#features-section .col-md-6").css("visibility", "hidden");

	  			 //console.log(scroll)
	  			// console.log($("#progress").scrollTop())


			    if (scroll >= 100) {
			        $(".navbar").addClass("nav-fixed");
			    } else {
			        $(".navbar").removeClass("nav-fixed");
			    }

			    if (scroll >= 2) $('.seeMore').addClass('animated fadeOut')

			    if (scroll >= $("#features-section").position().top - $(window).height()) {
			        $("#features-section h2").addClass("visibleYES animated fadeIn");
			        $("#features-section .col-md-6").addClass("visibleYES animated fadeInUp");
			    }

			    if (scroll >= $("#progress").position().top - $("#progress").height()) {
			        $("#progress h2").addClass("visibleYES animated fadeIn");
			        $("#progress .allIcon").addClass("visibleYES animated fadeInUp");
			    }

			    
			    console.log($(window).height())
			    if (scroll >= $("#statistics-section").position().top - $(window).height() && stopLoop) {
					$('#statJob').animateNumber({ number: 1450 },2000);
					$('#statCo').animateNumber({ number: 245 }, 2000);
					$('#statSaved').animateNumber({ number: 312 }, 2000);
					$('#statUser').animateNumber({ number: 103 }, 2000);
					stopLoop = !1;
					console.log(stopLoop)
			    }

			});
	  	}






		function scrollToAnchor(){
		    $('html,body').animate({scrollTop: $("#jobs").offset().top-140},'slow');
		}

		function docReady(){
			$(document).ready(function(){
			    $("#Register").click(function(){
			        $("#RegisterModal").modal();
			    });
			    $("#LogIn").click(function(){
			        $("#LogInModal").modal();
			    });

			});


			// $('.statistics-section').each(function (){
			// 	var $this = $(this);
			// 	var myVal = $(this).data("value");

			// 	$this.appear(function()
			// 	{
			// 		$('#project').animateNumber({ number: 145 }, 2000);
			// 		$('#work').animateNumber({ number: 2456 }, 2000);
			// 		$('#consumed').animateNumber({ number: 3125 }, 2000);
			// 		$('#videos').animateNumber({ number: 2478 }, 2000);
			// 	});
			// });
		}


	});

	
})();
