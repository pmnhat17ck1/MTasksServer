const { Task, User, Group, Type, Step, Priority } = require("../models");
const { jsonData, createNoti } = require("../utils");
const { sendNoti } = require("../services");
const { validationResult } = require("express-validator");

const taskController = {
  getAll: async (req, res) => {
    try {
      const tasks = await Task.findAll({ order: [["createdAt", "DESC"]] });
      res.status(200).json(jsonData(true, tasks));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  getAllTaskGroup: async (req, res) => {
    try {
      const tasks = await Task.findAll({
        where: {
          groupId: req.body?.groupId,
        },
      });
      res.status(200).json(jsonData(true, tasks));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  getAllTaskUser: async (req, res) => {
    try {
      const tasks = await Task.findAll({
        where: {
          assignee: req.body?.userId,
        },
      });
      res.status(200).json(jsonData(true, tasks));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  delete: async (req, res) => {
    try {
      const found = await Task.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Task not exist!"));
      }
      found.destroy({
        where: {
          id: req.params.id,
        },
      });
      await createNoti(
        "Delete",
        `Task ${found.id} delete by ${req.user.username}`,
        "task",
        req.user.id
      );
      sendNoti({
        title: "Delete",
        description: `Task ${found.id} delete by ${req.user.username}`,
        type: "task",
        userId: req.user.id,
      });
      res.status(200).json(jsonData(true, "Task deleted"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  create: async (req, res) => {
    try {
      const foundGroup = await Group.findOne({ userId: req.body.groupId });
      if (!foundGroup) {
        return res
          .status(500)
          .json(jsonData(false, "Task should belong to one group!"));
      }
      await Task.create({
        name: req.body.name,
        description: req.body.description,
        reporter: req.body.reporter,
        assignee: req.body.assignee,
        link_issue: req.body.link_issue,
        due_date: req.body.due_date,
        typeId: req.body.typeId,
        stepId: req.body.stepId,
        priorityId: req.body.priorityId,
        groupId: req.body.groupId,
      });
      await createNoti(
        "Create",
        `This task create by ${req.user.username}`,
        "task",
        req.user.id
      );
      sendNoti({
        title: "Create",
        description: `This task create by ${req.user.username}`,
        type: "task",
        userId: req.user.id,
      });
      res.status(200).json(jsonData(true, "Task created"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
  update: async (req, res) => {
    try {
      const found = await Task.findOne({ where: { id: req.params.id } });
      if (!found) {
        return res.status(500).json(jsonData(false, "Task not exist!"));
      }
      if (req.body.assignee) {
        const foundAssignee = await User.findOne({
          where: { id: req.body.assignee },
        });
        if (!foundAssignee) {
          return res.status(500).json(jsonData(false, "Assignee not exist!"));
        }
        found.update({
          assignee: req.body.assignee,
        });
        await createNoti(
          "Update",
          `Task ${found.id} update assignee by ${foundAssignee.username}`,
          "task",
          foundAssignee.id
        );
        sendNoti({
          title: "Create",
          description: `Task ${found.id} update assignee by ${foundAssignee.username}`,
          type: "task",
          userId: foundAssignee.id,
        });
      }
      if (req.body.reporter) {
        const foundReporter = await User.findOne({
          where: { id: req.body.reporter },
        });
        if (!foundReporter) {
          return res.status(500).json(jsonData(false, "Reporter not exist!"));
        }
        found.update({
          reporter: req.body.reporter,
        });
        await createNoti(
          "Update",
          `Task ${found.id} update reporter by ${foundReporter.username}`,
          "task",
          foundReporter.id
        );
        sendNoti({
          title: "Update",
          description: `Task ${found.id} update reporter by ${foundReporter.username}`,
          type: "task",
          userId: foundReporter.id,
        });
      }
      found.update({
        name: req.body.name,
        link_issue: req.body.link_issue,
        description: req.body.description,
        due_date: req.body.due_date,
        typeId: req.body.typeId,
        stepId: req.body.stepId,
        priorityId: req.body.priorityId,
      });
      await createNoti(
        "Update",
        `Task ${found.id} update detail by ${req.user.username}`,
        "task",
        req.user.id
      );
      sendNoti({
        title: "Update",
        description: `Task ${found.id} update detail by ${req.user.username}`,
        type: "task",
        userId: req.user.id,
      });
      res.status(200).json(jsonData(true, "Task updated"));
    } catch (err) {
      res.status(500).json(jsonData(false, err));
    }
  },
};

module.exports = taskController;
