import mapboxgl from "mapbox-gl"
import { Marker } from "../Classes/Marker";

export class MarkerExtensions
{
    public static FromOptionsOnly(markerOptions: mapboxgl.MarkerOptions)
    {
        let mapboxMarker = new mapboxgl.Marker(markerOptions);

        let marker = new Marker(mapboxMarker);
        return marker;
    }

    public static FromOptions(markerOptions: mapboxgl.MarkerOptions, location: mapboxgl.LngLat)
    {
        let marker = MarkerExtensions.FromOptionsOnly(markerOptions);

        marker.LngLat = location;

        return marker;
    }
}