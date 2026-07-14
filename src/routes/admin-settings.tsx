import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, Image, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Keyboard, Alert } from "react-native";
import tw from 'twrnc';
import React from "react";
import { Settings, Save, Globe, Lock, Shield, Database, LayoutTemplate } from "lucide-react-native";

export default function AdminSettings() {
  return (
    <View style={tw`space-y-6 max-w-4xl mx-auto pb-10`}>
      <View style={tw`flex justify-between items-center mb-6`}>
        <View>
          <Text style={tw`text-3xl font-bold text-slate-900 dark:text-white`}>System Settings</Text>
          <Text style={tw`text-slate-500 dark:text-slate-400`}>
            Configure global platform settings and preferences.
          </Text>
        </View>
        <TouchableOpacity style={tw`flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm`}>
          <Save   size={20} color="#64748b" /> Save Changes
        </TouchableOpacity>
      </View>

      <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden`}>
        {/* General Settings */}
        <View style={tw`p-6 border-b border-slate-100 dark:border-slate-800`}>
          <Text style={tw`text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2`}>
            <Globe   size={20} color="#64748b" /> General Configuration
          </Text>
          <View style={tw`space-y-4`}>
            <View style={tw`grid grid-cols-1 md:grid-cols-3 gap-4 items-center`}>
              <label style={tw`text-sm font-semibold text-slate-700 dark:text-slate-300`}>
                Platform Name
              </label>
              <TextInput
                
                defaultValue="SmileGuard AI"
                style={tw`md:col-span-2 w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </View>
            <View style={tw`grid grid-cols-1 md:grid-cols-3 gap-4 items-center`}>
              <label style={tw`text-sm font-semibold text-slate-700 dark:text-slate-300`}>
                Support Email
              </label>
              <TextInput
                
                defaultValue="support@smileguard.ai"
                style={tw`md:col-span-2 w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </View>
          </View>
        </View>

        {/* Access Settings */}
        <View style={tw`p-6 border-b border-slate-100 dark:border-slate-800`}>
          <Text style={tw`text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2`}>
            <Shield   size={20} color="#64748b" /> Access & Security Defaults
          </Text>
          <View style={tw`space-y-4`}>
            <View style={tw`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800`}>
              <View>
                <Text style={tw`font-semibold text-slate-900 dark:text-white`}>
                  Require Email Verification
                </Text>
                <Text style={tw`text-sm text-slate-500`}>
                  Users must verify their email before logging in.
                </Text>
              </View>
              <View style={tw`w-12 h-6 bg-blue-600 rounded-full flex items-center p-1 justify-end cursor-pointer`}>
                <View style={tw`w-4 h-4 bg-white rounded-full`}></View>
              </View>
            </View>
            <View style={tw`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800`}>
              <View>
                <Text style={tw`font-semibold text-slate-900 dark:text-white`}>
                  Auto-Approve Doctor Registrations
                </Text>
                <Text style={tw`text-sm text-slate-500`}>
                  Bypass manual admin approval for new doctor accounts.
                </Text>
              </View>
              <View style={tw`w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full flex items-center p-1 justify-start cursor-pointer`}>
                <View style={tw`w-4 h-4 bg-white rounded-full`}></View>
              </View>
            </View>
          </View>
        </View>

        {/* Backend Settings */}
        <View style={tw`p-6`}>
          <Text style={tw`text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2`}>
            <Database   size={20} color="#64748b" /> Prediction Endpoint
          </Text>
          <View style={tw`space-y-4`}>
            <View style={tw`grid grid-cols-1 md:grid-cols-3 gap-4 items-center`}>
              <label style={tw`text-sm font-semibold text-slate-700 dark:text-slate-300`}>
                FastAPI Endpoint URL
              </label>
              <TextInput
                
                defaultValue="https://smileguard-ai-backend.onrender.com"
                style={tw`md:col-span-2 w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </View>
            <View style={tw`grid grid-cols-1 md:grid-cols-3 gap-4 items-center`}>
              <label style={tw`text-sm font-semibold text-slate-700 dark:text-slate-300`}>
                Risk Threshold Warning
              </label>
              <View style={tw`md:col-span-2 flex items-center gap-4`}>
                <TextInput  min="0" max="100" defaultValue="75" style={tw`flex-1`} />
                <Text style={tw`font-bold text-slate-900 dark:text-white w-12 text-right`}>
                  75%
                </Text>
              </View>
            </View>
            <Text style={tw`text-xs text-slate-500 mt-2 italic`}>
              Any prediction above the risk threshold will automatically trigger a High-Risk Alert
              to assigned doctors.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
