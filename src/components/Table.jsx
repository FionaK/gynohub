import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";

const Table = () => {
  const { user } = UserAuth();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookingDetails = async () => {
      const docRef = doc(db, "bookings", user?.email); // Reference the specific document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        setBookings(docSnap.data().bookings); // Set bookings array if document exists
      } else {
        // Handle document not found scenario (optional)
        console.log("No such document!");
      }
    };

    getBookingDetails();

    // Clean up function (optional)
    return () => {
      // Unsubscribe from any listeners or cleanup logic here (if needed)
    };
  }, [user?.email]);



  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Gynecologist</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar"></div>
                  <div>
                    <div className="font-bold">{booking?.gynaName}</div>
                    <div className="text-sm opacity-50">{booking?.gynaEmail}</div>
                  </div>
                </div>
              </td>
              <td>{booking?.service}</td>
              <td>{booking?.date}</td>
              <td>
                <button className="btn btn-ghost btn-xs">details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
