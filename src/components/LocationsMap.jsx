import { React, useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

export default function LocationsMap({ themes, themeIndex }) {
  // map container styling
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  // set map position (initial and current)
  const [currentPosition, setCurrentPosition] = useState({
    lat: 53.745,
    lng: 1.3,
  });

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
  });

  // set map
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  });

  // markers
  const finds = themes.themes[themeIndex].finds;

  const mapMarkers = finds.map((find) => {
    const image = {
      url: find.img_url,
      scaledSize: { width: 30, height: 30 },
    };

    return (
      <Marker
        clickable={true}
        draggable={true}
        position={{ lat: currentPosition.lat, lng: currentPosition.lng }}
        key={find.find_id}
        icon={image}
      ></Marker>
    );
  });

  return isLoaded ? (
    <div className="map_container">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={10}
        options={{
          styles: [
            {
              elementType: "geometry",
              stylers: [
                {
                  color: "#ebe3cd",
                },
              ],
            },
            {
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#523735",
                },
              ],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#f5f1e6",
                },
              ],
            },
            {
              featureType: "administrative",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#c9b2a6",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#dcd2be",
                },
              ],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#ae9e90",
                },
              ],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dfd2ae",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dfd2ae",
                },
              ],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#93817c",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#a5b076",
                },
              ],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#447530",
                },
              ],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [
                {
                  color: "#f5f1e6",
                },
              ],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [
                {
                  color: "#fdfcf8",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [
                {
                  color: "#f8c967",
                },
              ],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#e9bc62",
                },
              ],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry",
              stylers: [
                {
                  color: "#e98d58",
                },
              ],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry.stroke",
              stylers: [
                {
                  color: "#db8555",
                },
              ],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#806b63",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dfd2ae",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#8f7d77",
                },
              ],
            },
            {
              featureType: "transit.line",
              elementType: "labels.text.stroke",
              stylers: [
                {
                  color: "#ebe3cd",
                },
              ],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [
                {
                  color: "#dfd2ae",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "geometry.fill",
              stylers: [
                {
                  color: "#b9d3c2",
                },
              ],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [
                {
                  color: "#92998d",
                },
              ],
            },
          ],
          disableDefaultUI: true,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {mapMarkers}
      </GoogleMap>
    </div>
  ) : (
    <p>nomap</p>
  );
}
