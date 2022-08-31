import axios from "axios";
import util from "util";
import { nrcActivityConverter } from "./activityTypeConverter";
import { NrcActivity } from "./nrcTypes";

const testData = require('../data/data.json');
const workouts: NrcActivity[] = testData.data.workouts;

const token =
  "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkZmY4YTAyLWIyZGEtNDhkZC1iOGVjLThhMmM1MGE2YTM0MnNpZyJ9.eyJpYXQiOjE2NjE5NDYzNjAsImV4cCI6MTY2MTk0OTk2MCwiaXNzIjoib2F1dGgyYWNjIiwianRpIjoiYzBmZDg4YTktNzNlZS00NDU2LTkyNDEtZTk0N2FjZWQ0MmViIiwiYXVkIjoiY29tLm5pa2UuZGlnaXRhbCIsInNidCI6Im5pa2U6YXBwIiwidHJ1c3QiOjEwMCwibGF0IjoxNjYwMDM4OTc4LCJzY3AiOlsibmlrZS5kaWdpdGFsIl0sInN1YiI6ImNvbS5uaWtlLnNwb3J0LnJ1bm5pbmcuaW9zIiwicHJuIjoiNDNiMThkOWItMzE2Ny00Mjg1LWE0N2YtZDcyNzMzZWU2N2NjIiwicHJ0IjoibmlrZTpwbHVzIiwibHJzY3AiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSBmbG93IG9mZmxpbmVfYWNjZXNzIG5pa2UuZGlnaXRhbCJ9.PBd1du4537QkcV6FthB3Qi4Si3pg4pzQ5WxJ1O464JsOQEdVI-hYYkdamaBnDi_XQgjXo3cTs13rxkiw8sWLnCaVBsEgI0yvC46CpQv36W1ZWNnsn6aCL9H0Kyrr73G0UMLrkpokhgcZp3NVFgu8P-5C8O3CpO0s6UQj7yd4Df0BZF8kvWne9No3G8xkgmLGAw22QJRbkA1IvyJYGpM6hyw2AlmdviBMHqCeDKTlRjwy3rsnVJCYw16lyee4yGmrjlCNY-8hEx1n-nPxGnG330pJlDh0VYrq35LJQFGaQKA6YvUSmYhOGkS3l2Jqkh8wzcWigupRBCXEcTjvqdRgtw";
const headers = {
  Host: "api.nike.com",
  "content-type": "application/json",
  appid: "com.nike.sport.running.ios",
  accept: "application/json",
  authorization: token,
  "accept-charset": "utf-8",
  "nike-api-caller-id": "nike:com.nike.sport.running.ios:ios:7.16",
  "accept-language": "en-DE;q=1.0, zh-Hans-DE;q=0.9, de-DE;q=0.8, en-GB;q=0.7",
  "user-agent": "NRC/7.16.0 (prod; 2206282010; iOS 15.5; iPhone9,2)",
};

async function postActivity(data: any) {

  const requestData = {
    method: "POST",
    url: "https://api.nike.com/plus/v3/activities",
    headers: headers,
    data: JSON.stringify([nrcActivityConverter(data)]),
  };
  console.log(util.inspect(requestData));
  console.log();
  console.log();
  console.log("--------response---------");
  console.log();
  console.log();

  await axios(requestData)
    .then(function (response) {
      console.log();
      console.log();
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
}
workouts.forEach(async (activity) => await postActivity(activity));