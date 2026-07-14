import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform, Image, StyleSheet, SafeAreaView, Pressable, ActivityIndicator, Keyboard, Alert } from "react-native";
import tw from 'twrnc';
import React from "react";

import { MessageSquare, Send, Paperclip, Phone, Video } from "lucide-react-native";

export default function CommunicationModule() {
  return (
    <View style={tw`flex h-full bg-slate-50 dark:bg-slate-950 font-sans overflow-hidden border-l border-slate-200 dark:border-slate-800`}>
      {/* Sidebar: Chat List */}
      <View style={tw`w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0`}>
        <View style={tw`p-4 border-b border-slate-200 dark:border-slate-800`}>
          <Text style={tw`text-xl font-bold text-slate-900 dark:text-white`}>Messages</Text>
        </View>
        <View style={tw`flex-1 overflow-y-auto`}>
          {[
            { name: "Prathyusha", msg: "When should I come in?", time: "10:30 AM", unread: 2 },
            { name: "John Doe", msg: "Thanks doctor!", time: "Yesterday", unread: 0 },
            { name: "Sarah Smith", msg: "Attached my old scan.", time: "Mon", unread: 0 },
          ].map((chat, i) => (
            <View
              key={i}
              style={tw`p-4 border-b border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${i === 0 ? "bg-blue-50 dark:bg-blue-900/10" : ""}`}
            >
              <View style={tw`flex justify-between items-start mb-1`}>
                <Text style={tw`font-bold text-slate-900 dark:text-white`}>{chat.name}</Text>
                <Text style={tw`text-xs text-slate-500`}>{chat.time}</Text>
              </View>
              <View style={tw`flex justify-between items-center`}>
                <Text style={tw`text-sm text-slate-500 truncate pr-4`}>{chat.msg}</Text>
                {chat.unread > 0 && (
                  <Text style={tw`bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0`}>
                    {chat.unread}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Main Chat Area */}
      <View style={tw`flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950`}>
        <View style={tw`h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0`}>
          <View style={tw`flex items-center gap-3`}>
            <View style={tw`w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold`}>
              P
            </View>
            <View>
              <Text style={tw`font-bold text-slate-900 dark:text-white`}>Prathyusha</Text>
              <Text style={tw`text-xs text-green-500`}>Online</Text>
            </View>
          </View>
          <View style={tw`flex items-center gap-3`}>
            <TouchableOpacity style={tw`p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full`}>
              <Phone   size={20} color="#64748b" />
            </TouchableOpacity>
            <TouchableOpacity style={tw`p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full`}>
              <Video   size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`flex-1 p-6 overflow-y-auto space-y-4`}>
          <View style={tw`flex justify-start`}>
            <View style={tw`bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[70%] border border-slate-100 dark:border-slate-800`}>
              <Text style={tw`text-slate-800 dark:text-slate-200`}>
                Hi Doctor, I saw my AI risk score is 94%. Is it serious?
              </Text>
              <Text style={tw`text-xs text-slate-400 mt-1 block`}>10:28 AM</Text>
            </View>
          </View>
          <View style={tw`flex justify-start`}>
            <View style={tw`bg-white dark:bg-slate-900 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[70%] border border-slate-100 dark:border-slate-800`}>
              <Text style={tw`text-slate-800 dark:text-slate-200`}>When should I come in?</Text>
              <Text style={tw`text-xs text-slate-400 mt-1 block`}>10:30 AM</Text>
            </View>
          </View>
        </View>

        <View style={tw`p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0`}>
          <View style={tw`flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700`}>
            <TouchableOpacity style={tw`p-2 text-slate-400 hover:text-blue-500`}>
              <Paperclip   size={20} color="#64748b" />
            </TouchableOpacity>
            <TextInput
              
              placeholder="Type your message..."
              style={tw`flex-1 bg-transparent focus:outline-none dark:text-white`}
            />
            <TouchableOpacity style={tw`p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors`}>
              <Send   size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
