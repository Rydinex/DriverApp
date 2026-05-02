export type ProfessionalPrdSlug =
  | 'rydinex_driver_airport_intel'
  | 'rydinex_driver_airport_queues_3'
  | 'rydinex_driver_airport_staging_tracking'
  | 'rydinex_driver_cancellation_eligible'
  | 'rydinex_driver_city_event_hub_updated_surge'
  | 'rydinex_driver_destination_reached'
  | 'rydinex_driver_document_upload_3'
  | 'rydinex_driver_driving_time'
  | 'rydinex_driver_earnings_3'
  | 'rydinex_driver_event_hub_mccormick_place'
  | 'rydinex_driver_event_hub_updated_surge'
  | 'rydinex_driver_high_demand_opportunity'
  | 'rydinex_driver_low_priority_warning_4'
  | 'rydinex_driver_moving_rider_view'
  | 'rydinex_driver_payout_compliance'
  | 'rydinex_driver_payout_history'
  | 'rydinex_driver_payout_methods'
  | 'rydinex_driver_payout_rules'
  | 'rydinex_driver_pro_dashboard_3'
  | 'rydinex_driver_pro_fleet_preferences'
  | 'rydinex_driver_queue_next_3_alert'
  | 'rydinex_driver_queue_position_tracker_3'
  | 'rydinex_driver_queue_status_break_mode'
  | 'rydinex_driver_safety_dashboard_with_audit'
  | 'rydinex_driver_service_notification'
  | 'rydinex_driver_set_destination'
  | 'rydinex_driver_short_trip_priority_refined'
  | 'rydinex_driver_sound_settings';

export interface ProfessionalPrdItem {
  slug: ProfessionalPrdSlug;
  title: string;
  subtitle: string;
  category: 'Airport' | 'Queue' | 'Payout' | 'Safety' | 'Operations' | 'Experience';
  highlights: string[];
  hasScreen: boolean;
  hasCode: boolean;
}

export const PROFESSIONAL_PRD_ITEMS: ProfessionalPrdItem[] = [
  {
    slug: 'rydinex_driver_airport_intel',
    title: 'Airport Intel',
    subtitle: 'Flight bank demand and timing intelligence',
    category: 'Airport',
    highlights: ['Flight window heat', 'Demand timing', 'Pro lane readiness'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_airport_queues_3',
    title: 'Airport Queues',
    subtitle: 'Queue capacity and lane assignment overview',
    category: 'Queue',
    highlights: ['Queue depth', 'Lane split', 'Dispatch readiness'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_airport_staging_tracking',
    title: 'Airport Staging Tracking',
    subtitle: 'Live lot presence and compliance state',
    category: 'Airport',
    highlights: ['Lot geofence', 'Staging timer', 'Eligibility checks'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_cancellation_eligible',
    title: 'Cancellation Eligible',
    subtitle: 'Policy-safe cancellation state and payout impact',
    category: 'Operations',
    highlights: ['Policy window', 'Reason audit', 'Fee visibility'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_city_event_hub_updated_surge',
    title: 'City Event Hub',
    subtitle: 'City event opportunities with surge context',
    category: 'Operations',
    highlights: ['Event radar', 'Surge signal', 'Pickup routing'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_destination_reached',
    title: 'Destination Reached',
    subtitle: 'Arrival confirmation and post-trip actions',
    category: 'Experience',
    highlights: ['Arrival proof', 'Drop-off flow', 'Trip closeout'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_document_upload_3',
    title: 'Document Upload',
    subtitle: 'Compliance uploads and verification status',
    category: 'Operations',
    highlights: ['Upload queue', 'Verification state', 'Expiry alerts'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_driving_time',
    title: 'Driving Time',
    subtitle: 'Shift-hour tracking and legal limits',
    category: 'Safety',
    highlights: ['Shift timer', 'Break enforcement', 'Compliance guardrails'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_earnings_3',
    title: 'Earnings',
    subtitle: 'Revenue, incentives, and performance breakdown',
    category: 'Payout',
    highlights: ['Daily totals', 'Bonus progress', 'Net estimates'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_event_hub_mccormick_place',
    title: 'Event Hub - McCormick Place',
    subtitle: 'Venue-specific event demand guidance',
    category: 'Operations',
    highlights: ['Venue zones', 'Demand pulse', 'Entry timing'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_event_hub_updated_surge',
    title: 'Event Hub Updated Surge',
    subtitle: 'Event staging with dynamic surge overlays',
    category: 'Operations',
    highlights: ['Dynamic surge', 'Staging tips', 'Queue conversion'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_high_demand_opportunity',
    title: 'High Demand Opportunity',
    subtitle: 'Actionable alerts for premium demand zones',
    category: 'Operations',
    highlights: ['Opportunity score', 'ETA advantage', 'Expected fare'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_low_priority_warning_4',
    title: 'Low Priority Warning',
    subtitle: 'Dispatch priority warning and recovery tips',
    category: 'Queue',
    highlights: ['Priority score', 'Recovery actions', 'Queue penalties'],
    hasScreen: false,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_moving_rider_view',
    title: 'Moving Rider View',
    subtitle: 'Pickup coordination while rider is in motion',
    category: 'Experience',
    highlights: ['Live rider movement', 'ETA adjustment', 'Pickup sync'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_payout_compliance',
    title: 'Payout Compliance',
    subtitle: 'Payout holds, checks, and requirement status',
    category: 'Payout',
    highlights: ['Compliance checks', 'Hold reasons', 'Resolution steps'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_payout_history',
    title: 'Payout History',
    subtitle: 'Historical transfers, statuses, and trends',
    category: 'Payout',
    highlights: ['Transfer timeline', 'Status tracking', 'Dispute visibility'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_payout_methods',
    title: 'Payout Methods',
    subtitle: 'Bank/card payout destinations and defaults',
    category: 'Payout',
    highlights: ['Method setup', 'Default routing', 'Verification'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_payout_rules',
    title: 'Payout Rules',
    subtitle: 'Cutoff times, settlement rules, and limits',
    category: 'Payout',
    highlights: ['Settlement windows', 'Limit policy', 'Compliance notices'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_pro_dashboard_3',
    title: 'Pro Dashboard',
    subtitle: 'Professional driver KPIs and tier progress',
    category: 'Operations',
    highlights: ['Tier status', 'Performance KPIs', 'Rewards progress'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_pro_fleet_preferences',
    title: 'Pro Fleet Preferences',
    subtitle: 'Vehicle and dispatch preference controls',
    category: 'Operations',
    highlights: ['Fleet mode', 'Trip filters', 'Preferred lanes'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_queue_next_3_alert',
    title: 'Queue Next-3 Alert',
    subtitle: 'Near-turn notifications for queue dispatch',
    category: 'Queue',
    highlights: ['Next-up alert', 'Lane prep', 'Pickup readiness'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_queue_position_tracker_3',
    title: 'Queue Position Tracker',
    subtitle: 'Queue rank tracking and progress estimations',
    category: 'Queue',
    highlights: ['Position index', 'Time to dispatch', 'Queue movement'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_queue_status_break_mode',
    title: 'Queue Status Break Mode',
    subtitle: 'Break handling while preserving queue state',
    category: 'Queue',
    highlights: ['Break timer', 'Queue pause rules', 'Rejoin workflow'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_safety_dashboard_with_audit',
    title: 'Safety Dashboard with Audit',
    subtitle: 'Safety checks, incidents, and audit evidence',
    category: 'Safety',
    highlights: ['Safety score', 'Audit logs', 'Incident tools'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_service_notification',
    title: 'Service Notification',
    subtitle: 'Operational notices and service updates',
    category: 'Operations',
    highlights: ['Critical notices', 'Acknowledge actions', 'Service impact'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_set_destination',
    title: 'Set Destination',
    subtitle: 'Destination mode and directional filtering',
    category: 'Experience',
    highlights: ['Destination filter', 'Trip matching', 'Time windows'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_short_trip_priority_refined',
    title: 'Short Trip Priority',
    subtitle: 'Priority protection for short-trip assignments',
    category: 'Queue',
    highlights: ['Priority boost', 'Queue fairness', 'Compensation logic'],
    hasScreen: true,
    hasCode: true,
  },
  {
    slug: 'rydinex_driver_sound_settings',
    title: 'Sound Settings',
    subtitle: 'Alert channels, tones, and volume controls',
    category: 'Experience',
    highlights: ['Alert profile', 'Volume levels', 'Device route'],
    hasScreen: true,
    hasCode: true,
  },
];

export const PROFESSIONAL_PRD_BY_SLUG = PROFESSIONAL_PRD_ITEMS.reduce<Record<string, ProfessionalPrdItem>>(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {}
);
