import { Map } from "../Classes/Map";
import { Marker } from "../Classes/Marker";
import { MapboxMapExtensions } from "./MapboxMapExtensions";

export class MapExtensions
{
    public static AddMarker(map: Map, marker: Marker)
    {
        marker.MapboxMarker.addTo(map.MapboxMap);
    }

    public static DisableAllInteractions(map: Map)
    {
        MapboxMapExtensions.DisableAllInteractions(map.MapboxMap);
    }

    public static EnableAllInteractions(map: Map)
    {
        MapboxMapExtensions.EnableAllInteractions(map.MapboxMap);
    }

    public static RemoveAllLayers(map: Map)
    {
        let layerNames = map.AddedLayers;
        for (const layerName of layerNames) {
            map.RemoveLayer(layerName);
        }
    }

    public static RemoveAllMarkers(map: Map, markers: Marker[])
    {
        // Map is *not* actually used, but required here to keep with the extensions-style functions.
        
        for (const marker of markers) {
            marker.MapboxMarker.remove();
        }
    }
}