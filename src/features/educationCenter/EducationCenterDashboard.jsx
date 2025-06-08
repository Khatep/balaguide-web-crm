// src/features/center/EducationCenterDashboard.jsx
import { useEffect, useState } from "react";
import { getAllCourses } from "../../features/course/courseService";

const EducationCenterDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error("Ошибка при загрузке курсов:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="ec-dashboard p-6">
      <div className="ec-header flex justify-between items-center mb-6">
        <h1 className="ec-title text-3xl font-semibold text-gray-800">
          Мои курсы
        </h1>
        <button className="ec-create-btn bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2 rounded transition">
          + Добавить курс
        </button>
      </div>

      {loading ? (
        <p className="ec-loading text-gray-500">Загрузка...</p>
      ) : courses.length === 0 ? (
        <p className="ec-empty text-gray-400">Курсы не найдены.</p>
      ) : (
        <div className="ec-table-wrapper overflow-x-auto">
          <table className="ec-course-table w-full border text-sm bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="ec-th p-3 border-b">Название</th>
                <th className="ec-th p-3 border-b">Категория</th>
                <th className="ec-th p-3 border-b">Возраст</th>
                <th className="ec-th p-3 border-b">Цена</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="ec-tr hover:bg-gray-50">
                  <td className="ec-td p-3 border-b">{course.name}</td>
                  <td className="ec-td p-3 border-b">
                    {course.courseCategory}
                  </td>
                  <td className="ec-td p-3 border-b">{course.ageRange}</td>
                  <td className="ec-td p-3 border-b">{course.price} ₸</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EducationCenterDashboard;
