import React, { useEffect, useState } from 'react';
import UserHeader from "../components/UserHeader";
import UserNav from "../components/UserNav";
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import API_BASE_URL from '../config';
import RequestCard from '../components/TreatmentRequest';
import Header from '../components/Header';

function VeterinarianExaminations() {
    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = sessionStorage.getItem('token');

      const fetchUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }

            const userData = await response.json();
            console.log("User data:", userData);
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login');
        }
    };

      const fetchRequests = async () => {
        try {

          const response = await fetch(`${API_BASE_URL}/examinations`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch records');
          }
  
          const data = await response.json();
          console.log("Req data:", data);
          setRequests(data);
        } catch (error) {
          console.error('Error fetching records:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
      fetchRequests();
    }, [navigate]);
  
    // Фильтруем реквесты по статусу
    const newRequests = requests.filter(request => request.status === 1); // Новый статус
    const completedRequests = requests.filter(request => request.status === 2); // Завершённый статус
    if (loading || !user) return <p>Loading...</p>;
    return (
      <div className="container mx-auto">
        <Header/>
        <div className="flex flex-col md:flex-row items-start md:items-center mt-10 md:mt-10">
  <div className="md:ml-12 lg:ml-20 xl:ml-32">
    <UserHeader user={user} />
  </div>
</div>

<div className="flex flex-col md:ml-12 lg:ml-20 xl:ml-32">
  <UserNav role={user.role} />

  <h2 className="text-2xl font-bold mb-4 mt-4">New Requests</h2> {/* Добавляем отступ сверху для разделения */}
</div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {newRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
  
        <div className="flex justify-center mb-8">
          <Button text="..." variant="white" />
        </div>
  
        <h2 className="text-2xl font-bold mb-4">Completed Treatments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      </div>
    );
  };
  
  export default VeterinarianExaminations;
