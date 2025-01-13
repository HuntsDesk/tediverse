import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ParentRegistration from './registration/ParentRegistration';
import EducatorRegistration from './registration/EducatorRegistration';
import ProfessionalRegistration from './registration/ProfessionalRegistration';

export default function RegisterForm() {
  const [userType, setUserType] = useState(null);
  const [step, setStep] = useState('type-selection');

  const renderUserTypeSelection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#FF62A5] text-center">
        Join Tediverse
      </h2>
      <p className="text-center text-[#FF9A8C]">
        Select how you'll be using Tediverse
      </p>
      <div className="grid gap-4">
        {[
          { type: 'parent', label: 'Parent/Guardian', icon: '👨‍👩‍👧‍👦' },
          { type: 'educator', label: 'Educator', icon: '👩‍🏫' },
          { type: 'professional', label: 'Healthcare Professional', icon: '👨‍⚕️' }
        ].map(({ type, label, icon }) => (
          <button
            key={type}
            onClick={() => {
              setUserType(type);
              setStep('registration');
            }}
            className="p-6 text-left rounded-xl border-2 border-[#FFE4E1] hover:border-[#FF62A5] 
                       transition-colors flex items-center gap-4 bg-white"
          >
            <span className="text-2xl">{icon}</span>
            <div>
              <h3 className="font-semibold text-[#FF62A5]">{label}</h3>
              <p className="text-sm text-[#FF9A8C]">
                Register as a {label.toLowerCase()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderRegistrationForm = () => {
    switch (userType) {
      case 'parent':
        return <ParentRegistration onBack={() => setStep('type-selection')} />;
      case 'educator':
        return <EducatorRegistration onBack={() => setStep('type-selection')} />;
      case 'professional':
        return <ProfessionalRegistration onBack={() => setStep('type-selection')} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      {step === 'type-selection' ? renderUserTypeSelection() : renderRegistrationForm()}
    </div>
  );
}
