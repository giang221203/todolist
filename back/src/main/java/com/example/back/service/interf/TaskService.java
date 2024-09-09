package com.example.back.service.interf;

import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.ApiResPage;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface TaskService {
    ApiResPage getAllTask(String name, String priority, Long idStatus, int page, Integer limit, LocalDate createTime, LocalDate updateTime);
    ApiRes createTask(TaskReq taskReq);
    ApiRes updateTask(Long id, TaskReq taskReq);
    ApiRes deleteTask(Long id);
}
