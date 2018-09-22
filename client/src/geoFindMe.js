function geoFindMe() {
  if (!navigator.geolocation){
    console.log("Not Supported");
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	console.log(latitude, longitude);
    return [latitude, longitude];
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}
export default geoFindMe;