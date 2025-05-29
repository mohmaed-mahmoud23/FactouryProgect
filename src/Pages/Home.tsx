const factories = [
  {
    name: "مصنع النعمة لبديل السجاد",
    type: "بديل سجاد",
    address: "الإسكندرية، شارع النصر",
    phone: "01234567890",
    image: "#",
  },
  {
    name: "مصنع السلام للموكيت",
    type: "موكيت",
    address: "العاشر من رمضان، المنطقة الصناعية",
    phone: "01123456789",
    image: "#",
  },
  {
    name: "مصنع النور للسجاد",
    type: "سجاد",
    address: "النبأ الكبرى، شارع الصناعة",
    phone: "01012345678",
    image: "#",
  },
];

const Home = () => {
  return (
    <div dir="rtl" className="bg-gray-100 text-gray-800 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* العنوان */}
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          دليل مصانع السجاد وبدائل السجاد
        </h1>

        {/* الفلاتر */}
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

        {/* الكروت */}
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
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>

        {/* التذييل */}
        <div className="text-center text-sm text-gray-500 mt-8">
          تواصل معنا: example@example.com
        </div>
      </div>
    </div>
  );
};
export default Home;
