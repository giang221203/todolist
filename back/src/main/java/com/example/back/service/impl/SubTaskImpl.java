package com.example.back.service.impl;

import com.example.back.dto.req.SubTaskReq;
import com.example.back.dto.res.ApiRes;
import com.example.back.dto.res.SubTaskRes;
import com.example.back.dto.res.TaskRes;
import com.example.back.entity.Status;
import com.example.back.entity.SubTask;
import com.example.back.entity.Task;
import com.example.back.mapping.SubTaskMapping;
import com.example.back.mapping.TaskMapping;
import com.example.back.repository.StatusRepository;
import com.example.back.repository.SubTaskRepository;
import com.example.back.repository.TaskRepository;
import com.example.back.service.interf.SubTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SubTaskImpl implements SubTaskService {
    public final SubTaskRepository subTaskRepository;
    public final StatusRepository statusRepository;
    public final TaskRepository taskRepository;

    @Override
    public ApiRes getAllSubTask() {
        try {
            List<SubTask> subTaskList = subTaskRepository.findAll();
            List<SubTaskRes> subTaskResList = subTaskList.stream().map(SubTaskMapping::mapEntityToRes).toList();
            return new ApiRes(true, "Lấy dữ liệu thành công", subTaskResList);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes createSubTask(SubTaskReq subTaskReq) {
        try {
            SubTask subTaskCreate = SubTaskMapping.mapReqToEntity(subTaskReq);
            Optional<Status> status = statusRepository.findById(subTaskReq.getId_status());
            Optional<Task> task = taskRepository.findById(subTaskReq.getId_task());
            if (status.get().getName().equals("done")) {
                subTaskCreate.setProgress(100F);
            }
            subTaskCreate.setProgress(0F);
            subTaskCreate.setCreatedAt(LocalDateTime.now());
            subTaskCreate.setStatus(status.get());
            subTaskCreate.setTask(task.get());
            task.get().setCreatedAt(LocalDateTime.now());
            subTaskRepository.save(subTaskCreate);
            List<SubTask> soLuongSubTaskDone = task.get().getSubtasks().stream().filter(el -> el.getStatus().getName().equals("done")).toList();
            Float tongSoLuongSubTask = Float.valueOf(task.get().getSubtasks().size());
            Float progress = (soLuongSubTaskDone.size() / tongSoLuongSubTask) * 100;
            task.get().setProgress(progress);
            taskRepository.save(task.get());

            return new ApiRes(true, "Thêm dữ liệu thành công", null);
        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes updateSubTask(Long id, SubTaskReq subTaskReq) {
        try {
            Optional<SubTask> subTaskById = subTaskRepository.findById(id);
            if (subTaskById.isPresent()) {
                SubTask subTaskUpdate = SubTaskMapping.mapReqToEntity(subTaskReq);
                Optional<Status> status = statusRepository.findById(subTaskReq.getId_status());
                Optional<Task> task = taskRepository.findById(subTaskReq.getId_task());
                subTaskUpdate.setId(id);
                if (status.get().getName().equals("done")) {
                    subTaskUpdate.setProgress(100F);
                }
                subTaskUpdate.setProgress(0F);
                subTaskUpdate.setStatus(status.get());
                subTaskUpdate.setTask(task.get());

                subTaskRepository.save(subTaskUpdate);
                List<SubTask> soLuongSubTaskDone = task.get().getSubtasks().stream().filter(el -> el.getStatus().getName().equals("done")).toList();
                Float tongSoLuongSubTask = Float.valueOf(task.get().getSubtasks().size());
                Float progress = (soLuongSubTaskDone.size() / tongSoLuongSubTask) * 100;
                task.get().setUpdatedAt(LocalDateTime.now());
                task.get().setProgress(progress);
                taskRepository.save(task.get());
                return new ApiRes(true, "Cập nhật dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }

        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }

    @Override
    public ApiRes deleteSubTask(Long id) {
        try {
            Optional<SubTask> subTaskById = subTaskRepository.findById(id);
            Optional<Task> task = taskRepository.findById(subTaskById.get().getTask().getId());
            List<SubTask> soLuongSubTaskDone = task.get().getSubtasks().stream().filter(el -> el.getStatus().getName().equals("done")).toList();
            Float tongSoLuongSubTask = Float.valueOf(task.get().getSubtasks().size());
            Float progress = (soLuongSubTaskDone.size() / tongSoLuongSubTask) * 100;
            if (subTaskById.isPresent()) {
                task.get().setProgress(progress);
                task.get().setUpdatedAt(LocalDateTime.now());
                taskRepository.save(task.get());
                subTaskRepository.deleteById(id);
                return new ApiRes(true, "Xoá dữ liệu thành công", null);
            } else {
                return new ApiRes(false, "Dữ liệu không tồn tại", null);
            }

        } catch (Exception e) {
            return new ApiRes(false, e.getMessage(), null);
        }
    }
}
