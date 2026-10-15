export interface InsightItem {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  date: string;
  authorRole: string;
}

export const insightsData: InsightItem[] = [
  {
    slug: 'architecting-resilient-multi-cloud',
    title: 'Architecting Resilient Multi-Cloud Environments for Enterprise Systems',
    category: 'Cloud Engineering',
    readTime: '6 min read',
    summary: 'A structured evaluation of workload portability, latency boundaries, and unified identity patterns across hybrid cloud estates.',
    date: 'October 2026',
    authorRole: 'Platform Engineering Team'
  },
  {
    slug: 'enterprise-kubernetes-day-two-operations',
    title: 'Enterprise Kubernetes: Navigating Day 2 Operations and Cluster Governance',
    category: 'Container Platforms',
    readTime: '8 min read',
    summary: 'Key strategies for multi-cluster lifecycle management, declarative GitOps workflows, and continuous security admission controls.',
    date: 'September 2026',
    authorRole: 'Cloud-Native Architecture Group'
  },
  {
    slug: 'strategic-approaches-to-vmware-modernisation',
    title: 'Strategic Approaches to Virtualisation and VMware Workload Modernisation',
    category: 'Infrastructure Strategy',
    readTime: '7 min read',
    summary: 'Objective assessment criteria for evaluating alternative hypervisors, containerisation pathways, and long-term total cost of ownership.',
    date: 'August 2026',
    authorRole: 'Infrastructure Modernisation Practice'
  }
];
