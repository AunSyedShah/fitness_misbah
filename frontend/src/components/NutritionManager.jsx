// NutritionManager.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NutritionManager = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || {};
  });
  const [nutritionLogs, setNutritionLogs] = useState(currentUser.nutritionLogs || []);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
      setNutritionLogs(storedUser.nutritionLogs || []);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      mealType: '',
      foodItem: '',
      quantity: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: ''
    },
    validationSchema: Yup.object({
      mealType: Yup.string().required('Required'),
      foodItem: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      calories: Yup.number().required('Required'),
      protein: Yup.number().required('Required'),
      carbs: Yup.number().required('Required'),
      fats: Yup.number().required('Required')
    }),
    onSubmit: values => {
      let updatedNutritionLogs;
      if (isEditing !== null) {
        updatedNutritionLogs = nutritionLogs.map((log, index) =>
          index === isEditing ? values : log
        );
        setIsEditing(null);
      } else {
        updatedNutritionLogs = [...nutritionLogs, values];
      }
      setNutritionLogs(updatedNutritionLogs);
      const updatedUser = { ...currentUser, nutritionLogs: updatedNutritionLogs };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      formik.resetForm();
    }
  });

  const handleEdit = index => {
    formik.setValues(nutritionLogs[index]);
    setIsEditing(index);
  };

  const handleDelete = index => {
    const updatedNutritionLogs = nutritionLogs.filter((_, i) => i !== index);
    setNutritionLogs(updatedNutritionLogs);
    const updatedUser = { ...currentUser, nutritionLogs: updatedNutritionLogs };
    setCurrentUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Nutrition Manager</h1>
      <form onSubmit={formik.handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="mealType" className="block text-gray-700">Meal Type</label>
          <input
            id="mealType"
            name="mealType"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mealType}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.mealType && formik.errors.mealType ? (
            <div className="text-red-500 text-sm">{formik.errors.mealType}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="foodItem" className="block text-gray-700">Food Item</label>
          <input
            id="foodItem"
            name="foodItem"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.foodItem}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.foodItem && formik.errors.foodItem ? (
            <div className="text-red-500 text-sm">{formik.errors.foodItem}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="calories" className="block text-gray-700">Calories</label>
          <input
            id="calories"
            name="calories"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.calories}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.calories && formik.errors.calories ? (
            <div className="text-red-500 text-sm">{formik.errors.calories}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="protein" className="block text-gray-700">Protein (g)</label>
          <input
            id="protein"
            name="protein"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.protein}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.protein && formik.errors.protein ? (
            <div className="text-red-500 text-sm">{formik.errors.protein}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="carbs" className="block text-gray-700">Carbs (g)</label>
          <input
            id="carbs"
            name="carbs"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.carbs}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.carbs && formik.errors.carbs ? (
            <div className="text-red-500 text-sm">{formik.errors.carbs}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="fats" className="block text-gray-700">Fats (g)</label>
          <input
            id="fats"
            name="fats"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fats}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.fats && formik.errors.fats ? (
            <div className="text-red-500 text-sm">{formik.errors.fats}</div>
          ) : null}
        </div>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          {isEditing !== null ? 'Update' : 'Add'} Entry
        </button>
      </form>

      <div>
        {nutritionLogs.map((log, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{log.foodItem}</h2>
            <p>Meal Type: {log.mealType}</p>
            <p>Quantity: {log.quantity}</p>
            <p>Calories: {log.calories}</p>
            <p>Protein: {log.protein}g</p>
            <p>Carbs: {log.carbs}g</p>
            <p>Fats: {log.fats}g</p>
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

export default NutritionManager;
