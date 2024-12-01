'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  FileText,
  MapPin,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const serviceData = [
  {
    name: "Next Day Air Letter",
    weightRange: "All",
    discount: 72,
    negotiationTactic:
      "Use value-added services to highlight competitive pricing",
    details: "Leverage high-volume shipping patterns to negotiate better rates",
  },
  {
    name: "3 Day Select Package",
    weightRange: "All",
    discount: 62,
    negotiationTactic: "Bundle with other services for increased savings",
    details: "Consider long-term commitment for better discount rates",
  },
  {
    name: "2nd Day Air AM CWT",
    weightRange: "All",
    discount: 0,
    negotiationTactic: "Focus on service reliability metrics",
    details:
      "Highlight consistent shipping volumes to negotiate initial discounts",
  },
];

function DiscountRow({ service, isActive, onToggle }) {
  const getDiscountColor = (discount) => {
    if (discount >= 65) return "text-green-500";
    if (discount >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getProgressColor = (discount) => {
    if (discount >= 65) return "bg-green-500";
    if (discount >= 40) return "bg-orange-500";
    return "text-red-500";
  };

  const getBorderColor = (discount) => {
    if (discount >= 65) return "border-green-500/20";
    if (discount >= 40) return "border-orange-500/20";
    return "border-red-500/20";
  };

  const getHoverEffect = (discount) => {
    if (discount >= 65) return "hover:bg-green-500/5";
    if (discount >= 40) return "hover:bg-orange-500/5";
    return "hover:bg-red-500/5";
  };

  return (
    <div
      className={`border ${getBorderColor(
        service.discount,
      )} rounded-xl overflow-hidden mb-4 transition-all duration-200`}
    >
      <div
        className={`p-6 bg-[#2A2A36] cursor-pointer ${getHoverEffect(
          service.discount,
        )} transition-colors duration-200`}
        onClick={onToggle}
      >
        <div className="grid grid-cols-3 items-center">
          <div>
            <h3 className="font-bold text-white">
              {service.name}
            </h3>
          </div>
          <div className="text-center text-gray-400">
            {service.weightRange}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-4">
              <span
                className={`font-bold text-lg ${getDiscountColor(
                  service.discount,
                )}`}
              >
                {service.discount}%
              </span>
              <div
                className="w-32 h-2 bg-[#1C1C28] rounded-full overflow-hidden"
              >
                <div
                  className={`h-full ${getProgressColor(
                    service.discount,
                  )} transition-all duration-500 ease-in-out`}
                  style={{ width: `${service.discount}%` }}
                />
              </div>
            </div>
            {isActive ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isActive && (
        <div
          className="p-6 bg-[#23232F] space-y-4 animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm text-gray-400 mb-2">
                Negotiation Tactic
              </h4>
              <p className="text-white">
                {service.negotiationTactic}
              </p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400 mb-2">
                Additional Details
              </h4>
              <p className="text-white">
                {service.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DiscountResults() {
  const router = useRouter();
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);
  const handleRowToggle = (index) => {
    setActiveRowIndex(activeRowIndex === index ? null : index);
  };

  return (
    <div
      className="min-h-screen bg-[#1C1C28] flex items-center justify-center w-full"
    >
      <div className="w-full max-w-[1800px] mx-auto">
        <div
          className="relative w-full bg-[#23232F]/80 rounded-2xl backdrop-blur-xl border border-[#2A2A36] overflow-hidden"
        >
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
          />

          <div className="relative z-10 p-12 md:p-16 lg:p-20">
            <Button
              variant="ghost"
              className="absolute left-8 top-8 text-gray-400 hover:text-white"
              onClick={() => router.push("/contract-discounts")}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1
                  className="text-4xl lg:text-5xl font-bold text-white mb-4"
                >
                  Discount Results
                </h1>
                <p className="text-xl text-gray-400">
                  Here's your calculated contract discount
                </p>
              </div>

              <div className="space-y-10">
                <div
                  className="bg-[#2A2A36] rounded-2xl p-12 text-center relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-purple-500/10"
                  />
                  <div className="relative z-10">
                    <h3
                      className="text-2xl font-semibold text-white mb-6"
                    >
                      Average Potential Savings
                    </h3>
                    <div
                      className="text-8xl font-bold text-orange-500 mb-6"
                    >
                      41%
                    </div>
                    <p className="text-xl text-gray-400">
                      Based on your weekly charges of ${formData?.weeklyCharges}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div
                    className="flex justify-between text-sm text-gray-400 px-6"
                  >
                    <div className="flex-1">
                      Service Name
                    </div>
                    <div className="flex-1 text-center">
                      Weight Range
                    </div>
                    <div className="flex-1 text-right">
                      Discount
                    </div>
                  </div>

                  {serviceData.map((service, index) => (
                    <DiscountRow
                      key={index}
                      service={service}
                      isActive={activeRowIndex === index}
                      onToggle={() => handleRowToggle(index)}
                      id={`ky17rg_${index}`}
                    />
                  ))}
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div
                    className="flex items-center justify-between p-6 rounded-xl bg-[#2A2A36]"
                  >
                    <div className="flex items-center">
                      <MapPin
                        className="h-6 w-6 text-orange-500 mr-4"
                      />
                      <span className="text-lg text-gray-400">
                        Zone/Place
                      </span>
                    </div>
                    <span
                      className="text-lg text-white font-medium"
                    >
                      {formData?.zone}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between p-6 rounded-xl bg-[#2A2A36]"
                  >
                    <div className="flex items-center">
                      <DollarSign
                        className="h-6 w-6 text-orange-500 mr-4"
                      />
                      <span className="text-lg text-gray-400">
                        Weekly Charges
                      </span>
                    </div>
                    <span
                      className="text-lg text-white font-medium"
                    >
                      ${formData?.weeklyCharges}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between p-6 rounded-xl bg-[#2A2A36]"
                  >
                    <div className="flex items-center">
                      <FileText
                        className="h-6 w-6 text-orange-500 mr-4"
                      />
                      <span className="text-lg text-gray-400">
                        Contract
                      </span>
                    </div>
                    <span
                      className="text-lg text-white font-medium truncate max-w-[200px]"
                    >
                      {formData?.pdf?.name || "No file"}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black text-lg font-semibold py-7 rounded-xl"
                >
                  Apply Discount
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
