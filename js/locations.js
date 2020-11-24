var PCM = PCM || {};

PCM.locationMap = (function(jQuery) {
	var canadaJson = 'https://raw.githubusercontent.com/takumayumirin/detailed-pin-locations/main/json/canada.data.json',
		usaJson = 'https://raw.githubusercontent.com/takumayumirin/detailed-pin-locations/main/json/usa.data.json',
		canadaTopoJson = 'https://raw.githubusercontent.com/takumayumirin/detailed-pin-locations/main/json/canada.topo.json',
		usaTopoJson = 'https://raw.githubusercontent.com/takumayumirin/detailed-pin-locations/main/json/usa.topo.json',
		ua = window.navigator.userAgent,
		msie = ua.indexOf('MSIE'),
		firefox = ua.indexOf('Firefox');

	var _canadaMap = function() {
		var addCanadaMap = new Datamap({
			element: document.getElementById('canada-map'),
			geographyConfig: {
				dataUrl: canadaTopoJson,
				popupTemplate: function(geography, data) {
					/*
					 * States with one city.
					 * States with two cities.
					 */
					if ((geography.id == 'CA.BC') || (geography.id == 'CA.MB') || (geography.id == 'CA.ON') || (geography.id == 'CA.QC')) {
						return '<div class="hoverinfo" width="297px">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					} else if ((geography.id == 'CA.AB')) {
						return '<div class="hoverinfo" width="582px">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[1].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[1].cityname + '</p>' +
											'<p class="address">' + data.city[1].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[1].cityname + ', ' + geography.id + ' ' + data.city[1].code + '</p>' +
											'<p class="phone">' + data.city[1].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					} else {
						return null;
					}
				}
			},
			dataUrl: canadaData,
			dataType: 'json',
			data: {},
			scope: 'canada',
			fills: {
				defaultFill: '#F0EFEF',
				red: 'rgb(210, 35, 51)',
				ab: 'url(#ab)'
			},
			setProjection: function(element) {
				var projection = d3.geo.mercator()
					.center([-95, 50])
					.scale(620)
					.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
				var path = d3.geo.path().projection(projection);

				return {path: path, projection: projection};
			},
			done: function() {
				addCanadaMap.bubbles([
					{ centered: 'CA.AB', fillKey: 'red', latitude: 50.88, longitude: -113.95 }, // Calgary
					{ centered: 'CA.AB', radius: 33, fillKey: 'ab', borderWidth: 0, latitude: 53.55, longitude: -113.56 }, // Edmonton
					{ centered: 'CA.BC', fillKey: 'red', latitude: 49.28, longitude: -123.12 }, // Vancouver
					{ centered: 'CA.MB', fillKey: 'red', latitude: 49.9, longitude: -97.14 }, // Winnipeg
					{ centered: 'CA.ON', fillKey: 'red', latitude: 43.85, longitude: -79.35 }, // Markham
					{ centered: 'CA.BC', fillKey: 'red', latitude: 45.5, longitude: -73.57 } // Montreal
				]);
			}
		});

		// check if browser is IE
		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			jQuery('#canada-map svg').css('margin-top', '18px');
		} else if (firefox > -1) {
			jQuery('#canada-map svg').css('margin-top', '-1px');
		} else {}

	    return false;
	};

	var _usaMap = function() {
		var addUSAmap = new Datamap({
			element: document.getElementById('usa-map'),
			geographyConfig: {
				dataUrl: usaTopoJson,
				popupTemplate: function(geography, data) {
					/*
					 * States with one city.
					 * States with two cities.
					 * States with three cities.
					 * States with four cities.
					 * States with seven cities.
					 */
					if ((geography.id == 'CT') || (geography.id == 'IN') || (geography.id == 'KY') || (geography.id == 'MO') || (geography.id == 'NC') || (geography.id == 'NM') || (geography.id == 'OR') || (geography.id == 'PA') || (geography.id == 'SD') || (geography.id == 'UT') || (geography.id == 'VA') || (geography.id == 'WA') || (geography.id == 'WI')) {
						return '<div class="hoverinfo" style="width: 297px;">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					} else if ((geography.id == 'FL') || (geography.id == 'GA') || (geography.id == 'ID') || (geography.id == 'IL') || (geography.id == 'MA') || (geography.id == 'NJ') || (geography.id == 'TX')) {
						return '<div class="hoverinfo" style="width: 582px">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[1].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[1].cityname + '</p>' +
											'<p class="address">' + data.city[1].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[1].cityname + ', ' + geography.id + ' ' + data.city[1].code + '</p>' +
											'<p class="phone">' + data.city[1].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					} else if (geography.id == 'N/A') {
						return '<div class="hoverinfo" style="width: 582px;">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[1].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[1].cityname + '</p>' +
											'<p class="address">' + data.city[1].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[1].cityname + ', ' + geography.id + ' ' + data.city[1].code + '</p>' +
											'<p class="phone">' + data.city[1].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city" style="border: none; margin: 0 0 0 156px;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[2].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[2].cityname + '</p>' +
											'<p class="address">' + data.city[2].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[2].cityname + ', ' + geography.id + ' ' + data.city[2].code + '</p>' +
											'<p class="phone">' + data.city[2].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					} else if (geography.id == 'CA') {
						return '<div class="hoverinfo" style="width: 582px">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[1].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[1].cityname + '</p>' +
											'<p class="address">' + data.city[1].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[1].cityname + ', ' + geography.id + ' ' + data.city[1].code + '</p>' +
											'<p class="phone">' + data.city[1].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[2].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[2].cityname + '</p>' +
											'<p class="address">' + data.city[2].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[2].cityname + ', ' + geography.id + ' ' + data.city[2].code + '</p>' +
											'<p class="phone">' + data.city[2].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city" style="border: none;">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[3].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[3].cityname + '</p>' +
											'<p class="address">' + data.city[3].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[3].cityname + ', ' + geography.id + ' ' + data.city[3].code + '</p>' +
											'<p class="phone">' + data.city[3].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					} else if (geography.id == 'OH') {
						return '<div class="hoverinfo" style="width: 582px;">' +
							'<div class="hover-header">' +
								'<h4>' + geography.properties.name + '</h4>' +
							'</div>' +
							'<div class="hover-body">' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[0].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[0].cityname + '</p>' +
											'<p class="address">' + data.city[0].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[0].cityname + ', ' + geography.id + ' ' + data.city[0].code + '</p>' +
											'<p class="phone">' + data.city[0].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[1].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[1].cityname + '</p>' +
											'<p class="address">' + data.city[1].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[1].cityname + ', ' + geography.id + ' ' + data.city[1].code + '</p>' +
											'<p class="phone">' + data.city[1].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[2].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[2].cityname + '</p>' +
											'<p class="address">' + data.city[2].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[2].cityname + ', ' + geography.id + ' ' + data.city[2].code + '</p>' +
											'<p class="phone">' + data.city[2].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[3].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[3].cityname + '</p>' +
											'<p class="address">' + data.city[3].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[3].cityname + ', ' + geography.id + ' ' + data.city[3].code + '</p>' +
											'<p class="phone">' + data.city[3].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[4].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[4].cityname + '</p>' +
											'<p class="address">' + data.city[4].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[4].cityname + ', ' + geography.id + ' ' + data.city[4].code + '</p>' +
											'<p class="phone">' + data.city[4].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[5].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[5].cityname + '</p>' +
											'<p class="address">' + data.city[5].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[5].cityname + ', ' + geography.id + ' ' + data.city[5].code + '</p>' +
											'<p class="phone">' + data.city[5].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
								'<div class="per-city" style="border: none; left: 50%; margin: 0 auto; transform: translate(-50%, 0)">' +
									'<div class="city-content">' +
										'<img class="pull-left city-img" src="../img/' + data.city[6].legend + '">' +
										'<div class="city-info">' +
											'<p class="cityname">' + data.city[6].cityname + '</p>' +
											'<p class="address">' + data.city[6].address.replace('\n','<br/>') + '</p>' +
											'<p class="code">' + data.city[6].cityname + ', ' + geography.id + ' ' + data.city[6].code + '</p>' +
											'<p class="phone">' + data.city[6].phone + '</p>' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>';
					}
				}
			},
			dataUrl: usaJson,
			dataType: 'json',
			data: {},
			scope: 'usa',
			fills: {
				defaultFill: '#F0EFEF',
				red: 'rgb(210, 35, 51)',
				ca_1: 'url(#ca_1)',
				ca_2: 'url(#ca_2)',
				ga: 'url(#ga)',
				oh: 'url(#oh)',
				va: 'url(#va)'
			},
			setProjection: function(element) {
				var projection = d3.geo.mercator()
					.center([-95, 38])
					.scale(620)
					.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
				var path = d3.geo.path().projection(projection);

				return {path: path, projection: projection};
			},
			done: function() {
				addUSAmap.bubbles([
					{ centered: 'CA', radius: 32, fillKey: 'ca_1', borderWidth: 0, latitude: 33.92, longitude: -118.39 }, // El Segundo
					{ centered: 'CA', radius: 36, fillKey: 'ca_2', borderWidth: 0, latitude: 33.65, longitude: -117.71 }, // Irvine
					{ centered: 'CA', fillKey: 'red', latitude: 32.81, longitude: -117.12 }, // San Diego
					{ centered: 'CA', fillKey: 'red', latitude: 37.79, longitude: -122.39 }, // San Francisco
					{ centered: 'CT', fillKey: 'red', latitude: 41.26, longitude: -73.13 }, // Shelton
					{ centered: 'FL', fillKey: 'red', latitude: 25.77, longitude: -80.29 }, // Miami
					{ centered: 'FL', fillKey: 'red', latitude: 28.48, longitude: -81.44 }, // Orlando
					{ centered: 'GA', fillKey: 'red', latitude: 34.16, longitude: -83.62 }, // Jefferson
					{ centered: 'GA', radius: 37, fillKey: 'ga', borderWidth: 0, latitude: 34.05, longitude: -84.32 }, // Roswell
					{ centered: 'ID', fillKey: 'red', latitude: 43.54, longitude: -116.15 }, // Boise
					{ centered: 'ID', fillKey: 'red', latitude: 43.58, longitude: -116.35 }, // Merida
					{ centered: 'IL', fillKey: 'red', latitude: 41.87, longitude: -87.63 }, //Chicago
					// { centered: 'IL', fillKey: 'red', latitude: 41.98, longitude: -88.01 }, // Itasca
					{ centered: 'IL', fillKey: 'red', latitude: 41.77, longitude: -88.2 }, // Naperville
					{ centered: 'IN', fillKey: 'red', latitude: 39.96, longitude: -86.01 }, // Fishers
					{ centered: 'KY', fillKey: 'red', latitude: 38.29, longitude: -85.67 }, // Louisville
					{ centered: 'MA', fillKey: 'red', latitude: 42.04, longitude: -71.23 }, // Foxboro
					{ centered: 'MA', fillKey: 'red', latitude: 42.13, longitude: -71.22 }, // Walpole
					{ centered: 'MO', fillKey: 'red', latitude: 38.79, longitude: -90.59 }, // Street Louis
					{ centered: 'NC', fillKey: 'red', latitude: 35.88, longitude: -78.58 }, // Raleigh
					{ centered: 'NJ', fillKey: 'red', latitude: 40.04, longitude: -74.14 }, // Brick
					{ centered: 'NJ', fillKey: 'red', latitude: 40.41, longitude: -74.15 }, // Holmdel
					{ centered: 'NM', fillKey: 'red', latitude: 35.31, longitude: -106.69 }, // Rio Rancho
					{ centered: 'OH', fillKey: 'red', latitude: 40.16, longitude: -83.01 }, // Columbus
					{ centered: 'OH', fillKey: 'red', latitude: 39.24, longitude: -84.38 }, // Cincinnati
					{ centered: 'OH', fillKey: 'red', latitude: 41.39, longitude: -81.62 }, // Cleveland
					{ centered: 'OH', fillKey: 'red', latitude: 39.84, longitude: -84.19 }, // Dayton
					{ centered: 'OH', fillKey: 'red', latitude: 40.19, longitude: -83.01 }, // Lewis Center
					{ centered: 'OH', fillKey: 'red', latitude: 39.59, longitude: -84.23 }, // Miamisburg
					{ centered: 'OH', radius: 35, fillKey: 'oh', borderWidth: 0, latitude: 40.1, longitude: -82.8 }, // New Albany
					{ centered: 'OR', fillKey: 'red', latitude: 45.44, longitude: -122.77 }, // Portland
					{ centered: 'PA', fillKey: 'red', latitude: 40.51, longitude: -79.98 }, // Pittsburgh
					{ centered: 'SD', fillKey: 'red', latitude: 42.53, longitude: -96.49 }, // Sioux City
					{ centered: 'TX', fillKey: 'red', latitude: 30.48, longitude: -97.78 }, // Austin
					{ centered: 'TX', fillKey: 'red', latitude: 32.97, longitude: -96.82 }, // Dallas
					{ centered: 'UT', fillKey: 'red', latitude: 40.53, longitude: -111.89 }, // Draper
					{ centered: 'VA', radius: 33, fillKey: 'va', borderWidth: 0, latitude: 38.87, longitude: -77.43 }, // Chantilly
					{ centered: 'WA', fillKey: 'red', latitude: 47.7, longitude: -122.3 }, // Seattle
					{ centered: 'WI', fillKey: 'red', latitude: 43.15, longitude: -88.05 } // Milwaukee
				]);
			}
		});

		// check if browser is IE
		if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
			jQuery('#usa-map svg').css('margin-top', '18px');
		} else if (firefox > -1) {
			jQuery('#usa-map svg').css('margin-top', '-1px');
		} else {}

	    return false;
   	};

	var _openModal = function() {
		var modalBody = jQuery('.modal-body'),
			modalHeader = jQuery('.modal-header h4');

		jQuery('.state').on('click', function() {
			var stateCode = jQuery(this).attr('class').split(' ')[1];

			modalBody.empty();

			jQuery.ajax({
				url: json,
				dataType: 'json',
				success: function(data) {
					var findCode = data[stateCode];
					var strData = JSON.stringify(findCode);

					modalHeader.empty() && modalHeader.append(findCode.name);

					jQuery.each(findCode.city, function() {
						modalBody.append('<div class="per-city">' +
							'<div class="city-content">' +
								'<img class="pull-left city-img" src="../img/' + this.legend + '">' +
								'<div class="city-info">' +
									'<p class="cityname">' + this.cityname + '</p>' +
									'<p class="address">' + this.address.replace('\n','<br/>') + '</p>' +
									'<p class="code">' + this.cityname + ', ' + stateCode + ' ' + this.code + '</p>' +
									'<p class="phone">' + this.phone + '</p>' +
								'</div>' +
							'</div>' +
						'</div>');

						/**
						 * Format modal.
						 */
						var cityData = findCode.city;
						var cityLength = cityData.length;

						// Check window size for responsiveness.
						function manageBorders() {
							if (jQuery(window).width() >= 661) {
								if (cityLength % 2 == 0) {
									jQuery('.modal-dialog').css('width', '582px');
									jQuery('.modal-body .per-city').css({
										'border-bottom': '1px solid #B7B7B7',
										'display': 'inline-block',
										'width': '270px'
									});
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').css('border-bottom', 'none');
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').prev('.per-city').css('border-bottom', 'none');
								} else if (cityLength == 1) {
									jQuery('.modal-dialog').css('width', '297px');
									jQuery('.modal-body .per-city').css('width', '270px');
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').css('border-bottom','none');
								} else {
									jQuery('.modal-dialog').css('width', '582px');
									jQuery('.modal-body .per-city').css({
										'border-bottom': '1px solid #B7B7B7',
										'display': 'inline-block',
										'width': '270px'
									});
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').css({
										'border-bottom':'none',
										'left': '50%',
										'margin':'0 auto',
										'transform':'translate(-50%, 0)'
									});
								}
							} else {
								jQuery('.modal-dialog').css('width', '92%');
								jQuery('.pcm-location .per-city').css({
									'display': 'block',
									'padding': '0',
									'width': '100%'
								});
								jQuery('.pcm-location .per-city:nth-child(2n) .city-content').css('margin', '0');
								jQuery('.pcm-location .per-city .city-content').css({
									'display': 'block',
									'margin': '0 auto',
									'width': '250px'
								});

								if (cityLength % 2 == 0) {
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').css('border-bottom', 'none');
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').prev('.per-city').css('border-bottom', '1px solid #B7B7B7');
								} else if (cityLength == 1) {
									jQuery('.modal-body .per-city').css('border-bottom', 'none');
								} else {
									jQuery('.modal-body .per-city:nth-child(' + cityLength +')').css({
										'border-bottom':'none',
										'left': '0',
										'margin':'0 auto',
										'transform':'translate(0, 0)'
									});
								}
							}
						};
						
						manageBorders();

						jQuery(window).resize(function() {
							manageBorders();
						});
					});
				}
			});
		});
	};

	return {
		canadaMap: _canadaMap,
		usaMap: _usaMap,
		openModal: _openModal
	};

})(jQuery);

jQuery(document).ready(function() {
	PCM.locationMap.canadaMap();
	PCM.locationMap.usaMap();
	PCM.locationMap.openModal();
});