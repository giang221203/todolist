package com.example.back.mapping;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.SubTaskRes;
import com.example.back.dto.res.TaskRes;
import com.example.back.entity.SubTask;
import com.example.back.entity.Task;

import java.time.LocalDateTime;

public class SubTaskMapping {
    public static SubTask mapReqToEntity(SubTaskReq subTaskReq) {
        SubTask subTask = new SubTask();
        subTask.setName(subTaskReq.getName());
        subTask.setDescription(subTaskReq.getDescription());
        subTask.setPriority(subTaskReq.getPriority());
        subTask.setUpdatedAt(LocalDateTime.now());
        return subTask;
    }

    public static SubTaskRes mapEntityToRes(SubTask subTask) {
        SubTaskRes subTaskRes = new SubTaskRes();
        subTaskRes.setId(subTask.getId());
        subTaskRes.setName(subTask.getName());
        subTaskRes.setPriority(subTask.getPriority());
        subTaskRes.setProgress(subTask.getProgress());
        subTaskRes.setDescription(subTask.getDescription());
        subTaskRes.setCreatedAt(subTask.getCreatedAt());
        subTaskRes.setUpdatedAt(subTask.getUpdatedAt());
        subTaskRes.setStatus(StatusMapping.mapEntityToRes(subTask.getStatus()));
        subTaskRes.setTask(TaskMapping.mapEntityToRes(subTask.getTask()));
        return subTaskRes;
    }
}
