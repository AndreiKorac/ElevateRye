export default function geoFindMe() {
  let coordinates = [];
  if (!navigator.geolocation){
    console.log("Not Supported");
    return;
  }

  function success(position) {
    let latitude  = position.coords.latitude;
    let longitude = position.coords.longitude;
    this.coordinates = [latitude, longitude];
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  navigator.geolocation.getCurrentPosition(success, error);
}