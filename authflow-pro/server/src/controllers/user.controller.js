

export const getProfile = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    status: "success",
    message: "user access successful",
    user
  })
};
