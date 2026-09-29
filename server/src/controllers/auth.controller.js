import userModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utilis/auth.utili.js";

export const registerAPI = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const isEmailExists = await userModel.findOne({
      email,
    });

    if (isEmailExists) {
      return res.status(400).json({
        message: "User already exists",
        errors: { 
            errors: [
          {
            path: "email",
            msg: "User already exists with this email address",
          },
        ]},
      });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({
        message: "Password is not matched",
        errors: {
          errors: [
            {
              path: "confirmPassword",
              msg: "Password is not matched",
            },
          ],
        },
      });
    }

    const user = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const accessToken = generateAccessToken(user._id, user.name);
    const refreshToken = generateRefreshToken(user._id, user.name);

    await res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const loginAPI = async (req, res) => {
  const { email, password } = req.body;

  const isValidUser = await userModel.findOne({
    email,
  });

  if (!isValidUser) {
    return res.status(401).json({
      message: "Invalid email or password",
      errors: { 
            errors: [
          {
            path: "email",
            msg: "Invalid email or password",
          },
        ]},
    });
  }

  const validPassword = await bcrypt.compare(password, isValidUser.password);

  if (!validPassword) {
    return res.status(401).json({
      message: "Invalid email or password",
      errors: { 
            errors: [
          {
            path: "email",
            msg: "Invalid email or password",
          },
        ]},
    });
  }

  const accessToken = generateAccessToken(isValidUser._id, isValidUser.name);
  const refreshToken = generateRefreshToken(isValidUser._id, isValidUser.name);

  await res.cookie("refreshToken", refreshToken);
  await userModel.findByIdAndUpdate(isValidUser._id, {
    refreshToken,
  });

  res.status(200).json({
    message: "Logged In Successfully",
    data: {
      user: {
        name: isValidUser.name,
        email: isValidUser.email,
        id: isValidUser._id,
        role: isValidUser.role
      },
      accessToken,
    },
  });
};

export const getMe = async (req, res) => {
  const user = req.user;

  try {
    return res.status(200).json({
      message: "User data fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          role: user.role
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid access Token",
      error: error.message,
    });
  }
};

export const refresh = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token is required",
    });
  }

  try {
    const { id } = verifyRefreshToken(refreshToken);
    const user = await userModel.findById(id);

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(id, {
        refreshToken: null,
      });

      return res.status(401).json({
        message: "Refresh Token is not matched Login again",
      });
    }

    const accessToken = generateAccessToken(user._id, user.name);
    const newRefreshToken = generateRefreshToken(user._id, user.name);

    await res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
    await userModel.findByIdAndUpdate(id, { refreshToken: newRefreshToken });

    res.status(200).json({
      message: "Token refreshed successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      errors: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  const user = req.user;
  await res.clearCookie("refreshToken", { httpOnly: true });
  await userModel.findByIdAndUpdate(user._id, { refreshToken: null });

  return res.status(200).json({
    message: "User logged Out successfully.",
  });
};
