import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, Image, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Keyboard, Alert } from "react-native";
import tw from 'twrnc';
import React, { useState } from "react";
import {
  Bell,
  Search,
  Filter,
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Smartphone,
} from "lucide-react-native";

export default function AdminNotifications() {
  const MOCK_NOTIFICATIONS = [
    {
      id: "NOT-001",
      type: "Email",
      recipient: "Dr. Sarah Smith",
      subject: "Welcome to SmileGuard",
      status: "Delivered",
      time: "2 mins ago",
    },
    {
      id: "NOT-002",
      type: "SMS",
      recipient: "+1 (555) 123-4567",
      subject: "Appointment Reminder",
      status: "Delivered",
      time: "15 mins ago",
    },
    {
      id: "NOT-003",
      type: "Push",
      recipient: "All Active Doctors",
      subject: "System Maintenance Alert",
      status: "Pending",
      time: "1 hour ago",
    },
    {
      id: "NOT-004",
      type: "Email",
      recipient: "John Doe",
      subject: "Your Assessment Results",
      status: "Failed",
      time: "3 hours ago",
    },
  ];

  return (
    <View style={tw`space-y-6 max-w-6xl mx-auto pb-10`}>
      <View style={tw`flex justify-between items-center mb-6`}>
        <View>
          <Text style={tw`text-3xl font-bold text-slate-900 dark:text-white`}>
            Notification Management
          </Text>
          <Text style={tw`text-slate-500 dark:text-slate-400`}>
            Monitor and manage platform-wide communications.
          </Text>
        </View>
        <TouchableOpacity style={tw`flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700`}>
          <Bell   size={20} color="#64748b" /> Send Announcement
        </TouchableOpacity>
      </View>

      <View style={tw`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`}>
        <View style={tw`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between`}>
          <View>
            <Text style={tw`text-sm text-slate-500 font-medium mb-1`}>Total Sent (Today)</Text>
            <Text style={tw`text-2xl font-bold text-slate-900 dark:text-white`}>1,284</Text>
          </View>
          <View style={tw`p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30`}>
            <Mail   size={20} color="#64748b" />
          </View>
        </View>
        <View style={tw`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between`}>
          <View>
            <Text style={tw`text-sm text-slate-500 font-medium mb-1`}>Delivery Rate</Text>
            <Text style={tw`text-2xl font-bold text-green-600 dark:text-green-400`}>99.8%</Text>
          </View>
          <View style={tw`p-3 rounded-lg bg-green-100 dark:bg-green-900/30`}>
            <CheckCircle   size={20} color="#64748b" />
          </View>
        </View>
        <View style={tw`bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between`}>
          <View>
            <Text style={tw`text-sm text-slate-500 font-medium mb-1`}>Failed Deliveries</Text>
            <Text style={tw`text-2xl font-bold text-red-600 dark:text-red-400`}>3</Text>
          </View>
          <View style={tw`p-3 rounded-lg bg-red-100 dark:bg-red-900/30`}>
            <AlertCircle   size={20} color="#64748b" />
          </View>
        </View>
      </View>

      <View style={tw`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm`}>
        <View style={tw`p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50`}>
          <Text style={tw`font-bold text-slate-900 dark:text-white`}>Recent Outbound Messages</Text>
          <View style={tw`flex gap-2`}>
            <TouchableOpacity style={tw`p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-white`}>
              <Filter   size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`w-full text-left border-collapse`}>
          <View>
            <View style={tw`border-b border-slate-200 dark:border-slate-700`}>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>Type</Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Recipient
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Subject / Content
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>
                Status
              </Text>
              <Text style={tw`p-4 text-sm font-semibold text-slate-600 dark:text-slate-300`}>Time</Text>
            </View>
          </View>
          <View>
            {MOCK_NOTIFICATIONS.map((notif) => (
              <View
                key={notif.id}
                style={tw`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50`}
              >
                <View style={tw`p-4`}>
                  <Text
                    style={tw`flex items-center gap-2 text-sm font-semibold ${
                      notif.type === "Email"
                        ? "text-blue-600"
                        : notif.type === "SMS"
                          ? "text-purple-600"
                          : "text-orange-600"
                    }`}
                  >
                    {notif.type === "Email" ? (
                      <Mail   size={20} color="#64748b" />
                    ) : notif.type === "SMS" ? (
                      <MessageSquare   size={20} color="#64748b" />
                    ) : (
                      <Smartphone   size={20} color="#64748b" />
                    )}
                    {notif.type}
                  </Text>
                </View>
                <View style={tw`p-4 text-sm text-slate-900 dark:text-white font-medium`}>
                  {notif.recipient}
                </View>
                <View style={tw`p-4 text-sm text-slate-600 dark:text-slate-400`}>{notif.subject}</View>
                <View style={tw`p-4`}>
                  <Text
                    style={tw`px-2 py-1 rounded text-xs font-bold ${
                      notif.status === "Delivered"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : notif.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {notif.status}
                  </Text>
                </View>
                <View style={tw`p-4 text-sm text-slate-500`}>{notif.time}</View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
