import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { RiskAlertsPage } from './pages/RiskAlertsPage';
import { MinistryPage } from './pages/MinistryPage';
import { ReportsPage } from './pages/ReportsPage';
import { MapView } from './pages/MapView';
import { INITIAL_PROJECTS, INITIAL_ALERTS, INITIAL_USER } from './data/mockData';
import { Project, AlertItem, UserSession } from './types';

export default function App() {
  const [user, setUser] = useState<UserSession | null>(INITIAL_USER);
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected project for details view
  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleLogin = (authenticatedUser: UserSession) => {
    setUser(authenticatedUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isRead: true } : a));
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, isRead: true })));
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, acknowledged: true, isRead: true } : a));
  };

  const handleAddProject = (newProj: Project) => {
    setProjects(prev => [newProj, ...prev]);
  };

  // If user is logged out, show Login Page
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const criticalRisksCount = alerts.filter(a => a.severity === 'Critical' && !a.acknowledged).length;
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        alerts={alerts}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            unreadAlertsCount={unreadAlertsCount}
            criticalRisksCount={criticalRisksCount}
            totalProjectsCount={projects.length}
          />
        </div>

        {/* Content Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-full overflow-hidden">
          {currentPage === 'dashboard' && (
            <DashboardPage
              projects={projects}
              alerts={alerts}
              onSelectProject={handleSelectProject}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'projects' && (
            <ProjectsPage
              projects={projects}
              onSelectProject={handleSelectProject}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddProject={handleAddProject}
            />
          )}

          {currentPage === 'details' && (
            <ProjectDetailsPage
              project={currentProject}
              allProjects={projects}
              onSelectProject={handleSelectProject}
              onBack={() => handleNavigate('projects')}
            />
          )}

          {currentPage === 'risks' && (
            <RiskAlertsPage
              alerts={alerts}
              projects={projects}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentPage === 'ministry' && (
            <MinistryPage
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          )}

          {currentPage === 'reports' && (
            <ReportsPage
              projects={projects}
            />
          )}

          {currentPage === 'map' && (
            <MapView
              projects={projects}
              onSelectProject={handleSelectProject}
            />
          )}
        </main>
      </div>

      {/* Slide-over Notification Panel */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        alerts={alerts}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onSelectProject={handleSelectProject}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
