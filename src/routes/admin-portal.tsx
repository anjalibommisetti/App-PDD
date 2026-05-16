import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  Activity,
  CheckCircle,
  LogOut,
  Menu,
  Search,
  Bell,
  Database,
  Lock,
  BarChart2,
  Settings,
  UserPlus,
  UserCheck,
  UserX
} from "lucide-react";
import { useNavigation } from "@react-navigation/native";
import { Platform, View, ScrollView } from "react-native";
import { supabase } from "../lib/supabase";
import AnalyticsDashboard from "./analytics";

export default function AdminPortal() {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const TABS = [
    { id: "Dashboard", icon: Activity, label: "System Overview" },
    { id: "Users", icon: Users, label: "User Management" },
    { id: "Analytics", icon: BarChart2, label: "Platform Analytics" },
    { id: "Monitoring", icon: Database, label: "System Monitoring" },
    { id: "Security", icon: Lock, label: "Security & Access" },
    { id: "Settings", icon: Settings, label: "Platform Settings" },
  ];

  const MOCK_USERS = [
    { id: "1", name: "Dr. Sarah Smith", role: "Doctor", status: "Active", joined: "May 10, 2026" },
    { id: "2", name: "Emily Chen", role: "Patient", status: "Active", joined: "May 12, 2026" },
    { id: "3", name: "Dr. Michael Jones", role: "Doctor", status: "Pending Approval", joined: "May 14, 2026" },
    { id: "4", name: "John Doe", role: "Patient", status: "Active", joined: "May 15, 2026" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <div className="w-full flex h-screen bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } transition-all duration-300 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col`}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="bg-purple-600 p-1.5 rounded-lg">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-white">Admin Portal</span>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <tab.icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-start gap-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="font-semibold">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Top Navbar */}
          <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative max-w-md w-full hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users, logs, or reports..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border border-white"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">System Admin</p>
                  <p className="text-xs text-slate-500">Superuser</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                  SA
                </div>
              </div>
            </div>
          </header>

          {/* Dynamic View Content */}
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === "Dashboard" && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Overview</h1>
                  <p className="text-slate-500 dark:text-slate-400">Monitor overall platform health and prediction statistics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl w-fit mb-4">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase">Total Users</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1,248</h3>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl w-fit mb-4">
                      <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase">AI Predictions</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">3,892</h3>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl w-fit mb-4">
                      <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase">Active Doctors</p>
                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white">45</h3>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl w-fit mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase">System Health</p>
                    <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">99.9%</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                  {/* Activity Log */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity Logs</h3>
                    <div className="space-y-4">
                      {[
                        "New user registered: Anjali (Patient)",
                        "AI Scan Completed: High Risk (94%)",
                        "Doctor Account Pending Approval: Dr. Michael Jones",
                        "System Database Backup Completed",
                        "New OTP Verification Sent"
                      ].map((log, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          <span>{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Database Health */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Database Monitoring</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Auth Users Table</span>
                        <span className="text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">Online</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Assessments Table</span>
                        <span className="text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-xs font-bold">Online</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600 dark:text-slate-400">Python AI Endpoint (Render)</span>
                        <span className="text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded text-xs font-bold">Sleeping (Cold Start)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Users" && (
              <div className="space-y-6 max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage Patients, Doctors, and Access Controls.</p>
                  </div>
                  <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700">
                    <UserPlus className="w-4 h-4" /> Add User
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                        <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Name</th>
                        <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Role</th>
                        <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Joined</th>
                        <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                        <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_USERS.map((user) => (
                        <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-4 text-slate-900 dark:text-white font-medium">{user.name}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              user.role === 'Doctor' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500 dark:text-slate-400 text-sm">{user.joined}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              user.status === 'Active' ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {user.status === "Pending Approval" ? (
                              <div className="flex gap-2">
                                <button className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100"><UserCheck className="w-4 h-4" /></button>
                                <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"><UserX className="w-4 h-4" /></button>
                              </div>
                            ) : (
                              <button className="text-purple-600 text-sm font-semibold hover:underline">Edit Access</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Analytics" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden w-full h-[800px]">
                <AnalyticsDashboard />
              </div>
            )}

            {(activeTab === "Monitoring" || activeTab === "Security" || activeTab === "Settings") && (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
                <Settings className="w-16 h-16 text-slate-200 dark:text-slate-800 mb-4" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeTab} Module</h2>
                <p>This module is currently being provisioned.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </View>
  );
}
