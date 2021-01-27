import mapboxgl from "mapbox-gl";

import { Map } from "./Map";
import { MapStyles } from "../MapStyles";

export class MarkedMap extends Map
{
    public static BuildMapboxMarker(): mapboxgl.Marker
    {
        let markerOptions: mapboxgl.MarkerOptions = {
            color: "red"
        };

        let marker = new mapboxgl.Marker(markerOptions)
        .setLngLat({
            lng: 0,
            lat: 0,
        });

        return marker;
    }


    public readonly MapboxMarker: mapboxgl.Marker;
    private zMarkerIsVisible: boolean;
    public get MarkerIsVisible(): boolean
    {
        return this.zMarkerIsVisible;
    }


    constructor(mapboxAccessToken: string, mapContainerDivElementID: string, mapStyle: string = MapStyles.StreetV10)
    {
        super(mapboxAccessToken, mapContainerDivElementID, mapStyle);

        this.MapboxMarker = MarkedMap.BuildMapboxMarker();
    }

    /**
     * Idempotent.
     */
    public ShowMarker()
    {
        if(!this.MarkerIsVisible)
        {
            this.MapboxMarker.addTo(this.MapboxMap);

            this.zMarkerIsVisible = true;
        }
    }

    public HideMarker()
    {
        this.MapboxMarker.remove();

        this.zMarkerIsVisible = false;
    }
}