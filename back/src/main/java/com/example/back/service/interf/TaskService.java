package com.example.back.service.interf;

import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;

public interface TaskService {
    ApiRes getAllTask();
    ApiRes createTask(TaskReq taskReq);
    ApiRes updateTask(Long id, TaskReq taskReq);
    ApiRes deleteTask(Long id);
}
