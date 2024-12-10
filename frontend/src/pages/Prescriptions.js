import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserNav from "../components/UserNav";
import Header from "../components/Header";
import PrescriptionsCalendar from "../components/PrescriptionsCalendar";
import Button from "../components/Button";
import PrescriptionCard from "../components/PrescriptionCard";
import AddPrescriptionForm from "../components/AddPrescriptionForm";
import API_BASE_URL from "../config";
import { icons } from "../components/icons";
import { ToastContainer } from "react-toastify";

function Prescriptions() {
  const [user, setUser] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [showAddPrescriptionForm, setShowAddPrescriptionForm] = useState(false);
  const navigate = useNavigate();

  const [animalNameFilter, setAnimalNameFilter] = useState("");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [medicationNameFilter, setMedicationNameFilter] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user information");

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchUser();
    fetchPrescriptions();
  }, [navigate]);

  const handleAddPrescriptionClick = () => {
    setShowAddPrescriptionForm(true);
  };

  const handleFormSubmit = (formData) => {
    setPrescriptions((prevPrescriptions) => [...prevPrescriptions, formData]);
    setShowAddPrescriptionForm(false);
  };

  if (!user) return <div>Loading...</div>;

  const filteredPrescriptions = prescriptions.filter((p) => {
    let matches = true;
    console.log(prescriptions);
    if (
      medicationNameFilter &&
      p.drug &&
      !p.drug.toLowerCase().includes(medicationNameFilter.toLowerCase())
    ) {
      matches = false;
    }

    if (
      animalNameFilter &&
      p.animalName &&
      !p.animalName.toLowerCase().includes(animalNameFilter.toLowerCase())
    ) {
      matches = false;
    }

    if (dateFromFilter) {
      const filterDateStart = new Date(dateFromFilter);
      filterDateStart.setHours(0, 0, 0, 0);

      const requestDate = new Date(p.start);
      requestDate.setHours(0, 0, 0, 0);

      if (requestDate < filterDateStart) {
        matches = false;
      }
    }
    if (dateToFilter && new Date(p.end) >= new Date(dateToFilter)) {
      matches = false;
    }

    return matches;
  });

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <Header />
      <UserHeader user={user} />
      <UserNav role={user.role} />

      <div className="w-full max-w-[1024px] mx-auto mb-14">
        {user.role === "Veterinarian" && (
          <>
            <div className="mb-8">
              <Button
                icon={icons.plus_white}
                text="New Prescription"
                variant="blue"
                onClick={handleAddPrescriptionClick}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-black">Prescriptions</h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4 items-end">
              <div className="flex flex-col">
                <input
                  placeholder="From date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  value={dateFromFilter}
                  onChange={(e) => setDateFromFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-blue"
                />
              </div>
              <div className="flex flex-col">
                <input
                  placeholder="To date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => !e.target.value && (e.target.type = "text")}
                  value={dateToFilter}
                  onChange={(e) => setDateToFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-blue"
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Enter Animal Name"
                  value={animalNameFilter}
                  onChange={(e) => setAnimalNameFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-blue"
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Enter Medication Name"
                  value={medicationNameFilter}
                  onChange={(e) => setMedicationNameFilter(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-blue"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-10">
              {filteredPrescriptions.map((prescription) => (
                <PrescriptionCard
                  key={prescription.id}
                  prescription={prescription}
                />
              ))}
            </div>
          </>
        )}

        {user.role === "Caretaker" && (
          <PrescriptionsCalendar prescriptions={prescriptions} />
        )}

        {showAddPrescriptionForm && (
          <AddPrescriptionForm
            onSubmit={handleFormSubmit}
            onClose={() => setShowAddPrescriptionForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Prescriptions;
