export interface QuantityFeedbackEvidence {
  value: string;
  cartRowCreated: boolean;
  requestObserved: boolean;
  httpStatus: number | null;
  successModalVisible: boolean;
  modalText: string | null;
  nativeValid: boolean;
  nativeMessage: string;
  visibleErrors: string[];
}

// Classification concerns the observed shopping outcome, not a specific implementation.
// Native rejection and controlled server validation are both valid correction approaches.
export function quantityFeedbackIsAcceptable(evidence: QuantityFeedbackEvidence): boolean {
  if (evidence.value === '1') {
    return evidence.httpStatus === 200 && evidence.successModalVisible && /added to cart/i.test(evidence.modalText ?? '');
  }
  if (evidence.cartRowCreated || (evidence.httpStatus != null && evidence.httpStatus >= 500)) return false;
  if (!evidence.requestObserved && !evidence.nativeValid && evidence.nativeMessage.trim()) return true;
  const controlledRejection = evidence.httpStatus === 400 || evidence.httpStatus === 422;
  const meaningfulVisibleError = evidence.visibleErrors.some(message =>
    /quantity|positive|whole|integer|number|at least|required|invalid/i.test(message) && message.trim().length > 3);
  return controlledRejection && meaningfulVisibleError && !evidence.successModalVisible;
}
