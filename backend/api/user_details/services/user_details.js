// Author: Guru Kiran(gkiran@dal.ca)

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

var User = require("../models/user_details");

const addUser = async (data) => {
  if (data?.email && data?.password && data?.firstName && data?.lastName) {
    let resp;
    await User.collection.findOne({ email: data.email }).then((_data) => {
      console.log(_data);
      if (_data == null) {
        let _user = new User({ ...data, event_ids: [], review_ids: [] });
        User.collection.insertOne(_user);
        resp = { success: true, message: "user added" };
      } else {
        resp = { success: false, message: "email already exists" };
      }
    });
    return resp;
  } else {
    return { success: false, message: "user not added. Missing params" };
  }
};

const modifyUser = async (data) => {
  console.log(data, "controller");
  if (data?.email && data?.password) {
    let resp;
    await User.collection
      .findOneAndUpdate(
        { email: data.email },
        { $set: { password: data.password } }
      )
      .then((_user) => {
        if (_user == null) {
          resp = { success: false, message: "Email not found." };
        } else {
          resp = { success: true, message: "Password reset" };
        }
      })
      .catch((err) => {
        resp = { success: false, message: "MongoDB error" };
      });
    return resp;
  } else {
    return { success: false, message: "Missing params" };
  }
};

const getUser = async (data) => {
  if (data?.email && data?.password) {
    let user;
    await User.collection.findOne({ email: data.email }).then((_user) => {
      user = _user;
      console.log(user);
    });

    if (user != null && data.password === user.password) {
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Incorrect email or password" };
    }
  } else {
    return { success: false, message: "Login failed. Missing params" };
  }
};

const findUser = async (data) => {
  if (data?.email) {
    let user;
    await User.collection.findOne({ email: data.email }).then((_user) => {
      user = _user;
    });

    if (user != null) {
      return { success: true, message: "User found" };
    } else {
      return { success: true, message: "User not found" };
    }
  } else {
    return { success: false, message: "Missing param email" };
  }
};

const addEventUser = async (data) => {
  if (data?.email && data?.eventId) {
    let resp;
    await User.collection.findOne({ email: data.email }).then((_user) => {
      if (_user != null) {
        _user.event_ids.push(data.eventId);
        console.log(_user);
        User.collection
          .findOneAndUpdate(
            { email: data.email },
            { $set: { event_ids: _user.event_ids } }
          )
          .then((resp) => {
            console.log(resp);
          });
        resp = { success: true, message: "Event added" };
      } else {
        resp = { success: false, message: "Email not found" };
      }
    });
    return resp;
  }
  return { success: false, message: "Missing params" };
};

const fetchEventsUser = async (data) => {
  let user;
  if (data?.email) {
    await User.collection.findOne({ email: data.email }).then((_user) => {
      user = _user;
    });

    if (user == null) {
      return { success: false, message: "Email not found" };
    } else {
      return { success: true, eventIds: user.event_ids };
    }
  } else {
    return { success: false, message: "Missing params" };
  }
};

const addReviewUser = async (data) => {
  if (data?.email && data?.reviewId) {
    let resp;
    await User.collection.findOne({ email: data.email }).then((_user) => {
      if (_user != null) {
        _user.review_ids.push(data.reviewId);
        console.log(_user);
        User.collection
          .findOneAndUpdate(
            { email: data.email },
            { $set: { review_ids: _user.review_ids } }
          )
          .then((resp) => {
            console.log(resp);
          });
        resp = { success: true, message: "Review added" };
      } else {
        resp = { success: false, message: "Email not found" };
      }
    });
    return resp;
  }
  return { success: false, message: "Missing params" };
};

const fetchReviewsUser = async (data) => {
  let user;
  if (data?.email) {
    await User.collection.findOne({ email: data.email }).then((_user) => {
      user = _user;
    });

    if (user == null) {
      return { success: false, message: "Email not found" };
    } else {
      return { success: true, reviewIds: user.review_ids };
    }
  } else {
    return { success: false, message: "Missing params" };
  }
};

module.exports = {
  addUser,
  getUser,
  modifyUser,
  findUser,
  addEventUser,
  fetchEventsUser,
  addReviewUser,
  fetchReviewsUser,
};
