import mapboxgl from "mapbox-gl"

export class Marker
{
    public get LngLat(): mapboxgl.LngLat
    {
        return this.MapboxMarker.getLngLat();
    }
    public set LngLat(lngLat: mapboxgl.LngLat)
    {
        this.MapboxMarker.setLngLat(lngLat);
    }


    constructor(public readonly MapboxMarker: mapboxgl.Marker)
    {
    }
}