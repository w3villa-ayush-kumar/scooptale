export const sendError = (res, status, message, error = null) => {
  console.error("API ERROR:", message);

  if (error) {
    console.error(error);
  }

  return res.status(status).json({
    success: false,
    error: message,
  });
};
