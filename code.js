
var map;

var markers;
var latLngProjection;

var markerIcon;


var dataPoints = new Array();
var dataPosition = 0;


$(document).ready(function() {

	$('#Slide2').hide();
	$('#Slide3').hide();
	$('#Slide4').hide();

	setTimeout("showSlide2()",2000);

	$.ajax({
	    type: "GET",
	    url: 'cobi.kml',
	    dataType: "xml",
	    success: parseXml
	  });

	

});

function parseXml(xml) {
	$(xml).find("Placemark").each(function(){
		var bits = $(this).find("Point").find("coordinates").text().split(",");
		var thisLat = parseFloat(bits[0]);
		var thisLng = parseFloat(bits[1]);

		dataPoints.push([thisLat,thisLng]);

	});
}

function showSlide1() {
	$('#Slide4').hide();
	$('#Slide1').show();
	setTimeout("showSlide3()",2000);
}

function showSlide2() {
	$('#Slide1').hide();
	$('#Slide2').show();
	setTimeout("showSlide3()",2000);
}

function showSlide3() {
	$('#Slide2').hide();
	$('#Slide3').show();

	if (!map) {
		var options = {
			projection: new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
		   };

		map = new OpenLayers.Map("Map",options);
		map.addLayer(new OpenLayers.Layer.OSM());

		markers = new OpenLayers.Layer.Markers( "Markers" );
		map.addLayer(markers);
		map.zoomToMaxExtent();

		latLngProjection = new OpenLayers.Projection("EPSG:4326");

		var size = new OpenLayers.Size(21,25);
		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		markerIcon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);

	}

	var olPoint = new OpenLayers.LonLat(dataPoints[0][0],dataPoints[1][1]).transform(latLngProjection,map.getProjectionObject());
	map.setCenter(olPoint,12);
	setTimeout("showNextPoint()",5000);
}


function showNextPoint() {

	if (dataPosition >= dataPoints.length) {
		setTimeout("showSlide4()",5000);
		map.zoomTo(8);
		return;
	}

	var thisLat = dataPoints[dataPosition][0];
	var thisLng = dataPoints[dataPosition][1];

	var olPoint = new OpenLayers.LonLat(thisLat,thisLng).transform(latLngProjection,map.getProjectionObject());
	map.panTo(olPoint);

	markers.addMarker(new OpenLayers.Marker(olPoint,markerIcon.clone()))

	dataPosition += 1;
	setTimeout("showNextPoint()",250);

}

function showSlide4() {
	$('#Slide3').hide();
	$('#Slide4').show();
	markers.clearMarkers();
	setTimeout("showSlide1()",2000);
}
