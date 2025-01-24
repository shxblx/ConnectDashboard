import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto border-2 border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
        <div className="space-y-3">
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Phone:</strong> {user.phone}
          </div>
          <div>
            <strong>Website:</strong> {user.website}
          </div>

          <h3 className="text-xl font-semibold mt-4">Address</h3>
          <div>
            <strong>Street:</strong> {user.address.street}
            <br />
            <strong>Suite:</strong> {user.address.suite}
            <br />
            <strong>City:</strong> {user.address.city}
            <br />
            <strong>Zipcode:</strong> {user.address.zipcode}
          </div>

          <h3 className="text-xl font-semibold mt-4">Company</h3>
          <div>
            <strong>Name:</strong> {user.company.name}
            <br />
            <strong>Catchphrase:</strong> {user.company.catchPhrase}
            <br />
            <strong>Business:</strong> {user.company.bs}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.company.name.toLowerCase().includes(term) ||
        user.address.city.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    filteredUsers.forEach((user, index) => {
      if (index > 0) {
        doc.addPage();
      }

      doc.setFontSize(16);
      doc.text(`User Details: ${user.name}`, 14, 15);

      doc.setFontSize(12);
      doc.text(`Username: ${user.username}`, 14, 25);
      doc.text(`Email: ${user.email}`, 14, 35);
      doc.text(`Phone: ${user.phone}`, 14, 45);
      doc.text(`Website: ${user.website}`, 14, 55);

     
      doc.setFontSize(14);
      doc.text("Address", 14, 70);
      doc.setFontSize(12);
      doc.text(`Street: ${user.address.street}`, 14, 80);
      doc.text(`Suite: ${user.address.suite}`, 14, 90);
      doc.text(`City: ${user.address.city}`, 14, 100);
      doc.text(`Zipcode: ${user.address.zipcode}`, 14, 110);

     
      doc.setFontSize(14);
      doc.text("Company", 14, 125);
      doc.setFontSize(12);
      doc.text(`Name: ${user.company.name}`, 14, 135);
      doc.text(`Catchphrase: ${user.company.catchPhrase}`, 14, 145);
      doc.text(`Business: ${user.company.bs}`, 14, 155);
    });

    doc.save("user_details.pdf");
  };

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full md:flex-grow p-2 border rounded"
          />
          <button
            onClick={downloadPDF}
            className="w-full md:w-auto md:ml-4 bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
          >
            Download PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left hidden md:table-cell">Name</th>
                <th className="p-2 text-left hidden md:table-cell">Email</th>
                <th className="p-2 text-left hidden md:table-cell">Company</th>
                <th className="p-2 text-left hidden md:table-cell">City</th>
                <th className="p-2 text-left hidden md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b block md:table-row">
                  <td className="p-2 block md:table-cell" data-label="Name">
                    <span className="md:hidden font-bold mr-2">Name:</span>
                    {user.name}
                  </td>
                  <td className="p-2 block md:table-cell" data-label="Email">
                    <span className="md:hidden font-bold mr-2">Email:</span>
                    {user.email}
                  </td>
                  <td className="p-2 block md:table-cell" data-label="Company">
                    <span className="md:hidden font-bold mr-2">Company:</span>
                    {user.company.name}
                  </td>
                  <td className="p-2 block md:table-cell" data-label="City">
                    <span className="md:hidden font-bold mr-2">City:</span>
                    {user.address.city}
                  </td>
                  <td className="p-2 block md:table-cell" data-label="Actions">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center p-4 text-gray-500">No users found</div>
          )}
        </div>
      </div>

      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
};

export default UserManagement;
