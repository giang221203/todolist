package com.example.back.service.interf;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;

public interface SubTaskService {
    ApiRes getAllSubTask(String name,String priority,Long idStatus);
    ApiRes createSubTask(SubTaskReq subTaskReq);
    ApiRes updateSubTask(Long id,SubTaskReq subTaskReq);
    ApiRes deleteSubTask(Long id);
}
