import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';

interface MyMapProps {
  onPolygonCreate: (polygon: GeoJSON.Feature<GeoJSON.Polygon>) => void;
  center?: L.LatLng | null; 
}

const MyMap: React.FC<MyMapProps> = ({ onPolygonCreate, center }) => {
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (map) return;

    const newMap = L.map('my-map').setView([32.0853, 34.7818], 13); // Default to Tel Aviv
    setMap(newMap);

    const myAPIKey=process.env.REACT_APP_MAP_API_KEY; 

    const isRetina = L.Browser.retina;

    const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
    const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
      maxZoom: 20,
      id: 'osm-bright',
    }).addTo(newMap);


    const drawnItems = new L.FeatureGroup();
    newMap.addLayer(drawnItems);

    const drawControl = new (L.Control as any).Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
      }
    });
    newMap.addControl(drawControl);

    newMap.on(L.Draw.Event.CREATED, function (event: any) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      const polygon = layer.toGeoJSON() as GeoJSON.Feature<GeoJSON.Polygon>;
      onPolygonCreate(polygon);
    });

  }, [onPolygonCreate, map]);

  useEffect(() => {
    if (map && center) {
      map.setView(center, 13); 
    }
  }, [map, center]);

  return <div id="my-map" style={{ height: '400px', width: '100%' }} ref={mapRef} />;
};

export default MyMap;