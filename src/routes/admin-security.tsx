import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, Image, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Keyboard, Alert } from "react-native";
import tw from 'twrnc';
import React from "react";

import { ShieldAlert, Key, Lock, Users, Eye, EyeOff, AlertCircle } from "lucide-react-native";

export default function AdminSecurity() {
  return (
    <View style={tw`space-y-6 max-w-6xl mx-auto pb-10`}>
      <View style={tw`flex justify-between items-center mb-6`}>
        <View>
          <Text style={tw`text-3xl font-bold text-slate-900 dark:text-white`}>Security Management</Text>
          <Text style={tw`text-slate-500 dark:text-slate-400`}>
            Manage access controls, API keys, and threat detection.
          </Text>
        </View>
        <TouchableOpacity style={tw`flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700`}>
          <ShieldAlert   size={20} color="#64748b" /> Trigger Lockdown
        </TouchableOpacity>
      </View>

      <View style={tw`grid lg:grid-cols-3 gap-8`}>
        {/* API Keys */}
        <View style={tw`lg:col-span-2 space-y-6`}>
          <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6`}>
            <View style={tw`flex justify-between items-center mb-6`}>
              <Text style={tw`text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2`}>
                <Key   size={20} color="#64748b" /> API Access Keys
              </Text>
              <TouchableOpacity style={tw`text-sm font-semibold text-blue-600 hover:text-blue-700`}>
                Generate New Key
              </TouchableOpacity>
            </View>

            <View style={tw`space-y-4`}>
              {[
                {
                  name: "Production Frontend Key",
                  prefix: "pk_live_...",
                  created: "Jan 12, 2026",
                  status: "Active",
                },
                {
                  name: "Python Backend Access",
                  prefix: "sk_live_...",
                  created: "Jan 12, 2026",
                  status: "Active",
                },
                {
                  name: "Development Server",
                  prefix: "pk_test_...",
                  created: "Mar 05, 2026",
                  status: "Active",
                },
                {
                  name: "Legacy Mobile App",
                  prefix: "pk_old_...",
                  created: "Nov 22, 2025",
                  status: "Revoked",
                },
              ].map((key, i) => (
                <View
                  key={i}
                  style={tw`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 dark:border-slate-800 rounded-lg`}
                >
                  <View>
                    <Text style={tw`font-bold text-slate-800 dark:text-slate-200`}>{key.name}</Text>
                    <Text style={tw`font-mono text-sm text-slate-500 mt-1`}>
                      {key.prefix} <Eye   size={20} color="#64748b" />
                    </Text>
                  </View>
                  <View style={tw`mt-3 sm:mt-0 flex items-center gap-4`}>
                    <Text style={tw`text-xs text-slate-400`}>Created {key.created}</Text>
                    <Text
                      style={tw`px-3 py-1 rounded-full text-xs font-bold ${
                        key.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {key.status}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6`}>
            <Text style={tw`text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2`}>
              <Lock   size={20} color="#64748b" /> Platform Security Policies
            </Text>
            <View style={tw`space-y-4`}>
              <View style={tw`flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg`}>
                <View>
                  <Text style={tw`font-semibold text-slate-800 dark:text-slate-200`}>
                    Enforce Two-Factor Authentication (2FA)
                  </Text>
                  <Text style={tw`text-sm text-slate-500`}>
                    Require 2FA for all Doctor and Admin accounts.
                  </Text>
                </View>
                <View style={tw`w-12 h-6 bg-blue-600 rounded-full flex items-center p-1 justify-end cursor-pointer`}>
                  <View style={tw`w-4 h-4 bg-white rounded-full`}></View>
                </View>
              </View>
              <View style={tw`flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-lg`}>
                <View>
                  <Text style={tw`font-semibold text-slate-800 dark:text-slate-200`}>
                    Session Timeout
                  </Text>
                  <Text style={tw`text-sm text-slate-500`}>
                    Automatically log out inactive users after 30 minutes.
                  </Text>
                </View>
                <View style={tw`w-12 h-6 bg-blue-600 rounded-full flex items-center p-1 justify-end cursor-pointer`}>
                  <View style={tw`w-4 h-4 bg-white rounded-full`}></View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Threat Detection */}
        <View style={tw`lg:col-span-1`}>
          <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-8`}>
            <Text style={tw`text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2`}>
              <AlertCircle   size={20} color="#64748b" /> Threat Detection
            </Text>

            <View style={tw`mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg flex items-start gap-3`}>
              <ShieldAlert   size={20} color="#64748b" />
              <View>
                <Text style={tw`font-bold text-green-900 dark:text-green-100`}>System Secure</Text>
                <Text style={tw`text-sm text-green-800 dark:text-green-200 mt-1`}>
                  No active threats detected in the last 24 hours.
                </Text>
              </View>
            </View>

            <Text style={tw`font-semibold text-slate-900 dark:text-white mb-3 text-sm uppercase tracking-wider`}>
              Recent Blocks
            </Text>
            <View style={tw`space-y-3`}>
              {[
                { ip: "192.168.1.1", reason: "Multiple failed logins", time: "2 hrs ago" },
                { ip: "45.22.19.10", reason: "Rate limit exceeded", time: "5 hrs ago" },
                { ip: "Unknown", reason: "Invalid JWT Signature", time: "1 day ago" },
              ].map((threat, i) => (
                <View key={i} style={tw`p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg`}>
                  <View style={tw`flex justify-between items-center mb-1`}>
                    <Text style={tw`font-mono text-sm text-slate-700 dark:text-slate-300`}>
                      {threat.ip}
                    </Text>
                    <Text style={tw`text-xs text-slate-400`}>{threat.time}</Text>
                  </View>
                  <Text style={tw`text-xs text-red-500`}>{threat.reason}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
