export interface ServiceItem {
  slug: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  category: string;
  image: string;
  platforms: string[];
  capabilities: string[];
  deliverables: string[];
}

export const servicesData: ServiceItem[] = [
  {
    slug: 'cloud-devops',
    title: 'Cloud and DevOps',
    category: 'Cloud Engineering',
    image: '/images/services/cloud-devops.jpg',
    shortSummary: 'Plan, migrate and manage public, hybrid and multi-cloud environments with automated CI/CD and cost awareness.',
    fullDescription: 'Nuberu delivers multi-cloud strategies built for performance, security and cost efficiency. From readiness assessment to live migration and automated release pipelines across AWS, Microsoft Azure and Google Cloud.',
    platforms: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Ansible', 'Jenkins', 'GitLab CI'],
    capabilities: [
      'Cloud readiness assessments and migration roadmap definition',
      'Multi-cloud architecture, landing zones and hybrid integration',
      'Infrastructure as Code (IaC) with Terraform and CloudFormation',
      'CI/CD automated build, test and deployment pipelines',
      'Cloud cost optimisation and rightsizing governance',
      'Cloud security posture management and audit compliance'
    ],
    deliverables: [
      'Cloud Architecture Blueprint',
      'Workload Migration Matrix',
      'Production Landing Zone',
      'Automated CI/CD Pipeline Suite',
      'Day 2 Operations Guide'
    ]
  },
  {
    slug: 'datacenter-infrastructure',
    title: 'Data Centre and Infrastructure',
    category: 'Core Infrastructure',
    image: '/images/services/datacenter-infrastructure.jpg',
    shortSummary: 'Assess, design and modernise on-premises and data centre environments with enterprise resilience and automated management.',
    fullDescription: 'We engineer resilient data centre foundations that serve as the backbone for mission-critical enterprise systems. From server and storage virtualisation to power, capacity modeling, and automated commissioning.',
    platforms: ['VMware ESXi', 'Hyper-V', 'KVM', 'Dell EMC', 'NetApp', 'HPE ProLiant', 'Pure Storage', 'Cisco'],
    capabilities: [
      'Infrastructure performance, scalability and security assessments',
      'Next-generation data centre blueprint and capacity planning',
      'Private cloud build with automated self-service provisioning',
      'Enterprise storage (SAN, NAS, Object) architecture and optimization',
      'Business continuity, backup retention and disaster recovery testing',
      'Hardware lifecycle, refresh planning and multi-vendor commissioning'
    ],
    deliverables: [
      'Data Centre Health & Capacity Audit',
      'Target Infrastructure Architecture',
      'Storage & Compute Sizing Model',
      'Automated Provisioning Playbooks',
      'Business Continuity & DR Plan'
    ]
  },
  {
    slug: 'container-platforms',
    title: 'Container Platforms',
    category: 'Cloud-Native',
    image: '/images/services/container-platforms.jpg',
    shortSummary: 'Design, deploy and operate Kubernetes and Red Hat OpenShift environments for modern application delivery and agility.',
    fullDescription: 'Enterprise Kubernetes architecture and Day 2 operational support. We implement hardened container platforms across bare metal, hybrid, and managed cloud clusters (EKS, AKS, GKE, ROSA).',
    platforms: ['Kubernetes', 'Red Hat OpenShift', 'SUSE Rancher', 'EKS', 'AKS', 'GKE', 'ROSA', 'NeuVector'],
    capabilities: [
      'Enterprise Kubernetes architecture, cluster sizing and deployment',
      'Red Hat OpenShift implementation, on-premises and cloud',
      'SUSE Rancher and multi-cluster Kubernetes management',
      'OpenShift Data Foundation and cluster lifecycle automation',
      'Cloud-native application packaging and microservices onboarding',
      'Container image vulnerability scanning and runtime protection'
    ],
    deliverables: [
      'Hardened Kubernetes/OpenShift Clusters',
      'GitOps Delivery Framework',
      'Cluster Security & Compliance Baseline',
      'Observability & Monitoring Dashboards',
      'Day 2 Operational Playbooks'
    ]
  },
  {
    slug: 'vmware-offramp',
    title: 'VMware Off Ramp and Virtualisation',
    category: 'Platform Migration',
    image: '/images/services/vmware-offramp.jpg',
    shortSummary: 'Structured workload audits, total cost of ownership comparisons, and planned migrations from legacy virtualisation.',
    fullDescription: 'Objective evaluation of virtualisation licensing, total cost of ownership, and workload compatibility. We engineer reliable migration pathways to alternative hypervisors, private clouds, or cloud-native container platforms.',
    platforms: ['VMware vSphere', 'Red Hat OpenShift Virtualization', 'Nutanix AHV', 'KVM', 'OpenStack', 'AWS', 'Azure'],
    capabilities: [
      'VMware inventory audit, dependency mapping and risk analysis',
      'TCO comparison and platform fit-gap evaluation',
      'Migration path design: OpenShift Virtualization, Nutanix, KVM or Cloud',
      'Pilot migration execution and workload validation',
      'Storage and networking translation for target hypervisors',
      'Operational handover and training for platform engineering teams'
    ],
    deliverables: [
      'VMware Fleet Compatibility Matrix',
      'Platform TCO & Cost Comparison Model',
      'Pilot Migration Validation Report',
      'Phased Cutover & Rollback Schedule',
      'Alternative Hypervisor Production Baseline'
    ]
  },
  {
    slug: 'application-modernisation',
    title: 'Application and Data Modernisation',
    category: 'Transformation',
    image: '/images/services/application-modernisation.jpg',
    shortSummary: 'Modernise legacy applications, refactor monolithic architectures, and connect enterprise systems through API-first patterns.',
    fullDescription: 'We help organisations evolve legacy applications into resilient, cloud-native services. Through strategic re-platforming, microservices decomposition, and database modernisation, we decouple business logic from aging infrastructure.',
    platforms: ['PostgreSQL', 'Oracle', 'MySQL', 'Node.js', 'Go', 'Java Spring', 'Kafka', 'Redis'],
    capabilities: [
      'Application portfolio assessment and 6R modernisation strategy',
      'Monolith-to-microservices refactoring and domain boundary mapping',
      'Database modernisation: legacy commercial engines to cloud-native open source',
      'Event-driven architecture and streaming data pipeline implementation',
      'API gateway design, service mesh integration and traffic management',
      'Zero-downtime cutover planning and legacy coexistence patterns'
    ],
    deliverables: [
      'Application Modernisation Roadmap',
      'Microservices Architecture Blueprint',
      'Database Migration & Validation Scripts',
      'Automated API & Integration Contracts',
      'Coexistence & Cutover Runbook'
    ]
  },
  {
    slug: 'security-devsecops',
    title: 'Security and DevSecOps',
    category: 'Security & Governance',
    image: '/images/services/security-devsecops.jpg',
    shortSummary: 'Embed automated security guardrails, policy enforcement, secret management and compliance reporting across all delivery phases.',
    fullDescription: 'Security engineered into the fabric of your infrastructure and pipelines. We implement continuous vulnerability scanning, zero-trust network boundaries, secrets lifecycle management and compliance automation.',
    platforms: ['HashiCorp Vault', 'NeuVector', 'Aqua Security', 'SonarQube', 'AWS Security Hub', 'Azure Defender'],
    capabilities: [
      'Pipeline security integration (SAST, DAST, dependency checking)',
      'Enterprise secrets management with HashiCorp Vault',
      'Container runtime security and admission control policies',
      'Zero-trust network segmentation and encrypted service-to-service transit',
      'Cloud security posture management (CSPM) and compliance automation',
      'Security incident playbooks and automated threat remediation'
    ],
    deliverables: [
      'DevSecOps Pipeline Hardening Suite',
      'Secrets Lifecycle & Vault Deployment',
      'Security Posture Baseline Report',
      'Compliance & Audit Dashboard',
      'Threat Response & Escalation Matrix'
    ]
  },
  {
    slug: 'managed-services',
    title: 'Managed Services',
    category: 'Operations',
    image: '/images/services/managed-services.jpg',
    shortSummary: 'Proactive 24/7 monitoring, incident resolution, patching, backup verification and continuous platform improvement.',
    fullDescription: 'Enterprise support that keeps your cloud, container, and infrastructure platforms operating at peak reliability. Our engineering-led operational models remove toil and prevent downtime.',
    platforms: ['Prometheus', 'Grafana', 'ELK Stack', 'Terraform', 'Ansible', 'PagerDuty', 'Kubernetes'],
    capabilities: [
      '24/7 platform monitoring, telemetry and anomaly detection',
      'Proactive incident response, root cause analysis and resolution',
      'Automated patching, vulnerability remediation and lifecycle management',
      'Backup validation, routine disaster recovery simulations and drills',
      'Performance tuning, capacity forecasting and monthly trend reviews',
      'Continuous architecture optimization and technical debt reduction'
    ],
    deliverables: [
      'Operational Service Level Agreement (SLA)',
      'Real-Time Observability & Alerting Stack',
      'Incident Management & Escalation Runbook',
      'Monthly Health & Optimization Reviews',
      'Continuous Reliability Roadmap'
    ]
  }
];
