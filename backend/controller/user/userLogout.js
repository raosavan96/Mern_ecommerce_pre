exports.userLogoutController = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Log out successful",
      error: false,
      success: true,
      data: []
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        message: error.message || "Internal server error",
        error: true,
        success: false
      });
    }
  }
};
