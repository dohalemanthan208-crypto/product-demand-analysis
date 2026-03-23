'use client';

import { useDataContext } from '@/context/DataContext';
import { useMemo } from 'react';

export default function Dashboard() {
  const { entries, getAllLocalities, getAllProducts } = useDataContext();

  const localities = getAllLocalities();
  const products = getAllProducts();

  const stats = useMemo(() => {
    const highDemand = entries.filter((e) => e.demandStatus === 'high').length;
    const mediumDemand = entries.filter(
      (e) => e.demandStatus === 'medium'
    ).length;
    const lowDemand = entries.filter((e) => e.demandStatus === 'low').length;
    const totalUnits = entries.reduce((sum, e) => sum + e.units, 0);

    return { highDemand, mediumDemand, lowDemand, totalUnits };
  }, [entries]);

  const productStats = useMemo(() => {
    const stats: Record<
      string,
      { high: number; medium: number; low: number; total: number }
    > = {};
    products.forEach((product) => {
      const productEntries = entries.filter(
        (e) => e.product.toLowerCase() === product.toLowerCase()
      );
      stats[product] = {
        high: productEntries.filter((e) => e.demandStatus === 'high').length,
        medium: productEntries.filter((e) => e.demandStatus === 'medium').length,
        low: productEntries.filter((e) => e.demandStatus === 'low').length,
        total: productEntries.length,
      };
    });
    return stats;
  }, [products, entries]);

  const localityStats = useMemo(() => {
    const stats: Record<
      string,
      { high: number; medium: number; low: number; total: number }
    > = {};
    localities.forEach((locality) => {
      const localityEntries = entries.filter(
        (e) => e.locality.toLowerCase() === locality.toLowerCase()
      );
      stats[locality] = {
        high: localityEntries.filter((e) => e.demandStatus === 'high').length,
        medium: localityEntries.filter((e) => e.demandStatus === 'medium').length,
        low: localityEntries.filter((e) => e.demandStatus === 'low').length,
        total: localityEntries.length,
      };
    });
    return stats;
  }, [localities, entries]);

  const getTopProducts = (limit = 5) => {
    return Object.entries(productStats)
      .map(([product, stats]) => ({ product, ...stats }))
      .sort((a, b) => b.high - a.high)
      .slice(0, limit);
  };

  const getTopLocalities = (limit = 5) => {
    return Object.entries(localityStats)
      .map(([locality, stats]) => ({ locality, ...stats }))
      .sort((a, b) => b.high - a.high)
      .slice(0, limit);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Overview of product demand trends across all localities
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Entries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {entries.length}
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">High Demand</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {stats.highDemand}
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Medium Demand
                </p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">
                  {stats.mediumDemand}
                </p>
              </div>
              <div className="text-4xl">→</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Low Demand</p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {stats.lowDemand}
                </p>
              </div>
              <div className="text-4xl">📉</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Products by High Demand */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                🔥 Top High-Demand Products
              </h2>
            </div>
            <div className="p-6">
              {getTopProducts(5).length > 0 ? (
                <div className="space-y-4">
                  {getTopProducts(5).map((item, index) => (
                    <div key={item.product}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">
                          {index + 1}. {item.product}
                        </span>
                        <span className="text-green-600 font-bold">
                          {item.high} entries
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(item.high / Math.max(...getTopProducts(5).map((p) => p.high), 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No data available yet</p>
              )}
            </div>
          </div>

          {/* Top Localities */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                📍 Most Active Localities
              </h2>
            </div>
            <div className="p-6">
              {getTopLocalities(5).length > 0 ? (
                <div className="space-y-4">
                  {getTopLocalities(5).map((item, index) => (
                    <div key={item.locality}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-900">
                          {index + 1}. {item.locality}
                        </span>
                        <span className="text-indigo-600 font-bold">
                          {item.total} entries
                        </span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded h-1.5 mb-1" />
                          <span className="text-green-600 font-medium">
                            {item.high} high
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded h-1.5 mb-1" />
                          <span className="text-yellow-600 font-medium">
                            {item.medium} med
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded h-1.5 mb-1" />
                          <span className="text-red-600 font-medium">
                            {item.low} low
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No data available yet</p>
              )}
            </div>
          </div>
        </div>

        {/* All Products Table */}
        {products.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                All Products Overview
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Product
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                      High Demand
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                      Medium Demand
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                      Low Demand
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                      Total Entries
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(productStats).map(([product, stats]) => (
                    <tr key={product} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {stats.high}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          {stats.medium}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          {stats.low}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        {stats.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
