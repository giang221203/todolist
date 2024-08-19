package com.example.back.mapping;

import com.example.back.dto.req.StatusReq;
import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.StatusRes;
import com.example.back.dto.res.TaskRes;
import com.example.back.entity.Status;
import com.example.back.entity.Task;

import java.time.LocalDateTime;

public class TaskMapping {

    public static Task mapReqToEntity(TaskReq taskReq) {
        Task task = new Task();
        task.setName(taskReq.getName());
        task.setDescription(taskReq.getDescription());
        task.setPriority(taskReq.getPriority());
        task.setUpdatedAt(LocalDateTime.now());
        return task;
    }

    public static TaskRes mapEntityToRes(Task task) {
        TaskRes taskRes = new TaskRes();
        taskRes.setId(task.getId());
        taskRes.setName(task.getName());
        taskRes.setPriority(task.getPriority());
        taskRes.setProgress(task.getProgress());
        taskRes.setDescription(task.getDescription());
        taskRes.setCreatedAt(task.getCreatedAt());
        taskRes.setUpdatedAt(task.getUpdatedAt());
        taskRes.setStatus(task.getStatus());
        return taskRes;
    }

}
