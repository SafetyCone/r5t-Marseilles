import mapboxgl from "mapbox-gl"
import * as turf from "@turf/turf";
import { EventDispatcher, IEvent } from "strongly-typed-events";

import { ArrayHelper, JavaScriptHelper } from "r5t-Avignon/Index";

import { MapStyles } from "../MapStyles";
import { MapClickEvent } from "../Types/MapClickEvent";

export class Map
{
    public readonly MapboxMap: mapboxgl.Map;

    private zAddedLayers: string[] = [];
    /**
     * Provides a read-only copy of the names of all layers that have been added to the map.
     */
    public get AddedLayers()
    {
        let readOnlyCopy = [...this.zAddedLayers];
        return readOnlyCopy;
    }

    private zOnAnyMapClick = new EventDispatcher<Map, MapClickEvent>();
    /**
     * Event fired for all map clicks, even clicks that occur within the features of a layer.
     * This is useful for moving a map-marker, for example.
     */
    public get OnAnyMapClick(): IEvent<Map, MapClickEvent>
    {
        return this.zOnAnyMapClick.asEvent();
    }

    private zOnMapClick = new EventDispatcher<Map, MapClickEvent>();
    /**
     * Event fired for clicks not handled by layers, which should be the default.
     * Unfortunately, Mapbox decided that map click handlers should fire before layer click handlers. This is useless, since layers are contained within the map, so the layer conceptually has a higher "z-index" than the map.
     */
    public get OnMapClick(): IEvent<Map, MapClickEvent>
    {
        return this.zOnMapClick.asEvent();
    }


    constructor(mapboxAccessToken: string, mapContainerDivElementID: string, mapStyle: string = MapStyles.StreetV10)
    {
        this.MapboxMap = new mapboxgl.Map({
            accessToken: mapboxAccessToken,
            container: mapContainerDivElementID,
            style: mapStyle,
        });

        this.MapboxMap.on("click", (clickEvent) =>
        {
            // Dispatch the event for any click.
            this.zOnAnyMapClick.dispatch(this, clickEvent);

            // Now check that a layer was not click before dispatching the default click.
            // Layers will handle their own click events.
            let renderedFeatures = clickEvent.target.queryRenderedFeatures(clickEvent.point, {
                layers: this.AddedLayers,
            });
            if(renderedFeatures.length > 0)
            {
                return;
            }

            this.zOnMapClick.dispatch(this, clickEvent);
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

            this.zAddedLayers.push(layerName);
        }

        let boundingBox = turf.bbox(geoJsonMultiPolygon);

        this.MapboxMap.fitBounds([boundingBox[0], boundingBox[1], boundingBox[2], boundingBox[3]], {
            padding: 20,
        });
    }

    public RemoveLayer(layerName: string)
    {
        this.MapboxMap.removeLayer(layerName);

        ArrayHelper.RemoveValue(this.zAddedLayers, layerName);
    }
}