var axios = require('axios');
var data = JSON.stringify([
  {
    "active_duration_ms": 3600000,
    "app_id": "com.nike.sport.running.ios",
    "change_tokens": [],
    "delete_indicator": false,
    "end_epoch_ms": 1661949966214,
    "id": "F5F0FB0F-32F3-47EB-B6D9-E881883C9246",
    "metric_types": [
      "distance",
      "speed"
    ],
    "metrics": [
      {
        "appId": "com.nike.sport.running.ios",
        "source": "com.nike.running.ios.manualentry",
        "type": "distance",
        "unit": "KM",
        "values": [
          {
            "end_epoch_ms": 1661949966214,
            "start_epoch_ms": 1661946366214,
            "value": 8.09
          }
        ]
      },
      {
        "appId": "com.nike.sport.running.ios",
        "source": "com.nike.running.ios.manualentry",
        "type": "speed",
        "unit": "KMH",
        "values": [
          {
            "end_epoch_ms": 1661946366214,
            "start_epoch_ms": 1661946366214,
            "value": 8.09
          }
        ]
      }
    ],
    "moments": [],
    "polylines": [],
    "session": false,
    "sources": [
      "com.nike.running.ios.manualentry"
    ],
    "start_epoch_ms": 1661946366214,
    "summaries": [
      {
        "app_id": "com.nike.sport.running.ios",
        "metric": "speed",
        "source": "com.nike.activityCapability",
        "summary": "mean",
        "value": 8.09
      },
      {
        "app_id": "com.nike.sport.running.ios",
        "metric": "distance",
        "source": "com.nike.activityCapability",
        "summary": "total",
        "value": 8.09
      }
    ],
    "tags": {
      "com.nike.running.originalactivityid": "F5F0FB0F-32F3-47EB-B6D9-E881883C9246",
      "com.nike.running.runtype": "manual",
      "location": "outdoors"
    },
    "type": "run"
  }
]);

var config = {
  method: 'post',
  url: 'https://api.nike.com/plus/v3/activities',
  headers: { 
    'Host': 'api.nike.com', 
    'Cookie': 'ak_bmsc=E5B139DD2843733C3DA5646652889D42~000000000000000000000000000000~YAAQN2ATAqFOYdaCAQAANvG48xBotvQDUFb3i08e5UeXQxIxFz8lYKsrwP1BWBz3dOWd6zB9FRNxJfJF0kdu3JX44hGcbL639NmIuNqtmTtK76tW2D8v1AGZ4CTzDyrHBdl5qnMguNxmW11tAwwxA2YvItp8OilVuXD65D51+3kjYvp3tvMqBxe2SM2krTXfHTzzObTQqUCUArqMwsi5ouTDSodZ7mjbS9vKpSj3MJokxUmsSLrw3R0BePE77fQ3X5AJT94XL4tRyl3cy/jryARIWHLm8Ih19V813738wA8595AqUWwlDuSq8yNMoBMSbTVCYKpuOfaYa4Dg8TAVok3aDW/ckW+QhX5PTiWv3gb0iexCWWGvFDIYONXJUbIHLPpUFw==; _abck=BADAD8B5450D47EA149C78E0615560BD~-1~YAAQnmZWuHi4kW6CAQAA2KsIgggJDgMNiI6xTDb9GssHB5bx57bna96yQsGEmksaYq2q1wDPWknhL9gCV5UND9OE5yp5UHQMM6LtrZPvbD/h5fVcnfIvL3kpsURo5SbdtP7Be0Xf5AiM0ZCq6sIWyuO2d6ibwj65IRN8vUxvL3cSnVYjyi8K0paBhMKs2qbl9esm1IICMgN7HfIQeir43daBUI/Mop1HY3BKFssvuvykR9tpYGx7coEDDzxZdeaup6aLVvqcaGD4nRoWOz75mvL+tFgkuZgpyyfeFi78VeFFEMot9KMXzRE2ZkTWEKXNmHXj0Ke513KOf42qmjRuNEGhPh61nvNgjn87da+TE+JyLJ9rTnnNfaWq+BKkcxmcZeCEU/ycpp/UDd09TS9hPA/E+FToH97ezBqHSeADU0Cuumo6f4xJtCiZhrf+2mHJf3tsp3Vzt/IwU6MEXx0pPhwOLiIukK8zXthkvE19VYNdUKkYrA==~-1~-1~-1', 
    'content-type': 'application/json', 
    'appid': 'com.nike.sport.running.ios', 
    'accept': 'application/json', 
    'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkZmY4YTAyLWIyZGEtNDhkZC1iOGVjLThhMmM1MGE2YTM0MnNpZyJ9.eyJpYXQiOjE2NjE5NDYzNjAsImV4cCI6MTY2MTk0OTk2MCwiaXNzIjoib2F1dGgyYWNjIiwianRpIjoiYzBmZDg4YTktNzNlZS00NDU2LTkyNDEtZTk0N2FjZWQ0MmViIiwiYXVkIjoiY29tLm5pa2UuZGlnaXRhbCIsInNidCI6Im5pa2U6YXBwIiwidHJ1c3QiOjEwMCwibGF0IjoxNjYwMDM4OTc4LCJzY3AiOlsibmlrZS5kaWdpdGFsIl0sInN1YiI6ImNvbS5uaWtlLnNwb3J0LnJ1bm5pbmcuaW9zIiwicHJuIjoiNDNiMThkOWItMzE2Ny00Mjg1LWE0N2YtZDcyNzMzZWU2N2NjIiwicHJ0IjoibmlrZTpwbHVzIiwibHJzY3AiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSBmbG93IG9mZmxpbmVfYWNjZXNzIG5pa2UuZGlnaXRhbCJ9.PBd1du4537QkcV6FthB3Qi4Si3pg4pzQ5WxJ1O464JsOQEdVI-hYYkdamaBnDi_XQgjXo3cTs13rxkiw8sWLnCaVBsEgI0yvC46CpQv36W1ZWNnsn6aCL9H0Kyrr73G0UMLrkpokhgcZp3NVFgu8P-5C8O3CpO0s6UQj7yd4Df0BZF8kvWne9No3G8xkgmLGAw22QJRbkA1IvyJYGpM6hyw2AlmdviBMHqCeDKTlRjwy3rsnVJCYw16lyee4yGmrjlCNY-8hEx1n-nPxGnG330pJlDh0VYrq35LJQFGaQKA6YvUSmYhOGkS3l2Jqkh8wzcWigupRBCXEcTjvqdRgtw', 
    'accept-charset': 'utf-8', 
    'x-b3-traceid': 'cdf37d60a59fe716', 
    'nike-api-caller-id': 'nike:com.nike.sport.running.ios:ios:7.16', 
    'accept-language': 'en-DE;q=1.0, zh-Hans-DE;q=0.9, de-DE;q=0.8, en-GB;q=0.7', 
    'user-agent': 'NRC/7.16.0 (prod; 2206282010; iOS 15.5; iPhone9,2)'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
