import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Style, Text } from 'ol/style';
import { FireResponseDataRow } from "../../types/DataSetInfo";

export function MapGraph(props: GraphContainerProps) {
  const { data } = props;
  const mapElement = useRef<HTMLDivElement>(null);

  // Function to create features from data
  const createFeatures = (data: FireResponseDataRow[]) => {
    return data.map(item => new Feature(new Point(fromLonLat([item.longitude, item.latitude]))));
  };

  useEffect(() => {
    if (!mapElement.current) return;

    const features = createFeatures(data);
    const vectorSource = new VectorSource({
      features: features,
    });

    // Create a cluster source with a distance for clustering
    const clusterSource = new Cluster({
      distance: 45, // pixels, adjust as needed
      source: vectorSource,
    });

    // Vector layer with cluster source
  const vectorLayer = new VectorLayer({
    source: clusterSource,
    style: function(feature) {
      const size = feature.get('features').length;
      let color;
      if (size > 200) {
        color = 'rgba(255, 0, 0, 0.5)'; // Red for clusters with more than 500 points
      } else {
        color = 'rgba(255, 165, 0, 0.5)'; // Orange for clusters with 500 or fewer points
      }

      return new Style({
        image: new CircleStyle({
          radius: 8 + size * 0.02, // Adjust radius based on the size
          fill: new Fill({
            color: color
          })
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff'
          })
        })
      });
    }
  });

    const edmontonCoords = [-113.4938, 53.5461];
    const map = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(edmontonCoords),
        zoom: 11,
      }),
    });

    return () => map.setTarget(undefined);
  }, [data]);

  return (
    <div ref={mapElement} style={{ width: '100%', height: '100%' }}></div>
  );
}

export type GraphContainerProps = {
  data: FireResponseDataRow[],
};
