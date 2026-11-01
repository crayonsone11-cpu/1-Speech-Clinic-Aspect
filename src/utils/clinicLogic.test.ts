import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterServices,
  calculateFeeEstimate,
  recommendClinicalPathway,
  validateIntakeSubmission,
  IntakeTriageFormData,
} from './clinicLogic';
import { CLINICAL_SERVICES } from '../data/clinicData';

test('filterServices filters correctly by category and search query', () => {
  const assessments = filterServices(CLINICAL_SERVICES, 'diagnostic-assessment');
  assert.equal(assessments.length, 6);

  const aacResults = filterServices(CLINICAL_SERVICES, 'all', 'AAC');
  assert.ok(aacResults.some((s) => s.id === 'aac-assessment'));

  const schoolVisits = filterServices(CLINICAL_SERVICES, 'all', '', 'School Visit');
  assert.ok(schoolVisits.length >= 3);
});

test('calculateFeeEstimate computes insurance refund and 20% Revenue Med 1 tax relief accurately', () => {
  // 4 Ongoing Therapy sessions at €115 = €460 gross
  // 50% insurance refund = €230 refund, €230 unreimbursed
  // 20% Med 1 tax relief on €230 = €46
  // Net out of pocket = €230 - €46 = €184 (€46/session)
  const estimate = calculateFeeEstimate({
    serviceId: 'ongoing-therapy',
    sessionsCount: 4,
    insuranceReimbursementPercent: 50,
    claimMed1TaxRelief: true,
  });

  assert.equal(estimate.grossTotal, 460);
  assert.equal(estimate.insuranceRefund, 230);
  assert.equal(estimate.unreimbursedAmount, 230);
  assert.equal(estimate.med1TaxRelief, 46);
  assert.equal(estimate.netOutOfPocket, 184);
  assert.equal(estimate.effectivePerSession, 46);
});

test('recommendClinicalPathway matches AAC concern to AAC Assessment', () => {
  const rec = recommendClinicalPathway('social-aac', 'Preschool (3 – 5 years)');
  assert.equal(rec.recommendedService.id, 'aac-assessment');
});

test('validateIntakeSubmission enforces required fields and accepts valid Irish inquiry', () => {
  const emptyForm: IntakeTriageFormData = {
    childName: '',
    childAgeGroup: '',
    primaryConcernId: '',
    preferredModality: '',
    preferredServiceId: 'initial-consultation',
    parentName: '',
    parentEmail: 'invalid-email',
    parentPhone: '123',
    locationArea: 'South County Dublin',
    additionalNotes: '',
    acceptedPolicy: false,
  };

  const errors = validateIntakeSubmission(emptyForm);
  assert.ok(errors.childAgeGroup);
  assert.ok(errors.primaryConcernId);
  assert.ok(errors.preferredModality);
  assert.ok(errors.parentName);
  assert.ok(errors.parentEmail);
  assert.ok(errors.parentPhone);
  assert.ok(errors.acceptedPolicy);

  const validForm: IntakeTriageFormData = {
    childName: 'Liam',
    childAgeGroup: 'Under 3 years (Infant / Toddler)',
    primaryConcernId: 'late-talkers',
    preferredModality: 'In-Clinic (Ballymount D12)',
    preferredServiceId: 'initial-consultation',
    parentName: 'Niamh Walsh',
    parentEmail: 'niamh.walsh@example.ie',
    parentPhone: '085 153 1931',
    locationArea: 'South County Dublin',
    additionalNotes: 'Looking for morning slots.',
    acceptedPolicy: true,
  };

  const validErrors = validateIntakeSubmission(validForm);
  assert.equal(Object.keys(validErrors).length, 0);
});