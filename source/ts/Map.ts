import { JavaScriptHelper } from "r5t-Avignon/Helpers/JavaScriptHelper";

import mapboxgl, { LngLatBoundsLike } from "mapbox-gl"
import * as turf from "@turf/turf";
import { MapStyles } from "./MapStyles";

export class Map
{
    public readonly MapboxMap: mapboxgl.Map;


    constructor(mapboxAccessToken: string, mapContainerDivElementID: string, mapStyle: string = MapStyles.StreetV10)
    {
        this.MapboxMap = new mapboxgl.Map({
            accessToken: mapboxAccessToken,
            container: mapContainerDivElementID,
            style: mapStyle,
        });
    }

    public SetGeoJsonMultiPolygon(sourceName: string, layerName:string, geoJsonMultiPolygon: GeoJSON.MultiPolygon)
    {
        let featureData: GeoJSON.Feature<GeoJSON.Geometry> = {
            type: "Feature",
            properties: {}, // Must be present, but can be empty.
            geometry: geoJsonMultiPolygon,
        };

        let source = this.MapboxMap.getSource(sourceName) as mapboxgl.GeoJSONSource;
        if(JavaScriptHelper.Exists(source))
        {
            source.setData(featureData); // Set data to ensure Mapbox redraws.
        }
        else
        {
            let geoJsonSourceRaw: mapboxgl.GeoJSONSourceRaw = {
                type: "geojson",
                data: featureData,
            };

            this.MapboxMap.addSource(sourceName, geoJsonSourceRaw);
        }

        let layer = this.MapboxMap.getLayer(layerName) as mapboxgl.FillLayer;
        if(!JavaScriptHelper.Exists(layer))
        {
            layer = {
                id: layerName,
                type: "fill",
                source: sourceName,
                layout: {},
                paint: {
                    "fill-color": "#088",
                    "fill-opacity": 0.6,
                },
            };

            this.MapboxMap.addLayer(layer);
        }

        let boundingBox = turf.bbox(geoJsonMultiPolygon);

        this.MapboxMap.fitBounds([boundingBox[0], boundingBox[1], boundingBox[2], boundingBox[3]], {
            padding: 20,
        });
    }
}