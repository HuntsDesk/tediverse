import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase-client';

export default function ParentRegistration({ onBack }) {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    familyName: '',
    childrenCount: '1'
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
        role: 'parent',
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      // Create family
      const { data: family, error: familyError } = await supabase
        .from('families')
        .insert([{ name: formData.familyName }])
        .select()
        .single();

      if (familyError) throw familyError;

      // Add parent as family member
      const { error: memberError } = await supabase
        .from('family_members')
        .insert([{
          family_id: family.id,
          profile_id: user.id,
          relationship: 'parent',
          is_primary: true
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
        <h2 className="text-2xl font-bold text-[#FF62A5]">Parent Registration</h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Family Name
          </label>
          <input
            type="text"
            required
            value={formData.familyName}
            onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
            placeholder="e.g., Smith Family"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#FF62A5]">
            Number of Children
          </label>
          <select
            value={formData.childrenCount}
            onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
            className="mt-1 w-full rounded-lg border-2 border-[#FFE4E1] p-2"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
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
