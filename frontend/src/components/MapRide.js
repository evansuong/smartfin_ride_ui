import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  margin: '8px',
  width: '64%',
  height: '49%'
};

export function MapContainer (props) {
  console.log(props.rideDate.rideId);
  
  const [showInfo, setShowInfo] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [rides, setRides] = useState([]);
  // const [bounds, setBounds] = useState(new props.google.maps.LatLngBounds());

  //get all the rides
  useEffect(() => {
    getRides();
  }, [])

  // useEffect(() => {
  //   let bound = new props.google.maps.LatLngBounds();
  //   rides.forEach((ride) =>{
  //     let point = {lat: ride.latitude, lng: ride.longitude}
  //     // console.log(point);
  //     bound.extend(point);
  //   })
  //   setBounds(bound)
  //   console.log(bounds)
  // }, [rides])

  //get all rides
  const getRides = async () => {
    //currently gets a single ride bcause database is empty
    let pog = await fetch(`https://lit-sands-95859.herokuapp.com/ride/rides/rideId=${props.rideDate.rideId}?format=json`);
    let item = await pog.json();    
    
    console.log(item); 
    
    setRides([item]);
  }

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props)
    setActiveMarker(marker);
    setShowInfo(true);
  };

  const onClose = props => {
    if (showInfo){
      setShowInfo(false);
      setActiveMarker(null);
    }
  };

  return(
        <Map
          google={props.google}
          style={mapStyles}
          center={
            {
              lat: rides[0] ? rides[0].latitude : 32.859929, 
              lng: rides[0] ? rides[0].longitude : -117.26
            }
          }
          // bounds = {bounds}
          zoom={15}
        >
          {rides.map((ride) => {
            return(
              <Marker
              onClick = {onMarkerClick}
              name = {ride.rideId}
              position = {{lat:ride.latitude, lng: ride.longitude}}
            />
            )
          })}
          <InfoWindow
            marker = {activeMarker}
            visible = {showInfo}
            onClose = {onClose}
          >
            <div>
              <h4>{selectedPlace.name}</h4>
            </div>
          </InfoWindow>

        </Map>
      );
}
 

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBuAlM6spWnrliGyJYVrTyjOWh4ZGj4PrQ'
})(MapContainer);

export function MapTest(){
  return MapContainer;
}