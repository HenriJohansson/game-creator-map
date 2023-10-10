import { type UUIDMark } from '@/interfaces/Mark';
import { type Point } from 'geojson';
class OrderedMarker {
  private mark: UUIDMark;

  constructor( mark: UUIDMark) {
    this.mark = mark;
  }
  getID(): string {
    return this.mark.id;
  }

  getMarkerName(): string {
    return this.mark.marker_name;
  }

  getDescription(): string {
    return this.mark.description;
  }

  getLocation(): Point {
    return this.mark.location;
  }

  getUser(): string {
    return this.mark.user;
  }

  getCreationDate(): Date {
    return this.mark.creation_date;
  }
  // Setter methods
  setMarkerName(marker_name: string): void {
    this.mark.marker_name = marker_name;
  }

  setDescription(description: string): void {
    this.mark.description = description;
  }

  setLocation(location: Point): void {
    this.mark.location = location;
  }

  setUser(user: string): void {
    this.mark.user = user;
  }

  setCreationDate(creation_date: Date): void {
    this.mark.creation_date = creation_date;
  }

}

export default OrderedMarker;
