export type testEntityModel = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export type apiRequest = { api_key: string } & Record<
  string,
  string | number | boolean | object
>;

// Map out api fields to the actual responses
enum APIResponseFields {
  Success = 'success',
  Message = 'message',
  Label = 'label',
  PredictedElement = 'predicted_element',
  IsFrozen = 'is_frozen',
  ModelReady = 'model_ready',
  ModelBeingTrained = 'model_being_trained',
  TrainingProgress = 'training_progress',
  Score = 'score',
  ModelType = 'model_type',
  ScreenshotUuid = 'screenshot_uuid',
  ScreenshotExists = 'screenshot_exists',
  ExistsScreenshot = 'exists_screenshot',
  TestCaseUrl = 'tc_url',
  NeedsReload = 'needs_reload'
}

// This types all the expected types from the
// API
type APIResponseTypes = {
  [APIResponseFields.IsFrozen]: boolean;
  [APIResponseFields.Label]: string;
  [APIResponseFields.PredictedElement]: testEntityModel;
  [APIResponseFields.Message]: string;
  [APIResponseFields.ModelType]: string;
  [APIResponseFields.ModelBeingTrained]: boolean;
  [APIResponseFields.ModelReady]: boolean;
  [APIResponseFields.ScreenshotUuid]: string;
  [APIResponseFields.Score]: string;
  [APIResponseFields.Success]: boolean;
  [APIResponseFields.TrainingProgress]: number;
  [APIResponseFields.ScreenshotExists]: boolean;
  [APIResponseFields.ExistsScreenshot]: boolean;
  [APIResponseFields.TestCaseUrl]: string;
  [APIResponseFields.NeedsReload]: boolean;
};

type APIResponse<T extends keyof APIResponseTypes> = Pick<APIResponseTypes, T>;

// Used as the basic response type
export type baseAPIResponse = APIResponse<APIResponseFields.Success> &
  Partial<APIResponse<APIResponseFields.Message>>;

export type createCheckInResponse = APIResponse<
  APIResponseFields.Success | APIResponseFields.Message
>;

export type uploadTestElementScreenshot = APIResponse<
  | APIResponseFields.Success
  | APIResponseFields.ScreenshotUuid
  | APIResponseFields.Message
  | APIResponseFields.IsFrozen
>;

// Used in detect endpoint
export type classifyObjectResponse = APIResponse<
  | APIResponseFields.Success
  | APIResponseFields.Message
  | APIResponseFields.PredictedElement
  | APIResponseFields.IsFrozen
  | APIResponseFields.ModelReady
  | APIResponseFields.ModelBeingTrained
  | APIResponseFields.TrainingProgress
  | APIResponseFields.ModelType
  | APIResponseFields.ScreenshotUuid
  | APIResponseFields.Score
>;

export type getIfScreenshotExistsResponse = APIResponse<
  | APIResponseFields.ScreenshotExists
  | APIResponseFields.PredictedElement
  | APIResponseFields.IsFrozen
  | APIResponseFields.ExistsScreenshot
  | APIResponseFields.Message
  | APIResponseFields.Success
>;

export type getIfFrozenResponse = APIResponse<
  | APIResponseFields.Success
  | APIResponseFields.Label
  | APIResponseFields.IsFrozen
>;

export type getTestCaseBox = APIResponse<
  | APIResponseFields.Success
  | APIResponseFields.Message
  | APIResponseFields.PredictedElement
  | APIResponseFields.Score
  | APIResponseFields.TestCaseUrl
  | APIResponseFields.NeedsReload
>;

export type updateTestElementResponse = APIResponse<
  APIResponseFields.Success | APIResponseFields.Message
>;
