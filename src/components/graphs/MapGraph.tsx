import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

export function MapGraph() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return; // Ensure the ref is attached

    const edmontonCoords = [-113.4938, 53.5461];
    const map = new Map({
        target: mapElement.current,
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat(edmontonCoords),
            zoom: 10,
        }),
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <div ref={mapElement} style={{ width: '100%', height: '100%' }}></div>
  );
}
