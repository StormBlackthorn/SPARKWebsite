import type { StatItem } from '$lib/types';

export const totalServiceStats: StatItem[] = [
  {
    icon: '/assets/icons/studentsTaught.png',
    value: 500,
    suffix: '+',
    label: 'Students Taught',
  },
  {
    icon: '/assets/icons/fundsRaised.png',
    value: 7800,
    prefix: '$',
    label: 'Saved Compared to Alternatives',
  },
  {
    icon: '/assets/icons/yearsOfService.png',
    value: 3,
    label: 'Years of Continuous Service',
  },
];

export const teamStats: StatItem[] = [
  {
    icon: '/assets/icons/dedicatedVolunteerTeachers.png',
    value: 80,
    label: 'Dedicated Volunteer Teachers',
  },
  {
    icon: '/assets/icons/hoursContributed.png',
    value: 700,
    suffix: '+',
    label: 'Hours Contributed',
  },
];

export const reachStats: StatItem[] = [
  {
    icon: '/assets/icons/schools.png',
    value: 30,
    label: 'Schools',
  },
  {
    icon: '/assets/icons/globe.png',
    value: 5,
    label: 'Countries',
  },
];

export const ratingStats: StatItem[] = [
  {
    icon: '/assets/icons/enjoyment.png',
    value: 9.8,
    format: 'decimal',
    label: 'Enjoyment',
  },
  {
    icon: '/assets/icons/educationalValue.png',
    value: 9.4,
    format: 'decimal',
    label: 'Educational Value',
  },
  {
    icon: '/assets/icons/teacherHelpfulness.png',
    value: 9.5,
    format: 'decimal',
    label: 'Teacher Helpfulness',
  },
];

export const homeImpactStats: StatItem[] = [
  {
    icon: '/assets/icons/studentsTaught.png',
    value: 500,
    suffix: '+',
    label: 'Students Taught',
  },
  {
    icon: '/assets/icons/dedicatedVolunteerTeachers.png',
    value: 80,
    label: 'Volunteer Teachers',
  },
  {
    icon: '/assets/icons/schools.png',
    value: 30,
    label: 'Schools',
  },
  {
    icon: '/assets/icons/hoursContributed.png',
    value: 700,
    suffix: '+',
    label: 'Hours Contributed',
  },
];
