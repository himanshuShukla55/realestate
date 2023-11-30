export const signOut = (req, res, next) => {
  res.status(200).clearCookie("accessToken").json({
    success: true,
    message: "signed out!",
  });
};
