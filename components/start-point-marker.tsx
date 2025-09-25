"use client"

import { useEffect, useRef } from "react"
import type { google } from "google-maps"

interface StartPointMarkerProps {
  position: google.maps.LatLngLiteral
  isManuallyEntered?: boolean
  isMoving?: boolean
  vehicleType?: 'ambulance' | 'fire'
}

export function StartPointMarker({ 
  position, 
  isManuallyEntered = false,
  isMoving = false,
  vehicleType = 'ambulance'
}: StartPointMarkerProps) {
  const markerRef = useRef<google.maps.Marker | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const pulseCircleRef = useRef<google.maps.Circle | null>(null)

  // Initialize marker only once when component mounts or key props change
  useEffect(() => {
    if (!window.googleMap) {
      console.log("No map available for start marker");
      return;
    }

    console.log("Initializing start marker, isMoving:", isMoving, "vehicle type:", vehicleType);

    // Clean up any previous markers
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
      infoWindowRef.current = null;
    }
    if (pulseCircleRef.current) {
      pulseCircleRef.current.setMap(null);
      pulseCircleRef.current = null;
    }

    // Explicitly set vehicle icon URL based on type
    let icon;
    if (isMoving) {
      // Use the specific ambulance image URL provided by user
      const iconUrl = vehicleType === 'ambulance' 
        ? "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-3d-render-illustration-ambulance-siren-front-view-png-image_9199093.png"
        : "https://static.vecteezy.com/system/resources/previews/019/907/530/non_2x/fire-truck-graphic-clipart-design-free-png.png";
        
      icon = {
        url: iconUrl,
        scaledSize: new window.google.maps.Size(60, 60),
        anchor: new window.google.maps.Point(30, 30),
      };
      
      console.log("Using vehicle icon:", iconUrl);
    } else {
      // Use basic circle for non-moving state
      icon = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: isManuallyEntered ? "#FF5722" : "#4285F4",
        fillOpacity: 1,
        strokeWeight: 3,
        strokeColor: "#FFFFFF",
      };
    }

    // Create the marker with initial position
    const marker = new window.google.maps.Marker({
      position: position,
      map: window.googleMap,
      icon: icon,
      title: isMoving 
        ? `Moving ${vehicleType === 'ambulance' ? 'Ambulance' : 'Fire Truck'}`
        : "Starting Point",
      zIndex: 1000,
      animation: isMoving ? null : window.google.maps.Animation.DROP,
    });
    
    console.log("Created marker with icon", icon);

    // Create info window content
    const infoContent = isMoving 
      ? `
        <div style="padding: 10px; min-width: 200px;">
          <div style="font-weight: bold; color: ${vehicleType === 'ambulance' ? '#2962FF' : '#FF3D00'}; margin-bottom: 8px; font-size: 16px;">
            Moving ${vehicleType === 'ambulance' ? 'Ambulance' : 'Fire Truck'}
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Current Position:</strong> ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}
          </div>
        </div>
      `
      : `
        <div style="padding: 10px; min-width: 200px;">
          <div style="font-weight: bold; color: ${isManuallyEntered ? "#FF5722" : "#4285F4"}; margin-bottom: 8px; font-size: 16px;">
            ${isManuallyEntered ? "Manually Entered" : "Map Selected"} Starting Point
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Coordinates:</strong> ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}
          </div>
        </div>
      `;

    // Create the info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoContent,
    });

    // Add click listener to show info window
    marker.addListener("click", () => {
      infoWindow.open(window.googleMap, marker);
    });

    // Create pulse effect for moving vehicle
    if (isMoving) {
      const pulseCircle = new window.google.maps.Circle({
        strokeColor: vehicleType === 'ambulance' ? "#2962FF" : "#FF3D00",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: vehicleType === 'ambulance' ? "#2962FF" : "#FF3D00",
        fillOpacity: 0.3,
        map: window.googleMap,
        center: position,
        radius: 80,
        zIndex: 5,
      });
      
      pulseCircleRef.current = pulseCircle;
    }

    // Save references for cleanup
    markerRef.current = marker;
    infoWindowRef.current = infoWindow;

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
      if (pulseCircleRef.current) {
        pulseCircleRef.current.setMap(null);
      }
    };
  }, [isManuallyEntered, isMoving, vehicleType]); // Remove position from dependencies

  // Separate effect to update position only
  useEffect(() => {
    if (!markerRef.current || !position) {
      return;
    }

    // Only update position, don't recreate marker
    markerRef.current.setPosition(position);
    
    // Update pulse circle position if it exists
    if (pulseCircleRef.current) {
      pulseCircleRef.current.setCenter(position);
    }

    // Update info window content with new position if it's open
    if (infoWindowRef.current && isMoving) {
      const updatedContent = `
        <div style="padding: 10px; min-width: 200px;">
          <div style="font-weight: bold; color: ${vehicleType === 'ambulance' ? '#2962FF' : '#FF3D00'}; margin-bottom: 8px; font-size: 16px;">
            Moving ${vehicleType === 'ambulance' ? 'Ambulance' : 'Fire Truck'}
          </div>
          <div style="margin-bottom: 8px;">
            <strong>Current Position:</strong> ${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}
          </div>
        </div>
      `;
      infoWindowRef.current.setContent(updatedContent);
    }
  }, [position, isMoving, vehicleType]);

  return null;
} 