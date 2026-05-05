import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ActivityIndicator, Animated,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { PhoneShell } from '../components/PhoneShell';
import { ScreenHeader } from '../components/ScreenHeader';
import { Feather } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';

// ─── Backend URL ──────────────────────────────────────────────────────────────
const BACKEND_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_BACKEND_URL) ||
  'https://smileguard-api.onrender.com';

// ─── Disease metadata ─────────────────────────────────────────────────────────
const DISEASE_INFO: Record<string, { description: string; urgency: string }> = {
  'Caries':             { description: 'Tooth decay / cavities from bacterial acid erosion',     urgency: 'Immediate' },
  'Calculus':           { description: 'Hardened tartar/plaque buildup on tooth surfaces',       urgency: 'Soon'      },
  'Gingivitis':         { description: 'Gum inflammation — early stage periodontal disease',     urgency: 'Soon'      },
  'Tooth Discoloration':{ description: 'Staining or discolouration of tooth enamel/dentin',     urgency: 'Routine'   },
  'Ulcers':             { description: 'Oral ulcers or canker sores inside the mouth',           urgency: 'Soon'      },
  'Hypodontia':         { description: 'One or more congenitally missing teeth',                 urgency: 'Routine'   },
};

// ─── Offline fallback (used if backend is unreachable) ───────────────────────
function simulateAIAnalysis(seed: number) {
  const n = (seed % 10000) / 10000;
  const score = Math.floor(20 + n * 70);
  const level: 'Low' | 'Medium' | 'High' = score < 40 ? 'Low' : score < 65 ? 'Medium' : 'High';
  const s = seed;
  const findings = [
    { label: 'Caries',             detected: score > 48, severity: score > 70 ? 'Severe' : score > 55 ? 'Moderate' : 'Mild',  color: score > 70 ? '#EF4444' : score > 55 ? '#F59E0B' : '#10B981', description: DISEASE_INFO['Caries'].description,             urgency: DISEASE_INFO['Caries'].urgency },
    { label: 'Calculus',           detected: score > 38, severity: score > 60 ? 'Heavy'  : 'Mild',                             color: score > 60 ? '#F59E0B' : '#10B981',                         description: DISEASE_INFO['Calculus'].description,           urgency: DISEASE_INFO['Calculus'].urgency },
    { label: 'Gingivitis',         detected: score > 55, severity: score > 72 ? 'Severe' : 'Moderate',                         color: score > 72 ? '#EF4444' : '#F59E0B',                         description: DISEASE_INFO['Gingivitis'].description,         urgency: DISEASE_INFO['Gingivitis'].urgency },
    { label: 'Tooth Discoloration',detected: score > 28, severity: score > 50 ? 'Moderate': 'Mild',                            color: score > 50 ? '#F59E0B' : '#10B981',                         description: DISEASE_INFO['Tooth Discoloration'].description, urgency: DISEASE_INFO['Tooth Discoloration'].urgency },
    { label: 'Ulcers',             detected: (s % 7) > 4 && score > 42, severity: 'Moderate', color: '#F59E0B',               description: DISEASE_INFO['Ulcers'].description,             urgency: DISEASE_INFO['Ulcers'].urgency },
    { label: 'Hypodontia',         detected: (s % 11) > 8,              severity: 'Detected', color: '#6366F1',               description: DISEASE_INFO['Hypodontia'].description,         urgency: DISEASE_INFO['Hypodontia'].urgency },
  ];
  const suggestions: string[] = [];
  if (level === 'High') suggestions.push('Book a dental appointment within 1–2 weeks');
  else if (level === 'Medium') suggestions.push('Schedule a dental check-up soon');
  else suggestions.push('Great oral health — keep it up!');
  const detected = findings.filter(f => f.detected).map(f => f.label);
  if (detected.includes('Caries'))              suggestions.push('Cavities detected — prompt filling treatment needed');
  if (detected.includes('Calculus'))            suggestions.push('Professional scaling required to remove hardened tartar');
  if (detected.includes('Gingivitis'))          suggestions.push('Use antibacterial mouthwash; focus on gum care & flossing');
  if (detected.includes('Tooth Discoloration')) suggestions.push('Consider whitening treatment; reduce coffee/tea/smoking');
  if (detected.includes('Ulcers'))              suggestions.push('Apply oral gel; avoid spicy foods until ulcers heal');
  if (detected.includes('Hypodontia'))          suggestions.push('Consult an orthodontist about implant or bridge options');
  suggestions.push('Brush twice daily with fluoride toothpaste (2 min each)');
  suggestions.push('Floss daily to remove interdental plaque buildup');
  return { score, level, findings, suggestions: suggestions.slice(0, 6), predictedClass: detected[0] || 'Healthy', confidence: Math.round(40 + n * 55) };
}

// ─── Real API call ────────────────────────────────────────────────────────────
async function callPredictAPI(imageFile: File): Promise<ReturnType<typeof simulateAIAnalysis> | null> {
  try {
    const form = new FormData();
    form.append('file', imageFile);
    const res  = await fetch(`${BACKEND_URL}/predict`, { method: 'POST', body: form });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 'success') return null;

    // Map backend response → UI findings format
    const findings = (data.all_classes || []).map((c: any) => ({
      label:       c.label,
      detected:    c.detected,
      severity:    c.severity || (c.detected ? 'Detected' : 'None'),
      color:       c.confidence >= 70 ? '#EF4444' : c.confidence >= 45 ? '#F59E0B' : '#10B981',
      description: DISEASE_INFO[c.label]?.description || '',
      urgency:     DISEASE_INFO[c.label]?.urgency     || 'Routine',
    }));

    const level: 'Low'|'Medium'|'High' = data.risk_level as any || 'Low';
    const suggestions: string[] = [];
    if (level === 'High')        suggestions.push('Book a dental appointment within 1–2 weeks');
    else if (level === 'Medium') suggestions.push('Schedule a dental check-up soon');
    else                         suggestions.push('Great oral health — keep it up!');
    const detected = findings.filter((f:any) => f.detected).map((f:any) => f.label);
    if (detected.includes('Caries'))              suggestions.push('Cavities detected — prompt filling treatment needed');
    if (detected.includes('Calculus'))            suggestions.push('Professional scaling required to remove hardened tartar');
    if (detected.includes('Gingivitis'))          suggestions.push('Use antibacterial mouthwash; focus on gum care & flossing');
    if (detected.includes('Tooth Discoloration')) suggestions.push('Consider whitening treatment; reduce coffee/tea/smoking');
    if (detected.includes('Ulcers'))              suggestions.push('Apply oral gel; avoid spicy foods until ulcers heal');
    suggestions.push('Brush twice daily with fluoride toothpaste (2 min each)');
    suggestions.push('Floss daily to remove interdental plaque buildup');

    return {
      score:          data.risk_score,
      level,
      findings,
      suggestions:    suggestions.slice(0, 6),
      predictedClass: data.predicted_class,
      confidence:     data.confidence,
    };
  } catch {
    return null;   // backend unreachable
  }
}


export default function ScanScreen() {
  const navigation = useNavigation<any>();
  const [imageUri,    setImageUri]    = useState<string | null>(null);
  const [imageFile,   setImageFile]   = useState<File | null>(null);
  const [imageSeed,   setImageSeed]   = useState<number>(0);
  const [analyzing,   setAnalyzing]   = useState(false);
  const [result,      setResult]      = useState<ReturnType<typeof simulateAIAnalysis> | null>(null);
  const [autoSaved,   setAutoSaved]   = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const handleImagePick = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUri(url);
    setImageFile(file);
    setImageSeed(file.size);
    setResult(null);
    setAutoSaved(false);
    setOfflineMode(false);
  };

  const runAnalysis = async () => {
    if (!imageUri) return;
    setAnalyzing(true);
    setResult(null);
    setAutoSaved(false);
    setOfflineMode(false);
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2800,
      useNativeDriver: false,
    }).start();

    // Try real API first, fall back to simulation
    let analysis: ReturnType<typeof simulateAIAnalysis>;
    const apiResult = imageFile ? await callPredictAPI(imageFile) : null;

    if (apiResult) {
      analysis = apiResult;
      setOfflineMode(false);
    } else {
      // Backend unreachable — use offline simulation
      analysis = simulateAIAnalysis(imageSeed);
      setOfflineMode(true);
    }

    // Wait for progress bar animation to complete
    await new Promise(r => setTimeout(r, 3000));
    setResult(analysis);
    setAnalyzing(false);

    // Auto-save to Supabase history
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId   = session?.user?.id ?? null;
      const userName = session?.user?.user_metadata?.full_name ||
        session?.user?.email?.split('@')[0] || 'User';
      await supabase.from('assessments').insert({
        user_id:          userId,
        score:            analysis.score,
        level:            analysis.level,
        patient_name:     `[Scan] ${userName}`,
        insight:          `Teeth scan: ${
          analysis.findings.filter(f => f.detected).map(f => f.label).join(', ') || 'No issues detected'
        }. Risk: ${analysis.level}. ${
          (analysis as any).predictedClass ? `Primary: ${(analysis as any).predictedClass} (${(analysis as any).confidence}% confidence)` : ''
        }`,
        answers:          {},
        created_at:       new Date().toISOString(),
      });
      setAutoSaved(true);
    } catch (err) {
      console.error('Auto-save error:', err);
    }
  };

  const riskColor =
    result?.level === 'High' ? '#EF4444' :
    result?.level === 'Medium' ? '#F59E0B' : '#10B981';

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <PhoneShell>
      <ScreenHeader title="Teeth Scan" subtitle="AI-powered dental analysis" back="Dashboard" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Upload Area */}
        <View style={styles.uploadCard}>
          {imageUri ? (
            <>
              {/* Image Preview using HTML img */}
              <img
                src={imageUri}
                alt="Teeth scan"
                style={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 16,
                  display: 'block',
                } as any}
              />
              <TouchableOpacity
                style={styles.retakeBtn}
                onPress={() => {
                  setImageUri(null);
                  setResult(null);
                  setAutoSaved(false);
                }}
              >
                <Feather name="refresh-cw" size={14} color="#64748B" />
                <Text style={styles.retakeText}>Choose different image</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <View style={styles.uploadIcon}>
                <Feather name="camera" size={32} color="#157A6E" />
              </View>
              <Text style={styles.uploadTitle}>Upload Teeth Photo</Text>
              <Text style={styles.uploadSub}>
                Take a clear photo of your teeth in good lighting for best results
              </Text>
              {/* HTML file input for web */}
              <label style={{ cursor: 'pointer', marginTop: 16 } as any}>
                <View style={styles.uploadBtn}>
                  <Feather name="upload" size={16} color="#0D4B42" />
                  <Text style={styles.uploadBtnText}>Choose Photo</Text>
                </View>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' } as any}
                  onChange={handleImagePick}
                />
              </label>
            </View>
          )}
        </View>

        {/* Tips */}
        {!imageUri && (
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>📸 Photo Tips</Text>
            {[
              'Good lighting — natural light works best',
              'Open mouth wide, show all teeth',
              'Keep camera steady for a sharp image',
              'Include both upper and lower teeth',
            ].map((tip, i) => (
              <View key={i} style={styles.tipRow}>
                <View style={styles.tipDot} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Analyze Button */}
        {imageUri && !result && (
          <TouchableOpacity
            style={[styles.analyzeBtn, analyzing && { opacity: 0.7 }]}
            onPress={runAnalysis}
            disabled={analyzing}
            activeOpacity={0.8}
          >
            {analyzing ? (
              <>
                <ActivityIndicator color="#0D4B42" size="small" />
                <Text style={styles.analyzeBtnText}>Analyzing with AI…</Text>
              </>
            ) : (
              <>
                <Feather name="cpu" size={18} color="#0D4B42" />
                <Text style={styles.analyzeBtnText}>Run AI Analysis</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Progress Bar */}
        {analyzing && (
          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>🤖 Sending to AI model for analysis…</Text>
            <View style={styles.progressBg}>
              <Animated.View style={[styles.progressFill, { width: progressWidth as any }]} />
            </View>
          </View>
        )}

        {/* Offline mode warning */}
        {result && offlineMode && (
          <View style={styles.offlineBanner}>
            <Feather name="wifi-off" size={14} color="#D97706" />
            <Text style={styles.offlineText}>
              Offline mode — AI backend unavailable. Showing simulated results.
            </Text>
          </View>
        )}

        {/* Real AI badge */}
        {result && !offlineMode && (
          <View style={styles.realAIBanner}>
            <Feather name="cpu" size={14} color="#157A6E" />
            <Text style={styles.realAIText}>
              Real AI prediction · {(result as any).predictedClass} · {(result as any).confidence}% confidence
            </Text>
          </View>
        )}

        {/* Results */}
        {result && (
          <>
            {/* Score Card */}
            <View style={[styles.scoreCard, { backgroundColor: riskColor }]}>
              <View style={styles.scoreTop}>
                <Text style={styles.scoreLabel}>SCAN RESULT</Text>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreBadgeText}>{result.level} Risk</Text>
                </View>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.scoreNum}>{result.score}</Text>
                <Text style={styles.scoreUnit}>%</Text>
              </View>
              <Text style={styles.scoreDesc}>
                {result.level === 'Low'
                  ? '✓ Your teeth look healthy!'
                  : result.level === 'Medium'
                  ? '⚠ Some areas need attention'
                  : '🚨 Immediate dental care advised'}
              </Text>
            </View>

            {/* Findings — 6 categories from Kaggle Oral Diseases dataset */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>🔍 AI Findings</Text>
              <Text style={styles.datasetTag}>📊 Kaggle Oral Diseases Dataset</Text>
              <View style={styles.findingsList}>
                {result.findings.map((f, i) => (
                  <View key={i} style={[styles.findingRow, f.detected && { borderLeftWidth: 3, borderLeftColor: f.color }]}>
                    <Feather
                      name={f.detected ? 'alert-circle' : 'check-circle'}
                      size={16}
                      color={f.detected ? f.color : '#10B981'}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.findingLabel}>{f.label}</Text>
                        <View style={[styles.findingBadge, {
                          backgroundColor: f.detected ? f.color + '20' : '#DCFCE7',
                        }]}>
                          <Text style={[styles.findingBadgeText, {
                            color: f.detected ? f.color : '#10B981',
                          }]}>
                            {f.detected ? f.severity : 'None'}
                          </Text>
                        </View>
                      </View>
                      {f.detected && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                          <Text style={styles.findingDesc}>{f.description}</Text>
                        </View>
                      )}
                      {f.detected && (
                        <View style={[styles.urgencyBadge, {
                          backgroundColor: f.urgency === 'Immediate' ? '#FEF2F2' :
                                           f.urgency === 'Soon' ? '#FFFBEB' : '#F0FDF4',
                        }]}>
                          <Text style={[styles.urgencyText, {
                            color: f.urgency === 'Immediate' ? '#EF4444' :
                                   f.urgency === 'Soon' ? '#F59E0B' : '#10B981',
                          }]}>
                            ⏱ {f.urgency}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Suggestions */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>💡 Recommendations</Text>
              <View style={styles.suggList}>
                {result.suggestions.map((s, i) => {
                  const isDentist = s.toLowerCase().includes('dentist') || s.toLowerCase().includes('visit');
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.suggItem}
                      onPress={() => isDentist && navigation.navigate('Dentists')}
                      activeOpacity={isDentist ? 0.7 : 1}
                    >
                      <View style={[styles.suggIcon, { backgroundColor: isDentist ? '#EEF2FF' : '#DCFCE7' }]}>
                        <Feather name={isDentist ? 'calendar' : 'check'} size={14} color={isDentist ? '#4F46E5' : '#10B981'} />
                      </View>
                      <Text style={styles.suggText}>{s}</Text>
                      {isDentist && <Feather name="chevron-right" size={14} color="#CBD5E1" />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Auto-saved indicator */}
            {autoSaved && (
              <View style={styles.autoSavedBanner}>
                <Feather name="check-circle" size={14} color="#10B981" />
                <Text style={styles.autoSavedText}>Automatically saved to your history</Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.scanAgainBtn}
                onPress={() => {
                  setImageUri(null);
                  setResult(null);
                  setAutoSaved(false);
                }}
                activeOpacity={0.8}
              >
                <Feather name="refresh-cw" size={16} color="#157A6E" />
                <Text style={styles.scanAgainText}>Scan Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dentistBtn}
                onPress={() => navigation.navigate('Dentists')}
                activeOpacity={0.8}
              >
                <Feather name="calendar" size={16} color="#4F46E5" />
                <Text style={styles.dentistBtnText}>Book Dentist</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </PhoneShell>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingBottom: 40, gap: 16 },

  // Upload
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  uploadPlaceholder: { alignItems: 'center', paddingVertical: 20, gap: 10 },
  uploadIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: 'rgba(21,122,110,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  uploadSub: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 20 },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#86F1D4',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 16,
  },
  uploadBtnText: { fontSize: 15, fontWeight: '700', color: '#0D4B42' },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    paddingVertical: 8,
  },
  retakeText: { fontSize: 13, color: '#64748B' },

  // Tips
  tipsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tipsTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tipDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#86F1D4' },
  tipText: { fontSize: 13, color: '#475569' },

  // Analyze
  analyzeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#86F1D4',
    paddingVertical: 18,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#86F1D4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  analyzeBtnText: { fontSize: 16, fontWeight: '700', color: '#0D4B42' },

  // Progress
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  progressLabel: { fontSize: 13, color: '#64748B', textAlign: 'center' },
  progressBg: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#86F1D4', borderRadius: 4 },

  // Offline / Real AI banners
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  offlineText: { flex: 1, fontSize: 12, fontWeight: '600', color: '#D97706' },
  realAIBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(21,122,110,0.08)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(21,122,110,0.2)',
  },
  realAIText: { flex: 1, fontSize: 12, fontWeight: '600', color: '#157A6E' },

  // Score
  scoreCard: {
    borderRadius: 28,
    padding: 24,
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  scoreTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreLabel: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase', letterSpacing: 1 },
  scoreBadge: { backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  scoreBadgeText: { fontSize: 11, fontWeight: '800', color: '#FFF' },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 12 },
  scoreNum: { fontSize: 60, fontWeight: '900', color: '#FFF', lineHeight: 64 },
  scoreUnit: { fontSize: 22, fontWeight: '700', color: 'rgba(255,255,255,0.8)', marginBottom: 10 },
  scoreDesc: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 8, fontWeight: '500' },

  // Findings
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    gap: 12,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  datasetTag: { fontSize: 10, fontWeight: '600', color: '#94A3B8', letterSpacing: 0.5, marginTop: -4 },
  findingsList: { gap: 10 },
  findingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    overflow: 'hidden',
  },
  findingLabel: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  findingDesc: { fontSize: 11, color: '#64748B', flex: 1, lineHeight: 16 },
  findingBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  findingBadgeText: { fontSize: 11, fontWeight: '700' },
  urgencyBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginTop: 4, alignSelf: 'flex-start' },
  urgencyText: { fontSize: 10, fontWeight: '700' },

  // Suggestions
  suggList: { gap: 10 },
  suggItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suggText: { flex: 1, fontSize: 13, color: '#0F172A' },

  // Actions
  actions: { flexDirection: 'row', gap: 12 },
  autoSavedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  autoSavedText: { fontSize: 13, fontWeight: '600', color: '#10B981' },
  scanAgainBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCFCE7',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#86F1D4',
  },
  scanAgainText: { fontSize: 14, fontWeight: '700', color: '#157A6E' },
  dentistBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EEF2FF',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  dentistBtnText: { fontSize: 14, fontWeight: '700', color: '#4F46E5' },
});
