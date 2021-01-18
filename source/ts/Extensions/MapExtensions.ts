import { Map } from "../Map";

export class MapExtensions
{
    public static RemoveAllLayers(map: Map)
    {
        let layerNames = map.AddedLayers;
        for (const layerName of layerNames) {
            map.RemoveLayer(layerName);
        }
    }
}