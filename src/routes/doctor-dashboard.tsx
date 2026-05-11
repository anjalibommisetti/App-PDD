import React, { useState } from "react";
import {
  Users,
  Activity,
  AlertCircle,
  CheckCircle,
  Search,
  Filter,
  FileText,
  ChevronRight,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data
const MOCK_PATIENTS = [
  {
    id: "1",
    name: "Emily Chen",
    age: 8,
    lastVisit: "2026-05-01",
    risk: "High",
    aiDiagnosis: "Early Childhood Caries",
    confidence: 94,
    status: "Pending Review",
  },
  {
    id: "2",
    name: "Michael Smith",
    age: 34,
    lastVisit: "2026-05-10",
    risk: "Medium",
    aiDiagnosis: "Gingivitis",
    confidence: 88,
    status: "Approved",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    age: 45,
    lastVisit: "2026-04-20",
    risk: "Low",
    aiDiagnosis: "Healthy",
    confidence: 99,
    status: "Approved",
  },
  {
    id: "4",
    name: "David Lee",
    age: 28,
    lastVisit: "2026-05-05",
    risk: "Medium",
    aiDiagnosis: "Calculus",
    confidence: 75,
    status: "Pending Review",
  },
  {
    id: "5",
    name: "Emma Wilson",
    age: 12,
    lastVisit: "2026-05-11",
    risk: "High",
    aiDiagnosis: "Tooth Discoloration",
    confidence: 91,
    status: "Pending Review",
  },
];

function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState<(typeof MOCK_PATIENTS)[0] | null>(null);

  const filteredPatients = MOCK_PATIENTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === "All" || p.risk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  const handleApprove = () => {
    if (selectedPatient) {
      alert(`Diagnosis approved for ${selectedPatient.name}`);
      setSelectedPatient(null);
    }
  };

  const handleReject = () => {
    if (selectedPatient) {
      alert(`Diagnosis rejected for ${selectedPatient.name}`);
      setSelectedPatient(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Doctor Portal</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage patients, review AI predictions, and analyze health trends.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">High Risk Patients</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">2 Alerts</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 flex items-center gap-3 shadow-sm">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">
              <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Reviews</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">3 Scans</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Patient List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
              >
                <option value="All">All Risks</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">Patient Name</th>
                    <th className="px-6 py-4 font-medium">Last Visit</th>
                    <th className="px-6 py-4 font-medium">Risk Level</th>
                    <th className="px-6 py-4 font-medium">AI Diagnosis</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {patient.name}
                        </div>
                        <div className="text-xs text-slate-500">Age: {patient.age}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {patient.lastVisit}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            patient.risk === "High"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              : patient.risk === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {patient.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {patient.aiDiagnosis}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium
                          ${patient.status === "Approved" ? "text-green-600 dark:text-green-400" : "text-blue-600 dark:text-blue-400"}`}
                        >
                          {patient.status === "Approved" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <Activity className="w-3 h-3" />
                          )}
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center"
                        >
                          Review <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredPatients.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No patients found matching your criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Prediction Review Panel */}
        <div className="lg:col-span-1">
          {selectedPatient ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden sticky top-24"
            >
              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  AI Prediction Review
                </h3>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">Patient</h4>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedPatient.name}
                  </p>
                  <p className="text-sm text-slate-500">Age: {selectedPatient.age}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      AI Diagnosis
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full font-bold">
                      {selectedPatient.confidence}% Confidence
                    </span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {selectedPatient.aiDiagnosis}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-500 block mb-1">
                        Risk Level Assessment
                      </span>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${selectedPatient.risk === "High" ? "bg-red-500 w-[90%]" : selectedPatient.risk === "Medium" ? "bg-yellow-500 w-[60%]" : "bg-green-500 w-[20%]"}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    Doctor Actions
                  </h4>

                  {selectedPatient.status === "Pending Review" ? (
                    <div className="flex gap-3">
                      <button
                        onClick={handleApprove}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={handleReject}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg flex items-center justify-center gap-2 font-medium">
                      <CheckCircle className="w-5 h-5" /> Diagnosis Already Approved
                    </div>
                  )}

                  <button className="w-full flex items-center justify-center gap-2 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium mt-2">
                    <FileText className="w-4 h-4" /> Upload Prescription
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-dashed rounded-xl h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 p-8 text-center">
              <Users className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" />
              <p className="font-medium text-slate-600 dark:text-slate-300 mb-2">
                No Patient Selected
              </p>
              <p className="text-sm">
                Select a patient from the list to review their AI diagnosis, upload prescriptions,
                and approve records.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
