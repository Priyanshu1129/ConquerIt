import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb+srv://Jajclubhouse:SOWSJ8odjtOMiNze@cluster0.6t1fhrb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};


export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET || "df329rnsf3wh", {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", //prevent CSRF attack
    maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
  });
};
