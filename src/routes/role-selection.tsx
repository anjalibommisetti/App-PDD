import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User, Stethoscope, ShieldCheck, ArrowLeft } from "lucide-react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RoleSelectionScreen() {
  const navigation = useNavigation<any>();

  const selectRole = async (role: string) => {
    await AsyncStorage.setItem("selectedSignupRole", role);
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FBFB" }}>
      <div className="flex-1 flex flex-col px-6 py-12 max-w-md mx-auto w-full">
        {/* Header */}
        <button 
          onClick={() => navigation.goBack()}
          className="mb-8 p-2 -ml-2 rounded-full hover:bg-slate-100 self-start text-slate-500"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Your Role</h1>
        <p className="text-slate-500 mb-10">Choose how you want to use SmileGuard AI to get started with your account.</p>

        {/* Role Cards */}
        <div className="space-y-4">
          <button
            onClick={() => selectRole("patient")}
            className="w-full bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all flex items-center gap-5 text-left group"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
              <User className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Patient</h2>
              <p className="text-sm text-slate-500">Scan your teeth, track oral health, and book appointments.</p>
            </div>
          </button>

          <button
            onClick={() => selectRole("doctor")}
            className="w-full bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-emerald-500 hover:shadow-lg transition-all flex items-center gap-5 text-left group"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition-colors">
              <Stethoscope className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Doctor</h2>
              <p className="text-sm text-slate-500">Review patient scans, manage appointments, and prescribe.</p>
            </div>
          </button>

          <button
            onClick={() => selectRole("admin")}
            className="w-full bg-white p-6 rounded-2xl border-2 border-slate-100 hover:border-purple-500 hover:shadow-lg transition-all flex items-center gap-5 text-left group"
          >
            <div className="w-14 h-14 rounded-full bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center shrink-0 transition-colors">
              <ShieldCheck className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-1">Administrator</h2>
              <p className="text-sm text-slate-500">Manage system settings, verify doctors, and view overall metrics.</p>
            </div>
          </button>
        </div>

        <div className="mt-auto pt-8 flex justify-center">
          <p className="text-slate-500">
            Already have an account?{" "}
            <button onClick={() => navigation.navigate("Login")} className="text-blue-600 font-bold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </div>
    </SafeAreaView>
  );
}
