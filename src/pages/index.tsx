import Head from "next/head";
import { useState } from "react";

interface BugBounty {
  id: string;
  title: string;
  project: string;
  severity: "low" | "medium" | "high" | "critical";
  reward: string;
  status: "open" | "claimed" | "fixed";
}

// Mock data for bug bounty items
const mockBugBounties: BugBounty[] = [
  {
    id: "1",
    title: "XSS vulnerability in user profile page",
    project: "OpenSourceCMS",
    severity: "high",
    reward: "$500",
    status: "open",
  },
  {
    id: "2",
    title: "SQL injection in search endpoint",
    project: "ReactDashboard",
    severity: "critical",
    reward: "$1000",
    status: "open",
  },
  {
    id: "3",
    title: "CSRF token validation bypass",
    project: "VueCommerce",
    severity: "medium",
    reward: "$300",
    status: "open",
  },
  {
    id: "4",
    title: "Broken authentication in API",
    project: "NodeAPI",
    severity: "high",
    reward: "$750",
    status: "claimed",
  },
  {
    id: "5",
    title: "Directory traversal vulnerability",
    project: "FileManager",
    severity: "critical",
    reward: "$1200",
    status: "open",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBounties, setFilteredBounties] =
    useState<BugBounty[]>(mockBugBounties);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredBounties(mockBugBounties);
    } else {
      const filtered = mockBugBounties.filter(
        (bounty) =>
          bounty.title.toLowerCase().includes(query.toLowerCase()) ||
          bounty.project.toLowerCase().includes(query.toLowerCase()) ||
          bounty.severity.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBounties(filtered);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "claimed":
        return "bg-purple-100 text-purple-800";
      case "fixed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Head>
        <title>FixYour-ish - Find & Fix Issues in Your Site</title>
        <meta
          name="description"
          content="Discover issues that need fixing on your site and find open source bug bounty opportunities"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Fix Your<span className="text-yellow-300">-ish</span>
              </h1>
              <p className="text-xl md:text-2xl mb-4 text-indigo-100">
                Identify issues that need fixing on your site
              </p>
              <p className="text-lg md:text-xl text-indigo-200">
                Discover vulnerabilities, earn bug bounties, and contribute to
                open source security
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Find Issues
              </h3>
              <p className="text-gray-600">
                Scan and identify security vulnerabilities, performance issues,
                and bugs in your website or application.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Bug Bounties
              </h3>
              <p className="text-gray-600">
                Browse open source bug bounty programs and earn rewards by
                finding and reporting security issues.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-4xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Get Fixed
              </h3>
              <p className="text-gray-600">
                Access detailed remediation guides and best practices to fix
                identified issues quickly and securely.
              </p>
            </div>
          </div>

          {/* Bug Bounty Search Section */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Open Source Bug Bounty Programs
              </h2>
              <p className="text-gray-600 mb-6">
                Search through available bug bounty opportunities in open source
                projects. Find vulnerabilities, help secure the ecosystem, and
                earn rewards.
              </p>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by project, title, or severity..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-800"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                {filteredBounties.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-xl">No bug bounties found</p>
                    <p className="text-sm mt-2">
                      Try adjusting your search criteria
                    </p>
                  </div>
                ) : (
                  filteredBounties.map((bounty) => (
                    <div
                      key={bounty.id}
                      className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {bounty.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-3">
                            Project:{" "}
                            <span className="font-medium">{bounty.project}</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(
                                bounty.severity
                              )}`}
                            >
                              {bounty.severity.toUpperCase()}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                bounty.status
                              )}`}
                            >
                              {bounty.status.charAt(0).toUpperCase() +
                                bounty.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-2xl font-bold text-green-600">
                            {bounty.reward}
                          </div>
                          <button
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                              bounty.status === "open"
                                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                            disabled={bounty.status !== "open"}
                          >
                            {bounty.status === "open"
                              ? "View Details"
                              : "Not Available"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">
                      {mockBugBounties.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Bounties</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {mockBugBounties.filter((b) => b.status === "open").length}
                    </div>
                    <div className="text-sm text-gray-600">Open</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {
                        mockBugBounties.filter(
                          (b) =>
                            b.severity === "high" || b.severity === "critical"
                        ).length
                      }
                    </div>
                    <div className="text-sm text-gray-600">High Priority</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      $3,750
                    </div>
                    <div className="text-sm text-gray-600">Total Rewards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to secure your site?
              </h2>
              <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                Start identifying issues, contribute to open source security,
                and make the web a safer place.
              </p>
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg">
                Get Started Free
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2">
              &copy; 2024 FixYour-ish. Making the web more secure, one fix at a
              time.
            </p>
            <p className="text-sm text-gray-400">
              Open source bug bounties • Security research • Community driven
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
