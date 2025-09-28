"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

// Real coordinates for Chandigarh locations
const trafficData = [
  { location: "Madhya Marg", status: "Heavy", dotColor: "bg-red-500", coords: { lat: 30.7333, lng: 76.7794 } },
  { location: "Dakshin Marg", status: "Moderate", dotColor: "bg-yellow-500", coords: { lat: 30.7209, lng: 76.7665 } },
  { location: "Shanti Path", status: "Smooth", dotColor: "bg-green-500", coords: { lat: 30.7387, lng: 76.7900 } },
  { location: "Jan Marg", status: "Moderate", dotColor: "bg-yellow-500", coords: { lat: 30.7286, lng: 76.7731 } },
  { location: "Vikas Marg", status: "Heavy", dotColor: "bg-red-500", coords: { lat: 30.7445, lng: 76.7850 } },
  { location: "Sector 17 Market Road", status: "Smooth", dotColor: "bg-green-500", coords: { lat: 30.7419, lng: 76.7686 } },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Heavy":
      return "bg-red-500 hover:bg-red-600 text-white";
    case "Moderate":
      return "bg-yellow-500 hover:bg-yellow-600 text-white";
    case "Smooth":
      return "bg-green-500 hover:bg-green-600 text-white";
    default:
      return "bg-gray-500 hover:bg-gray-600 text-white";
  }
};

const getMarkerColor = (status: string) => {
  switch (status) {
    case "Heavy":
      return "#ef4444";
    case "Moderate":
      return "#eab308";
    case "Smooth":
      return "#22c55e";
    default:
      return "#6b7280";
  }
};

interface Chart01Props {
  selectedLocation?: string;
}

export function Chart01({ selectedLocation }: Chart01Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const displayData = selectedLocation 
    ? trafficData.filter(item => item.location === selectedLocation)
    : trafficData;

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBz4MkYPZoUi-RCNklsmYAILnAArAD9XTM",
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        
        // Center on Chandigarh, India
        const chandigarhCenter = { lat: 30.7333, lng: 76.7794 };
        
        const map = new google.maps.Map(mapRef.current, {
          center: chandigarhCenter,
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        mapInstanceRef.current = map;
        setIsMapLoaded(true);

        // Enable traffic layer to show real traffic data
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setLoadError("Failed to load map");
      }
    };

    initMap();
  }, []);

  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Create markers for current display data
    displayData.forEach((item, index) => {
      const marker = new google.maps.Marker({
        position: item.coords,
        map: mapInstanceRef.current,
        title: `${item.location} - ${item.status} Traffic`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: selectedLocation === item.location ? 12 : 8,
          fillColor: getMarkerColor(item.status),
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
        animation: selectedLocation === item.location ? google.maps.Animation.BOUNCE : undefined,
      });

      // Create info window for each marker
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; text-align: center;">
            <div style="font-weight: bold; margin-bottom: 4px;">${item.location}</div>
            <div style="padding: 4px 8px; border-radius: 4px; color: white; background-color: ${getMarkerColor(item.status)}; font-size: 12px;">
              ${item.status} Traffic
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Adjust map view to fit all markers
    if (displayData.length > 0 && mapInstanceRef.current) {
      const bounds = new google.maps.LatLngBounds();
      displayData.forEach(item => {
        bounds.extend(item.coords);
      });
      
      if (displayData.length === 1) {
        // If only one location, center on it
        mapInstanceRef.current.setCenter(displayData[0].coords);
        mapInstanceRef.current.setZoom(15);
      } else {
        // If multiple locations, fit bounds
        mapInstanceRef.current.fitBounds(bounds);
      }
    }
  }, [displayData, selectedLocation, isMapLoaded]);

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Traffic Congestion Map
          {selectedLocation && (
            <span className="text-sm font-normal text-gray-500 block">
              Location: {selectedLocation}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 rounded-lg overflow-hidden">
          {loadError ? (
            <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <p className="text-red-500 mb-2">Failed to load map</p>
                <p className="text-sm text-gray-500">Please check your internet connection</p>
              </div>
            </div>
          ) : (
            <>
              {/* Google Map Container */}
              <div 
                ref={mapRef} 
                className="w-full h-full rounded-lg"
                style={{ minHeight: '320px' }}
              />
              
              {/* Loading overlay */}
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Loading map...</p>
                  </div>
                </div>
              )}
              
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
