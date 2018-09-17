/**
 * Created by lewa on 6/21/2017.
 */
//declare boundary of region
//var oLat = 40.018, oLng = -75.148, zLevel = 10;             ///adjust lat-lon coordinates to center on your region
var oLat = 32.965567, oLng = -116.690000, zLevel = 10;


//declare basemaps
// Basemap Layers
var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var Esri_transportation = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 8,
    maxZoom: 18
});

var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});


//create map instance
var map = L.map("mapDIV", {
    minZoom: zLevel,
    zoomControl: false,
    layers: [Esri_WorldGrayCanvas]
}).setView([oLat, oLng],zLevel);

//add Layer Control to map
var baseLayers = {
    "Satellite": Esri_WorldImagery,
    "Street Map": Esri_WorldGrayCanvas
};
L.control.layers(baseLayers).addTo(map);

//advanced handling of street labels on aerial
//Base and Overlay Handling
var topPane = map._createPane('leaflet-top-pane', map.getPanes().mapPane);
function addStreetLabels(){
    var topLayer = (Esri_transportation).addTo(map);
    topPane.appendChild(topLayer.getContainer());
    topLayer.setZIndex(2);
};
map.on('moveend', function () {
    if (map.getZoom() > 13 && map.hasLayer(Esri_WorldImagery)){
        addStreetLabels();

    };
    if (map.getZoom() <= 13 ){
        map.removeLayer(Esri_transportation);
    };
});
map.on('baselayerchange', function () {
    if (map.getZoom() > 13 && map.hasLayer(Acetate_all)){
        map.removeLayer(Esri_transportation);
    };
    if (map.getZoom() > 13 && map.hasLayer(Esri_WorldImagery)){
        addStreetLabels();
    };
});



///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
/////////      Declare Data Layers Here        ///////////////////
//////////////////////////////////////////////////////////////////

//define Icon Set and Marker Types
var IconPresets = {iconSet:'dynico', markerSet: 'open-freight', mapMarker: 'circle-cm', legendMarker: 'circle-md'};

//declare Base Info for layers
var layer1icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: '#894B9E', layer:'layer1', title: 'Major Roads'}, IconPresets),
    layer2icon = L.OpenFreightMarkers.icon({
        icon: 'parking', markerColor: '#894B9E', layer:'layer2', title: 'Connectors'}, IconPresets),
    layer3icon = L.OpenFreightMarkers.icon({
        icon: 'railyard', markerColor: '#894B9E', layer:'layer3', title: 'Truck Inspection Facilities'}, IconPresets),
    layer4icon = L.OpenFreightMarkers.icon({
        icon: 'rail', markerColor: '#894B9E', layer:'layer4', title: 'Truck Parking Facilities'}, IconPresets),
    layer5icon = L.OpenFreightMarkers.icon({
        icon: 'railyard', markerColor: '#FAA819', layer:'layer5', title: 'Rail Yards'}, IconPresets),
    layer6icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: '#FAA819', layer:'layer6', title: 'Rail Lines'}, IconPresets),
    layer7icon = L.OpenFreightMarkers.icon({
        icon: 'intermodal', markerColor: '#FAA819', layer:'layer7', title: 'Intermodal Facilities'}, IconPresets),
    layer8icon = L.OpenFreightMarkers.icon({
        icon: 'railxing', markerColor: '#FAA819', layer:'layer8', title: 'Rail Grade Crossings'}, IconPresets),
    layer9icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: '#1C75BB', layer:'layer9', title: 'Ports of Entry'}, IconPresets),
    layer10icon = L.OpenFreightMarkers.icon({
        icon: 'ship', markerColor: '#1C75BB', layer:'layer10', title: 'Port Terminals'}, IconPresets),
    layer11icon = L.OpenFreightMarkers.icon({
        icon: 'anchor', markerColor: '#1C75BB', layer:'layer11', title: 'Anchorages'}, IconPresets),
    layer12icon = L.OpenFreightMarkers.icon({
        icon: 'airport', markerColor: 'teal', layer:'layer12', title: 'Commercial Airports'}, IconPresets),
    layer13icon = L.OpenFreightMarkers.icon({
        icon: 'airport', markerColor: 'teal', layer:'layer13', title: 'Municipal Airports'}, IconPresets),
    layer14icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'teal', layer:'layer14', title: 'Employment Centers'}, IconPresets),
    layer15icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'teal', layer:'layer15', title: 'Other Major Employers'}, IconPresets),
    layer16icon = L.OpenFreightMarkers.icon({
        icon: 'nhs', markerColor: 'teal', layer:'layer16', title: 'Energy & Utilities'}, IconPresets),
    layer17icon = L.OpenFreightMarkers.icon({
        icon: 'community', markerColor: 'teal', layer:'layer17', title: 'Port Access Improvement'}, IconPresets);

//define search groups for each layer that will be searchable
var layer1Search = [], layer2Search = [], layer3Search = [], layer4Search = [], layer5Search = [], layer6Search = [], layer7Search = [], layer8Search = [],
    layer9Search = [], layer10Search = [], layer11Search = [], layer12Search = [], layer13Search = [], layer14Search = [], layer15Search = [], layer16Search = [],
    layer17Search = [], LayerStyle = [];

//define Layer 1 (polygon only)
var layer1 = L.geoJson(null, {
    style: {
        fillColor: "#F9AB90",
        fillOpacity:.50,
        weight:1,
        color:"#E0E0E0 ",
        opacity:.75
    },
    onEachFeature: function (feature, layer){		//defines actions to be applied of each feature of layer
        layer.on({										//Event handler on each feature
            click: highlightLayer1,							//action on click --> function to be created in actions.js
            dblclick: zoomToFeature 						//action on double click  --> zoom to polygon function in action.js
        });
        layer1Search.push({							//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 1",								//layer source
            id: L.stamp(layer),								//leaflet id
            bounds: layer.getBounds()						//geometric bounds declaration for polygon
        });
    }
});

/*$.getJSON("data/MajorRoads.json", function (data) {		//get data from json source
 layer1.addData(data);
 });
 polyLayer.push('layer1');*/

//define Layer 2 (point only)
var layer2 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer2icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer2,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer2Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 2",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer2.addData(data);
 });*/

//define Layer 3 (point and poly combo)
//declare point data first [same as point only] -- no search as search will be provided for with polygon feature
var layer3pt = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer3icon});
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer3,					//click function handling specific to data type (one for point and one for polygon)	--> created in actions.js
            dblclick: zoomToPoint
        });
    }
});
/*$.getJSON("data/layer3pt.json", function (data) {
 layer3pt.addData(data);
 });*/
//declare polygon data for Layer 3 [same as Poly only]
var layer3poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#54C4C8",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer3,
            dblclick: zoomToFeature
        });
        layer3Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 3",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
/*$.getJSON("data/layer3poly.json", function (data) {
 layer3poly.addData(data);
 });
 polyLayer.push('layer3poly');*/

//create layer group for Layer 3 point and polygon features
var layer3 = new L.FeatureGroup([layer3pt, layer3poly]);

//define Layer 4 (point and poly combo)
//declare point data first
var layer4pt = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer4icon});
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer4,
            dblclick: zoomToPoint
        });
    }
});
/*$.getJSON("data/layer4pt.json", function (data) {
 layer4pt.addData(data);
 });*/

//declare polygon data
var layer4poly = L.geoJson(null, {
    style: {fillColor: "#C1332B", fillOpacity:.50, weight:1, color:"#E0E0E0 ", opacity:.75},
    onEachFeature: function (feature, layer){
        layer.on({
            click: highlightLayer4,
            dblclick: zoomToFeature
        });
        layer4Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 4",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
/*$.getJSON("data/layer4poly.json", function (data) {
 layer4poly.addData(data);
 });
 polyLayer.push('layer4poly');*/

//create layer group for Layer 4 point and polyline features
var layer4 = new L.FeatureGroup([layer4pt, layer4poly]);

//define Layer 5 (point only)
var layer5 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer5icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer5,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer5Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 5",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer5.addData(data);
 });*/

//define Layer 6 (point only)
var layer6 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer6icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer6,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer6Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 6",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*
 $.getJSON("data/Ports of Entry.json", function (data) {
 layer6.addData(data);
 });
 */

//define Layer 7 (point only)
var layer7 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer7icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer7,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer7Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 7",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer2.addData(data);
 });*/

//define Layer 8 (point only)
var layer8 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer8icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer2,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer8Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 8",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*
 $.getJSON("data/Ports of Entry.json", function (data) {
 layer8.addData(data);
 });
 */

//define Layer 9 (point only)
var layer9 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer9icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer9,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer9Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 9",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/POE_Join_test.geojson", function (data) {
 layer9.addData(data);
 });*/

//define Layer 10 (point only)
var layer10 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer10icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer10,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer10Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 10",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});

//define Layer 11 (point only)
var layer11 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer11icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer11,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer11Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 11",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer11.addData(data);
 });*/

//define Layer 12 (point only)
var layer12 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer12icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer12,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer12Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 12",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer12.addData(data);
 });*/

//define Layer 13 (point only)
var layer13 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer13icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer13,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer13Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 13",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer13.addData(data);
 });*/

//define Layer 14 (point only)
var layer14 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer14icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer14,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer14Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 14",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer14.addData(data);
 });*/

//define Layer 15 (point only)
var layer15 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer15icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer15,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer15Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 15",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*
 $.getJSON("data/Ports of Entry.json", function (data) {
 layer15.addData(data);
 });
 */

//define Layer 16 (point only)
var layer16 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer16icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer16,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer16Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 16",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});
/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer16.addData(data);
 });*/

//define Layer 17 (point only)
var layer17 = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: layer17icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click: highlightLayer17,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
        layer17Search.push({								//push variables from json features to search arrays
            name: layer.feature.properties.Name,			//search name/field
            source: "Layer 17",								//layer source
            id: L.stamp(layer),								//leaflet id
            lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
            lng: layer.feature.geometry.coordinates[0]
        });
    }
});


/*$.getJSON("data/Ports of Entry.json", function (data) {
 layer17.addData(data);
 });*/

/*    //pipeline visibility hack
 map.on('moveend', function() {
 if (map.getZoom() > 14) {
 $('#pipelabel').parent().addClass('disabled');
 $('#pipelabel').closest('.panel').find('.checked_all').addClass('disabled');
 }
 if (map.getZoom() > 14 && map.hasLayer(pipelines) && $("#pipelines").is(':checked')) {
 map.removeLayer(pipelines);
 var pipelinelegend = document.getElementById('pipehidden');
 pipelinelegend.innerHTML = "[not available at zoom level]";
 }
 if (map.getZoom() <= 14) {
 $('#pipelabel').parent().removeClass('disabled');
 $('#pipelabel').closest('.panel').find('.checked_all').removeClass('disabled');
 }
 if (map.getZoom() <= 14 && $("#pipelines").is(':checked')) {
 map.addLayer(pipelines);
 var pipelinelegend = document.getElementById('pipehidden');
 pipelinelegend.innerHTML = "";
 $('#pipelabel').parent().removeClass('disabled');
 }
 });

 //define community layers
 //define freight as a good neighbor
 var fgneighbor = L.geoJson(null, {
 pointToLayer: function(feature, latlng) {
 return L.marker(latlng, {
 icon: fgnicon
 });
 },
 onEachFeature: function(feature, layer) {
 layer.on({
 click: clkfgneighbor,
 dblclick: zoomToPoint
 });
 }
 });*/


//map.setMaxBounds(counties.getBounds());
//add layers in groups by order
//countymap.addLayer(mcounty);


/*    var FCintergroup = new L.FeatureGroup([FCinterpt, FCinterpoly]);
 var FCmajorgroup = new L.FeatureGroup([FCmajorpt, FCmajorpoly]);
 var FCmegagroup = new L.FeatureGroup([FCmegapt, FCmegapoly]);
 var FCenters = {
 "Mega Center": FCmegagroup,
 "Major Center": FCmajorgroup,
 "Intermediate Center": FCintergroup
 };
 var railyardgroup = new L.FeatureGroup([railyardpt, railyardpoly]);
 var intermodalgroup = new L.FeatureGroup([intermodalpt, intermodalpoly]);
 var Rail = {
 "Rail Line": railines,
 "Rail Yard": railyardgroup,
 "Intermodal Yard": intermodalgroup,
 "Class I Grade Crossing": gradexing,
 "Rail River Crossing": railbridge
 };
 var portGroup = new L.FeatureGroup([porticon, portpoly]);
 var anchorageGroup = new L.FeatureGroup([anchoricon, anchoragepoly]);
 var Portwater = {
 "Navigable River": river,
 "Port Terminal": portGroup,
 "Anchorage": anchorageGroup
 };
 var commGroup = new L.FeatureGroup([commairpt, commairpoly]);
 var relGroup = new L.FeatureGroup([relvairpt, relairpoly]);
 var airport = {
 "Commercial": commGroup,
 "Reliever": relGroup
 };

 var nhsgroup = new L.FeatureGroup([nhspoly, nhs]);
 var trkparkgroup = new L.FeatureGroup([truckparkpoly, tppoints]);
 var Highway = {
 "Freeway": freeway,
 "NHS Connector": nhsgroup,
 "Truck Parking": trkparkgroup,
 "Highway River Crossing": hwyrivcrossing
 };*/


///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//  Create search functionality using Typeahead   ////
//////////////////////////////////////////////////////

// Highlight search box text on click
$("#searchbox").click(function () {
    $(this).select();
});

// Typeahead search functionality
$(document).one("ajaxStop", function() {
    $("#loading").hide();

    // Alternate Typeahead search functionality--not sure which is correct!
    /*    function loadSearchBar() {
     $("#loading").hide();
     var $e1 = $('#searchbox'),
     $e2 = $('#searchhome');
     var e1 = $e1[0],
     e2 = $e2[0];*/

    //tokenize each search array using Bloodhound
    var layer1BH = new Bloodhound({
        name: "Layer 1",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer1Search,
        limit: 10
    });
    var layer2BH = new Bloodhound({
        name: "Layer 2",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer2Search,
        limit: 10
    });
    var layer3BH = new Bloodhound({
        name: "Layer 3",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer3Search,
        limit: 10
    });
    var layer4BH = new Bloodhound({
        name: "Layer 4",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer5BH = new Bloodhound({
        name: "Layer 5",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer6BH = new Bloodhound({
        name: "Layer 6",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer7BH = new Bloodhound({
        name: "Layer 7",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer8BH = new Bloodhound({
        name: "Layer 8",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer9BH = new Bloodhound({
        name: "Layer 9",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer10BH = new Bloodhound({
        name: "Layer 10",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer11BH = new Bloodhound({
        name: "Layer 11",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer12BH = new Bloodhound({
        name: "Layer 12",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer13BH = new Bloodhound({
        name: "Layer 13",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer14BH = new Bloodhound({
        name: "Layer 14",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer15BH = new Bloodhound({
        name: "Layer 15",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer16BH = new Bloodhound({
        name: "Layer 16",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    var layer17BH = new Bloodhound({
        name: "Layer 17",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });


    //initialize
    layer1BH.initialize();
    layer2BH.initialize();
    layer3BH.initialize();
    layer4BH.initialize();
    layer5BH.initialize();
    layer6BH.initialize();
    layer7BH.initialize();
    layer8BH.initialize();
    layer9BH.initialize();
    layer10BH.initialize();
    layer11BH.initialize();
    layer12BH.initialize();
    layer13BH.initialize();
    layer14BH.initialize();
    layer15BH.initialize();
    layer16BH.initialize();
    layer17BH.initialize();


    // Matches the Alternate Typeahead search functionality above
    /*	$([e1, e2]).typeahead({
     minLength: 2,
     highlight: true,
     hint: false
     },*/

    //activate Typeahead on Searchbox DOM element
    $("#searchbox").typeahead({
        //define options (see Typeahead documentation)
        minLength: 2,
        highlight: true,
        hint: false
    },{
        name: "Layer1data",
        displayKey: "name",
        source: layer1BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 1</h5>"
        }
    },{
        name: "Layer2data",
        displayKey: "name",
        source: layer2BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 2</h5>"
        }
    },{
        name: "Layer3data",
        displayKey: "name",
        source: layer3BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 3</h5>"
        }
    },{
        name: "Layer4data",
        displayKey: "name",
        source: layer4BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 4</h5>"
        }
    },{
        name: "Layer5data",
        displayKey: "name",
        source: layer5BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 5</h5>"
        }
    },{
        name: "Layer6data",
        displayKey: "name",
        source: layer6BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 6</h5>"
        }
    },{
        name: "Layer7data",
        displayKey: "name",
        source: layer7BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 7</h5>"
        }
    },{
        name: "Layer8data",
        displayKey: "name",
        source: layer8BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 8</h5>"
        }
    },{
        name: "Layer9data",
        displayKey: "name",
        source: layer9BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 9</h5>"
        }
    },{
        name: "Layer10data",
        displayKey: "name",
        source: layer10BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 10</h5>"
        }
    },{
        name: "Layer11data",
        displayKey: "name",
        source: layer11BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 11</h5>"
        }
    },{
        name: "Layer12data",
        displayKey: "name",
        source: layer12BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 12</h5>"
        }
    },{
        name: "Layer13data",
        displayKey: "name",
        source: layer13BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 13</h5>"
        }
    },{
        name: "Layer14data",
        displayKey: "name",
        source: layer14BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 14</h5>"
        }
    },{
        name: "Layer15data",
        displayKey: "name",
        source: layer15BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 15</h5>"
        }
    },{
        name: "Layer16data",
        displayKey: "name",
        source: layer16BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 16</h5>"
        }
    },{
        name: "Layer17data",
        displayKey: "name",
        source: layer17BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 17</h5>"
        }

    }).on("typeahead:selected", function (obj, datum) {
        $('#search-panel').fadeOut('fast');
        resetHighlight();
        resetInfoWindow();
        $e1.typeahead('val', '');
        if ($('#nav_search').hasClass('hidden')) {
            $('#pFFlanding').fadeOut(800);
            $('#nav_search').removeClass('hidden');
            $('#maplink').addClass('hidden');
        };													//define action on selection of a search result
        if (datum.source === "Layer 1") {					//action based on result source layer
            if (!map.hasLayer(layer1)) {						//Check if map has Layer visible
                map.addLayer(layer1);							//If not add layer
                $("#layer1").prop("checked", true);				//and change layer control item to checked
            };
            map.fitBounds(datum.bounds);						//zoom to selection based on poly bounds (for polygon results)
            if (map._layers[datum.id]) {						//Apply action to selected result to fire a click event
                map._layers[datum.id].fire("click");				// (this will fire the onClick event established for the layer and stored as a function in actions.js)
            };
        };
        if (datum.source === "Layer 2") {
            if (!map.hasLayer(layer2)) {
                map.addLayer(layer2);
                $("#layer2").prop("checked", true);
            };
            map.setView([datum.lat, datum.lng], 17);			//zoom to selection based on point and zoom level (for point only results)
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 3") {
            if (!map.hasLayer(layer3)) {
                map.addLayer(layer3);
                $("#layer3").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 4") {
            if (!map.hasLayer(layer4)) {
                map.addLayer(layer4);
                $("#layer4").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 5") {
            if (!map.hasLayer(layer5)) {
                map.addLayer(layer5);
                $("#layer5").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 6") {
            if (!map.hasLayer(layer6)) {
                map.addLayer(layer6);
                $("#layer6").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 7") {
            if (!map.hasLayer(layer7)) {
                map.addLayer(layer7);
                $("#layer7").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 8") {
            if (!map.hasLayer(layer8)) {
                map.addLayer(layer8);
                $("#layer8").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 9") {
            if (!map.hasLayer(layer9)) {
                map.addLayer(layer9);
                $("#layer9").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 10") {
            if (!map.hasLayer(layer10)) {
                map.addLayer(layer10);
                $("#layer10").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 11") {
            if (!map.hasLayer(layer11)) {
                map.addLayer(layer11);
                $("#layer11").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 12") {
            if (!map.hasLayer(layer12)) {
                map.addLayer(layer12);
                $("#layer12").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 13") {
            if (!map.hasLayer(layer13)) {
                map.addLayer(layer13);
                $("#layer13").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 14") {
            if (!map.hasLayer(layer14)) {
                map.addLayer(layer14);
                $("#layer14").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 15") {
            if (!map.hasLayer(layer15)) {
                map.addLayer(layer15);
                $("#layer15").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 16") {
            if (!map.hasLayer(layer16)) {
                map.addLayer(layer16);
                $("#layer16").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
        if (datum.source === "Layer 17") {
            if (!map.hasLayer(layer17)) {
                map.addLayer(layer17);
                $("#layer17").prop("checked", true);
            };
            map.fitBounds(datum.bounds);
            if (map._layers[datum.id]) {
                map._layers[datum.id].fire("click");
            };
        };
    }).on("typeahead:opened", function () {
        $(".navbar-collapse.in").css("max-height", $(document).height()-$(".navbar-header").height());
        $(".navbar-collapse.in").css("height", $(document).height()-$(".navbar-header").height());
    }).on("typeahead:closed", function () {
        $(".navbar-collapse.in").css("max-height", "");
        $(".navbar-collapse.in").css("height", "");
    });
    $(".twitter-typeahead").css("position", "static");
    $(".twitter-typeahead").css("display", "block");
});


///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//  Create search functionality using Typeahead   ////
//////////////////////////////////////////////////////

// Highlight search box text on click
/*$("#searchbox").click(function() {
 $(this).select();
 });

 // Typeahead search functionality
 function loadSearchBar() {
 $("#loading").hide();
 var $e1 = $('#searchbox'),
 $e2 = $('#searchhome');
 var e1 = $e1[0],
 e2 = $e2[0];
 /*var countyBH = new Bloodhound({
 name: "Counties",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: countySearch,
 limit: 10
 });*/
/*        var hwysBH = new Bloodhound({
 name: "Highways",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: highwaySearch,
 limit: 10
 });
 var nhsBH = new Bloodhound({
 name: "NHS",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: nhsSearch,
 limit: 10
 });
 var parkingBH = new Bloodhound({
 name: "TruckParking",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: truckParkSearch,
 limit: 10
 });
 var hwyBridgeBH = new Bloodhound({
 name: "HwyBridges",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: hwyBridgeSearch,
 limit: 10
 });
 var railLineBH = new Bloodhound({
 name: "RailLines",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: railSearch,
 limit: 10
 });

 var yardsBH = new Bloodhound({
 name: "RailYards",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: railyardSearch,
 limit: 10
 });
 var intermodalBH = new Bloodhound({
 name: "Intermodal",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: intermodalSearch,
 limit: 10
 });
 var gradexingBH = new Bloodhound({
 name: "GradeCrossing",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: xingSearch,
 limit: 10
 });
 var railBridgeBH = new Bloodhound({
 name: "RailBridges",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: RailBridgeSearch,
 limit: 10
 });
 var riverBH = new Bloodhound({
 name: "Rivers",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: riverSearch,
 limit: 10
 });
 var portsBH = new Bloodhound({
 name: "PortTerminals",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: portSearch,
 limit: 10
 });
 var anchBH = new Bloodhound({
 name: "Anchorages",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: anchSearch,
 limit: 10
 });
 var commBH = new Bloodhound({
 name: "CommAirports",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: commairSearch,
 limit: 10
 });
 var releiverBH = new Bloodhound({
 name: "ReleivAirports",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: relairSearch,
 limit: 10
 });
 var heliBH = new Bloodhound({
 name: "Heliports",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: heliportSearch,
 limit: 10
 });
 var interBH = new Bloodhound({
 name: "FCinter",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: FCinterSearch,
 limit: 10
 });
 var majorBH = new Bloodhound({
 name: "FCmajor",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: FCmajorSearch,
 limit: 10
 });
 var megaBH = new Bloodhound({
 name: "FCmega",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 local: FCmegaSearch,
 limit: 10
 });

 var geonamesBH = new Bloodhound({
 name: "GeoNames",
 datumTokenizer: function(d) {
 return Bloodhound.tokenizers.whitespace(d.name);
 },
 queryTokenizer: Bloodhound.tokenizers.whitespace,
 remote: {
 url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
 filter: function(data) {
 return $.map(data.geonames, function(result) {
 return {
 name: result.name + ", " + result.adminCode1,
 lat: result.lat,
 lng: result.lng,
 source: "GeoNames"
 };
 });
 },
 ajax: {
 beforeSend: function(jqXhr, settings) {
 settings.url += "&east=" + counties.getBounds().getEast() + "&west=" + counties.getBounds().getWest() + "&north=" + counties.getBounds().getNorth() + "&south=" + counties.getBounds().getSouth();
 $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
 },
 complete: function(jqXHR, status) {
 $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
 }
 }
 },
 limit: 10
 });*/
//countyBH.initialize();
/*        hwysBH.initialize();
 parkingBH.initialize();
 hwyBridgeBH.initialize();
 nhsBH.initialize();
 railLineBH.initialize();
 yardsBH.initialize();
 intermodalBH.initialize();
 gradexingBH.initialize();
 railBridgeBH.initialize();
 riverBH.initialize();
 portsBH.initialize();
 anchBH.initialize();
 commBH.initialize();
 releiverBH.initialize();
 heliBH.initialize();
 interBH.initialize();
 majorBH.initialize();
 megaBH.initialize();
 geonamesBH.initialize();

 $([e1, e2]).typeahead({
 minLength: 2,
 highlight: true,
 hint: false
 }, {*/
/*    //$("#searchbox").typeahead([{
 name: "Counties",
 displayKey: "name",
 source: countyBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'>County</h5>"
 }
 }, {*/

/*            name: "Highways",*/
/*            displayKey: "name",
 source: hwysBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/truck.png' class='searchico'>Highways</h5>"
 }
 }, {
 name: "NHS",
 displayKey: "name",
 source: nhsBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/nhs.png' class='searchico'>NHS Connectors</h5>"
 }
 }, {
 name: "TruckParking",
 displayKey: "name",
 source: parkingBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/parking.png' class='searchico'>Truck Parking</h5>"
 }
 }, {
 name: "HwyBridges",
 displayKey: "name",
 source: hwyBridgeBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/bridge2.png' class='searchico'>Highway River Crossings</h5>"
 }
 }, {
 name: "RailLines",
 displayKey: "name",
 source: railLineBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/train.png' class='searchico'>Rail Lines</h5>"
 }
 }, {
 name: "RailYards",
 displayKey: "name",
 source: yardsBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/railyard.png' class='searchico'>Rail Yards</h5>"
 }
 }, {
 name: "Intermodal",
 displayKey: "name",
 source: intermodalBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/intermodal.png' class='searchico'>Intermodal Rail Yards</h5>"
 }
 }, {
 name: "GradeCrossing",
 displayKey: "name",
 source: gradexingBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/gradecrossing.png' class='searchico'>Grade Crossings</h5>"
 }
 }, {
 name: "RailBridges",
 displayKey: "name",
 source: railBridgeBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/bridge1.png' class='searchico'>Rail River Crossing</h5>"
 }
 }, {
 name: "Rivers",
 displayKey: "name",
 source: riverBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/river.png' class='searchico'>River Channels</h5>"
 }
 }, {
 name: "PortTerminals",
 displayKey: "name",
 source: portsBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/ports.png' class='searchico'>Port Terminals</h5>"
 }
 }, {
 name: "Anchorages",
 displayKey: "name",
 source: anchBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/anchor.png' class='searchico'>Anchorages</h5>"
 }
 }, {
 name: "CommAirports",
 displayKey: "name",
 source: commBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/airport1.png' class='searchico'>Commercial Airports</h5>"
 }
 }, {
 name: "ReleivAirports",
 displayKey: "name",
 source: releiverBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/airport2.png' class='searchico'>Releiver Airports</h5>"
 }
 }, {
 name: "Heliports",
 displayKey: "name",
 source: heliBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/heliport.png' class='searchico'>Heliports</h5>"
 }
 }, {
 name: "FCinter",
 displayKey: "name",
 source: interBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/17.png' class='searchico'>Intermediate Center</h5>"
 }
 }, {
 name: "FCmajor",
 displayKey: "name",
 source: majorBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/18.png' class='searchico'>Major Center</h5>"
 }
 }, {
 name: "FCmega",
 displayKey: "name",
 source: megaBH.ttAdapter(),
 templates: {
 header: "<h5 class='typeahead-header'><img src='lib/images/flat/19.png' class='searchico'>Mega Center</h5>"
 }

 }, {
 name: "GeoNames",
 displayKey: "name",
 source: geonamesBH.ttAdapter(),
 templates: {
 header: "<h4 class='typeahead-header'>Place Results</h4>"
 }
 }).on("typeahead:selected", function(obj, datum) {
 $('#search-panel').fadeOut('fast');
 resetHighlight();
 resetInfoWindow();
 $e1.typeahead('val', '');
 if ($('#nav_search').hasClass('hidden')) {
 $('#pFFlanding').fadeOut(800);
 $('#nav_search').removeClass('hidden');
 $('#maplink').addClass('hidden');
 };
 if (datum.source === "Counties") {
 map.fitBounds(datum.bounds);
 };
 if (datum.source === "Highways") {
 if (!map.hasLayer(freeway)) {
 map.addLayer(freeway);
 $("#freeway").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "NHS") {
 if (!map.hasLayer(nhsgroup)) {
 map.addLayer(nhsgroup);
 $("#nhsgroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "TruckParking") {
 if (!map.hasLayer(trkparkgroup)) {
 map.addLayer(trkparkgroup);
 $("#trkparkgroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "HwyBridges") {
 if (!map.hasLayer(hwyrivcrossing)) {
 map.addLayer(hwyrivcrossing);
 $("#hwyrivcrossing").prop("checked", true);
 };
 map.setView([datum.lat, datum.lng], 17);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "RailLines") {
 if (!map.hasLayer(railines)) {
 map.addLayer(railines);
 $("#railines").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "RailYards") {
 if (!map.hasLayer(railyardgroup)) {
 map.addLayer(railyardgroup);
 $("#railyardgroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "Intermodal") {
 if (!map.hasLayer(intermodalgroup)) {
 map.addLayer(intermodalgroup);
 $("#intermodalgroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "GradeCrossing") {
 if (!map.hasLayer(gradexing)) {
 map.addLayer(gradexing);
 $("#gradexing").prop("checked", true);
 };
 map.setView([datum.lat, datum.lng], 17);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "RailBridges") {
 if (!map.hasLayer(railbridgept)) {
 map.addLayer(railbridgept);
 $("#railbridgept").prop("checked", true);
 };
 map.setView([datum.lat, datum.lng], 17);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "Rivers") {
 if (!map.hasLayer(river)) {
 map.addLayer(river);
 $("#river").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "PortTerminals") {
 if (!map.hasLayer(portGroup)) {
 map.addLayer(portGroup);
 $("#portGroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 //highlightportpoly(map._layers[datum.id]);
 };
 };
 if (datum.source === "Anchorages") {
 if (!map.hasLayer(anchorageGroup)) {
 map.addLayer(anchorageGroup);
 $("#anchorageGroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "CommAirports") {
 if (!map.hasLayer(commGroup)) {
 map.addLayer(commGroup);*/
/*                    $("#commGroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "ReleivAirports") {
 if (!map.hasLayer(relGroup)) {
 map.addLayer(relGroup);
 $("#relGroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "Heliports") {
 if (!map.hasLayer(heliport)) {
 map.addLayer(heliport);
 $("#heliport").prop("checked", true);
 };
 map.setView([datum.lat, datum.lng], 17);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "FCinter") {
 if (!map.hasLayer(FCintergroup)) {
 map.addLayer(FCintergroup);
 $("#FCintergroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "FCmajor") {
 if (!map.hasLayer(FCmajorgroup)) {
 map.addLayer(FCmajorgroup);
 $("#FCmajorgroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "FCmega") {
 if (!map.hasLayer(FCmegagroup)) {
 map.addLayer(FCmegagroup);
 $("#FCmegagroup").prop("checked", true);
 };
 map.fitBounds(datum.bounds);
 if (map._layers[datum.id]) {
 map._layers[datum.id].fire("click");
 };
 };
 if (datum.source === "GeoNames") {
 map.setView([datum.lat, datum.lng], 14);
 };
 if ($(".navbar-collapse").height() > 50) {
 $(".navbar-collapse").collapse("hide");
 };*/
/*}).on("typeahead:initialized ", function () {
 $(".tt-dropdown-menu").css("max-height", 300);
 /*        }).on("typeahead:opened", function() {
 $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
 $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
 }).on("typeahead:closed", function() {
 $(".navbar-collapse.in").css("max-height", "");
 $(".navbar-collapse.in").css("height", "");
 });
 $(".twitter-typeahead").css("position", "static");
 $(".twitter-typeahead").css("display", "block");
 }*/


function renderLayers(){
    var layers = [];
    $('input:checkbox[name="LayerCont"]').each(function () {
        // Remove all overlay layers
        map.removeLayer(window[$(this).attr('id')]);
        if ($('#' + $(this).attr('id')).is(':checked')) {
            // Add checked layers to array for sorting
            layers.push({
                'z-index': $(this).attr('z-index'),
                'layer': $(this)
            });
        }

    });
    var orderedLayers = sortByKey(layers, 'z-index');
    // Loop through ordered layers array and add to map in correct order
    $.each(orderedLayers, function () {
        map.addLayer(window[$(this)[0].layer[0].id]);
    });
}

function pointify(data){
    var data_n = jQuery.extend(true, {}, data);
    for(var i = 0; i < data_n.features.length; i++){
        data_n.features[i].geometry.type = 'Point';
        data_n.features[i].geometry.coordinates = [data_n.features[i].properties.LONG_, data_n.features[i].properties.LAT]
    }
    return data_n
}

function pointify_topo(data, layer){
    var data_n = jQuery.extend(true, {}, data['objects'][layer]);
    data_n.features = data_n.geometries;
    data_n.type = 'FeatureCollection';
    data_n.geometries = [];
    for(var i = 0; i < data_n.features.length; i++){
        data_n.features[i].type = 'Feature'
        data_n.features[i].geometry = {'type': 'Point','coordinates': [data_n.features[i].properties.LONG_, data_n.features[i].properties.LAT]};
    }
    return data_n
}


function loadLayers (){
    var mapLoad = $('#mapLoad').val();
    if(mapLoad === 'false'){

        $.getJSON("data/MajorRoads.json", function (data) {		//get data from json source
            layer1.addData(data);
        });
        polyLayer.push('layer1');

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer2.addData(data);
        });

        $.getJSON("data/layer3pt.json", function (data) {
            layer3pt.addData(data);
        });

        $.getJSON("data/layer3poly.json", function (data) {
            layer3poly.addData(data);
        });
        polyLayer.push('layer3poly');


        $.getJSON("data/layer4pt.json", function (data) {
            layer4pt.addData(data);
        });


        $.getJSON("data/layer4poly.json", function (data) {
            layer4poly.addData(data);
        });
        polyLayer.push('layer4poly');

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer5.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer6.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer2.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer8.addData(data);
        });


        $.getJSON("data/POE_Join_test.geojson", function (data) {
            layer9.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer10.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer11.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer12.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer13.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer14.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer15.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer16.addData(data);
        });

        $.getJSON("data/Ports of Entry.json", function (data) {
            layer17.addData(data);
        });

        //set checkbox status
        $('.legPanel').each(function(){
            var loadall = $(this).find('input.layer').length;
            var loadchecked = $(this).find('input.layer:checked').length;
            if (loadall == loadchecked) {
                $(this).closest('.panel').find('.checked_all').html('<div class="chkicon dynico dynico-check-square-o"></div>');
                $(this).closest('.panel-body').append('<input type="hidden" class="Chkd" value="false" />');
            } else {
                $(this).closest('.panel').find('.checked_all').html('<div class="chkicon dynico dynico-square-o"></div>');
                $(this).closest('.panel-body').append('<input type="hidden" class="Chkd" value="true" />');
            }
            var cbo = $(this).find('.dynacheck').length;
            if (cbo > 0){
                $(this).find('input.layer:checked').siblings('.dynacheck').find('.legend-check').html('<i class="dynico dynico-check-square-o"></i>');
            }
        });
        $('input#mapLoad').attr('value', 'true');



        //renderLayers
        //renderLayers();
        //re-render layers (hack to ordering based on load delay)
        setTimeout(function() { renderLayers();}, 500);
        /*     setTimeout(function() { loadSearchBar();}, 1500);*/             // commented out 6/13/17--may need to add back in
        //setTimeout(function() { renderLayers();loadSearchBar(); }, 5500);
    }

}