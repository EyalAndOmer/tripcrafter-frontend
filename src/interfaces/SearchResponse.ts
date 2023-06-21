export interface Feature {
  geometry: {
    coordinates: number[]
  },
  text: string
  place_name: string,
}
export interface SearchResponse {
  features: Feature[]
}

export interface Place {
  coordinates: number[],
  text: string,
  placeName: string;

}

export interface Points {
  elements: PointOfInterest[]
}

export interface PointOfInterest {
  id: number;
  type: string;
  lat: number;
  lon: number;
  nodes?: number[];
  tags?: {
    name: string;
    website?: string;
    description?: string;
    source?: string;
    url?: string;
  }
  members?: [{
    type: string, ref: number
  }]
}
