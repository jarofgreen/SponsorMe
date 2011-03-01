
var map;

var markers;
var latLngProjection;

var markerIcon;


var animationInterval = 1000;


$(document).ready(function() {

	$('#Slide2').hide();
	$('#Slide3').hide();

	setTimeout("showSlide2()",2000);



	

});

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
	}

	
}