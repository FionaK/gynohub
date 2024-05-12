export function filterBookings(bookings, userEmail) {
    // Define an array to store filtered bookings
    const filteredBookings = [];

    // Loop through each element in the input array
    bookings.forEach(bookingObj => {
        // Check if the current element has a 'bookings' property
        if (bookingObj.hasOwnProperty('bookings')) {
            // If yes, filter bookings within the 'bookings' array
            const filteredNestedBookings = bookingObj.bookings.filter(booking => {
                return booking.gynaEmail === userEmail;
            });
            // Concatenate the filtered bookings to the result array
            filteredBookings.push(...filteredNestedBookings);
        } else {
            // If no 'bookings' property, directly check the current element
            if (bookingObj.gynaEmail === userEmail) {
                filteredBookings.push(bookingObj);
            }
        }
    });

    // Return the filtered bookings
    return filteredBookings;
}