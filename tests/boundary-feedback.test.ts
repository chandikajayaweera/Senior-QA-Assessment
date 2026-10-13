import test from 'node:test';
import assert from 'node:assert/strict';
import { quantityFeedbackIsAcceptable, type QuantityFeedbackEvidence } from '../src/boundary-feedback.js';

const rejected: QuantityFeedbackEvidence = { value: '1.5', cartRowCreated: false, requestObserved: true,
  httpStatus: 422, successModalVisible: false, modalText: null, nativeValid: false, nativeMessage: '',
  visibleErrors: ['Enter a positive whole number for quantity.'] };

test('native constraint rejection and visible controlled server rejection are accepted', () => {
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, requestObserved: false, httpStatus: null,
    nativeMessage: 'Please enter a valid value.', visibleErrors: [] }), true);
  assert.equal(quantityFeedbackIsAcceptable(rejected), true);
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, httpStatus: 400 }), true);
});

test('recorded fractional/empty HTTP 500 outcomes always fail graceful feedback', () => {
  for (const value of ['1.5', '']) {
    assert.equal(quantityFeedbackIsAcceptable({ ...rejected, value, httpStatus: 500 }), false);
  }
});

test('recorded zero/negative success with invalid cart row fails feedback', () => {
  for (const value of ['0', '-1']) {
    assert.equal(quantityFeedbackIsAcceptable({ ...rejected, value, cartRowCreated: true, httpStatus: 200,
      successModalVisible: true, modalText: 'Your product has been added to cart.' }), false);
  }
});

test('silent rejection, unrelated errors, and contradictory success remain failures', () => {
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, visibleErrors: [] }), false);
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, visibleErrors: ['Request was refused.'] }), false);
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, httpStatus: 429 }), false);
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, successModalVisible: true }), false);
});

test('valid quantity one retains normal success feedback criterion', () => {
  assert.equal(quantityFeedbackIsAcceptable({ ...rejected, value: '1', cartRowCreated: true, httpStatus: 200,
    successModalVisible: true, modalText: 'Your product has been added to cart.' }), true);
});
