export interface Validator {
  // Element checks
  verifyContainsText(selector: string, expected: string): Promise<void>;
  verifyHasText(selector: string, expected: string): Promise<void>;
  verifyHasValue(selector: string, expected: string): Promise<void>;
  verifyNotContainsText(selector: string, unexpected: string): Promise<void>;
  verifyVisible(selector: string): Promise<void>;
  verifyHidden(selector: string): Promise<void>;
  verifyHasClass(selector: string, className: string): Promise<void>;
  verifyCount(selector: string, count: number): Promise<void>;

  // Value checks
  verifyEquals(actual: string, expected: string, what: string): Promise<void>;
  verifyNumberEquals(actual: number, expected: number, what: string): Promise<void>;
  verifyGreaterThan(actual: number, minimum: number, what: string): Promise<void>;

  // Frame checks
  verifyFrameText(frameSelector: string, selector: string, expected: string): Promise<void>;
  verifyFrameContains(frameSelector: string, selector: string, expected: string): Promise<void>;
  verifyNestedFrameContains(parentFrame: string, childFrame: string, selector: string, expected: string): Promise<void>;
}