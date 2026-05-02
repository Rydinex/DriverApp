import { ProfessionalPrdSlug } from './professionalPrdCatalog';

export interface PrdSection {
  title: string;
  value: string;
  note: string;
}

export interface PrdBlueprint {
  actions: string[];
  sections: PrdSection[];
  showMap: boolean;
}

const DEFAULT_BLUEPRINTS: Record<string, PrdBlueprint> = {
  Airport: {
    actions: ['Refresh Intel', 'Open Flight Feed', 'Navigate to Staging'],
    sections: [
      { title: 'Queue Heat', value: 'High', note: 'Monitor overflow guidance before entering lot.' },
      { title: 'Arrival Pulse', value: 'Peak in 30m', note: 'Expect strongest demand near evening bank.' },
      { title: 'Dispatch Window', value: '4-6 min', note: 'Short trip priority currently active.' },
    ],
    showMap: true,
  },
  Queue: {
    actions: ['Join Queue', 'Pause Queue', 'Open Queue Rules'],
    sections: [
      { title: 'Current Position', value: 'Top 20%', note: 'Position improves when proximity remains stable.' },
      { title: 'Expected Dispatch', value: '12 min', note: 'ETA adjusts as lanes rebalance.' },
      { title: 'Priority State', value: 'Eligible', note: 'Short trip fairness policy is active.' },
    ],
    showMap: true,
  },
  Payout: {
    actions: ['Review Statement', 'Update Payout Method', 'Run Compliance Check'],
    sections: [
      { title: 'Settlement Window', value: 'Daily', note: 'Transfers settle at local cutoff.' },
      { title: 'Current Hold', value: 'None', note: 'No compliance issues blocking payout.' },
      { title: 'Net Projection', value: '$842.50', note: 'Projected after fees and adjustments.' },
    ],
    showMap: false,
  },
  Safety: {
    actions: ['Open Safety Check', 'Report Incident', 'View Audit Trail'],
    sections: [
      { title: 'Safety Score', value: '97/100', note: 'Based on driving quality and compliance events.' },
      { title: 'Audit State', value: 'Pass', note: 'No unresolved flags in current period.' },
      { title: 'Break Compliance', value: 'On Track', note: 'Driving-time and break rules are satisfied.' },
    ],
    showMap: false,
  },
  Operations: {
    actions: ['Start Workflow', 'Open Checklist', 'Notify Dispatch'],
    sections: [
      { title: 'Operational State', value: 'Active', note: 'System sync healthy across queue and trip tools.' },
      { title: 'Policy Check', value: 'Compliant', note: 'No blocking policy issues detected.' },
      { title: 'Driver Impact', value: 'Medium', note: 'Expect elevated demand with controlled risk.' },
    ],
    showMap: false,
  },
  Experience: {
    actions: ['Contact Rider', 'Open Trip Controls', 'Confirm Next Step'],
    sections: [
      { title: 'Rider Sync', value: 'Live', note: 'Position and ETA updates are active.' },
      { title: 'Route Confidence', value: 'High', note: 'Traffic model aligned with ETA envelope.' },
      { title: 'Completion Flow', value: 'Ready', note: 'Trip controls and closeout actions available.' },
    ],
    showMap: true,
  },
};

const OVERRIDES: Partial<Record<ProfessionalPrdSlug, Partial<PrdBlueprint>>> = {
  rydinex_driver_airport_intel: {
    actions: ['Switch ORD/MDW', 'View Full Schedule', 'Start Airport Nav'],
    sections: [
      { title: 'Short Trip Priority', value: 'Active', note: 'Eligible for sub-10 mile dispatch at ORD.' },
      { title: 'Standard Queue', value: '142 drivers', note: 'Typical wait is 45-55 minutes.' },
      { title: 'Passenger Inflow', value: 'Peak 6PM', note: 'Live trend indicates strongest incoming volume.' },
    ],
    showMap: true,
  },
  rydinex_driver_airport_queues_3: {
    actions: ['Join Airport Queue', 'Open Overflow Lots', 'View Queue Forecast'],
  },
  rydinex_driver_airport_staging_tracking: {
    actions: ['Confirm Lot Presence', 'Start Staging Timer', 'Open Geofence Help'],
  },
  rydinex_driver_cancellation_eligible: {
    actions: ['Review Cancel Reason', 'Confirm Eligible Cancel', 'Return to Queue'],
  },
  rydinex_driver_city_event_hub_updated_surge: {
    actions: ['Open Event Surge', 'Route to Event Zone', 'View Pickup Lanes'],
  },
  rydinex_driver_destination_reached: {
    actions: ['Confirm Arrival', 'Collect Rider Feedback', 'Close Trip'],
  },
  rydinex_driver_document_upload_3: {
    actions: ['Upload Document', 'Retake Photo', 'Submit for Review'],
  },
  rydinex_driver_driving_time: {
    actions: ['Start Break', 'View Shift Summary', 'Acknowledge Limit Warning'],
  },
  rydinex_driver_earnings_3: {
    actions: ['Open Earnings Detail', 'View Incentives', 'Cash Out'],
  },
  rydinex_driver_event_hub_mccormick_place: {
    actions: ['Open Venue Queue', 'Navigate to Gate', 'Track Event Exit Pulse'],
  },
  rydinex_driver_event_hub_updated_surge: {
    actions: ['View Surge Grid', 'Open Event Dispatch', 'Route to Demand Zone'],
  },
  rydinex_driver_high_demand_opportunity: {
    actions: ['Accept Opportunity', 'Preview Earnings', 'Route Now'],
  },
  rydinex_driver_low_priority_warning_4: {
    actions: ['Acknowledge Warning', 'Run Priority Recovery', 'View Queue Policy'],
  },
  rydinex_driver_moving_rider_view: {
    actions: ['Call Rider', 'Open Pickup Route', 'Mark Rider Onboard'],
  },
  rydinex_driver_payout_compliance: {
    actions: ['Run Compliance Scan', 'Resolve Hold', 'Contact Support'],
  },
  rydinex_driver_payout_history: {
    actions: ['Filter History', 'Export Statement', 'Open Transfer Details'],
  },
  rydinex_driver_payout_methods: {
    actions: ['Add Method', 'Set Default', 'Verify Account'],
  },
  rydinex_driver_payout_rules: {
    actions: ['Review Rules', 'Simulate Payout Date', 'Open Policy Detail'],
  },
  rydinex_driver_pro_dashboard_3: {
    actions: ['Open KPI Detail', 'Review Tier Progress', 'View Rewards'],
  },
  rydinex_driver_pro_fleet_preferences: {
    actions: ['Set Fleet Mode', 'Update Trip Filters', 'Save Preferences'],
  },
  rydinex_driver_queue_next_3_alert: {
    actions: ['Acknowledge Alert', 'Prepare Pickup Lane', 'Open Dispatch Help'],
  },
  rydinex_driver_queue_position_tracker_3: {
    actions: ['Refresh Position', 'Open Movement History', 'Set Queue Alerts'],
  },
  rydinex_driver_queue_status_break_mode: {
    actions: ['Start Break Mode', 'Resume Queue', 'Open Break Rules'],
  },
  rydinex_driver_safety_dashboard_with_audit: {
    actions: ['Open Safety Dashboard', 'Export Audit Log', 'Start Incident Report'],
  },
  rydinex_driver_service_notification: {
    actions: ['Acknowledge Notice', 'Open Service Detail', 'Set Reminder'],
  },
  rydinex_driver_set_destination: {
    actions: ['Set Destination', 'Adjust Time Window', 'Enable Match Filter'],
  },
  rydinex_driver_short_trip_priority_refined: {
    actions: ['Enable Priority', 'Review Fairness Policy', 'View Queue Impact'],
  },
  rydinex_driver_sound_settings: {
    actions: ['Set Alert Profile', 'Test Sound', 'Save Audio Settings'],
  },
};

export function getPrdBlueprint(category: string, slug: ProfessionalPrdSlug): PrdBlueprint {
  const base = DEFAULT_BLUEPRINTS[category] ?? DEFAULT_BLUEPRINTS.Operations;
  const override = OVERRIDES[slug] ?? {};

  return {
    actions: override.actions ?? base.actions,
    sections: override.sections ?? base.sections,
    showMap: typeof override.showMap === 'boolean' ? override.showMap : base.showMap,
  };
}
