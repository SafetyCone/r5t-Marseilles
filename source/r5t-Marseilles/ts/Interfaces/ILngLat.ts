/**
 * An interface for the data-shape of the Mapbox LngLat.
 * Useful, for example, in transport types since assuming that a location is a Mapbox LngLat, which has methods that are of course not present on a parsed JSON object, will result in runtime errors.
 */
export interface ILngLat
{
    lng: number;
    lat: number;
}