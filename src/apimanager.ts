import { initConfiguration } from './config';
import axios from 'axios';
import type { apiRequest, testEntityModel } from './types';
import type { createSDKOptions } from './index';
import type * as DevToolsAiAPIResponse from './types';
import type { endpointUrls } from './config';
import { createHttpRequest } from './httpsutils';
export function makeAPIManager(
  {
    apiKey,
    useClassifierDuringCreation,
    screenMultiplier,
  }: Required<createSDKOptions>,
  endpoints: endpointUrls,
) {

  function createCheckIn(testCaseName: string) {
    const data: apiRequest = {
      api_key: apiKey,
      os: 'js-os',
      sdk_version: initConfiguration.sdkVersion,
      language: 'javascript',
      test_case_name: testCaseName,
    };
    return createHttpRequest<DevToolsAiAPIResponse.createCheckInResponse>(() =>
      axios.post(endpoints.checkIn, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  function uploadTestElementScreenshot(
    screenshotBase64: string,
    elementName: string,
    testCaseId: string,
  ) {
    const data: apiRequest = {
      api_key: apiKey,
      test_case_name: testCaseId,
      label: elementName,
      screenshot: screenshotBase64,
      is_interactive: true,
    };
    return createHttpRequest<DevToolsAiAPIResponse.uploadTestElementScreenshot>(
      () =>
        axios.post(endpoints.uploadScreenshot, JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        }),
    );
  }

  function classifyObject(
    screenshotBase64: string,
    source: string,
    elementName: string,
    testCaseName: string,
    ignoreCache?: boolean,
  ) {
    const data = {
      screenshot: screenshotBase64,
      source: source,
      api_key: apiKey,
      label: elementName,
      test_case_name: testCaseName,
      ignore_cache: ignoreCache,
    };

    return createHttpRequest<DevToolsAiAPIResponse.classifyObjectResponse>(() =>
      axios.post(endpoints.detect, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  async function getIfScreenshotExists(
    screenshotId: string,
    elementName: string,
  ) {
    const data: apiRequest = {
      api_key: apiKey,
      screenshot_uuid: screenshotId,
      label: elementName,
    };
    return createHttpRequest<DevToolsAiAPIResponse.getIfScreenshotExistsResponse>(
      () =>
        axios.post(endpoints.existsScreenshot, JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        }),
    );
  }

  function getIfFrozen(elementName: string) {
    const data: apiRequest = {
      api_key: apiKey,
      label: elementName,
    };

    return createHttpRequest<DevToolsAiAPIResponse.getIfFrozenResponse>(
      () =>
        axios.post(endpoints.checkFrozen, JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        }),
      'There was issue checking if the test is frozen.',
    );
  }

  function getTestCaseBox(
    elementLabel: string,
    screenshotId: string,
    testCaseName: string,
    useClassifier: boolean = useClassifierDuringCreation,
    eventId?: string
  ) {
    const data: apiRequest = {
      api_key: apiKey,
      label: elementLabel,
      screenshot_uuid: screenshotId,
      run_classifier: useClassifier,
      tc_name: testCaseName,
    };

    if(eventId != null) {
      data.event_id = eventId;
    }
    return createHttpRequest<DevToolsAiAPIResponse.getTestCaseBox>(() =>
      axios.post(endpoints.testCaseBoundingBox, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  function updateTestElement(
    element: testEntityModel,
    screenshotId: string,
    elementName: string,
    testCaseId: string,
    trainIfNecessary = true,
  ) {
    const data: apiRequest = {
      screenshot_uuid: screenshotId,
      retrain: trainIfNecessary,
      api_key: apiKey,
      label: elementName,
      x: element.x * screenMultiplier,
      y: element.y * screenMultiplier,
      width: element.width * screenMultiplier,
      height: element.height * screenMultiplier,
      multiplier: screenMultiplier,
      test_case_name: testCaseId,
    };

    return createHttpRequest<DevToolsAiAPIResponse.updateTestElementResponse>(
      () =>
        axios.post(endpoints.updateElement, JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' },
        }),
    );
  }

  return {
    createCheckIn,
    classifyObject,
    getIfScreenshotExists,
    getTestCaseBox,
    getIfFrozen,
    updateTestElement,
    uploadTestElementScreenshot,
  };
}
