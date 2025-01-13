import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase-client';

export default function EducatorRegistration({ onBack }) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institutionName: '',
    institutionType: 'school',
    role: 'teacher'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Create auth user and profile
      await signUp(formData.email, formData.password, {
        role: 'educator',
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      // Create or find institution
      const { data: institution, error: institutionError } = await supabase
        .from('institutions')
        .insert([{
          name: formData.institutionName,
          type: formData.institutionType
        }])
        .select()
        .single();

      if (institutionError) throw institutionError;

      // Add educator as institution member
      const { error: memberError } = await supabase
        .from('institution_members')
        .insert([{
          institution_id: institution.id,
          profile_id: user.id,
          role: formData.role
        }]);

      if (memberError) throw memberError;

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="text-[#FF62A5] hover:text-[#FF4D94]"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-[#FF62A5]">Educator Registration</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#FF62A5]">
              First Name
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#FF62A5]">
              Last Name
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
            />
          </div>
        </div>

        {/* Email and Password */}
        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          />
        </div>

        {/* Institution Information */}
        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Institution Name
          </label>
          <input
            type="text"
            required
            value={formData.institutionName}
            onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Institution Type
          </label>
          <select
            value={formData.institutionType}
            onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          >
            <option value="school">School</option>
            <option value="special_education">Special Education Center</option>
            <option value="therapy_center">Therapy Center</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Your Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          >
            <option value="teacher">Teacher</option>
            <option value="administrator">Administrator</option>
            <option value="specialist">Special Education Specialist</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#FF62A5] text-white rounded-lg hover:bg-[#FF4D94] 
                     transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
