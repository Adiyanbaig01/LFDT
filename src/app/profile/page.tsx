"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { User, Phone, Building, GraduationCap, MapPin, Calendar, Briefcase, Edit, CheckCircle, AlertCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
    const { user, userData, updateProfile, refreshUserData, signOut } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    
    const [profileData, setProfileData] = useState({
        phone: '',
        gender: '',
        country: '',
        department: '',
        courseStream: '',
        specialization: '',
        workExperience: '',
        program: '',
        yearOfGraduation: new Date().getFullYear() + 1,
        organizationName: ''
    });

    useEffect(() => {
        if (userData?.profile) {
            setProfileData({
                phone: userData.profile.phone || '',
                gender: userData.profile.gender || '',
                country: userData.profile.country || 'India',
                department: userData.profile.department || '',
                courseStream: userData.profile.courseStream || '',
                specialization: userData.profile.specialization || '',
                workExperience: userData.profile.workExperience || 'Student',
                program: userData.profile.program || '',
                yearOfGraduation: userData.profile.yearOfGraduation || new Date().getFullYear() + 1,
                organizationName: userData.profile.organizationName || 'Pimpri Chinchwad College of Engineering'
            });
        }
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: name === 'yearOfGraduation' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setIsSubmitting(true);
            setError(null);

            await updateProfile(profileData);
            await refreshUserData();
            
            setSuccess(true);
            setIsEditing(false);
            
            // Hide success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (error: any) {
            console.error('Profile update error:', error);
            setError(error.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);
            await signOut();
            // Force a hard reload of the home page to ensure all state is cleared
            window.location.href = '/';
        } catch (error: any) {
            console.error('Sign-out error:', error);
            setError(error.message || 'Failed to sign out. Please try again.');
            setIsSigningOut(false);
        }
    };

    const getCompletionPercentage = () => {
        if (!userData?.profile) return 0;
        
        const fields = [
            'phone', 'gender', 'country', 'department', 
            'courseStream', 'program', 'yearOfGraduation', 'organizationName'
        ];
        
        const filledFields = fields.filter(field => 
            userData.profile[field as keyof typeof userData.profile] && 
            userData.profile[field as keyof typeof userData.profile] !== ''
        );
        
        return Math.round((filledFields.length / fields.length) * 100);
    };

    const completionPercentage = getCompletionPercentage();

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-[#0a0e13] text-white">
                <HeroSection
                    title="My Profile"
                    subtitle="Manage your account information and preferences"
                    height={400}
                />

                <section className="relative px-6 py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl">
                        {/* Profile Completion */}
                        <div className="mb-8">
                            <SpotlightCard className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white">Profile Completion</h3>
                                    <span className="text-2xl font-bold text-[#3182ce]">{completionPercentage}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                                    <div 
                                        className="bg-gradient-to-r from-[#3182ce] to-[#4299e2] h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${completionPercentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-white/60 text-sm">
                                    {completionPercentage < 100 
                                        ? 'Complete your profile to get the most out of our platform'
                                        : 'Your profile is complete! 🎉'
                                    }
                                </p>
                            </SpotlightCard>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <div className="mb-6 bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <p className="text-green-300">Profile updated successfully!</p>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-300">{error}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Basic Info Card */}
                            <div className="lg:col-span-1">
                                <SpotlightCard className="p-6">
                                    <div className="text-center mb-6">
                                        {user?.photoURL ? (
                                            <Image
                                                src={user.photoURL}
                                                alt="Profile"
                                                width={96}
                                                height={96}
                                                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center mx-auto mb-4">
                                                <User className="w-12 h-12 text-white" />
                                            </div>
                                        )}
                                        <h2 className="text-xl font-bold text-white">{user?.displayName || 'User'}</h2>
                                        <p className="text-white/60">{user?.email}</p>
                                        <div className="mt-2 inline-block px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                                            {userData?.provider === 'google' ? 'Google Account' : 
                                             userData?.provider === 'github' ? 'GitHub Account' : 'Email Account'}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setIsEditing(!isEditing)}
                                            disabled={isSubmitting || isSigningOut}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50"
                                        >
                                            <Edit className="w-4 h-4" />
                                            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                        </button>
                                        
                                        <button
                                            onClick={handleSignOut}
                                            disabled={isSigningOut || isSubmitting}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors disabled:opacity-50"
                                        >
                                            {isSigningOut ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <LogOut className="w-4 h-4" />
                                            )}
                                            Sign Out
                                        </button>
                                    </div>
                                </SpotlightCard>
                            </div>

                            {/* Profile Details */}
                            <div className="lg:col-span-2">
                                <SpotlightCard className="p-6">
                                    {isEditing ? (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <h3 className="text-xl font-semibold text-white mb-4">Edit Profile Information</h3>
                                            
                                            {/* Personal Information */}
                                            <div className="space-y-4">
                                                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                                                    <User className="w-5 h-5" />
                                                    Personal Information
                                                </h4>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            value={profileData.phone}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter phone number"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Gender
                                                        </label>
                                                        <select
                                                            name="gender"
                                                            value={profileData.gender}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                            <option value="Prefer not to say">Prefer not to say</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Country
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="country"
                                                            value={profileData.country}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter country"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Work Experience
                                                        </label>
                                                        <select
                                                            name="workExperience"
                                                            value={profileData.workExperience}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                                                        >
                                                            <option value="Student">Student</option>
                                                            <option value="0-1 years">0-1 years</option>
                                                            <option value="1-3 years">1-3 years</option>
                                                            <option value="3-5 years">3-5 years</option>
                                                            <option value="5+ years">5+ years</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Academic Information */}
                                            <div className="space-y-4">
                                                <h4 className="text-lg font-medium text-white flex items-center gap-2">
                                                    <GraduationCap className="w-5 h-5" />
                                                    Academic Information
                                                </h4>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Organization Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="organizationName"
                                                            value={profileData.organizationName}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter organization name"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Department
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="department"
                                                            value={profileData.department}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g., Computer Engineering"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Course Stream
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="courseStream"
                                                            value={profileData.courseStream}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g., Engineering"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Program
                                                        </label>
                                                        <select
                                                            name="program"
                                                            value={profileData.program}
                                                            onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                                                        >
                                                            <option value="">Select Program</option>
                                                            <option value="Bachelor's">Bachelor&apos;s</option>
                                                            <option value="Master's">Master&apos;s</option>
                                                            <option value="PhD">PhD</option>
                                                            <option value="Diploma">Diploma</option>
                                                            <option value="Certificate">Certificate</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Specialization
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="specialization"
                                                            value={profileData.specialization}
                                                            onChange={handleInputChange}
                                                            placeholder="e.g., Artificial Intelligence"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                    
                                                    <div>
                                                        <label className="block text-white/80 text-sm font-medium mb-2">
                                                            Year of Graduation
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="yearOfGraduation"
                                                            value={profileData.yearOfGraduation}
                                                            onChange={handleInputChange}
                                                            min="2020"
                                                            max="2030"
                                                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit Buttons */}
                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3182ce] to-[#4299e2] text-white rounded-lg font-medium hover:from-[#2c5aa0] hover:to-[#3182ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? (
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                    ) : (
                                                        <CheckCircle className="w-5 h-5" />
                                                    )}
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Personal Info */}
                                                <div className="space-y-4">
                                                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                                                        <User className="w-5 h-5" />
                                                        Personal
                                                    </h4>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <Phone className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm">Phone:</span>
                                                            <span className="text-white">{profileData.phone || 'Not provided'}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <User className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm">Gender:</span>
                                                            <span className="text-white">{profileData.gender || 'Not provided'}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <MapPin className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm">Country:</span>
                                                            <span className="text-white">{profileData.country || 'Not provided'}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <Briefcase className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm">Experience:</span>
                                                            <span className="text-white">{profileData.workExperience || 'Not provided'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Academic Info */}
                                                <div className="space-y-4">
                                                    <h4 className="text-lg font-medium text-white flex items-center gap-2">
                                                        <GraduationCap className="w-5 h-5" />
                                                        Academic
                                                    </h4>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3 text-white/70">
                                                            <Building className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                                            <div>
                                                                <span className="text-sm block">Organization:</span>
                                                                <span className="text-white text-sm">{profileData.organizationName || 'Not provided'}</span>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <span className="w-4 h-4 flex-shrink-0"></span>
                                                            <span className="text-sm">Department:</span>
                                                            <span className="text-white">{profileData.department || 'Not provided'}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <span className="w-4 h-4 flex-shrink-0"></span>
                                                            <span className="text-sm">Program:</span>
                                                            <span className="text-white">{profileData.program || 'Not provided'}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-3 text-white/70">
                                                            <Calendar className="w-4 h-4 flex-shrink-0" />
                                                            <span className="text-sm">Graduation:</span>
                                                            <span className="text-white">{profileData.yearOfGraduation || 'Not provided'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {profileData.specialization && (
                                                <div>
                                                    <h5 className="text-white font-medium mb-2">Specialization:</h5>
                                                    <p className="text-white/70 bg-white/5 rounded-lg p-3">
                                                        {profileData.specialization}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </SpotlightCard>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}
