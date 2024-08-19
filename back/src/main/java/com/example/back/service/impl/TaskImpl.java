package com.example.back.service.impl;

import com.example.back.dto.req.TaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.TaskRes;
import com.example.back.entity.Status;
import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import com.example.back.mapping.TaskMapping;
import com.example.back.repository.StatusRepository;
import com.example.back.repository.TaskRepository;
import com.example.back.service.interf.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class TaskImpl implements TaskService {
    public final TaskRepository taskRepository;
    public final StatusRepository statusRepository;

    @Override
    public ApiRes getAllTask(String name,String priority,Long idStatus) {
        try {
            List<Task> taskList = taskRepository.getAllTask(name, priority, idStatus);
            List<TaskRes> taskResList = taskList.stream().map(TaskMapping::mapEntityToRes).toList();
            return new ApiRes(true, "Lấy dữ liệu thành công", taskResList);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes createTask(TaskReq taskReq) {
        try {
            Task taskCreate = TaskMapping.mapReqToEntity(taskReq);
            Optional<Status> status = statusRepository.findById(taskReq.getId_status());
            taskCreate.setCreatedAt(LocalDateTime.now());
            taskCreate.setStatus(status.get());
            if(status.get().getName().equals("done")){
                taskCreate.setProgress(100F);
            }else {
                taskCreate.setProgress(0F);
            }

            taskRepository.save(taskCreate);
            TaskRes taskRes = TaskMapping.mapEntityToRes(taskCreate);
            List<TaskRes> taskResList = new ArrayList<>();
            taskResList.add(taskRes);
            return new ApiRes(true, "Thêm dữ liệu thành công", taskResList);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes updateTask(Long id, TaskReq taskReq) {
        try {
            Optional<Task> taskById = taskRepository.findById(id);
            if (taskById.isPresent()) {
                Task taskUpdate = TaskMapping.mapReqToEntity(taskReq);
                taskUpdate.setId(id);
                Optional<Status> status = statusRepository.findById(taskReq.getId_status());
                Optional<Status> statusDone = statusRepository.findById(2L);
                taskUpdate.setStatus(status.get());
                if(status.get().getName().equals("done")){
                    taskUpdate.setProgress(100F);
                    for (SubTask subTask :taskById.get().getSubtasks()){
                        subTask.setStatus(statusDone.get());
                        subTask.setProgress(100F);
                    }
                }
                taskRepository.save(taskUpdate);
                return new ApiRes(true, "Cập nhật dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes deleteTask(Long id) {
        try {
            Optional<Task> taskById = taskRepository.findById(id);
            if (taskById.isPresent()) {
                taskRepository.deleteById(id);
                return new ApiRes(true, "Xoá dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }
}
