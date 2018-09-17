//declare boundary of region
//var oLat = 40.018, oLng = -75.148, zLevel = 10;             ///adjust lat-lon coordinates to center on your region
//   var oLat = 32.965567, oLng = -116.690000, zLevel = 10;
var oLat = 32.812934, oLng = -116.608421, zLevel = 9;
         

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
        icon: 'road', markerColor: 'purple', layer:'layer1', title: 'Major Roads'}, IconPresets),
    // layer2icon = L.OpenFreightMarkers.icon({
    //     icon: 'nhs', markerColor: 'purple', layer:'layer2', title: 'Connectors'}, IconPresets),
    layer3icon = L.OpenFreightMarkers.icon({
        icon: 'truck', markerColor: 'purple', layer:'layer3', title: 'Truck Inspection Facilities'}, IconPresets),
    layer4icon = L.OpenFreightMarkers.icon({
        icon: 'parking', markerColor: 'purple', layer:'layer4', title: 'Truck Parking Facilities'}, IconPresets),
    layer5icon = L.OpenFreightMarkers.icon({
        icon: 'railyard', markerColor: 'gold', layer:'layer5', title: 'Rail Yards'}, IconPresets),
    layer6icon = L.OpenFreightMarkers.icon({
        icon: 'rail', markerColor: 'gold', layer:'layer6', title: 'Rail Lines'}, IconPresets),
    // layer7icon = L.OpenFreightMarkers.icon({
    //     icon: 'intermodal', markerColor: 'gold', layer:'layer7', title: 'Intermodal Facilities'}, IconPresets),
    // layer8icon = L.OpenFreightMarkers.icon({
    //     icon: 'railxing', markerColor: 'gold', layer:'layer8', title: 'Rail Grade Crossings'}, IconPresets),
    layer9icon = L.OpenFreightMarkers.icon({
        icon: 'poe', markerColor: 'blue', layer:'layer9', title: 'Ports of Entry'}, IconPresets),
    layer10icon = L.OpenFreightMarkers.icon({
        icon: 'ship', markerColor: 'blue', layer:'layer10', title: 'Marine Terminals'}, IconPresets),
    // layer11icon = L.OpenFreightMarkers.icon({
    //     icon: 'anchor', markerColor: 'blue', layer:'layer11', title: 'Anchorages'}, IconPresets),
    layer12icon = L.OpenFreightMarkers.icon({
        icon: 'airport', markerColor: 'yellow', layer:'layer12', title: 'Commercial Airports'}, IconPresets),
    // layer13icon = L.OpenFreightMarkers.icon({
    //     icon: 'airport', markerColor: 'ltgreen', layer:'layer13', title: 'Municipal Airports'}, IconPresets),
    layer14icon = L.OpenFreightMarkers.icon({
        icon: 'center', onLoad: false, markerColor: 'forest', layer:'layer14', title: 'Level 1 Employment Centers'}, IconPresets),
    layer15icon = L.OpenFreightMarkers.icon({
        icon: 'center', onLoad: false, markerColor: 'forest', layer:'layer15', title: 'Level 2 Employment Centers'}, IconPresets),
    layer16icon = L.OpenFreightMarkers.icon({
        icon: 'center', onLoad: false, markerColor: 'forest', layer:'layer16', title: 'Level 3 Employment Centers'}, IconPresets),
    layer17icon = L.OpenFreightMarkers.icon({
        icon: 'pipeline', markerColor: 'yellow', layer:'layer17', title: 'Energy & Utilities'}, IconPresets)
    // layer18icon = L.OpenFreightMarkers.icon({
    //     icon: 'community', markerColor: 'teal', layer:'layer17', title: 'Port Access Improvement'}, IconPresets);

//define search groups for each layer that will be searchable
var layer1Search = [], layer3Search = [], layer4Search = [], layer5Search = [], layer6Search = [], layer7Search = [], layer8Search = [],
    layer9Search = [], layer10Search = [], layer12Search = [], layer14Search = [], layer15Search = [], layer16Search = [],
    layer17Search = [], LayerStyle = [];

//define Major Roads (lines only)
var layer1 = new L.geoJson(null, {
    style: {
        color:   "#884C9E",
        weight:  3,
        opacity: 1
    },
    onEachFeature: function(feature, layer) {
        layer.on({
            click: MajorRoads,
            dblclick: zoomToFeature
        });
        // layer11Search.push({								//push variables from json features to search arrays
        //     name: layer.feature.properties.Name,			//search name/field
        //     source: "Layer 1",								//layer source
        //     id: L.stamp(layer),								//leaflet id
        //     lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
        //     lng: layer.feature.geometry.coordinates[0]
        // });
        // layer1Search.push({
        //     name: layer.feature.properties.Name,
        //     source: "Layer 1",
        //     id: L.stamp(layer),
        //     bounds: layer.getBounds()
        // });
    }

});


//define Connectors (point only)
// var layer2 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer2icon});	//declare icon to be used for point
//         },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//            click: Connectors,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer2Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 2",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });

//define Truck Inspection Facilities (point only)
// var layer3 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer3icon});	//declare icon to be used for point
//     },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//             click: InspectionFacilities,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer3Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 3",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });

//define Truck Parking Facilities / Layer 4 (point and poly combo)
var layer3pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer3icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    InspectionFacilities,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
//declare polygon data for Layer 4 [same as Poly only]
var layer3poly = L.geoJson(null, {
    style: {
        weight:4,
        color: "#884C9E",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: InspectionFacilities,
            dblclick: zoomToFeature
        });
        layer5Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 3",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});

//create layer group for Layer 5 point and polygon features
var layer3 = new L.FeatureGroup([layer3pt, layer3poly]);

//define Truck Parking Facilities / Layer 4 (point and poly combo)
var layer4pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer4icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    TruckParkingFacilities,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
//declare polygon data for Layer 4 [same as Poly only]
var layer4poly = L.geoJson(null, {
    style: {
        weight:4,
        color: "#884C9E",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: TruckParkingFacilities,
            dblclick: zoomToFeature
        });
        layer5Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 4",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 5 point and polygon features
var layer4 = new L.FeatureGroup([layer4pt, layer4poly]);

//define Layer 5 (point and poly combo)
//declare point data first [same as point only] -- no search as search will be provided for with polygon feature
var layer5pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer5icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    RailYards,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
//declare polygon data for Layer 5 [same as Poly only]
var layer5poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#F9BF72",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: RailYards,
            dblclick: zoomToFeature
        });
        layer5Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 5",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 5 point and polygon features
var layer5 = new L.FeatureGroup([layer5pt, layer5poly]);


//define Layer 6 (point only)
var layer6 = L.geoJson(null, {
    style:   {
        color:   "#F9BF72",
        weight:  3,
        opacity: 1
    },
    onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
           click: RailLines,								//function on click --> function to be created in actions.js
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


//define Layer 7 (point only)
// var layer7 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer7icon});	//declare icon to be used for point
//         },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//            click: IntermodalFacilities,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer7Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 7",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });


//define Layer 8 (point only)
// var layer8 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer8icon});	//declare icon to be used for point
//         },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//            click: RailGradeCrossings,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer8Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 8",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });


//define Layer 9 (point and poly combo)
//declare point data first [same as point only] -- no search as search will be provided for with polygon feature
var layer9pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer9icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    PortsOfEntry,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
//declare polygon data for Layer 9 [same as Poly only]
var layer9poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#0E76BC",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: PortsOfEntry,
            dblclick: zoomToFeature
        });
        layer9Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 9",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 9 point and polygon features
var layer9 = new L.FeatureGroup([layer9pt, layer9poly]);


//define Layer 10 (point and poly combo)
//declare point data first [same as point only] -- no search as search will be provided for with polygon feature
var layer10pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer10icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    PortTerminals,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
//declare polygon data for Layer 10 [same as Poly only]
var layer10poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#54C4C8",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: PortTerminals,
            dblclick: zoomToFeature
        });
        layer10Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 10",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 3 point and polygon features
var layer10 = new L.FeatureGroup([layer10pt, layer10poly]);

// //define Layer 11 (point only)
// var layer11 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer11icon});	//declare icon to be used for point
//         },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//            click: Anchorages,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer11Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 11",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });


//define Layer 12 (point and poly combo)
//declare point data first [same as point only] -- no search as search will be provided for with polygon feature
var layer12pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer12icon});	//declare icon to be used for point
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    CommAirports,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
//declare polygon data for Layer 12 [same as Poly only]
var layer12poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#EFD315",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: CommAirports,
            dblclick: zoomToFeature
        });
        layer12Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 12",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 3 point and polygon features
var layer12 = new L.FeatureGroup([layer12pt, layer12poly]);


//define Layer 13 (point and poly combo)
//declare point data first [same as point only] -- no search as search will be provided for with polygon feature
// var layer13pt = L.geoJson(null, {
//     pointToLayer:  function (feature, latlng) {
//         return L.marker(latlng, {icon: layer13icon});	//declare icon to be used for point
//     },
//     onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//             click:    MunicipalAirports,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//     }
// });
//declare polygon data for Layer 12 [same as Poly only]
// var layer13poly = L.geoJson(null, {
//     style: {
//         weight:4,
//         color:"#AED199",
//         opacity:.75
//     },
//     onEachFeature: function (feature, layer){
//         layer.on({
//             click: MunicipalAirports,
//             dblclick: zoomToFeature
//         });
//         layer13Search.push({
//             name: layer.feature.properties.Name,
//             source: "Layer 13",
//             id: L.stamp(layer),
//             bounds: layer.getBounds()
//         });
//     }
// });
// //create layer group for Layer 3 point and polygon features
// var layer13 = new L.FeatureGroup([layer13pt, layer13poly]);



//define Layer 14 (point and poly)
var layer14pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer14icon});	//declare icon to be used for point
    },
    style: {
        weight:4,
        color:"#a50a21",
        opacity:.75
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    EmploymentCenters,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
var layer14poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#a50a21",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: EmploymentCenters,
            dblclick: zoomToFeature
        });
        layer14Search.push({
            name: layer.feature.properties.name,
            source: "Layer 14",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 3 point and polygon features
var layer14 = new L.FeatureGroup([layer14pt, layer14poly]);


//define Layer 15 (point and poly)
var layer15pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer15icon});	//declare icon to be used for point
    },
    style: {
        weight:4,
        color:"#a50a21",
        opacity:.50
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    MoreEmployers,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
var layer15poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#a50a21",
        opacity:.35
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: MoreEmployers,
            dblclick: zoomToFeature
        });
        layer15Search.push({
            name: layer.feature.properties.name,
            source: "Layer 15",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 3 point and polygon features
var layer15 = new L.FeatureGroup([layer15pt, layer15poly]);

//define Layer 16 (point and poly)
var layer16pt = L.geoJson(null, {
    pointToLayer:  function (feature, latlng) {
        return L.marker(latlng, {icon: layer16icon});	//declare icon to be used for point
    },
    style: {
        weight:4,
        color:"#a50a21",
        opacity:.75
    },
    onEachFeature: function (feature, layer) {			//defines actions to be applied of each feature of layer
        layer.on({											//Event handler on each feature
            click:    OtherEmployers,								//function on click --> function to be created in actions.js
            dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
        });
    }
});
var layer16poly = L.geoJson(null, {
    style: {
        weight:4,
        color:"#a50a21",
        opacity:.75
    },
    onEachFeature: function (feature, layer){
        layer.on({
            click: OtherEmployers,
            dblclick: zoomToFeature
        });
        layer16Search.push({
            name: layer.feature.properties.name,
            source: "Layer 16",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }
});
//create layer group for Layer 3 point and polygon features
var layer16 = new L.FeatureGroup([layer16pt, layer16poly]);

// //define Layer 16 (point only)
// var layer16 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer16icon});	//declare icon to be used for point
//         },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//            click: EnergyUtilities,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer16Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 16",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });

//define Pipelines / Layer 17 (lines only)
var layer17 = new L.geoJson(null, {
    style: {
        color: "#EFD315",
        weight:  3,
        opacity: 1
    },
    onEachFeature: function(feature, layer) {
        layer.on({
            click: Pipelines,
            dblclick: zoomToFeature
        });
        layer17Search.push({
            name: layer.feature.properties.Name,
            source: "Layer 17",
            id: L.stamp(layer),
            bounds: layer.getBounds()
        });
    }

});

//define Layer 17 (point only)
// var layer17 = L.geoJson(null, {
//     pointToLayer: function (feature, latlng) {
//         return L.marker(latlng, {icon: layer17icon});	//declare icon to be used for point
//         },
//     onEachFeature: function (feature, layer){			//defines actions to be applied of each feature of layer
//         layer.on({											//Event handler on each feature
//            click: Pipelines,								//function on click --> function to be created in actions.js
//             dblclick: zoomToPoint								//funciton on double click  --> zoom to point function in actions.js
//         });
//         layer17Search.push({								//push variables from json features to search arrays
//             name: layer.feature.properties.Name,			//search name/field
//             source: "Layer 17",								//layer source
//             id: L.stamp(layer),								//leaflet id
//             lat: layer.feature.geometry.coordinates[1],		//geometric bounds declaration for points (requires lat and lng)
//             lng: layer.feature.geometry.coordinates[0]
//         });
//     }
// });

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
    // var layer2BH = new Bloodhound({
    //     name: "Layer 2",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: layer2Search,
    //     limit: 10
    // });
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
    // var layer11BH = new Bloodhound({
    //     name: "Layer 11",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: layer4Search,
    //     limit: 10
    // });
	var layer12BH = new Bloodhound({
        name: "Layer 12",
        datumTokenizer: function (d) {
            return Bloodhound.tokenizers.whitespace(d.name);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: layer4Search,
        limit: 10
    });
    // var layer13BH = new Bloodhound({
    //     name: "Layer 13",
    //     datumTokenizer: function (d) {
    //         return Bloodhound.tokenizers.whitespace(d.name);
    //     },
    //     queryTokenizer: Bloodhound.tokenizers.whitespace,
    //     local: layer4Search,
    //     limit: 10
    // });
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
    // layer2BH.initialize();
    layer3BH.initialize();
    layer4BH.initialize();
	layer5BH.initialize();
    layer6BH.initialize();
    layer7BH.initialize();
    layer8BH.initialize();
	layer9BH.initialize();
    layer10BH.initialize();
    // layer11BH.initialize();
    layer12BH.initialize();
	// layer13BH.initialize();
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
    },
    //     {
    // 	name: "Layer2data",
    //     displayKey: "name",
    //     source: layer2BH.ttAdapter(),
    //     templates: {
    //         header: "<h5 class='typeahead-header'>Layer 2</h5>"
    //     }
    // },
        {
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
	},
     //    {
    	// name: "Layer11data",
     //    displayKey: "name",
     //    source: layer11BH.ttAdapter(),
     //    templates: {
     //        header: "<h5 class='typeahead-header'>Layer 11</h5>"
     //    }
	// },
        {
    	name: "Layer12data",
        displayKey: "name",
        source: layer12BH.ttAdapter(),
        templates: {
            header: "<h5 class='typeahead-header'>Layer 12</h5>"
        }
	},
     //    {
    	// name: "Layer13data",
     //    displayKey: "name",
     //    source: layer13BH.ttAdapter(),
     //    templates: {
     //        header: "<h5 class='typeahead-header'>Layer 13</h5>"
     //    }
	// },
        {
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
        // if (datum.source === "Layer 2") {
        //     if (!map.hasLayer(layer2)) {
        //         map.addLayer(layer2);
        //         $("#layer2").prop("checked", true);
        //     };
        //     // map.setView([datum.lat, datum.lng], 17);			//zoom to selection based on point and zoom level (for point only results)
        //     map.fitBounds(datum.bounds);
        //     if (map._layers[datum.id]) {
        //         map._layers[datum.id].fire("click");
        //     };
        // };
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
		     //    if (datum.source === "Layer 11") {
            // if (!map.hasLayer(layer11)) {
            //     map.addLayer(layer11);
            //     $("#layer11").prop("checked", true);
            // };
        //     map.fitBounds(datum.bounds);
        //     if (map._layers[datum.id]) {
        //         map._layers[datum.id].fire("click");
        //     };
        // };
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
		 //        if (datum.source === "Layer 13") {
        //     if (!map.hasLayer(layer13)) {
        //         map.addLayer(layer13);
        //         $("#layer13").prop("checked", true);
        //     };
        //     map.fitBounds(datum.bounds);
        //     if (map._layers[datum.id]) {
        //         map._layers[datum.id].fire("click");
        //     };
        // };
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

//Major Roads
$.getJSON("data/MajorRoads_20171002.json", function (data) {		//get data from json source
	layer1.addData(data);
});
polyLayer.push('layer1'); //must have this even though not poly layer or the highlighting stays on

// //Connectors
// $.getJSON("data/Ports of Entry.json", function (data) {
// 	layer2.addData(data);
// });

// Truck Inspection Facilities
$.getJSON("data/truck_inspection_points.json", function (data) {
    layer3pt.addData(data);
});

$.getJSON("data/truck_inspection_polys.json", function (data) {
    layer3poly.addData(data);
});
polyLayer.push('layer3poly');


// Truck Parking Facilities
$.getJSON("data/truck_parking_points_20180615.json", function (data) {
    layer4pt.addData(data);
});

$.getJSON("data/truck_parking_polys_20180615.json", function (data) {
    layer4poly.addData(data);
});
polyLayer.push('layer4poly');

// Rail Yards
$.getJSON("data/Rail_Yards_Points.json", function (data) {
    layer5pt.addData(data);
});

$.getJSON("data/rail_yards_poly_dom.json", function (data) {
    layer5poly.addData(data);
});
polyLayer.push('layer5poly');

// Rail Lines
$.getJSON("data/Railroads_Freight.json", function (data) {
	layer6.addData(data);
});
polyLayer.push('layer6');

// // Intermodal Facilities
// $.getJSON("data/Ports of Entry.json", function (data) {
// 	layer7.addData(data);
// });
//
// // Rail Grade Crossings
// $.getJSON("data/Ports of Entry.json", function (data) {
// 	layer8.addData(data);
// });

// Ports of Entry point and poly
$.getJSON("data/POE_Points.json", function (data) {
    layer9pt.addData(data);
});

$.getJSON("data/POE_Footprints.json", function (data) {
    layer9poly.addData(data);
});
polyLayer.push('layer9poly');

// Port Terminals point and poly
$.getJSON("data/marine_terminals_20180612.json", function (data) {
    layer10pt.addData(data);
});

$.getJSON("data/MarineTerminals.json", function (data) {
    layer10poly.addData(data);
});
polyLayer.push('layer10poly');

// Anchorages
// $.getJSON("data/Ports of Entry.json", function (data) {
// 	layer11.addData(data);
// });

// Commercial Airports point and poly
$.getJSON("data/CommAirports_Points.json", function (data) {
    layer12pt.addData(data);
});

$.getJSON("data/CommAirports.json", function (data) {
    layer12poly.addData(data);
});
polyLayer.push('layer12poly');

// Municipal Airports
// $.getJSON("data/MunicipalAirports_Points.json", function (data) {
// 	layer13pt.addData(data);
// });
//
// $.getJSON("data/MunicipalAirports.json", function (data) {
//     layer13poly.addData(data);
// });
// polyLayer.push('layer13poly');

// Primary Employment Centers
$.getJSON("data/primary_point.json", function (data) {
    layer14pt.addData(data);
});

$.getJSON("data/primary_poly.json", function (data) {
    layer14poly.addData(data);
});
polyLayer.push('layer14poly');

// Secondary Employment Centers
$.getJSON("data/secondary_point.json", function (data) {
    layer15pt.addData(data);
});

$.getJSON("data/secondary_poly.json", function (data) {
    layer15poly.addData(data);
});
polyLayer.push('layer15poly');

// Tertiary Employent Centers
$.getJSON("data/tertiary_point.json", function (data) {
    layer16pt.addData(data);
});

$.getJSON("data/tertiary_poly.json", function (data) {
    layer16poly.addData(data);
});
polyLayer.push('layer16poly');

// Energy and Utilities / Pipelines
$.getJSON("data/pipelines_20180615.json", function (data) {
	layer17.addData(data);
});
polyLayer.push('layer17'); //must have this even though not poly layer

// // Port Access Improvements
// $.getJSON("data/Ports of Entry.json", function (data) {
// 	layer17.addData(data);
// });
        
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