import { v4 } from "uuid";
import { NrcActivity, NrcMetric, NrcSummary, RunningRawData } from "./nrcTypes";

export type RunningData = {
  id: string;
  name: string;
  start: number;
  end: number;
  distance: number;
  speed: number;
};

function timeStrToMs(runningTime: string): number {
  const [date, time, timeZone] = runningTime.split(" ");
  const dateStr = `${date}T${time}${timeZone}`;
  return Date.parse(dateStr);
}

function runningDataConverter(runningData: RunningRawData): RunningData {
  return {
    id: v4(),
    name: `Running on ${runningData.start.split(" ")[0]}`,
    start: timeStrToMs(runningData.start),
    end: timeStrToMs(runningData.end),
    distance: runningData.distance.qty,
    speed: runningData.speed.qty,
  };
}

function getNrcMetrics(runningData: RunningData): NrcMetric[] {
  return [
    {
      appId: "com.nike.sport.running.ios",
      source: "com.nike.running.ios.manualentry",
      type: "distance",
      unit: "KM",
      values: [
        {
          end_epoch_ms: runningData.end,
          start_epoch_ms: runningData.start,
          value: runningData.distance,
        },
      ],
    },
    {
      appId: "com.nike.sport.running.ios",
      source: "com.nike.running.ios.manualentry",
      type: "speed",
      unit: "KMH",
      values: [
        {
          end_epoch_ms: runningData.end,
          start_epoch_ms: runningData.start,
          value: runningData.speed,
        },
      ],
    },
  ];
}

function getNrcSummaries(runningData: RunningData): NrcSummary[] {
  return [
    {
      app_id: "com.nike.sport.running.ios",
      metric: "speed",
      source: "com.nike.activityCapability",
      summary: "mean",
      value: runningData.speed,
    },
    {
      app_id: "com.nike.sport.running.ios",
      metric: "distance",
      source: "com.nike.activityCapability",
      summary: "total",
      value: runningData.distance,
    },
  ];
}

function nrcActivityConverter(rawData: RunningRawData): NrcActivity {
  const runningData = runningDataConverter(rawData);
  const metrics = getNrcMetrics(runningData);
  const summaries = getNrcSummaries(runningData);
  const activeTime =
    (runningData.distance / runningData.speed) * 60 * 60 * 1000;
  return {
    id: runningData.id,
    start_epoch_ms: runningData.start,
    end_epoch_ms: runningData.end,
    active_duration_ms: activeTime,
    app_id: "com.nike.sport.running.ios",
    change_tokens: [],
    delete_indicator: false,
    metric_types: ["distance", "speed"],
    metrics: metrics,
    moments: [],
    polylines: [],
    session: false,
    sources: ["com.nike.running.ios.manualentry"],
    summaries: summaries,
    tags: {
      "com.nike.name": runningData.name,
      "com.nike.running.originalactivityid": runningData.id,
      "com.nike.running.runtype": "manual",
      location: "outdoors",
    },
    type: "run",
  };
}

export { nrcActivityConverter };
