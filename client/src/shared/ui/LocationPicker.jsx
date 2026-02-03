import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "420px",
  borderRadius: "16px",
};

export default function LocationPicker({ onSelect, initialLocation }) {
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);

  const [position, setPosition] = useState(() => initialLocation || null);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (window.google) {
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, []);

  useEffect(() => {
    if (position) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setPosition({ lat: 20.5937, lng: 78.9629 });
      },
    );
  }, [position]);

  const reverseGeocode = (lat, lng) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode(
      { location: { lat, lng } },
      (results, status) => {
        if (status === "OK" && results[0]) {
          setSelectedAddress(results[0].formatted_address);
        }
      },
    );
  };

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setPosition({ lat, lng });
    setSelectedAddress(place.formatted_address);

    mapRef.current?.panTo({ lat, lng });
  };

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
        onLoad={(map) => (mapRef.current = map)}
        mapContainerStyle={containerStyle}
        zoom={position ? 14 : 2}
        center={position || { lat: 20.5937, lng: 78.9629 }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {position && (
          <Marker
            position={position}
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();

              setPosition({ lat, lng });

              reverseGeocode(lat, lng);
            }}
          />
        )}
      </GoogleMap>

      {selectedAddress && (
        <p className="text-sm text-slate-400">📍 {selectedAddress}</p>
      )}

      <button
        disabled={!position}
        onClick={() =>
          onSelect({
            address: selectedAddress || "Pinned location",
            lat: position.lat,
            lng: position.lng,
          })
        }
        className="
          w-full py-3 rounded-xl
          bg-green-500 text-black font-semibold
          hover:bg-green-400 transition
          disabled:opacity-40
        "
      >
        Confirm Location
      </button>
    </div>
  );
}
