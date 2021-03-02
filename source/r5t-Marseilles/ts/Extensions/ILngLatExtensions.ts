import { ILngLat } from "../Interfaces/ILngLat";

export class ILngLatExtensions
{
    public static GetZeroZero()
    {
        let output: ILngLat =
        {
            lat: 0,
            lng: 0,
        };
        return output;  
    }
}