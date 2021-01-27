import { Map as MapboxMap } from "mapbox-gl";

export class MapboxMapExtensions
{
    public static DisableAllInteractions(mapboxMap: MapboxMap)
    {
        mapboxMap.boxZoom.disable();
        mapboxMap.scrollZoom.disable();
        mapboxMap.dragPan.disable();
        mapboxMap.dragRotate.disable();
        mapboxMap.keyboard.disable();
        mapboxMap.doubleClickZoom.disable();
        mapboxMap.touchZoomRotate.disable();
        mapboxMap.touchPitch.disable();
    }

    public static EnableAllInteractions(mapboxMap: MapboxMap)
    {
        mapboxMap.boxZoom.enable();
        mapboxMap.scrollZoom.enable();
        mapboxMap.dragPan.enable();
        mapboxMap.dragRotate.enable();
        mapboxMap.keyboard.enable();
        mapboxMap.doubleClickZoom.enable();
        mapboxMap.touchZoomRotate.enable();
        mapboxMap.touchPitch.enable();
    }
}