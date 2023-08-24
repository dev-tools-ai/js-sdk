export const initConfiguration = {
  baseUrl: 'https://smartdriver.dev-tools.ai',
  sdkVersion: '0.0.5',
  screenMultiplier: 1,
  useClassifierDuringCreation: true,
};

export const endpoints = {
  checkIn: 'ping',
  detect: 'detect',
  uploadScreenshot: 'upload_screenshot',
  existsScreenshot: 'exists_screenshot',
  checkFrozen: 'check_frozen',
  testCaseBoundingBox: 'testcase/get_action_info',
  updateElement: 'add_action_info',
};

export type endpointUrls = Record<keyof typeof endpoints, string>;
