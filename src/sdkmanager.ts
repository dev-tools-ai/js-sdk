import { initConfiguration, endpointUrls, endpoints } from './config';
import { makeAPIManager } from './apimanager';

export type createSDKOptions = {
  apiKey: string;
  useClassifierDuringCreation?: boolean;
  screenMultiplier?: number;
  baseUrl?: string;
};

export function createSDK(userOptions: createSDKOptions) {
  const sdkOptions = { ...initConfiguration, ...userOptions };
  const baseUrl = userOptions.baseUrl || initConfiguration.baseUrl;
  const apiEndpointUrls = {};
  // Creates our endpoints object for us
  (Object.keys(endpoints) as Array<keyof typeof endpoints>).forEach(
    (endpointKey) => {
      Object.assign(apiEndpointUrls, {
        [endpointKey]: `${baseUrl}/${endpoints[endpointKey]}`,
      });
    },
  );

  return makeAPIManager(sdkOptions, apiEndpointUrls as endpointUrls);
}

export type DevToolsAiSDK = ReturnType<typeof createSDK>;
