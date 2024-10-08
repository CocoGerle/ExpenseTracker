const getMe = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
};

module.exports = { getMe };
