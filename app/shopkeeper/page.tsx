'use client';

import { useDataContext } from '@/context/DataContext';
import { useState } from 'react';

export default function ShopkeeperView() {
  const { entries, getAllLocalities, getEntriesByLocality } = useDataContext();
  const localities = getAllLocalities();
  const [selectedLocality, setSelectedLocality] = useState<string>(
    localities[0] || ''
  );

  const selectedEntries = selectedLocality
    ? getEntriesByLocality(selectedLocality)
    : [];

  const highDemandProducts = selectedEntries.filter(
    (e) => e.demandStatus === 'high'
  );
  const mediumDemandProducts = selectedEntries.filter(
    (e) => e.demandStatus === 'medium'
  );
  const lowDemandProducts = selectedEntries.filter(
    (e) => e.demandStatus === 'low'
  );

  const recommendations = [
    {
      title: '📦 Stock More',
      items: highDemandProducts,
      description: 'These products are in high demand. Increase your stock levels.',
      color: 'green',
    },
    {
      title: '⚠️ Monitor',
      items: mediumDemandProducts,
      description: 'Moderate demand. Stock to meet local needs.',
      color: 'yellow',
    },
    {
      title: '📉 Reduce Stock',
      items: lowDemandProducts,
      description: 'Low demand. Order less to reduce expired stock.',
      color: 'red',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏪 Shopkeeper Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            View local market demand trends and optimize your inventory
          </p>
        </div>

        {/* Locality Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Select Your Locality
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {localities.map((locality) => (
              <button
                key={locality}
                onClick={() => setSelectedLocality(locality)}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedLocality === locality
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {locality}
              </button>
            ))}
          </div>
        </div>

        {selectedLocality && selectedEntries.length > 0 ? (
          <div className="space-y-8">
            {/* Quick Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-900 mb-2">
                  🟢 High Demand Products
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {highDemandProducts.length}
                </p>
                <p className="text-sm text-green-700 mt-1">
                  Products to stock up on
                </p>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  🟡 Moderate Demand
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {mediumDemandProducts.length}
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Products to maintain stock
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-2">
                  🔴 Low Demand
                </h3>
                <p className="text-3xl font-bold text-red-600">
                  {lowDemandProducts.length}
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Products to order carefully
                </p>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-6">
              {recommendations.map((rec) => (
                <div
                  key={rec.title}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div
                    className={`px-6 py-4 border-l-4 ${
                      rec.color === 'green'
                        ? 'border-green-500 bg-green-50'
                        : rec.color === 'yellow'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <h2
                      className={`text-xl font-bold ${
                        rec.color === 'green'
                          ? 'text-green-900'
                          : rec.color === 'yellow'
                          ? 'text-yellow-900'
                          : 'text-red-900'
                      }`}
                    >
                      {rec.title}
                    </h2>
                    <p
                      className={`text-sm mt-1 ${
                        rec.color === 'green'
                          ? 'text-green-700'
                          : rec.color === 'yellow'
                          ? 'text-yellow-700'
                          : 'text-red-700'
                      }`}
                    >
                      {rec.description}
                    </p>
                  </div>

                  {rec.items.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {rec.items.map((item) => (
                        <div
                          key={item.id}
                          className="px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {item.product}
                              </h4>
                              {item.brand && (
                                <p className="text-sm text-gray-600">
                                  Brand: {item.brand}
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-sm text-gray-500 italic mt-1">
                                  "{item.notes}"
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                {item.units}
                              </p>
                              <p className="text-xs text-gray-500">
                                units last week
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500">
                      No products in this category
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tips Section */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">
                💡 Inventory Management Tips
              </h3>
              <ul className="space-y-2 text-indigo-700">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">✓</span>
                  <span>
                    Increase stock of high-demand products before they run out
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">✓</span>
                  <span>
                    Check expiry dates frequently for low-demand items
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">✓</span>
                  <span>
                    Try promotional offers on slow-moving products
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">✓</span>
                  <span>
                    Review trends weekly to stay updated on market shifts
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Data Available
            </h3>
            <p className="text-gray-600 text-lg">
              {localities.length === 0
                ? 'Please wait for data to be submitted from wholesalers.'
                : 'Select a locality to view demand trends and get recommendations.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
