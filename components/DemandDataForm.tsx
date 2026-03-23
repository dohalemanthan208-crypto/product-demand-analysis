'use client';

import { useState } from 'react';

interface FormData {
  product: string;
  locality: string;
  demandStatus: 'high' | 'medium' | 'low';
  units: number;
  weekDate: string;
  notes: string;
  brand?: string;
}

interface DemandDataFormProps {
  onSubmit: (data: FormData) => void;
}

const SAMPLE_PRODUCTS = [
  'Milk',
  'Bread',
  'Rice',
  'Flour',
  'Oil',
  'Sugar',
  'Salt',
  'Spices',
  'Tea',
  'Coffee',
  'Biscuits',
  'Snacks',
  'Beverages',
  'Dairy Products',
  'Frozen Foods',
  'Other',
];

const SAMPLE_LOCALITIES = [
  'Downtown',
  'North Side',
  'South Side',
  'East District',
  'West District',
  'Central Area',
  'Suburbs',
  'Market Area',
  'Residential Zone',
  'Commercial Hub',
];

const BRANDS = [
  'Brand A',
  'Brand B',
  'Brand C',
  'Brand D',
  'Brand E',
  'Local Brand',
  'Premium Brand',
  'Budget Brand',
];

export default function DemandDataForm({ onSubmit }: DemandDataFormProps) {
  const [formData, setFormData] = useState<FormData>({
    product: '',
    locality: '',
    demandStatus: 'medium',
    units: 0,
    weekDate: new Date().toISOString().split('T')[0],
    notes: '',
    brand: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.product.trim()) {
      newErrors.product = 'Product is required';
    }
    if (!formData.locality.trim()) {
      newErrors.locality = 'Locality is required';
    }
    if (formData.units < 0) {
      newErrors.units = 'Units cannot be negative';
    }
    if (!formData.weekDate) {
      newErrors.weekDate = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    let processedValue: any = value;
    if (type === 'number') {
      processedValue = parseInt(value) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error for this field if it exists
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);

    // Show success message
    setSubmitted(true);

    // Reset form
    setFormData({
      product: '',
      locality: '',
      demandStatus: 'medium',
      units: 0,
      weekDate: new Date().toISOString().split('T')[0],
      notes: '',
      brand: '',
    });

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">
              Data submitted successfully!
            </p>
          </div>
        </div>
      )}

      {/* Product Name / Selection */}
      <div>
        <label
          htmlFor="product"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Product Name
        </label>
        <div className="flex gap-2">
          <select
            id="product-select"
            value={formData.product}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                product: e.target.value,
              }));
              if (errors.product) {
                setErrors((prev) => ({
                  ...prev,
                  product: undefined,
                }));
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select a product</option>
            {SAMPLE_PRODUCTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or type custom"
            value={formData.product}
            onChange={handleChange}
            name="product"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        {errors.product && (
          <p className="mt-1 text-sm text-red-600">{errors.product}</p>
        )}
      </div>

      {/* Brand (Optional) */}
      <div>
        <label
          htmlFor="brand"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Brand (Optional)
        </label>
        <select
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="">Select a brand</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Locality */}
      <div>
        <label
          htmlFor="locality"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Locality / Area
        </label>
        <div className="flex gap-2">
          <select
            id="locality-select"
            value={formData.locality}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                locality: e.target.value,
              }));
              if (errors.locality) {
                setErrors((prev) => ({
                  ...prev,
                  locality: undefined,
                }));
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select a locality</option>
            {SAMPLE_LOCALITIES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or type custom"
            value={formData.locality}
            onChange={handleChange}
            name="locality"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        {errors.locality && (
          <p className="mt-1 text-sm text-red-600">{errors.locality}</p>
        )}
      </div>

      {/* Demand Status */}
      <div>
        <label
          htmlFor="demandStatus"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Current Demand Status
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['high', 'medium', 'low'] as const).map((status) => (
            <label key={status} className="relative flex items-center">
              <input
                type="radio"
                name="demandStatus"
                value={status}
                checked={formData.demandStatus === status}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`flex-1 text-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.demandStatus === status
                    ? status === 'high'
                      ? 'border-green-500 bg-green-50'
                      : status === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <span
                  className={`font-semibold capitalize ${
                    formData.demandStatus === status
                      ? status === 'high'
                        ? 'text-green-700'
                        : status === 'medium'
                        ? 'text-yellow-700'
                        : 'text-red-700'
                      : 'text-gray-600'
                  }`}
                >
                  {status === 'high' && '📈'}
                  {status === 'medium' && '→'}
                  {status === 'low' && '📉'}
                  {' '}
                  {status}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Units Sold */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="units"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Units Sold (Last Week)
          </label>
          <input
            type="number"
            id="units"
            name="units"
            min="0"
            value={formData.units}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {errors.units && (
            <p className="mt-1 text-sm text-red-600">{errors.units}</p>
          )}
        </div>

        {/* Week Date */}
        <div>
          <label
            htmlFor="weekDate"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Week Ending Date
          </label>
          <input
            type="date"
            id="weekDate"
            name="weekDate"
            value={formData.weekDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {errors.weekDate && (
            <p className="mt-1 text-sm text-red-600">{errors.weekDate}</p>
          )}
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Additional Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          placeholder="E.g., Seasonal demand, customer feedback, competitive products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span>Submit Data</span>
        <span>→</span>
      </button>

      <p className="text-xs text-gray-500 text-center">
        Your data helps improve inventory decisions for local shops
      </p>
    </form>
  );
}
