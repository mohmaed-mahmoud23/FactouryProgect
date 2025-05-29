import { useState } from "react";

interface Ipop {
  id: number;
  name: string;
  phone: string;
  type: string;
  image: string;
  address: string;
  details: string;
}

const factories: Ipop[] = [
  {
    id: 1,
    name: "مصنع السجاد الفاخر",
    image: "https://via.placeholder.com/300x200",
    type: "سجاد كلاسيكي",
    address: "القاهرة، مصر",
    phone: "01012345678",
    details:
      "يقدم المصنع تشكيلة متنوعة من السجاد الكلاسيكي الفاخر بجودة عالية.",
  },
  {
    id: 2,
    name: "مصنع بدائل السجاد الحديث",
    image: "https://via.placeholder.com/300x200",
    type: "موكيت حديث",
    address: "الإسكندرية، مصر",
    phone: "01098765432",
    details: "متخصص في إنتاج الموكيت العصري بأسعار منافسة وخامات مستوردة.",
  },
  {
    id: 3,
    name: "مصنع بدائل السجاد الحديث",
    image: "https://via.placeholder.com/300x200",
    type: "موكيت حديث",
    address: "الإسكندرية، مصر",
    phone: "01098765432",
    details: "متخصص في إنتاج الموكيت العصري بأسعار منافسة وخامات مستوردة.",
  },
];

const Home = () => {
  const [selectedFactory, setSelectedFactory] = useState<Ipop | null>(null);

  const openModal = (factory: Ipop) => {
    setSelectedFactory(factory);
  };

  const closeModal = () => {
    setSelectedFactory(null);
  };

  return (
    <div dir="rtl" className="bg-gray-100 text-gray-800 min-h-screen p-4 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          دليل مصانع السجاد وبدائل السجاد
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="ابحث باسم المصنع..."
            className="px-4 py-2 border rounded w-full md:w-1/3"
          />
          <select className="px-4 py-2 border rounded w-full md:w-auto">
            <option>كل أنواع السجاد</option>
          </select>
          <select className="px-4 py-2 border rounded w-full md:w-auto">
            <option>كل المحافظات</option>
          </select>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {factories.map((factory, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow flex flex-col justify-between"
            >
              <img
                src={factory.image}
                alt={`صورة ${factory.name}`}
                className="w-full h-40 bg-gray-200 mb-4 object-cover"
              />
              <h2 className="text-lg font-bold mb-2">{factory.name}</h2>
              <p>نوع المنتج: {factory.type}</p>
              <p>العنوان: {factory.address}</p>
              <p>رقم التليفون: {factory.phone}</p>
              <button
                onClick={() => openModal(factory)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>

        {/* ✅ المودال */}
        {selectedFactory && (
          <div
            className="fixed inset-0 bg- bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300"
            onClick={closeModal}
          >
            <div
              className="bg-white w-full max-w-lg p-6 shadow relative rounded-md transform transition-transform duration-300 scale-95 opacity-0 animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="   absolute top-2 left-2 text-gray-600 hover:text-black text-5xl size-7"
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4">{selectedFactory.name}</h2>
              <img
                src={selectedFactory.image}
                alt={`صورة ${selectedFactory.name}`}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p>
                <strong>النوع:</strong> {selectedFactory.type}
              </p>
              <p>
                <strong>العنوان:</strong> {selectedFactory.address}
              </p>
              <p>
                <strong>الهاتف:</strong> {selectedFactory.phone}
              </p>
              <p className="mt-3">
                <strong>تفاصيل إضافية:</strong>
              </p>
              <p className="text-gray-700">{selectedFactory.details}</p>
            </div>
          </div>
        )}

        {/* ✅ التذييل */}
        <div className="text-center text-sm text-gray-500 mt-8">
          تواصل معنا: example@example.com
        </div>
      </div>
    </div>
  );
};

export default Home;
