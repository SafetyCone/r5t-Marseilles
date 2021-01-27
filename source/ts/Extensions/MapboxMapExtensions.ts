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

    /**
     * For some reason for a Mapbox map, map.setMaxBounds() with arbitration bounds causes the map to freak out when scrolling/zooming/etc.
     * This method is a work around for the issue, in that it uses the current bounds of the map as the maximum bounds of the map.
     * Basically, get the use map.fitBounds() to fit to the bounds you want, then set the current bounds as the maximum bounds.
     */
    public static SetCurrentBoundsAsMaxBounds(mapboxMap: MapboxMap)
    {
        let currentBounds = mapboxMap.getBounds();

        mapboxMap.setMaxBounds(currentBounds);
    }
}