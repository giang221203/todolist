package com.example.back.service.interf;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.ApiResPage;

import java.time.LocalDate;

public interface SubTaskService {
    ApiRes getAllSubTask(String name, String priority, Long idStatus, int page, int limit, LocalDate createTime,LocalDate updateTime);
    ApiRes createSubTask(SubTaskReq subTaskReq);
    ApiRes updateSubTask(Long id,SubTaskReq subTaskReq);
    ApiRes deleteSubTask(Long id);

    ApiRes getSubTaskById(Long id);

    ApiResPage getAllSubTaskById(Long id, String name, String priority, Long idStatus, int page, int limit, LocalDate createTime, LocalDate updateTime,String nameSort, String direction);
}
