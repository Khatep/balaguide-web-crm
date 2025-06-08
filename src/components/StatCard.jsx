// src/components/StatCard.jsx
const StatCard = ({ title, value, unit = "", color = "text-[#5463d6]" }) => (
    <div className="bg-white border border-gray-300 rounded-lg shadow-sm px-6 py-8 flex flex-col items-center justify-center text-center">
        <h4 className="text-lg   font-semibold text-gray-700 uppercase mb-2 tracking-wide">
            {title}
        </h4>
        <p className={`text-5xl font-bold ${color}`}>
            {value?.toLocaleString("en-US")} {unit}
        </p>
    </div>
);

export default StatCard;
