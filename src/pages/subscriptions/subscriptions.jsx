import React, { useState } from "react";
import { 
  Check, 
  Star, 
  Zap, 
  Crown,
  CreditCard,
  Shield,
  Download,
  Users,
  FileText,
  Sparkles,
  X,
  ArrowRight,
  Building,
  Smartphone,
  Wallet,
  QrCode,
  GraduationCap,
  BookOpen,
  Video,
  Award,
  Clock,
  Globe,
  BarChart3,
  Users2,
  BookMarked,
  Target
} from "lucide-react";

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isYearly, setIsYearly] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [upiId, setUpiId] = useState("");

  const plans = [
    {
      id: "free",
      name: "Student",
      description: "Perfect for individual learners",
      price: { monthly: 0, yearly: 0 },
      popular: false,
      icon: BookOpen,
      color: "bg-gray-500",
      features: [
        "Access to 50+ basic courses",
        "Video lectures & materials",
        "Basic assignments & quizzes",
        "Community forum access",
        "Email support",
        "Progress tracking",
        "Mobile app access",
        "Certificate of completion"
      ],
      limitations: [
        "Limited to 3 courses at a time",
        "No downloadable resources",
        "Standard video quality",
        "No mentor support"
      ]
    },
    {
      id: "lite",
      name: "Professional",
      description: "For serious learners & career growth",
      price: { monthly: 29, yearly: 290 },
      popular: true,
      icon: Zap,
      color: "bg-blue-500",
      features: [
        "All Student features",
        "Unlimited course access",
        "500+ premium courses",
        "Downloadable resources",
        "HD video quality",
        "1-on-1 mentor support",
        "Career guidance sessions",
        "Project-based learning",
        "Industry certifications",
        "Resume building tools",
        "LinkedIn profile review",
        "Job placement assistance"
      ],
      limitations: [
        "Limited to 5 mentor sessions/month",
        "Basic career support"
      ]
    },
    {
      id: "pro",
      name: "Enterprise",
      description: "For teams & comprehensive learning",
      price: { monthly: 79, yearly: 790 },
      popular: false,
      icon: Crown,
      color: "bg-purple-500",
      features: [
        "All Professional features",
        "Unlimited mentor sessions",
        "1000+ expert-led courses",
        "Custom learning paths",
        "Team management dashboard",
        "Advanced analytics & reports",
        "API access",
        "White-label solutions",
        "Dedicated success manager",
        "Custom content creation",
        "Skill gap analysis",
        "Learning & development planning",
        "Bulk user management",
        "SSO integration",
        "Advanced security features"
      ],
      limitations: []
    }
  ];

  const features = [
    {
      name: "Course Access",
      free: "50+ Courses",
      lite: "500+ Premium",
      pro: "1000+ Expert"
    },
    {
      name: "Video Quality",
      free: "Standard",
      lite: "HD",
      pro: "4K & Download"
    },
    {
      name: "Mentor Support",
      free: "❌",
      lite: "5 sessions/month",
      pro: "Unlimited"
    },
    {
      name: "Certifications",
      free: "Basic",
      lite: "Industry-recognized",
      pro: "Advanced + Custom"
    },
    {
      name: "Career Support",
      free: "❌",
      lite: "Resume & LinkedIn",
      pro: "Full placement assistance"
    },
    {
      name: "Learning Paths",
      free: "Standard",
      lite: "Customizable",
      pro: "AI-Powered Custom"
    },
    {
      name: "Team Features",
      free: "❌",
      lite: "❌",
      pro: "Full suite"
    },
    {
      name: "Analytics",
      free: "Basic",
      lite: "Advanced",
      pro: "Enterprise-grade"
    },
    {
      name: "API Access",
      free: "❌",
      lite: "❌",
      pro: "✅"
    },
    {
      name: "Support",
      free: "Email",
      lite: "Priority + Chat",
      pro: "24/7 Dedicated"
    }
  ];

  const learningOutcomes = [
    {
      icon: Target,
      title: "Skill Mastery",
      description: "Master in-demand skills with hands-on projects"
    },
    {
      icon: BarChart3,
      title: "Career Growth",
      description: "Boost your career with industry-recognized certifications"
    },
    {
      icon: Users2,
      title: "Expert Community",
      description: "Learn from industry experts and peers"
    },
    {
      icon: BookMarked,
      title: "Lifetime Access",
      description: "Keep your skills updated with continuous learning"
    }
  ];

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay with Visa, Mastercard, RuPay",
      color: "bg-blue-500"
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm",
      color: "bg-green-500"
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building,
      description: "All major Indian banks",
      color: "bg-purple-500"
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: Wallet,
      description: "Paytm, Amazon Pay, MobiKwik",
      color: "bg-orange-500"
    }
  ];

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "Indian Bank"
  ];

  const wallets = [
    "Paytm Wallet",
    "Amazon Pay",
    "MobiKwik",
    "FreeCharge",
    "Oxigen Wallet"
  ];

  const calculateSavings = (monthlyPrice, yearlyPrice) => {
    const yearlyTotal = monthlyPrice * 12;
    const savings = yearlyTotal - yearlyPrice;
    const percentage = ((savings / yearlyTotal) * 100).toFixed(0);
    return { savings, percentage };
  };

  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    const selectedPlanData = plans.find(plan => plan.id === selectedPlan);
    const price = isYearly ? selectedPlanData.price.yearly : selectedPlanData.price.monthly;
    const billingPeriod = isYearly ? "year" : "month";

    const renderPaymentForm = () => {
      switch (selectedPaymentMethod) {
        case "card":
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield size={16} className="text-green-500" />
                Your card details are secure and encrypted
              </div>
            </div>
          );

        case "upi":
          return (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your UPI ID (e.g., 1234567890@paytm, yourname@okicici)
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <QrCode size={20} className="text-green-600" />
                  <span className="font-semibold text-gray-900">Scan QR Code</span>
                </div>
                <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300 text-center">
                  <div className="text-gray-500 text-sm mb-2">
                    QR Code would appear here
                  </div>
                  <div className="text-xs text-gray-400">
                    Scan with any UPI app to pay
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Smartphone size={16} className="text-blue-500" />
                Supports Google Pay, PhonePe, Paytm, BHIM and all UPI apps
              </div>
            </div>
          );

        case "netbanking":
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Bank
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Choose your bank</option>
                  {banks.map((bank, index) => (
                    <option key={index} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <Building size={16} />
                  You will be redirected to your bank's secure portal for payment
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-2">Popular Banks:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {banks.slice(0, 6).map((bank, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {bank}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case "wallet":
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Digital Wallet
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="">Choose your wallet</option>
                  {wallets.map((wallet, index) => (
                    <option key={index} value={wallet}>
                      {wallet}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <Wallet size={16} />
                  You will be redirected to your wallet app for payment
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Instant payment with your digital wallet balance</p>
              </div>
            </div>
          );

        default:
          return null;
      }
    };

    const getPayButtonText = () => {
      switch (selectedPaymentMethod) {
        case "card":
          return `Pay £${price}`;
        case "upi":
          return `Pay £${price} via UPI`;
        case "netbanking":
          return `Pay £${price} via Net Banking`;
        case "wallet":
          return `Pay £${price} via Wallet`;
        default:
          return `Pay £${price}`;
      }
    };

    return (
      <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4 z-[2000]">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Complete Payment</h3>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Plan Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${selectedPlanData.color} text-white`}>
                  <selectedPlanData.icon size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{selectedPlanData.name} Plan</h4>
                  <p className="text-sm text-gray-600">{selectedPlanData.description}</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                £{price}
                <span className="text-sm font-normal text-gray-600">/{billingPeriod}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Choose Payment Method</h4>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      selectedPaymentMethod === method.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1 rounded ${method.color} text-white`}>
                        <method.icon size={14} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {method.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <div className="mb-6">
              {renderPaymentForm()}
            </div>

            {/* Pay Button */}
            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2">
              <CreditCard size={20} />
              {getPayButtonText()}
            </button>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield size={12} className="text-green-500" />
                <span>Secure payment • SSL encrypted • 100% safe</span>
              </div>
            </div>

            {/* Additional Payment Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• All payments are secure and encrypted</li>
                <li>• You'll get instant access after payment</li>
                <li>• 30-day money-back guarantee</li>
                <li>• Contact support for any payment issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-2xl">
              <GraduationCap size={32} />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unlock Your Learning Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your learning journey. 
            From individual courses to enterprise solutions, we have you covered.
          </p>
        </div>

        {/* Learning Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {learningOutcomes.map((outcome, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <outcome.icon size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{outcome.title}</h3>
              <p className="text-sm text-gray-600">{outcome.description}</p>
            </div>
          ))}
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="flex items-center gap-4">
              <span className={`font-semibold ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className="relative w-14 h-7 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                    isYearly ? 'transform translate-x-7' : 'transform translate-x-1'
                  }`}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
                  Yearly
                </span>
                {isYearly && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Save 17%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const price = isYearly ? plan.price.yearly : plan.price.monthly;
            const { savings, percentage } = calculateSavings(plan.price.monthly, plan.price.yearly);
            const isFree = plan.id === "free";

            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:scale-105 ${
                  selectedPlan === plan.id 
                    ? 'border-purple-500 shadow-xl' 
                    : 'border-gray-200'
                } ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star size={14} />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${plan.color} text-white`}>
                      <plan.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        £{isYearly && !isFree ? plan.price.yearly : price}
                      </span>
                      {!isFree && (
                        <span className="text-gray-600">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      )}
                    </div>
                    {isYearly && !isFree && savings > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-500 line-through">
                          £{plan.price.monthly * 12}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Save ${savings} ({percentage}%)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="bg-green-100 p-1 rounded-full">
                          <Check size={14} className="text-green-600" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">Limitations</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-center gap-3 text-sm text-gray-500">
                            <X size={14} className="text-red-500" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const isFree = plan.id === "free";

            return (
              <div key={plan.id} className="flex flex-col">
                <div className="flex-1"></div>
                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    if (!isFree) setShowPaymentModal(true);
                  }}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : plan.id === 'free'
                      ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                  }`}
                >
                  {isFree ? (
                    <>
                      Start Learning Free
                      <ArrowRight size={16} />
                    </>
                  ) : (
                    <>
                      <CreditCard size={16} />
                      Get Started
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-16">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Compare Learning Plans
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 px-6">
                        <div className="flex flex-col items-center">
                          <div className={`p-2 rounded-lg ${plan.color} text-white mb-2`}>
                            <plan.icon size={20} />
                          </div>
                          <span className="font-semibold text-gray-900">{plan.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {feature.name}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="text-center py-4 px-6 text-gray-700">
                          {feature[plan.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Shield size={20} className="text-green-500" />
              <span className="font-semibold">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Download size={20} className="text-blue-500" />
              <span className="font-semibold">Instant Access</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={20} className="text-purple-500" />
              <span className="font-semibold">50,000+ Learners</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award size={20} className="text-orange-500" />
              <span className="font-semibold">Industry Certifications</span>
            </div>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            All paid plans include a 30-day money-back guarantee. Cancel anytime. 
            No hidden fees. Upgrade or downgrade your plan at any time.
          </p>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal />
    </div>
  );
}