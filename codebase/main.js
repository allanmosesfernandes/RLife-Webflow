document.addEventListener("DOMContentLoaded", function () {
	/* 
    01. Everything related to cookies
    02. Everything related to form
        2.1. Form Step 01

    */
	//==== 01 ====//
	function handleCookieInteractions() {
		/* Event listeners for cookie */
		const cookieContainer = document.getElementById("cookie-container");
		const cookieAccept = document.getElementById("cookie-accept");
		const cookieDecline = document.getElementById("cookie-decline");

		/* Function to generate UUID */
		/* We set this as a cookie ~ "internal-UT3" */
		function generateUUID() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
				/[xy]/g,
				function (c) {
					const r = (Math.random() * 16) | 0;
					const v = c === "x" ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				}
			);
		}

		function checkCookie(name) {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.startsWith(name + "=")) {
					return true;
				}
			}
			return false;
		}

		function showCookieBanner() {
			if (!checkCookie("internal-UT3")) {
				setTimeout(() => {
					cookieContainer.classList.add("show");
				}, 2000); // Delay of 2 seconds
			}
		}

		function acceptCookie() {
			const uuid = generateUUID();
			document.cookie = "internal-UT3=" + uuid + "; path=/";
			cookieContainer.classList.remove("show");
			cookieContainer.classList.add("hide");
		}

		function declineCookie() {
			cookieContainer.classList.remove("show");
			cookieContainer.classList.add("hide");
		}

		cookieAccept.addEventListener("click", acceptCookie);
		cookieDecline.addEventListener("click", declineCookie);
		showCookieBanner();
	}

	handleCookieInteractions();
	//==== 02.1 ====//
	/* Form Step 01 */
	function formStep01() {
		const age = document.getElementById("data1");
		const property_value = document.getElementById("data2");

		/* auto-populate the age field */
		age.value = "";
		for (let i = 55; i <= 110; i++) {
			const option = document.createElement("option");
			option.text = i;
			option.value = i;
			age.add(option);
		}
		/* Set values into session storage initially*/
		sessionStorage.setItem("age", age.value);
		sessionStorage.setItem("property_value", property_value.value);
		age.addEventListener("change", function () {
			sessionStorage.setItem("age", age.value);
		});
		property_value.addEventListener("change", function () {
			sessionStorage.setItem("property_value", property_value.value);
		});

		/* Editing Radio Labels */
		// == 06 == //
		//== Toggling Background for Radio buttons selection ==//
		//==Because Webflow won't let you adjust radio buttons labels ==//
		var radioButtons = document.querySelectorAll(
			"input[type='radio'][name='options']"
		);

		radioButtons.forEach(function (radio) {
			radio.addEventListener("change", function () {
				// Reset all labels by removing the 'selected' class
				var allLabels = document.querySelectorAll(
					".guide-wrapper-container .w-radio"
				);
				allLabels.forEach(function (label) {
					label.classList.remove("selected");
				});

				// Add 'selected' class to the parent label of the checked radio
				if (this.checked) {
					var parentLabel = this.closest(".w-radio");
					parentLabel.classList.add("selected");
				}
			});
		});
	}

	function formHandler() {
		/* Run all these form functions*/
		formStep01();
	}

	formHandler();
});
