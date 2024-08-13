// ProgressTracking.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ProgressTracking = () => {
  const [progressData, setProgressData] = useState(() => {
    return JSON.parse(localStorage.getItem('progressData')) || [];
  });

  useEffect(() => {
    localStorage.setItem('progressData', JSON.stringify(progressData));
  }, [progressData]);

  const formik = useFormik({
    initialValues: {
      date: '',
      weight: '',
      bodyMeasurement: '',
      performanceMetric: '',
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Required'),
      weight: Yup.number().required('Required'),
      bodyMeasurement: Yup.number().required('Required'),
      performanceMetric: Yup.number().required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newEntry = {
        ...values,
        date: new Date(values.date).toLocaleDateString(),
      };
      setProgressData([...progressData, newEntry]);
      resetForm();
    },
  });

  const generateChartData = (metric) => ({
    labels: progressData.map((entry) => entry.date),
    datasets: [
      {
        label: metric,
        data: progressData.map((entry) => entry[metric]),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Progress Tracking</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.date && formik.errors.date ? (
            <div className="text-red-500 text-sm">{formik.errors.date}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block text-gray-700">Weight (kg)</label>
          <input
            id="weight"
            name="weight"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div className="text-red-500 text-sm">{formik.errors.weight}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="bodyMeasurement" className="block text-gray-700">Body Measurement (cm)</label>
          <input
            id="bodyMeasurement"
            name="bodyMeasurement"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bodyMeasurement}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.bodyMeasurement && formik.errors.bodyMeasurement ? (
            <div className="text-red-500 text-sm">{formik.errors.bodyMeasurement}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="performanceMetric" className="block text-gray-700">Performance Metric (e.g., run time)</label>
          <input
            id="performanceMetric"
            name="performanceMetric"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.performanceMetric}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.performanceMetric && formik.errors.performanceMetric ? (
            <div className="text-red-500 text-sm">{formik.errors.performanceMetric}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Add Progress
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Weight Progress</h2>
        <Line data={generateChartData('weight')} />

        <h2 className="text-xl font-bold mt-6">Body Measurement Progress</h2>
        <Line data={generateChartData('bodyMeasurement')} />

        <h2 className="text-xl font-bold mt-6">Performance Metric Progress</h2>
        <Line data={generateChartData('performanceMetric')} />
      </div>
    </div>
  );
};

export default ProgressTracking;
