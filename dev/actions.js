//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////  Declare Shared Values //////////////////////

var hlweight = 7, 			//weight of highlighted feature outline
	hlColor = "#00CCFF";	//color of point, outline and line highlights


// required variables DO NOT REMOVE
var polyLayer= [], layersearch, props, header, content, featureName, featureClass, featureIcon, titleName, headerClass;

////////////////////////////////////////////////////
///Individual Feature actions /////////////////////

// Highway layers ////////////
//  layer1
function MajorRoads(e) {
        initializeHL(e);
        header = '<p>' + props.NM + '</p>',
        content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.NM + "</div><div class='labelfield'>Name</div>\
    <div class='datafield'>" + props.Mileage + "</div><div class='labelfield'>Mileage: </div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
            featureName = '<p>Type: Connectors</p>',
            featureClass = 'hwycl',
            featureIcon = 'hwyicon icon';
    contentPush(header, content, featureName, featureClass, featureIcon);
};

//  layer2
// function Connectors(e) {
//     initializeHL(e);
//     header = '<p>' + props.Proj_ID + '</p>',
//         content = "<div id='baseInfo'>\
//     <div class='datafield'>" + props.Proj_ID + "</div><div class='labelfield'>Facility Name</div>\
//     <div class='datafield'>" + props.Active + "</div><div class='labelfield'>Facility Served</div>\
//     </div><!--close baseInfo-->\
//     <div class='infoDivider'></div>\
//     <div id='indicatorInfo'>\
//     <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
//         featureName = '<p>Type: Connectors</p>',
//         featureClass = 'hwycl',
//         featureIcon = 'nhsicon icon';
//     contentPush(header, content, featureName, featureClass, featureIcon);
// };

//  layer3
function InspectionFacilities(e) {
    initializeHL(e);
    header = '<p>' + props.Name + '</p>',
        content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.Name + "</div><div class='labelfield'>Name</div>\
    <div class='datafield'>" + props.Operator + "</div><div class='labelfield'>Operator</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Commericial Truck Crossings: </strong></td><td>" + props.Volume + "</td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Lanes per direction</a>: </strong></td><td> " + props.Lanes + " </td></tr>\
            <tr class='active'><td><strong>Facility Website: </strong></td><td>" + props.url + "</td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
            featureName = '<p>Type: Truck Inspection Facilities</p>',
            featureClass = 'hwycl',
            featureIcon = 'hwyicon icon';
        contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer4
function TruckParkingFacilities(e) {
    initializeHL(e);
    header = '<p>' + props.NAME + '</p>',
    content = "<div id='baseInfo'>"
                        +"<div class='datafield'>" + props.NAME  + "</div><div class='labelfield'>Facility Name</div>"
                        +"<div class='datafield'>" + props.ACTIVE + "</div><div class='labelfield'>Active</div>"
                        // +"<div class='datafield'>" + props.STATUS + "</div><div class='labelfield'>Status</div>"
                        +"</div><!--close baseInfo-->"
                        +"<div class='infoDivider'></div>"
                        +"<div id='indicatorInfo'>"
                        +"<ul class='nav nav-tabs'><!--tabs for indicators-->"
                        +"<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul></ul>"
                        +"<div id='indicator' class='tab-content'><!--tab panes-->"
                        +"<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>"
                            +"<table class='table table-hover'>"
                                +"<tr class='active'><td><strong>Spaces: </strong></td><td>" + props.Spaces + "</td></tr>"
                                +"<tr class='active'><td><strong>Amenities: </strong></td><td>" + props.Amenities + "</td></tr>"
                            +"</table>"
                    +"</div></div>"
                    +"<div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Ports of Entry</p>',
        featureClass = 'hwycl',
        featureIcon = 'trkparkicon icon';
        contentPush(header,content,featureName,featureClass,featureIcon);
};

// Freight Rail layers
//  Rail Yards, layer 5
function RailYards(e) {
    initializeHL(e);
    header = '<p>' + props.RailYard_N + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.RailYard_N  + "</div><div class='labelfield'>Name</div>\
    <div class='datafield'>" + props.Owner_1 + "</div><div class='labelfield'>Owner</div>\
    <div class='datafield'>" + props.Operator + "</div><div class='labelfield'>Operator</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Acres: </strong></td><td>" + props.Area + "</td></tr>\
            <tr class='active'><td><strong>Track Type: </strong></td><td>" + props.Track_Type + "</td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Rail Yards</p>',
        featureClass = 'railcl',
        featureIcon = 'railyardicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer6
function RailLines(e) {
    initializeHL(e);
    header = '<p>' + props.d_Owner + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.d_Owner + "</div><div class='labelfield'>Owner</div>\
    <div class='datafield'>" + props.d_Operat_2 + "</div><div class='labelfield'>Operator</div>\
    <div class='datafield'>" + props.d_TrackTyp  + "</div><div class='labelfield'>Track Type</div>\
    </div><!--close baseInfo-->\
    <!--<div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <!--<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <!--<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Number of Tracks: </strong></td><td>" + numeral(props.Capacity).format('0,0') + "</td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Double Stack Clearance</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
            <tr class='active'><td><strong> <a title='Rail line that support 862k capacity rail freight' data-toggle='infotooltip'>862k Capacity</a>: </strong></td><td> " + numeral(props.Activity_2).format('0,0.0') + " </td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Trains Daily</a>: </strong></td><td> " + numeral(props.Activity_3).format('0,0') + " </td></tr>\
        </table>\
    </div></div>-->\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Rail Lines</p>',
        featureClass = 'railcl',
        featureIcon = 'railicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer7
function IntermodalFacilities(e) {
    initializeHL(e);
    header = '<p>' + props.Proj_ID + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.Proj_ID + "</div><div class='labelfield'>Owner</div>\
    <div class='datafield'>" + props.Active + "</div><div class='labelfield'>Operator(s)</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Truck Spaces Available: </strong></td><td>" + props.Capacity + "</td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Acres</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Activity</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Intermodal Facilities</p>',
        featureClass = 'railcl',
        featureIcon = 'railintericon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer8
function RailGradeCrossings(e) {
    initializeHL(e);
    header = '<p>' + props.Proj_ID + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.Proj_ID + "</div><div class='labelfield'>Owner</div>\
    <div class='datafield'>" + props.Active + "</div><div class='labelfield'>Operator(s)</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Tracks at Crossing: </strong></td><td>" + props.Capacity + "</td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>FRA Crossing History</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Rail Grade Crossings</p>',
        featureClass = 'railcl',
        featureIcon = 'railcrossicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

// Marine and Land Port layers
//  layer9
function PortsOfEntry(e) {
    initializeHL(e);
    header = '<p>' + props.Name + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.Name + "</div><div class='labelfield'>Port Name</div>\
    <div class='datafield'>" + props.Status + "</div><div class='labelfield'>Status</div>\
    <!--<div class='datafield'><a href='url'>" + props.url + "</a></div><div class='labelfield'>URL</div>-->\
    </div><!--close baseInfo-->\
    <!--<div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <!--<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <!--<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Pedestrian Crossings: </strong></td><td>" + props.Capacity + "</td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Truck Crossings</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
        </table>\
    </div></div>-->\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Ports of Entry</p>',
        featureClass = 'portcl',
        featureIcon = 'porticon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer10
function PortTerminals(e) {
    initializeHL(e);
    header = '<p>' + props.Name + '</p>',
        content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.Name + "</div><div class='labelfield'>Owner</div>\
    <div class='datafield'>" + props.Operator + "</div><div class='labelfield'>Operator(s)</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Ship Arrivals: </strong></td><td>" + props.Arrivals + "</td></tr>\
            <tr class='active'><td><strong>Acres: </strong></td><td>" + props.Acres + " </td></tr>\
            <tr class='active'><td><strong>Berths: </strong></td><td>" + props.Berths + "</td></tr>\
            <tr class='active'><td><strong>Warehouse Space: </strong></td><td>" + props.Capacity + "</td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.Name + "</div></div>",
        featureName = '<p>Type: Port Terminals</p>',
        featureClass = 'marineportcl',
        featureIcon = 'marineporticon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer11
// function Anchorages(e) {
//     initializeHL(e);
//     header = '<p>' + props.Proj_ID + '</p>',
//     content = "<div id='baseInfo'>\
//     <div class='datafield'>" + props.Proj_ID + "</div><div class='labelfield'>Owner</div>\
//     <div class='datafield'>" + props.Active + "</div><div class='labelfield'>Operator(s)</div>\
//     </div><!--close baseInfo-->\
//     <div class='infoDivider'></div>\
//     <div id='indicatorInfo'>\
//     <ul class='nav nav-tabs'><!--tabs for indicators-->\
//     <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
//     <div id='indicator' class='tab-content'><!--tab panes-->\
//     <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
//         <table class='table table-hover'>\
//             <tr class='active'><td><strong>Channel Width (ft): </strong></td><td>" + props.Capacity + "</td></tr>\
//             <tr class='active'><td><strong> <a title='Truck space utilization determined by single overnight count' data-toggle='infotooltip'>Channel Depth (MLLW in ft)</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
//         </table>\
//     </div></div>\
//     <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
//         featureName = '<p>Type: Anchorages</p>',
//         featureClass = 'portcl',
//         featureIcon = 'anchicon icon';
//     contentPush(header,content,featureName,featureClass,featureIcon);
// };

// Airport Layers
//  layer12
function CommAirports(e) {
    initializeHL(e);
    header = '<p>' + props.Name + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.Name + "</div><div class='labelfield'>Type</div>\
    <div class='datafield'>" + props.Owner + "</div><div class='labelfield'>Owner</div>\
    </div><!--close baseInfo-->\
    <!--<div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <!--<li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <!--<div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Runway(s): </strong></td><td>" + props.Capacity + "</td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Runway Length(s)</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Total Acreage</a>: </strong></td><td>" + props.Activity_1 + " </td></tr>\
            <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Annual Operations</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
        </table>\
    </div></div>-->\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Commercial Airports</p>',
        featureClass = 'commaircl',
        featureIcon = 'commicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer13
// function MunicipalAirports(e) {
//     initializeHL(e);
//     header = '<p>' + props.Name + '</p>',
//     content = "<div id='baseInfo'>\
//     <div class='datafield'>" + props.Name + "</div><div class='labelfield'>Type</div>\
//     <div class='datafield'>" + props.Name + "</div><div class='labelfield'>Owner</div>\
//     </div><!--close baseInfo-->\
//     <div class='infoDivider'></div>\
//     <div id='indicatorInfo'>\
//     <ul class='nav nav-tabs'><!--tabs for indicators-->\
//     <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
//     <div id='indicator' class='tab-content'><!--tab panes-->\
//     <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
//         <table class='table table-hover'>\
//             <tr class='active'><td><strong>Runway(s): </strong></td><td>" + props.Capacity + "</td></tr>\
//             <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Runway Length(s)</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
//             <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Total Acreage</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
//         <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Annual Operations</a>: </strong></td><td> " + props.Activity_1 + " </td></tr>\
//         </table>\
//     </div></div>\
//     <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
//         featureName = '<p>Type: Municipal Airports</p>',
//         featureClass = 'relaircl',
//         featureIcon = 'relicon icon';
//     contentPush(header,content,featureName,featureClass,featureIcon);
// };

// Employment Center layers
//  layer14
function EmploymentCenters(e) {
    initializeHL(e);
    header = '<p>' + props.name + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.name + "</div><div class='labelfield'>Employment Centers</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Type</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Type</a>: </strong></td><td> " + props.Type + " </td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.source + "</div></div>",
        featureName = '<p>Type: Primary Employment Centers</p>',
        featureClass = 'fcmegacl',
        featureIcon = 'fcmegaicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};


//  layer15
function MoreEmployers(e) {
    initializeHL(e);
    header = '<p>' + props.name + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.name + "</div><div class='labelfield'>Employment Centers</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Zone</a>: </strong></td><td> " + props.zone + " </td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.source + "</div></div>",
        featureName = '<p>Type: Level 2 Employment Centers</p>',
        featureClass = 'fcmajorcl',
        featureIcon = 'fcmajoricon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

//  layer16
function OtherEmployers(e) {
    initializeHL(e);
    header = '<p>' + props.name + '</p>',
        content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.name + "</div><div class='labelfield'>Employment Centers</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong> <a title='Truck space utilization' data-toggle='infotooltip'>Zone</a>: </strong></td><td> " + props.zone + " </td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.source + "</div></div>",
        featureName = '<p>Type: Level 3 Employment Centers</p>',
        featureClass = 'fcothercl',
        featureIcon = 'fcothericon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

// Energy & Utility layers
//  layer17
function Pipelines(e) {
    initializeHL(e);
    header = '<p>' + props.OPERATOR + '</p>',
    content = "<div id='baseInfo'>\
    <div class='datafield'>" + props.OPERATOR + "</div><div class='labelfield'>Owner</div>\
    <div class='datafield'>" + props.Source + "</div><div class='labelfield'>Operator</div>\
    </div><!--close baseInfo-->\
    <div class='infoDivider'></div>\
    <div id='indicatorInfo'>\
    <ul class='nav nav-tabs'><!--tabs for indicators-->\
    <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
    <div id='indicator' class='tab-content'><!--tab panes-->\
    <div class='tab-pane active' id='Cap' style='padding-bottom: 12px;'>\
        <table class='table table-hover'>\
            <tr class='active'><td><strong>Material Transported: </strong></td><td>" + props.Material + "</td></tr>\
        </table>\
    </div></div>\
    <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
        featureName = '<p>Type: Energy & Utilities</p>',
        featureClass = 'energycl',
        featureIcon = 'pipelineicon icon';
    contentPush(header,content,featureName,featureClass,featureIcon);
};

// Communities layers
//  layer17
// function PortAccessImprovement(e) {
//     initializeHL(e);
//     header = '<p>' + props.Proj_ID + '</p>',
//     content = "<div id='baseInfo'>\
//     <div class='datafield'>" + props.Proj_ID + "</div><div class='labelfield'>Grantor</div>\
//     <div class='datafield'>" + props.Active + "</div><div class='labelfield'>Grantee</div>\
//     </div><!--close baseInfo-->\
//     <div class='infoDivider'></div>\
//     <div id='indicatorInfo'>\
//     <ul class='nav nav-tabs'><!--tabs for indicators-->\
//     <li class='active'><a href='#Cap' data-toggle='tab'>Capacity & Activity</a></li></ul>\
//     <div id='indicator' class='tab-content'><!--tab panes-->\
//     </div>\
//     <div class='labelfield source'>Data Source: " + props.Source + "</div></div>",
//         featureName = '<p>Type: Port Access Improvements</p>',
//         featureClass = 'communcl',
//         featureIcon = 'communicon icon';
//     contentPush(header,content,featureName,featureClass,featureIcon);
// };

// !!! Begin important info window -- This is what allows the info window minimize work !!!
$(document).ready(function() {



    $( 'a[href="#"]' ).click( function(e) {
        e.preventDefault();
    });
});

// !!! End important info window !!!

function activateTooltip() {
    $("[data-toggle=infotooltip]").tooltip({ placement: 'left'});
}
//custom button functionality
function modalLink(modal, tab){
    var element =  document.getElementById(modal);
    if (typeof(element) != 'undefined' && element != null){
        $('#'+modal+' li:eq('+ tab +') a').tab('show');
    }else{
        setTimeout(function(){
          $('#'+modal+' li:eq('+ tab +') a').tab('show');
        }, 0);
    }
}

//topoJSON handling

L.TopoJSON = L.GeoJSON.extend({
  addData: function(jsonData) {
    if (jsonData.type === "Topology") {
      for (key in jsonData.objects) {
        geojson = topojson.feature(jsonData, jsonData.objects[key]);
        L.GeoJSON.prototype.addData.call(this, geojson);
      }
    }
    else {
      L.GeoJSON.prototype.addData.call(this, jsonData);
    }
  }
});
// Copyright (c) 2013 Ryan Clark