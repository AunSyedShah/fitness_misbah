// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import WorkoutManager from './WorkoutManager';
import NutritionManager from './NutritionManager';


const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || {};
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: currentUser.name || '',
      email: currentUser.email || '',
      profilePicture: currentUser.profilePicture || ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      profilePicture: Yup.string().url('Invalid URL').required('Required')
    }),
    onSubmit: values => {
      const updatedUser = { ...currentUser, ...values };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setIsEditing(false);
    }
  });

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}</h1>
      <div className="mb-4">
        <img src={currentUser.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
      </div>
      {!isEditing ? (
        <>
          <p className="text-gray-700 mb-2">Name: {currentUser.name}</p>
          <p className="text-gray-700 mb-2">Email: {currentUser.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-gray-700">Profile Picture URL</label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profilePicture}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.profilePicture && formik.errors.profilePicture ? (
              <div className="text-red-500 text-sm">{formik.errors.profilePicture}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      )}
      <h1 className='text-5xl text-center'>Workout Manager</h1>
      <WorkoutManager/>
      <h1 className='text-5xl text-center'>Nutrition Manager</h1>
      <NutritionManager/>
    </div>
  );
};

export default Dashboard;
