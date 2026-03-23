'use client';

import { useState } from 'react';
import DemandDataForm from '@/components/DemandDataForm';

export default function Home() {
  const [submittedData, setSubmittedData] = useState<any[]>([]);

  const handleFormSubmit = (data: any) => {
    setSubmittedData([...submittedData, { ...data, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Demand Analysis
              </h1>
              <p className="text-gray-600 mt-1">
                Wholesale Data Collection & Local Market Analytics
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Submit Product Demand Data
              </h2>
              <p className="text-gray-600 mb-8">
                Help us understand product demand in your locality. Submit data about products that are moving fast or slow.
              </p>
              <DemandDataForm onSubmit={handleFormSubmit} />
            </div>
          </div>

          {/* Stats/Info Section */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Data Submissions
                </h3>
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {submittedData.length}
                </div>
                <p className="text-sm text-gray-600">
                  Total entries submitted
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                  How It Works
                </h3>
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">✓</span>
                    <span>Submit demand data from your locality</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">✓</span>
                    <span>Data is analyzed for trends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">✓</span>
                    <span>Insights shared with shopkeepers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">✓</span>
                    <span>Reduce waste from unsold stock</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        {submittedData.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Submissions
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-8 py-3 text-left text-sm font-semibold text-gray-900">
                        Product
                      </th>
                      <th className="px-8 py-3 text-left text-sm font-semibold text-gray-900">
                        Locality
                      </th>
                      <th className="px-8 py-3 text-left text-sm font-semibold text-gray-900">
                        Demand Status
                      </th>
                      <th className="px-8 py-3 text-left text-sm font-semibold text-gray-900">
                        Units
                      </th>
                      <th className="px-8 py-3 text-left text-sm font-semibold text-gray-900">
                        Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submittedData.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-8 py-4 text-sm text-gray-900 font-medium">
                          {entry.product}
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-600">
                          {entry.locality}
                        </td>
                        <td className="px-8 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              entry.demandStatus === 'high'
                                ? 'bg-green-100 text-green-800'
                                : entry.demandStatus === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {entry.demandStatus.charAt(0).toUpperCase() +
                              entry.demandStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-600">
                          {entry.units}
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-600">
                          {new Date(entry.id).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
