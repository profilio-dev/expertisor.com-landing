export const Card = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);
