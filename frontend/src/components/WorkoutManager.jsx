// WorkoutManager.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const WorkoutManager = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || {};
  });
  const [workouts, setWorkouts] = useState(currentUser.workouts || []);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
      setWorkouts(storedUser.workouts || []);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      exerciseName: '',
      sets: '',
      reps: '',
      weight: '',
      notes: '',
      category: '',
      tags: ''
    },
    validationSchema: Yup.object({
      exerciseName: Yup.string().required('Required'),
      sets: Yup.number().required('Required'),
      reps: Yup.number().required('Required'),
      weight: Yup.number().required('Required'),
      notes: Yup.string(),
      category: Yup.string().required('Required'),
      tags: Yup.string()
    }),
    onSubmit: values => {
      let updatedWorkouts;
      if (isEditing !== null) {
        updatedWorkouts = workouts.map((workout, index) =>
          index === isEditing ? values : workout
        );
        setIsEditing(null);
      } else {
        updatedWorkouts = [...workouts, values];
      }
      setWorkouts(updatedWorkouts);
      const updatedUser = { ...currentUser, workouts: updatedWorkouts };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      formik.resetForm();
    }
  });

  const handleEdit = index => {
    formik.setValues(workouts[index]);
    setIsEditing(index);
  };

  const handleDelete = index => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
    const updatedUser = { ...currentUser, workouts: updatedWorkouts };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Workout Manager</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="exerciseName" className="block text-gray-700">Exercise Name</label>
          <input
            id="exerciseName"
            name="exerciseName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.exerciseName}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.exerciseName && formik.errors.exerciseName ? (
            <div className="text-red-500 text-sm">{formik.errors.exerciseName}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="sets" className="block text-gray-700">Sets</label>
          <input
            id="sets"
            name="sets"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sets}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.sets && formik.errors.sets ? (
            <div className="text-red-500 text-sm">{formik.errors.sets}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="reps" className="block text-gray-700">Reps</label>
          <input
            id="reps"
            name="reps"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.reps}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.reps && formik.errors.reps ? (
            <div className="text-red-500 text-sm">{formik.errors.reps}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="weight" className="block text-gray-700">Weight</label>
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
          <label htmlFor="notes" className="block text-gray-700">Notes</label>
          <textarea
            id="notes"
            name="notes"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.notes}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.notes && formik.errors.notes ? (
            <div className="text-red-500 text-sm">{formik.errors.notes}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700">Tags</label>
          <input
            id="tags"
            name="tags"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tags}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.tags && formik.errors.tags ? (
            <div className="text-red-500 text-sm">{formik.errors.tags}</div>
          ) : null}
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          {isEditing !== null ? 'Update' : 'Add'} Workout
        </button>
      </form>

      <div>
        {workouts.map((workout, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{workout.exerciseName}</h2>
            <p>Sets: {workout.sets}</p>
            <p>Reps: {workout.reps}</p>
            <p>Weight: {workout.weight}</p>
            <p>Notes: {workout.notes}</p>
            <p>Category: {workout.category}</p>
            <p>Tags: {workout.tags}</p>
            <button
              onClick={() => handleEdit(index)}
              className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutManager;
