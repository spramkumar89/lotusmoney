export default (req, res) => {
  console.log(`Password reset initiated`);
  res.status(200).json({ msg: "Password Reset Done" });
};
