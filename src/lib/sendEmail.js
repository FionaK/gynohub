export const sendEmail = (
	recipientEmail,
	templateId,
	templateParams,
	userId
) => {
	emailjs
		.send("YOUR_SERVICE_ID", templateId, templateParams, userId)
		.then((response) => {
			console.log("Email sent successfully:", response);
			// Handle success, such as displaying a success message
		})
		.catch((error) => {
			console.error("Email sending failed:", error);
			// Handle error, such as displaying an error message
		});
};
