import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: values => {
      // Retrieve users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Find a user that matches the provided credentials
      const user = storedUsers.find(
        u => u.username === values.username && u.password === values.password
      );

      if (user) {
        // Store the logged-in user's info in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        // Show an error if the credentials are invalid
        alert('Invalid username or password');
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500 text-sm">{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
