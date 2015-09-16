/** Set up global types so JSHint doesn't trigger warnings that they are not defined */

/*global xr, GMaps, Promise, setTimeout, window, document, console, alert */

//global map variable
var map;


window.addEventListener('load', function (e) {


    var reqText = document.querySelector("[id=request-response-text]");
    //var jsonReq = new xr();

    //xr.get('http://maps.land.vic.gov.au/lvis/services/smesDataDelivery/getMarkInformation', {
    xr.get('http://jsonplaceholder.typicode.com/posts/1', {
            /*searchType: "Location",
            latitude: "-36 34 6.9",
            longitude: "146 1 24.4",
            radius: 2,
            format: "Brief"*/
        })
        .then(function (jsonResponse) {
            reqText.textContent = JSON.stringify(jsonResponse);
        })
        .catch(function (err) {
            console.log(err);
        });

    xr.get('http://maps.land.vic.gov.au/lvis/services/smesDataDelivery/getMarkInformation', {
            searchType: "Location",
            latitude: "-36 34 6.9",
            longitude: "146 1 24.4",
            radius: 2,
            format: "Brief"
        })
        .then(function (jsonResponse) {
            reqText.textContent = JSON.stringify(jsonResponse);
        })
        .catch(function (err) {
            console.log(err);
        });

    geoLocate();


}, false);

function mapMoved() {
    var markInf;
    var coords = map.getCenter();


    //Check for wrapped coords
    if (coords.H < (-180)) {
        coords.H = coords.H + 360;
    }

    //Check for wrapped coords
    if (coords.L < (-180)) {
        coords.L = coords.L + 360;
    }


    console.log('Finished moving or zooming map:' + coords.H + ', ' + coords.L);
    markInf = retrieveMarkInformation();

    //Clear markers
    map.removeMarkers();

    addMarkers(markInf, coords.H, coords.L);
}

function addMarkers(mapMarkerInf, Lat, Long) {

    mapMarkerInf.forEach(function (surveyMark) {
        map.addMarker({
            /*lat: surveyMark.latitude,
            lng: surveyMark.longitude,*/
            lat: Lat,
            lng: Long,
            title: surveyMark.name,
            infoWindow: {
                content: '<p style="color: #009688"><b>' + surveyMark.name + '</b></p><hr>' +
                    '<p>Nine Figure Number: ' + surveyMark.nineFigureNumber + '</p>' +
                    '<p>Status: ' + surveyMark.status + '</p>' +
                    '<p>SCN: ' + surveyMark.scn + '</p>' +
                    '<p>Zone: ' + surveyMark.zone + '</p>' +
                    '<p>Easting: ' + surveyMark.easting + '</p>' +
                    '<p>Northing: ' + surveyMark.northing + '</p>' +
                    '<p>AHD Height: ' + surveyMark.ahdHeight + '</p>' +
                    '<p>Ellipsoid Height: ' + surveyMark.ellipsoidHeight + '</p>' +
                    '<p>GDA94 Technique: ' + surveyMark.gda94Technique + '</p>' +
                    '<p>AHD Technique: ' + surveyMark.ahdTechnique + '</p>'
            }
        });

    });

}

function geoLocate() {

    map = new GMaps({
        div: '#map',
        lat: -37.04,
        lng: -144.8,
        dragend: function (e) {
            mapMoved();
        },
        zoom_changed: function (e) {
            mapMoved();
        }
    });

    GMaps.geolocate({
        success: function (position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
        },
        error: function (error) {
            alert('Geolocation failed: ' + error.message);
        },
        not_supported: function () {
            alert("Your browser does not support geolocation");
        }
    });

}

function retrieveMarkInformation() {
    return [
        {
            "nineFigureNumber": 308302420,
            "name": "MELBOURNE NORTH PM  242",
            "status": "OK",
            "scn": "No",
            "easting": 322467.3,
            "northing": 5813038,
            "zone": 55,
            "latitude": "-37.484610",
            "longitude": 144.585933,
            "ahdHeight": 32,
            "ellipsoidHeight": 37,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 116110503,
            "name": "PCM116110503",
            "status": "OK",
            "scn": "No",
            "easting": 322914.9,
            "northing": 5813003.9,
            "zone": 55,
            "latitude": -37.484752,
            "longitude": 144.591759,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 112730467,
            "name": "PCM112730467",
            "status": "OK",
            "scn": "No",
            "easting": 322996.63,
            "northing": 5812722.51,
            "zone": 55,
            "latitude": -37.4856705,
            "longitude": 144.5920686,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308302370,
            "name": "MELBOURNE NORTH PM  237",
            "status": "OK",
            "scn": "No",
            "easting": 322497.8,
            "northing": 5813319.6,
            "zone": 55,
            "latitude": -37.483699,
            "longitude": 144.590082,
            "ahdHeight": 31,
            "ellipsoidHeight": 36,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 116110827,
            "name": "PCM116110827",
            "status": "OK",
            "scn": "No",
            "easting": 322714,
            "northing": 5813293.7,
            "zone": 55,
            "latitude": -37.483799,
            "longitude": 144.590964,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 117400289,
            "name": "PCM117400289",
            "status": "OK",
            "scn": "No",
            "easting": 323183.21,
            "northing": 5812812.49,
            "zone": 55,
            "latitude": -37.4853918,
            "longitude": 144.5928392,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 450004160,
            "name": "MMB 416",
            "status": "OK",
            "scn": "Yes",
            "easting": 322561.8,
            "northing": 5813038.6,
            "zone": 55,
            "latitude": -37.484615,
            "longitude": 144.590319,
            "ahdHeight": 33.435,
            "ellipsoidHeight": 38.286,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 111050086,
            "name": "PCM111050086",
            "status": "OK",
            "scn": "No",
            "easting": 322566.1,
            "northing": 5812895.6,
            "zone": 55,
            "latitude": -37.485079,
            "longitude": 144.590324,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308301850,
            "name": "MELBOURNE NORTH PM  185",
            "status": "OK",
            "scn": "Yes",
            "easting": 322482.404,
            "northing": "5813173.720",
            "zone": 55,
            "latitude": -37.48417143,
            "longitude": 144.59000646,
            "ahdHeight": "33.840",
            "ellipsoidHeight": 38.69,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 308301260,
            "name": "MELBOURNE NORTH PM  126",
            "status": "OK",
            "scn": "Yes",
            "easting": 322532.692,
            "northing": 5812490.943,
            "zone": 55,
            "latitude": -37.49038901,
            "longitude": 144.59015177,
            "ahdHeight": 15.4,
            "ellipsoidHeight": 20.204,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308302400,
            "name": "MELBOURNE NORTH PM  240",
            "status": "OK",
            "scn": "No",
            "easting": 322700.6,
            "northing": 5813033.2,
            "zone": 55,
            "latitude": -37.484642,
            "longitude": 144.590886,
            "ahdHeight": 29,
            "ellipsoidHeight": 34,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308300910,
            "name": "MELBOURNE NORTH PM   91",
            "status": "OK",
            "scn": "Yes",
            "easting": 322468.516,
            "northing": "5813173.510",
            "zone": 55,
            "latitude": -37.48417114,
            "longitude": 144.58594968,
            "ahdHeight": 33.9,
            "ellipsoidHeight": 38.708,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308302470,
            "name": "MELBOURNE NORTH PM  247",
            "status": "OK",
            "scn": "No",
            "easting": 322405.8,
            "northing": 5812690.3,
            "zone": 55,
            "latitude": -37.485734,
            "longitude": 144.585651,
            "ahdHeight": 21,
            "ellipsoidHeight": 26,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308300330,
            "name": "MELBOURNE NORTH PM   33",
            "status": "OK",
            "scn": "No",
            "easting": 322428.39,
            "northing": "5812603.10",
            "zone": 55,
            "latitude": "-37.4900180",
            "longitude": 144.5857353,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 113270204,
            "name": "PCM113270204",
            "status": "OK",
            "scn": "No",
            "easting": 323142.7,
            "northing": 5812938.4,
            "zone": 55,
            "latitude": -37.484981,
            "longitude": 144.592685,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 450002460,
            "name": "MMB 246",
            "status": "OK",
            "scn": "Yes",
            "easting": 322886,
            "northing": 5812613.7,
            "zone": 55,
            "latitude": -37.490016,
            "longitude": 144.591607,
            "ahdHeight": "29.130",
            "ellipsoidHeight": 33.973,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 110960022,
            "name": "PCM110960022",
            "status": "OK",
            "scn": "No",
            "easting": 322442.4,
            "northing": 5812685.1,
            "zone": 55,
            "latitude": -37.485753,
            "longitude": "144.585800",
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 112030328,
            "name": "PCM112030328",
            "status": "OK",
            "scn": "No",
            "easting": 323142.6,
            "northing": 5812938.4,
            "zone": 55,
            "latitude": -37.484981,
            "longitude": 144.592684,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308300870,
            "name": "MELBOURNE NORTH PM   87",
            "status": "OK",
            "scn": "Yes",
            "easting": 323070,
            "northing": 5812590,
            "zone": 55,
            "latitude": -37.49011,
            "longitude": 144.59236,
            "ahdHeight": 27.908,
            "ellipsoidHeight": 32.752,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 111050104,
            "name": "PCM111050104",
            "status": "OK",
            "scn": "No",
            "easting": 322682.6,
            "northing": 5812757.4,
            "zone": 55,
            "latitude": -37.485535,
            "longitude": 144.590788,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 111050101,
            "name": "PCM111050101",
            "status": "OK",
            "scn": "No",
            "easting": 322873.5,
            "northing": 5812632.6,
            "zone": 55,
            "latitude": -37.485953,
            "longitude": 144.591557,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308302410,
            "name": "MELBOURNE NORTH PM  241",
            "status": "OK",
            "scn": "No",
            "easting": 323114.3,
            "northing": 5812977.7,
            "zone": 55,
            "latitude": -37.484851,
            "longitude": 144.592572,
            "ahdHeight": 17,
            "ellipsoidHeight": 22,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308302440,
            "name": "MELBOURNE NORTH PM  244",
            "status": "OK",
            "scn": "No",
            "easting": 322442.5,
            "northing": 5812923.8,
            "zone": 55,
            "latitude": -37.484979,
            "longitude": 144.585821,
            "ahdHeight": 29,
            "ellipsoidHeight": 34,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 112730466,
            "name": "PCM112730466",
            "status": "OK",
            "scn": "No",
            "easting": 322913.47,
            "northing": 5812732.28,
            "zone": 55,
            "latitude": "-37.4856330",
            "longitude": 144.5917295,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 116110502,
            "name": "PCM116110502",
            "status": "OK",
            "scn": "No",
            "easting": 322714.6,
            "northing": 5813028.2,
            "zone": 55,
            "latitude": "-37.484660",
            "longitude": 144.590943,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 116110828,
            "name": "PCM116110828",
            "status": "OK",
            "scn": "No",
            "easting": 322725.4,
            "northing": 5813394.5,
            "zone": 55,
            "latitude": -37.483472,
            "longitude": 144.591019,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 450004150,
            "name": "MMB 415",
            "status": "OK",
            "scn": "Yes",
            "easting": 322468.4,
            "northing": 5813050.2,
            "zone": 55,
            "latitude": -37.484571,
            "longitude": 144.585938,
            "ahdHeight": "32.380",
            "ellipsoidHeight": "37.230",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 308302590,
            "name": "MELBOURNE NORTH PM  259",
            "status": "OK",
            "scn": "No",
            "easting": 322979.4,
            "northing": 5812541.5,
            "zone": 55,
            "latitude": -37.490256,
            "longitude": 144.591982,
            "ahdHeight": 28,
            "ellipsoidHeight": 33,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 118640040,
            "name": "PCM118640040",
            "status": "OK",
            "scn": "No",
            "easting": 322714.865,
            "northing": 5813292.645,
            "zone": 55,
            "latitude": -37.48380205,
            "longitude": "144.59096710",
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 116080262,
            "name": "PCM116080262",
            "status": "OK",
            "scn": "No",
            "easting": 323183,
            "northing": 5813019,
            "zone": 55,
            "latitude": -37.48472,
            "longitude": 144.59286,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 111050085,
            "name": "PCM111050085",
            "status": "OK",
            "scn": "No",
            "easting": 322466.5,
            "northing": 5812907.5,
            "zone": 55,
            "latitude": -37.485034,
            "longitude": 144.585918,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 114240095,
            "name": "PCM114240095",
            "status": "OK",
            "scn": "No",
            "easting": 323155.4,
            "northing": 5813037,
            "zone": 55,
            "latitude": -37.484662,
            "longitude": 144.592745,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 113270206,
            "name": "PCM113270206",
            "status": "OK",
            "scn": "No",
            "easting": 322970.4,
            "northing": 5813234.5,
            "zone": 55,
            "latitude": -37.484008,
            "longitude": 144.592006,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308301270,
            "name": "MELBOURNE NORTH PM  127",
            "status": "OK",
            "scn": "Yes",
            "easting": 322733.224,
            "northing": 5812493.299,
            "zone": 55,
            "latitude": "-37.49039540",
            "longitude": "144.59097170",
            "ahdHeight": 20.2,
            "ellipsoidHeight": 25.064,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 450004200,
            "name": "MMB 420",
            "status": "OK",
            "scn": "Yes",
            "easting": 322671.1,
            "northing": 5812772.3,
            "zone": 55,
            "latitude": -37.485486,
            "longitude": 144.590742,
            "ahdHeight": 30.505,
            "ellipsoidHeight": "35.350",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 113270205,
            "name": "PCM113270205",
            "status": "OK",
            "scn": "No",
            "easting": 323128.3,
            "northing": 5812818.1,
            "zone": 55,
            "latitude": "-37.485370",
            "longitude": 144.592615,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308300940,
            "name": "MELBOURNE NORTH PM   94",
            "status": "OK",
            "scn": "Yes",
            "easting": 323131.601,
            "northing": 5813100.535,
            "zone": 55,
            "latitude": -37.48445411,
            "longitude": 144.59265355,
            "ahdHeight": 17.2,
            "ellipsoidHeight": 22.021,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 111930033,
            "name": "PCM111930033",
            "status": "OK",
            "scn": "No",
            "easting": 322375.2,
            "northing": 5812582.8,
            "zone": 55,
            "latitude": "-37.490080",
            "longitude": 144.585516,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 111050105,
            "name": "PCM111050105",
            "status": "OK",
            "scn": "No",
            "easting": 322675.2,
            "northing": 5812692.7,
            "zone": 55,
            "latitude": -37.485745,
            "longitude": 144.590752,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 450004170,
            "name": "MMB 417",
            "status": "OK",
            "scn": "Yes",
            "easting": 322700.7,
            "northing": 5813021.5,
            "zone": 55,
            "latitude": "-37.484680",
            "longitude": 144.590885,
            "ahdHeight": 28.445,
            "ellipsoidHeight": 33.298,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 450002470,
            "name": "MMB 247",
            "status": "OK",
            "scn": "Yes",
            "easting": 323096.5,
            "northing": 5812589.8,
            "zone": 55,
            "latitude": -37.490108,
            "longitude": 144.592465,
            "ahdHeight": 27.525,
            "ellipsoidHeight": 32.371,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 111050102,
            "name": "PCM111050102",
            "status": "OK",
            "scn": "No",
            "easting": 322878.2,
            "northing": 5812673,
            "zone": 55,
            "latitude": -37.485823,
            "longitude": "144.591580",
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308302450,
            "name": "MELBOURNE NORTH PM  245",
            "status": "OK",
            "scn": "No",
            "easting": 323084.9,
            "northing": 5812719.1,
            "zone": 55,
            "latitude": -37.485688,
            "longitude": 144.592429,
            "ahdHeight": 26,
            "ellipsoidHeight": 31,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 450004190,
            "name": "MMB 419",
            "status": "OK",
            "scn": "Yes",
            "easting": 323123.6,
            "northing": 5812824.6,
            "zone": 55,
            "latitude": -37.485348,
            "longitude": 144.592597,
            "ahdHeight": "20.320",
            "ellipsoidHeight": 25.174,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "SPIRIT LEVELLING"
   },
        {
            "nineFigureNumber": 118640041,
            "name": "PCM118640041",
            "status": "OK",
            "scn": "No",
            "easting": 322512.385,
            "northing": 5813316.705,
            "zone": 55,
            "latitude": -37.48370987,
            "longitude": 144.59014162,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 114111085,
            "name": "PCM114111085",
            "status": "OK",
            "scn": "No",
            "easting": 322971.73,
            "northing": 5812529.72,
            "zone": 55,
            "latitude": "-37.4902940",
            "longitude": 144.5919498,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 111050088,
            "name": "PCM111050088",
            "status": "OK",
            "scn": "No",
            "easting": 322460.9,
            "northing": 5812805.6,
            "zone": 55,
            "latitude": -37.485364,
            "longitude": 144.585886,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 113270264,
            "name": "PCM113270264",
            "status": "OK",
            "scn": "No",
            "easting": 323160.2,
            "northing": 5813021.9,
            "zone": 55,
            "latitude": -37.484711,
            "longitude": 144.592764,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 111050103,
            "name": "PCM111050103",
            "status": "OK",
            "scn": "No",
            "easting": 322885.3,
            "northing": 5812734.4,
            "zone": 55,
            "latitude": -37.485624,
            "longitude": 144.591615,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 116080261,
            "name": "PCM116080261",
            "status": "OK",
            "scn": "No",
            "easting": 323143,
            "northing": 5813024,
            "zone": 55,
            "latitude": "-37.48470",
            "longitude": 144.59269,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 117400287,
            "name": "PCM117400287",
            "status": "OK",
            "scn": "No",
            "easting": 323128.61,
            "northing": "5812819.10",
            "zone": 55,
            "latitude": -37.4853665,
            "longitude": 144.5926166,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 450100380,
            "name": "FREEMASON STN",
            "status": "OK",
            "scn": "Yes",
            "easting": 322513.684,
            "northing": 5813227.347,
            "zone": 55,
            "latitude": -37.48399972,
            "longitude": 144.59013904,
            "ahdHeight": "",
            "ellipsoidHeight": 38.856,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308301280,
            "name": "MELBOURNE NORTH PM  128",
            "status": "OK",
            "scn": "Yes",
            "easting": "322882.820",
            "northing": 5812597.693,
            "zone": 55,
            "latitude": -37.49006733,
            "longitude": "144.59159240",
            "ahdHeight": 29.1,
            "ellipsoidHeight": 33.918,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 113270207,
            "name": "PCM113270207",
            "status": "OK",
            "scn": "No",
            "easting": 323008.8,
            "northing": 5813230,
            "zone": 55,
            "latitude": -37.484026,
            "longitude": 144.592163,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308302390,
            "name": "MELBOURNE NORTH PM  239",
            "status": "OK",
            "scn": "No",
            "easting": 322474.1,
            "northing": 5813187.5,
            "zone": 55,
            "latitude": -37.484126,
            "longitude": 144.585974,
            "ahdHeight": 34,
            "ellipsoidHeight": 39,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 111050106,
            "name": "PCM111050106",
            "status": "OK",
            "scn": "No",
            "easting": 322671,
            "northing": 5812658.8,
            "zone": 55,
            "latitude": -37.485854,
            "longitude": 144.590732,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 118640039,
            "name": "PCM118640039",
            "status": "OK",
            "scn": "No",
            "easting": 322726.425,
            "northing": 5813395.46,
            "zone": 55,
            "latitude": -37.48346946,
            "longitude": 144.5910234,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 115860143,
            "name": "PCM115860143",
            "status": "OK",
            "scn": "No",
            "easting": 322959.31,
            "northing": 5812661.16,
            "zone": 55,
            "latitude": -37.4858669,
            "longitude": 144.5919106,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 112730468,
            "name": "PCM112730468",
            "status": "OK",
            "scn": "No",
            "easting": 323087.07,
            "northing": 5812711.88,
            "zone": 55,
            "latitude": -37.4857113,
            "longitude": 144.5924373,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 409803050,
            "name": "MELBOURNE NORTH",
            "status": "OK",
            "scn": "No",
            "easting": 322513.6,
            "northing": 5813227.4,
            "zone": 55,
            "latitude": "-37.484000",
            "longitude": 144.590139,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308302460,
            "name": "MELBOURNE NORTH PM  246",
            "status": "OK",
            "scn": "No",
            "easting": 322655.4,
            "northing": 5812628.6,
            "zone": 55,
            "latitude": -37.485951,
            "longitude": 144.590666,
            "ahdHeight": 26,
            "ellipsoidHeight": 31,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308301200,
            "name": "MELBOURNE NORTH PM  120",
            "status": "OK",
            "scn": "Yes",
            "easting": 322923.664,
            "northing": 5812990.739,
            "zone": 55,
            "latitude": -37.48479564,
            "longitude": 144.59179395,
            "ahdHeight": 18.8,
            "ellipsoidHeight": 23.651,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308302430,
            "name": "MELBOURNE NORTH PM  243",
            "status": "OK",
            "scn": "No",
            "easting": 322913.3,
            "northing": 5812852.9,
            "zone": 55,
            "latitude": -37.485242,
            "longitude": 144.591739,
            "ahdHeight": 21,
            "ellipsoidHeight": 26,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 110960023,
            "name": "PCM110960023",
            "status": "OK",
            "scn": "No",
            "easting": 322655.1,
            "northing": 5812763.1,
            "zone": 55,
            "latitude": -37.485515,
            "longitude": 144.590676,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 111050087,
            "name": "PCM111050087",
            "status": "OK",
            "scn": "No",
            "easting": 322669.4,
            "northing": 5812883.3,
            "zone": 55,
            "latitude": -37.485126,
            "longitude": 144.590745,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308300310,
            "name": "MELBOURNE NORTH PM   31",
            "status": "OK",
            "scn": "No",
            "easting": 322400,
            "northing": 5812580,
            "zone": 55,
            "latitude": -37.49009,
            "longitude": 144.58562,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 116080260,
            "name": "PCM116080260",
            "status": "OK",
            "scn": "No",
            "easting": 323132,
            "northing": 5813025,
            "zone": 55,
            "latitude": "-37.48470",
            "longitude": 144.59265,
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308301190,
            "name": "MELBOURNE NORTH PM  119",
            "status": "OK",
            "scn": "Yes",
            "easting": 322679.199,
            "northing": 5812891.091,
            "zone": 55,
            "latitude": -37.48510169,
            "longitude": 144.59078592,
            "ahdHeight": 29.9,
            "ellipsoidHeight": 34.796,
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 117400288,
            "name": "PCM117400288",
            "status": "OK",
            "scn": "No",
            "easting": 323123.51,
            "northing": 5812777.04,
            "zone": 55,
            "latitude": -37.4855026,
            "longitude": "144.5925920",
            "ahdHeight": "",
            "ellipsoidHeight": "",
            "gda94Technique": "CADASTRAL",
            "ahdTechnique": ""
   },
        {
            "nineFigureNumber": 308302380,
            "name": "MELBOURNE NORTH PM  238",
            "status": "OK",
            "scn": "No",
            "easting": 322738.2,
            "northing": 5813261.8,
            "zone": 55,
            "latitude": -37.483904,
            "longitude": "144.591060",
            "ahdHeight": 20,
            "ellipsoidHeight": 25,
            "gda94Technique": "TRANSFORMED",
            "ahdTechnique": "GPS"
   },
        {
            "nineFigureNumber": 308300920,
            "name": "MELBOURNE NORTH PM   92",
            "status": "OK",
            "scn": "Yes",
            "easting": 322707.853,
            "northing": 5813142.656,
            "zone": 55,
            "latitude": -37.48428794,
            "longitude": 144.59092522,
            "ahdHeight": 26.2,
            "ellipsoidHeight": "31.010",
            "gda94Technique": "ADJUSTMENT",
            "ahdTechnique": "GPS"
   }
];
}
