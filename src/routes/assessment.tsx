import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { PhoneShell } from "../components/PhoneShell";
import { ScreenHeader } from "../components/ScreenHeader";
import { Feather } from "@expo/vector-icons";

const questions = [
  {
    id: 1,
    title: "How do your teeth feel today?",
    type: "choice",
    options: ["Perfectly fine", "Slight sensitivity", "Occasional pain", "Persistent pain"],
  },
  {
    id: 2,
    title: "Any bleeding during brushing?",
    type: "choice",
    options: ["Never", "Rarely", "Sometimes", "Every time"],
  },
  {
    id: 3,
    title: "How often do you brush?",
    type: "choice",
    options: ["Twice or more daily", "Once daily", "Few times a week", "Rarely"],
  },
  {
    id: 4,
    title: "Do you floss regularly?",
    type: "choice",
    options: ["Daily", "Weekly", "Monthly", "Never"],
  },
  {
    id: 5,
    title: "When was your last dental checkup?",
    type: "choice",
    options: ["Less than 6 months", "6-12 months", "1-2 years", "Over 2 years"],
  },
];

export default function AssessmentScreen() {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate("Results");
    }
  };

  const question = questions[currentStep];

  return (
    <PhoneShell>
      <ScreenHeader 
        title="Oral Assessment" 
        subtitle={`Question ${currentStep + 1} of ${questions.length}`} 
        showBack={true}
        onBack={() => {
          if (currentStep > 0) setCurrentStep(currentStep - 1);
          else navigation.goBack();
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${((currentStep + 1) / questions.length) * 100}%` }]} />
        </View>

        <Text style={styles.questionText}>{question.title}</Text>

        <View style={styles.optionsList}>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionBtn,
                answers[question.id] === option && styles.optionBtnActive
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text style={[
                styles.optionText,
                answers[question.id] === option && styles.optionTextActive
              ]}>
                {option}
              </Text>
              {answers[question.id] === option && (
                <Feather name="check-circle" size={20} color="#157A6E" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {currentStep > 0 && (
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.backBtnText}>Previous Question</Text>
          </TouchableOpacity>
        )}
      </View>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 40,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#157A6E',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 32,
    lineHeight: 32,
  },
  optionsList: {
    gap: 12,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  optionBtnActive: {
    borderColor: '#157A6E',
    backgroundColor: '#F0FDF4',
  },
  optionText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#157A6E',
    fontWeight: '600',
  },
  backBtn: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
});
