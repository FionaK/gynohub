import React from "react";

const Table = () => {
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
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  {/* <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-2@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div> */}
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">Nairobi</div>
                </div>
              </div>
            </td>
            <td>
              Random Check
              <br />
              {/* <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span> */}
            </td>
            <td>12am</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          {/* row 2 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  {/* <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-3@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div> */}
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">Kisumu</div>
                </div>
              </div>
            </td>
            <td>
              Random Check<br />
              {/* <span className="badge badge-ghost badge-sm">Tax Accountant</span> */}
            </td>
            <td>4pm</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          {/* row 3 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  {/* <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-4@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div> */}
                </div>
                <div>
                  <div className="font-bold">Mary Ferencz</div>
                  <div className="text-sm opacity-50">Eldoret</div>
                </div>
              </div>
            </td>
            <td>
              Random Check
              <br />
              {/* <span className="badge badge-ghost badge-sm">
                Office Assistant I
              </span> */}
            </td>
            <td>7am</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          {/* row 4 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  {/* <div className="mask mask-squircle w-12 h-12">
                    <img
                      src="/tailwind-css-component-profile-5@56w.png"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div> */}
                </div>
                <div>
                  <div className="font-bold">Grace Tears</div>
                  <div className="text-sm opacity-50">Nakuru</div>
                </div>
              </div>
            </td>
            <td>
             Random Check
              <br />
              {/* <span className="badge badge-ghost badge-sm">
                Community Outreach Specialist
              </span> */}
            </td>
            <td>10 am</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default Table;
