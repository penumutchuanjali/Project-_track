import { Project } from '../types';

export function exportProjectsToCSV(projects: Project[], filename = 'ProjectDrishti_Projects.csv') {
  const headers = [
    'Project ID',
    'Project Name',
    'Ministry',
    'Department',
    'Sector',
    'City',
    'State',
    'Approved Cost (Cr)',
    'Expenditure (Cr)',
    'Physical Progress (%)',
    'Financial Progress (%)',
    'Start Date',
    'Expected Completion Date',
    'Original Completion Date',
    'Delay (Months)',
    'Status',
    'Risk Level',
    'Project Stage'
  ];

  const rows = projects.map(p => [
    `"${p.id}"`,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.ministry.replace(/"/g, '""')}"`,
    `"${p.department.replace(/"/g, '""')}"`,
    `"${p.sector.replace(/"/g, '""')}"`,
    `"${p.location.city}"`,
    `"${p.location.state}"`,
    p.approvedCost,
    p.expenditure,
    p.physicalProgress,
    p.financialProgress,
    p.startDate,
    p.expectedCompletionDate,
    p.originalCompletionDate,
    p.delayMonths,
    `"${p.status}"`,
    `"${p.riskLevel}"`,
    `"${p.stage}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printProjectReport(project?: Project, allProjects?: Project[]) {
  window.print();
}
