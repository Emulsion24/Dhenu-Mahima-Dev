"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Clock, ArrowLeft, RefreshCw } from "lucide-react";

export default function MagazineStatusClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const statusParam = searchParams.get("status");
  const amount = searchParams.get("amount");
  const transactionId = searchParams.get("txn");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  // Normalize status — treat ACTIVE same as COMPLETED
  const status =
    statusParam === "active"
      ? "COMPLETED"
      : statusParam?.toUpperCase() || "UNKNOWN";

  const statusConfig = {
    COMPLETED: {
      message: "Magazine Subscription Successful!",
      description:
        "Thank you for your generosity. Your contribution makes a real difference.",
      icon: CheckCircle,
      color: "text-emerald-500",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100",
      buttonText: "Return to Homepage",
      buttonStyle:
        "from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700",
    },
    FAILED: {
      message: "Payment Failed",
      description:
        "We couldn't process your donation. Please check your payment details and try again.",
      icon: XCircle,
      color: "text-red-500",
      bgGradient: "from-red-50 to-rose-50",
      iconBg: "bg-red-100",
      buttonText: "Try Again",
      buttonStyle:
        "from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700",
    },
    PENDING: {
      message: "Payment Processing",
      description:
        "Your donation is being processed. We'll send you a confirmation email shortly.",
      icon: Clock,
      color: "text-amber-500",
      bgGradient: "from-amber-50 to-yellow-50",
      iconBg: "bg-amber-100",
      buttonText: "Return to Homepage",
      buttonStyle:
        "from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700",
    },
    UNKNOWN: {
      message: "Unknown Status",
      description:
        "We couldn't determine your donation status. Please contact support.",
      icon: XCircle,
      color: "text-gray-500",
      bgGradient: "from-gray-50 to-slate-50",
      iconBg: "bg-gray-100",
      buttonText: "Go to Homepage",
      buttonStyle:
        "from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700",
    },
  };

  const config = statusConfig[status] || statusConfig.UNKNOWN;
  const Icon = config.icon;

  const handleButtonClick = () => {
    if (status === "FAILED") router.push("/magazine");
    else router.push("/");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.bgGradient} px-4 py-8 transition-all duration-700`}
    >
      <div
        className={`transform transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-lg text-center relative overflow-hidden border border-gray-100">
          {/* Decorative circles */}
          <div
            className={`absolute -top-20 -left-20 w-40 h-40 ${config.iconBg} rounded-full opacity-20 blur-3xl animate-pulse`}
          ></div>
          <div
            className={`absolute -bottom-20 -right-20 w-48 h-48 ${config.iconBg} rounded-full opacity-20 blur-3xl animate-pulse`}
            style={{ animationDelay: "1s" }}
          ></div>

          {/* Icon */}
          <div className={`mb-6 ${config.color} relative`}>
            <div className={`inline-flex p-5 rounded-full ${config.iconBg} mb-4`}>
              <Icon
                className={`w-16 h-16 ${
                  status === "COMPLETED"
                    ? "animate-bounce"
                    : status === "PENDING"
                    ? "animate-spin-slow"
                    : "animate-pulse"
                }`}
                style={{
                  animationDuration: status === "PENDING" ? "3s" : "1s",
                }}
              />
            </div>
            {status === "COMPLETED" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-emerald-200 rounded-full animate-ping opacity-20"></div>
              </div>
            )}
          </div>

          {/* Text */}
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 ${config.color} tracking-tight`}
          >
            {config.message}
          </h1>

          <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed px-2">
            {config.description}
          </p>

          {/* Amount + Transaction Info */}
          {(amount || transactionId) && (
            <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
              {amount && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm font-medium">
                    Amount:
                  </span>
                  <span className="text-gray-900 text-lg font-bold">
                    ₹{amount}
                  </span>
                </div>
              )}
              {transactionId && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">
                    Transaction ID:
                  </span>
                  <span className="text-gray-700 text-xs font-mono">
                    {transactionId}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleButtonClick}
              className={`w-full bg-gradient-to-r ${config.buttonStyle} text-white font-semibold py-4 rounded-xl shadow-lg transition-all transform hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2`}
            >
              {status === "FAILED" ? (
                <RefreshCw className="w-5 h-5" />
              ) : null}
              {config.buttonText}
            </button>

            {status !== "PENDING" && (
              <button
                onClick={() => router.back()}
                className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 hover:border-gray-300"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            )}
          </div>

          {status === "PENDING" && (
            <p className="mt-6 text-sm text-gray-500">
              Processing time: 2-5 minutes
            </p>
          )}

          {status === "FAILED" && (
            <p className="mt-6 text-sm text-gray-500">
              Need help?{" "}
              <a
                href="/support"
                className="text-red-500 hover:underline font-medium"
              >
                Contact Support
              </a>
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
