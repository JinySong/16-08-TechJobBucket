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
		joblVm.registerLoginModal = registerLoginModal;
		registerLoginModal();
		scrollNav()

		// $scope.$watch(joblVm.localStorage, function () {
		// })

		 $(document).ready(function(){
      $('.parallax').parallax();
    });
        
		
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


			    if (scroll >= 100) {
			        $(".navbar").addClass("nav-fixed");
			    } else {
			        $(".navbar").removeClass("nav-fixed");
			    }

			    if (scroll >= $("#features-section").scrollTop()+300) {
			        $("#features-section h2").addClass("visibleYES animated fadeIn");
			    }

			    if (scroll >= $("#features-section .col-md-6").scrollTop()+300) {
			        $("#features-section .col-md-6").addClass("visibleYES animated fadeInUp");
			    }
			    if (scroll >= 2) $('.seeMore').addClass('animated fadeOut')
			});
	  	}

		function scrollToAnchor(){
		    $('html,body').animate({scrollTop: $("#jobs").offset().top-140},'slow');
		}

		function registerLoginModal(){
			$(document).ready(function(){
			    $("#Register").click(function(){
			        $("#RegisterModal").modal();
			    });
			    $("#LogIn").click(function(){
			        $("#LogInModal").modal();
			    });

			    $('.parallax').parallax();
			});
		}


	});

	
})();
