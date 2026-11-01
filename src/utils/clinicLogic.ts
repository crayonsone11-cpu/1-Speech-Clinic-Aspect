import { CLINICAL_INDICATIONS, CLINICAL_SERVICES, ClinicalService } from '../data/clinicData';

export type ServiceFilterCategory = 'all' | 'consultation-therapy' | 'diagnostic-assessment';

export interface FeeEstimateInput {
  serviceId: string;
  sessionsCount: number;
  insuranceReimbursementPercent: number; // e.g., 0, 50, 75
  claimMed1TaxRelief: boolean; // 20% Irish Revenue Med 1 relief on unreimbursed medical costs
}

export interface FeeEstimateResult {
  grossTotal: number;
  insuranceRefund: number;
  unreimbursedAmount: number;
  med1TaxRelief: number;
  netOutOfPocket: number;
  effectivePerSession: number;
}

export interface IntakeTriageFormData {
  childName: string;
  childAgeGroup: string;
  primaryConcernId: string;
  preferredModality: string;
  preferredServiceId: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  locationArea: string;
  additionalNotes: string;
  acceptedPolicy: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function filterServices(
  services: ClinicalService[],
  category: ServiceFilterCategory,
  searchQuery: string = '',
  modalityFilter: string = 'all'
): ClinicalService[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return services.filter((service) => {
    const matchesCategory = category === 'all' || service.category === category;
    const matchesModality =
      modalityFilter === 'all' ||
      service.deliveryModalities.some((m) => m.toLowerCase().includes(modalityFilter.toLowerCase()));
    const matchesQuery =
      !normalizedQuery ||
      service.title.toLowerCase().includes(normalizedQuery) ||
      service.shortSummary.toLowerCase().includes(normalizedQuery) ||
      service.clinicalDescription.toLowerCase().includes(normalizedQuery) ||
      service.idealFor.some((item) => item.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesModality && matchesQuery;
  });
}

export function calculateFeeEstimate(input: FeeEstimateInput): FeeEstimateResult {
  const service =
    CLINICAL_SERVICES.find((s) => s.id === input.serviceId) || CLINICAL_SERVICES[1]; // default ongoing therapy €115
  const count = Math.max(1, Math.min(24, Math.round(input.sessionsCount || 1)));
  const clampedInsurancePct = Math.max(0, Math.min(80, input.insuranceReimbursementPercent || 0));

  const grossTotal = service.startingFee * count;
  const insuranceRefund = Math.round(grossTotal * (clampedInsurancePct / 100));
  const unreimbursedAmount = Math.max(0, grossTotal - insuranceRefund);
  const med1TaxRelief = input.claimMed1TaxRelief ? Math.round(unreimbursedAmount * 0.2) : 0;
  const netOutOfPocket = Math.max(0, unreimbursedAmount - med1TaxRelief);
  const effectivePerSession = Math.round(netOutOfPocket / count);

  return {
    grossTotal,
    insuranceRefund,
    unreimbursedAmount,
    med1TaxRelief,
    netOutOfPocket,
    effectivePerSession,
  };
}

export function recommendClinicalPathway(
  concernId: string,
  childAgeGroup: string
): {
  recommendedService: ClinicalService;
  rationale: string;
} {
  const indication = CLINICAL_INDICATIONS.find((i) => i.id === concernId);
  const matchedService =
    CLINICAL_SERVICES.find((s) => s.id === indication?.recommendedServiceId) ||
    CLINICAL_SERVICES[0];

  if (childAgeGroup === 'Under 3 years (Infant / Toddler)' && concernId === 'late-talkers') {
    return {
      recommendedService: CLINICAL_SERVICES[0], // Initial Consultation
      rationale:
        'For toddlers under 3, a play-based Initial Consultation & Parent Coaching intake is the fastest way to establish early language routines without formal test pressure.',
    };
  }

  return {
    recommendedService: matchedService,
    rationale: `Based on a focus in ${indication ? indication.fullTitle : 'pediatric communication'}, we recommend starting with ${matchedService.title} to create an individualized, evidence-based plan.`,
  };
}

export function validateIntakeStep1(data: Pick<IntakeTriageFormData, 'childAgeGroup' | 'primaryConcernId' | 'preferredModality'>): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!data.childAgeGroup || !data.childAgeGroup.trim()) {
    errors.childAgeGroup = "Please select your child's age stage.";
  }
  if (!data.primaryConcernId || !data.primaryConcernId.trim()) {
    errors.primaryConcernId = 'Please select the primary communication area.';
  }
  if (!data.preferredModality || !data.preferredModality.trim()) {
    errors.preferredModality = 'Please select a preferred appointment format.';
  }
  return errors;
}

export function validateIntakeSubmission(data: IntakeTriageFormData): ValidationErrors {
  const errors: ValidationErrors = {
    ...validateIntakeStep1(data),
  };

  if (!data.parentName || data.parentName.trim().length < 2) {
    errors.parentName = 'Please enter parent or guardian full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.parentEmail || !emailRegex.test(data.parentEmail.trim())) {
    errors.parentEmail = 'Please enter a valid email address.';
  }

  const cleanedPhone = (data.parentPhone || '').replace(/[\s()-]/g, '');
  if (!cleanedPhone || !/^\+?[0-9]{7,15}$/.test(cleanedPhone)) {
    errors.parentPhone = 'Please enter a valid Irish or international contact number (e.g. 085 153 1931).';
  }

  if (!data.acceptedPolicy) {
    errors.acceptedPolicy = 'Please confirm our 24-hour cancellation & clinic fee terms.';
  }

  return errors;
}