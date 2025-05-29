const DacvhBord = () => {
  const users = [
    {
        id: 1,
      firstName: "Ahmed",
      email: "ahmed@example.com",
      password: "123456",
      userType: "تاجر",
    },
    {
        id: 2,
      firstName: "Sara",
      email: "sara@example.com",
      password: "abcdef",
      userType: "عميل",
    },
    {
        id: 3,
      firstName: "Mohamed",
      email: "mohamed@example.com",
      password: "pass1234",
      userType: "صاحب مصنع",
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4">First Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">نوع المستخدم</th> {/* جديد */}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.firstName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.userType}</td> {/* جديد */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DacvhBord;
