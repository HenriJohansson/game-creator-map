import { type UUIDMark } from "@/interfaces/Mark";

class OrderedMarkerFactory {
  createDefaultOrderedMarker = (): UUIDMark => {
    return new Object({
      id: crypto.randomUUID(),
      marker_name: "",
      description: "",
      location:{
        coordinates: [51, 51],
        type:"Point"
      } ,
      user: "",
      creation_date: new Date(),
    }) as UUIDMark;
  };
  createOrderedMarker = (
    id: string
    ,name: string
    , coordinates: [number, number]
    , user: string
    , description?: string ): UUIDMark => {
    const orderedMark: UUIDMark = {
      id: id,
      marker_name: name,
      description: description ? description : "",
      location:{
        coordinates: coordinates,
        type: "Point"
      } ,
      user: user,
      creation_date: new Date(),
    };
    return orderedMark;
  }
}
export const orderedMarkerFactorySingleton = new OrderedMarkerFactory();
