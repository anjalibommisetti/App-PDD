import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { supabase } from "../lib/supabase";

export default function SignupScreen() {
  console.log('SignupScreen rendered');
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    console.log('Attempting signup for:', email.trim());
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      console.error('Signup error:', error);
      Alert.alert('Signup Error', error.message);
    } else {
      console.log('Signup successful:', data);
      Alert.alert('Success', 'Registration successful! Please check your email for a verification link.');
      navigation.navigate("Login");
    }
  };

  return (
    <PhoneShell>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Full Name" 
          value={fullName}
          onChangeText={setFullName}
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          keyboardType="email-address" 
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <TextInput 
          style={styles.input} 
          placeholder="Password" 
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0D4B42" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: {
    backgroundColor: '#86F1D4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 56,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#0D4B42',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    marginTop: 16,
    color: '#64748B',
  }
});
