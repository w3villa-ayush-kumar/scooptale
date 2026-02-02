import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "420px",
  borderRadius: "16px",
};

export default function LocationPicker({ onSelect }) {
  const autocompleteRef = useRef(null);

  const [position, setPosition] = useState(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const locationData = {
      address: place.formatted_address,
      lat,
      lng,
    };
    setPosition({ lat, lng });

    onSelect(locationData);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return (
    <div className="space-y-4">
      <Autocomplete
        onLoad={(auto) => (autocompleteRef.current = auto)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          placeholder="Search your location..."
          className="
            w-full px-4 py-3 rounded-xl
            bg-white/5 border border-white/10
            focus:border-green-400 outline-none
          "
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={position ? 14 : 2}
        center={position || { lat: 20.5937, lng: 78.9629 }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ saturation: -20 }],
            },
          ],
        }}
      >
        {position && <Marker position={position} />}
      </GoogleMap>
    </div>
  );
}
