export type RunningRawData = {
  start: string;
  end: string;
  distance: {
    qty: number;
    units: "km";
  };
  speed: {
    qty: number;
    units: "km/hr";
  };
};

export type NrcMetric = {
  appId: "com.nike.sport.running.ios";
  source: "com.nike.running.ios.manualentry";
  type: "distance" | "speed";
  unit: "KM" | "KMH";
  values: [
    {
      end_epoch_ms: number;
      start_epoch_ms: number;
      value: number;
    }
  ];
};

export type NrcSummary = {
  app_id: "com.nike.sport.running.ios";
  metric: "speed" | "distance";
  source: "com.nike.activityCapability";
  summary: "mean" | "total";
  value: number;
};

export type NrcActivity = {
  id: string;
  active_duration_ms: number;
  start_epoch_ms: number;
  end_epoch_ms: number;
  app_id: "com.nike.sport.running.ios";
  change_tokens: [];
  delete_indicator: false;
  metric_types: ["distance", "speed"];
  metrics: NrcMetric[];
  moments: [];
  polylines: [];
  session: false;
  sources: ["com.nike.running.ios.manualentry"];
  summaries: NrcSummary[];
  tags: {
    "com.nike.name": string;
    "com.nike.running.originalactivityid": string;
    "com.nike.running.runtype": "manual";
    location: "outdoors";
  };
  type: "run";
};
