import {
  Users,
  UserPlus,
  CheckCircle,
  Trophy,
  XCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { axiosInstance } from "../../api/axiosInstance";
import { useEffect, useState } from "react";

function SalesDashboard() {
  const { accessToken } = useAuth();

  const [summary, setSummary] = useState({
    totalLeads: 0,
    totalEstDealValue: 0,
    totalValueWonDeals: 0,
    wonLeads: 0,
    lostLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
  });

  const financialStats = [
    {
      title: "Total Estimated Deal Value",
      value: `Rs. ${summary.totalEstDealValue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Total Value of Won Deals",
      value: `Rs. ${summary.totalValueWonDeals.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  const leadStats = [
    {
      title: "Total Leads",
      value: summary.totalLeads,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "New Leads",
      value: summary.newLeads,
      icon: UserPlus,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Qualified Leads",
      value: summary.qualifiedLeads,
      icon: CheckCircle,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Won Leads",
      value: summary.wonLeads,
      icon: Trophy,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Lost Leads",
      value: summary.lostLeads,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  async function getSummary() {
    try {
      const api = axiosInstance(accessToken);
      const res = await api.get("/v1/leads/sales-person/summary");

      if (res.status === 200) {
        setSummary((s) => ({
          ...s,
          ...res.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {financialStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4"
            >
              <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
                <Icon size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mt-8 mb-4">
        Lead Breakdown
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {leadStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalesDashboard;
