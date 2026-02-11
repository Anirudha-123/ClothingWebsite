import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  // ================= USER STATE =================
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ================= ADDRESS STATE =================
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  // ================= FETCH USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/users/singleuser",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        const userData = res.data.sengleUser;

        setUser({
          name: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/address",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setAddresses(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
    fetchAddresses();
  }, [token]);

  // ================= UPDATE PROFILE =================
  const updateProfile = async () => {
    try {
      await axios.put(
        "http://localhost:8080/api/users/update",
        {
          fullName: user.name,
          email: user.email,
          phone: user.phone,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      alert("Profile Updated Successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // ================= ADDRESS HANDLER =================
  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const saveAddress = async () => {
    if (
      !newAddress.fullName ||
      !newAddress.address ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.pincode ||
      !newAddress.phone
    ) {
      return alert("All fields are required");
    }

    try {
      if (editAddressId) {
        const res = await axios.put(
          `http://localhost:8080/api/address/${editAddressId}`,
          newAddress,
          { headers: { Authorization: "Bearer " + token } }
        );

        setAddresses(
          addresses.map((a) =>
            a._id === editAddressId ? res.data : a
          )
        );
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/address",
          newAddress,
          { headers: { Authorization: "Bearer " + token } }
        );

        setAddresses([res.data, ...addresses]);
      }

      setNewAddress({
        fullName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
      });

      setEditAddressId(null);
      setShowAddressForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAddress = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/address/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const editAddress = (addr) => {
    setNewAddress({
      fullName: addr.fullName,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      phone: addr.phone,
    });
    setEditAddressId(addr._id);
    setShowAddressForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20 px-4 sm:px-8 lg:px-20 pb-10">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          
          <div className="flex items-center justify-between mb-6"  onClick={() => navigate(-1)}>
  <button
   
    className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition duration-300 font-semibold text-lg"
  >
    <span className="text-2xl">←</span>
    <span className=" sm:inline">Profile Details</span>
  </button>
</div>

       

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
              placeholder="Full Name"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              placeholder="Email"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />

            <input
              type="text"
              value={user.phone}
              onChange={(e) =>
                setUser({ ...user, phone: e.target.value })
              }
              placeholder="Phone"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          <button
            onClick={updateProfile}
            className="mt-5 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Update Profile
          </button>
        </div>

        {/* ================= ADDRESS CARD ================= */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Saved Addresses
            </h2>

            <button
              onClick={() => setShowAddressForm(true)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
            >
              <FiPlus />
              Add Address
            </button>
          </div>

          {addresses.length === 0 && (
            <p className="text-gray-500 text-sm">
              No saved addresses yet.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="border rounded-lg p-4 relative hover:shadow-md transition"
              >
                <p className="font-medium">{addr.fullName}</p>
                <p className="text-sm text-gray-600">
                  {addr.address}
                </p>
                <p className="text-sm text-gray-600">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  📞 {addr.phone}
                </p>

                <div className="absolute top-3 right-3 flex gap-3">
                  <FiEdit2
                    className="cursor-pointer text-gray-600 hover:text-black"
                    onClick={() => editAddress(addr)}
                  />
                  <FiTrash2
                    className="cursor-pointer text-red-500"
                    onClick={() => deleteAddress(addr._id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {showAddressForm && (
            <div className="mt-6 border-t pt-6 grid sm:grid-cols-2 gap-4">
              <input name="fullName" value={newAddress.fullName} onChange={handleAddressChange} placeholder="Full Name" className="border rounded-lg px-4 py-2" />
              <input name="phone" value={newAddress.phone} onChange={handleAddressChange} placeholder="Phone" className="border rounded-lg px-4 py-2" />
              <input name="address" value={newAddress.address} onChange={handleAddressChange} placeholder="Address" className="border rounded-lg px-4 py-2 sm:col-span-2" />
              <input name="city" value={newAddress.city} onChange={handleAddressChange} placeholder="City" className="border rounded-lg px-4 py-2" />
              <input name="state" value={newAddress.state} onChange={handleAddressChange} placeholder="State" className="border rounded-lg px-4 py-2" />
              <input name="pincode" value={newAddress.pincode} onChange={handleAddressChange} placeholder="Pincode" className="border rounded-lg px-4 py-2" />

              <div className="sm:col-span-2 flex gap-4 mt-2">
                <button
                  onClick={saveAddress}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-90"
                >
                  {editAddressId ? "Update Address" : "Save Address"}
                </button>

                <button
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditAddressId(null);
                  }}
                  className="border px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Settings;
