import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { adminID, password } = req.body;
  if (adminID === "adminVC" && password === "root123") {
    res
      .status(200)
      .json(
        new ApiResponse(200, { redirectURL: "/docs" }, "admin login success")
      );
  } else {
    res
      .status(401)
      .json(new ApiResponse(401, { redirectURL: "" }, "admin login failed"));
  }
});

export { adminLogin };
