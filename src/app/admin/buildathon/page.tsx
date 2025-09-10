"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
    Users, 
    Phone, 
    Calendar,
    Star,
    Download,
    Search,
    Filter,
    LogOut,
    CheckCircle,
    XCircle,
    Loader2
} from "lucide-react";

interface TeamData {
    registration: {
        eventId: string;
        userId: string;
        userEmail: string;
        team: {
            teamName: string;
            memberCount: number;
        };
        contact: {
            phone: string;
        };
        driveFolderUrl: string;
        status: 'registered' | 'submitted' | 'withdrawn';
        createdAt: any;
    };
    userData: {
        uid: string;
        email: string | null;
        displayName: string | null;
        photoURL: string | null;
        createdAt: any;
    };
    isShortlisted: boolean;
}

function formatFirestoreDate(d: any): string | null {
    // Supports Firestore Timestamp, {seconds, nanoseconds}, string dates, or Date
    if (!d) return null;
    
    let date: Date;
    
    // If it's a Timestamp-like
    if (typeof d?.toDate === 'function') {
        try { date = d.toDate(); } catch { return null; }
    }
    // If it's the wire format {seconds, nanoseconds}
    else if (typeof d?.seconds === 'number') {
        date = new Date(d.seconds * 1000);
    }
    // If it's already a JS Date
    else if (d instanceof Date) {
        date = d;
    }
    // If it came as an ISO/string
    else if (typeof d === 'string') {
        date = new Date(d);
        if (isNaN(date.getTime())) return null;
    }
    else {
        return null;
    }
    
    // Format as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [filteredTeams, setFilteredTeams] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [shortlistFilter, setShortlistFilter] = useState<string>("all");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        filterTeams();
    }, [teams, searchTerm, statusFilter, shortlistFilter]);

    const fetchTeams = async () => {
        try {
            const response = await fetch("/api/admin/teams");
            if (response.ok) {
                const data = await response.json();
                setTeams(data);
            }
        } catch (error) {
            console.error("Error fetching teams:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterTeams = () => {
        let filtered = teams;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(team =>
                team.registration.team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                team.userData.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                team.userData.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(team => team.registration.status === statusFilter);
        }

        // Shortlist filter
        if (shortlistFilter !== "all") {
            filtered = filtered.filter(team => 
                shortlistFilter === "shortlisted" ? team.isShortlisted : !team.isShortlisted
            );
        }

        setFilteredTeams(filtered);
    };

    const handleShortlist = async (userId: string, isCurrentlyShortlisted: boolean) => {
        setActionLoading(userId);
        try {
            const response = await fetch("/api/admin/shortlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    userId, 
                    action: isCurrentlyShortlisted ? "remove" : "add" 
                }),
            });

            if (response.ok) {
                await fetchTeams(); // Refresh data
            }
        } catch (error) {
            console.error("Error updating shortlist:", error);
        } finally {
            setActionLoading(null);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin");
            router.refresh();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleExport = async (shortlistedOnly = false) => {
        try {
            const queryParam = shortlistedOnly ? "?shortlistedOnly=true" : "";
            const response = await fetch(`/api/admin/export${queryParam}`);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `buildathon-teams${shortlistedOnly ? "-shortlisted" : ""}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error("Error exporting data:", error);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0a0e13] text-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                    <p className="text-white/70">Loading teams...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-20 bg-[#0a0e13] text-white">
            {/* Header */}
            <div className="border-b border-white/10 bg-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">Build-A-Thon Admin</h1>
                            <p className="text-white/60">{teams.length} total registrations</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => handleExport(false)}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Export All
                            </button>
                            <button
                                onClick={() => handleExport(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-600/50 rounded-lg hover:bg-green-600/30 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                Export Shortlisted
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/50 rounded-lg hover:bg-red-600/30 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3.5 text-white/50" />
                        <input
                            type="text"
                            placeholder="Search teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#3182ce]"
                        />
                    </div>
                    
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                    >
                        <option value="all">All Status</option>
                        <option value="registered">Registered</option>
                        <option value="submitted">Submitted</option>
                        <option value="withdrawn">Withdrawn</option>
                    </select>

                    <select
                        value={shortlistFilter}
                        onChange={(e) => setShortlistFilter(e.target.value)}
                        className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#3182ce]"
                    >
                        <option value="all">All Teams</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="not-shortlisted">Not Shortlisted</option>
                    </select>

                    <div className="text-white/60 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        {filteredTeams.length} of {teams.length} teams
                    </div>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                        <div
                            key={team.registration.userId}
                            className={`bg-white/5 border rounded-lg p-6 ${
                                team.isShortlisted 
                                    ? "border-green-600/50 bg-green-900/10" 
                                    : "border-white/10"
                            }`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {team.registration.team.teamName}
                                    </h3>
                                    <p className="text-white/60 text-sm">
                                        {team.userData.displayName || "No name"}
                                    </p>
                                </div>
                                {team.isShortlisted && (
                                    <Star className="w-5 h-5 text-green-400" fill="currentColor" />
                                )}
                            </div>

                            {/* Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-sm text-white/70">
                                    <Users className="w-4 h-4" />
                                    {team.registration.team.memberCount} members
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm text-white/70">
                                    <Phone className="w-4 h-4" />
                                    {team.registration.contact.phone}
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm text-white/70">
                                    <Calendar className="w-4 h-4" />
                                    {formatFirestoreDate(team.registration.createdAt) || "—"}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        team.registration.status === "submitted" 
                                            ? "bg-green-900/50 text-green-300"
                                            : team.registration.status === "withdrawn"
                                            ? "bg-red-900/50 text-red-300"
                                            : "bg-blue-900/50 text-blue-300"
                                    }`}>
                                        {team.registration.status}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* View Drive */}
                                <a
                                    href={team.registration.driveFolderUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border ${
                                        team.registration.driveFolderUrl
                                            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                                            : 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed'
                                    }`}
                                    onClick={(e) => {
                                        if (!team.registration.driveFolderUrl) e.preventDefault();
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M10.5 3.75a.75.75 0 0 1 .75-.75h7.5A.75.75 0 0 1 19.5 3v7.5a.75.75 0 0 1-1.5 0V4.81l-6.72 6.72a.75.75 0 1 1-1.06-1.06L16.94 3.75H11.25a.75.75 0 0 1-.75-.75Z"/>
                                        <path d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h5.25a.75.75 0 0 1 0 1.5H5.25c-.414 0-.75.336-.75.75v12a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 1 1.5 0v5.25A2.25 2.25 0 0 1 17.25 21H5.25A2.25 2.25 0 0 1 3 18.75v-12Z"/>
                                    </svg>
                                    {team.registration.driveFolderUrl ? 'View Drive' : 'No Drive Link'}
                                </a>

                                {/* Shortlist toggle */}
                                <button
                                    onClick={() => handleShortlist(team.registration.userId, team.isShortlisted)}
                                    disabled={actionLoading === team.registration.userId}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                                        team.isShortlisted
                                            ? 'bg-red-600/20 border border-red-600/50 text-red-300 hover:bg-red-600/30'
                                            : 'bg-green-600/20 border border-green-600/50 text-green-300 hover:bg-green-600/30'
                                    }`}
                                >
                                    {actionLoading === team.registration.userId ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : team.isShortlisted ? (
                                        <>
                                            <XCircle className="w-4 h-4" />
                                            Remove
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Add to Shortlist
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTeams.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-white/60">No teams found matching your criteria.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
