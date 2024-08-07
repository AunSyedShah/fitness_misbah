import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
  const [users, setUsers] = useState([]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      profilePicture: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
      name: Yup.string()
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      profilePicture: Yup.string()
        .url('Invalid URL')
        .required('Required')
    }),
    onSubmit: values => {
      const newUser = {
        username: values.username,
        password: values.password,
        name: values.name,
        email: values.email,
        profilePicture: values.profilePicture
      };

      setUsers([...users, newUser]);
      localStorage.setItem('users', JSON.stringify([...users, newUser]));

      // Placeholder for API call
      // axios.post('/api/register', newUser)
      //   .then(response => {
      //     // handle success
      //   })
      //   .catch(error => {
      //     // handle error
      //   });

      formik.resetForm();
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

      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
