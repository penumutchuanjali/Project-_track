import { Project, AlertItem, MinistrySummary, UserSession } from '../types';

export const INITIAL_USER: UserSession = {
  name: "Dr. Arvind Subramanian, IAS",
  email: "arvind.subramanian@nic.in",
  role: "Director General (Infrastructure Monitoring)",
  designation: "Additional Secretary to Govt. of India",
  department: "Cabinet Secretariat & MoSPI",
  lastLogin: "Today at 09:15 AM IST"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "P-101",
    name: "Delhi-Mumbai Expressway Phase-II (Vadodara-Kim Section)",
    ministry: "Ministry of Road Transport & Highways",
    department: "National Highways Authority of India (NHAI)",
    sector: "Highways & Expressways",
    location: {
      city: "Vadodara",
      state: "Gujarat",
      coordinates: [22.3072, 73.1812],
      mapRegion: "West",
      svgX: 30,
      svgY: 52
    },
    approvedCost: 8750,
    expenditure: 7120,
    physicalProgress: 88,
    financialProgress: 81.3,
    completionPercentage: 88,
    startDate: "2021-02-10",
    expectedCompletionDate: "2026-11-30",
    originalCompletionDate: "2025-06-30",
    delayMonths: 5,
    status: "On Track",
    riskLevel: "Low",
    stage: "Construction",
    projectDirector: "Er. Manoj K. Verma",
    contractor: "Larsen & Toubro Ltd. (Heavy Civil)",
    description: "8-lane access controlled greenfield expressway designed to reduce transit time between industrial corridors of Gujarat and Maharashtra, including wildlife overpasses and automated traffic management.",
    milestones: [
      { id: "M-101-1", title: "Land Acquisition (100% Right of Way)", targetDate: "2021-08-31", completionDate: "2021-08-15", status: "Completed", weightage: 20, details: "Full RoW acquired with direct benefit transfer to 1,420 landholders." },
      { id: "M-101-2", title: "Earthwork & Sub-grade Stabilization (125 km)", targetDate: "2022-12-15", completionDate: "2023-01-10", status: "Completed", weightage: 25, details: "Embankment and subgrade completed across all 3 packages." },
      { id: "M-101-3", title: "Major River Bridges (Narmada & Tapi Crossings)", targetDate: "2024-04-30", completionDate: "2024-05-18", status: "Completed", weightage: 25, details: "Cable-stayed bridge over Narmada load tested." },
      { id: "M-101-4", title: "Bituminous Paving & Rigid Pavement", targetDate: "2025-10-15", completionDate: "2025-11-05", status: "Completed", weightage: 20, details: "Concrete main carriageway laid on 118 out of 125 km." },
      { id: "M-101-5", title: "Toll Plaza & Smart Highway ITS Installation", targetDate: "2026-10-31", status: "Pending", weightage: 10, details: "Electronic toll collection gantries and fiber optic CCTV network installation underway." }
    ],
    documents: [
      { id: "DOC-101-1", name: "Detailed Project Report (DPR) Vol. 1-4", type: "PDF", uploadDate: "2020-11-12", fileSize: "42.8 MB", status: "Verified", category: "DPR" },
      { id: "DOC-101-2", name: "MoEFCC Environmental & Forest Clearance", type: "PDF", uploadDate: "2021-01-20", fileSize: "6.4 MB", status: "Verified", category: "Environmental" },
      { id: "DOC-101-3", name: "EPC Concession Agreement - Package 3", type: "PDF", uploadDate: "2021-03-05", fileSize: "18.2 MB", status: "Verified", category: "Tender" },
      { id: "DOC-101-4", name: "Quarterly Safety Audit Q2 2026", type: "PDF", uploadDate: "2026-06-30", fileSize: "4.1 MB", status: "Verified", category: "Technical" }
    ],
    risks: [
      { id: "RSK-101-1", title: "Monsoon soil saturation at Km 140-148", category: "Geological", severity: "Low", description: "Heavy rains caused localized subgrade settlement along Tapi floodplains.", mitigationPlan: "Geogrid reinforced embankment with stone column drainage installed.", assignedOfficer: "Dr. Sandeep Patel, SE", status: "Resolved", reportedDate: "2024-08-12" },
      { id: "RSK-101-2", title: "Supply chain bottleneck in asphalt binder grade VG-40", category: "Contractual", severity: "Medium", description: "Refinery scheduled maintenance in Koyali created short supply.", mitigationPlan: "Procured from BPCL Mumbai via rail rake quota.", assignedOfficer: "Anil Rawat, PD", status: "Resolved", reportedDate: "2025-02-14" }
    ],
    updates: [
      { id: "UPD-101-1", date: "2026-09-18", author: "Er. Manoj K. Verma", designation: "Project Director", summary: "Package 2 final wearing course completed. Signage and retroreflective cat-eyes installed.", type: "Inspection" },
      { id: "UPD-101-2", date: "2026-08-05", author: "Rajesh Chandra", designation: "Chief Quality Auditor", summary: "Third-party quality check passed roughness index criteria (IRI < 1.8 m/km).", type: "Milestone" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 76, actualProgress: 75, expenditure: 210 },
      { month: "May 2026", targetProgress: 79, actualProgress: 79, expenditure: 245 },
      { month: "Jun 2026", targetProgress: 82, actualProgress: 81, expenditure: 190 },
      { month: "Jul 2026", targetProgress: 84, actualProgress: 83, expenditure: 175 },
      { month: "Aug 2026", targetProgress: 86, actualProgress: 86, expenditure: 230 },
      { month: "Sep 2026", targetProgress: 89, actualProgress: 88, expenditure: 260 }
    ]
  },
  {
    id: "P-102",
    name: "Eastern Dedicated Freight Corridor (Sonnagar - Dankuni Rail Section)",
    ministry: "Ministry of Railways",
    department: "Dedicated Freight Corridor Corporation of India (DFCCIL)",
    sector: "Railways & Freight",
    location: {
      city: "Dankuni",
      state: "West Bengal",
      coordinates: [22.6845, 88.3056],
      mapRegion: "East",
      svgX: 74,
      svgY: 53
    },
    approvedCost: 12400,
    expenditure: 8950,
    physicalProgress: 61,
    financialProgress: 72.1,
    completionPercentage: 61,
    startDate: "2019-10-01",
    expectedCompletionDate: "2027-04-30",
    originalCompletionDate: "2024-12-31",
    delayMonths: 28,
    status: "Delayed",
    riskLevel: "High",
    stage: "Construction",
    projectDirector: "Shri S. K. Mukherjee",
    contractor: "Tata Projects - Aldesa Joint Venture",
    description: "538 km electrified double-line freight trunk designed for 25-tonne axle load and 100 km/h goods train speeds, connecting Jharkhand coalfields and West Bengal ports.",
    milestones: [
      { id: "M-102-1", title: "Alignment Survey & Land Transfer (Sonnagar-Gomoh)", targetDate: "2020-06-30", completionDate: "2021-02-15", status: "Completed", weightage: 15, details: "Delayed by land titles dispute in 4 tehsils." },
      { id: "M-102-2", title: "Gomoh - Dankuni Land Acquisition Package", targetDate: "2022-03-31", completionDate: "2023-09-30", status: "Completed", weightage: 20, details: "Required intervention from High Court and district collectors." },
      { id: "M-102-3", title: "Major Rail Over Bridge (ROB) & Sone River Viaduct", targetDate: "2024-03-31", completionDate: "2025-01-20", status: "Completed", weightage: 25, details: "Viaduct piers delayed by prolonged flooding." },
      { id: "M-102-4", title: "High-Tensile Track Laying & 2x25kV Overhead Electrification", targetDate: "2026-05-15", status: "Delayed", weightage: 25, details: "Crucial milestone is overdue by 4 months due to ballast shortage and civil contractor cashflow constraints." },
      { id: "M-102-5", title: "Automatic Block Signaling & SCADA Integration", targetDate: "2027-02-28", status: "Pending", weightage: 15, details: "Signaling towers awaiting track completion." }
    ],
    documents: [
      { id: "DOC-102-1", name: "Cabinet Committee on Economic Affairs (CCEA) Note", type: "PDF", uploadDate: "2019-08-10", fileSize: "12.4 MB", status: "Verified", category: "DPR" },
      { id: "DOC-102-2", name: "DFCCIL Electrification Scheme Design", type: "PDF", uploadDate: "2021-05-22", fileSize: "24.6 MB", status: "Verified", category: "Technical" },
      { id: "DOC-102-3", name: "Dispute Adjudication Board Interim Finding", type: "PDF", uploadDate: "2026-04-10", fileSize: "8.9 MB", status: "Pending Approval", category: "Contractual" }
    ],
    risks: [
      { id: "RSK-102-1", title: "Milestone M-102-4 is overdue by 120+ days", category: "Contractual", severity: "Critical", description: "OHE and track laying package has achieved only 48% against 75% target milestone.", mitigationPlan: "Mobilized 2 additional Plasser Track Machines and issued 14-day cure notice to JV.", assignedOfficer: "Shri S. K. Mukherjee, ED", status: "Active", reportedDate: "2026-05-20" },
      { id: "RSK-102-2", title: "Pending forest diversion clearance in 14.2 km corridor", category: "Environmental Clearance", severity: "High", description: "Stage-II forest nod pending with State Forest Advisory Committee.", mitigationPlan: "Joint site inspection scheduled with State Principal Chief Conservator of Forests.", assignedOfficer: "R. B. Singh, DGM", status: "Active", reportedDate: "2026-02-11" }
    ],
    updates: [
      { id: "UPD-102-1", date: "2026-09-15", author: "Shri S. K. Mukherjee", designation: "Project Director", summary: "High-level review meeting held with Railway Board. Penalty clause under EPC contract invoked for delay.", type: "Notice" },
      { id: "UPD-102-2", date: "2026-08-22", author: "K. N. Murthy", designation: "Technical Advisor", summary: "Track linking completed on 38 km Gomoh-Koderma stretch.", type: "Milestone" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 56, actualProgress: 53, expenditure: 140 },
      { month: "May 2026", targetProgress: 60, actualProgress: 55, expenditure: 155 },
      { month: "Jun 2026", targetProgress: 64, actualProgress: 57, expenditure: 120 },
      { month: "Jul 2026", targetProgress: 68, actualProgress: 58, expenditure: 110 },
      { month: "Aug 2026", targetProgress: 72, actualProgress: 60, expenditure: 135 },
      { month: "Sep 2026", targetProgress: 75, actualProgress: 61, expenditure: 160 }
    ]
  },
  {
    id: "P-103",
    name: "Noida International Greenfield Airport (Jewar Phase-I)",
    ministry: "Ministry of Civil Aviation",
    department: "Yamuna International Airport Pvt Ltd / AAI",
    sector: "Aviation & Airports",
    location: {
      city: "Jewar, Gautam Buddha Nagar",
      state: "Uttar Pradesh",
      coordinates: [28.1725, 77.5855],
      mapRegion: "North",
      svgX: 37,
      svgY: 34
    },
    approvedCost: 10056,
    expenditure: 8820,
    physicalProgress: 94,
    financialProgress: 87.7,
    completionPercentage: 94,
    startDate: "2021-08-15",
    expectedCompletionDate: "2026-11-15",
    originalCompletionDate: "2025-09-30",
    delayMonths: 14,
    status: "On Track",
    riskLevel: "Medium",
    stage: "Construction",
    projectDirector: "Dr. Arun Vir Singh, IAS",
    contractor: "Tata Projects Ltd. (EPC Concessionaire)",
    description: "Multi-modal international aerotropolis featuring 3,900m Code-F runway, 12 million passenger terminal, integrated baggage handling, and direct connection to Yamuna Expressway.",
    milestones: [
      { id: "M-103-1", title: "Primary Runway 10/28 Asphalt & Lighting", targetDate: "2024-03-31", completionDate: "2024-04-12", status: "Completed", weightage: 30, details: "Runway paved and Cat-III instrument landing system installed." },
      { id: "M-103-2", title: "Passenger Terminal Building (T1 Structural Works)", targetDate: "2024-11-30", completionDate: "2025-02-18", status: "Completed", weightage: 30, details: "Translucent curved roof structure and glass curtain wall erected." },
      { id: "M-103-3", title: "Air Traffic Control (ATC) Tower Commissioning", targetDate: "2025-08-31", completionDate: "2025-09-20", status: "Completed", weightage: 20, details: "38m high tower with Raytheon radar and communications integration." },
      { id: "M-103-4", title: "DGCA Calibration & Proving Flights", targetDate: "2026-10-15", status: "Pending", weightage: 10, details: "Calibration flight by Beechcraft Super King Air successfully held; scheduled carrier proving flights next." },
      { id: "M-103-5", title: "Commercial Aerodrome Licensing & Inauguration", targetDate: "2026-11-15", status: "Pending", weightage: 10, details: "Final security clearance by BCAS in progress." }
    ],
    documents: [
      { id: "DOC-103-1", name: "Concession Agreement YIAPL & Govt of UP", type: "PDF", uploadDate: "2020-10-07", fileSize: "31.2 MB", status: "Verified", category: "Tender" },
      { id: "DOC-103-2", name: "DGCA Aerodrome Technical Clearance", type: "PDF", uploadDate: "2023-12-14", fileSize: "5.7 MB", status: "Verified", category: "Technical" }
    ],
    risks: [
      { id: "RSK-103-1", title: "BCAS security manpower deployment timeline", category: "Contractual", severity: "Medium", description: "CISF induction and biometric DigiYatra enrollment hardware finalization.", mitigationPlan: "Tripartite coordination committee meeting held with Home Ministry.", assignedOfficer: "Dr. Arun Vir Singh", status: "Active", reportedDate: "2026-07-10" }
    ],
    updates: [
      { id: "UPD-103-1", date: "2026-09-22", author: "Dr. Arun Vir Singh", designation: "CEO YIAPL", summary: "Terminal 1 baggage carousel trials operated at 100% capacity with 0 error rate.", type: "Inspection" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 88, actualProgress: 87, expenditure: 320 },
      { month: "May 2026", targetProgress: 90, actualProgress: 89, expenditure: 290 },
      { month: "Jun 2026", targetProgress: 91, actualProgress: 90, expenditure: 260 },
      { month: "Jul 2026", targetProgress: 92, actualProgress: 92, expenditure: 240 },
      { month: "Aug 2026", targetProgress: 93, actualProgress: 93, expenditure: 210 },
      { month: "Sep 2026", targetProgress: 95, actualProgress: 94, expenditure: 195 }
    ]
  },
  {
    id: "P-104",
    name: "Zojila Tunnel Project (14.15 km All-Weather Pass)",
    ministry: "Ministry of Road Transport & Highways",
    department: "National Highways and Infrastructure Development Corp (NHIDCL)",
    sector: "Strategic Tunnels & Defense",
    location: {
      city: "Drass / Kargil",
      state: "Ladakh (UT)",
      coordinates: [34.2818, 75.4740],
      mapRegion: "North",
      svgX: 34,
      svgY: 13
    },
    approvedCost: 6800,
    expenditure: 4450,
    physicalProgress: 52,
    financialProgress: 65.4,
    completionPercentage: 52,
    startDate: "2020-10-15",
    expectedCompletionDate: "2027-10-31",
    originalCompletionDate: "2026-12-31",
    delayMonths: 10,
    status: "At Risk",
    riskLevel: "High",
    stage: "Construction",
    projectDirector: "Brig. Harish Dobhal, VSM",
    contractor: "Megha Engineering & Infrastructures Ltd (MEIL)",
    description: "14.15 km horseshoe-shaped tunnel under Zojila pass at 11,578 ft elevation on NH-1, cutting Srinagar-Leh transit from 3.5 hours to 15 minutes with round-the-year accessibility.",
    milestones: [
      { id: "M-104-1", title: "Approach Roads & Avalanche Protection Sheds", targetDate: "2022-09-30", completionDate: "2023-06-15", status: "Completed", weightage: 20, details: "Pre-stressed concrete avalanche cut-and-cover gallery completed." },
      { id: "M-104-2", title: "Drass Portal Heading Excavation (5.2 km)", targetDate: "2024-06-30", completionDate: "2024-11-20", status: "Completed", weightage: 25, details: "NATM tunneling through brittle granite formation." },
      { id: "M-104-3", title: "Baltal Portal Heading & Cavity Stabilization", targetDate: "2025-12-31", status: "Delayed", weightage: 30, details: "Major water ingress (80 l/sec) and fault zone collapse delayed excavation by 6 months." },
      { id: "M-104-4", title: "Ventilation Shaft, Escape Tunnel & Break-through", targetDate: "2026-12-31", status: "Pending", weightage: 15, details: "Vertical ventilation shafts 380m depth under drilling." },
      { id: "M-104-5", title: "Electro-Mechanical, Fire Supression & SCADA", targetDate: "2027-09-30", status: "Pending", weightage: 10, details: "Tender award for jet fans and telemetry sensors." }
    ],
    documents: [
      { id: "DOC-104-1", name: "Geotechnical Fault Line Assessment by Swiss Tunnel Experts", type: "PDF", uploadDate: "2021-04-18", fileSize: "54.0 MB", status: "Verified", category: "Technical" },
      { id: "DOC-104-2", name: "Revised Geological Cost Escalation Claim", type: "PDF", uploadDate: "2026-03-12", fileSize: "14.5 MB", status: "Pending Approval", category: "Financial" }
    ],
    risks: [
      { id: "RSK-104-1", title: "Water ingress & thrust fault shear zone at Km 8.4", category: "Geological", severity: "Critical", description: "Encountered high pressure underground water table requiring pressure grouting.", mitigationPlan: "Deployed chemical micro-cement grouting umbrellas and advanced probe drilling.", assignedOfficer: "Col. P. K. Rawal", status: "Active", reportedDate: "2026-01-18" },
      { id: "RSK-104-2", title: "Sub-zero winter working shutdown (4 months/yr)", category: "Environmental Clearance", severity: "High", description: "Temperatures plummeting below -25°C restrict concrete batching.", mitigationPlan: "Heated enclosed batching plants with steam cured tunnel lining.", assignedOfficer: "Brig. Harish Dobhal", status: "Active", reportedDate: "2025-11-04" }
    ],
    updates: [
      { id: "UPD-104-1", date: "2026-09-08", author: "Brig. Harish Dobhal", designation: "Executive Director NHIDCL", summary: "Total 8.9 km heading out of 14.15 km daylight achieved across both portals.", type: "Inspection" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 48, actualProgress: 46, expenditure: 180 },
      { month: "May 2026", targetProgress: 51, actualProgress: 48, expenditure: 210 },
      { month: "Jun 2026", targetProgress: 54, actualProgress: 49, expenditure: 230 },
      { month: "Jul 2026", targetProgress: 57, actualProgress: 50, expenditure: 195 },
      { month: "Aug 2026", targetProgress: 60, actualProgress: 51, expenditure: 185 },
      { month: "Sep 2026", targetProgress: 63, actualProgress: 52, expenditure: 220 }
    ]
  },
  {
    id: "P-105",
    name: "Mumbai Coastal Road Project (South - Marine Drive to Worli)",
    ministry: "Ministry of Housing & Urban Affairs",
    department: "Brihanmumbai Municipal Corporation (BMC)",
    sector: "Urban Infrastructure & Expressways",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: [18.9750, 72.8258],
      mapRegion: "West",
      svgX: 28,
      svgY: 62
    },
    approvedCost: 12721,
    expenditure: 12540,
    physicalProgress: 100,
    financialProgress: 98.6,
    completionPercentage: 100,
    startDate: "2018-12-01",
    expectedCompletionDate: "2026-07-31",
    originalCompletionDate: "2023-11-30",
    delayMonths: 32,
    status: "Completed",
    riskLevel: "Low",
    stage: "Completed",
    projectDirector: "Dr. Iqbal Singh Chahal, IAS",
    contractor: "Larsen & Toubro & HCC-HDC JV",
    description: "10.58 km high-speed coastal freeway including India's first undersea road tunnels (2.07 km each) drilled using 12.19m diameter mega TBM 'Mavala', connecting Marine Drive with Bandra-Worli Sea Link.",
    milestones: [
      { id: "M-105-1", title: "Land Reclamation & Sea Wall Armouring (111 Hectares)", targetDate: "2021-06-30", completionDate: "2021-08-14", status: "Completed", weightage: 25, details: "Geotextile tubes and rock armour boulders placed to protect against Arabian Sea waves." },
      { id: "M-105-2", title: "Twin Undersea Tunnel Boring (TBM Mavala)", targetDate: "2023-05-31", completionDate: "2023-06-02", status: "Completed", weightage: 35, details: "Both tunnels successfully excavated 20m beneath Malabar Hill." },
      { id: "M-105-3", title: "Interchange Bridges at Breach Candy, Haji Ali & Worli", targetDate: "2024-02-28", completionDate: "2024-03-10", status: "Completed", weightage: 20, details: "Bowstring girder arch connected seamlessly to Bandra-Worli Sea Link." },
      { id: "M-105-4", title: "Open-to-Traffic Northbound & Southbound Carriageway", targetDate: "2026-07-31", completionDate: "2026-07-28", status: "Completed", weightage: 20, details: "Fully commissioned with zero-emission tunnel ventilation and SCADA control." }
    ],
    documents: [
      { id: "DOC-105-1", name: "Supreme Court Cleared Environmental Compliance Report", type: "PDF", uploadDate: "2020-02-15", fileSize: "22.3 MB", status: "Verified", category: "Environmental" },
      { id: "DOC-105-2", name: "Final Completion & Safety Audit Certificate", type: "PDF", uploadDate: "2026-07-25", fileSize: "8.1 MB", status: "Verified", category: "Technical" }
    ],
    risks: [
      { id: "RSK-105-1", title: "Post-commissioning monsoon storm-water drainage", category: "Geological", severity: "Low", description: "Testing high-capacity submersible pumps during high tide.", mitigationPlan: "Automated sluice gates and 12 pump stations active.", assignedOfficer: "Er. Amit Ghodke", status: "Resolved", reportedDate: "2026-07-15" }
    ],
    updates: [
      { id: "UPD-105-1", date: "2026-08-01", author: "Dr. Iqbal Singh Chahal", designation: "Municipal Commissioner", summary: "Project officially dedicated to the nation. Average travel time reduced from 50 min to 10 min.", type: "Notice" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 97, actualProgress: 97, expenditure: 190 },
      { month: "May 2026", targetProgress: 98, actualProgress: 98, expenditure: 160 },
      { month: "Jun 2026", targetProgress: 99, actualProgress: 99, expenditure: 140 },
      { month: "Jul 2026", targetProgress: 100, actualProgress: 100, expenditure: 110 },
      { month: "Aug 2026", targetProgress: 100, actualProgress: 100, expenditure: 40 },
      { month: "Sep 2026", targetProgress: 100, actualProgress: 100, expenditure: 15 }
    ]
  },
  {
    id: "P-106",
    name: "Vadhavan Mega Deep-Sea Port Container Terminal",
    ministry: "Ministry of Ports, Shipping and Waterways",
    department: "Jawaharlal Nehru Port Authority (JNPA)",
    sector: "Ports & Maritime",
    location: {
      city: "Dahanu / Palghar",
      state: "Maharashtra",
      coordinates: [19.9833, 72.7167],
      mapRegion: "West",
      svgX: 27,
      svgY: 59
    },
    approvedCost: 76220,
    expenditure: 14250,
    physicalProgress: 18,
    financialProgress: 18.7,
    completionPercentage: 18,
    startDate: "2024-03-01",
    expectedCompletionDate: "2030-03-31",
    originalCompletionDate: "2029-12-31",
    delayMonths: 3,
    status: "On Track",
    riskLevel: "Medium",
    stage: "Tender",
    projectDirector: "Shri Unmesh Sharad Wagh, IRS",
    contractor: "International Dredging & Marine JV (Phase 1)",
    description: "All-weather Greenfield deep draft port with natural 20-meter draft to handle largest container ships up to 24,000 TEU, handling 298 million metric tonnes per annum.",
    milestones: [
      { id: "M-106-1", title: "Union Cabinet Approval & In-Principle Clearance", targetDate: "2024-06-30", completionDate: "2024-06-19", status: "Completed", weightage: 15, details: "CCEA granted ₹76,220 Cr financial sanction." },
      { id: "M-106-2", title: "Offshore Breakwater Construction (10.1 km)", targetDate: "2026-08-31", completionDate: "2026-08-20", status: "Completed", weightage: 20, details: "Dredging and tetrapod armour placement on primary breakwater." },
      { id: "M-106-3", title: "Terminal-1 Dredging & Reclamation of 1,448 Hectares", targetDate: "2027-12-31", status: "Pending", weightage: 25, details: "Trailing suction hopper dredgers deployed from Rotterdam." },
      { id: "M-106-4", title: "Dedicated 32 km Rail Line & 8-lane Expressway Link", targetDate: "2028-12-31", status: "Pending", weightage: 20, details: "Joint venture with Dedicated Freight Corridor Corporation." },
      { id: "M-106-5", title: "Quay Cranes & Automated Container Yard", targetDate: "2030-03-31", status: "Pending", weightage: 20, details: "Super Post-Panamax STS crane procurement tender published." }
    ],
    documents: [
      { id: "DOC-106-1", name: "National Environmental Engineering Research Institute (NEERI) EIA", type: "PDF", uploadDate: "2023-09-10", fileSize: "68.4 MB", status: "Verified", category: "Environmental" },
      { id: "DOC-106-2", name: "Global EOI for Container Terminal Berth Operator", type: "PDF", uploadDate: "2025-11-20", fileSize: "19.2 MB", status: "Verified", category: "Tender" }
    ],
    risks: [
      { id: "RSK-106-1", title: "Local artisanal fishing community rehabilitation package", category: "Land Acquisition", severity: "Medium", description: "Livelihood support corpus demanded for 4,200 fishing families.", mitigationPlan: "Approved ₹1,200 Cr specialized welfare trust and alternative landing jetties.", assignedOfficer: "Shri S. V. Gaikwad", status: "Active", reportedDate: "2026-04-12" }
    ],
    updates: [
      { id: "UPD-106-1", date: "2026-09-11", author: "Shri Unmesh Sharad Wagh", designation: "Chairman JNPA", summary: "Global competitive bids opened for first phase reclamation worth ₹12,000 Cr.", type: "Notice" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 14, actualProgress: 14, expenditure: 450 },
      { month: "May 2026", targetProgress: 15, actualProgress: 15, expenditure: 480 },
      { month: "Jun 2026", targetProgress: 16, actualProgress: 16, expenditure: 520 },
      { month: "Jul 2026", targetProgress: 17, actualProgress: 17, expenditure: 490 },
      { month: "Aug 2026", targetProgress: 18, actualProgress: 18, expenditure: 560 },
      { month: "Sep 2026", targetProgress: 19, actualProgress: 18, expenditure: 610 }
    ]
  },
  {
    id: "P-107",
    name: "Khavda Ultra Mega Renewable Energy Park (30 GW Solar-Wind)",
    ministry: "Ministry of Power & New and Renewable Energy",
    department: "Gujarat State Electricity Corp / SECI",
    sector: "Renewable Energy & Solar",
    location: {
      city: "Khavda, Kutch",
      state: "Gujarat",
      coordinates: [23.8500, 69.7333],
      mapRegion: "West",
      svgX: 23,
      svgY: 48
    },
    approvedCost: 150000,
    expenditure: 68500,
    physicalProgress: 46,
    financialProgress: 45.7,
    completionPercentage: 46,
    startDate: "2022-01-15",
    expectedCompletionDate: "2028-12-31",
    originalCompletionDate: "2027-12-31",
    delayMonths: 12,
    status: "On Track",
    riskLevel: "Medium",
    stage: "Construction",
    projectDirector: "Er. Rameshwar Jha",
    contractor: "Adani Green Energy / NTPC Renewable Energy",
    description: "World's largest hybrid renewable energy project spread across 726 sq km in Rann of Kutch wasteland, generating 30,000 MW clean electricity to power 16 million homes.",
    milestones: [
      { id: "M-107-1", title: "Land Allocation & Border Fencing (72,600 Hectares)", targetDate: "2022-08-31", completionDate: "2022-09-14", status: "Completed", weightage: 15, details: "Clearance obtained from Ministry of Home Affairs due to border proximity." },
      { id: "M-107-2", title: "765kV High Voltage Evacuation Substation 1 & 2", targetDate: "2024-03-31", completionDate: "2024-04-10", status: "Completed", weightage: 25, details: "POWERGRID commissioned 765/400kV pooling stations." },
      { id: "M-107-3", title: "Phase 1: 10,000 MW Module Mounting & Tracker Arrays", targetDate: "2025-12-31", completionDate: "2026-03-20", status: "Completed", weightage: 30, details: "Bifacial glass-on-glass monocrystalline PV modules commissioned." },
      { id: "M-107-4", title: "Phase 2: 12,000 MW Solar & 3,000 MW Wind Turbines", targetDate: "2027-06-30", status: "Pending", weightage: 20, details: "Foundations for 5.2 MW wind turbine generators under piling." },
      { id: "M-107-5", title: "Phase 3: Battery Energy Storage System (BESS 2 GWh)", targetDate: "2028-12-31", status: "Pending", weightage: 10, details: "Battery container tender under technical evaluation." }
    ],
    documents: [
      { id: "DOC-107-1", name: "Grid Interconnection Feasibility Study (CTU)", type: "PDF", uploadDate: "2022-03-10", fileSize: "15.4 MB", status: "Verified", category: "Technical" },
      { id: "DOC-107-2", name: "Power Purchase Agreement with SECI 25 Years", type: "PDF", uploadDate: "2023-01-18", fileSize: "28.1 MB", status: "Verified", category: "Financial" }
    ],
    risks: [
      { id: "RSK-107-1", title: "Great Indian Bustard (GIB) underground cabling mandate", category: "Environmental Clearance", severity: "High", description: "Supreme Court directive requiring bird diverters and underground lines for transmission corridors.", mitigationPlan: "Installed dynamic LED bird flight diverters on 2,400 towers.", assignedOfficer: "Er. Rameshwar Jha", status: "Active", reportedDate: "2025-06-19" }
    ],
    updates: [
      { id: "UPD-107-1", date: "2026-09-20", author: "SECI Monitoring Cell", designation: "Chief Engineer", summary: "Cumulative commissioned capacity reached 13,800 MW as of this week.", type: "Milestone" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 41, actualProgress: 41, expenditure: 1200 },
      { month: "May 2026", targetProgress: 42, actualProgress: 42, expenditure: 1450 },
      { month: "Jun 2026", targetProgress: 43, actualProgress: 43, expenditure: 1380 },
      { month: "Jul 2026", targetProgress: 44, actualProgress: 44, expenditure: 1520 },
      { month: "Aug 2026", targetProgress: 45, actualProgress: 45, expenditure: 1650 },
      { month: "Sep 2026", targetProgress: 47, actualProgress: 46, expenditure: 1710 }
    ]
  },
  {
    id: "P-108",
    name: "Delhi-Meerut Regional Rapid Transit System (Namo Bharat RRTS)",
    ministry: "Ministry of Housing & Urban Affairs",
    department: "National Capital Region Transport Corp (NCRTC)",
    sector: "Urban Rail & Metro",
    location: {
      city: "Ghaziabad / Meerut",
      state: "Uttar Pradesh & Delhi",
      coordinates: [28.6692, 77.4538],
      mapRegion: "North",
      svgX: 38,
      svgY: 33
    },
    approvedCost: 30274,
    expenditure: 27950,
    physicalProgress: 92,
    financialProgress: 92.3,
    completionPercentage: 92,
    startDate: "2019-06-01",
    expectedCompletionDate: "2026-12-31",
    originalCompletionDate: "2025-06-30",
    delayMonths: 18,
    status: "On Track",
    riskLevel: "Low",
    stage: "Construction",
    projectDirector: "Shri Shalabh Goel, IRSEE",
    contractor: "Alstom Transport & Larsen & Toubro",
    description: "82.15 km semi-high-speed rail corridor operating at 160 km/h, reducing Delhi Sarai Kale Khan to Meerut Modipuram journey to under 55 minutes with ETCS Level-2 signaling.",
    milestones: [
      { id: "M-108-1", title: "Priority Section Commissioning (Sahibabad-Duhai 17 km)", targetDate: "2023-10-31", completionDate: "2023-10-20", status: "Completed", weightage: 30, details: "Commissioned by Prime Minister with 8 state-of-the-art trainsets." },
      { id: "M-108-2", title: "Duhai to Modinagar North Section (17 km)", targetDate: "2024-03-31", completionDate: "2024-03-06", status: "Completed", weightage: 25, details: "Commercial operations initiated with positive commuter response." },
      { id: "M-108-3", title: "Underground Tunnels & Anand Vihar Multi-Modal Hub", targetDate: "2025-05-31", completionDate: "2025-08-15", status: "Completed", weightage: 20, details: "Tunneling completed beneath Yamuna riverbed and railway lines." },
      { id: "M-108-4", title: "Sarai Kale Khan to New Ashok Nagar Delhi Section", targetDate: "2026-10-31", status: "Pending", weightage: 15, details: "Viaduct spans erected over Ring Road and Barapullah; track laying 95% complete." },
      { id: "M-108-5", title: "Full Corridor Integration & Integrated Testing", targetDate: "2026-12-31", status: "Pending", weightage: 10, details: "Full corridor dynamic speed trials at 180 km/h." }
    ],
    documents: [
      { id: "DOC-108-1", name: "Detailed Project Report RRTS Phase 1 Corridors", type: "PDF", uploadDate: "2018-09-14", fileSize: "36.2 MB", status: "Verified", category: "DPR" },
      { id: "DOC-108-2", name: "Asian Development Bank (ADB) Loan Disbursement Audit", type: "PDF", uploadDate: "2026-05-12", fileSize: "7.8 MB", status: "Verified", category: "Financial" }
    ],
    risks: [
      { id: "RSK-108-1", title: "Sarai Kale Khan bus terminus traffic diversion coordination", category: "Utility Shifting", severity: "Low", description: "Traffic bottlenecks during night-time girder launching.", mitigationPlan: "Special permissions with Delhi Traffic Police for rolling night blocks.", assignedOfficer: "Sanjay Sharma, CPM", status: "Resolved", reportedDate: "2026-04-10" }
    ],
    updates: [
      { id: "UPD-108-1", date: "2026-09-24", author: "Shri Shalabh Goel", designation: "Managing Director NCRTC", summary: "Third-rail electrification charged between Anand Vihar and New Ashok Nagar.", type: "Milestone" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 84, actualProgress: 84, expenditure: 410 },
      { month: "May 2026", targetProgress: 86, actualProgress: 86, expenditure: 390 },
      { month: "Jun 2026", targetProgress: 88, actualProgress: 87, expenditure: 440 },
      { month: "Jul 2026", targetProgress: 90, actualProgress: 89, expenditure: 480 },
      { month: "Aug 2026", targetProgress: 91, actualProgress: 91, expenditure: 430 },
      { month: "Sep 2026", targetProgress: 93, actualProgress: 92, expenditure: 460 }
    ]
  },
  {
    id: "P-109",
    name: "Bengaluru Metro Rail Phase-2B (Airport Link Corridor)",
    ministry: "Ministry of Housing & Urban Affairs",
    department: "Bangalore Metro Rail Corp Ltd (BMRCL)",
    sector: "Urban Rail & Metro",
    location: {
      city: "Bengaluru",
      state: "Karnataka",
      coordinates: [12.9716, 77.5946],
      mapRegion: "South",
      svgX: 38,
      svgY: 82
    },
    approvedCost: 10584,
    expenditure: 5980,
    physicalProgress: 54,
    financialProgress: 56.5,
    completionPercentage: 54,
    startDate: "2021-04-01",
    expectedCompletionDate: "2027-06-30",
    originalCompletionDate: "2025-12-31",
    delayMonths: 18,
    status: "Delayed",
    riskLevel: "High",
    stage: "Construction",
    projectDirector: "Shri M. Maheshwar Rao, IAS",
    contractor: "NCC Ltd / Afcons Infrastructure",
    description: "38.44 km elevated metro line connecting Kasturi Nagar (Blue Line) to Kempegowda International Airport with 17 stations along NH-44 highway corridor.",
    milestones: [
      { id: "M-109-1", title: "Utility Shifting & Gas/Water Pipeline Realignment", targetDate: "2022-09-30", completionDate: "2023-04-15", status: "Completed", weightage: 15, details: "Major BWSSB 1500mm water main relocated along airport expressway." },
      { id: "M-109-2", title: "Pier Foundation & Sub-structure Piling (1,280 Piers)", targetDate: "2024-06-30", completionDate: "2024-11-20", status: "Completed", weightage: 30, details: "Piers completed up to Yelahanka station." },
      { id: "M-109-3", title: "Viaduct U-Girder Launching (38 km)", targetDate: "2025-10-31", status: "Delayed", weightage: 25, details: "Delayed by traffic diversion restrictions and casting yard capacity." },
      { id: "M-109-4", title: "Airport Terminal Underpass & Subterranean Station", targetDate: "2026-12-31", status: "Pending", weightage: 20, details: "Excavation inside airport perimeter under strict security protocols." },
      { id: "M-109-5", title: "Signaling (CBTC) & Rolling Stock Commissioning", targetDate: "2027-05-31", status: "Pending", weightage: 10, details: "Driverless trains tender awarded to BEML." }
    ],
    documents: [
      { id: "DOC-109-1", name: "BMRCL Phase 2B Sanction Order MoHUA", type: "PDF", uploadDate: "2021-03-25", fileSize: "8.4 MB", status: "Verified", category: "DPR" },
      { id: "DOC-109-2", name: "JICA Financial Co-financing Agreement", type: "PDF", uploadDate: "2021-11-10", fileSize: "14.2 MB", status: "Verified", category: "Financial" }
    ],
    risks: [
      { id: "RSK-109-1", title: "Hebbal flyover multi-tier interchange integration delay", category: "Contractual", severity: "High", description: "Design clash between proposed NHAI elevated corridor and BMRCL viaduct level.", mitigationPlan: "Joint integrated design finalized by IISc Bangalore review panel.", assignedOfficer: "Shri M. Maheshwar Rao", status: "Active", reportedDate: "2026-03-15" }
    ],
    updates: [
      { id: "UPD-109-1", date: "2026-09-02", author: "BMRCL Chief Engineer", designation: "Chief Project Manager", summary: "Completed 740 spans of U-girders out of 1,120 total spans.", type: "Inspection" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 49, actualProgress: 47, expenditure: 180 },
      { month: "May 2026", targetProgress: 52, actualProgress: 49, expenditure: 195 },
      { month: "Jun 2026", targetProgress: 55, actualProgress: 50, expenditure: 210 },
      { month: "Jul 2026", targetProgress: 58, actualProgress: 52, expenditure: 175 },
      { month: "Aug 2026", targetProgress: 61, actualProgress: 53, expenditure: 190 },
      { month: "Sep 2026", targetProgress: 64, actualProgress: 54, expenditure: 205 }
    ]
  },
  {
    id: "P-110",
    name: "Dibang Multipurpose Hydroelectric Project (2,880 MW)",
    ministry: "Ministry of Power & New and Renewable Energy",
    department: "NHPC Limited",
    sector: "Hydroelectric & Water Resources",
    location: {
      city: "Lower Dibang Valley",
      state: "Arunachal Pradesh",
      coordinates: [28.3200, 95.8300],
      mapRegion: "Northeast",
      svgX: 89,
      svgY: 33
    },
    approvedCost: 31876,
    expenditure: 8200,
    physicalProgress: 24,
    financialProgress: 25.7,
    completionPercentage: 24,
    startDate: "2023-02-27",
    expectedCompletionDate: "2032-02-28",
    originalCompletionDate: "2031-10-31",
    delayMonths: 4,
    status: "On Track",
    riskLevel: "Medium",
    stage: "Construction",
    projectDirector: "Er. Rajeev Sharma",
    contractor: "Larsen & Toubro (Concrete Dam Package)",
    description: "India's highest concrete gravity dam (278m height) generating 11,223 million units of electricity annually and providing crucial flood moderation for Brahmaputra valley.",
    milestones: [
      { id: "M-110-1", title: "Forest Stage-II Clearance & R&R Compensation", targetDate: "2023-09-30", completionDate: "2023-10-15", status: "Completed", weightage: 15, details: "Comprehensive afforestation in 5,000 hectares commenced." },
      { id: "M-110-2", title: "River Diversion Tunnels (Twin 12m Horse-shoe Tunnels)", targetDate: "2025-04-30", completionDate: "2025-05-10", status: "Completed", weightage: 20, details: "River Dibang diverted safely through left bank tunnels." },
      { id: "M-110-3", title: "Dam Abutment Excavation & Foundation Consolidation", targetDate: "2027-03-31", status: "Pending", weightage: 25, details: "Rock slope stabilization and tension anchor installation in progress." },
      { id: "M-110-4", title: "Roller Compacted Concrete (RCC) Placement (14 Million m³)", targetDate: "2030-06-30", status: "Pending", weightage: 25, details: "High-capacity chilled batching plants being erected." },
      { id: "M-110-5", title: "Underground Powerhouse (12 x 240 MW Francis Turbines)", targetDate: "2032-02-28", status: "Pending", weightage: 15, details: "Powerhouse cavern excavation underway." }
    ],
    documents: [
      { id: "DOC-110-1", name: "Central Electricity Authority (CEA) Techno-Economic Concurrence", type: "PDF", uploadDate: "2022-12-10", fileSize: "18.9 MB", status: "Verified", category: "Technical" }
    ],
    risks: [
      { id: "RSK-110-1", title: "Seismic Zone V ground acceleration design provisions", category: "Geological", severity: "Medium", description: "Dam design validated for peak ground acceleration of 0.45g.", mitigationPlan: "Dynamic seismic modeling validated with IIT Roorkee.", assignedOfficer: "Er. Rajeev Sharma", status: "Active", reportedDate: "2025-04-10" }
    ],
    updates: [
      { id: "UPD-110-1", date: "2026-08-29", author: "Er. Rajeev Sharma", designation: "Chief Project Director", summary: "Left bank diversion tunnel lined and hydrodynamic flow test completed.", type: "Inspection" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 20, actualProgress: 20, expenditure: 210 },
      { month: "May 2026", targetProgress: 21, actualProgress: 21, expenditure: 240 },
      { month: "Jun 2026", targetProgress: 22, actualProgress: 22, expenditure: 260 },
      { month: "Jul 2026", targetProgress: 23, actualProgress: 23, expenditure: 250 },
      { month: "Aug 2026", targetProgress: 24, actualProgress: 23, expenditure: 270 },
      { month: "Sep 2026", targetProgress: 25, actualProgress: 24, expenditure: 290 }
    ]
  },
  {
    id: "P-205",
    name: "Mumbai-Ahmedabad High Speed Rail Corridor (Bullet Train)",
    ministry: "Ministry of Railways",
    department: "National High Speed Rail Corp Ltd (NHSRCL)",
    sector: "High Speed Rail",
    location: {
      city: "Surat / Ahmedabad",
      state: "Gujarat & Maharashtra",
      coordinates: [21.1702, 72.8311],
      mapRegion: "West",
      svgX: 29,
      svgY: 55
    },
    approvedCost: 108000,
    expenditure: 89400,
    physicalProgress: 76,
    financialProgress: 82.8,
    completionPercentage: 76,
    startDate: "2018-09-01",
    expectedCompletionDate: "2027-08-15",
    originalCompletionDate: "2023-12-31",
    delayMonths: 44,
    status: "At Risk",
    riskLevel: "Critical",
    stage: "Construction",
    projectDirector: "Shri Vivek Kumar Gupta, IRSE",
    contractor: "Larsen & Toubro (C4/C6 packages) & Afcons JV",
    description: "508 km Shinkansen bullet train operating at 320 km/h, reducing 7-hour travel to 2 hours 7 minutes, featuring 21 km undersea tunnel in Mumbai creek and 12 stations.",
    milestones: [
      { id: "M-205-1", title: "Land Acquisition Gujarat (99.8%) & Maharashtra (99.5%)", targetDate: "2022-12-31", completionDate: "2023-03-15", status: "Completed", weightage: 20, details: "Overcoming severe urban land contestation in BKC and Palghar." },
      { id: "M-205-2", title: "Viaduct Superstructure & Full Span Launching (320 km)", targetDate: "2025-06-30", completionDate: "2025-10-18", status: "Completed", weightage: 30, details: "Piers and girder launching in Gujarat completed on fast-track basis." },
      { id: "M-205-3", title: "Bandra Kurla Complex (BKC) Underground Station", targetDate: "2026-03-31", status: "Delayed", weightage: 20, details: "Expenditure has crossed 82% of approved budget; civil works running 9 months behind schedule." },
      { id: "M-205-4", title: "Undersea 21 km Tunnel Boring (Thane Creek)", targetDate: "2026-11-30", status: "Delayed", weightage: 15, details: "TBM lowering shafts excavation encountered basalt hardness, reducing penetration rate." },
      { id: "M-205-5", title: "Shinkansen E5 Series Track Laying (J-Slab) & OHE", targetDate: "2027-06-30", status: "Pending", weightage: 15, details: "Japan Railway Track Consultants overseeing slab installation in Surat." }
    ],
    documents: [
      { id: "DOC-205-1", name: "JICA Bilateral Official Development Assistance Loan Agreement", type: "PDF", uploadDate: "2017-09-14", fileSize: "45.0 MB", status: "Verified", category: "Financial" },
      { id: "DOC-205-2", name: "Revised Cost Estimate & Currency Exchange Escalation Note", type: "PDF", uploadDate: "2026-07-02", fileSize: "16.8 MB", status: "Pending Approval", category: "Financial" }
    ],
    risks: [
      { id: "RSK-205-1", title: "Expenditure has crossed 82.8% of approved budget limit", category: "Financial", severity: "Critical", description: "Current spend ₹89,400 Cr against ₹108,000 Cr cap while major undersea tunnel and signaling contracts remain pending payment.", mitigationPlan: "Cabinet Committee on Economic Affairs (CCEA) revision proposal submitted for ₹1,25,000 Cr envelope.", assignedOfficer: "Shri Vivek Kumar Gupta, MD", status: "Active", reportedDate: "2026-08-10" },
      { id: "RSK-205-2", title: "Yen-Rupee exchange rate volatility impacting equipment import", category: "Financial", severity: "High", description: "Fluctuations in JPY exchange rates increased electrical rolling stock quotation prices.", mitigationPlan: "Ministry of Finance hedge swap arrangement under execution.", assignedOfficer: "R. K. Bansal, Director Finance", status: "Active", reportedDate: "2026-04-18" }
    ],
    updates: [
      { id: "UPD-205-1", date: "2026-09-25", author: "Shri Vivek Kumar Gupta", designation: "Managing Director NHSRCL", summary: "First 50 km trial section between Surat and Bilimora prepared for track trial run.", type: "Milestone" },
      { id: "UPD-205-2", date: "2026-09-01", author: "Ministry of Finance Auditor", designation: "Senior Comptroller", summary: "Formal alert issued regarding expenditure trajectory exceeding annual fiscal allocation.", type: "Notice" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 70, actualProgress: 68, expenditure: 1850 },
      { month: "May 2026", targetProgress: 72, actualProgress: 70, expenditure: 1980 },
      { month: "Jun 2026", targetProgress: 74, actualProgress: 72, expenditure: 2150 },
      { month: "Jul 2026", targetProgress: 77, actualProgress: 73, expenditure: 2240 },
      { month: "Aug 2026", targetProgress: 79, actualProgress: 75, expenditure: 2190 },
      { month: "Sep 2026", targetProgress: 81, actualProgress: 76, expenditure: 2310 }
    ]
  },
  {
    id: "P-301",
    name: "Great Nicobar Island Transshipment Port & Strategic Airport",
    ministry: "Ministry of Ports, Shipping and Waterways",
    department: "Andaman & Nicobar Islands Integrated Dev Corp (ANIIDCO)",
    sector: "Strategic Maritime & Defense",
    location: {
      city: "Galathea Bay",
      state: "Andaman & Nicobar Islands (UT)",
      coordinates: [7.0000, 93.8000],
      mapRegion: "South",
      svgX: 86,
      svgY: 92
    },
    approvedCost: 72000,
    expenditure: 12400,
    physicalProgress: 21,
    financialProgress: 17.2,
    completionPercentage: 21,
    startDate: "2023-01-15",
    expectedCompletionDate: "2026-12-15",
    originalCompletionDate: "2026-11-30",
    delayMonths: 1,
    status: "At Risk",
    riskLevel: "Critical",
    stage: "Construction",
    projectDirector: "Vice Admiral (Retd.) K. R. Nair",
    contractor: "APM Terminals / Indian Port Rail & Ropeway JV",
    description: "Holistic development of Great Nicobar featuring international container transshipment terminal, greenfield dual-use military-civilian airport, 450 MVA gas/solar power plant, and smart defense city.",
    milestones: [
      { id: "M-301-1", title: "Stage-1 Forest & Wildlife Diversion (130 sq km)", targetDate: "2023-11-30", completionDate: "2024-02-14", status: "Completed", weightage: 20, details: "National Green Tribunal clearance secured subject to leatherback turtle sanctuary safeguard." },
      { id: "M-301-2", title: "Galathea Bay Port Breakwater & Pioneer Jetty", targetDate: "2025-06-30", completionDate: "2025-11-05", status: "Completed", weightage: 25, details: "Temporary logistics jetty constructed to offload heavy earthmovers." },
      { id: "M-301-3", title: "Dual-Use Strategic Airbase Runway 1 (3,600m)", targetDate: "2026-10-31", status: "Delayed", weightage: 25, details: "Completion deadline is approaching within 45 days while physical progress is only 38% due to torrential monsoon." },
      { id: "M-301-4", title: "Deep Water Container Berths 1 & 2 (18m Draft)", targetDate: "2027-06-30", status: "Pending", weightage: 20, details: "Quay wall diaphragm construction." },
      { id: "M-301-5", title: "Independent Gas/Solar Hybrid Power Plant", targetDate: "2027-12-31", status: "Pending", weightage: 10, details: "Transmission line from Campbell Bay." }
    ],
    documents: [
      { id: "DOC-301-1", name: "High Powered Committee (HPC) Report on Island Ecology", type: "PDF", uploadDate: "2024-05-18", fileSize: "52.3 MB", status: "Verified", category: "Environmental" },
      { id: "DOC-301-2", name: "Strategic Defense & Coastal Surveillance Plan", type: "PDF", uploadDate: "2023-04-12", fileSize: "11.7 MB", status: "Verified", category: "Technical" }
    ],
    risks: [
      { id: "RSK-301-1", title: "Completion deadline is approaching for Airbase Runway 1", category: "Contractual", severity: "Critical", description: "Targeted completion date of Oct 31, 2026 faces impossible gap with only 38% airfield grading completed.", mitigationPlan: "Airlifting two additional aggregate crushing units via Indian Air Force C-17 aircraft.", assignedOfficer: "Vice Admiral K. R. Nair", status: "Active", reportedDate: "2026-08-28" },
      { id: "RSK-301-2", title: "Logistical bottleneck in shipping aggregate from mainland", category: "Contractual", severity: "High", description: "Severe cyclone weather halted merchant barges from Chennai port for 3 weeks.", mitigationPlan: "Contracted two 10,000 DWT specialized tug-barge units.", assignedOfficer: "S. K. Rao, GM Logistics", status: "Active", reportedDate: "2026-07-22" }
    ],
    updates: [
      { id: "UPD-301-1", date: "2026-09-21", author: "Vice Admiral K. R. Nair", designation: "Chief Executive Officer", summary: "Inter-ministerial emergency steering meeting held. Revised runway target proposed to Cabinet.", type: "Notice" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 18, actualProgress: 17, expenditure: 290 },
      { month: "May 2026", targetProgress: 20, actualProgress: 18, expenditure: 320 },
      { month: "Jun 2026", targetProgress: 22, actualProgress: 19, expenditure: 310 },
      { month: "Jul 2026", targetProgress: 24, actualProgress: 19, expenditure: 260 },
      { month: "Aug 2026", targetProgress: 26, actualProgress: 20, expenditure: 340 },
      { month: "Sep 2026", targetProgress: 28, actualProgress: 21, expenditure: 380 }
    ]
  },
  {
    id: "P-302",
    name: "Ken-Betwa River Link National Project",
    ministry: "Ministry of Jal Shakti",
    department: "National Water Development Agency (NWDA)",
    sector: "Water Resources & Irrigation",
    location: {
      city: "Chhatarpur / Panna",
      state: "Madhya Pradesh & Uttar Pradesh",
      coordinates: [24.9167, 79.9167],
      mapRegion: "Central",
      svgX: 47,
      svgY: 45
    },
    approvedCost: 44605,
    expenditure: 11200,
    physicalProgress: 32,
    financialProgress: 25.1,
    completionPercentage: 32,
    startDate: "2022-03-01",
    expectedCompletionDate: "2030-03-31",
    originalCompletionDate: "2029-12-31",
    delayMonths: 3,
    status: "On Track",
    riskLevel: "Medium",
    stage: "Construction",
    projectDirector: "Er. Bhopal Singh",
    contractor: "AFCONS - Patel Engineering JV",
    description: "Country's first river interlinking project transferring surplus water from Ken river in MP to water-deficit Betwa basin in Bundelkhand, irrigating 10.6 lakh hectares and drinking water for 62 lakh people.",
    milestones: [
      { id: "M-302-1", title: "Daudhan Dam Foundation & Coffer Dam Construction", targetDate: "2024-12-31", completionDate: "2025-02-10", status: "Completed", weightage: 25, details: "77m high composite concrete and rockfill dam foundation." },
      { id: "M-302-2", title: "Panna Tiger Reserve Wildlife Conservation Action Plan", targetDate: "2025-06-30", completionDate: "2025-08-20", status: "Completed", weightage: 20, details: "Landscape management plan implemented with Wildlife Institute of India." },
      { id: "M-302-3", title: "221 km Link Canal with 2 Tunnels (2.5 km & 1.9 km)", targetDate: "2027-12-31", status: "Pending", weightage: 30, details: "Excavation and lining of reach 1 and 2 underway." },
      { id: "M-302-4", title: "Lower Orr Dam, Kotha Barrage & Bina Complex", targetDate: "2029-03-31", status: "Pending", weightage: 15, details: "Downstream barrages civil construction." },
      { id: "M-302-5", title: "103 MW Hydropower & 27 MW Solar Plants", targetDate: "2030-03-31", status: "Pending", weightage: 10, details: "Turbine generator sets awarded." }
    ],
    documents: [
      { id: "DOC-302-1", name: "Ken-Betwa Link Project Memorandum of Agreement (MoA)", type: "PDF", uploadDate: "2021-03-22", fileSize: "14.1 MB", status: "Verified", category: "DPR" }
    ],
    risks: [
      { id: "RSK-302-1", title: "Submergence mitigation in Panna Core Habitat", category: "Environmental Clearance", severity: "Medium", description: "Reforestation of compensatory land in Nauradehi and Durgavati sanctuaries.", mitigationPlan: "Continuous monitoring by joint taskforce headed by Chief Wildlife Warden.", assignedOfficer: "Dr. K. S. Verma", status: "Active", reportedDate: "2026-05-14" }
    ],
    updates: [
      { id: "UPD-302-1", date: "2026-09-12", author: "Er. Bhopal Singh", designation: "Director General NWDA", summary: "Canal excavation reached 45 km mark with lining underway.", type: "Inspection" }
    ],
    monthlyProgress: [
      { month: "Apr 2026", targetProgress: 28, actualProgress: 28, expenditure: 310 },
      { month: "May 2026", targetProgress: 29, actualProgress: 29, expenditure: 340 },
      { month: "Jun 2026", targetProgress: 30, actualProgress: 30, expenditure: 320 },
      { month: "Jul 2026", targetProgress: 31, actualProgress: 31, expenditure: 290 },
      { month: "Aug 2026", targetProgress: 32, actualProgress: 32, expenditure: 330 },
      { month: "Sep 2026", targetProgress: 33, actualProgress: 32, expenditure: 350 }
    ]
  }
];

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: "ALT-001",
    projectId: "P-102",
    projectName: "Eastern Dedicated Freight Corridor (Sonnagar - Dankuni Rail Section)",
    type: "OVERDUE_MILESTONE",
    severity: "Critical",
    title: "Project P-102 milestone is overdue",
    description: "Milestone 'High-Tensile Track Laying & 2x25kV Overhead Electrification' target date May 15, 2026 passed over 120 days ago. Physical progress is lagging at 48% vs 75% target.",
    date: "2026-09-27",
    isRead: false,
    acknowledged: false,
    actionRequired: "Issue statutory penalty and summon JV executive committee."
  },
  {
    id: "ALT-002",
    projectId: "P-205",
    projectName: "Mumbai-Ahmedabad High Speed Rail Corridor (Bullet Train)",
    type: "EXPENSE_SPIKE",
    severity: "Critical",
    title: "Project P-205 expenditure has crossed 80% of approved budget",
    description: "Cumulative expenditure stands at ₹89,400 Cr (82.8% of ₹108,000 Cr sanction) while physical completion is at 76%. Major undersea tunneling and electrical contracts remain unbilled.",
    date: "2026-09-26",
    isRead: false,
    acknowledged: false,
    actionRequired: "Expedite CCEA cabinet memorandum for revised cost authorization."
  },
  {
    id: "ALT-003",
    projectId: "P-301",
    projectName: "Great Nicobar Island Transshipment Port & Strategic Airport",
    type: "DEADLINE_APPROACHING",
    severity: "Critical",
    title: "Project P-301 completion deadline is approaching",
    description: "Strategic Airbase Runway 1 target deadline is October 31, 2026 (under 35 days remaining) with only 38% physical leveling completed. Monsoonal weather continues to obstruct marine supply barges.",
    date: "2026-09-25",
    isRead: false,
    acknowledged: false,
    actionRequired: "Reconvene Inter-Ministerial Steering Committee for deadline recalibration."
  },
  {
    id: "ALT-004",
    projectId: "P-104",
    projectName: "Zojila Tunnel Project (14.15 km All-Weather Pass)",
    type: "DELAY",
    severity: "High",
    title: "Project progress is behind schedule",
    description: "Physical progress is 52% against planned target of 63% (11% negative gap). High pressure water ingress at Km 8.4 has constrained Natm tunneling output to 4m/day.",
    date: "2026-09-22",
    isRead: false,
    acknowledged: false,
    actionRequired: "Deploy high-capacity microfine cement grouting units from Srinagar base."
  },
  {
    id: "ALT-005",
    projectId: "P-109",
    projectName: "Bengaluru Metro Rail Phase-2B (Airport Link Corridor)",
    type: "COST_OVERRUN",
    severity: "High",
    title: "Cost overrun risk identified in multi-tier highway interchange",
    description: "Design collision at Hebbal Flyover junction requires structural elevation adjustment of 4 metro piers, generating ₹320 Cr estimated variation claim.",
    date: "2026-09-20",
    isRead: true,
    acknowledged: true,
    actionRequired: "Approve tripartite alignment MoU between NHAI, BMRCL and BBMP."
  },
  {
    id: "ALT-006",
    projectId: "P-101",
    projectName: "Delhi-Mumbai Expressway Phase-II (Vadodara-Kim Section)",
    type: "CLEARANCE",
    severity: "Info",
    title: "Statutory safety clearance received for Package 2",
    description: "National Road Safety Board verified the 68 km finished section. Ready for final Intelligent Traffic Management System (ITMS) integration.",
    date: "2026-09-18",
    isRead: true,
    acknowledged: true
  }
];

export const MINISTRY_CONFIG = [
  { name: "Ministry of Road Transport & Highways", shortName: "MoRTH", code: "MORTH", icon: "Truck" },
  { name: "Ministry of Railways", shortName: "Railways", code: "MOR", icon: "Train" },
  { name: "Ministry of Civil Aviation", shortName: "MoCA", code: "MOCA", icon: "Plane" },
  { name: "Ministry of Housing & Urban Affairs", shortName: "MoHUA", code: "MOHUA", icon: "Building2" },
  { name: "Ministry of Ports, Shipping and Waterways", shortName: "MoPSW", code: "MOPSW", icon: "Anchor" },
  { name: "Ministry of Power & New and Renewable Energy", shortName: "MoP / MNRE", code: "MNRE", icon: "Zap" },
  { name: "Ministry of Jal Shakti", shortName: "Jal Shakti", code: "MOJS", icon: "Droplets" }
];
