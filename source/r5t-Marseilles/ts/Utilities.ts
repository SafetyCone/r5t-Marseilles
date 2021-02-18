import mapboxgl from "mapbox-gl";

export class Utilities
{
    static SetMapboxAccessTokenByValue(mapboxAccessToken: string)
    {
        (mapboxgl as any).accessToken = mapboxAccessToken; // Workaround required since somehow accesstoken is read-only.
    }
}