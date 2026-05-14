import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShieldCheck, LogOut, Users, Activity, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminPortal() {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ flex: 1, backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900">Admin Portal</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">System Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              SA
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Admin</h1>
        <p className="text-slate-500 mb-8">System metrics and user management overview.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Users</p>
            <h3 className="text-3xl font-bold text-slate-900">500+</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <Activity className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">Total Predictions</p>
            <h3 className="text-3xl font-bold text-slate-900">1.2K+</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider mb-1">System Status</p>
            <h3 className="text-3xl font-bold text-green-600">Active</h3>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64">
          <p className="text-slate-500 mb-4">Detailed Admin Management Tools (Coming Next)</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}
