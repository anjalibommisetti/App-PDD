import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, Image, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Keyboard, Alert } from "react-native";
import tw from 'twrnc';
import React from "react";
import { FileText, Download, Filter, Search, Calendar, CheckCircle } from "lucide-react-native";

export default function AdminReports() {
  const MOCK_REPORTS = [
    {
      id: "REP-001",
      type: "Platform Usage",
      generated: "May 16, 2026",
      format: "PDF",
      status: "Ready",
      size: "2.4 MB",
    },
    {
      id: "REP-002",
      type: "Doctor Performance Analytics",
      generated: "May 15, 2026",
      format: "CSV",
      status: "Ready",
      size: "1.1 MB",
    },
    {
      id: "REP-003",
      type: "Monthly Patient Diagnoses",
      generated: "May 14, 2026",
      format: "PDF",
      status: "Ready",
      size: "4.8 MB",
    },
    {
      id: "REP-004",
      type: "Security & Audit Logs",
      generated: "May 10, 2026",
      format: "CSV",
      status: "Archived",
      size: "12.5 MB",
    },
  ];

  return (
    <View style={tw`space-y-6 max-w-6xl mx-auto pb-10`}>
      <View style={tw`flex justify-between items-center mb-6`}>
        <View>
          <Text style={tw`text-3xl font-bold text-slate-900 dark:text-white`}>Reports Monitoring</Text>
          <Text style={tw`text-slate-500 dark:text-slate-400`}>
            Generate, view, and download platform-wide analytics reports.
          </Text>
        </View>
        <TouchableOpacity style={tw`flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700`}>
          <FileText   size={20} color="#64748b" /> Generate New Report
        </TouchableOpacity>
      </View>

      <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm mb-6 flex flex-wrap gap-4 items-center justify-between`}>
        <View style={tw`flex items-center gap-4 flex-1 min-w-[300px]`}>
          <View style={tw`relative flex-1`}>
            <Search   size={20} color="#64748b" />
            <TextInput
              
              placeholder="Search reports..."
              style={tw`w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </View>
          <TouchableOpacity style={tw`flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium`}>
            <Filter   size={20} color="#64748b" /> Filters
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm`}>
        <View style={tw`w-full text-left border-collapse`}>
          <View>
            <View style={tw`bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700`}>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Report ID & Type
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Generated Date
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Format
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Status
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right`}>
                Actions
              </Text>
            </View>
          </View>
          <View>
            {MOCK_REPORTS.map((report) => (
              <View
                key={report.id}
                style={tw`border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50`}
              >
                <View style={tw`p-4`}>
                  <Text style={tw`font-bold text-slate-900 dark:text-white`}>{report.type}</Text>
                  <Text style={tw`text-xs text-slate-500 font-mono mt-1`}>{report.id}</Text>
                </View>
                <View style={tw`p-4 text-slate-600 dark:text-slate-400 text-sm`}>
                  <View style={tw`flex items-center gap-2`}>
                    <Calendar   size={20} color="#64748b" /> {report.generated}
                  </View>
                </View>
                <View style={tw`p-4`}>
                  <Text style={tw`px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-bold text-slate-600 dark:text-slate-300`}>
                    {report.format} • {report.size}
                  </Text>
                </View>
                <View style={tw`p-4`}>
                  <Text
                    style={tw`flex items-center gap-1 text-sm font-semibold ${report.status === "Ready" ? "text-green-600" : "text-slate-500"}`}
                  >
                    {report.status === "Ready" && <CheckCircle   size={20} color="#64748b" />}{" "}
                    {report.status}
                  </Text>
                </View>
                <View style={tw`p-4 text-right`}>
                  <TouchableOpacity style={tw`flex items-center gap-2 justify-end ml-auto text-blue-600 hover:text-blue-700 font-semibold text-sm`}>
                    <Download   size={20} color="#64748b" /> Download
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
