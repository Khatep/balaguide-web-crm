// src/pages/dashboard/DashboardCard.jsx
const DashboardCard = ({ title, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full h-full">
        {title && (
            <h2 className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">
                {title}
            </h2>
        )}
        {children}
    </div>
);

export default DashboardCard;
