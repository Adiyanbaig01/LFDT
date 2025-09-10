"use client";

import { useState, useEffect } from "react";
import { Clock, Star, CheckCircle, Calendar, MapPin, Users } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SpotlightCard from "@/components/ui/SpotlightCard";

interface WaitingPageProps {
    teamName: string;
    userName: string;
}

export default function WaitingPage({ teamName, userName }: WaitingPageProps) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Event dates (you can adjust these based on actual hackathon schedule)
    const eventDates = {
        phase1: new Date('2025-09-12T09:00:00'),  // Workshop
        phase2Start: new Date('2025-09-13T09:00:00'),  // Hackathon start
        phase2End: new Date('2025-09-14T21:00:00'),    // Hackathon end
        phase3: new Date('2025-09-15T10:00:00')        // Presentations
    };

    const getEventStatus = () => {
        const now = currentTime.getTime();
        
        if (now < eventDates.phase1.getTime()) {
            return {
                status: 'waiting_for_workshop',
                message: 'Waiting for Workshop to begin',
                timeUntil: eventDates.phase1.getTime() - now
            };
        } else if (now < eventDates.phase2Start.getTime()) {
            return {
                status: 'workshop_active',
                message: 'Workshop in progress - Hackathon starts soon!',
                timeUntil: eventDates.phase2Start.getTime() - now
            };
        } else if (now < eventDates.phase2End.getTime()) {
            return {
                status: 'hackathon_active',
                message: 'Build-A-Thon is LIVE! Time to code!',
                timeUntil: eventDates.phase2End.getTime() - now
            };
        } else if (now < eventDates.phase3.getTime()) {
            return {
                status: 'waiting_for_presentations',
                message: 'Hackathon complete - Preparing for presentations',
                timeUntil: eventDates.phase3.getTime() - now
            };
        } else {
            return {
                status: 'presentations_active',
                message: 'Presentation time! Show your innovation!',
                timeUntil: 0
            };
        }
    };

    const formatTimeRemaining = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const eventStatus = getEventStatus();

    return (
        <main className="min-h-screen bg-[#0a0e13] text-white">
            <HeroSection
                title="Build-A-Thon 2025"
                subtitle="Welcome to the main event!"
                height={400}
            >
                <div className="mt-6 flex items-center justify-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
                    <span className="text-lg font-medium">Shortlisted Participant</span>
                </div>
            </HeroSection>

            <section className="relative px-6 py-16 sm:py-20">
                <div className="mx-auto max-w-4xl">
                    {/* Welcome Card */}
                    <SpotlightCard className="p-8 mb-8">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#3182ce] to-[#4299e2] rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                Welcome, {userName}!
                            </h2>
                            <p className="text-lg text-white/80 mb-2">Team: <strong>{teamName}</strong></p>
                            <p className="text-white/60">
                                You&apos;re all set for the Build-A-Thon 2025 main event!
                            </p>
                        </div>
                    </SpotlightCard>

                    {/* Event Status Card */}
                    <SpotlightCard className="p-8 mb-8">
                        <div className="text-center">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                                eventStatus.status === 'hackathon_active' 
                                    ? 'bg-green-600/20 text-green-300' 
                                    : 'bg-blue-600/20 text-blue-300'
                            }`}>
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">{eventStatus.message}</span>
                            </div>
                            
                            {eventStatus.timeUntil > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                                    <p className="text-white/60 mb-2">
                                        {eventStatus.status === 'hackathon_active' ? 'Time remaining:' : 'Time until next phase:'}
                                    </p>
                                    <div className="text-4xl font-mono font-bold text-white">
                                        {formatTimeRemaining(eventStatus.timeUntil)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </SpotlightCard>

                    {/* Event Schedule */}
                    <SpotlightCard className="p-8 mb-8">
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Event Schedule</h3>
                        <div className="space-y-4">
                            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
                                eventStatus.status === 'waiting_for_workshop' || eventStatus.status === 'workshop_active'
                                    ? 'border-blue-600/50 bg-blue-900/20'
                                    : 'border-white/10 bg-white/5'
                            }`}>
                                <div className="w-12 h-12 bg-[#3182ce]/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-[#3182ce]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Phase 1: Workshop</h4>
                                    <p className="text-white/60 text-sm">Sept 12, 2025 • 9:00 AM - 5:00 PM</p>
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
                                eventStatus.status === 'hackathon_active'
                                    ? 'border-green-600/50 bg-green-900/20'
                                    : 'border-white/10 bg-white/5'
                            }`}>
                                <div className="w-12 h-12 bg-[#3182ce]/20 rounded-lg flex items-center justify-center">
                                    <Users className="w-6 h-6 text-[#3182ce]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Phase 2: Hackathon</h4>
                                    <p className="text-white/60 text-sm">Sept 13-14, 2025 • 36 hours of coding</p>
                                </div>
                            </div>

                            <div className={`flex items-center gap-4 p-4 rounded-lg border ${
                                eventStatus.status === 'presentations_active'
                                    ? 'border-yellow-600/50 bg-yellow-900/20'
                                    : 'border-white/10 bg-white/5'
                            }`}>
                                <div className="w-12 h-12 bg-[#3182ce]/20 rounded-lg flex items-center justify-center">
                                    <Star className="w-6 h-6 text-[#3182ce]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Phase 3: Presentations</h4>
                                    <p className="text-white/60 text-sm">Sept 15, 2025 • 10:00 AM onwards</p>
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Important Information */}
                    <SpotlightCard className="p-8">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">Important Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-white mb-2">Venue</h4>
                                <div className="flex items-center gap-2 text-white/70">
                                    <MapPin className="w-4 h-4 text-[#3182ce]" />
                                    <span className="text-sm">PCCOE, Akurdi, Pune</span>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-white mb-2">What to Bring</h4>
                                <ul className="text-white/70 text-sm space-y-1">
                                    <li>• Your laptop and charger</li>
                                    <li>• ID proof</li>
                                    <li>• Enthusiasm to innovate!</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/50 rounded-lg">
                            <p className="text-blue-300 text-sm text-center">
                                <strong>Note:</strong> This page is only accessible to shortlisted participants. 
                                Keep refreshing for real-time updates during the event!
                            </p>
                        </div>
                    </SpotlightCard>
                </div>
            </section>
        </main>
    );
}
