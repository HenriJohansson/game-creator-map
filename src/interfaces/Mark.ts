import { Point } from 'geojson';
interface Mark {
  marker_name: string;
  description: string;
  location: Point;
  user: string;
  creation_date: Date;
}
interface UUIDMark extends Mark {
  id: string
  marker_name: string;
  description: string;
  location: Point;
  user: string;
  creation_date: Date;
}

export type {Mark, UUIDMark};
